import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  Alert,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GernalStyle } from "../../../constants/GernalStyle";
import { colors } from "../../../constants/colors";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import {
  getWidth,
  getFontSize,
  getHeight,
} from "../../../../utils/ResponsiveFun";
import Feather from "react-native-vector-icons/Feather";
import { StopSvg } from "../../../assets/images";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { ApiCall } from "../../../Services/Apis";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import toast from "react-native-simple-toast";
import { updateTimer } from "../../../Redux/actions/AuthActions";
import Button from "../../../Components/Button";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Seprator from "../../../Components/Seprator";
import WebView from "react-native-webview";
import VideoSkills from "../../Skills/Video";
import { fonts } from "../../../constants/fonts";
import { camelCase } from "react-native-svg/lib/typescript/xml";
import RestTimeScreen from "../RestTimeScreen";

const CompleteWorkout = ({ route }) => {
  const navigation = useNavigation();
  const { workoutId, innerWorkoutId, exerciseId, calories, given_sets, programId } =
    route?.params;
  const defaultTimer = { hours: 0, minutes: 0, seconds: 0 };
  const timer =
    useSelector(
      (state) =>
        state.auth.workoutTimers &&
        state.auth.workoutTimers[workoutId] &&
        state.auth.workoutTimers[workoutId][exerciseId]
    ) || defaultTimer;

  const [hours, setHours] = useState(timer.hours);
  const [minutes, setMinutes] = useState(timer.minutes);
  const [seconds, setSeconds] = useState(timer.seconds);
  const [isRunning, setIsRunning] = useState(true); // Track timer state
  const [selectedInput, setSelectedInput] = useState(null);
  const [selectedInputAdditional, setSelectedInputAdditional] = useState(null);
  const [additionalSetCount, setAdditionalSetCount] = useState(0);
  const [complete,setComplete]=useState(false)
  const [inputContent, setInputContent] = useState(
    Array(exercise?.sets.length).fill("")
  ); // State to store input content

  const [inputContentAdditional, setInputContentAdditional] = useState(
    Array(exercise?.sets[0]).fill("")
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSet = () => {
    if (nextIncompleteIndex < exercise[0].task.length - 1) {
      setCurrentIndex(nextIncompleteIndex + 1);
    }
    singleExerciseComplete();
  };

  const previosSet = () => {
    setCurrentIndex(currentIndex - 1);
  };

  // Check if exercise changes and reset the index if needed
  useEffect(() => {
    setCurrentIndex(0);
  }, [exercise]);
  useEffect(() => {
    setAdditionalSetCount(0);
  }, [currentIndex]);

  const dispatch = useDispatch();

  const [exercise, setExercise] = useState([]);

  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);

  // State variables for text inputs
  const [submittedSets, setSubmittedSets] = useState([]);

  const [isVisible, setIsVisible] = useState(true);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  const [readySeconds, setReadySeconds] = useState(3);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setReadySeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const [submitYards, setSubmitYards] = useState(false);

  const [timerSeconds, setTimerSeconds] = useState(22);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const [runningSetIndex, setRunningSetIndex] = useState(null);
  const [weights, setWeights] = useState('');

  const handleWeightChange = (text, index) => {
    const newWeights = [...weights];
    newWeights[index] = text;
    setWeights(newWeights);
  };

  useEffect(() => {
    let timerInterval;

    if (isTimerRunning && timerSeconds > 0) {
      timerInterval = setInterval(() => {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isTimerRunning, timerSeconds]);

  // const startPauseTimer = (index) => {
  //   if (runningSetIndex === null) {
  //     setIsTimerRunning(true);
  //     setRunningSetIndex(index);
  //   } else if (runningSetIndex === index) {
  //     setIsTimerRunning(!isTimerRunning);
  //   }
  //   if (runningSetIndex !== null && runningSetIndex !== index) {
  //     setTimeout(() => {
  //       toast.show("First, complete the ongoing exercise");
  //     }, 0);
  //   }
  // };

  const startTimer = () => {
    setIsTimerRunning(false);
    setRunningSetIndex(null);
    setTimerSeconds(22);
  };
  // const convertTimeToMinutes = (seconds) => {
  //   const minutes = Math.floor(seconds / 60);
  //   const remainingSeconds = seconds % 60;
  //   return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  // };

  // const getColorHeight = (index, timerSeconds) => {
  //   const maxHeight = styles.setView.height;
  //   const height = (22 - timerSeconds) * (maxHeight / 22);
  //   return index === runningSetIndex ? Math.min(maxHeight, height) : 0;
  // };

  // const getSubmitColorHeight = (timerSeconds) => {
  //   const maxHeight = styles.setView.height;
  //   const height = (22 - timerSeconds) * (maxHeight / 22);
  //   return Math.min(maxHeight, height);
  // };


  // const [showRestScreen, setShowRestScreen] = useState(false);

  // const finishRestTime = () => {
  //   setShowRestScreen(false);
  // };

  const updateSubmittedSets = async (
    index,
    reps,
    lbs,
    weight,
    seconds,
    distance,
    yards,
    meters,
    remaining_time
  ) => {
    const updatedSets = [...submittedSets];
    const currentSet = { ...updatedSets[index] };

    if (reps !== "") {
      currentSet.reps = reps;
      currentSet.parameter = "reps";
    } else if (lbs !== "") {
      currentSet.lbs = lbs;
      currentSet.parameter = "lbs";
    } else if (weight !== "") {
      currentSet.weight = weight;
      currentSet.parameter = "weight";
    } else if (seconds !== "") {
      currentSet.seconds = seconds;
      currentSet.parameter = "seconds";
    } else if (distance !== "") {
      currentSet.distance = distance;
      currentSet.parameter = "distance";
    } else if (yards !== "") {
      currentSet.yards = yards;
      currentSet.parameter = "yards";
    } else if (meters !== "") {
      currentSet.meters = meters;
      currentSet.parameter = "meters";
    }

    currentSet.remaining_time =
      remaining_time !== "" ? remaining_time : currentSet.remaining_time;

    updatedSets[index] = currentSet;
    // console.log("gasjhdfgjkashfjkgh", updatedSets);
    setSubmittedSets(updatedSets);
  };

  useEffect(() => {
    let interval;

    if (isRunning) {
      // Only start the timer when it's running
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    }

    // Clean up the interval when the component unmounts or timer is paused
    return () => clearInterval(interval);
  }, [isRunning]);

  // const toggleTimer = () => {
  //   setIsRunning(!isRunning);
  // };


  const getSingleExcercise = async () => {
    console.log({workoutId,innerWorkoutId})
    try {
      const res = await ApiCall({
        route: `program/view_workout_exercise/${programId}`,
        verb: "post",
        token: token,
        params: {
          workout_objId: workoutId,
          // exercise_objId: exerciseId,
          inner_objId: innerWorkoutId,
        },
      });

      if (res?.status == "200") {
        console.log(
          "rsposne of workouts with exercises",
          res?.response?.Workout?.exercise
        );
        setExercise(res?.response?.Workout?.exercise);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders");
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  useEffect(() => {
    getSingleExcercise();

  }, []);

  const [additionalSet, setAdditionalSets] = useState([]);

  const updateAdditionalSets = (
    index,
    reps,
    lbs,
    weight,
    seconds,
    distance,
    yards,
    meters
  ) => {
    const updatedAdditionalSets = [...additionalSet];

    // Create a copy of the current set to avoid mutating the state directly
    const currentSet = { ...updatedAdditionalSets[index] };
    if (reps !== "") {
      currentSet.reps = reps;
      // currentSet.lebs = lebs?.trim() !== "" ? lebs : currentSet.lebs;
      currentSet.parameter = "reps";
    } else if (lbs !== "") {
      currentSet.lbs = lbs;
      currentSet.parameter = "lbs";
    } else if (weight !== "") {
      currentSet.weight = weight;
      currentSet.parameter = "weight";
    } else if (seconds !== "") {
      currentSet.seconds = seconds;
      currentSet.parameter = "seconds";
    } else if (distance !== "") {
      currentSet.distance = distance;
      currentSet.parameter = "distance";
    } else if (yards !== "") {
      currentSet.yards = yards;
      currentSet.parameter = "yards";
    } else if (meters !== "") {
      currentSet.meters = meters;
      currentSet.parameter = "meters";
    }
    updatedAdditionalSets[index] = currentSet;
    setAdditionalSets(updatedAdditionalSets);
  };

  const singleExerciseComplete = async () => {
    try {
      dispatch(setLoader(true));
      let requestParams = {
        workout_objId: workoutId,
        exercise_objId: exerciseId,
        inner_objId: innerWorkoutId,
        calories: calories,
        given_sets:
          exercise?.task?.length > 0
            ? JSON.stringify(exercise?.task?.[nextIncompleteIndex]?.sets)
            : JSON.stringify(given_sets),
        submitted_sets: JSON.stringify(submittedSets),
        additional_sets: JSON.stringify(additionalSet),
        submitted_time: `${hours}:${minutes}:${seconds}`,
      };

      if (exercise?.task?.length > 0) {
        requestParams.task_objId = exercise?.task?.[nextIncompleteIndex]?._id;
      }
      const res = await ApiCall({
        route: `assignProgram/update_exercise/${user?.plan_id}`,
        verb: "post",
        token: token,
        params: requestParams,
      });
      // console.log("submit....", res?.response);
      if (res?.status == "200") {
        toast.show("Exercise successfully completed");
        setSubmittedSets([]);
        setAdditionalSets([]);
        if (exercise?.sets?.length > 0) {
          navigation.navigate("Workouts", { data: "tab2" });
        }
        if (nextIncompleteIndex === exercise.task.length - 1) {
          navigation.navigate("Workouts", { data: "tab2" });
        }
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        toast.show("Enter correct sets");
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  const singleSetComplete = async (
    parameter,
    value,
    remaining_time,
    setid,
    rest_time
  ) => {
    // console.log('rest timd', rest_time )
    try {
      dispatch(setLoader(true));
      const submittedData = {
        parameter: parameter,
        remaining_time: remaining_time,
        [parameter]: value,
      };

      let requestParams = {
        setId: setid,
        workout_objId: workoutId,
        exercise_objId: exerciseId,
        inner_objId: innerWorkoutId,
        submittedData: submittedData,
      };

      if (exercise?.task?.length > 0) {
        requestParams.task_objId = exercise?.task?.[nextIncompleteIndex]?._id;
      }
      const res = await ApiCall({
        route: `assignProgram/update_set/${user?.plan_id}`,
        verb: "post",
        token: token,
        params: requestParams,
      });
      // console.log("submit....set", res?.response);
      if (res?.status == "200") {
        toast.show("set successfully completed");
        navigation.navigate("RestTimeScreen", { restTime: rest_time });
        getSingleExcercise();
        //setSubmittedSets([]);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        toast.show("Enter correct sets");
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  const getParameter = (set) => {
    switch (set.parameter) {
      case "reps":
        return set.reps;
      case "lbs":
        return set.lbs;
      case "weight":
        return set.weight;
      case "seconds":
        return set.seconds;
      case "distance":
        return set.distance;
      case "yards":
        return set.yards;
      case "meters":
        return set.meters;
      default:
        return "";
    }
  };

  useEffect(() => {
    dispatch(updateTimer(workoutId, exerciseId, { hours, minutes, seconds }));
  }, [hours, minutes, seconds, workoutId, exerciseId]);
  const [showAdditionalSets, setShowAdditionalSets] = useState(false);

  const handlePress = () => {
    setShowAdditionalSets(true);
    setAdditionalSetCount(additionalSetCount + 1);
    // update other necessary states or perform additional actions
  };

  function getNextIncompleteTaskIndex(startIndex) {
    for (let i = startIndex; i < exercise[0]?.task?.length; i++) {
      // if (exercise?.task?.[i]?.complete !== "true") {
      //   return i;
      // }
      if (!complete) {
        return i;
      }
    }
    return -1; // Return -1 if no incomplete tasks found
  }

  // Use the function to get the index of the next incomplete task
  const nextIncompleteIndex = getNextIncompleteTaskIndex(currentIndex);

  return (
    <>
      {isVisible ? (
        <View style={{ backgroundColor: colors.white, flex: 1 }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              flexDirection: "column",
            }}
          >
            <Text
              style={{
                ...styles.text,
                fontSize: getFontSize(3.5),
                fontFamily: fonts.UBo,
              }}
            >
              Are you ready?
            </Text>
            <View style={{ ...styles.headerTime, marginTop: getFontSize(1) }}>
              <Text style={{ ...styles.text, fontFamily: fonts.UBo }}>00:</Text>
              <Text style={{ ...styles.text, fontFamily: fonts.UBo }}>
                {readySeconds.toString().padStart(2, "0")}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <View
          style={{ ...GernalStyle.continer, backgroundColor: colors.whiteOp40 }}
        >
          <GeneralStatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor={"#000000"}
            translucent={true}
          />

          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            {exercise&& exercise[0]?.sets?.length > 0 ? (
              <VideoSkills
                data={{ video: exercise[0]?.video, Name: exercise[0]?.exercise_name }}
              />
            ) : (
              <VideoSkills
                data={{
                  video: exercise[0]?.task?.[nextIncompleteIndex]?.video,
                  Name: exercise[0]?.task?.[nextIncompleteIndex]?.exercise_name,
                }}
              />
            )}
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 20,
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
            {exercise.length > 0 &&
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
                    paddingHorizontal: 24,
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
                    {exercise[0]?.no_of_sets?exercise[0].no_of_sets:exercise[0].task[0].no_of_sets} x {given_sets[0]?.reps}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 14,
                      textAlign: "center",

                    }}
                  >
                    Reps
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
                    paddingHorizontal: 18,
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
                    {exercise[0].tempo ? exercise[0].tempo : '1.2.3.1'}
                  </Text>
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    Tempo
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
                    paddingHorizontal: 20,
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
                    {exercise[0].max ? exercise[0].max : 85}%

                  </Text>
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    Max
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
                    paddingHorizontal: 22,
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
                    {exercise[0].rpe ? exercise[0].rpe : 10}

                  </Text>
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    RPE
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
                    paddingHorizontal: 18,
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
                    {exercise[0].rir ? exercise[0].rir : 2}

                  </Text>
                  <Text
                    style={{
                      fontWeight: "400",
                      fontSize: 14,
                      textAlign: "center",
                    }}
                  >
                    RIR
                  </Text>
                </View>
              </View>
            }

            {/* <View
              style={{
                marginTop: getFontSize(4),
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Seprator style={{ width: getWidth(28) }} />
              <Text
                style={{
                  fontSize: getFontSize(1.8),
                  color: colors.blackOp,
                  fontFamily: fonts.UBo,
                  paddingLeft: getFontSize(1),
                  paddingRight: getFontSize(1),
                }}
              >
                {additionalSetCount === 1
                  ? `${additionalSetCount} WORKING SET`
                  : `${additionalSetCount} WORKING SETS`}
              </Text>
              <Seprator style={{ width: getWidth(28) }} />
            </View> */}
            {loader ? null : (
              <>
                <View
                  style={{
                    paddingHorizontal: getWidth(0),
                    marginTop: getFontSize(2.5),
                  }}
                >
                  {exercise[0]?.sets?.length > 0 && (
                    <View
                      style={{
                        marginTop: getFontSize(2),
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Seprator style={{ width: getWidth(30) }} />
                      <Text
                        style={{
                          fontSize: getFontSize(1.8),
                          color: colors.blackOp,
                          fontFamily: "Ubuntu",
                          paddingLeft: getFontSize(1),
                          paddingRight: getFontSize(1),
                        }}
                      >
                        {exercise[0]?.no_of_sets === "1"
                          ? `${exercise[0]?.no_of_sets} WORKING SET`
                          : `${exercise[0]?.no_of_sets} WORKING SETS`}
                      </Text>
                      <Seprator style={{ width: getWidth(30) }} />
                    </View>
                  )}
                     {exercise[0]?.task?.length > 0 && (
                          <View
                            style={{
                              marginTop: getFontSize(2),
                              flexDirection: "row",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Seprator style={{ width: getWidth(30) }} />
                            <Text
                              style={{
                                fontSize: getFontSize(1.8),
                                color: colors.blackOp,
                                fontFamily: "Ubuntu",
                                paddingLeft: getFontSize(1),
                                paddingRight: getFontSize(1),
                              }}
                            >
                              {exercise[0]?.task?.[nextIncompleteIndex]?.no_of_sets ===
                                "1"
                                ? `${exercise[0]?.task?.[nextIncompleteIndex]?.no_of_sets} WORKING SET`
                                : `${exercise[0]?.task?.[nextIncompleteIndex]?.no_of_sets} WORKING SETS`}
                            </Text>
                            <Seprator style={{ width: getWidth(30) }} />
                          </View>
                        )}
                  {exercise.length > 0 && exercise.map((ex, index) => {
                    return (
                      <>
                        {ex?.notes && ex?.notes.length > 0 && (
                          <View
                            key={index}
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <View style={styles.notesStyle}>
                              <Text
                                style={{
                                  color: colors.white,
                                  fontSize: getFontSize(1.5),
                                  fontFamily: "Ubuntu",
                                }}
                              >
                                {ex?.notes}
                              </Text>
                            </View>
                          </View>
                        )
                        }
                     
                        {ex?.task?.length > 0 &&
                          ex?.task?.[nextIncompleteIndex]?.notes &&
                          ex?.task?.[nextIncompleteIndex]?.notes.length > 0 && (
                            <View
                              key={index}
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <View style={styles.notesStyle}>
                                <Text
                                  style={{
                                    color: colors.white,
                                    fontSize: getFontSize(1.5),
                                    fontFamily: "Ubuntu",
                                  }}
                                >
                                  {ex?.task?.[nextIncompleteIndex]?.notes}
                                </Text>
                              </View>
                            </View>
                          )}
                        {ex?.sets?.length > 0
                          ? ex?.sets?.map((set, index) => {
                            return (
                              <View
                                key={index}
                                style={{
                                  paddingHorizontal: getWidth(3),
                                  justifyContent: "center",
                                  alignItems: "center",

                                }}
                              >
                                <View
                                  style={{
                                    ...styles.exerciseParamas,
                                  }}
                                >
                                  {index === 0 ? null : (
                                    <View >
                                      <View
                                        style={{
                                          height: getHeight(8.5),
                                          width: getWidth(0.5),
                                          backgroundColor: colors.gray8,
                                          left: getWidth(7),
                                        }}
                                      ></View>
                                      <View
                                        style={{
                                          flexDirection: "row",
                                          alignItems: "center",
                                          position: "absolute",
                                        }}
                                      >
                                        <View
                                          style={{
                                            width: getHeight(2),
                                            height: getHeight(2),
                                            borderRadius: getHeight(5),
                                            backgroundColor: colors.orange,
                                            position: "absolute",
                                            top: getHeight(3.25),
                                            left: getWidth(5),
                                          }}
                                        ></View>
                                        <Text
                                          style={{
                                            marginLeft: getWidth(8),
                                            top: getHeight(3.25),
                                            left: getWidth(5),
                                            color: colors.black,
                                            fontWeight: "700",
                                          }}
                                        >
                                          {ex.sets[index - 1]?.rest_time}min
                                          rest
                                        </Text>
                                      </View>
                                    </View>
                                  )}
                                  <View
                                    style={{
                                      flexDirection: "row",
                                      alignItems: "center",
                                      backgroundColor: colors.gray6,
                                      height: getHeight(10),
                                      borderRadius: 30

                                    }}
                                  >
                                    <View
                                      style={{
                                        ...styles.setContainer,
                                      }}
                                    >
                                      <View
                                        style={{
                                          ...styles.setParams,

                                        }}
                                      />
                                      <Text
                                        style={{
                                          ...styles.setText,
                                        }}
                                      >
                                        {index + 1}

                                      </Text>
                                    </View>
                                    <View style={styles.setCon}>
                                      <Text style={styles.setName}>
                                        {" "}
                                        {getParameter(set)}
                                      </Text>
                                      <Text style={styles.parameterCon}>
                                        {" "}
                                        {getParameter(set)} {set.parameter}

                                      </Text>
                                    </View>
                                    <View style={{
                                      borderWidth: 0.5,
                                      borderColor: colors.blackDarkOp,
                                      marginRight: 10,
                                      height: getHeight(6)
                                    }} />
                                    <View style={styles.lbsCol}>

                                      <TextInput
                                        style={{ width: getWidth(15), textAlign: "center", letterSpacing: 2, paddingTop: 0, paddingBottom: 0, }}
                                        placeholder="--------"
                                        keyboardType="numeric"
                                        value={weights[index]}
                                        onChangeText={(text) => handleWeightChange(text, index)}

                                        onSubmitEditing={
                                          set?.complete == "true"
                                            ? null
                                            :
                                            () => {
                                              setSubmitYards(true);
                                              singleSetComplete(
                                                set.parameter,
                                                getParameter(set),
                                                timerSeconds,
                                                set?._id,
                                                weights[index]
                                              );
                                              startTimer();
                                            }}
                                      />

                                      <Text>
                                        lbs
                                      </Text>

                                    </View>

                                    <View style={{
                                      borderWidth: 0.5,
                                      borderColor: colors.blackDarkOp,
                                      marginRight: 5,
                                      height: getHeight(10),
                                      marginLeft: 25

                                    }} />
                                    <View style={styles.setParameter}>

                                      <TouchableOpacity
                                        style={{
                                          ...styles.submitCon,
                                          backgroundColor:
                                            set?.complete == "true"
                                              ? colors.orange
                                              : colors.greyBg,
                                        }}
                                        onPress={
                                          set?.complete == "true"
                                            ? null
                                            :
                                            () => {
                                              setSubmitYards(true);
                                              singleSetComplete(
                                                set.parameter,
                                                getParameter(set),
                                                timerSeconds,
                                                set?._id,
                                                weights[index]
                                              );
                                              startTimer();
                                            }
                                        }
                                      >
                                        <Ionicons
                                          name="checkmark-sharp"
                                          size={15}
                                          color={colors.white}
                                        />
                                      </TouchableOpacity>
                                    </View>


                                  </View>
                                </View>
                              </View>
                            )
                          })
                          :
                          ex?.task?.[nextIncompleteIndex]?.sets?.map(
                            (set, index) => (
                              <View key={index}>
                                <View
                                  style={{
                                    paddingHorizontal: getWidth(3),
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <View style={styles.repsCon}>
                                    <View
                                      style={{
                                        backgroundColor: colors.blackOp,
                                        height: getHeight(8),
                                        width: getWidth(10),
                                        justifyContent: "center",
                                        alignItems: "center",
                                        borderTopLeftRadius: getFontSize(1),
                                        borderBottomLeftRadius: getFontSize(1),
                                      }}
                                    >
                                      <Text style={styles.count}>{index + 1}</Text>
                                    </View>
                                    <View style={styles.whiteCon}>
                                      {set?.parameter == "reps" ? (
                                        <View
                                          style={{
                                            ...styles.rowDirection,
                                          }}
                                        >
                                          <TextInput
                                            placeholder="Enter reps"
                                            placeholderTextColor={"gray"}
                                            keyboardType="number-pad"
                                            onFocus={() => setSelectedInput(index)}
                                            onBlur={() => setSelectedInput(null)}
                                            onChangeText={(text) => {
                                              const updatedContent = [
                                                ...inputContent,
                                              ];
                                              updatedContent[index] = text;
                                              setInputContent(updatedContent);
                                              updateSubmittedSets(
                                                index,
                                                text,
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                ""
                                              );
                                            }}
                                            style={{
                                              width: getWidth(30),
                                              color: colors.black,
                                            }}
                                          />
                                          <View style={styles.parameterCtn}>
                                            <Text style={styles.lbs}>
                                              {set.reps}
                                              {`  `}
                                            </Text>
                                            <Text style={styles.lbs}>reps</Text>
                                          </View>
                                        </View>
                                      ) : set?.parameter == "lbs" ? (
                                        <View
                                          style={{
                                            ...styles.rowDirection,
                                          }}
                                        >
                                          <TextInput
                                            placeholder="Enter weight (lbs)"
                                            placeholderTextColor={"gray"}
                                            keyboardType="number-pad"
                                            onFocus={() => setSelectedInput(index)}
                                            onBlur={() => setSelectedInput(null)}
                                            onChangeText={(text) => {
                                              const updatedContent = [
                                                ...inputContent,
                                              ];
                                              updatedContent[index] = text;
                                              setInputContent(updatedContent);
                                              updateSubmittedSets(
                                                index,
                                                "",
                                                text,
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                ""
                                              );
                                            }}
                                            style={{
                                              width: getWidth(30),
                                              color: colors.black,
                                            }}
                                          />
                                          <View style={styles.parameterCtn}>
                                            <Text style={styles.lbs}>
                                              {set.lbs}
                                              {`  `}
                                            </Text>
                                            <Text style={styles.lbs}>lbs</Text>
                                          </View>
                                        </View>
                                      ) : set?.parameter == "weight" ? (
                                        <View
                                          style={{
                                            ...styles.rowDirection,
                                          }}
                                        >
                                          <TextInput
                                            placeholder="Enter weight"
                                            placeholderTextColor={"gray"}
                                            keyboardType="number-pad"
                                            onFocus={() => setSelectedInput(index)}
                                            onBlur={() => setSelectedInput(null)}
                                            onChangeText={(text) => {
                                              const updatedContent = [
                                                ...inputContent,
                                              ];
                                              updatedContent[index] = text;
                                              setInputContent(updatedContent);
                                              updateSubmittedSets(
                                                index,
                                                "",
                                                "",
                                                text,
                                                "",
                                                "",
                                                "",
                                                "",
                                                ""
                                              );
                                            }}
                                            style={{
                                              width: getWidth(30),
                                              color: colors.black,
                                            }}
                                          />
                                          <View style={styles.parameterCtn}>
                                            <Text style={styles.lbs}>
                                              {set.weight}
                                              {`  `}
                                            </Text>
                                            <Text style={styles.lbs}>kg</Text>
                                          </View>
                                        </View>
                                      ) : set?.parameter == "seconds" ? (
                                        <View
                                          style={{
                                            ...styles.rowDirection,
                                          }}
                                        >
                                          <TextInput
                                            placeholder="Enter seconds"
                                            placeholderTextColor={"gray"}
                                            keyboardType="number-pad"
                                            onFocus={() => setSelectedInput(index)}
                                            onBlur={() => setSelectedInput(null)}
                                            onChangeText={(text) => {
                                              const updatedContent = [
                                                ...inputContent,
                                              ];
                                              updatedContent[index] = text;
                                              setInputContent(updatedContent);
                                              updateSubmittedSets(
                                                index,
                                                "",
                                                "",
                                                "",
                                                text,
                                                "",
                                                "",
                                                "",
                                                ""
                                              );
                                            }}
                                            style={{
                                              width: getWidth(30),
                                              color: colors.black,
                                            }}
                                          />
                                          <View style={styles.parameterCtn}>
                                            <Text style={styles.lbs}>
                                              {set.seconds}
                                              {`  `}
                                            </Text>
                                            <Text style={styles.lbs}>sec</Text>
                                          </View>
                                        </View>
                                      ) : set?.parameter == "distance" ? (
                                        <View
                                          style={{
                                            ...styles.rowDirection,
                                          }}
                                        >
                                          <TextInput
                                            placeholder="Enter distance"
                                            placeholderTextColor={"gray"}
                                            keyboardType="number-pad"
                                            onFocus={() => setSelectedInput(index)}
                                            onBlur={() => setSelectedInput(null)}
                                            onChangeText={(text) => {
                                              const updatedContent = [
                                                ...inputContent,
                                              ];
                                              updatedContent[index] = text;
                                              setInputContent(updatedContent);
                                              updateSubmittedSets(
                                                index,
                                                "",
                                                "",
                                                "",
                                                "",
                                                text,
                                                "",
                                                "",
                                                ""
                                              );
                                            }}
                                            style={{
                                              width: getWidth(30),
                                              color: colors.black,
                                            }}
                                          />
                                          <View style={styles.parameterCtn}>
                                            <Text style={styles.lbs}>
                                              {set.distance}
                                              {`  `}
                                            </Text>
                                            <Text style={styles.lbs}>miles</Text>
                                          </View>
                                        </View>
                                      ) : set?.parameter == "yards" ? (
                                        <View
                                          style={{
                                            ...styles.rowDirection,
                                          }}
                                        >
                                          <TextInput
                                            placeholder="Enter distance"
                                            placeholderTextColor={"gray"}
                                            keyboardType="number-pad"
                                            onFocus={() => setSelectedInput(index)}
                                            onBlur={() => setSelectedInput(null)}
                                            onChangeText={(text) => {
                                              const updatedContent = [
                                                ...inputContent,
                                              ];
                                              updatedContent[index] = text;
                                              setInputContent(updatedContent);
                                              updateSubmittedSets(
                                                index,
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                text,
                                                "",
                                                ""
                                              );
                                            }}
                                            style={{
                                              width: getWidth(30),
                                              color: colors.black,
                                            }}
                                          />
                                          <View style={styles.parameterCtn}>
                                            <Text style={styles.lbs}>
                                              {set.yards}
                                              {`  `}
                                            </Text>
                                            <Text style={styles.lbs}>yards</Text>
                                          </View>
                                        </View>
                                      ) : set?.parameter == "meters" ? (
                                        <View
                                          style={{
                                            ...styles.rowDirection,
                                          }}
                                        >
                                          <TextInput
                                            placeholder="Enter distance"
                                            placeholderTextColor={"gray"}
                                            keyboardType="number-pad"
                                            onFocus={() => setSelectedInput(index)}
                                            onBlur={() => setSelectedInput(null)}
                                            onChangeText={(text) => {
                                              const updatedContent = [
                                                ...inputContent,
                                              ];
                                              updatedContent[index] = text;
                                              setInputContent(updatedContent);
                                              updateSubmittedSets(
                                                index,
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                "",
                                                text,
                                                ""
                                              );
                                            }}
                                            style={{
                                              width: getWidth(30),
                                              color: colors.black,
                                            }}
                                          />
                                          <View style={styles.parameterCtn}>
                                            <Text style={styles.lbs}>
                                              {set.meters}
                                              {`  `}
                                            </Text>
                                            <Text style={styles.lbs}>meters</Text>
                                          </View>
                                        </View>
                                      ) : null}
                                    </View>
                                    <View
                                      style={{
                                        width: getWidth(0.3),
                                        height: getHeight(8),
                                        backgroundColor: colors.whiteOp20,
                                      }}
                                    ></View>
                                    <View
                                      style={{
                                        ...styles.tickCon,
                                        backgroundColor:
                                          selectedInput === index ||
                                            inputContent[index]
                                            ? colors.buttonColor
                                            : colors.blackOp,
                                      }}
                                    >
                                      <Ionicons
                                        name="checkmark-sharp"
                                        size={20}
                                        color={colors.blackOp}
                                      />
                                    </View>
                                  </View>
                                  {set?.rest_time != 0 ? (
                                    <View
                                      style={{
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      <View style={styles.notesStyle}>
                                        <Text
                                          style={{
                                            color: colors.blackOp,
                                            fontSize: getFontSize(1.5),
                                            fontFamily: "Ubuntu",
                                          }}
                                        >
                                          {set?.rest_time} minutes Rest
                                        </Text>
                                      </View>
                                    </View>
                                  ) : null}
                                </View>
                              </View>
                            )
                          )}
                      </>
                    )
                  })}






                </View>
              </>
            )}

            {/* additional sets submission */}
            <View>
              <View
                style={{
                  marginTop: getFontSize(4),
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Seprator style={{ width: getWidth(28) }} />
                <Text
                  style={{
                    fontSize: getFontSize(1.8),
                    color: colors.blackOp,
                    fontFamily: "Ubuntu",
                    paddingLeft: getFontSize(1),
                    paddingRight: getFontSize(1),
                  }}
                >
                  {additionalSetCount === 1
                    ? `${additionalSetCount} ADDITIONAL SET`
                    : `${additionalSetCount} ADDITIONAL SETS`}
                </Text>
                <Seprator style={{ width: getWidth(28) }} />
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  style={styles.additionalSet}
                  onPress={() => handlePress()}
                >
                  <Text
                    style={{
                      color: colors.blackOp,
                      fontSize: getFontSize(2),
                      fontFamily: fonts.URe,
                    }}
                  >
                    + Add Set
                  </Text>
                </TouchableOpacity>
                {showAdditionalSets &&
                  Array.from({ length: additionalSetCount }).map((_, index) => (
                    <>
                      {exercise[0].sets?.length > 0 ? (
                        <View key={index}>
                          <View
                            style={{
                              paddingHorizontal: getWidth(3),
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <View style={styles.repsCon}>
                              <View
                                style={{
                                  backgroundColor: colors.blackDarkOp,
                                  height: getHeight(8),
                                  width: getWidth(10),
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderTopLeftRadius: getFontSize(1),
                                  borderBottomLeftRadius: getFontSize(1),
                                }}
                              >
                                <Text style={styles.count}>{index + 1}</Text>
                              </View>
                              <View style={styles.whiteCon}>
                                {exercise[0]?.sets[0]?.parameter == "reps" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter reps"
                                      placeholderTextColor={"gray"}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          text,
                                          "",
                                          "",
                                          "",
                                          "",
                                          "",
                                          "",
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>reps</Text>
                                    </View>
                                  </View>
                                ) : exercise[0]?.sets[0]?.parameter == "lbs" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter weight (lbs)"
                                      placeholderTextColor={"gray"}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          "",
                                          text,
                                          "",
                                          "",
                                          "",
                                          "",
                                          "",
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>lbs</Text>
                                    </View>
                                  </View>
                                ) : exercise[0]?.sets[0]?.parameter == "weight" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter weight"
                                      placeholderTextColor={"gray"}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          "",
                                          "",
                                          text,
                                          "",
                                          "",
                                          "",
                                          "",
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>kg</Text>
                                    </View>
                                  </View>
                                ) : exercise[0]?.sets[0]?.parameter ==
                                  "seconds" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter seconds"
                                      placeholderTextColor={"gray"}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          "",
                                          "",
                                          "",
                                          text,
                                          "",
                                          "",
                                          "",
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />

                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>sec</Text>
                                    </View>
                                  </View>
                                ) : exercise[0]?.sets[0]?.parameter ==
                                  "distance" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter distance"
                                      placeholderTextColor={"gray"}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          "",
                                          "",
                                          "",
                                          "",
                                          text,
                                          "",
                                          "",
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>miles</Text>
                                    </View>
                                  </View>
                                ) : exercise[0]?.sets[0]?.parameter == "yards" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter distance"
                                      placeholderTextColor={"gray"}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          "",
                                          "",
                                          "",
                                          "",
                                          "",
                                          text,
                                          "",
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>yards</Text>
                                    </View>
                                  </View>
                                ) : exercise[0].sets[0]?.parameter == "meters" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter distance"
                                      placeholderTextColor={"gray"}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          "",
                                          "",
                                          "",
                                          "",
                                          "",
                                          "",
                                          text,
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>meters</Text>
                                    </View>
                                  </View>
                                ) : null}
                              </View>
                              <View
                                style={{
                                  width: getWidth(0.3),
                                  height: getHeight(8),
                                  backgroundColor: colors.whiteOp20,
                                }}
                              ></View>
                              <View
                                style={{
                                  ...styles.tickCon,
                                  backgroundColor:
                                    selectedInputAdditional === index ||
                                      inputContentAdditional[index]
                                      ? colors.buttonColor
                                      : colors.blackDarkOp,
                                }}
                              >
                                <Ionicons
                                  name="checkmark-sharp"
                                  size={20}
                                  color={colors.white}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      ) : (
                        <View key={index}>
                          <View
                            style={{
                              paddingHorizontal: getWidth(3),
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <View style={styles.repsCon}>
                              <View
                                style={{
                                  backgroundColor: colors.whiteOp20,
                                  height: getHeight(8),
                                  width: getWidth(10),
                                  justifyContent: "center",
                                  alignItems: "center",
                                  borderTopLeftRadius: getFontSize(1),
                                  borderBottomLeftRadius: getFontSize(1),
                                }}
                              >
                                <Text style={styles.count}>{index + 1}</Text>
                              </View>
                              <View style={styles.whiteCon}>
                                {exercise[0].task?.[nextIncompleteIndex]?.sets[0]
                                  ?.parameter == "reps" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter reps"
                                      placeholderTextColor={"gray"}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          text,
                                          "",
                                          "",
                                          "",
                                          "",
                                          "",
                                          "",
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>reps</Text>
                                    </View>
                                  </View>
                                ) : exercise[0]?.task?.[nextIncompleteIndex]
                                  ?.sets[0]?.parameter == "lbs" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter weight (lbs)"
                                      placeholderTextColor={"gray"}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          "",
                                          text,
                                          "",
                                          "",
                                          "",
                                          "",
                                          "",
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>lbs</Text>
                                    </View>
                                  </View>
                                ) : exercise[0]?.task?.[nextIncompleteIndex]
                                  ?.sets[0]?.parameter == "weight" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter weight"
                                      placeholderTextColor={'gray'}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          "",
                                          "",
                                          text,
                                          "",
                                          "",
                                          "",
                                          "",
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>kg</Text>
                                    </View>
                                  </View>
                                ) : exercise[0]?.task?.[nextIncompleteIndex]
                                  ?.sets[0]?.parameter == "seconds" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter seconds"
                                      placeholderTextColor={"gray"}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          "",
                                          "",
                                          "",
                                          text,
                                          "",
                                          "",
                                          "",
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>sec</Text>
                                    </View>
                                  </View>
                                ) : exercise[0]?.task?.[nextIncompleteIndex]
                                  ?.sets[0]?.parameter == "distance" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter distance"
                                      placeholderTextColor={"gray"}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          "",
                                          "",
                                          "",
                                          "",
                                          text,
                                          "",
                                          "",
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>miles</Text>
                                    </View>
                                  </View>
                                ) : exercise[0]?.task?.[nextIncompleteIndex]
                                  ?.sets[0]?.parameter == "yards" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter distance"
                                      placeholderTextColor={"gray"}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          "",
                                          "",
                                          "",
                                          "",
                                          "",
                                          text,
                                          "",
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>yards</Text>
                                    </View>
                                  </View>
                                ) : exercise[0]?.task?.[nextIncompleteIndex]
                                  ?.sets[0]?.parameter == "meters" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter distance"
                                      placeholderTextColor={"gray"}
                                      keyboardType="number-pad"
                                      onFocus={() =>
                                        setSelectedInputAdditional(index)
                                      }
                                      onBlur={() =>
                                        setSelectedInputAdditional(null)
                                      }
                                      onChangeText={(text) => {
                                        const updatedContent = [
                                          ...inputContentAdditional,
                                        ];
                                        updatedContent[index] = text;
                                        setInputContentAdditional(
                                          updatedContent
                                        );
                                        updateAdditionalSets(
                                          index,
                                          "",
                                          "",
                                          "",
                                          "",
                                          "",
                                          text,
                                          "",
                                          ""
                                        );
                                      }}
                                      style={{
                                        width: getWidth(30),
                                        color: "black",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>meters</Text>
                                    </View>
                                  </View>
                                ) : null}
                              </View>
                              <View
                                style={{
                                  width: getWidth(0.3),
                                  height: getHeight(8),
                                  backgroundColor: colors.whiteOp20,
                                }}
                              ></View>
                              <View
                                style={{
                                  ...styles.tickCon,
                                  backgroundColor:
                                    selectedInputAdditional === index ||
                                      inputContentAdditional[index]
                                      ? colors.buttonColor
                                      : colors.whiteOp20,
                                }}
                              >
                                <Ionicons
                                  name="checkmark-sharp"
                                  size={20}
                                  color={colors.white}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      )}
                    </>
                  ))}
              </View>
            </View>
            <View style={{ height: getHeight(15) }}></View>
          </KeyboardAwareScrollView>

          {/* button */}
          {exercise[0].sets?.length > 0 && exercise[0]?.task.length == 0 ? (
            <View
              style={{
                marginTop:
                  Platform.OS === "ios" ? getFontSize(0) : getFontSize(15),
              }}
            >
              <Button
                onPress={singleExerciseComplete}
                text="Complete Exercise"
                btnStyle={{
                  ...GernalStyle.btn,
                  backgroundColor: colors.buttonColor,
                  position: "absolute",
                  bottom: getHeight(5),
                }}
                btnTextStyle={GernalStyle.btnText}
              />
            </View>
          ) : currentIndex != 0 ? (
            <View
              style={{
                marginTop:
                  Platform.OS === "ios" ? getFontSize(0) : getFontSize(15),
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: colors.primary,
                  bottom: getHeight(5),
                  width: getWidth(20),
                  height: getHeight(6),
                  borderRadius: 5,
                  borderWidth: getWidth(0.3),
                  borderColor: colors.white,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                onPress={previosSet}
              >
                <AntDesign name="arrowleft" size={22} color={colors.white} />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: getHeight(6),
                  justifyContent: "center",
                  borderRadius: 5,
                  width: getWidth(60),
                  backgroundColor: colors.buttonColor,
                  bottom: getHeight(5),
                }}
                onPress={nextSet}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      ...GernalStyle.btnText,
                      paddingRight: getFontSize(1.5),
                    }}
                  >
                    {nextIncompleteIndex === exercise[0]?.task.length - 1
                      ? "Complete Exercise"
                      : "Next Exercise"}
                  </Text>
                  <AntDesign name="arrowright" size={22} color={colors.white} />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            (nextIncompleteIndex === exercise[0]?.task?.length - 1 ||
              currentIndex === 0) && (
              <View
                style={{
                  marginTop:
                    Platform.OS === "ios" ? getFontSize(0) : getFontSize(15),
                }}
              >
                <Button
                  onPress={
                    nextIncompleteIndex === exercise?.task?.length - 1
                      ? singleExerciseComplete
                      : nextSet
                  }
                  text={
                    nextIncompleteIndex === exercise?.task?.length - 1
                      ? "Complete Exercise"
                      : "Next Exercise"
                  }
                  btnStyle={{
                    ...GernalStyle.btn,
                    backgroundColor: colors.buttonColor,
                    position: "absolute",
                    bottom: getHeight(5),
                  }}
                  btnTextStyle={GernalStyle.btnText}
                />
              </View>
            )
          )}
        </View>
      )}
    </>
  );
};

export default CompleteWorkout;
