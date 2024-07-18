import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../constants/colors";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import { GernalStyle } from "../../../constants/GernalStyle";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  getFontSize,
  getWidth,
  getHeight,
} from "../../../../utils/ResponsiveFun";
import { PlayerSvg } from "../../../assets/images";
import Seprator from "../../../Components/Seprator";
import { styles } from "./styles";
import Button from "../../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { ApiCall } from "../../../Services/Apis";
import { fonts } from "../../../constants/fonts";
import ReactNativeCalendarStrip from "react-native-calendar-strip";
import moment from 'moment';

const AddWorkouts = () => {
  const navigation = useNavigation();
  const [isTime, setIsTime] = useState(false);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());

  const [assigWorkout, setAssigWorkout] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);
  const [userWorkoutProgress, setUserWorkoutProgress] = useState([]);
  const [exercises, setExercises] = useState({});
  const currentDate = new Date();
  const [customDatesStyles, setCustomDatesStyles] = useState([]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    dispatch(setLoader(true));
    getSingleExcercise(date);
  };

  const getSingleExcercise = async (selectedDate) => {
    try {
      const res = await ApiCall({
        route: `assignProgram/given-date-workouts/${
          user?.plan_id
        }&${selectedDate.toISOString()}`,
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        console.log(
          "respone of add workoutss",
          res?.response?.Workout[0]?.innerWorkout[0]
        );
        setAssigWorkout(res?.response?.Workout[0]?.innerWorkout[0]);
        setExercises(res?.response?.Workout[0]?.innerWorkout[0]?.exercise)
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        setAssigWorkout([]);
        setExercises({})
      }
    } catch (e) {
      console.log("api get skill errorrrr -- ", e.toString());
    }
  };

  const exerciseProgress = async (selectedDate) => {
    try {
      const res = await ApiCall({
        route: `assignProgram/user_program_status/${user?.user_id}`,
        verb: "post",
        token: token,
        params: {
          givenDate: new Date(),
        },
      });

      if (res?.status == "200") {
        console.log(
          "workouts progress response",
          res?.response?.workoutProgress,
          selectedDate
        );
        setUserWorkoutProgress(res?.response?.workoutProgress)
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setLoader(true));
      exerciseProgress(date);
      getSingleExcercise(date);
    }, [])
  );

  useEffect(() => {
    console.log("call for check",userWorkoutProgress);
    // Generate styles for each date in the current month
    const startOfMonth = moment(currentDate).startOf('month');
    const endOfMonth = moment(currentDate).endOf('year');
    const dates = [];
    
    let textColor = colors.white;
    let backgroundColor = '#393C43';

    for (let m = moment(startOfMonth); m.isBefore(endOfMonth); m.add(1, 'days')) {
      let find = userWorkoutProgress?.find(x=> new Date(x.workoutDate).toLocaleDateString() == new Date(m.clone()).toLocaleDateString());
      if (find && find.status == 'assigned')
        textColor = colors.calendarAssigned;
      else if (find && find.status == 'not assigned')
        textColor = colors.gray1;
      else if (find && find.status == 'partially complete')
        textColor = colors.buttonColor;
      else if (find && find.status == 'complete')
        textColor = colors.greenlight;
      else if (find && find.status == 'missed')
        textColor = colors.redtime;
      else if (find && find.status == 'coming soon')
        textColor = colors.calendarAssigned;
      else
        textColor = colors.white

      dates.push({
        startDate: m.clone(),
        dateNameStyle: { color: textColor },
        dateNumberStyle: { color: textColor},
        dateContainerStyle: {
          backgroundColor: backgroundColor,
          borderWidth: 0,
          width: getWidth(11),
          borderRadius: 13,
        },
      });
    }

    setCustomDatesStyles(dates);
  }, [userWorkoutProgress]);

  return (
    <View style={{flex: 1,marginTop: getFontSize(1)}}>
      <ReactNativeCalendarStrip
        showMonth={true}
        selectedDate={date}
        onDateSelected={handleDateChange}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        customDatesStyles={customDatesStyles}
        highlightDateNameStyle={{ color: 'black' }} 
        highlightDateNumberStyle={{ color: 'black' }}
        highlightDateContainerStyle={{
          backgroundColor: 'white',
          borderWidth: 0,
          width: getWidth(11),
          borderRadius: 13,
        }}
        style={{
          height: getHeight(8),
          paddingHorizontal: 2,
        }}
        calendarHeaderStyle={{color:'white'}}
        iconContainer={{ flex: 0.05 }}
      />

      <FlatList
        style={{ marginTop: 35 }}
        data={exercises}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: getFontSize(5),
            }}
          >
            <Text
              style={{
                fontSize: getFontSize(2),
                color: colors.black,
                marginTop: getHeight(1)
              }}>
              No workout found on selected date
            </Text>
          </View>
        )}
        refreshing={false}
        onRefresh={() => getSingleExcercise(date, selectedIndex)}
        ListHeaderComponent={() => (
          <View style={{
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Text style={{ fontWeight: "700", fontSize: 20 }}>
              {assigWorkout?.workoutName}
            </Text>
            <Text
              style={{
                color: "gray",
                marginTop: 8,
                textAlign: "center",
                paddingHorizontal: 20,
                lineHeight: 20,
              }}
            >
              {assigWorkout?.description}
            </Text>
            <View
              style={{
                flexDirection: "row",
                marginTop: 10,
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  paddingHorizontal: 30,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../../assets/images/workoutsclockicon.png")}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {`${assigWorkout?.workoutLength || 0} Min`}
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  Time
                </Text>
              </View>
              <View
                style={{
                  height: 110,
                  width: 1.5,
                  backgroundColor: "lightgray",
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  paddingHorizontal: 30,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../../assets/images/workoutsfireicon.png")}
                  style={{
                    height: 18,
                    width: 18,
                    objectFit: "contain",
                  }}
                />
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {`${assigWorkout?.calories || 0} Cal`}
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  Calorie
                </Text>
              </View>
              <View
                style={{
                  height: 110,
                  width: 1.5,
                  backgroundColor: "lightgray",
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 10,
                  paddingHorizontal: 30,
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../../assets/images/workoutsweightsicon.png")}
                  style={{
                    height: 20,
                    width: 20,
                    objectFit: "contain",
                  }}
                />
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    textAlign: "center",
                  }}
                >
                  {assigWorkout?.focus}
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: 14,
                    textAlign: "center",
                  }}
                >
                  Focus
                </Text>
              </View>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{}}>
            <View style={{ height: 200, marginTop: 20 }}>
              <Button
                // onPress={() => navigation.navigate("ProgramWorkout", { workoutData: route?.params?.passData, programId: _id })}
                onPress={() => { }
                  // navigation.navigate("Squat", {
                  //     program:program,
                  //     workoutId: "66642342de69c0b3aaa8511f",
                  // })
                }
                text={`Start Workout`}
                btnStyle={{
                  ...GernalStyle.btn,
                  borderRadius: 15,
                  height: 60,
                  backgroundColor: colors.orange,
                }}
                btnTextStyle={GernalStyle.btnText}
              />
              <Button
                onPress={() => navigation.goBack()}
                text="Add Additional Workout"
                btnStyle={{
                  ...GernalStyle.btn,
                  borderRadius: 15,
                  height: 45,
                  backgroundColor: colors.greentick,
                  marginTop: 20
                }}
                btnTextStyle={GernalStyle.btnText}
              />
            </View>
            {/* <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() =>
                                navigation.navigate("Squat", {
                                    workoutId: "66642342de69c0b3aaa8511f",
                                })
                            }
                        >
                            <Image
                                source={require("../../../assets/images/startworkoutsbtn.png")}
                                style={{
                                    objectFit: "contain",
                                    width: Dimensions.get("screen").width - 24,
                                    marginTop: -30,
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity activeOpacity={0.8}>
                            <Image
                                source={require("../../../assets/images/exercisebtn2.png")}
                                style={{
                                    objectFit: "contain",
                                    width: Dimensions.get("screen").width - 18,
                                    marginTop: -90,
                                }}
                            />
                        </TouchableOpacity> */}
          </View>
        )}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              style={{
                backgroundColor: "#F3F3F4",
                borderRadius: 25,
                width: "100%",
                alignItems: "center",
                marginTop: 10,
                flexDirection: "row",
                padding: 10,
              }}
              onPress={() => {
                navigation.navigate("Squat", {
                  exercise: item,
                })
              }}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: item?.video_thumbnail }}
                style={{
                  width: 90,
                  height: 90,
                }}
              />
              <Image
                source={require("../../../assets/images/exersiseplaybtn.png")}
                style={{
                  width: 50,
                  height: 50,
                  position: "absolute",
                  right: 20,
                }}
              />
              <View
                style={{
                  flexDirection: "column",
                  gap: 6,
                  marginLeft: 15,
                  alignItems: "flex-start",
                }}
              >
                <Text
                  style={{
                    color: "#676C75",
                  }}
                >
                  {`Exercise ${index + 1}`}
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    width: 120,
                    fontSize: 20,
                  }}
                >
                  {item?.exercise_name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 4,
                  }}
                >
                  <Image
                    source={require("../../../assets/images/workoutsclockicon.png")}
                    style={{ height: 20, width: 20 }}
                  />
                  <Text>5:30</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default AddWorkouts;
