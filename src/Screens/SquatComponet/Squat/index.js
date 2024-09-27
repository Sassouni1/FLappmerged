import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import React, { useEffect, useState, useMemo } from "react";
import { colors } from "../../../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  getWidth,
  getFontSize,
  getHeight,
} from "../../../../utils/ResponsiveFun";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { ApiCall } from "../../../Services/Apis";
import toast from "react-native-simple-toast";
import VideoSkills from "../../Skills/Video";
import { fonts } from "../../../constants/fonts";

const Timer = ({ isVisible, onTimerEnd }) => {
  const [remainingTime, setRemainingTime] = useState(60); // 1 minute in seconds

  useEffect(() => {
    let interval;
    if (isVisible) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 0) {
            onTimerEnd();
            return prevTime; // Return the same time to stop the timer
          }
          return prevTime - 1; // Decrement the remaining time
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isVisible, onTimerEnd]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return remainingTime > 0 ? (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>
        {`${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`}
      </Text>
    </View>
  ) : null;
};
const TopVideo = React.memo(({ videoUrl, title, onPressBack }) => {
  // Component logic
  return (
    <View>
      <VideoSkills data={{ video: videoUrl, Name: title }} />
      <TouchableOpacity
        onPress={onPressBack}
        style={[
          styles.headerBtnStyle,
          { position: "absolute", top: 10, left: 10 },
        ]}
      >
        <Ionicons
          name="chevron-back"
          size={getFontSize(2.5)}
          color={colors.black}
        />
      </TouchableOpacity>
    </View>
  );
}, (prevProps, nextProps) => {
  return prevProps.videoUrl === nextProps.videoUrl &&
         prevProps.title === nextProps.title &&
         prevProps.onPressBack === nextProps.onPressBack;
});


export default function Squat({ navigation, route }) {
  const onPressBack = () => {
    navigation.goBack();
  };
  const { exercise, workout, task, exercises, calories } = route?.params;
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.userToken);
  const defaultTimer = { hours: 0, minutes: 0, seconds: 0 };
  const [isChecked, setIsChecked] = useState([]);
  const [disableRest, setDisableRest] = useState([]);
  const [isResting, setIsResting] = useState(Array(3).fill(false)); // State to track if checkmark is checked or not
  const [showTimer, setShowTimer] = useState(false);
  const [additionalSets, setAdditionalSets] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [restTime, setRestTime] = useState("");
  const [weights, setWeights] = useState([]);
  const [selectedSetKey, setSelectedSetKey] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(exercise);
  const [selectedTask, setSelectedTask] = useState(task);
  const [timerActive, setTimerActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, []);

  const [readySeconds, setReadySeconds] = useState(3);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setReadySeconds((prevSeconds) => {
        if (prevSeconds <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (exercise?.additional_sets)
        setAdditionalSets(exercise?.additional_sets);
    }, [exercise])
  );

  useMemo(() => {
    let _resttime = convertToSeconds(restTime);
    setSeconds(_resttime);
  }, [restTime, selectedSetKey]);

  function convertToSeconds(time) {
    if (time) {
      // Split the time string into minutes and seconds
      let [minutes, seconds] = time.split(":");

      // If seconds are missing, set them to "00"
      if (seconds === undefined) {
        seconds = "00";
      }

      // Convert minutes and seconds to numbers
      minutes = Number(minutes);
      seconds = Number(seconds);

      // Convert minutes to seconds and add the remaining seconds
      const totalSeconds = minutes * 60 + seconds;

      return totalSeconds;
    } else return 0;
  }

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setSeconds((prevSeconds) => {
  //       if (prevSeconds > 0) {
  //         return prevSeconds - 1;
  //       } else {
  //         clearInterval(interval);
  //         return 0;
  //       }
  //     });
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, [restTime]);

  useEffect(() => {
    let interval;
    if (timerActive) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            setTimerActive(false)
            clearInterval(interval);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  const convertTimeToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const onPressReset = (restTime) =>
    navigation.navigate("ResetTimer", { restTime: restTime });

  const onPressNextExercise = () => {
    const currentIndex = exercises?.findIndex(
      (ex) =>
        ex._id === selectedExercise._id ||
        ex?.task?.some((taskEX) => taskEX._id === selectedExercise._id)
    );
    let nextExercise = exercises[currentIndex + 1];
    if (nextExercise) {
      if (nextExercise?.exercise_name) setSelectedExercise(nextExercise);
      else {
        setSelectedTask(nextExercise?.task);
        setSelectedExercise(nextExercise?.task[0]);
      }
    }
  };
  const onPressPreviousExercise = () => {
    const currentIndex = exercises?.findIndex(
      (ex) =>
        ex._id === selectedExercise._id ||
        ex?.task?.some((taskEX) => taskEX._id === selectedExercise._id)
    );
    let previousExercise = exercises[currentIndex - 1];
    if (previousExercise) {
      if (previousExercise?.exercise_name)
        setSelectedExercise(previousExercise);
      else {
        setSelectedTask(previousExercise?.task);
        setSelectedExercise(previousExercise?.task[0]);
      }
    } else onPressBack();
  };
  const RenderSquare = ({ title, desc, icon }) => {
    return (
      <View style={styles.innerContainer}>
        <Image source={icon} style={styles.iconStyle} />
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.descStyle}>{desc}</Text>
      </View>
    );
  };

  const handleCheckmarkPress = async (index, set,isBodyweightExercise=false,isDynamicWarmUp=false) => {
    let find_lbs_value = findInputValueWithKey(index);
    await singleSetComplete(set, find_lbs_value,isBodyweightExercise,isDynamicWarmUp);
    let newIsChecked = [...isChecked];
    let valueIncludes = newIsChecked.includes(index);
    if (valueIncludes) newIsChecked = newIsChecked.filter((x) => x != index);
    else newIsChecked.push(index);

    setIsChecked(newIsChecked);

    let isDisableRest = disableRest?.includes(index);
    // if (
    //   !isDisableRest &&
    //   !valueIncludes &&
    //   set?.rest_time &&
    //   set?.rest_time != ""
    // ) {
    //   setSelectedSetKey(index);
    //   setRestTime(set?.rest_time);
    //   // onPressReset(set?.rest_time);
    // } else {
    //   setSelectedSetKey("");
    //   setRestTime("");
    // }
  };

  const handleRestButton = async (index) => {
    let newState = [...disableRest];
    let valueIncludes = newState.includes(index);
    if (valueIncludes) newState = newState.filter((x) => x != index);
    else {
      newState.push(index);
      setRestTime(0);
      setSelectedSetKey("");
    }

    setDisableRest(newState);
  };

  const handleSubmitEditing = (event, key) => {
    const newValue = event.nativeEvent.text;

    let arrayOfObjects = [...weights];
    const updatedArray = arrayOfObjects.map((obj) => {
      // If the key exists in the object, update its value
      if (key in obj) {
        return { ...obj, [key]: newValue };
      }
      return obj;
    });

    // Check if the key was updated
    const keyUpdated = updatedArray.some((obj) => key in obj);

    // If the key was not found and updated, add a new object
    if (!keyUpdated) {
      updatedArray.push({ [key]: newValue });
    }
    setWeights(updatedArray);
  };

  const findInputValueWithKey = (keyToFind) => {
    const foundObject = weights.find((obj) => keyToFind in obj);
    const value = foundObject ? foundObject[keyToFind] : 0;
    return value;
  };

  const addAdditionalSet = () => {
    let newItem = {
      _id: (Math.random() * 1000).toString(),
      lbs: "",
      parameter: "lbs",
      reps: findMaxReps(selectedExercise),
      rest_time: "0",
      task: [],
      video: "",
      video_thumbnail: "",
    };
    setAdditionalSets((prevItems) => [...prevItems, newItem]);
  };
  const findMaxReps = (exercise) => {
    try {
      const sets = exercise?.sets;
      if (sets) {
        const maxReps = Math.max(...sets?.map((set) => Number(set.reps)));
        return maxReps;
      } else return 0;
    } catch {
      return 0;
    }
  };
  const singleSetComplete = async (set, weight,isBodyweightExercise=false,isDynamicWarmUp=false) => {
    try {
      dispatch(setLoader(true));
      const submittedData = {
        set_id:set._id,
        parameter: set?.parameter,
        remaining_time: 0,
        [set?.parameter]: isBodyweightExercise ? weight :  set?.reps,//is case of BodyWeight( weigth use as reps)
        weight:isBodyweightExercise ? user?.weight : (!isDynamicWarmUp ?  weight : 0)
      };

      let requestParams = {
        setId: set?._id,
        workout_objId: workout?._id,
        exercise_objId: exercise?._id,
        inner_objId: workout?.innerWorkout[0]?._id,
        submittedData: submittedData,
        calories: calories || 0,
      };

      dispatch(setLoader(false));
      if (exercise?.task?.length > 0) {
        requestParams.task_objId = exercise?.task?.[nextIncompleteIndex]?._id;
      }
      const res = await ApiCall({
        route: `assignProgram/update_set/${user?.plan_id}`,
        verb: "post",
        token: token,
        params: requestParams,
      });
      console.log(requestParams);
      console.log("updateresponse", res);
      if (res?.status == "200") {
        toast.show("Successfully completed");
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        toast.show("Enter correct sets");
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  const singleExerciseComplete = async () => {
    try {
      dispatch(setLoader(true));
      let requestParams = {
        workout_objId: workout?._id,
        exercise_objId: exercise?._id,
        inner_objId: workout?.innerWorkout[0]?._id,
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

  const RenderRest = ({ uniqueKey, restTime }) => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={styles.bottomStyle}>
          <View style={styles.bottomDividerSTyle}></View>
          <View style={styles.itemContainer}>
            <View style={styles.dotContainer} />
            <Text style={styles.itemTextStyle}>
              {selectedSetKey == uniqueKey
                ? convertTimeToMinutes(seconds)
                : `${restTime} min rest`}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1,justifyContent:'center' }}>
          {selectedSetKey == uniqueKey ?
            !timerActive ?
              <TouchableOpacity
                style={{ width: 27,marginLeft:12 }}
                onPress={() => {
                  setRestTime(restTime);
                  setSelectedSetKey(uniqueKey);
                  setTimerActive(true)
                }}
              >
                <Image source={require("../../../assets/images/homeplaybtn.png")} style={styles.iconStyle} />
              </TouchableOpacity>
              :
              <TouchableOpacity
                style={{ width: 27 }}
                onPress={() => {
                  setTimerActive(false)
                }}
              >
                <Image source={require("../../../assets/images/pause.png")} style={styles.iconStyle} />
              </TouchableOpacity>
            :
            <TouchableOpacity
              style={{ width: 27,marginLeft:12 }}
              onPress={() => {
                setRestTime(restTime);
                setSelectedSetKey(uniqueKey);
                setTimerActive(true)
              }}
            >
              <Image source={require("../../../assets/images/homeplaybtn.png")} style={styles.iconStyle} />
            </TouchableOpacity>
          }
          {/* <TouchableOpacity
            onPress={() => {
              setRestTime(restTime);
              setSelectedSetKey(uniqueKey);
              // handleRestButton(uniqueKey);
            }}
            style={{ alignItems: "flex-end", marginTop: 25 }}
          >
            <Text style={{ color: colors.darkBlue }}>
              {disableRest.includes(uniqueKey) ? `Enable Rest` : `Disable Rest`}
            </Text>
          </TouchableOpacity> */}
        </View>
      </View>
    );
  };

  const RenderCategory = ({
    no,
    set,
    reps,
    isBottom = true,
    isAdditional,
    addon = "",
  }) => {
    const uniqueKey = isAdditional ? "additionalSet" + no : addon + "set" + no;
  
    // Check if it's a bodyweight exercise
    const isBodyweightExercise = exercise?.category === "Bodyweight";
    const isDynamicWarmUp = exercise?.category === "Dynamic Warm Up";
  
    return (
      <View key={no} style={styles.mainContainer}>
        <View style={styles.outerContainer}>
          <View style={styles.numberContainer}>
            <Text style={styles.numberTextSTyle}>{no}</Text>
          </View>
          <View style={{ gap: getWidth(1.5) }}>
            <Text style={styles.titleStyle}>{reps}</Text>
            <Text style={styles.descStyle}>
              {reps} Reps
            </Text>
          </View>
          <View style={styles.semiDividerSTyle} />
  
          <View style={styles.rowSTyle}>
            {/* Input field for reps */}
            <TextInput
              style={{
                width: getWidth(15),
                textAlign: "center",
                letterSpacing: 2,
                paddingTop: 0,
                paddingBottom: getWidth(1.5),
              }}
              placeholder={"_______"}
              keyboardType="numeric"
              editable={isDynamicWarmUp ? false : true}
              onBlur={(event) => handleSubmitEditing(event, uniqueKey)}
              onSubmitEditing={(event) => handleSubmitEditing(event, uniqueKey)}
              returnKeyType="done"
            />
            
            {/* Show user's weight only for bodyweight exercises */}
            {isBodyweightExercise ? (
              <>
               <Text style={styles.descStyle}>{`${findInputValueWithKey(
                  uniqueKey
                )} Reps`}</Text>
              <Text style={styles.descStyle}>{`${user?.weight} lbs`}</Text>
              </>
            ) : (
              !isDynamicWarmUp && (
                <Text style={styles.descStyle}>{`${findInputValueWithKey(
                  uniqueKey
                )} lbs`}</Text>
              )
            )}
          </View>
  
          <View style={styles.dividerStyle} />
          <TouchableOpacity
            style={{ marginRight: getWidth(5) }}
            onPress={() => {
              if (!isChecked.includes(uniqueKey) && set?.complete != "true")
                handleCheckmarkPress(uniqueKey, set, isBodyweightExercise, isDynamicWarmUp); // Pass isBodyweightExercise, and isDynamicWarmUp
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={getFontSize(5)}
              color={
                !isChecked.includes(uniqueKey) && set?.complete != "true"
                  ? colors.axisColor
                  : colors.orange
              }
              style={{ marginRight: getWidth(5) }}
            />
          </TouchableOpacity>
        </View>
        {set?.rest_time && set?.rest_time != 0 ? (
          <RenderRest uniqueKey={uniqueKey} restTime={set?.rest_time || 0} />
        ) : (
          <View style={{ marginTop: 25 }} />
        )}
      </View>
    );
  };
  
  
  const RenderExercise = ({ exercise, addon }) => {
    return (
      <View>
        {/* Exercise bulets */}
        <View style={[styles.categoryContainer, { justifyContent: "center" }]}>
          <View style={styles.dividerStyle} />
          <RenderSquare
            title={`${exercise?.sets?.length}x${findMaxReps(exercise)}`}
            desc="Reps"
            icon={require("../../../assets/images/squatsIcon3.png")}
          />
          <View style={styles.dividerStyle} />
          {exercise?.tempo && (
            <>
              <RenderSquare
                title={exercise?.tempo}
                desc="Tempo"
                icon={require("../../../assets/images/squatsIcon2.png")}
              />
              <View style={styles.dividerStyle} />
            </>
          )}
          {exercise?.max && (
            <>
              <RenderSquare
                title={exercise?.max}
                desc="Max"
                icon={require("../../../assets/images/squatsIcon1.png")}
              />
              <View style={styles.dividerStyle} />
            </>
          )}
          {exercise?.rpe && (
            <>
              <RenderSquare
                title={exercise?.rpe}
                desc="RPE"
                icon={require("../../../assets/images/squatsIcon1.png")}
              />
              <View style={styles.dividerStyle} />
            </>
          )}
          {exercise?.rir && (
            <>
              <RenderSquare
                title={exercise?.rir}
                desc="RIR"
                icon={require("../../../assets/images/squatsIcon1.png")}
              />
              <View style={styles.dividerStyle} />
            </>
          )}
        </View>
        {/* Exercise Note */}
        <View style={{ alignItems: "center",paddingHorizontal:20 }}>
          <Text
            style={{
              ...styles.text,
              fontFamily: fonts.UBo,
              textAlign: "center",
            }}
          >
            {exercise?.notes}
          </Text>
          <View style={[styles.rowDividerSTyle, { marginVertical: 10 }]} />
        </View>
        {/* Workout Sets*/}
        <View style={styles.rowContainerSTyle}>
          <View style={styles.rowDividerSTyle} />
          <Text style={styles.workingSetSTyle}>
            {exercise?.sets?.length > 1
              ? exercise?.sets?.length + " WORKING SETS"
              : exercise?.sets?.length + " WORKING SET"}
          </Text>
          <View style={styles.rowDividerSTyle} />
        </View>
        {exercise?.sets?.map((item, index) => (
          <RenderCategory
            key={index + 1}
            set={item}
            no={index + 1}
            reps={item?.reps || 0}
            isSuccess={true}
            isAdditional={false}
            addon={addon}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      {isVisible ? (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
          <View
            style={{
              flex: 1,
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <View style={{ alignItems: "center", gap: 4 }}>
              <Text style={{ fontSize: 24, fontWeight: "700" }}>
                Are you ready?
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Text style={{ ...styles.text, fontFamily: fonts.UBo }}>
                  00:
                </Text>

                <Text style={{ ...styles.text, fontFamily: fonts.UBo }}>
                  {readySeconds.toString().padStart(2, "0")}
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {selectedTask ? (
            selectedTask?.map((item, index) => (
              <View key={index}>
              <TopVideo videoUrl={item?.video} title={item?.exercise_name} onPressBack={onPressBack} />
                <RenderExercise exercise={item} addon={"task" + index} />
                {selectedTask?.length != index + 1 && (
                  <View style={styles.divider} />
                )}
              </View>
            ))
          ) : (
            <>
           <TopVideo videoUrl={selectedExercise?.video} title={selectedExercise?.exercise_name} onPressBack={onPressBack} />
            <RenderExercise exercise={selectedExercise} />
            </>

          )}

          {additionalSets?.length > 0 && (
            <View>
              <View style={styles.rowContainerSTyle}>
                <View style={styles.rowDividerSTyle} />
                <Text style={styles.workingSetSTyle}>
                  {additionalSets?.length > 1
                    ? additionalSets?.length + " ADDITIONAL SETS"
                    : additionalSets?.length + " ADDITIONAL SET"}
                </Text>
                <View style={styles.rowDividerSTyle} />
              </View>
              {additionalSets?.map((item, index) => (
                <RenderCategory
                  key={index + 1}
                  set={item}
                  no={index + 1}
                  reps={item?.reps || 0}
                  isSuccess={true}
                  isAdditional={true}
                />
              ))}
            </View>
          )}

          <TouchableOpacity
            onPress={() => addAdditionalSet()}
            style={styles.addButtonContainer}
          >
            <Text style={styles.addTitleStyle}>+ Add Set</Text>
          </TouchableOpacity>
          <View style={styles.bottomBtnStyle}>
            <TouchableOpacity
              onPress={() => {
                onPressPreviousExercise();
              }}
              style={styles.rightContainer}
            >
              <Ionicons
                name="arrow-back-outline"
                size={getFontSize(3)}
                color={colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onPressNextExercise();
              }}
              style={styles.leftContainer}
            >
              <Text style={styles.nextExerciseStyle}>Next Exercise</Text>
              <Ionicons
                name="arrow-forward-outline"
                size={getFontSize(3)}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    position: "absolute",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    zIndex: 50,
    alignItems: "center",
  },
  timerText: {
    fontSize: getFontSize(5),
    fontWeight: "bold",
    color: "red",
  },
  imageBgStyle: {
    height: getHeight(33),
    padding: getWidth(8),
    paddingHorizontal: getWidth(4),
  },
  headerBtnStyle: {
    padding: getWidth(2.5),
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  statsFontStyle: {
    color: colors.white,
    fontSize: getFontSize(5),
    fontFamily: fonts.WB,
    textAlign: "center",
    marginTop: getHeight(1.5),
  },
  imageStyle: {
    borderBottomLeftRadius: getWidth(14),
    borderBottomRightRadius: getWidth(14),
  },
  playBtnStyle: {
    backgroundColor: colors.orange,
    padding: getWidth(2.5),
    borderRadius: 16,
    alignSelf: "center",
    marginTop: getHeight(7),
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: getWidth(5),
    paddingVertical: getHeight(3),
    gap: getWidth(5),
  },
  iconStyle: {
    width: getWidth(7),
    height: getWidth(7),
  },
  titleStyle: {
    color: colors.black,
    fontSize: getFontSize(2.3),
    fontFamily: fonts.WB,
    textAlign: "center",
  },
  descStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
    textAlign: "center",
    width: "100%",
  },
  innerContainer: {
    gap: getWidth(2),
    alignItems: "center",
  },
  dividerStyle: {
    height: "100%",
    width: getHeight(0.1),
    backgroundColor: colors.rulesColor,
  },
  workingSetSTyle: {
    color: colors.slateGray,
    fontSize: getFontSize(2.7),
    fontFamily: fonts.WMe,
    textAlign: "center",
    paddingHorizontal: getWidth(3),
  },
  rowDividerSTyle: {
    height: getHeight(0.1),
    width: "20%",
    backgroundColor: colors.rulesColor,
  },
  rowContainerSTyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: getWidth(5),
    paddingBottom: getHeight(3),
  },
  outerContainer: {
    backgroundColor: colors.paleGray,
    borderRadius: getWidth(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
  },
  numberContainer: {
    backgroundColor: colors.rulesColor,
    paddingVertical: getWidth(8),
    paddingHorizontal: getWidth(5.5),
    borderTopLeftRadius: getWidth(8),
    borderBottomLeftRadius: getWidth(8),
    alignItems: "center",
    justifyContent: "center",
  },
  numberTextSTyle: {
    color: colors.black,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WMe,
  },
  lbsTextSTyle: {
    color: colors.slateGray,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WMe,
  },
  semiDividerSTyle: {
    height: "50%",
    width: getHeight(0.1),
    backgroundColor: colors.rulesColor,
  },
  rowDividerStyle: {
    height: getHeight(0.1),
    width: getWidth(20),
    backgroundColor: colors.axisColor,
    marginBottom: getHeight(1),
  },
  rowSTyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomDividerSTyle: {
    height: getHeight(9),
    width: getWidth(0.5),
    backgroundColor: colors.rulesColor,
    justifyContent: "center",
  },
  mainContainer: {
    marginHorizontal: getWidth(5),
  },
  bottomStyle: {
    flex: 1,
    left: getWidth(7),
    ms: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    top: getHeight(3),
    left: getWidth(-2),
    position: "absolute",
  },
  dotContainer: {
    height: getWidth(4),
    width: getWidth(4),
    borderRadius: getWidth(2),
    backgroundColor: colors.orange,
  },
  itemTextStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WMe,
    marginLeft: getWidth(2),
  },
  addButtonContainer: {
    padding: getWidth(4),
    marginHorizontal: getWidth(5),
    borderRadius: getWidth(8),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: getHeight(3),
    borderWidth: 1,
    borderColor: colors.grayText2,
    borderStyle: "dashed",
  },
  addTitleStyle: {
    color: colors.grayText2,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WMe,
  },
  bottomBtnStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: getWidth(5),
    marginBottom: getHeight(2),
  },
  rightContainer: {
    paddingVertical: getWidth(4),
    width: "20%",
    borderRadius: getWidth(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
  },
  leftContainer: {
    width: "75%",
    paddingVertical: getWidth(4),
    borderRadius: getWidth(6),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orange,
  },
  nextExerciseStyle: {
    color: colors.white,
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
    marginRight: getWidth(2),
  },
  divider: {
    borderWidth: 5,
    backgroundColor: colors.orange,
    borderColor: colors.orange,
    marginVertical: 10,
  },
});
