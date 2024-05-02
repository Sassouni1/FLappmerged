import React, { useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
} from "react-native";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import Modal from "react-native-modal";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { ApiCall } from "../../Services/Apis";
import { setLoader } from "../../Redux/actions/GernalActions";
import { useDispatch, useSelector } from "react-redux";
import { Assprogram, getSingleUser } from "../../Redux/actions/AuthActions";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { TextInput } from "react-native-paper";
import { GernalStyle } from "../../constants/GernalStyle";
import SelectDropdown from "react-native-select-dropdown";

const WorkoutDetails = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState();
  const [betweenTwoHandles, setbetweenTwoHandles] = useState(false);
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const toggleModal = () => {
    console.log("Opening modal");
    setModalVisible(true);
    console.log("Opened modal");
  };
  const handleDoubleTap = (item) => {
    console.log("double tap screen", item);
    navigation.navigate("ViewProgram", {
      passData: item,
      url: betweenTwoHandles
        ? "cont_program/detail_cont_program/"
        : "program/detail_program/",
    });
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  const handleSelect = (index) => {
    if (index == "S&C Program") {
      setbetweenTwoHandles(false);
      getAllProgram();
    } else {
      setbetweenTwoHandles(true);
      getContinuousProgram();
    }
  };
  const getContinuousProgram = async () => {
    dispatch(setLoader(true));
    setData([])

    try {
      const res = await ApiCall({
        route: "cont_program/all_cont_programs",
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        console.log("programsss", res?.response);
        setData(res?.response?.detail?.filter((el) => !el?.isDeleted));
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
  const getAllProgram = async () => {
    dispatch(setLoader(true));
setData([])
    try {
      const res = await ApiCall({
        route: "program/all_programs",
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        console.log("programsss", res?.response);
        setData(res?.response?.detail?.filter((el) => !el?.isDeleted));
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
  useEffect(() => {
    getAllProgram(0);
  }, []);

  const AssignProgram = async () => {
    dispatch(setLoader(true));
    const today = new Date();
    today.setDate(today.getDate() + 7);
    try {
      const res = await ApiCall({
        params: {
          startDate: selectedDate,
          programId: selectedItemId,
        },
        route: betweenTwoHandles
          ? "assignProgram/assign-continuous-program"
          : "assignProgram/assign_Program",
        verb: "post",
        token: token,
      });
      if (res?.status == "200") {
        dispatch(Assprogram(res?.response?.Assigned_Program));
        dispatch(getSingleUser(token));
        dispatch(setLoader(false));
        navigation.navigate("WorkoutSucessfully", { selectDate: selectedDate });
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

  const SwitchProgram = async () => {
    dispatch(setLoader(true));
    const today = new Date();
    today.setDate(today.getDate() + 7);

    try {
      const res = await ApiCall({
        params: {
          startDate: selectedDate,
          programId: selectedItemId,
          planId: user?.plan_id,
          isContinuous: betweenTwoHandles ? "true" : "false",
        },
        route: "assignProgram/switch_assign_Program",
        verb: "post",
        token: token,
      });
      if (res?.status == "200") {
        dispatch(Assprogram(res?.response?.Assigned_Program));
        dispatch(getSingleUser(token));
        dispatch(setLoader(false));
        navigation.navigate("WorkoutSucessfully", { selectDate: selectedDate });
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

  useEffect(() => {
    const fetchSelectedItemId = async () => {
      const latestSelectedItemId = await AsyncStorage.getItem(
        "latestSelectedItemId"
      );
      if (latestSelectedItemId) {
        setSelectedItemId(latestSelectedItemId);
      }
    };
    fetchSelectedItemId();
  }, []);

  // Your toggleSelection function...
  const toggleSelection = async (item) => {
    console.log("item inside toggle selection", item);
    let prevSelectedItems = await AsyncStorage.getItem("selectedItems");
    prevSelectedItems = JSON.parse(prevSelectedItems) || [];

    const index = prevSelectedItems.findIndex(
      (selectedItem) => selectedItem._id === item._id
    );

    if (index !== -1) {
      prevSelectedItems.splice(index, 1);
    } else {
      prevSelectedItems.push(item);
    }

    await AsyncStorage.setItem(
      "selectedItems",
      JSON.stringify(prevSelectedItems)
    );
    // Update the latest selected program ID in AsyncStorage
    await AsyncStorage.setItem("latestSelectedItemId", item._id);
    setSelectedItemId(item._id);
  };

  const handleAddToCalendar = () => {
    if (user?.isAssigned === true) {
      Alert.alert("", " Do you want to switch to new program?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "destructive",
        },
        { text: "Continue", onPress: () => toggleModal(), style: "default" },
      ]);
    } else {
      toggleModal();
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: getWidth(93),
          flexDirection: "row",
          alignSelf: "center",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextInput
          mode="outlined"
          label={<Text style={GernalStyle.inputLabelStyle}>Search</Text>}
          theme={{ roundness: getFontSize(0.5) }}
          outlineColor="rgba(189, 189, 189, 1)"
          cursorColor="rgba(189, 189, 189, 1)"
          textColor="rgba(189, 189, 189, 1)"
          activeUnderlineColor="rgba(189, 189, 189, 1)"
          activeOutlineColor="rgba(189, 189, 189, 1)"
          style={{
            height: getHeight(6),
            backgroundColor: "rgba(79, 79, 79, 1)",
            color: "white",
            justifyContent: "center",
            fontSize: getFontSize(1.6),
            fontFamily: "Ubuntu-Regular",
            paddingLeft: 5,
            width: getWidth(55),
          }}
          // ref={inputRefs.email}
          // value={state.email}
          returnKeyType={"next"}
          // onChangeText={(email) => changeHandler("email", email.trim())}
        />
        <SelectDropdown
          defaultButtonText="Select an Program"
          renderDropdownIcon={() => (
            <AntDesign name="caretdown" size={20} color={colors.white} />
          )}
          defaultValueByIndex={0}
          dropdownStyle={{ width: getWidth(35) }}
          buttonTextStyle={{ color: "white", fontSize: 12 }}
          dropdownIconPosition="right"
          buttonStyle={{
            width: getWidth(35),
            alignSelf: "center",
            borderRadius: 5,
            marginTop: 6,
            backgroundColor: colors.buttonColor,
          }}
          data={["S&C Program", "Year Round Program"]}
          onSelect={(index) => {
          
            handleSelect(index);
          }}
        />
      </View>
      <FlatList
        data={data}
        ListFooterComponent={() => (
          <View style={{ height: getHeight(8) }}></View>
        )}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View>
              <TouchableOpacity onPress={() => handleDoubleTap(item)}>
                <ImageBackground
                  source={{ uri: item?.program_Image }}
                  style={styles.image}
                  resizeMode="cover"
                >
                  <Text
                    style={{
                      fontSize: getFontSize(1.9),
                      color: colors.white,
                      fontFamily: fonts.UBo,
                      position: "absolute",
                      bottom: getHeight(2),
                      alignSelf: "center",
                      fontWeight: "600",
                    }}
                  >
                    {item?.title}
                  </Text>
                  <TouchableOpacity
                    onPress={() => toggleSelection(item)}
                    style={{
                      width: getWidth(8),
                      height: getWidth(8),
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor:
                        selectedItemId === item._id
                          ? colors.buttonColor
                          : colors.whiteOp40,
                      position: "absolute",
                      top: getHeight(1),
                      right: getWidth(3),
                      borderRadius: 25,
                    }}
                  >
                    <Ionicons
                      name="checkmark-sharp"
                      size={20}
                      color={colors.white}
                    />
                  </TouchableOpacity>
                </ImageBackground>
              </TouchableOpacity>
            </View>
          );
        }}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      />
      {selectedItemId !== user?.program_id ? (
        <TouchableOpacity
          onPress={() => {
            handleAddToCalendar();
          }}
          activeOpacity={0.5}
          style={{
            backgroundColor: colors.buttonColor,
            width: getWidth(93),
            height: getHeight(5),
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            borderRadius: 5,
            alignItems: "center",
            position: "absolute",
            bottom: getHeight(1),
          }}
        >
          <Text
            style={{
              fontSize: getFontSize(1.5),
              color: colors.white,
              fontFamily: fonts.UBo,
              fontWeight: "bold",
            }}
          >
            Add Workout to my Calendar
          </Text>
        </TouchableOpacity>
      ) : null}

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
    </View>
  );
};

export default WorkoutDetails;
