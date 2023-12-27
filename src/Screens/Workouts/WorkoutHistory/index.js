import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  Alert,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../constants/colors";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import { GernalStyle } from "../../../constants/GernalStyle";
import { useNavigation } from "@react-navigation/native";
import AntDesign from "react-native-vector-icons/AntDesign";
import {
  getFontSize,
  getWidth,
  getHeight,
} from "../../../../utils/ResponsiveFun";
import {
  AngelDown,
  StrechSvg,
  CrunchSvg,
  RopeSvg,
  IconWhite,
  AngelUp,
  PlayerSvg,
} from "../../../assets/images";
import Seprator from "../../../Components/Seprator";
import { styles } from "./styles";
import Button from "../../../Components/Button";
import Header from "../../../Components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { ApiCall } from "../../../Services/Apis";
import { fonts } from "../../../constants/fonts";
import ReactNativeCalendarStrip from "react-native-calendar-strip";
import HeaderBottom from "../../../Components/HeaderBottom";
import Toast from "react-native-simple-toast";

const WorkoutHistory = ({ route }) => {
  const navigation = useNavigation();
  const selectDate = route?.params;
  console.log("selected date", selectDate?.selectDate?.selectDate);
  const [isTime, setIsTime] = useState(false);
  const dispatch = useDispatch();
  const [date, setDate] = useState(selectDate?.selectDate?.selectDate);
  const [assigWorkout, setAssigWorkout] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);
  const [weekDataProgress, setWeekDataProgress] = useState({});

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    dispatch(setLoader(true));
    getSingleExcercise(selectedDate);
    exerciseWeekProgress(selectedDate);
  };
  const getUnit = (set) => {
    if (set.weight) {
      return `${set.weight} kg`;
    } else if (set.seconds) {
      return `${set.seconds} seconds`;
    } else if (set.distance) {
      return `${set.distance} meters`;
    } else if (set.reps) {
      return `${set.reps} reps ${set.lebs} lebs`;
    } else {
      return "N/A"; // You can change this to a default value if needed
    }
  };
  const getSingleExcercise = async (selectedDate) => {
    try {
      const res = await ApiCall({
        route: `assignProgram/given-date-workouts/${user?.plan_id}&${selectedDate}`,
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        setAssigWorkout(res?.response?.Workout[0]);
        console.log(
          "workouts details",
          res?.response?.Workout[0]?.innerWorkout
        );

        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        setAssigWorkout([]);
        console.log("errorrrr in calenders");
        // Alert.alert(res?.response?.message, [
        //   { text: "OK", onPress: () => console.log("OK Pressed") },
        // ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  const exerciseWeekProgress = async (selectedDate) => {
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
          res?.response?.weeklyProgress
        );
        // setWeeklyProgress(res?.response?.weeklyProgress);
        setWeekDataProgress(res?.response?.weeklyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  useEffect(() => {
    dispatch(setLoader(true));
    getSingleExcercise(date);
    exerciseWeekProgress(date);
  }, []);

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
          height: getHeight(8),
          backgroundColor: "rgba(255,255,255,0.3)",
          borderWidth: 0,
          width: getWidth(11),
          borderRadius: getFontSize(0.5),
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
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: getFontSize(0.5),
            },
          });
          break;
        case "partially complete":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.buttonColor },
            dateNumberStyle: { color: colors.buttonColor },
            dateContainerStyle: {
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: getFontSize(0.5),
            },
          });
          break;
        case "not assigned":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.gray1 },
            dateNumberStyle: { color: colors.gray1 },
            dateContainerStyle: {
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: getFontSize(0.5),
            },
          });
          break;
        case "assigned":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: "#05b7ff" },
            dateNumberStyle: { color: "#05b7ff" },
            dateContainerStyle: {
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: getFontSize(0.5),
            },
          });
          break;
        case "complete":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.greenlight },
            dateNumberStyle: { color: colors.greenlight },
            dateContainerStyle: {
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: getFontSize(0.5),
            },
          });
          break;
        case "missed":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.redtime },
            dateNumberStyle: { color: colors.redtime },
            dateContainerStyle: {
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: getFontSize(0.5),
            },
          });
        default:
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.white },
            dateNumberStyle: { color: colors.white },
            dateContainerStyle: {
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(10),
              borderRadius: getFontSize(0.5),
            },
          });
          break;
      }
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.homeColor }}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />

      <HeaderBottom
        title={moment(date).format("dd, MMM Do")}
        RightIcon={
          <TouchableOpacity
            style={{ marginLeft: getWidth(3), alignSelf: "center" }}
            onPress={() => setIsTime(!isTime)}
          >
            {isTime ? (
              <AngelUp height={15} width={15} />
            ) : (
              <AngelDown height={15} width={15} />
            )}
          </TouchableOpacity>
        }
        LeftIcon={
          <TouchableOpacity
            style={{ alignSelf: "center", marginRight: getWidth(4) }}
            onPress={() => navigation.navigate("HomeSc")}
          >
            <Ionicons name={"arrow-back"} size={25} color={"#ffff"} />
          </TouchableOpacity>
        }
      />

      {isTime && (
        <ReactNativeCalendarStrip
          showMonth={false}
          selectedDate={date}
          onDateSelected={handleDateChange}
          customDatesStyles={customDatesStyles}
          calendarAnimation={{ type: "sequence", duration: 30 }}
          iconLeft={require("../../../assets/images/leftp.png")}
          iconRight={require("../../../assets/images/rightp.png")}
          style={{
            height: getHeight(8),
            marginTop: getHeight(2.5),
            paddingHorizontal: 5,
          }}
          calendarColor={colors.primary}
          iconContainer={{ flex: 0.05 }}
        />
      )}
      {/* 
      <FlatList
        data={assigWorkout?.innerWorkout}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View style={{ height: getHeight(10) }}></View>
        )}
        ListEmptyComponent={() => (
          <>
            {isTime ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: getFontSize(65),
                }}
              >
                {loader ? null : (
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
                    }}
                  >
                    No workout found on selected date
                  </Text>
                  </View>
                )}
              </View>
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: getFontSize(85),
                }}
              >
                {loader ? null : (
                  <Text
                    style={{
                      fontSize: getFontSize(2),
                      color: colors.graytext5,
                    }}
                  >
                    Nfound on selected date
                  </Text>
                )}
              </View>
            )}
          </>
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
                <Text
                  style={{
                    color: colors.graytext5,
                    fontFamily: fonts.URe,
                    fontSize: 10,
                  }}
                >
                  {item?.exercise.length} exercises
                </Text>
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
                      });
                    } else {
                      navigation.navigate("CompleteWorkout", {
                        workoutId: assigWorkout?._id,
                        innerWorkoutId: item?._id,
                        exerciseId: ex?._id,
                      });
                    }
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginLeft: getWidth(3),
                    marginTop: getHeight(2),
                  }}
                >
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
                      <Text numberOfLines={1} style={{width:getWidth(60)}}>
                      <Text
                        style={{ ...styles.total, fontSize: getFontSize(1.5) }}
                      >
                        {ex?.no_of_sets} sets
                      </Text>
                      {ex?.sets.map((set, index) => (
                        <Text
                          style={{
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
                </TouchableOpacity>
              ))}
            </View>
          );
        }}
      /> */}
      <FlatList
        data={assigWorkout?.innerWorkout}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={() => (
          <View style={{ height: getHeight(10) }}></View>
        )}
        ListEmptyComponent={() => (
          <>
            {isTime ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: getFontSize(55),
                }}
              >
                {loader ? null : (
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
            ) : (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: getFontSize(55),
                }}
              >
                {loader ? null : (
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
            )}
          </>
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
                <Text
                  style={{
                    color: colors.graytext5,
                    fontFamily: fonts.URe,
                    fontSize: 10,
                  }}
                >
                  {item?.exercise.length} exercises
                </Text>
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
                      });
                    } else {
                      navigation.navigate("CompleteWorkout", {
                        workoutId: assigWorkout?._id,
                        innerWorkoutId: item?._id,
                        exerciseId: ex?._id,
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
      {assigWorkout?.innerWorkout && assigWorkout?.innerWorkout.length > 0 ? (
        <Button
          text={"Start workout"}
          onPress={() =>
            navigation.navigate("StartWorkout", {
              workoutId: assigWorkout?._id,
            })
          }
          btnStyle={{
            ...GernalStyle.btn,
            width: getWidth(60),
            backgroundColor: colors.greenlight,
            position: "absolute",
            bottom: getHeight(5),
          }}
          btnTextStyle={GernalStyle.btnText}
        />
      ) : null}
    </View>
  );
};

export default WorkoutHistory;
