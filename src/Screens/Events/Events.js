import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ImageComponent,
  Linking,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import React, { useEffect, useState } from "react";
import HeaderBottom from "../../Components/HeaderBottom";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { colors } from "../../constants/colors";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import Seprator from "../../Components/Seprator";
// import RNDateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import { GernalStyle } from "../../constants/GernalStyle";
import { useDispatch, useSelector } from "react-redux";
import { Image } from "react-native-svg";
import { setLoader } from "../../Redux/actions/GernalActions";
import { ApiCall } from "../../Services/Apis";
import { FlatList } from "react-native-gesture-handler";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import { isArray } from "validate.js";
import { fonts } from "../../constants/fonts";
import DatePicker from "react-native-date-picker";

const Events = () => {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [Dropdown, setDropDown] = useState(false);
  const [all, setAll] = useState(false);
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const [data, setData] = useState([]);
  const [EventsFiltered, setEventsFiltered] = useState();

  const dispatch = useDispatch();

  const getAllProgram = async () => {
    dispatch(setLoader(true));

    try {
      let res = null;

      res = await ApiCall({
        route: "admin/get_alert",
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        setData(res?.response?.admin);
        console.log("programsss", res?.response?.admin);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        Alert.alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };
  const filterEvents = (date) => {
    const filteredDate = date.toISOString().split("T")[0];
    const filteredEvents = data.filter((event) => {
      const eventDate = new Date(event.start).toISOString().split("T")[0];
      console.log(eventDate);
      return eventDate === filteredDate;
    });
    console.log("Filtered Events", filteredEvents);
    console.log("Filtered date", filteredDate);
    setEventsFiltered(filteredEvents);
  };
  useEffect(() => {
    getAllProgram(0);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "rgba(51, 51, 51, 1)" }}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <DatePicker
        modal
        open={open}
        mode="date"
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setAll(true);
          setDate(date);
          filterEvents(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />

      <HeaderBottom
        title={"Events"}
        LeftIcon={
          <Ionicons
            size={25}
            color={"white"}
            onPress={() => navigation.goBack()}
            name="arrow-back"
          />
        }
        RightIcon={<View style={{ marginRight: getFontSize(3.5) }} />}
      />
      <View
        style={{ flex: 1, alignItems: "center", marginTop: getHeight(2.45) }}
      >
        <TextInput
          mode="outlined"
          label={
            <Text style={GernalStyle.inputLabelStyle}>Filter by date</Text>
          }
          editable={false}
          value={!all ? "All" : new Date(date).toLocaleDateString()}
          theme={{ roundness: getFontSize(0.5) }}
          outlineColor="rgba(189, 189, 189, 1)"
          cursorColor="rgba(189, 189, 189, 1)"
          textColor="rgba(189, 189, 189, 1)"
          activeUnderlineColor="rgba(189, 189, 189, 1)"
          activeOutlineColor="rgba(189, 189, 189, 1)"
          style={GernalStyle.input}
          onPressIn={() => setOpen(true)}
          returnKeyType={"send"}
          left={
            <TextInput.Icon
              icon={() => (
                <AntDesign
                  name={"calendar"}
                  onPress={() => setOpen(true)}
                  size={getFontSize(3)}
                  style={{ marginTop: 8 }}
                  color={"#fff"}
                />
              )}
            />
          }
          right={
            <TextInput.Icon
              icon={() => (
                <MaterialIcons
                  name={"arrow-drop-down"}
                  onPress={() => setDropDown(!Dropdown)}
                  size={getFontSize(5)}
                  style={{ marginTop: 4.5 }}
                  color={"#fff"}
                />
              )}
            />
          }
          blurOnSubmit={false}
        />
        {Dropdown && (
          <View
            style={{
              width: getWidth(90),
              height: getHeight(12),
              backgroundColor: "#272727",
              borderRadius: getHeight(1),
              alignItems: "center",
              justifyContent: "center",
              marginTop: getHeight(1.5),
            }}
          >
            <TouchableOpacity
              style={styles.buttonDropdow}
              onPress={() => {
                setDropDown(false);
                setAll(false);
              }}
            >
              <Text style={styles.buttonText}>All</Text>
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          data={!all ? data : EventsFiltered}
          refreshing={false}
          onRefresh={() => getAllProgram()}
          ListFooterComponent={() => (
            <View style={{ height: getHeight(8) }}></View>
          )}
          renderItem={({ item, index }) => (
            <View key={index} style={styles.eventContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    if (Linking.canOpenURL(item?.link)) {
                      // Open the link in the default browser
                      Linking.openURL(item?.link);
                    } else {
                      console.error("Cannot open URL");
                    }
                  }}
                >
                  <Text style={styles.buttonText}>Attend</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.status}>Online Event</Text>
              <View style={styles.DateTimeContainer}>
                <Text style={styles.DateTime}>
                  {new Date(item.start).toLocaleDateString()} |{" "}
                  {new Date(item?.start).toLocaleTimeString()} -{" "}
                  {new Date(item?.end).toLocaleTimeString()}
                </Text>
                <AntDesign
                  name={"clockcircleo"}
                  size={14}
                  color={colors.buttonColor}
                />
              </View>

              {/* <ImageBackground
                  resizeMode="cover"
                  style={styles.image}
                  source={require("../../assets/images/profilePic.png")}
                /> */}

              {item.speakers.length > 0 &&
                item.speakers.map((item) => (
                  <View style={styles.bottomContainer}>
                    <View style={styles.textContainer}>
                      <Text style={styles.role}>
                        Speaker:{" "}
                        <Text
                          style={{
                            ...styles.role,
                            marginRight: 5,
                            fontSize: 16,
                          }}
                        >
                          {item?.name}
                        </Text>
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  eventContainer: {
    width: getWidth(90),
    height: "auto",
    backgroundColor: "#272727",
    marginTop: getHeight(3),
    borderRadius: getWidth(2),
    paddingVertical: getWidth(4.5),
    paddingHorizontal: getWidth(3.5),
  },
  title: {
    color: "white",
    fontSize: 18,
    marginBottom: Platform.OS === "ios" ? 3 : 0,
    fontFamily: fonts.Bo,

    width: getWidth(50),
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#16CC66",
    width: getWidth(30),
    height: getHeight(3.75),
    borderRadius: getWidth(1.25),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonDropdow: {
    backgroundColor: colors.buttonColor,
    width: getWidth(80),
    height: getHeight(5.75),
    borderRadius: getWidth(1.25),
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Ubuntu-Bold",
    fontSize: 16,
    color: colors.white,
    margin: 0,
  },
  status: {
    fontFamily: "Ubuntu",
    fontSize: 10.5,
    color: colors.white,
    marginTop: -5,
  },
  DateTime: {
    fontFamily: "Ubuntu",
    fontSize: 12,
    color: colors.buttonColor,
  },
  DateTimeContainer: {
    marginTop: 15,
    width: "100%",
    height: getHeight(4.25),
    backgroundColor: "rgba(51, 51, 51, 1)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: getWidth(2.5),
    borderRadius: getWidth(1.25),
  },
  bottomContainer: {
    marginTop: 5,
    width: "100%",
    height: "auto",
    backgroundColor: "rgba(51, 51, 51, 1)",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: getWidth(2.5),
    paddingVertical: getWidth(3),
    borderRadius: getWidth(1.25),
  },

  image: {
    height: getHeight(8),
    width: getWidth(15),
  },
  textContainer: {
    display: "flex",
    flexDirection: "Column",
  },
  Email: {
    fontFamily: "Ubuntu",
    fontSize: 12,
    color: colors.white,
    letterSpacing: 0.75,
    marginTop: 5,
  },
  role: {
    fontFamily: "Ubuntu-Bold",
    fontSize: 14,
    color: colors.gray1,
  },
});

export default Events;
