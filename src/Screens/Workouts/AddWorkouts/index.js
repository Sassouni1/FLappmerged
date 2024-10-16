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

const AddWorkouts = () => {
  const navigation = useNavigation();
  const [isTime, setIsTime] = useState(false);
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());

  const [assigWorkout, setAssigWorkout] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);
  const [weekDataProgress, setWeekDataProgress] = useState({});

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    dispatch(setLoader(true));
    getSingleExcercise(selectedDate);
    exerciseProgress(selectedDate);
  };
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
      return "N/A"; // You can change this to a default value if needed
    }
  };
  const getSingleExcercise = async (selectedDate) => {
    try {
      console.log("started");
      const res = await ApiCall({
        route: `assignProgram/given-date-workouts/${
          user?.plan_id
        }&${selectedDate.toISOString()}`,
        verb: "get",
        token: token,
      });
      console.log("starteddd", res);
      if (res?.status == "200") {
        console.log(
          "respone of add workoutss",
          res?.response?.Workout[0]?.innerWorkout[0]?.exercise
        );
        setAssigWorkout(res?.response?.Workout[0]);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        setAssigWorkout([]);
        console.log("errorrrr in calenders");
      }
    } catch (e) {
      console.log("api get skill errorrrr -- ", e.toString());
    }
  };

  const exerciseProgress = async (selectedDate) => {
    try {
      const res = await ApiCall({
        route: `assignProgram/user_status/${user?.user_id}`,
        verb: "post",
        token: token,
        params: {
          givenDate: selectedDate,
        },
      });

      if (res?.status == "200") {
        console.log(
          "workouts progress response",
          res?.response?.weeklyProgress,
          selectedDate
        );
        setWeekDataProgress({ ...res?.response?.weeklyProgress });
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
      getSingleExcercise(date);
      exerciseProgress(date);
    }, [date])
  );

  let weekProgress = {
    Monday: weekDataProgress?.Monday,
    Tuesday: weekDataProgress?.Tuesday,
    Wednesday: weekDataProgress?.Wednesday,
    Thursday: weekDataProgress?.Thursday,
    Friday: weekDataProgress?.Friday,
    Saturday: weekDataProgress?.Saturday,
    Sunday: weekDataProgress?.Sunday,
  };

  let customDatesStyles = [];
  const startDate = new Date(date);
  const endDate = new Date(date);
  if (startDate.getDay() === 0) {
    startDate.setDate(startDate.getDate() - 6);
  } else {
    const diff = startDate.getDay() - 1;
    startDate.setDate(startDate.getDate() - diff);
  }
  endDate.setDate(startDate.getDate() + 6);

  const dayOfWeekMap = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const selectedDayOfWeek = new Date(date).getDay();
  const selectedDayName = dayOfWeekMap[selectedDayOfWeek];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dayOfWeek = currentDate.getDay();
    const dayName = dayOfWeekMap[dayOfWeek];

    if (dayName == selectedDayName) {
      customDatesStyles.push({
        startDate: currentDate,
        dateNameStyle: { color: "white" },
        dateNumberStyle: { color: "white" },
        dateContainerStyle: {
          backgroundColor: "rgba(255,255,255,0.9)",
          borderWidth: 0,
          width: getWidth(11),
          borderRadius: 13,
        },
      });
    } else {
      switch (weekProgress[dayName]) {
        case "coming soon":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: "#05b7ff" },
            dateNumberStyle: { color: "#05b7ff" },
            dateContainerStyle: {
              backgroundColor: "#393C43",
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: 13,
            },
          });
          break;
        case "partially complete":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.buttonColor },
            dateNumberStyle: { color: colors.buttonColor },
            dateContainerStyle: {
              backgroundColor: "#393C43",
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: 13,
            },
          });
          break;
        case "not assigned":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.gray1 },
            dateNumberStyle: { color: colors.gray1 },
            dateContainerStyle: {
              backgroundColor: "#393C43",
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: 13,
            },
          });
          break;
        case "assigned":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: "#05b7ff" },
            dateNumberStyle: { color: "#05b7ff" },
            dateContainerStyle: {
              backgroundColor: "#393C43",
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: 13,
            },
          });
          break;
        case "complete":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.greenlight },
            dateNumberStyle: { color: colors.greenlight },
            dateContainerStyle: {
              backgroundColor: "#393C43",
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: 13,
            },
          });
          break;
        case "missed":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.redtime },
            dateNumberStyle: { color: colors.redtime },
            dateContainerStyle: {
              backgroundColor: "#393C43",
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: 13,
            },
          });
        default:
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.white },
            dateNumberStyle: { color: colors.white },
            dateContainerStyle: {
              backgroundColor: "#393C43",
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: 13,
            },
          });
          break;
      }
    }
  }

  return (
    <View
      style={{
        flex: 1,

        marginTop: getFontSize(1),
      }}
    >
      <ReactNativeCalendarStrip
        showMonth={false}
        selectedDate={date}
        onDateSelected={handleDateChange}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        customDatesStyles={customDatesStyles}
        style={{
          height: getHeight(8),
          paddingHorizontal: 2,
        }}
        iconContainer={{ flex: 0.05 }}
      />

      <FlatList
        style={{
          marginTop: 35,
        }}
        data={assigWorkout?.innerWorkout}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View style={{ height: getHeight(10) }}></View>
        )}
        // ListEmptyComponent={() => (
        //   <>
        //     {isTime ? (
        //       <View
        //         style={{
        //           justifyContent: 'center',
        //           alignItems: 'center',
        //           height: getFontSize(55),
        //         }}
        //       >
        //         {loader ? null : (
        //           <View
        //             style={{ justifyContent: 'center', alignItems: 'center' }}
        //           >
        //             <AntDesign
        //               size={getFontSize(8)}
        //               color={'white'}
        //               name="exclamationcircleo"
        //             />
        //             <Text
        //               style={{
        //                 fontSize: getFontSize(2),
        //                 color: colors.graytext5,
        //                 marginTop: getHeight(1),
        //               }}
        //             >
        //               No workout found on selected date
        //             </Text>
        //           </View>
        //         )}
        //       </View>
        //     ) : (
        //       <View
        //         style={{
        //           justifyContent: 'center',
        //           alignItems: 'center',
        //           height: getFontSize(55),
        //         }}
        //       >
        //         {loader ? null : (
        //           <View
        //             style={{ justifyContent: 'center', alignItems: 'center' }}
        //           >
        //             <AntDesign
        //               size={getFontSize(8)}
        //               color={'white'}
        //               name="exclamationcircleo"
        //             />
        //             <Text
        //               style={{
        //                 fontSize: getFontSize(2),
        //                 color: colors.graytext5,
        //                 marginTop: getHeight(1),
        //               }}
        //             >
        //               No workout found on selected date
        //             </Text>
        //           </View>
        //         )}
        //       </View>
        //     )}
        //   </>
        // )}
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ fontWeight: "700", fontSize: 20 }}>
              Endurance & Upper Body
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
              Prepare to transform your chest muscles with our targeted and
              effective chest workout routine tailored for you.
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
                  58 Min
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
                  254 Cal
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
                  Upper
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
              activeOpacity={0.8}
            >
              <Image
                source={require("../../../assets/images/exercse1.png")}
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
                  Exercise 1
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 20,
                  }}
                >
                  Back Warmup
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
            <View
              style={{
                backgroundColor: "#F3F3F4",
                borderRadius: 25,
                width: "100%",
                alignItems: "center",
                marginTop: 10,
                flexDirection: "row",
                padding: 10,
              }}
            >
              <Image
                source={require("../../../assets/images/exercse1.png")}
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
                  Exercise 2
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 20,
                  }}
                >
                  Bent Over Row
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
                  <Text>12:30</Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: "#F3F3F4",
                borderRadius: 25,
                width: "100%",
                alignItems: "center",
                marginTop: 10,
                flexDirection: "row",
                padding: 10,
              }}
            >
              <Image
                source={require("../../../assets/images/exercse1.png")}
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
                  Exercise 1
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 20,
                  }}
                >
                  Back Warmup
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
                  <Text>12:15</Text>
                </View>
              </View>
            </View>
            <TouchableOpacity
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
            </TouchableOpacity>
          </View>
        )}
        refreshing={false}
        onRefresh={() => getSingleExcercise(date)}
        renderItem={({ item }) => {
          return (
            <View style={{ marginLeft: getWidth(2) }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: getWidth(3),
                  marginBottom: getHeight(1),
                  marginTop: getHeight(1.8),
                }}
              >
                <Text
                  style={{
                    ...styles.chest,
                    fontSize: getFontSize(2.5),
                    marginTop: getHeight(0.5),
                  }}
                >
                  {item?.workoutName}
                </Text>
                <View
                  style={{
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: getHeight(0.5),
                  }}
                >
                  <Text
                    style={{
                      color: colors.graytext5,
                      fontFamily: fonts.URe,
                      fontSize: 10,
                    }}
                  >
                    {item?.exercise.length} exercises
                  </Text>
                  <Text
                    style={{
                      color: colors.graytext5,
                      fontFamily: fonts.URe,
                      fontSize: 10,
                    }}
                  >
                    {item?.calories} Calories
                  </Text>
                </View>
              </View>
              <Seprator
                style={{
                  width: getWidth(95),
                  alignSelf: "center",
                  marginTop: getHeight(1),
                }}
              />

              {item.exercise.map((ex) => (
                <TouchableOpacity
                  onPress={() => {
                    if (ex?.complete == "true") {
                      navigation.navigate("SubmittedWorkouts", {
                        workoutId: assigWorkout?._id,
                        innerWorkoutId: item?._id,
                        exerciseId: ex?._id,
                        exerciseName: ex?.exercise_name,
                      });
                    } else {
                      navigation.navigate("CompleteWorkout", {
                        workoutId: assigWorkout?._id,
                        innerWorkoutId: item?._id,
                        exerciseId: ex?._id,
                        calories: item?.calories,
                        given_sets: ex?.sets,
                        exerciseName: ex?.exercise_name,
                      });
                    }
                  }}
                >
                  {ex?.task?.length > 0
                    ? ex?.task.map((ex, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginLeft: getWidth(3),
                            marginTop: index == 0 ? getHeight(2) : null,
                          }}
                        >
                          {ex?.video_thumbnail ? (
                            <View>
                              {index == 0 ? null : (
                                <View style={{ alignItems: "center" }}>
                                  <View
                                    style={{
                                      height: getHeight(2),
                                      width: getWidth(2),
                                      backgroundColor: "white",
                                    }}
                                  ></View>
                                </View>
                              )}

                              <Image
                                source={{ uri: ex?.video_thumbnail }}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              ></Image>
                              {console.log("thunmbnail", ex?.video_thumbnail)}
                            </View>
                          ) : (
                            <View>
                              {index == 0 ? null : (
                                <View style={{ alignItems: "center" }}>
                                  <View
                                    style={{
                                      height: getHeight(2),
                                      width: getWidth(2),
                                      backgroundColor: "white",
                                    }}
                                  ></View>
                                </View>
                              )}
                              <View style={styles.thumbnail}>
                                <PlayerSvg height={20} width={20} />
                              </View>
                            </View>
                          )}

                          <View
                            style={{
                              marginLeft: getWidth(2),
                              marginTop: index == 0 ? null : getHeight(2),
                            }}
                          >
                            <Text style={styles.heading}>
                              {ex?.exercise_name}
                            </Text>

                            <View
                              style={{
                                flexDirection: "row",
                                marginTop: getFontSize(0.5),
                              }}
                            >
                              <Text
                                numberOfLines={1}
                                style={{ width: getWidth(60) }}
                              >
                                <Text
                                  style={{
                                    ...styles.total,
                                    fontSize: getFontSize(1.5),
                                  }}
                                >
                                  {ex?.no_of_sets} sets
                                </Text>
                                {ex?.sets.map((set, index) => (
                                  <Text
                                    style={{
                                      ...styles.text,
                                      fontSize: getFontSize(1.5),
                                      color: colors.graytext5,
                                    }}
                                    key={index}
                                  >
                                    {` `}|{` `}
                                    {getUnit(set)}
                                  </Text>
                                ))}
                              </Text>
                            </View>
                            {ex?.complete == "true" ? (
                              <View>
                                <Image
                                  resizeMode="contain"
                                  source={require("../../../assets/images/completed.png")}
                                  style={{
                                    height: getFontSize(2),
                                    width: getWidth(30),
                                    marginTop: getFontSize(0.2),
                                  }}
                                />
                              </View>
                            ) : null}
                          </View>
                        </View>
                      ))
                    : null}
                  {ex?.exercise_name && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: getWidth(3),
                        marginTop: getHeight(2),
                      }}
                    >
                      {/* {console.log("thunmbnail2", ex?.video_thumbnail)} */}
                      {ex?.video_thumbnail ? (
                        <Image
                          source={{ uri: ex?.video_thumbnail }}
                          style={styles.thumbnail}
                          resizeMode="cover"
                        ></Image>
                      ) : (
                        <View style={styles.thumbnail}>
                          <PlayerSvg height={20} width={20} />
                        </View>
                      )}
                      <View style={{ marginLeft: getWidth(2) }}>
                        <Text style={styles.heading}>{ex?.exercise_name}</Text>

                        <View
                          style={{
                            flexDirection: "row",
                            marginTop: getFontSize(0.5),
                          }}
                        >
                          <Text
                            numberOfLines={1}
                            style={{ width: getWidth(60) }}
                          >
                            <Text
                              style={{
                                ...styles.total,
                                fontSize: getFontSize(1.5),
                              }}
                            >
                              {ex?.no_of_sets} sets
                            </Text>
                            {ex?.sets.map((set, index) => (
                              <Text
                                style={{
                                  ...styles.text,
                                  fontSize: getFontSize(1.5),
                                  color: colors.graytext5,
                                }}
                                key={index}
                              >
                                {` `}|{` `}
                                {getUnit(set)}
                              </Text>
                            ))}
                          </Text>
                        </View>
                        {ex?.complete == "true" ? (
                          <View>
                            <Image
                              resizeMode="contain"
                              source={require("../../../assets/images/completed.png")}
                              style={{
                                height: getFontSize(2),
                                width: getWidth(30),
                                marginTop: getFontSize(0.2),
                              }}
                            />
                          </View>
                        ) : null}
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
      />
      {assigWorkout?.innerWorkout &&
      assigWorkout?.innerWorkout.length > 0 &&
      assigWorkout?.progress !== 100 ? (
        <View
          style={{
            position: "absolute",
            bottom: getHeight(2),
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            alignSelf: "center",
            width: getWidth(100),
          }}
        >
          <Button
            text={"Add Aditional workout"}
            onPress={() =>
              navigation.navigate("AditionalWorkout", {
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
            text={assigWorkout?.progress > 0 ? "Resume" : "Start"}
            onPress={() =>
              navigation.navigate("Squat", {
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
      ) : null}
    </View>
  );
};

export default AddWorkouts;
