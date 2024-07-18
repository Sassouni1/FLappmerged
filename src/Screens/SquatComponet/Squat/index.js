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
} from "react-native";
import React, { useEffect, useState } from "react";

import { colors } from "../../../constants/colors";

import Ionicons from "react-native-vector-icons/Ionicons";

import { GernalStyle } from "../../../constants/GernalStyle";

import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import {
  getWidth,
  getFontSize,
  getHeight,
} from "../../../../utils/ResponsiveFun";
import Feather from "react-native-vector-icons/Feather";
import { StopSvg } from "../../../assets/images";
import { useNavigation,useFocusEffect } from "@react-navigation/native";

import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { ApiCall } from "../../../Services/Apis";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

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
import RestTimeScreen from "../../../Screens/Workouts/RestTimeScreen";


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

  const {exercise, workoutId, innerWorkoutId, exerciseId, calories, given_sets } =
    route?.params;
  const defaultTimer = { hours: 0, minutes: 0, seconds: 0 };

  const [selectedInput, setSelectedInput] = useState(null);
  const [selectedInputAdditional, setSelectedInputAdditional] = useState(null);
  const [additionalSetCount, setAdditionalSetCount] = useState(0);
  // const [inputContent, setInputContent] = useState(
  //   Array(exercise?.sets.length).fill("")
  // ); // State to store input content
  const [inputContent, setInputContent] = useState(Array(2).fill("")); // State to store input content
  const [isChecked, setIsChecked] = useState(Array(3).fill(false)); // State to track if checkmark is checked or not
  const [isResting, setIsResting] = useState(Array(3).fill(false)); // State to track if checkmark is checked or not
  const [showTimer, setShowTimer] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
 const [additionalSets,setAdditionalSets] = useState([]);

  const [weights, setWeights] = useState('');

  const handleWeightChange = (text, index) => {
    const newWeights = [...weights];
    newWeights[index] = text;
    setWeights(newWeights);
  };

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

console.log("exercise ....",exercise)
  const onPressReset = () => navigation.navigate("ResetTimer");

  const RenderSquare = ({ title, desc, icon }) => {
    return (
      <View style={styles.innerContainer}>
        <Image source={icon} style={styles.iconStyle} />
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.descStyle}>{desc}</Text>
      </View>
    );
  };

  const handleInputChange = (index, value) => {
    const newInputContent = [...inputContent];
    newInputContent[index] = value;
    setInputContent(newInputContent);
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

  const handleCheckmarkPress = (index,set) => {
    const newIsChecked = [...isChecked];
    newIsChecked[index] = !newIsChecked[index];
    setIsChecked(newIsChecked);

    setShowTimer(true); // Show the timer
  };

  const addAdditionalSet = () => {
    let newItem = {
      _id: (Math.random() * 1000).toString(),
      lbs: "100",
      parameter: "lbs",
      reps: "0",
      rest_time: "0",
      task: [],
      video: "",
      video_thumbnail: ""
    }
    setAdditionalSets((prevItems) => [...prevItems, newItem]);
  }

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

  const handleRest = (index) => {
    const newRest = [...isResting];
    newRest[index] = !newRest[index];
    setIsChecked(newRest);
  };

  const handleTimerEnd = () => {
    setShowTimer(false); // Hide the timer
  };

  const RenderRest = ({ no }) => {
    return (
      <View style={styles.bottomStyle}>
        <View style={styles.bottomDividerSTyle}></View>
        <View style={styles.itemContainer}>
          <View style={styles.dotContainer} />
          <Text style={styles.itemTextStyle}>1 min rest</Text>
        </View>
      </View>
    );
  };

  const RenderCategory = ({key, no,set, reps, isSuccess = true, isBottom = true }) => {
    return (
      <View key={key} style={styles.mainContainer}>
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
              value={weights[key]}
              onChangeText={(text) => handleWeightChange(text, key)}

              onSubmitEditing={() => {}}
            />
           <Text style={styles.lbsTextSTyle}>lbs</Text>
          </View>
        
          <View style={styles.dividerStyle} />
          <TouchableOpacity
            style={{ marginRight: getWidth(5) }}
            onPress={() => {
              handleCheckmarkPress(no,set);
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={getFontSize(5)}
              color={!isChecked[no] ? colors.axisColor : colors.orange}
              style={{ marginRight: getWidth(5) }}
            />
          </TouchableOpacity>
        </View>
        {isBottom && isChecked[no] ? (
          <RenderRest no={no} />
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
          {/* <ImageBackground
            source={{uri:exercise?.video_thumbnail}}
            style={styles.imageBgStyle}
            imageStyle={styles.imageStyle}
          >
            <TouchableOpacity
              onPress={onPressBack}
              style={styles.headerBtnStyle}
            >
              <Ionicons
                name="chevron-back"
                size={getFontSize(2.5)}
                color={colors.black}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.playBtnStyle}>
              <Ionicons
                name="play"
                size={getFontSize(3.5)}
                color={colors.white}
              />
            </TouchableOpacity>
            <Text style={styles.statsFontStyle}>{exercise?.exercise_name}</Text>
            <View />
          </ImageBackground> */}
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
              <RenderCategory key={index} set={item} no={index+1} reps={item?.reps || 0} isSuccess={true} />
            ))}

            {additionalSets?.length > 0 &&
              <View>
                <View style={styles.rowContainerSTyle}>
                  <View style={styles.rowDividerSTyle} />
                  <Text style={styles.workingSetSTyle}>{additionalSets?.length > 1 ? (additionalSets?.length + " ADDITIONAL SETS") : (additionalSets?.length + " ADDITIONAL SET")}</Text>
                  <View style={styles.rowDividerSTyle} />
                </View>
                {additionalSets?.map((item, index) => (
                  <RenderCategory key={index} set={item} no={index + 1} reps={item?.reps || 0} isSuccess={true} />
                ))}
              </View>
            }

          <TouchableOpacity onPress={addAdditionalSet} style={styles.addButtonContainer}>
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
              onPress={onPressReset}
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
