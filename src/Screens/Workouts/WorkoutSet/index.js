import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
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

const WorkoutSet = ({ route }) => {
  const navigation = useNavigation();
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false); // Track timer state
  const dispatch = useDispatch();

  const [exercise,setExercise] = useState('');

  const { workoutId,innerWorkoutId,exerciseId } = route?.params;
  console.log('ids',workoutId,innerWorkoutId,exerciseId)

  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);

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
        params:{
          workout_objId : workoutId,
          exercise_objId: exerciseId,
          inner_objId: innerWorkoutId
        }
      });

      if (res?.status == "200") {
        // setAssigWorkout(res?.response?.Workout[0]);
        console.log('workout api response',res?.response?.Exercise?.sets)
        setExercise(res?.response?.Exercise)
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

  useEffect(()=>{
    getSingleExcercise()
  },[])

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
            marginRight: getWidth(3),
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
          <Text style={styles.flatchest}>Flat chest press machine</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("VideoSkills")}
            style={styles.videobtn}
          >
            <Text style={styles.videotext}>Video details</Text>
          </TouchableOpacity>
        </ImageBackground>
        {/* <HeadingText
          buttontext={"2 warm up sets"}
          style={{ marginTop: getHeight(3) }}
        /> */}
        <View style={{ paddingHorizontal: getWidth(3) }}>
          <View style={styles.repsCon}>
            <Text style={styles.count}>1</Text>
            <View style={styles.whiteCon}>
              <View>
                <Text style={styles.numbr}>12</Text>
                <Text style={styles.reps}>12 reps</Text>
              </View>
              <View style={styles.horizental}></View>
              <View>
                <Text style={styles.dashes}>--</Text>
                <Text style={styles.lbs}>LBS</Text>
              </View>
            </View>
            <View style={styles.tickCon}>
              <RightIcon height={15} width={15} />
            </View>
          </View>
          <View style={styles.spacebet}>
            <Text style={styles.rest}>60s rest</Text>
            <View style={styles.btng}>
              <View style={styles.btnhor}></View>
            </View>
          </View>
          <View style={styles.repsCon}>
            <Text style={styles.count}>2</Text>
            <View style={styles.whiteCon}>
              <View>
                <Text style={styles.numbr}>12</Text>
                <Text style={styles.reps}>12 reps</Text>
              </View>
              <View style={styles.horizental}></View>
              <View>
                <Text style={styles.dashes}>--</Text>
                <Text style={styles.lbs}>LBS</Text>
              </View>
            </View>
            <View style={styles.tickCon}>
              <RightIcon height={15} width={15} />
            </View>
          </View>
          <View style={styles.spabet}>
            <Text style={styles.rest2}>60s rest</Text>
            <View style={styles.betww}></View>
          </View>
        </View>
        <View style={{ height: getHeight(15) }}></View>
      </ScrollView>
      <TouchableOpacity
        // onPress={()=>navigation.navigate('Workouts')}
        onPress={() => navigation.navigate("WorkoutSucessfully")}
        style={styles.buttonMark}
      >
        <Text style={styles.markas}>Process</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutSet;
