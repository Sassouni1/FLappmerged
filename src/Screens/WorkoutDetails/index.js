import React, { useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ImageBackground,
  ScrollView,
  Alert,
} from "react-native";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import Modal from "react-native-modal";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { RightIcon } from "../../../assets/Images";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { ApiCall } from "../../Services/Apis";
import { setLoader } from "../../Redux/actions/GernalActions";
import { useDispatch, useSelector } from "react-redux";
import { Assprogram, getSingleUser } from "../../Redux/actions/AuthActions";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WorkoutDetails = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );
  const [data, setData] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState();
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  const [assignProgram, setAssignProgram] = useState([]);
  const [count, setCount] = useState(0);
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  console.log('selected id',selectedItemId)

  const dispatch = useDispatch();
  const toggleModal = () => {
    console.log("Opening modal");
    setModalVisible(true);
    console.log("Opened modal");
  };

  var lastTap = null;
  const handleDoubleTap = (item) => {
    navigation.navigate("ViewProgram", { passData: item });
  };

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const getAllProgram = async () => {
    dispatch(setLoader(true));

    try {
      const res = await ApiCall({
        params: { category_name: "skill" },
        route: "program/all_programs",
        verb: "get",
        token: token,
      });
      console.log("response of all programs", res?.response);
      if (res?.status == "200") {
        console.log("view all programs", res?.response?.detail);
        setData(res?.response?.detail);

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
  useEffect(() => {
    getAllProgram();
  }, []);

  const AssignProgram = async () => {
    dispatch(setLoader(true));
    const today = new Date();
    today.setDate(today.getDate() + 7);
    // Format the resulting date as a string in ISO format
    const sevenDaysLater = today.toISOString().split("T")[0];
    //console.log(sevenDaysLater);
    try {
      const res = await ApiCall({
        params: {
          startDate: selectedDate,
          programId: selectedItemId,
          //lastDate: sevenDaysLater,
        },
        route: "assignProgram/assign_Program",
        verb: "post",
        token: token,
      });

      console.log("aProgram", res?.response);
      if (res?.status == "200") {
        dispatch(Assprogram(res?.response?.Assigned_Program));
        dispatch(getSingleUser(token));
        dispatch(setLoader(false));
        navigation.navigate("WorkoutSucessfully",{selectDate: selectedDate});
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

  const SwitchProgram = async () => {
    dispatch(setLoader(true));
    const today = new Date();
    today.setDate(today.getDate() + 7);
    // Format the resulting date as a string in ISO format
    const sevenDaysLater = today.toISOString().split("T")[0];
    try {
      const res = await ApiCall({
        params: {
          startDate: selectedDate,
          programId: selectedItemId,
          planId: user?.plan_id,
        },
        route: "assignProgram/switch_assign_Program",
        verb: "post",
        token: token,
      });
      if (res?.status == "200") {
        dispatch(Assprogram(res?.response?.Assigned_Program));
        dispatch(getSingleUser(token));
        dispatch(setLoader(false));
        navigation.navigate("WorkoutSucessfully",{selectDate: selectedDate});
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
      Alert.alert('', ' Do you want to switch to new program?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style:"destructive"
        },
        {text: 'Continue', onPress: () => toggleModal(), style:"default"},
      ]);
    }
    else{
      toggleModal()
    }
  };

  return (
    <View style={{ flex: 1 }}>
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
                >
                  <Text
                    style={{
                      fontSize: getFontSize(1.9),
                      // fontSize: 14,

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
                      right: getWidth(9),
                      borderRadius: 25,
                    }}
                  >
                    {/* <RightIcon height={15} width={15} /> */}
                    <Ionicons
                      name="checkmark-sharp"
                      size={20}
                      color={colors.white}
                      //style={{marginTop: getWidth(2)}}
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
      { selectedItemId !== user?.program_id ?
      <TouchableOpacity
        onPress={() => {
          handleAddToCalendar()
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
:null}

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
            minDate={new Date()}
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
