import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
//import { ScrollView } from 'react-native-gesture-handler';
import {
  getHeight,
  getWidth,
  getFontSize,
} from "../../../../utils/ResponsiveFun";
import { colors } from "../../../constants/colors";
import Seprator from "../../../Components/Seprator";
import { fonts } from "../../../constants/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import {
  AgreeIcon,
  DelIcon,
  IconWhite,
  RemoveIcon,
} from "../../../../assets/Images";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { ApiCall } from "../../../Services/Apis";
import { setLoader } from "../../../Redux/actions/GernalActions";
import CalendarStrip from "react-native-calendar-strip";
import AntDesign from "react-native-vector-icons/AntDesign";

const AddWorkouts = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const assprogram = useSelector((state) => state.auth.assprogram);
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const [selectedDate, setSelectedDate] = useState(new Date());

  console.log("add workouts", user);

  const [assigWorkout, setAssigWorkout] = useState();
  const [curentDate, setCurrentDate] = useState();

  const planId = user?.plan_id;
  //'65437a4bdb17f05ece0d8a59'
  // console.log('assd',user)

  const assignId = assprogram?._id;
  const assignDate = assprogram?.createdAt;
  const daysWorkout = assprogram?.workout;
  const innerWorkout = assprogram?.workout;
  const currentDate = new Date().toISOString();

  console.log("select date", currentDate);
  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    // Call the API with the selected date
    getSingleExcercise(selectedDate);
  };

  const getSingleExcercise = async (selectedDate) => {
    console.log("hiiii");
    try {
      const res = await ApiCall({
        params: { category_name: "skill" },
        route: `assignProgram/given-date-workouts/${planId}&${selectedDate.toISOString()}`,
        verb: "get",
        token: token,
      });
      console.log("assignProgram started", res);
      if (res?.status == "200") {
        console.log("all workouts", res?.response?.Workout[0]);
        console.log("inner workout", res?.response?.Workout[0]?.innerWorkout);
        // setData()
        setAssigWorkout(res?.response?.Workout);
        // setData(res?.response?.detail)

        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        setAssigWorkout();
        console.log("errorrrr in calenders");
        alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  useEffect(() => {
    dispatch(setLoader(true));
    getSingleExcercise(selectedDate);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      {/* <View style={{height:getHeight(16),paddingHorizontal:getWidth(2)}}> */}
      <CalendarStrip
        showMonth={false}
        selectedDate={currentDate}
        onDateSelected={handleDateChange}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: colors.buttonColor,
        }}
        // iconLeft={require('../../../../assets/Images/leftp.png')}
        highlightDateNumberStyle={{ color: colors.buttonColor }}
        highlightDateNameStyle={{ color: colors.buttonColor }}
        // iconRight={require('../../../../assets/Images/rightp.png')}
        style={{ height: getHeight(8), paddingTop: 5, paddingHorizontal: 5 }}
        // calendarHeaderStyle={{color: colors.white}}
        calendarColor={colors.primary}
        dateNumberStyle={{ color: colors.white }}
        dateNameStyle={{ color: colors.white }}
        iconContainer={{ flex: 0.1 }}
      />

      <FlatList
        data={assigWorkout}
        ListFooterComponent={() => (
          <View style={{ height: getHeight(3) }}></View>
        )}
        renderItem={({ item }) => {
          if (item?.empty_Workout == false) {
          return (
            <View>
              {item?.innerWorkout?.map((item2) => (
                <View>
                  <View style={{ marginLeft: getWidth(2) }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingHorizontal: getWidth(3),
                        marginBottom: getHeight(1),
                      }}
                    >
                      <Text
                        style={{
                          ...styles.chest,
                          fontSize: getFontSize(2.5),
                          marginTop: getHeight(0.5),
                        }}
                      >
                        {item2?.workoutName + `(${item?.workoutDay})`}
                      </Text>
                      <Text
                        style={{
                          color: colors.graytext5,
                          fontFamily: fonts.URe,
                          fontSize: 10,
                        }}
                      >
                        {item2?.exercise.length} exercises
                      </Text>
                    </View>
                    <Seprator
                      style={{
                        width: getWidth(95),
                        alignSelf: "center",
                        marginTop: getHeight(1),
                      }}
                    />

                    {item2.exercise.map((ex) => (
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("StartWorkout", {
                            workoutId: item?._id,
                            innerWorkoutId: item2?._id,
                            exerciseId: item2?.exercise[0]?._id,
                          })
                        }
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginLeft: getWidth(3),
                        }}
                      >
                        {/* {console.log("ex===:",ex)} */}
                        <Image
                          style={{
                            height: 80,
                            width: 80,
                            borderRadius: 5,
                            marginTop: getHeight(1),
                          }}
                          source={require("../../../assets/images/wheelStrech.png")}
                        />
                        {/* {console.log('ex',ex)} */}
                        <View style={{ marginLeft: getWidth(2) }}>
                          <Text style={styles.heading}>
                            {ex?.exercise_name}
                          </Text>
                          <Text
                            style={{
                              ...styles.total,
                              marginTop: getHeight(0.6),
                            }}
                          >
                            {ex?.description}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          ); }
          else {
            // Render the "No workout found" message when innerWorkout is empty
            return (
              <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: getHeight(2) }}>
                <Text style={{ fontSize: getFontSize(2), color: colors.graytext5 }}>No workout found on selected date</Text>
              </View>
            );
          }
        }}
      />
    </View>
  );
};

export default AddWorkouts;
