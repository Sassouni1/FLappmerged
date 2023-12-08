import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { GernalStyle } from "../../../constants/GernalStyle";
import { colors } from "../../../constants/colors";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import {
  getWidth,
  getFontSize,
  getHeight,
} from "../../../../utils/ResponsiveFun";
import Feather from "react-native-vector-icons/Feather";
import { fonts } from "../../../constants/fonts";
import { PlayerSvg, RightIcon, StopSvg } from "../../../assets/images";
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

const CompleteWorkout = ({ route }) => {
  const navigation = useNavigation();
  const { workoutId, innerWorkoutId, exerciseId } = route?.params;
  //console.log('execise id',exerciseId)
  const defaultTimer = { hours: 0, minutes: 0, seconds: 0 };
  //const timer = useSelector((state)=> state.auth.timer) || defaultTimer;
  // const timer =
  //   useSelector((state) => state.auth.workoutTimers[workoutId][exerciseId]) ||
  //   defaultTimer;
  const timer =
    useSelector(
      (state) =>
        state.auth.workoutTimers &&
        state.auth.workoutTimers[workoutId] &&
        state.auth.workoutTimers[workoutId][exerciseId]
    ) || defaultTimer;
  //console.log(timer)

  const [hours, setHours] = useState(timer.hours);
  const [minutes, setMinutes] = useState(timer.minutes);
  const [seconds, setSeconds] = useState(timer.seconds);
  const [isRunning, setIsRunning] = useState(false); // Track timer state
  const [selectedInput, setSelectedInput] = useState(null);
  const [selectedInputAdditional, setSelectedInputAdditional] = useState(null);
  const [additionalSetCount, setAdditionalSetCount] = useState(0);
  const [inputContent, setInputContent] = useState(
    Array(exercise?.sets.length).fill("")
  ); // State to store input content

  const [inputContentAdditional, setInputContentAdditional] = useState(
    Array(exercise?.sets[0]).fill("")
  );

  // const [inputContentAdditional, setInputContentAdditional] = useState(
  //   Array(exercise?.sets.length).fill("")
  // );

  const dispatch = useDispatch();

  const [exercise, setExercise] = useState("");
  const [video, setVideo] = useState("");

  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);
  //console.log('timer',timer)

  // State variables for text inputs
  const [submittedSets, setSubmittedSets] = useState([]);

  const [submittedNotes, setSubmittedNotes] = useState("");

  const updateSubmittedSets = (
    index,
    reps,
    lebs,
    weight,
    seconds,
    distance,
    rest_time
  ) => {
    const updatedSets = [...submittedSets];

    // Create a copy of the current set to avoid mutating the state directly
    const currentSet = { ...updatedSets[index] };

    if (reps !== "" || lebs !== "") {
      currentSet.reps = reps?.trim() !== "" ? reps : currentSet.reps;
      currentSet.lebs = lebs?.trim() !== "" ? lebs : currentSet.lebs;
      currentSet.parameter = "reps";
    } else if (weight !== "") {
      currentSet.weight = weight;
      currentSet.parameter = "weight";
    } else if (seconds !== "") {
      currentSet.seconds = seconds;
      currentSet.parameter = "seconds";
    } else if (distance !== "") {
      currentSet.distance = distance;
      currentSet.parameter = "distance";
    }

    // Always update the rest time, even if it's an empty string
    currentSet.rest_time =
      rest_time?.trim() !== "" ? rest_time : currentSet.rest_time;

    updatedSets[index] = currentSet;

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
  const HeadingText = ({ style, buttontext }) => {
    return (
      <View style={[styles.heading, style]}>
        <Text style={styles.headingtext}>{buttontext}</Text>
      </View>
    );
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning); // Toggle timer state
  };

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
        // setAssigWorkout(res?.response?.Workout[0]);
        console.log("workout api response", res?.response?.Exercise);
        setExercise(res?.response?.Exercise);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        //setAssigWorkout([]);
        console.log("errorrrr in calenders");
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  useEffect(() => {
    dispatch(setLoader(true));
    getSingleExcercise();
  }, []);

  const [additionalSet, setAdditionalSets] = useState([]);

  const updateAdditionalSets = (
    index,
    reps,
    lebs,
    weight,
    seconds,
    distance
  ) => {
    const updatedAdditionalSets = [...additionalSet];

    // Create a copy of the current set to avoid mutating the state directly
    const currentSet = { ...updatedAdditionalSets[index] };

    if (reps !== "" || lebs !== "") {
      currentSet.reps = reps?.trim() !== "" ? reps : currentSet.reps;
      currentSet.lebs = lebs?.trim() !== "" ? lebs : currentSet.lebs;
      currentSet.parameter = "reps";
    } else if (weight !== "") {
      currentSet.weight = weight;
      currentSet.parameter = "weight";
    } else if (seconds !== "") {
      currentSet.seconds = seconds;
      currentSet.parameter = "seconds";
    } else if (distance !== "") {
      currentSet.distance = distance;
      currentSet.parameter = "distance";
    }

    updatedAdditionalSets[index] = currentSet;
    setAdditionalSets(updatedAdditionalSets);
  };

  const singleExerciseComplete = async () => {
    try {
      dispatch(setLoader(true));
      const res = await ApiCall({
        route: `assignProgram/update_exercise/${user?.plan_id}`,
        verb: "post",
        token: token,
        params: {
          workout_objId: workoutId,
          exercise_objId: exerciseId,
          inner_objId: innerWorkoutId,
          submitted_sets: JSON.stringify(submittedSets),
          additional_sets: JSON.stringify(additionalSet),
          submitted_notes: submittedNotes,
          submitted_time: `${hours}:${minutes}:${seconds}`,
        },
      });
      console.log("response of work", res);
      if (res?.status == "200") {
        console.log("workout api response", res?.response);
        toast.show("Exercise successfully completed");
        //navigation.navigate("AddWorkouts");
        navigation.navigate("Workouts", { data: "tab2" });
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        toast.show("Enter correct sets");
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
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
  return (
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
            //marginRight: getWidth(3),
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
          <TouchableOpacity
            style={{ ...styles.togle, marginRight: getWidth(3) }}
            onPress={toggleTimer}
          >
            {!isRunning ? (
              // <PlayerSvg height={20} width={20} style={{color:'white'}}/>
              <Entypo name="controller-play" size={25} color="#ffff" />
            ) : (
              <StopSvg height={15} width={15} />
            )}

            <Text style={styles.start}>{!isRunning ? "Start" : "Pause"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          resizeMode="cover"
          style={styles.imgb}
          source={
            exercise?.video_thumbnail
              ? { uri: exercise?.video_thumbnail }
              : require("../../../assets/images/reps.png")
          }
        >
          <View style={styles.overlayContainer}>
            <FontAwesome
              name="play-circle"
              size={getFontSize(9)}
              color="rgba(255,255,255,0.5)"
              onPress={() =>
                navigation.navigate("VideoSkills", {
                  video: exercise?.video,
                  name: exercise?.exercise_name,
                })
              }
              style={styles.videobtn}
            />
          </View>
          <View style={{ height: getHeight(1) }}>
            <Text style={styles.flatchest}>{exercise?.exercise_name}</Text>
            <Text style={styles.flatchest1}>sets: {exercise?.no_of_sets}</Text>
          </View>
        </ImageBackground>
        {loader ? null : (
          <>
            <View style={{ paddingHorizontal: getWidth(3) }}>
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
              {exercise?.notes && exercise?.notes.length > 0 ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
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
              ) : null}
              {exercise?.sets?.map((set, index) => (
                <View
                  key={index}
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
                      {set?.parameter == "reps lebs" ||
                      set?.parameter == "reps" ||
                      set?.parameter == "lebs" ? (
                        <View style={styles.rowDirection}>
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <TextInput
                              placeholder="Enter reps"
                              placeholderTextColor={"white"}
                              keyboardType="number-pad"
                              onFocus={() => setSelectedInput(index)}
                              onBlur={() => setSelectedInput(null)}
                              onChangeText={(text) => {
                                const updatedContent = [...inputContent];
                                updatedContent[index] = text;
                                setInputContent(updatedContent);
                                updateSubmittedSets(
                                  index,
                                  text,
                                  "",
                                  "",
                                  "",
                                  "",
                                  ""
                                );
                              }}
                              style={{ color: "white" }}
                            />
                            <View
                              style={{
                                ...styles.parameterCtn,
                                bottom:
                                  Platform.OS === "ios"
                                    ? getFontSize(0)
                                    : getFontSize(2),
                              }}
                            >
                              <Text style={styles.lbs}>
                                {set?.reps}
                                {`  `}
                              </Text>
                              <Text style={styles.lbs}>reps</Text>
                            </View>
                          </View>
                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <View style={styles.horizental}></View>
                          </View>

                          <View
                            style={{
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <TextInput
                              placeholder="Enter lebs"
                              placeholderTextColor={"white"}
                              keyboardType="number-pad"
                              onFocus={() => setSelectedInput(index)}
                              onBlur={() => setSelectedInput(null)}
                              onChangeText={(text) => {
                                const updatedContent = [...inputContent];
                                updatedContent[index] = text;
                                setInputContent(updatedContent);
                                updateSubmittedSets(
                                  index,
                                  "",
                                  text,
                                  "",
                                  "",
                                  "",
                                  ""
                                );
                              }}
                              style={{ color: "white" }}
                            />
                            <View
                              style={{
                                ...styles.parameterCtn,
                                bottom:
                                  Platform.OS === "ios"
                                    ? getFontSize(0)
                                    : getFontSize(2),
                              }}
                            >
                              <Text style={styles.lbs}>
                                {set?.lebs}
                                {`  `}
                              </Text>
                              <Text style={styles.lbs}>lebs</Text>
                            </View>
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
                              const updatedContent = [...inputContent];
                              updatedContent[index] = text;
                              setInputContent(updatedContent);
                              updateSubmittedSets(
                                index,
                                "",
                                "",
                                text,
                                "",
                                "",
                                ""
                              );
                            }}
                            style={{ width: getWidth(30), color: "white" }}
                          />
                          <View style={styles.parameterCtn}>
                            <Text style={styles.lbs}>
                              {set.weight}
                              {`  `}
                            </Text>
                            <Text style={styles.lbs}>{set.parameter}</Text>
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
                              const updatedContent = [...inputContent];
                              updatedContent[index] = text;
                              setInputContent(updatedContent);
                              updateSubmittedSets(
                                index,
                                "",
                                "",
                                "",
                                text,
                                "",
                                ""
                              );
                            }}
                            style={{ width: getWidth(30), color: "white" }}
                          />
                          <View style={styles.parameterCtn}>
                            <Text style={styles.lbs}>
                              {set.seconds}
                              {`  `}
                            </Text>
                            <Text style={styles.lbs}>{set.parameter}</Text>
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
                              const updatedContent = [...inputContent];
                              updatedContent[index] = text;
                              setInputContent(updatedContent);
                              updateSubmittedSets(
                                index,
                                "",
                                "",
                                "",
                                "",
                                text,
                                ""
                              );
                            }}
                            style={{ width: getWidth(30), color: "white" }}
                          />
                          <View style={styles.parameterCtn}>
                            <Text style={styles.lbs}>
                              {set.distance}
                              {`  `}
                            </Text>
                            <Text style={styles.lbs}>{set.parameter}</Text>
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
                          selectedInput === index || inputContent[index]
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
                      style={{ justifyContent: "center", alignItems: "center" }}
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
              ))}
            </View>
          </>
        )}
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
            {/* <AdditionalSets exercise={exercise}/> */}
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
                <View>
                  <View
                    key={index}
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
                        {exercise?.sets[0]?.parameter == "reps lebs" ||
                        exercise?.sets[0]?.parameter == "reps" ||
                        exercise?.sets[0]?.parameter == "lebs" ? (
                          <View style={styles.rowDirection}>
                            <View
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <TextInput
                                placeholder="Enter reps"
                                placeholderTextColor={"white"}
                                keyboardType="number-pad"
                                onFocus={() =>
                                  setSelectedInputAdditional(index)
                                }
                                onBlur={() => setSelectedInputAdditional(null)}
                                onChangeText={(text) => {
                                  const updatedContent = [
                                    ...inputContentAdditional,
                                  ];
                                  updatedContent[index] = text;
                                  setInputContentAdditional(updatedContent);
                                  updateAdditionalSets(
                                    index,
                                    text,
                                    "",
                                    "",
                                    "",
                                    "",
                                    ""
                                  );
                                }}
                                style={{ color: "white" }}
                              />
                              <View
                                style={{
                                  ...styles.parameterCtn,
                                  bottom:
                                    Platform.OS === "ios"
                                      ? getFontSize(0)
                                      : getFontSize(2),
                                }}
                              >
                                <Text style={styles.lbs}>reps</Text>
                              </View>
                            </View>
                            <View
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <View style={styles.horizental}></View>
                            </View>

                            <View
                              style={{
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <TextInput
                                placeholder="Enter lebs"
                                placeholderTextColor={"white"}
                                keyboardType="number-pad"
                                onFocus={() =>
                                  setSelectedInputAdditional(index)
                                }
                                onBlur={() => setSelectedInputAdditional(null)}
                                onChangeText={(text) => {
                                  const updatedContent = [
                                    ...inputContentAdditional,
                                  ];
                                  updatedContent[index] = text;
                                  setInputContentAdditional(updatedContent);
                                  updateAdditionalSets(
                                    index,
                                    "",
                                    text,
                                    "",
                                    "",
                                    "",
                                    ""
                                  );
                                }}
                                style={{ color: "white" }}
                              />
                              <View
                                style={{
                                  ...styles.parameterCtn,
                                  bottom:
                                    Platform.OS === "ios"
                                      ? getFontSize(0)
                                      : getFontSize(2),
                                }}
                              >
                                <Text style={styles.lbs}>lebs</Text>
                              </View>
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
                              onFocus={() => setSelectedInputAdditional(index)}
                              onBlur={() => setSelectedInputAdditional(null)}
                              onChangeText={(text) => {
                                const updatedContent = [
                                  ...inputContentAdditional,
                                ];
                                updatedContent[index] = text;
                                setInputContentAdditional(updatedContent);
                                updateAdditionalSets(
                                  index,
                                  "",
                                  "",
                                  text,
                                  "",
                                  "",
                                  ""
                                );
                              }}
                              style={{ width: getWidth(30), color: "white" }}
                            />
                            <View style={styles.parameterCtn}>
                              {/* <Text style={styles.lbs}>
                          {exercise?.sets[0]?.weight}
                          {`  `}
                        </Text> */}
                              <Text style={styles.lbs}>
                                {exercise?.sets[0]?.parameter}
                              </Text>
                            </View>
                          </View>
                        ) : exercise?.sets[0]?.parameter == "seconds" ? (
                          <View
                            style={{
                              ...styles.rowDirection,
                            }}
                          >
                            <TextInput
                              placeholder="Enter seconds"
                              placeholderTextColor={"white"}
                              keyboardType="number-pad"
                              onFocus={() => setSelectedInputAdditional(index)}
                              onBlur={() => setSelectedInputAdditional(null)}
                              onChangeText={(text) => {
                                const updatedContent = [
                                  ...inputContentAdditional,
                                ];
                                updatedContent[index] = text;
                                setInputContentAdditional(updatedContent);
                                updateAdditionalSets(
                                  index,
                                  "",
                                  "",
                                  "",
                                  text,
                                  "",
                                  ""
                                );
                              }}
                              style={{ width: getWidth(30), color: "white" }}
                            />

                            <View style={styles.parameterCtn}>
                              {/* <Text style={styles.lbs}>
                          {exercise?.sets[0].seconds}
                          {`  `}
                        </Text> */}
                              <Text style={styles.lbs}>
                                {exercise?.sets[0].parameter}
                              </Text>
                            </View>
                          </View>
                        ) : exercise?.sets[0]?.parameter == "distance" ? (
                          <View
                            style={{
                              ...styles.rowDirection,
                            }}
                          >
                            <TextInput
                              placeholder="Enter distance"
                              placeholderTextColor={"white"}
                              keyboardType="number-pad"
                              onFocus={() => setSelectedInputAdditional(index)}
                              onBlur={() => setSelectedInputAdditional(null)}
                              onChangeText={(text) => {
                                const updatedContent = [
                                  ...inputContentAdditional,
                                ];
                                updatedContent[index] = text;
                                setInputContentAdditional(updatedContent);
                                updateAdditionalSets(
                                  index,
                                  "",
                                  "",
                                  "",
                                  "",
                                  text,
                                  ""
                                );
                              }}
                              style={{ width: getWidth(30), color: "white" }}
                            />
                            <View style={styles.parameterCtn}>
                              {/* <Text style={styles.lbs}>
                          {exercise?.sets[0].distance}
                          {`  `}
                        </Text> */}
                              <Text style={styles.lbs}>
                                {exercise?.sets[0].parameter}
                              </Text>
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
              ))}
          </View>
        </View>
        <View style={{ height: getHeight(15) }}></View>
      </KeyboardAwareScrollView>
      <View
        style={{
          marginTop: Platform.OS === "ios" ? getFontSize(0) : getFontSize(15),
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
    </View>
  );
};

export default CompleteWorkout;
