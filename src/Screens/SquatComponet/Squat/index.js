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
  Platform
} from "react-native";
import React, { useEffect, useState, useMemo,useRef } from "react";
import { colors } from "../../../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  getWidth,
  getFontSize,
  getHeight,
} from "../../../../utils/ResponsiveFun";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setLoader,setCalanderSetsCheckmark } from "../../../Redux/actions/GernalActions";
import { ApiCall } from "../../../Services/Apis";
import toast from "react-native-simple-toast";
import VideoSkills from "../../Skills/Video";
import { fonts } from "../../../constants/fonts";
import VideoComponent from "../../../Components/VideoComponent";

let apiCallQueue = []; // Queue to hold pending API calls
let isApiCallInProgress = false; // To track if an API call is ongoing

function formatDuration(seconds) {
  if (seconds < 60) {
      return `${seconds} seconds`;
  } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  } else {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
      
      let result = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
      if (remainingSeconds > 0) {
          result += `:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
      }
      
      return result;
  }
}

function checkTimeFormate(seconds) {
  if (seconds < 60) {
      return `Seconds`;
  } else if (seconds < 3600) {
     return 'Minutes'
  } else if(seconds > 3600) {
      return 'Hours'
  }
  else{
    return '';
  }
}

const RenderRest = React.memo(({ uniqueKey, restTime }) => {
  const [timerActive, setTimerActive] = useState(false);
  const [selectedSetKey, setSelectedSetKey] = useState(null);
  const [seconds, setSeconds] = useState(0);

  const convertToSeconds = (time) => {
    if (time) {
      let [minutes, seconds] = time.split(":");
      if (seconds === undefined) seconds = "00";
      minutes = Number(minutes);
      seconds = Number(seconds);
      return minutes * 60 + seconds;
    } else return 0;
  };

  // Convert restTime to seconds whenever restTime changes
  useMemo(() => {
    const _resttime = convertToSeconds(restTime);
    setSeconds(_resttime);
  }, [restTime]);

  const convertTimeToMinutes = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Handle the timer countdown
  useEffect(() => {
    let interval;
    if (timerActive && selectedSetKey === uniqueKey) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            setTimerActive(false);
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, selectedSetKey, uniqueKey]);

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.bottomStyle}>
        <View style={styles.bottomDividerSTyle}></View>
        <View style={styles.itemContainer}>
          <View style={styles.dotContainer} />
          <Text style={styles.itemTextStyle}>
            {selectedSetKey === uniqueKey 
              ? convertTimeToMinutes(seconds)
              : `${restTime} min rest`}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        {selectedSetKey === uniqueKey && timerActive ? (
          <TouchableOpacity
            style={{ width: 27, marginLeft: 19 }}
            onPress={() => {
              setTimerActive(false);
            }}
          >
            <Image
              source={require("../../../assets/images/pause.png")}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{ width: 27, marginLeft: 19 }}
            onPress={() => {
              setSelectedSetKey(uniqueKey);
              setTimerActive(true);
              // setSeconds(convertToSeconds(restTime));
            }}
          >
            <Image
              source={require("../../../assets/images/homeplaybtn.png")}
              style={styles.iconStyle}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
});

const TopVideo = React.memo(({ videoUrl, title, onPressBack }) => {
  // Component logic
  return (
    <View style={{marginTop:videoUrl ? 0 :  30}}>
      {videoUrl &&
        <>
          <VideoComponent videoUrl={videoUrl} thumbnail={''} Name={title} />

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
        </>
      }
     <View style={{ flexDirection: 'row', alignItems: 'center',paddingHorizontal:20 }}>
  {!videoUrl && (
    <TouchableOpacity
      onPress={onPressBack}
      style={[styles.headerBtnStyle, { backgroundColor: 'black' }]}
    >
      <Ionicons
        name="chevron-back"
        size={getFontSize(2.5)}
        color={colors.white}
      />
    </TouchableOpacity>
  )}
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text
      style={{
        textAlign: 'center',
        fontSize: getFontSize(3),
        color:'#000',
        fontWeight: '700',
        marginLeft: !videoUrl ? 10 : 0,
      }}
      numberOfLines={2} // Restrict to 2 lines
      ellipsizeMode="tail" // Add ellipsis (...) if text overflows
    >
      {title}
    </Text>
  </View>
</View>

    </View>
  );
}, (prevProps, nextProps) => {
  return prevProps.videoUrl === nextProps.videoUrl &&
         prevProps.title === nextProps.title &&
         prevProps.onPressBack === nextProps.onPressBack;
});

export default function Squat({ navigation, route }) {
  const inputsRef = useRef({});
  const onPressBack = () => {
    navigation.goBack();
  };
  const { exercise, workout,selectedDay, task, exercises, calories,programExercises,dynamicExercises,scrollIndex } = route?.params;
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const scrollViewRef = useRef(null);
  const sectionRefs = useRef([]);
 
  const token = useSelector((state) => state.auth.userToken);
  const calanderSetsCheckmark = useSelector((state) => state.gernal.calanderSetsCheckmark);
  const [isChecked, setIsChecked] = useState([]);
  const [additionalSets, setAdditionalSets] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [restTime, setRestTime] = useState("");
  const [weights, setWeights] = useState([]);
  const [selectedSetKey, setSelectedSetKey] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(exercise);
  const [selectedTask, setSelectedTask] = useState(task);
  const [timerActive, setTimerActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);


  const handleTextChange = (key, text) => {
    // Update the specific input's value
    inputsRef.current[key] = text;
  };
  // console.log("selectedExercise",selectedExercise)

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

  const handleCompleteWorkout = () =>{
    Alert.alert(
      "Are you sure?",
      "You want to mark this exercise as complete.",
      [
        { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
        {
          text: "OK", onPress:  () => {
            completeWorkout();
          }
        }
      ]
    );
  };
  
  const completeWorkout = async ()=>{
  dispatch(setLoader(true));
    let requestParams = {
      workout_objId: workout?._id
    }
    try{
    const res = await ApiCall({
      route: `assignProgram/complete_workout/${user?.plan_id}`,
      verb: "post",
      token: token,
      params: requestParams,
    });
    if (res?.status == "200") {
       navigation.navigate("WorkoutComplete");
      dispatch(setLoader(false));
    } else {
      dispatch(setLoader(false));
      toast.show("Error Updating Exercise");
    }
  } catch (e) {
    console.log("api get skill error -- ", e.toString());
  }
  }

  const findCurrentIndex = ()=>{
    const currentIndex = exercises?.findIndex(
      (ex) =>
        ex._id === selectedExercise._id ||
        ex?.task?.some((taskEX) => taskEX._id === selectedExercise._id)
    );
    return currentIndex;
  }

  const scrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const scrollToSection = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current?.scrollTo({ y, animated: true });
        },
        (error) => {
          console.log('Measure failed', error);
        }
      );
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToSection(scrollIndex);
    }, 100); // small delay to make sure layout is done

    return () => clearTimeout(timer);
  }, [scrollIndex]); // or any other trigger dependency


  const onPressNextExercise = () => {
    const currentIndex = findCurrentIndex();
    if (currentIndex == exercises?.length - 1) {
      navigation.navigate("WorkoutComplete");
      // handleCompleteWorkout()
    }
    else {
      let nextExercise = exercises[currentIndex + 1];
      if (nextExercise) {
        if (nextExercise?.exercise_name) {
          setSelectedExercise(nextExercise);
          setSelectedTask(null)
        }
        else {
          setSelectedTask(nextExercise?.task);
          setSelectedExercise(nextExercise?.task[0]);
        }
        scrollToTop();
      }
    }
  };
  const onPressPreviousExercise = () => {
    const currentIndex = findCurrentIndex();

    let previousExercise = exercises[currentIndex - 1];
    if (previousExercise) {
      if (previousExercise?.exercise_name){
        setSelectedTask(null)
        setSelectedExercise(previousExercise);
      }
      else {
        setSelectedTask(previousExercise?.task);
        setSelectedExercise(previousExercise?.task[0]);
      }
      scrollToTop();
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

  const handleCheckmarkPress = async (index, set,isBodyweightExercise=false,isDynamicWarmUp=false,isRevert=false,currentExercise,userWeight) => {
    let find_lbs_value = findInputValueWithKey(index);
    // dispatch(setLoader(true));

    let newIsChecked = [...calanderSetsCheckmark];

    // Find the object in the array that matches the given index
    let existingItem = newIsChecked.find((item) => item.index === index);

    if (existingItem) {
      // If the object exists, toggle the `value` field (true to false, or false to true)
      newIsChecked = newIsChecked.map((item) =>
        item.index === index ? { ...item, value: !item.value } : item
      );
    } else {
      // If the object does not exist, add a new object with `index` and `value: true`
      newIsChecked.push({ index: index, value: !isRevert });
    }

    dispatch(setCalanderSetsCheckmark(newIsChecked))
    enqueueApiCall(set, find_lbs_value, {
      isBodyweightExercise: isBodyweightExercise,
      isDynamicWarmUp: isDynamicWarmUp,
      isRevert: isRevert,
      currentExercise: currentExercise,
      userWeight: userWeight
    });
    // await singleSetComplete(set, find_lbs_value,isBodyweightExercise,isDynamicWarmUp,isRevert,currentExercise,userWeight);
    // setIsChecked(newIsChecked);
    dispatch(setLoader(false));
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

  const findInputValueWithKey = (keyToFind,currentExercise,setId) => {
    let value = inputsRef.current[keyToFind];
    if (!value && setId)
      value = currentExercise?.submitted_sets?.find(x => x.set_id == setId)?.weight;

    return value || 0;
  };

  const addAdditionalSet = () => {
    let findSet = findSetWithMaxReps(selectedExercise);
    if (findSet)
    {
      const updatedSet = { ...findSet, _id: Math.floor(Math.random() * 1000)+'abs',complete:'false' };
      setAdditionalSets((prevItems) => [...prevItems, updatedSet]);
    }
    else
      toast.show("Record not found");
  };

  const findMaxReps = (exercise) => {
    try {
      const sets = exercise?.sets;
      if (sets) {
        let maxReps = 0;
        let parameterValue = null;
  
        sets.forEach((set) => {
          const reps = Number(set[set.parameter]);
          if (reps > maxReps) {
            maxReps = reps;
            parameterValue = set.parameter;
          }
        });
        maxReps = maxReps || sets[0][sets[0].parameter];
        return { maxReps,  parameterValue };
      } else {
        return { maxReps: 0, parameterValue: null };
      }
    } catch {
      return { maxReps: 0, parameterValue: null };
    }
  };
  const findSetWithMaxReps = (exercise) => {
    try {
      const sets = exercise?.sets;
      if (sets) {
        let maxReps = 0;
        let maxSet = null;
  
        sets.forEach((set) => {
          const reps = Number(set[set.parameter]);
          if (reps > maxReps) {
            maxReps = reps;
            maxSet = set;
          }
        });
  
        return maxSet;
      } else {
        return null;
      }
    } catch {
      return null; 
    }
  };

  function capitalizeFirstLetter(str) {
    try {
      if (typeof str !== 'string' || str.length === 0) {
        return str;
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (error) {
      return str;
    }
  }


// Function to process the queue
const processApiQueue = async () => {
  // If an API call is already in progress, don't start the next one
  if (isApiCallInProgress || apiCallQueue.length === 0) {
    return; // Exit if there is no call or call is in progress
  }

  // Mark the API call as in progress
  isApiCallInProgress = true;
  const { set, weight, options } = apiCallQueue.shift(); // Get the first call from the queue

  try {
    console.log("Processing API call:", set._id); // Debugging step
    await singleSetComplete(set, weight, options); // Process the API call
  } catch (e) {
    console.log("API call failed:", e.toString());
  } 
  finally {
    // After the API call finishes (success or failure)
    isApiCallInProgress = false; // Mark as done
    processApiQueue(); // Process the next call in the queue (if any)
  }
};

// Function to add API call to the queue
const enqueueApiCall = (set, weight, options = {}) => {
  console.log("Enqueuing API call:", set._id); // Debugging step
  apiCallQueue.push({ set, weight, options }); // Add call details to the queue
  processApiQueue(); // Start processing if not already started
};

// Your existing singleSetComplete function
const singleSetComplete = async (
  set,
  weight,
  {
    isBodyweightExercise = false,
    isDynamicWarmUp = false,
    isRevert = false,
    currentExercise,
    userWeight,
  } = {}
) => {
  try {
    const submittedData = {
      set_id: set._id,
      parameter: set?.parameter,
      remaining_time: 0,
      [set?.parameter]: isBodyweightExercise
        ? weight
        : set[set?.parameter], // For BodyWeight (weight used as reps)
      weight: isBodyweightExercise
        ? userWeight
        : !isDynamicWarmUp
        ? weight
        : 0,
    };

    let requestParams = {
      setId: set?._id,
      workout_objId: workout?._id,
      workoutDate:workout.workoutDate,
      exercise_objId: currentExercise?._id,
      inner_objId: workout?.innerWorkout[0]?._id,
      dynamicExercises: dynamicExercises,
      submittedData: submittedData,
      calories: calories || 0,
    };

    if (task) {
      requestParams.task_objId = currentExercise?._id;
    }

    const res = await ApiCall({
      route: isRevert
        ? `assignProgram/revert_update_set/${user?.plan_id}`
        : `assignProgram/update_set/${user?.plan_id}`,
      verb: "post",
      token: token,
      params: requestParams,
    });

    if (res?.status == "200") {
      toast.show("Successfully completed");
      console.log("Successfully completed")
    } else {
      // toast.show("Enter correct sets");
      console.log("Enter correct sets")
    }
  } catch (e) {
    console.log("API error:", e.toString());
  }
};


  const singleExerciseComplete = async () => {
    try {
      dispatch(setLoader(true));
      let requestParams = {
        workout_objId: workout?._id,
        exercise_objId: exercise?._id,
        inner_objId: workout?.innerWorkout[0]?._id,
        calories: calories || 0,
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

  const RenderCategory = ({
    no,
    set,
    reps,
    currentExercise,
    isBottom = true,
    isAdditional,
    addon = "",
  }) => {
    const uniqueKey = isAdditional ? "additionalSet" + no+currentExercise?._id+selectedDay : addon + "set" + no+currentExercise?._id+selectedDay;
    let existingItem = calanderSetsCheckmark?.find((item) => item.index === uniqueKey);

    let findProgramExercise = programExercises?.find(x => x._id == currentExercise._id);
    if (!findProgramExercise) {
      findProgramExercise = programExercises?.find(x => x.exercise_name == currentExercise.exercise_name);
    }
    // Check from `task` array if not found in the main list
    if (!findProgramExercise) {
      for (const exc of programExercises) {
        if (exc.task) {
          findProgramExercise = exc.task.find(x => x._id === currentExercise._id || x.exercise_name === currentExercise.exercise_name);
          if (findProgramExercise) break;
        }
      }
    }

    let isBodyweightExercise = false;
    let isDynamicWarmUp = false;
    
    let selectedCategory = '';
    let userWeight = user?.weight;
    // Check if override_category exists
    const category = findProgramExercise?.override_category;
    if (category) {
        selectedCategory = category;
        isBodyweightExercise = category?.includes('Bodyweight');
        if(isBodyweightExercise){
          if(category == 'Bodyweight (30%)'){
            userWeight=(user?.weight/100)*30;
          }
          else if(category == 'Bodyweight (15%)'){
            userWeight=(user?.weight/100)*15;
          }
          else if(category == 'Bodyweight with reps but not calculated to the Body weight')
          {
            userWeight= 0;
          }
        }
        isDynamicWarmUp = category === "Dynamic Warm Up";
    } else {
        // Check if the exercise is in dynamicExercises
        const found = dynamicExercises?.some(str => str.includes(currentExercise?.exercise_name));
        if (found) {
            isDynamicWarmUp = true;
            isBodyweightExercise = false;
        } else {
            // Fallback to currentExercise?.category
            const fallbackCategory = currentExercise?.category;
            selectedCategory = fallbackCategory;
            isBodyweightExercise =  fallbackCategory?.includes('Bodyweight');
            if(isBodyweightExercise){
              if(fallbackCategory == 'Bodyweight (30%)'){
                userWeight=(user?.weight/100)*30;
              }
              else if(fallbackCategory == 'Bodyweight (15%)'){
                userWeight=(user?.weight/100)*15;
              }
              else if(fallbackCategory == 'Bodyweight with reps but not calculated to the Body weight')
              {
                userWeight= 0;
              }
            }
            isDynamicWarmUp = fallbackCategory === "Dynamic Warm Up";
        }
    }
    return (
      <View key={no} style={styles.mainContainer}>
        <View style={styles.outerContainer}>
          <View style={styles.numberContainer}>
            <Text style={styles.numberTextSTyle}>{no}</Text>
          </View>
          <View style={{ gap: getWidth(1.5) }}>
            <Text style={styles.titleStyle}>{set?.parameter == 'seconds' ? formatDuration(reps) : reps}</Text>
            <Text style={styles.descStyle}>
              {set?.parameter == 'seconds' ? formatDuration(reps) : reps +" "+capitalizeFirstLetter(set?.parameter)}
            </Text>
          </View>
          <View style={styles.semiDividerSTyle} />
  
          <View style={styles.rowSTyle}>
            {!isDynamicWarmUp &&
            <TextInput
            key={uniqueKey}
              style={{
                width: getWidth(20),
                textAlign: "center",
                letterSpacing: 2,
                paddingBottom: getWidth(1.5),
                height:50,
                padding:10,
                color:'#000',
                borderColor:colors.orange,
                borderRadius:10,
                borderWidth:1
              }}
              placeholder={"_______"}
              placeholderTextColor={colors.gray3}
              keyboardType="numeric"
              editable={isDynamicWarmUp ? false : true}
              onChangeText={(text) => handleTextChange(uniqueKey, text)}
              returnKeyType="done"
            />
          }
            
            {/* Show user's weight only for bodyweight exercises */}
            {isBodyweightExercise ? (
             <>
             {selectedCategory == 'Bodyweight' ?
             <>
              <Text style={styles.descStyle}>{`${findInputValueWithKey(uniqueKey,currentExercise,set?._id)} Reps`}</Text>
              <Text style={styles.descStyle}>{`${userWeight} lbs`}</Text>
              </>
              :
              <Text style={styles.descStyle}>{`${findInputValueWithKey(uniqueKey,currentExercise,set?._id)} Reps`}</Text>
            }
              </>
            
            ) : (
              !isDynamicWarmUp && (
                <Text style={styles.descStyle}>{`${findInputValueWithKey(uniqueKey,currentExercise,set?._id)} lbs`}</Text>
              )
            )}
          </View>
  
          <View style={styles.dividerStyle} />
          <TouchableOpacity
            style={{ marginRight: getWidth(5) }}
            onPress={() => {
              if(existingItem)
              {
                if (existingItem.value == true)
                  handleCheckmarkPress(uniqueKey, set, isBodyweightExercise, isDynamicWarmUp, true, currentExercise, userWeight);
                else
                  handleCheckmarkPress(uniqueKey, set, isBodyweightExercise, isDynamicWarmUp, false, currentExercise, userWeight); // Pass isBodyweightExercise, and isDynamicWarmUp
              }
              else{
                if (set?.complete == "true")
                  handleCheckmarkPress(uniqueKey, set, isBodyweightExercise, isDynamicWarmUp, true, currentExercise, userWeight);
                else {
                  handleCheckmarkPress(uniqueKey, set, isBodyweightExercise, isDynamicWarmUp, false, currentExercise, userWeight); // Pass isBodyweightExercise, and isDynamicWarmUp
                }
            }
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={getFontSize(5)}
              color={
                existingItem ?
                existingItem.value == true ? colors.orange :colors.axisColor
                :
                set?.complete == "true" ? colors.orange : colors.axisColor
              }
              style={{ marginRight: getWidth(5) }}
            />
          </TouchableOpacity>
        </View>
        {set?.rest_time && set?.rest_time != 0 ? (
          ((set?.rest_time == '00:00' || set?.rest_time == '00:00:00') && task) ?
          <View style={styles.bottomStyle}>
          <View style={styles.bottomDividerSTyle}></View>
          <View style={styles.itemContainer}>
            <View style={styles.dotContainer} />
            <Text style={styles.itemTextStyle}>
             {'No rest, scroll to next exercise'}
            </Text>
          </View>
        </View>
          :
          <RenderRest uniqueKey={uniqueKey} restTime={set?.rest_time || 0} />
        ) : (
          <View style={{marginTop:20}} />
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
            title={`${exercise?.sets?.length}x${findMaxReps(exercise)?.parameterValue == 'seconds' ? formatDuration(findMaxReps(exercise)?.maxReps) : findMaxReps(exercise)?.maxReps}`}
            desc={findMaxReps(exercise)?.parameterValue == 'seconds' ? checkTimeFormate(findMaxReps(exercise)?.maxReps) : capitalizeFirstLetter(findMaxReps(exercise)?.parameterValue)}
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
              fontFamily: fonts.URe,
              color:'#000',
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
            currentExercise={exercise}
            reps={item[item.parameter] || 0}
            isSuccess={true}
            isAdditional={false}
            addon={addon}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={{ flex: 1,paddingTop:Platform.OS==="android" ? 0 : 50, backgroundColor: colors.white }}>
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
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false}>
          {selectedTask ? (
            selectedTask?.map((item, index) => (
              <View key={index}
              ref={(el) => (sectionRefs.current[index] = el)}
              >
              <TopVideo videoUrl={item?.exerciseVideo || item?.video} title={item?.exercise_name} onPressBack={onPressBack} />
                <RenderExercise exercise={item} addon={"task" + index} />
              </View>
            ))
          ) : (
            <>
           <TopVideo videoUrl={selectedExercise?.exerciseVideo || selectedExercise?.video} title={selectedExercise?.exercise_name} onPressBack={onPressBack} />
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
                  currentExercise={selectedExercise}
                  reps={item[item.parameter] || 0}
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
              <Text style={styles.nextExerciseStyle}>{findCurrentIndex() == exercises?.length -1 ? "Complete Exercise" : "Next Exercise"}</Text>
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
    backgroundColor: '#BBBBBE',
    borderColor: '#BBBBBE',
    marginVertical: 10,
  },
});
