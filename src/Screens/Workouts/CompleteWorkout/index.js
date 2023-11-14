import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  TextInput,
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
import toast from "react-native-simple-toast";

const CompleteWorkout = ({ route }) => {
  const navigation = useNavigation();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false); // Track timer state
  const dispatch = useDispatch();

  const [exercise, setExercise] = useState("");
  const [video, setVideo] = useState("");

  const { workoutId, innerWorkoutId, exerciseId } = route?.params;
  console.log("ids", workoutId, innerWorkoutId, exerciseId);

  const user = useSelector((state) => state.auth.userData);
  console.log("user plan ", user?.plan_id);
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);

  // State variables for text inputs
  const [submittedSets, setSubmittedSets] = useState([]);

  const [submittedNotes, setSubmittedNotes] = useState('');

  // Function to update the submittedSets state for a specific set
  // const updateSubmittedSets = (index, reps, lebs, weight, seconds) => {
  //   const updatedSets = [...submittedSets];

  //   // If lebs is present, assume reps is also present
  //   if (lebs !== "") {
  //     updatedSets[index] = { reps, lebs, weight, seconds };
  //   } else {
  //     updatedSets[index] = { reps: "", lebs: "", weight, seconds };
  //   }

  //   setSubmittedSets(updatedSets);
  // };
  // const updateSubmittedSets = (
  //   index,
  //   reps,
  //   lebs,
  //   weight,
  //   seconds,
  //   distance,
  //   rest_time
  // ) => {
  //   const updatedSets = [...submittedSets];

  //   if (lebs !== "" || reps !== "" || rest_time!== "" ) {
  //     updatedSets[index] = {
  //       reps: reps?.trim() !== "" ? reps : updatedSets[index]?.reps,
  //       lebs: lebs?.trim() !== "" ? lebs : updatedSets[index]?.lebs,
  //       parameter: "reps",
  //       rest_time:
  //         rest_time?.trim() !== "" ? rest_time : updatedSets[index]?.rest_time,
  //     };
  //   } else if (weight !== "" || rest_time!== "") {
  //     updatedSets[index] = {
  //       weight,
  //       parameter: "weight",
  //       rest_time:
  //         rest_time?.trim() !== "" ? rest_time : updatedSets[index]?.rest_time,
  //     };
  //   } else if (seconds !== "" || rest_time!== "") {
  //     updatedSets[index] = {
  //       seconds,
  //       parameter: "seconds",
  //       rest_time:
  //         rest_time?.trim() !== "" ? rest_time : updatedSets[index]?.rest_time,
  //     };
  //   } else if (distance !== "" || rest_time!== "") {
  //     updatedSets[index] = {
  //       distance,
  //       parameter: "distance",
  //       rest_time:
  //         rest_time?.trim() !== "" ? rest_time : updatedSets[index]?.rest_time,
  //     };
  //   } else {
  //     updatedSets[index] = { reps: "", lebs: "", weight: "", seconds: "" };
  //   }

  //   setSubmittedSets(updatedSets);
  // };
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
        console.log("workout api response", res?.response?.Exercise?.sets);
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
          submitted_notes: submittedNotes
        },
      });
      if (res?.status == "200") {
        console.log(
          "workout api response",
          res?.response?.Exercise?.submitted_sets
        );
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
            {isRunning ? (
              <PlayerSvg height={20} width={20} />
            ) : (
              <StopSvg height={20} width={20} />
            )}

            <Text style={styles.start}>{isRunning ? "Start" : "Pause"}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          resizeMode="contain"
          style={styles.imgb}
          source={require("../../../assets/images/reps.png")}
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
            <Text style={styles.flatchest1}>sets: {exercise?.no_of_sets}</Text>
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
                          placeholder="reps"
                          placeholderTextColor={"black"}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
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
                          placeholder="lebs"
                          placeholderTextColor={"black"}
                          keyboardType="number-pad"
                          onChangeText={(text) => {
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
                        placeholder="kg"
                        placeholderTextColor={"black"}
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                          updateSubmittedSets(index, "", "", text, "", "", "");
                        }}
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
                        placeholder="sec"
                        placeholderTextColor={"black"}
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                          updateSubmittedSets(index, "", "", "", text, "", "");
                        }}
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
                        placeholder="miles"
                        placeholderTextColor={"black"}
                        keyboardType="number-pad"
                        onChangeText={(text) => {
                          updateSubmittedSets(index, "", "", "", "", text, "");
                        }}
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
                <View style={styles.tickCon}>
                  <RightIcon height={15} width={15} />
                </View>
              </View>
              {set?.rest_time != 0 ? (
                <View style={styles.spacebet}>
                  <TextInput
                    placeholder="Rest Time"
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
                paddingTop: getFontSize(0.5),
                paddingBottom: getFontSize(0.5),
                marginLeft: getWidth(7),
                marginTop: getHeight(2),
                height: getHeight(10),
              }}
            >
              <View>
                <TextInput
                  multiline
                  numberOfLines={3}
                  placeholder="Notes"
                  placeholderTextColor={colors.primary}
                  keyboardType="default"
                  style={{
                    fontFamily: fonts.UBo,
                    color: colors.primary,
                    fontSize: getFontSize(1.5),
                    marginRight: getWidth(2),
                    marginBottom: getWidth(2),
                  }}
                  onChangeText={(text) => {
                    setSubmittedNotes(text);
                  }}
                />
                {/* <View style={styles.tickCon}>
                  <RightIcon height={15} width={15} />
                </View> */}
              </View>
            </View>
          ) : null}
        </View>
        <View style={{ height: getHeight(15) }}></View>
      </ScrollView>
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
