import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GernalStyle } from "../../../constants/GernalStyle";
import { colors } from "../../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import {
  getHeight,
  getFontSize,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import { fonts } from "../../../constants/fonts";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { ApiCall } from "../../../Services/Apis";
import Button from "../../../Components/Button";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import VideoComponent from "../../../Components/VideoComponent";
import { getSingleUser } from "../../../Redux/actions/AuthActions";

const getDurationText = (days) => {
  const weeks = days / 7;
  const roundedWeeks = Math.floor(weeks);
  const remainingDays = days % 7;

  if (remainingDays === 0) {
    return `${roundedWeeks} ${roundedWeeks === 1 ? "week" : "weeks"} Program`;
  } else if (roundedWeeks === 0) {
    return `${days} ${days === 1 ? "day" : "days"} Program`;
  } else {
    return `${roundedWeeks} ${
      roundedWeeks === 1 ? "week" : "weeks"
    } and ${remainingDays} ${remainingDays === 1 ? "day" : "days"} Program`;
  }
};

const ViewProgram = ({ route }) => {
  const navigation = useNavigation();
  const { _id } = route?.params?.passData;
  const url = route?.params?.url;
  const programVideos = route?.params?.programVideos;

  const [program, setProgram] = useState(null);
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const dispatch = useDispatch();

  useEffect(() => {
    getViewProgram();
  }, []);

  const getViewProgram = async () => {
    dispatch(setLoader(true));
    try {
      const res = await ApiCall({
        params: { category_name: "skill" },
        route: url + _id,
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        console.log(
          "workout",
          res?.response?.detail?.workouts[0]?.innerWorkout[0]?.exercise
        );
        console.log("workout", res?.response?.detail);

        setData(res?.response?.detail);
        setProgram(res?.response?.detail?.workouts);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));

        alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };
  const AssignProgram = async () => {
    dispatch(setLoader(true));
    const today = new Date();
    today.setDate(today.getDate() + 7);
    try {
      const res = await ApiCall({
        params: {
          startDate: selectedDate,
          programId: data._id,
        },
        route: "assignProgram/assign_Program",
        verb: "post",
        token: token,
      });
      if (res?.status == "200") {
        dispatch(setLoader(false));
        dispatch(getSingleUser(token));
        navigation.navigate("WorkoutSucessfully", { selectDate: selectedDate });
      } else {
        dispatch(setLoader(false));

        Alert.alert(res?.response?.message || "Error", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };
  const SwitchProgram = async () => {
    dispatch(setLoader(true));
    const today = new Date();
    today.setDate(today.getDate() + 7);

    try {
      const res = await ApiCall({
        params: {
          startDate: selectedDate,
          programId: data._id,
          planId: user?.plan_id,
          isContinuous: "false",
        },
        route: "assignProgram/switch_assign_Program",
        verb: "post",
        token: token,
      });
      if (res?.status == "200") {
        dispatch(setLoader(false));
        dispatch(getSingleUser(token));
        navigation.navigate("WorkoutSucessfully", { selectDate: selectedDate });
      } else {
        dispatch(setLoader(false));

        Alert.alert(res?.response?.message || "Error", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  const handleAddToCalendar = () => {
    if (user?.isAssigned === true) {
      Alert.alert("Switch Program", " Do you want to switch to new program?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "destructive",
        },
        {
          text: "Continue",
          onPress: () => setModalVisible(true),
          style: "default",
        },
      ]);
    } else {
      setModalVisible(true);
    }
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  return (
    <ScrollView
      style={{
        position: "relative",
      }}
    >
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={{ color: "red" }}>Close</Text>
          </TouchableOpacity>

          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: colors.buttonColor,
              },
            }}
            minDate={new Date().toISOString().split("T")[0]}
          />
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
              if (user?.isAssigned === true) {
                setModalVisible(false);
                SwitchProgram();
              } else {
                setModalVisible(false);
                AssignProgram();
              }
            }}
            style={styles.donebtn}
          >
            <Text
              style={{
                fontSize: 14,
                color: colors.white,
                fontFamily: fonts.UBo,
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Image
        source={{ uri: data?.program_Image }}
        style={{
          objectFit: "fill",
          position: "absolute",
          marginTop: -20,
          height: 290,
          width: Dimensions.get("screen").width,
          borderBottomRightRadius: 30,
          borderBottomLeftRadius: 30,
        }}
      />

      <TouchableOpacity
        style={{
          position: "absolute",
          top: 60,
          left: 20,
        }}
        onPress={() => navigation.goBack()}
      >
        <Image
          source={require("../../../assets/images/workoutsbackbtn.png")}
          style={{
            objectFit: "fill",
            height: 50,
            width: 50,
          }}
        />
      </TouchableOpacity>

      <View
        style={{
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
          marginTop: 130,
          gap: 10,
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderRadius: 8,
            borderColor: "white",
            backgroundColor: "black",
            padding: 8,
            flexDirection: "row",
            alignItems: "center",
            gap: 4,
          }}
        >
          <Image
            source={require("../../../assets/images/workoutsrunningicon.png")}
            style={{
              height: 20,
              width: 20,
              marginTop: 2,
            }}
          />
          <Text
            style={{
              color: "white",
              fontSize: 14,
            }}
          >
            {data?.title}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 26,
            color: "white",
            fontWeight: "700",
            marginTop: 0,
          }}
        >
          About
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 0,
            marginTop: 0,
          }}
        >
          <Image
            source={require("../../../assets/images/redfire.png")}
            style={{
              height: 20,
              width: 20,
            }}
          />
          <Text style={{ color: "white" }}>
            {getDurationText(data?.no_of_days)}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: Dimensions.get("screen").width,
          justifyContent: "flex-start",
          alignItems: "flex-start",
          marginTop: 70,
          gap: 0,
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 0,
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 22,
            }}
          >
            Program Description
          </Text>
          <Text
            style={{
              color: "#7d7d7d",
              lineHeight: 20,
            }}
          >
            {data?.description}
          </Text>
        </View>
        {programVideos?.length > 0 && (
          <View
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: 0,
              marginTop: 10,
            }}
          >
            <View>
              <View style={{ gap: 10 }}>
                <Text style={{ fontWeight: 700, fontSize: 18 }}>
                  {programVideos[0].title}
                </Text>
                <Text
                  style={{
                    lineHeight: 22,
                    textAlign: "left",
                    color: "#676C75",
                    letterSpacing: 0.8,
                  }}
                >
                  {programVideos[0].description}
                </Text>
              </View>
              <View
                style={{
                  width: Dimensions.get("screen").width - 38,
                  objectFit: "contain",
                }}
              >
                <VideoComponent
                  videoUrl={programVideos[0]?.video}
                  thumbnail={programVideos[0]?.video_thumbnail}
                />
              </View>

              <View style={{ marginVertical: 20 }}>
                <Button
                  onPress={() => {
                    handleAddToCalendar();
                  }}
                  text={`Start ${data?.title}`}
                  btnStyle={{
                    ...GernalStyle.btn,
                    borderRadius: 20,
                    height: 60,
                    backgroundColor: colors.orange,
                  }}
                  btnTextStyle={GernalStyle.btnText}
                />
                <Button
                  onPress={() => navigation.goBack()}
                  text="No, Go Back"
                  btnStyle={{
                    ...GernalStyle.btn,
                    borderRadius: 20,
                    height: 60,
                    backgroundColor: colors.black,
                    marginTop: 20,
                    marginBottom: -20,
                  }}
                  btnTextStyle={GernalStyle.btnText}
                />
              </View>

              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: "#E5E5E5",
                  width: "100%",
                  marginVertical: 20,
                }}
              />

              <Text
                style={{ fontWeight: "700", fontSize: 22, marginBottom: 10 }}
              >
                Additional Details:
              </Text>

              {programVideos.slice(1).map((item, index) => (
                <View key={index}>
                  <View style={{ gap: 5 }}>
                    <Text style={{ fontWeight: 700, fontSize: 15 }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        lineHeight: 22,
                        textAlign: "left",
                        color: "#676C75",
                        letterSpacing: 0.8,
                      }}
                    >
                      {item.description}
                    </Text>
                  </View>
                  <View
                    style={{
                      width: Dimensions.get("screen").width - 38,
                      objectFit: "contain",
                    }}
                  >
                    <VideoComponent
                      videoUrl={item?.video}
                      thumbnail={item?.video_thumbnail}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        <View
          style={{
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 0,
          }}
        ></View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 5,
    padding: 20,
  },
  closeButton: {
    alignItems: "flex-start",
  },
  donebtn: {
    height: getHeight(6),
    borderRadius: 5,
    width: getWidth(25),
    backgroundColor: colors.bluebtn,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: getHeight(1),
  },
});

export default ViewProgram;