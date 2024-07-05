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
import { useNavigation, useFocusEffect, useIsFocused } from "@react-navigation/native";
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
import { ActivityIndicator } from "react-native-paper";

const AddWorkouts = ({ workoutData, _id }) => {
  // console.log({ workoutData })
  const navigation = useNavigation();
  const [isTime, setIsTime] = useState(false);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [workout, setWorkout] = useState(null);
  const isFocused = useIsFocused()
  const [assigWorkout, setAssigWorkout] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);
  const [weekDataProgress, setWeekDataProgress] = useState({});

  const calculateDayIndex = (selectedDate) => {
    dispatch(setLoader(true));

    const currentDate = new Date();
    const normalizedCurrentDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate()
    );
    const normalizedSelectedDate = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate()
    );
    const diffTime = normalizedSelectedDate - normalizedCurrentDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)); // Floor to get an integer day difference
    dispatch(setLoader(false))
    return diffDays;
  };

  const fetchWorkout = (selectedDate) => {
    dispatch(setLoader(true));

    const dayIndex = calculateDayIndex(selectedDate);
    if (dayIndex >= 0 && dayIndex < workoutData?.workouts.length) {
      setWorkout(workoutData?.workouts[dayIndex]);
      if (workout !== null) {
        dispatch(setLoader(false))

      }

    } else {
      console.log('Invalid day index');
      setWorkout(null);
      dispatch(setLoader(false))

    }


  };

  const handleDateChange = (selectedDate) => {
    dispatch(setLoader(true));

    setDate(new Date(selectedDate));
    fetchWorkout(new Date(selectedDate));
  };

  useEffect(() => {

    fetchWorkout(date);
    console.log({ loader })


  }, [ date, workoutData]);




  // const handleDateChange = (selectedDate) => {
  //   console.log({selectedDate})
  //   setDate(selectedDate);
  //   dispatch(setLoader(true));
  //   getSingleExcercise(selectedDate);
  //   exerciseProgress(selectedDate);
  // };
  const getUnit = (set) => {
    if (set.weight) {
      return `${set.weight} kg`;
    } else if (set.seconds) {
      return `${set.seconds} seconds`;
    } else if (set.distance) {
      return `${set.distance} miles`;
    } else if (set.yards) {
      return `${set.yards} yards`;
    } else if (set.meters) {
      return `${set.meters} meters`;
    } else if (set.parameter == "lbs") {
      return `${set.lbs ? set.lbs : 0} lbs`;
    } else if (set.parameter == "reps") {
      return `${set.reps} reps`;
    } else {
      return "N/A"; 
    }
  };
  // const getSingleExcercise = async (selectedDate) => {
  //   try {
  //     // console.log("started");
  //     const res = await ApiCall({
  //       route: `assignProgram/given-date-workouts/${user?.plan_id
  //         }&${selectedDate.toISOString()}`,
  //       verb: "get",
  //       token: token,
  //     });
  //     // console.log("starteddd", res);
  //     if (res?.status == "200") {
  //       console.log(
  //         "respone of add workoutss",
  //         res?.response?.Workout[0]?.innerWorkout[0]?.exercise
  //               );
  //       setAssigWorkout(res?.response?.Workout[0]);
  //       dispatch(setLoader(false));
  //     } else {
  //       dispatch(setLoader(false));

  //       setAssigWorkout([]);
  //       console.log("errorrrr in calenders");
  //     }
  //   } catch (e) {
  //     console.log("api get skill errorrrr -- ", e.toString());
  //   }
  // };

  // const exerciseProgress = async (selectedDate) => {

  //   try {
  //     const res = await ApiCall({
  //       route: `assignProgram/user_status/${user?.user_id}`,
  //       verb: "post",
  //       token: token,
  //       params: {
  //         givenDate: selectedDate,
  //       },
  //     });

  //     if (res?.status == "200") {
  //       console.log(
  //         "workouts progress response",
  //         res?.response?.weeklyProgress,
  //         selectedDate
  //       );
  //       setWeekDataProgress({ ...res?.response?.weeklyProgress });
  //       dispatch(setLoader(false));
  //     } else {
  //       dispatch(setLoader(false));
  //       console.log("errorrrr in calenders progress");
  //     }
  //   } catch (e) {
  //     console.log("api get skill error -- ", e.toString());
  //   }
  // };

  // useFocusEffect(
  //   React.useCallback(() => {

  //     dispatch(setLoader(true));
  //     getSingleExcercise(date);
  //     exerciseProgress(date);
  //   }, [date])
  // );

  // let weekProgress = {
  //   Monday: weekDataProgress?.Monday,
  //   Tuesday: weekDataProgress?.Tuesday,
  //   Wednesday: weekDataProgress?.Wednesday,
  //   Thursday: weekDataProgress?.Thursday,
  //   Friday: weekDataProgress?.Friday,
  //   Saturday: weekDataProgress?.Saturday,
  //   Sunday: weekDataProgress?.Sunday,
  // };

  // let customDatesStyles = [];
  // const startDate = new Date(date);
  // const endDate = new Date(date);
  // if (startDate.getDay() === 0) {
  //   startDate.setDate(startDate.getDate() - 6);
  // } else {
  //   const diff = startDate.getDay() - 1;
  //   startDate.setDate(startDate.getDate() - diff);
  // }
  // endDate.setDate(startDate.getDate() + 6);

  // const dayOfWeekMap = {
  //   0: "Sunday",
  //   1: "Monday",
  //   2: "Tuesday",
  //   3: "Wednesday",
  //   4: "Thursday",
  //   5: "Friday",
  //   6: "Saturday",
  // };

  // const selectedDayOfWeek = new Date(date).getDay();
  // const selectedDayName = dayOfWeekMap[selectedDayOfWeek];

  // for (let i = 0; i < 7; i++) {
  //   const currentDate = new Date(startDate);
  //   currentDate.setDate(startDate.getDate() + i);
  //   const dayOfWeek = currentDate.getDay();
  //   const dayName = dayOfWeekMap[dayOfWeek];

  //   if (dayName == selectedDayName) {
  //     customDatesStyles.push({
  //       startDate: currentDate,
  //       dateNameStyle: { color: "white" },
  //       dateNumberStyle: { color: "white" },
  //       dateContainerStyle: {
  //         backgroundColor: "rgba(255,255,255,0.9)",
  //         borderWidth: 0,
  //         width: getWidth(11),
  //         borderRadius: 13,
  //       },
  //     });
  //   } else {
  //     switch (weekProgress[dayName]) {
  //       case "coming soon":
  //         customDatesStyles.push({
  //           startDate: currentDate,
  //           dateNameStyle: { color: "#05b7ff" },
  //           dateNumberStyle: { color: "#05b7ff" },
  //           dateContainerStyle: {
  //             backgroundColor: "#393C43",
  //             borderWidth: 0,
  //             width: getWidth(11),
  //             borderRadius: 13,
  //           },
  //         });
  //         break;
  //       case "partially complete":
  //         customDatesStyles.push({
  //           startDate: currentDate,
  //           dateNameStyle: { color: colors.buttonColor },
  //           dateNumberStyle: { color: colors.buttonColor },
  //           dateContainerStyle: {
  //             backgroundColor: "#393C43",
  //             borderWidth: 0,
  //             width: getWidth(11),
  //             borderRadius: 13,
  //           },
  //         });
  //         break;
  //       case "not assigned":
  //         customDatesStyles.push({
  //           startDate: currentDate,
  //           dateNameStyle: { color: colors.gray1 },
  //           dateNumberStyle: { color: colors.gray1 },
  //           dateContainerStyle: {
  //             backgroundColor: "#393C43",
  //             borderWidth: 0,
  //             width: getWidth(11),
  //             borderRadius: 13,
  //           },
  //         });
  //         break;
  //       case "assigned":
  //         customDatesStyles.push({
  //           startDate: currentDate,
  //           dateNameStyle: { color: "#05b7ff" },
  //           dateNumberStyle: { color: "#05b7ff" },
  //           dateContainerStyle: {
  //             backgroundColor: "#393C43",
  //             borderWidth: 0,
  //             width: getWidth(11),
  //             borderRadius: 13,
  //           },
  //         });
  //         break;
  //       case "complete":
  //         customDatesStyles.push({
  //           startDate: currentDate,
  //           dateNameStyle: { color: colors.greenlight },
  //           dateNumberStyle: { color: colors.greenlight },
  //           dateContainerStyle: {
  //             backgroundColor: "#393C43",
  //             borderWidth: 0,
  //             width: getWidth(11),
  //             borderRadius: 13,
  //           },
  //         });
  //         break;
  //       case "missed":
  //         customDatesStyles.push({
  //           startDate: currentDate,
  //           dateNameStyle: { color: colors.redtime },
  //           dateNumberStyle: { color: colors.redtime },
  //           dateContainerStyle: {
  //             backgroundColor: "#393C43",
  //             borderWidth: 0,
  //             width: getWidth(11),
  //             borderRadius: 13,
  //           },
  //         });
  //       default:
  //         customDatesStyles.push({
  //           startDate: currentDate,
  //           dateNameStyle: { color: colors.white },
  //           dateNumberStyle: { color: colors.white },
  //           dateContainerStyle: {
  //             backgroundColor: "#393C43",
  //             borderWidth: 0,
  //             width: getWidth(11),
  //             borderRadius: 13,
  //           },
  //         });
  //         break;
  //     }
  //   }
  // }

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor:"white",
        marginTop: getFontSize(1),
      }}
    >
      <ReactNativeCalendarStrip
        showMonth={false}
        selectedDate={date}
        onDateSelected={handleDateChange}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        iconContainer={{ flex: 0.05 }}
        highlightDateContainerStyle={{
          backgroundColor: "white",
        }}
        highlightDateNameStyle={{
          color: "black",
        }}
        highlightDateNumberStyle={{
          color: "black",
        }}
        dateNameStyle={{ color: "#05b7ff" }}
        dateNumberStyle={{ color: "#05b7ff" }}
        customDatesStyles={Array(365).fill().map((_, i) => ({
          date: new Date(Date.now() + i * 24 * 60 * 60 * 1000),
          style: {
            dateContainerStyle: {
              backgroundColor: "black",
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: 13,
            },
          },
        }))}
        style={{
          height: getHeight(8),
          paddingHorizontal: 2,
        }}
      // iconContainer={{ flex: 0.05 }}
      />



      {/* {workout&& */}
      < FlatList
        style={{
          marginTop: 35,
        }}
        data={workout?.innerWorkout}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View style={{ height: getHeight(10) }}></View>
        )}
        ListEmptyComponent={() => (
          <>

            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: getFontSize(55),
              }}
            >
              {loader ? null :
                workout?.innerWorkout.length == 0 && (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <AntDesign
                      size={getFontSize(8)}
                      color={"white"}
                      name="exclamationcircleo"
                    />
                    <Text
                      style={{
                        fontSize: getFontSize(2),
                        color: colors.graytext5,
                        marginTop: getHeight(1),
                      }}
                    >
                      No workout found on selected date
                    </Text>
                  </View>
                )}
            </View>

          </>
        )}
        refreshing={false}
        //  onRefresh={() => getSingleExcercise(date)}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10
              }}
            >
              <Text style={{ fontWeight: "700", fontSize: 20, color: colors.black }}>
                {item?.workoutName}
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
                {item?.description}
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
                      color: colors.black

                    }}
                  >
                    {item?.workoutLength ? item?.workoutLength : 58} Min
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
                      color: colors.black

                    }}
                  >
                    {item?.calories} Cal
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
                      color: colors.black

                    }}
                  >
                    Upper
                  </Text>
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    {item?.focus ? item?.focus : 'Focus'}
                  </Text>
                </View>
              </View>
              {
                item.exercise[0].task.length > 0 &&
                item.exercise[0].task.map((taskEx, i) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (taskEx?.complete == 'true') {
                        navigation.navigate('SubmittedWorkouts', {
                          workoutId: workout?._id,
                          innerWorkoutId: item?._id,
                          exerciseId: ex?._id,
                          exerciseName: taskEx?.exercise_name,
                        })
                      } else {
                        navigation.navigate('CompleteWorkout', {
                          programId: _id,
                          workoutId: workout?._id,
                          innerWorkoutId: item?._id,
                          exerciseId: taskEx?._id,
                          calories: item?.calories,
                          given_sets: taskEx?.sets,
                          exerciseName: taskEx?.exercise_name,
                        })
                      }
                    }}
                    style={{
                      backgroundColor: "#F3F3F4",
                      borderRadius: 25,
                      width: "100%",
                      alignItems: "center",
                      marginTop: 10,
                      flexDirection: "row",
                      padding: 10,
                    }}
                    activeOpacity={0.8}
                  >
                    {taskEx?.video_thumbnail ?
                      <Image
                        source={{ uri: taskEx?.video_thumbnail }}
                        style={{
                          width: 90,
                          height: 90,
                        }}
                      />
                      :
                      <Image
                        source={require("../../../assets/images/exercse1.png")}
                        style={{
                          width: 90,
                          height: 90,
                        }}
                      />

                    }



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
                        Exercise {i + 1}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 20,
                          color: colors.black
                        }}
                      >
                        {taskEx?.exercise_name}
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

                ))



              }
              {
                item.exercise[0].task.length === 0 &&
                item.exercise.map((ex, index) => (
                  <TouchableOpacity
                    onPress={() => {
                      if (ex?.complete == 'true') {
                        navigation.navigate('SubmittedWorkouts', {
                          workoutId: workout?._id,
                          innerWorkoutId: item?._id,
                          exerciseId: ex?._id,
                          exerciseName: ex?.exercise_name,
                        })
                      } else {
                        navigation.navigate('CompleteWorkout', {
                          programId: _id,
                          workoutId: workout?._id,
                          innerWorkoutId: item?._id,
                          exerciseId: ex?._id,
                          calories: item?.calories,
                          given_sets: ex?.sets,
                          exerciseName: ex?.exercise_name,
                        })
                      }
                    }}
                    style={{
                      backgroundColor: "#F3F3F4",
                      borderRadius: 25,
                      width: "100%",
                      alignItems: "center",
                      marginTop: 10,
                      flexDirection: "row",
                      padding: 10,
                    }}
                    activeOpacity={0.8}
                  >
                    {ex?.video_thumbnail ?
                      <Image
                        source={{ uri: ex?.video_thumbnail }}
                        style={{
                          width: 90,
                          height: 90,
                        }}
                      />
                      :
                      <Image
                        source={require("../../../assets/images/exercse1.png")}
                        style={{
                          width: 90,
                          height: 90,
                        }}
                      />

                    }



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
                        Exercise {index + 1}
                      </Text>
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 20,
                          color: colors.black
                        }}
                      >
                        {ex?.exercise_name}
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

                ))
              }
              {/* {item.exercise.map((ex, index) => (
                 <TouchableOpacity
                   onPress={() => {
                     if (ex?.complete == 'true') {
                       navigation.navigate('SubmittedWorkouts', {
                         workoutId: workout?._id,
                         innerWorkoutId: item?._id,
                         exerciseId: ex?._id,
                         exerciseName: ex?.exercise_name,
                       })
                     } else {
                       navigation.navigate('CompleteWorkout', {
                         programId: _id,
                         workoutId: workout?._id,
                         innerWorkoutId: item?._id,
                         exerciseId: ex?._id,
                         calories: item?.calories,
                         given_sets: ex?.sets,
                         exerciseName: ex?.exercise_name,
                       })
                     }
                   }}
                   style={{
                     backgroundColor: "#F3F3F4",
                     borderRadius: 25,
                     width: "100%",
                     alignItems: "center",
                     marginTop: 10,
                     flexDirection: "row",
                     padding: 10,
                   }}
                   activeOpacity={0.8}
                 >
                   {item?.video_thumbnail ?
                     <Image
                       source={{ uri: item?.video_thumbnail }}
                       style={{
                         width: 90,
                         height: 90,
                       }}
                     />
                     :
                     <Image
                       source={require("../../../assets/images/exercse1.png")}
                       style={{
                         width: 90,
                         height: 90,
                       }}
                     />
 
                   }
 
 
 
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
                       Exercise {index + 1}
                     </Text>
                     <Text
                       style={{
                         fontWeight: "700",
                         fontSize: 20,
                         color: colors.black
                       }}
                     >
                       {ex?.exercise_name}
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
               ))} */}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("StartWorkout", {
                    workoutId: workout?._id,
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
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("AditionalWorkout", {
                    targetWorkout: workout,
                  })
                }
              >
                <Image
                  source={require("../../../assets/images/exercisebtn2.png")}
                  style={{
                    objectFit: "contain",
                    width: Dimensions.get("screen").width - 18,
                    marginTop: -90,
                  }}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />


      {/* } */}






      {/* {assigWorkout?.innerWorkout &&
      assigWorkout?.innerWorkout.length > 0 &&
      assigWorkout?.progress !== 100 ? (
        <View
          style={{
            position: 'absolute',
            bottom: getHeight(2),
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'center',
            width: getWidth(100),
          }}
        >
          <Button
            text={'Add Aditional workout'}
            onPress={() =>
              navigation.navigate('AditionalWorkout', {
                targetWorkout: assigWorkout,
              })
            }
            btnStyle={{
              ...GernalStyle.btn,
              width: getWidth(60),
              backgroundColor: colors.greenlight,
            }}
            btnTextStyle={GernalStyle.btnText}
          />
          <Button
            //text={"Start workout"}
            text={assigWorkout?.progress > 0 ? 'Resume' : 'Start'}
            onPress={() =>
              navigation.navigate('StartWorkout', {
                workoutId: assigWorkout?._id,
              })
            }
            btnStyle={{
              ...GernalStyle.btn,
              width: getWidth(30),
              backgroundColor: colors.buttonColor,
            }}
            btnTextStyle={GernalStyle.btnText}
          />
        </View>
      ) : null} */}
    </View >
  );
};

export default AddWorkouts;
