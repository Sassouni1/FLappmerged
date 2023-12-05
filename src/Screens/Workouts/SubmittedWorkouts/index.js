import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
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
import { fonts } from "../../../../constants/fonts";
import { PlayerSvg, RightIcon, StopSvg } from "../../../assets/images";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { ApiCall } from "../../../Services/Apis";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import Seprator from "../../../Components/Seprator";

const SubmittedWorkouts = ({ route }) => {
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
  const defaultTimer = { hours: 0, minutes: 0, seconds: 0 };

  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);

  const submittedTime = exercise?.submitted_time || "0:0:0";
  const [submittedHours, submittedMinutes, submittedSeconds] =
    submittedTime.split(":");
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
            // alignSelf: "center",
            //marginRight: getWidth(1),
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
          {/* <View style={{ ...styles.header }}>
            <View style={styles.headerTime}>
              <Text style={styles.text}>
                {timer.hours.toString().padStart(2, "0")}:
              </Text>
              <Text style={styles.text}>
                {timer.minutes.toString().padStart(2, "0")}:
              </Text>
              <Text style={styles.text}>
                {timer.seconds.toString().padStart(2, "0")}
              </Text>
            </View>
          </View> */}
          <View style={{ ...styles.header }}>
            <View style={styles.headerTime}>
              <Text style={styles.text}>
                {submittedHours.toString().padStart(2, "0")}:
              </Text>
              <Text style={styles.text}>
                {submittedMinutes.toString().padStart(2, "0")}:
              </Text>
              <Text style={styles.text}>
                {submittedSeconds.toString().padStart(2, "0")}
              </Text>
            </View>
          </View>
          {/* <TouchableOpacity
            style={{ ...styles.togle, marginRight: getWidth(2) }}
            onPress={toggleTimer}
          >
            {isRunning ? (
              <FontAwesome6 name={"pause"} size={20} color={"white"} />
            ) : (
              <AntDesign name={"caretright"} size={22} color={"white"} />
            )}

            <Text style={styles.start}>{isRunning ? "Pause" : "Start"}</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          resizeMode="cover"
          style={styles.imgb}
          // source={require("../../../assets/images/reps.png")}
          source={
            exercise?.video_thumbnail
              ? { uri: exercise?.video_thumbnail }
              : require("../../../assets/images/reps.png")
          }
        >
          {/* <View style={styles.playerbtn}>
              <Image
                resizeMode="center"
                style={{ height: getHeight(3), width: getWidth(4) }}
                source={require("../../../assets/images/player.png")}
              />
            </View> */}
          {/* <TouchableOpacity
              onPress={() =>
                navigation.navigate("VideoSkills", {
                  video: exercise?.video,
                  name: exercise?.exercise_name,
                })
              }
              style={styles.videobtn}
            > */}
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
          {/* </TouchableOpacity> */}
        </ImageBackground>
        {/* <HeadingText
            buttontext={"2 warm up sets"}
            style={{ marginTop: getHeight(3) }}
          /> */}
        {loader ? null : (
          <>
            <View style={{ paddingHorizontal: getWidth(3) }}>
              <View style={{ marginTop: getHeight(3) }}>
                <Text style={{ ...styles.set, marginLeft: getFontSize(2) }}>
                  Assigned Set
                </Text>
              </View>
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
                    {/* <Text style={styles.count}>{index + 1}</Text> */}
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
                          <View>
                            <Text style={styles.numbr}>
                              {set.reps} reps
                              {/* {set.lebs} lebs */}
                            </Text>
                            <Text style={styles.lbs}>reps</Text>
                          </View>
                          <View style={styles.horizental}></View>

                          <View>
                            <Text style={styles.numbr}>
                              {set.lebs} lebs
                              {/* {set.lebs} lebs */}
                            </Text>
                            <Text style={styles.lbs}>lebs</Text>
                          </View>
                        </View>
                      ) : set?.parameter == "weight" ? (
                        <View
                          style={{
                            ...styles.rowDirection,
                            // marginTop: getFontSize(1),
                          }}
                        >
                          <Text style={styles.numbr}>{set.weight}kg</Text>
                          <Text style={styles.lbs}>{set.parameter}</Text>
                        </View>
                      ) : set?.parameter == "seconds" ? (
                        <View
                          style={{
                            ...styles.rowDirection,
                            // marginTop: getFontSize(1),
                          }}
                        >
                          <Text style={styles.numbr}>{set.seconds}sec</Text>
                          <Text style={styles.lbs}>{set.parameter}</Text>
                        </View>
                      ) : set?.parameter == "distance" ? (
                        <View
                          style={{
                            ...styles.rowDirection,
                            // marginTop: getFontSize(1),
                          }}
                        >
                          <Text style={styles.numbr}>{set.distance}miles</Text>
                          <Text style={styles.lbs}>{set.parameter}</Text>
                        </View>
                      ) : null}
                      {/* <View style={styles.horizental}></View> */}
                      {/* <View>
                      <Text style={styles.dashes}> ---</Text>
                      <Text style={styles.lbs}>LBS</Text>
                    </View> */}
                    </View>
                    {/* <View style={styles.tickCon}>
                  <RightIcon height={15} width={15} />
                </View> */}
                  </View>
                  {/* {set?.rest_time != 0 ? (
                <View style={styles.spacebet}>
                  <Text style={styles.rest}>{set.rest_time} rest</Text>
                  <View style={styles.btng}>
                    <View style={styles.btnhor}></View>
                  </View>
                </View>
              ) : null} */}
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
                          {set?.rest_time} Rest
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              ))}
            </View>
          </>
        )}
        {loader ? null : (
          <>
            <View style={{ paddingHorizontal: getWidth(3) }}>
              <Text
                style={{
                  ...styles.set,
                  marginTop: getHeight(7),
                  marginLeft: getFontSize(2),
                }}
              >
                Submitted Set
              </Text>
              <View
                style={{
                  marginTop: getFontSize(2),
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Seprator style={{ width: getWidth(27) }} />
                <Text
                  style={{
                    fontSize: getFontSize(1.8),
                    color: colors.white,
                    fontFamily: "Ubuntu",
                    paddingLeft: getFontSize(1),
                    paddingRight: getFontSize(1),
                  }}
                >
                  {exercise?.submitted_sets &&
                  exercise?.submitted_sets.length === "1"
                    ? `${exercise.submitted_sets.length} SUBMITTED SET`
                    : `${
                        exercise?.submitted_sets
                          ? exercise?.submitted_sets.length
                          : 0
                      } SUBMITTED SETS`}
                </Text>
                <Seprator style={{ width: getWidth(27) }} />
              </View>
              {exercise?.submitted_sets?.map((set, index) => (
                <View key={index} style={{ paddingHorizontal: getWidth(3) }}>
                  <View style={{ marginTop: getHeight(0.1) }}></View>
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
                          <View>
                            <Text style={styles.numbr}>
                              {set.reps} reps
                            </Text>
                            <Text style={styles.lbs}>reps</Text>
                          </View>
                          <View style={styles.horizental}></View>

                          <View>
                            <Text style={styles.numbr}>
                              {set.lebs} lebs
                            </Text>
                            <Text style={styles.lbs}>lebs</Text>
                          </View>
                        </View>
                      ) : set?.parameter == "weight" ? (
                        <View
                          style={{
                            ...styles.rowDirection,
                            // marginTop: getFontSize(1),
                          }}
                        >
                          <Text style={styles.numbr}>{set.weight}kg</Text>
                          <Text style={styles.lbs}>{set.parameter}</Text>
                        </View>
                      ) : set?.parameter == "seconds" ? (
                        <View
                          style={{
                            ...styles.rowDirection,
                            // marginTop: getFontSize(1),
                          }}
                        >
                          <Text style={styles.numbr}>{set.seconds}sec</Text>
                          <Text style={styles.lbs}>{set.parameter}</Text>
                        </View>
                      ) : set?.parameter == "distance" ? (
                        <View
                          style={{
                            ...styles.rowDirection,
                            // marginTop: getFontSize(1),
                          }}
                        >
                          <Text style={styles.numbr}>{set.distance}miles</Text>
                          <Text style={styles.lbs}>{set.parameter}</Text>
                        </View>
                      ) : null}
                      {/* <View style={styles.horizental}></View> */}
                      {/* <View>
                      <Text style={styles.dashes}> ---</Text>
                      <Text style={styles.lbs}>LBS</Text>
                    </View> */}
                    </View>
                    {/* <View style={styles.tickCon}>
                  <RightIcon height={15} width={15} />
                </View> */}
                  </View>
                  {/* {set?.rest_time != 0 ? (
                <View style={styles.spacebet}>
                  <Text style={styles.rest}>{set.rest_time} rest</Text>
                  <View style={styles.btng}>
                    <View style={styles.btnhor}></View>
                  </View>
                </View>
              ) : null} */}
                </View>
              ))}
              {exercise?.submitted_notes &&
              exercise?.submitted_notes.length > 0 ? (
                <View style={{ marginLeft: getWidth(7) }}>
                  <Text style={styles.note}>Notes:</Text>
                  <View style={{ ...styles.repsCon, marginTop: getHeight(2) }}>
                    <View style={{ ...styles.whiteCon, height: getHeight(10) }}>
                      <Text style={{ color: "black" }}>
                        {exercise?.submitted_notes}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : null}
            </View>
          </>
        )}
        <View style={{ height: getHeight(15) }}></View>
      </ScrollView>
    </View>
  );
};

export default SubmittedWorkouts;
