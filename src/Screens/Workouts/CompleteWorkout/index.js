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

const CompleteWorkout = ({ route }) => {
  const navigation = useNavigation();
  const { workoutId, innerWorkoutId, exerciseId } = route?.params;
  //console.log('execise id',exerciseId)
  const defaultTimer = { hours: 0, minutes: 0, seconds: 0 };
  //const timer = useSelector((state)=> state.auth.timer) || defaultTimer;
  const timer =
    useSelector((state) => state.auth.exerciseTimers[exerciseId]) ||
    defaultTimer;
  //console.log(timer)

  const [hours, setHours] = useState(timer.hours);
  const [minutes, setMinutes] = useState(timer.minutes);
  const [seconds, setSeconds] = useState(timer.seconds);
  const [isRunning, setIsRunning] = useState(false); // Track timer state
  const [selectedInput, setSelectedInput] = useState(null);
  const [inputContent, setInputContent] = useState(
    Array(exercise?.sets.length).fill("")
  ); // State to store input content

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

  const completed = () => {
    toast.show("Comming soon");
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
          submitted_notes: submittedNotes,
          submitted_time: `${hours}:${minutes}:${seconds}`,
        },
      });
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

  // useEffect(() => {
  //   dispatch(updateTimer(hours, minutes, seconds));
  // }, [hours, minutes, seconds]);
  useEffect(() => {
    dispatch(updateTimer(exerciseId, { hours, minutes, seconds }));
  }, [hours, minutes, seconds, exerciseId]);

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
            style={{ ...styles.togle, marginRight: getWidth(2) }}
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
      <KeyboardAvoidingView
        showsVerticalScrollIndicator={false}
        behavior={Platform.OS === "ios" ? "padding" : getFontSize(1)}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <ImageBackground
            resizeMode="cover"
            style={styles.imgb}
            source={
              exercise?.video_thumbnail
                ? { uri: exercise?.video_thumbnail }
                : require("../../../assets/images/reps.png")
            }
          >
            {/* <Text style={styles.flatchest}>{exercise?.exercise_name}</Text>
            {/* <TouchableOpacity
              onPress={() =>
                navigation.navigate("VideoSkills", {
                  video: exercise?.video,
                  name: exercise?.exercise_name,
                })
              }
              style={styles.videobtn}
            > */}
            {/* <AntDesign
                name="youtube"
                size={getFontSize(5)}
                color={colors.white}
                onPress={() =>
                  navigation.navigate("VideoSkills", {
                    video: exercise?.video,
                    name: exercise?.exercise_name,
                  })
                }
                style={styles.videobtn}
              />  */}
            {/* </TouchableOpacity> */}
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
              <Text style={styles.flatchest1}>
                sets: {exercise?.no_of_sets}
              </Text>
            </View>
          </ImageBackground>
          <View style={{ paddingHorizontal: getWidth(3) }}>
            {exercise?.sets?.map((set, index) => (
              <View key={index} style={{ paddingHorizontal: getWidth(3) }}>
                <View style={styles.repsCon}>
                  <Text style={styles.count}>{index + 1}</Text>
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
                            placeholderTextColor={"black"}
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
                          />
                          <View style={styles.parameterCtn}>
                            <Text style={styles.lbs}>
                              {set?.reps}
                              {`  `}
                            </Text>
                            <Text style={styles.lbs}>reps</Text>
                          </View>
                        </View>
                        <View style={styles.horizental}></View>

                        <View
                          style={{
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <TextInput
                            placeholder="Enter lebs"
                            placeholderTextColor={"black"}
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
                          />
                          <View style={styles.parameterCtn}>
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
                          marginTop: getFontSize(1),
                        }}
                      >
                        <TextInput
                          placeholder="Enter weight"
                          placeholderTextColor={"black"}
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
                          style={{ paddingTop: getFontSize(0.6),width:getWidth(30) }}
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
                          marginTop: getFontSize(1),
                        }}
                      >
                        <TextInput
                          placeholder="Enter seconds"
                          placeholderTextColor={"black"}
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
                          style={{ paddingTop: getFontSize(0.6),width:getWidth(30) }}
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
                          marginTop: getFontSize(1),
                        }}
                      >
                        <TextInput
                          placeholder="Enter distance"
                          placeholderTextColor={"black"}
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
                          style={{ paddingTop: getFontSize(0.6),width:getWidth(30) }}
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
                  {/* <View style={styles.tickCon}>
                    <RightIcon height={15} width={15} />
                  </View> */}
                  <View
                    style={{
                      ...styles.tickCon,
                      backgroundColor:
                        selectedInput === index || inputContent[index]
                          ? colors.buttonColor
                          : colors.whiteOp40,
                    }}
                  >
                    {/* <RightIcon height={15} width={15} /> */}
                    <Ionicons
                      name="checkmark-sharp"
                      size={20}
                      color={colors.white}
                      //style={{marginTop: getWidth(2)}}
                    />
                  </View>
                </View>
                {set?.rest_time != 0 ? (
                  <View style={styles.spacebet}>
                    <TextInput
                      placeholder="Enter Rest Time"
                      placeholderTextColor={colors.white}
                      keyboardType="number-pad"
                      style={styles.rest}
                      onChangeText={(text) => {
                        updateSubmittedSets(index, "", "", "", "", "", text);
                      }}
                    />
                    <View style={styles.btng}>
                      <View style={styles.btnhor}></View>
                    </View>
                  </View>
                ) : null}
              </View>
            ))}
            {exercise?.notes && exercise?.notes.length > 0 ? (
              // <View style={{ marginLeft: getWidth(7) }}>
              //   <Text style={styles.note}>Notes:</Text>
              //   <View style={{ ...styles.repsCon, marginTop: getHeight(2) }}>
              //     <View style={{ ...styles.whiteCon, height: getHeight(10) }}>
              //       {/* <Text>{exercise?.notes}</Text> */}
              //       <TextInput
              //         placeholder="Notes"
              //         placeholderTextColor={colors.black}
              //         keyboardType="default"
              //         style={styles.rest}
              //         onChangeText={(text) => {setSubmittedNotes(text);
              //         }}
              //       />
              //     </View>
              //     {/* <View style={styles.tickCon}>
              //       <RightIcon height={15} width={15} />
              //     </View> */}
              //     {/* <View style={styles.btng}>
              //         <View style={styles.btnhor}></View>
              //       </View> */}
              //   </View>
              // </View>
              <View
                style={{
                 
                }}
              >
                <TextInput
                  multiline
                  numberOfLines={3}
                  placeholder="Enter Notes"
                  placeholderTextColor={colors.primary}
                  keyboardType="default"
                  style={{
                    fontFamily: fonts.UBo,
                    color: colors.primary,
                    fontSize: getFontSize(1.5),
                    marginRight: getWidth(2),
                    marginBottom: getWidth(2),
                    width: getWidth(75),
                    //height: getHeight(6),
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: colors.graytext5,
                    backgroundColor: colors.white,
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "row",
                    paddingLeft: getFontSize(3),
                    paddingTop: getFontSize(1),
                    paddingBottom: getFontSize(0.5),
                    marginLeft: getWidth(7),
                    marginTop: getHeight(2),
                    height: getHeight(10),
                  }}
                  onChangeText={(text) => {
                    setSubmittedNotes(text);
                  }}
                />
                {/* <View style={styles.tickCon}>
                  <RightIcon height={15} width={15} />
                </View> */}
              </View>
            ) : null}
          </View>
          <View style={{ height: getHeight(15) }}></View>
        </ScrollView>
      </KeyboardAvoidingView>
      <TouchableOpacity
        // onPress={()=>navigation.navigate('Workouts')}
        onPress={() => singleExerciseComplete()}
        style={styles.buttonMark}
      >
        <Text style={styles.markas}>Complete Exercise</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CompleteWorkout;
