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
import React, { useEffect, useState,useMemo } from "react";
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

export default function Squat({ navigation, route }) {
  const onPressBack = () => {
    navigation.goBack();
  };
  const {exercise,workout} = route?.params;
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
  const [restTime, setRestTime] = useState(0);
  const [weights, setWeights] = useState([]);
  const [selectedSetKey,setSelectedSetKey] = useState('');

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
        setAdditionalSets(exercise?.additional_sets)
    }, [exercise])
  );

  useMemo(() => {
    setSeconds(60 * restTime)
  }, [restTime])

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [restTime]);

    const convertTimeToMinutes = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
    };

  console.log("exercise ....", exercise)
  const onPressReset = (restTime) => navigation.navigate("ResetTimer",{restTime:restTime});

  const RenderSquare = ({ title, desc, icon }) => {
    return (
      <View style={styles.innerContainer}>
        <Image source={icon} style={styles.iconStyle} />
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.descStyle}>{desc}</Text>
      </View>
    );
  };

  const handleCheckmarkPress = async (index, set) => {
    let find_lbs_value = findInputValueWithKey(index);
    await singleSetComplete(set, find_lbs_value);
    let newIsChecked = [...isChecked];
    let valueIncludes = newIsChecked.includes(index);
    if (valueIncludes)
      newIsChecked = newIsChecked.filter(x => x != index);
    else
      newIsChecked.push(index);

    setIsChecked(newIsChecked);
    
    let isDisableRest  = disableRest?.includes(index);
    if (!isDisableRest && !valueIncludes && set?.rest_time && set?.rest_time != 0) {
      setSelectedSetKey(index);
      setRestTime(parseInt(set?.rest_time))
      // onPressReset(set?.rest_time);
    }
    else{
      setSelectedSetKey('');
      setRestTime(parseInt(0))
    }
  };

  const handleRestButton = async (index) => {
    let newState = [...disableRest];
    let valueIncludes = newState.includes(index);
    if (valueIncludes)
      newState = newState.filter(x => x != index);
    else
    {
      newState.push(index);
      setRestTime(0)
      setSelectedSetKey('')
    }

    setDisableRest(newState);
  };


  const handleSubmitEditing = (event, key) => {
    const newValue = event.nativeEvent.text;

    let arrayOfObjects = [...weights];
    const updatedArray = arrayOfObjects.map(obj => {
      // If the key exists in the object, update its value
      if (key in obj) {
        return { ...obj, [key]: newValue };
      }
      return obj;
    });

    // Check if the key was updated
    const keyUpdated = updatedArray.some(obj => key in obj);

    // If the key was not found and updated, add a new object
    if (!keyUpdated) {
      updatedArray.push({ [key]: newValue });
    }
    setWeights(updatedArray)
  };

  const findInputValueWithKey = (keyToFind)=>{
    const foundObject = weights.find(obj => keyToFind in obj);
    const value = foundObject ? foundObject[keyToFind] : 0;
    return value;
  }

  const addAdditionalSet = () => {
    let newItem = {
      _id: (Math.random() * 1000).toString(),
      lbs: "",
      parameter: "lbs",
      reps: "10",
      rest_time: "0",
      task: [],
      video: "",
      video_thumbnail: ""
    }
    setAdditionalSets((prevItems) => [...prevItems, newItem]);
  }

  const singleSetComplete = async ( set,weight ) => {
    try {
      dispatch(setLoader(true));
      const submittedData = {
        parameter: set?.parameter,
        remaining_time: '',
        [set?.parameter]: weight,
      };

      let requestParams = {
        setId: set?._id,
        workout_objId: workout?._id,
        exercise_objId: exercise?._id,
        inner_objId: workout?.innerWorkout[0]?._id,
        submittedData: submittedData,
      };

      // if (exercise?.task?.length > 0) {
      //   requestParams.task_objId = exercise?.task?.[nextIncompleteIndex]?._id;
      // }
      const res = await ApiCall({
        route: `assignProgram/update_set/${user?.plan_id}`,
        verb: "post",
        token: token,
        params: requestParams,
      });
      console.log("requestParams",requestParams);
      if (res?.status == "200") {
        toast.show("set successfully completed");
        navigation.navigate("RestTimeScreen", { restTime: set?.rest_time });
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        // toast.show("Enter correct sets");
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  const RenderRest = ({ uniqueKey,restTime }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <View style={styles.bottomStyle}>
          <View style={styles.bottomDividerSTyle}></View>
          <View style={styles.itemContainer}>
            <View style={styles.dotContainer} />
            <Text style={styles.itemTextStyle}>{selectedSetKey == uniqueKey ? convertTimeToMinutes(seconds) : `${restTime} min rest`}</Text>
          </View>
        </View>
        <View style={{ flex: 1}}>
          <TouchableOpacity onPress={()=>{handleRestButton(uniqueKey)}} style={{alignItems:'flex-end',marginTop:25}}>
          <Text style={{color:colors.darkBlue}}>{disableRest.includes(uniqueKey) ? `Enable Rest` : `Disable Rest`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const RenderCategory = ({no,set, reps, isSuccess = true, isBottom = true,isAdditional }) => {
    const uniqueKey = isAdditional ? 'additionalSet'+no : 'set'+no;
    return (
      <View key={no} style={styles.mainContainer}>
        <View style={styles.outerContainer}>
          <View style={styles.numberContainer}>
            <Text style={styles.numberTextSTyle}>{no}</Text>
          </View>
          <View
            style={{
              gap: getWidth(1.5),
            }}
          >
            <Text style={styles.titleStyle}>{reps}</Text>
            <Text style={styles.descStyle}>
              {reps}
              {" Reps"}
            </Text>
          </View>
          <View style={styles.semiDividerSTyle} />
          
          <View style={styles.rowSTyle}>

            <TextInput
              style={{ width: getWidth(15),textAlign:'center', letterSpacing: 2, paddingTop: 0, paddingBottom: 0, }}
              placeholder="--------"
              keyboardType="numeric"
              onSubmitEditing={(event)=>{handleSubmitEditing(event,uniqueKey)}}
              returnKeyType="done"
            />
           <Text style={styles.descStyle}>{`${findInputValueWithKey(uniqueKey)} lbs`}</Text>
          </View>
        
          <View style={styles.dividerStyle} />
          <TouchableOpacity
            style={{ marginRight: getWidth(5) }}
            onPress={() => {
              handleCheckmarkPress(uniqueKey,set);
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={getFontSize(5)}
              color={!isChecked.includes(uniqueKey) ? colors.axisColor : colors.orange}
              style={{ marginRight: getWidth(5) }}
            />
          </TouchableOpacity>
        </View>
        {set?.rest_time && set?.rest_time != 0 ? (
          <RenderRest uniqueKey={uniqueKey} restTime={set?.rest_time || 0} />
        ) : (
          <View
            style={{
              marginTop: 25,
            }}
          />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      {/* {showTimer && <Timer isVisible={showTimer} onTimerEnd={handleTimerEnd} />} */}
      {isVisible ? (
        // <View style={{ backgroundColor: colors.white, flex: 1 }}>
        //   <View
        //     style={{
        //       justifyContent: "center",
        //       alignItems: "center",
        //       flex: 1,
        //       flexDirection: "column",
        //     }}
        //   >
        //     <Text
        //       style={{
        //         ...styles.text,
        //         fontSize: getFontSize(3.5),
        //         fontFamily: fonts.UBo,
        //       }}
        //     >
        //       Are you ready?
        //     </Text>
        //     <View style={{ ...styles.headerTime, marginTop: getFontSize(1) }}>
        //       <Text style={{ ...styles.text, fontFamily: fonts.UBo }}>00:</Text>
        //       <Text style={{ ...styles.text, fontFamily: fonts.UBo }}>
        //         {readySeconds.toString().padStart(2, "0")}
        //       </Text>
        //     </View>
        //   </View>
        // </View>

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
          <View>
            <VideoSkills
              data={{ video: exercise?.video, Name: exercise?.exercise_name }}
            />
            <TouchableOpacity
              onPress={onPressBack}
              style={[styles.headerBtnStyle,{position:'absolute',top:10,left:10}]}
            >
              <Ionicons
                name="chevron-back"
                size={getFontSize(2.5)}
                color={colors.black}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.categoryContainer}>
            <RenderSquare
              title={`${exercise?.lbs || 0}x${exercise?.no_of_sets}`}
              desc="Reps"
              icon={require("../../../assets/images/squatsIcon3.png")}
            />
            <View style={styles.dividerStyle} />
            <RenderSquare
              title="1.2.3.1"
              desc="Tempo"
              icon={require("../../../assets/images/squatsIcon2.png")}
            />
            <View style={styles.dividerStyle} />
            <RenderSquare
              title="85%"
              desc="Max"
              icon={require("../../../assets/images/squatsIcon1.png")}
            />
            <View style={styles.dividerStyle} />
            <RenderSquare
              title="10"
              desc="RPE"
              icon={require("../../../assets/images/squatsIcon1.png")}
            />
            <View style={styles.dividerStyle} />
            <RenderSquare
              title="2"
              desc="RIR"
              icon={require("../../../assets/images/squatsIcon1.png")}
            />
            <View style={styles.dividerStyle} />
          </View>
          <View style={styles.rowContainerSTyle}>
            <View style={styles.rowDividerSTyle} />
            <Text style={styles.workingSetSTyle}>{exercise?.sets?.length > 1 ? exercise?.sets?.length + " WORKING SETS" : exercise?.sets?.length + " WORKING SET"}</Text>
            <View style={styles.rowDividerSTyle} />
          </View>
            {exercise?.sets?.map((item, index) => (
              <RenderCategory key={index+1}  set={item} no={index+1} reps={item?.reps || 0} isSuccess={true} isAdditional={false} />
            ))}

            {additionalSets?.length > 0 &&
              <View>
                <View style={styles.rowContainerSTyle}>
                  <View style={styles.rowDividerSTyle} />
                  <Text style={styles.workingSetSTyle}>{additionalSets?.length > 1 ? (additionalSets?.length + " ADDITIONAL SETS") : (additionalSets?.length + " ADDITIONAL SET")}</Text>
                  <View style={styles.rowDividerSTyle} />
                </View>
                {additionalSets?.map((item, index) => (
                  <RenderCategory key={index + 1}  set={item} no={index + 1} reps={item?.reps || 0} isSuccess={true} isAdditional={true} />
                ))}
              </View>
            }

          <TouchableOpacity onPress={()=> addAdditionalSet()} style={styles.addButtonContainer}>
            <Text style={styles.addTitleStyle}>+ Add Set</Text>
          </TouchableOpacity>
          <View style={styles.bottomBtnStyle}>
            <TouchableOpacity
              onPress={onPressBack}
              style={styles.rightContainer}
            >
              <Ionicons
                name="arrow-back-outline"
                size={getFontSize(3)}
                color={colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>{}}
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
    </SafeAreaView>
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
    fontSize: getFontSize(2.6),
    fontFamily: fonts.WB,
    textAlign: "center",
  },
  descStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
    textAlign: "center",
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
    flex:1,
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
});
