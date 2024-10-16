import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  TextInput,
  Platform,
  Alert,
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
  const { workoutId, innerWorkoutId, exerciseId, calories, given_sets } =
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
  const [inputContent, setInputContent] = useState(
    Array(exercise?.sets.length).fill("")
  ); // State to store input content

  const [inputContentAdditional, setInputContentAdditional] = useState(
    Array(exercise?.sets[0]).fill("")
  );

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSet = () => {
    if (nextIncompleteIndex < exercise.task.length - 1) {
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

  const [exercise, setExercise] = useState("");

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

  useEffect(() => {
    let timerInterval;

    if (isTimerRunning && timerSeconds > 0) {
      timerInterval = setInterval(() => {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [isTimerRunning, timerSeconds]);

  const startPauseTimer = (index) => {
    if (runningSetIndex === null) {
      setIsTimerRunning(true);
      setRunningSetIndex(index);
    } else if (runningSetIndex === index) {
      setIsTimerRunning(!isTimerRunning);
    }
    if (runningSetIndex !== null && runningSetIndex !== index) {
      setTimeout(() => {
        toast.show('First, complete the ongoing exercise');
      }, 0);
    }
  };

  const startTimer = () => {
    setIsTimerRunning(false);
    setRunningSetIndex(null);
    setTimerSeconds(22);
  };
  const convertTimeToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const getColorHeight = (index, timerSeconds) => {
    const maxHeight = styles.setView.height;
    const height = (22 - timerSeconds) * (maxHeight / 22);
    return index === runningSetIndex ? Math.min(maxHeight, height) : 0;
  };

  const getSubmitColorHeight = (timerSeconds) => {
    const maxHeight = styles.setView.height;
    const height = (22 - timerSeconds) * (maxHeight / 22);
    return Math.min(maxHeight, height);
  };

  useEffect(() => {
    console.log('submittedSets updated:', submittedSets);
  }, [submittedSets]);

  const [showRestScreen, setShowRestScreen] = useState(false);

  const finishRestTime = () => {
    setShowRestScreen(false);
  };

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
    console.log('gasjhdfgjkashfjkgh', updatedSets)
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
    try {
      const res = await ApiCall({
        route: `assignProgram/single_exercise/${user?.plan_id}`,
        verb: "post",
        token: token,
        params: {
          workout_objId: workoutId,
          exercise_objId: exerciseId,
          inner_objId: innerWorkoutId,
        },
      });

      if (res?.status == "200") {
        console.log(
          "rsposne of workouts with exercises",
          res?.response?.Exercise
        );
        setExercise(res?.response?.Exercise);
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
      console.log("submit....", res?.response);
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

  const singleSetComplete = async (parameter, value, remaining_time, setid, rest_time) => {
    try {
      dispatch(setLoader(true));
      const submittedData =
      {
        parameter: parameter,
        remaining_time: remaining_time,
        [parameter]: value,
      }

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
      console.log("submit....set", res?.response);
      if (res?.status == "200") {
        toast.show("set successfully completed");
        navigation.navigate('RestTimeScreen', { restTime: rest_time })
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
      case 'reps':
        return set.reps;
      case 'lbs':
        return set.lbs;
      case 'weight':
        return set.weight;
      case 'seconds':
        return set.seconds;
      case 'distance':
        return set.distance;
      case 'yards':
        return set.yards;
      case 'meters':
        return set.meters;
      default:
        return '';
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
    for (let i = startIndex; i < exercise?.task?.length; i++) {
      if (exercise?.task?.[i]?.complete !== "true") {
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
        <View style={{ backgroundColor: colors.buttonColor, flex: 1 }}>
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
          style={{ ...GernalStyle.continer, backgroundColor: colors.homeColor }}
        >
          <GeneralStatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor={"#000000"}
            translucent={true}
          />
          <View
            style={{
              ...styles.heading,
              backgroundColor: "#000000",
              height: getHeight(7.5),
            }}
          >
            <View
              style={{
                ...styles.angel,
                justifyContent: "space-between",
                alignSelf: "center",
                backgroundColor: "#000",
              }}
            >
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather
                  name="chevron-left"
                  size={getFontSize(5)}
                  color={colors.gray3}
                />
              </TouchableOpacity>
              <View style={{ ...styles.header }}>
                <View style={styles.headerTime}>
                  <Text style={styles.text}>
                    {hours.toString().padStart(2, "0")}:
                  </Text>
                  <Text style={styles.text}>
                    {minutes.toString().padStart(2, "0")}:
                  </Text>
                  <Text style={styles.text}>
                    {seconds.toString().padStart(2, "0")}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
            {exercise.sets?.length > 0 ? (
              <VideoSkills
                data={{ video: exercise?.video, Name: exercise?.exercise_name }}
              />
            ) : (
              <VideoSkills
                data={{
                  video: exercise?.task?.[nextIncompleteIndex]?.video,
                  Name: exercise?.task?.[nextIncompleteIndex]?.exercise_name,
                }}
              />
            )}
            {loader ? null : (
              <>
                <View style={{ paddingHorizontal: getWidth(0), marginTop:getFontSize(2.5) }}>
                  {/* {exercise.sets?.length > 0 && (
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
                          color: colors.white,
                          fontFamily: "Ubuntu",
                          paddingLeft: getFontSize(1),
                          paddingRight: getFontSize(1),
                        }}
                      >
                        {exercise?.no_of_sets === "1"
                          ? `${exercise?.no_of_sets} WORKING SET`
                          : `${exercise?.no_of_sets} WORKING SETS`}
                      </Text>
                      <Seprator style={{ width: getWidth(30) }} />
                    </View>
                  )} */}

                  {/* {
                    // exercise.sets?.length > 0 &&
                    exercise?.notes && exercise?.notes.length > 0 && (
                      <View
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
                            {exercise?.notes}
                          </Text>
                        </View>
                      </View>
                    )
                  } */}

                  {/* {exercise?.task?.length > 0 && (
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
                          color: colors.white,
                          fontFamily: "Ubuntu",
                          paddingLeft: getFontSize(1),
                          paddingRight: getFontSize(1),
                        }}
                      >
                        {exercise?.task?.[nextIncompleteIndex]?.no_of_sets ===
                          "1"
                          ? `${exercise?.task?.[nextIncompleteIndex]?.no_of_sets} WORKING SET`
                          : `${exercise?.task?.[nextIncompleteIndex]?.no_of_sets} WORKING SETS`}
                      </Text>
                      <Seprator style={{ width: getWidth(30) }} />
                    </View>
                  )} */}

                  {/* {exercise?.task?.length > 0 &&
                    exercise?.task?.[nextIncompleteIndex]?.notes &&
                    exercise?.task?.[nextIncompleteIndex]?.notes.length > 0 && (
                      <View
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
                            {exercise?.task?.[nextIncompleteIndex]?.notes}
                          </Text>
                        </View>
                      </View>
                    )} */}

                  {exercise.sets?.length > 0
                    ? exercise?.sets?.map((set, index) => (
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
                            ...styles.exerciseParamas
                          }}
                        >
                          {index === 0 ? null : (
                            <View>
                              <View
                                style={{
                                  height: getHeight(8.5),
                                  width: getWidth(0.5),
                                  backgroundColor: colors.whiteOp20,
                                  left: getWidth(7),
                                }}
                              ></View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  alignItems: 'center',
                                  position: "absolute",
                                }}
                              >
                                <View
                                  style={{
                                    width: getHeight(2),
                                    height: getHeight(2),
                                    borderRadius: getHeight(5),
                                    backgroundColor: colors.greenlight,
                                    position: 'absolute',
                                    top: getHeight(3.25),
                                    left: getWidth(5),
                                  }}
                                ></View>
                                <Text style={{
                                  marginLeft: getWidth(8), top: getHeight(3.25),
                                  left: getWidth(5), color: colors.greenlight,fontWeight:"700"
                                }}>
                                  { exercise?.sets[index-1].rest_time}min rest
                                </Text>
                              </View>
                            </View>
                          )}

                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                            }}
                          >
                            <View style={{
                              ...styles.setContainer,

                            }}>
                              <View
                                style={{
                                  ...styles.setParams,
                                  height: set?.complete == "true" ? getSubmitColorHeight(set?.remaining_time) : getColorHeight(index, timerSeconds),
                                }}
                              />
                              <Text
                                style={{
                                  ...styles.setText,
                                }}
                              >
                                {set?.complete == "true"
                                  ?
                                  convertTimeToMinutes(set?.remaining_time)
                                  : isTimerRunning &&
                                    runningSetIndex === index ? convertTimeToMinutes(timerSeconds) : convertTimeToMinutes(22)}
                              </Text>

                            </View>
                            <View style={styles.setCon}>
                              <Text style={styles.setName}>
                                {" "}
                                set {index + 1}
                              </Text>
                              <Text style={styles.parameterCon}>
                                {" "}
                                {getParameter(set)} {set.parameter}
                              </Text>
                            </View>
                            <View style={styles.setParameter}>
                              <View
                                style={{
                                  ...styles.submitCon,
                                  backgroundColor:
                                    set?.complete == "true" ? colors.greenlight :
                                      isTimerRunning &&
                                        runningSetIndex === index
                                        ? colors.buttonColor
                                        : colors.greenlight,
                                }}
                              >
                                <Ionicons
                                  name={
                                    set?.complete == "true" ?
                                      "play"
                                      : isTimerRunning &&
                                        runningSetIndex === index
                                        ? "pause-outline"
                                        : "play"
                                  }
                                  size={15}
                                  color={colors.white}
                                  onPress={() => {
                                    if (set?.complete !== null ? set?.complete == "true" : submitYards) {
                                      toast.show('This set is already submitted')
                                    } else {
                                      startPauseTimer(index);
                                    }
                                  }}
                                />
                              </View>
                              <TouchableOpacity
                                style={{
                                  ...styles.submitCon,
                                  backgroundColor: set?.complete == "true"
                                    ? colors.greenlight
                                    : colors.whiteOp20,
                                }}
                                onPress={
                                  set?.complete == "true"
                                    ? null
                                    : () => {
                                      setSubmitYards(true);
                                      singleSetComplete(set.parameter, getParameter(set), timerSeconds, set?._id, set?.rest_time);
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
                    ))
                    : // exercise?.task?.map((ex, exindex) => (
                    //   ex.sets.map((set, index) => (
                    exercise?.task?.[nextIncompleteIndex]?.sets?.map(
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
                                {set?.parameter == "reps" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter reps"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
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
                                      placeholderTextColor={"white"}
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
                                        color: "white",
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
                                      placeholderTextColor={"white"}
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
                                        color: "white",
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
                                      placeholderTextColor={"white"}
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
                                        color: "white",
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
                                      placeholderTextColor={"white"}
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
                                        color: "white",
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
                                      placeholderTextColor={"white"}
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
                                        color: "white",
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
                                      placeholderTextColor={"white"}
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
                                        color: "white",
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
                                      color: colors.white,
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
                    color: colors.white,
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
                      color: colors.white,
                      fontSize: getFontSize(2),
                      fontFamily: "Ubuntu-BOLD",
                    }}
                  >
                    + Add Set
                  </Text>
                </TouchableOpacity>
                {showAdditionalSets &&
                  Array.from({ length: additionalSetCount }).map((_, index) => (
                    <>
                      {exercise.sets?.length > 0 ? (
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
                                {exercise?.sets[0]?.parameter == "reps" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter reps"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>reps</Text>
                                    </View>
                                  </View>
                                ) : exercise?.sets[0]?.parameter == "lbs" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter weight (lbs)"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>lbs</Text>
                                    </View>
                                  </View>
                                ) : exercise?.sets[0]?.parameter == "weight" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter weight"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>kg</Text>
                                    </View>
                                  </View>
                                ) : exercise?.sets[0]?.parameter ==
                                  "seconds" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter seconds"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
                                      }}
                                    />

                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>sec</Text>
                                    </View>
                                  </View>
                                ) : exercise?.sets[0]?.parameter ==
                                  "distance" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter distance"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>miles</Text>
                                    </View>
                                  </View>
                                ) : exercise?.sets[0]?.parameter == "yards" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter distance"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>yards</Text>
                                    </View>
                                  </View>
                                ) : exercise?.sets[0]?.parameter == "meters" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter distance"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
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
                                {exercise?.task?.[nextIncompleteIndex]?.sets[0]
                                  ?.parameter == "reps" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter reps"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>reps</Text>
                                    </View>
                                  </View>
                                ) : exercise?.task?.[nextIncompleteIndex]
                                  ?.sets[0]?.parameter == "lbs" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter weight (lbs)"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>lbs</Text>
                                    </View>
                                  </View>
                                ) : exercise?.task?.[nextIncompleteIndex]
                                  ?.sets[0]?.parameter == "weight" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter weight"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>kg</Text>
                                    </View>
                                  </View>
                                ) : exercise?.task?.[nextIncompleteIndex]
                                  ?.sets[0]?.parameter == "seconds" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter seconds"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>sec</Text>
                                    </View>
                                  </View>
                                ) : exercise?.task?.[nextIncompleteIndex]
                                  ?.sets[0]?.parameter == "distance" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter distance"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>miles</Text>
                                    </View>
                                  </View>
                                ) : exercise?.task?.[nextIncompleteIndex]
                                  ?.sets[0]?.parameter == "yards" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter distance"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
                                      }}
                                    />
                                    <View style={styles.parameterCtn}>
                                      <Text style={styles.lbs}>yards</Text>
                                    </View>
                                  </View>
                                ) : exercise?.task?.[nextIncompleteIndex]
                                  ?.sets[0]?.parameter == "meters" ? (
                                  <View
                                    style={{
                                      ...styles.rowDirection,
                                    }}
                                  >
                                    <TextInput
                                      placeholder="Enter distance"
                                      placeholderTextColor={"white"}
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
                                        color: "white",
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
          {exercise.sets?.length > 0 && exercise?.task.length == 0 ? (
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
                    {nextIncompleteIndex === exercise?.task.length - 1
                      ? "Complete Exercise"
                      : "Next Exercise"}
                  </Text>
                  <AntDesign name="arrowright" size={22} color={colors.white} />
                </View>
              </TouchableOpacity>
            </View>
          ) : (
            (nextIncompleteIndex === exercise?.task?.length - 1 ||
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
