import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from "react-native";
import DigitalTimer from "../../Components/DigitalTimer";
import { colors } from "../../constants/colors";
import { StatusBar } from "react-native";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import Entypo from "react-native-vector-icons/Entypo";
import { getHeight, getFontSize, getWidth } from "../../../utils/ResponsiveFun";
import { useNavigation } from "@react-navigation/native";
import Seprator from "../../Components/Seprator";
//import { fonts } from '../../../constants/fonts';
import { styles } from "./styles";
import Button from "../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/actions/GernalActions";
import { ApiCall } from "../../Services/Apis";

const StartWorkout = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const userId = user?.plan_id;
  const customSeparator = {
    // marginLeft: getWidth(5),
    width: getWidth(90),
  };
  console.log("route ==", route?.params);
  const exerciseId = route?.params?.exerciseId;
  const innerWorkoutId = route?.params?.innerWorkoutId;
  const workoutId = route?.params?.workoutId;
  const [data, setData] = useState();

  // const data1 = [
  //   {
  //     text: 'Stretch\n3 mins | 1 set | 15 reps',
  //     img: require('../../../assets/Images/wheelStrech.png'),
  //   },
  //   {
  //     text: 'Full Crunches\n5 mins | 2 set | 25 reps',
  //     img: require('../../../assets/Images/fullCrunches.png'),
  //   },
  //   {
  //     text: 'Wheel Stretch\n3 mins | 1 set | 15 reps',
  //     img: require('../../../assets/Images/wheelStrech.png'),
  //   },
  //   {
  //     text: 'Full Crunches\n5 mins | 2 set | 25 reps',
  //     img: require('../../../assets/Images/fullCrunches.png'),
  //   },
  //   {
  //     text: 'Wheel Stretch\n3 mins | 1 set | 15 reps',
  //     img: require('../../../assets/Images/wheelStrech.png'),
  //   },
  //   {
  //     text: 'Full Crunches\n5 mins | 2 set | 25 reps',
  //     img: require('../../../assets/Images/fullCrunches.png'),
  //   },
  // ];

  const getUnit = (set) => {
    if (set.weight) {
      return `${set.weight} kg`;
    } else if (set.seconds) {
      return `${set.seconds} seconds`;
    } else if (set.distance) {
      return `${set.distance} meters`;
    }else if (set.reps) {
      return `${set.reps} reps ${set.lebs} lebs`;
    } else {
      return "N/A"; // You can change this to a default value if needed
    }
  };

  const SingleExcercise = async () => {
    dispatch(setLoader(true));

    try {
      const res = await ApiCall({
        params: {
          workout_objId: workoutId,
          exercise_objId: exerciseId,
          inner_objId: innerWorkoutId,
        },
        route: `assignProgram/single_exercise/${userId}`,
        verb: "post",
        token: token,
      });

      if (res?.status == "200") {
        // console.log('single___-pp',res?.response)
        console.log("single___-excercise", res?.response?.Exercise);
        setData([res?.response?.Exercise]);
        // setAssigWorkout(res?.response?.Workout);
        // setData(res?.response?.detail)

        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));

        alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };
  useEffect(() => {
    SingleExcercise();
  }, []);
  return (
    <View style={styles.container}>
      {/* Set the background color of the status bar */}
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#000"
        translucent={true}
      />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Entypo
            name={"cross"}
            size={45}
            color={colors.primary}
            //style={{ marginLeft: getWidth(2) }}
          />
        </TouchableOpacity>
        <DigitalTimer />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollContainer}
      >
        <View style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.title}>Chest & Triceps</Text>
            <Text style={{ color: "#ffff" }}>9 total exercises</Text>
          </View>

          <Seprator style={customSeparator} />
        </View>

        <View style={{ margin: getHeight(1) }}>
          <FlatList
            data={data}
            ListFooterComponent={() => (
              <View style={{ height: getHeight(8) }}></View>
            )}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              console.log("ire", item);
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("WorkoutSet")}
                  style={styles.header1}
                >
                  <Image
                    resizeMode="contain"
                    source={require("../../assets/images/wheelStrech.png")}
                    style={styles.img}
                  ></Image>

                  <View>
                    <Text style={{ ...styles.text, fontSize: getFontSize(2) }}>
                      {item?.exercise_name}
                    </Text>
                    <View style={{flexDirection:"row",marginTop:getFontSize(0.5)}}>
                    <Text style={{ ...styles.text, fontSize: getFontSize(1.5) }}>
                      {item?.no_of_sets} sets{` `} |
                    </Text>
                    {item?.sets.map((set, index) => (
                      <Text
                        style={{
                          ...styles.text,
                          fontSize: getFontSize(1.5),
                          color: colors.graytext5,
                        }}
                        key={index}
                      >
                        {getUnit(set)}
                      </Text>
                    ))}
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </ScrollView>
      <Button
        onPress={() => navigation.navigate("WorkoutSet")}
        text={"Complete workout"}
        btnStyle={{
          width: getWidth(90),
          height: getWidth(12),
          backgroundColor: colors.buttonColor,
          position: "absolute",
          bottom: getHeight(2),
          margin: getFontSize(2),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: getFontSize(1),
        }}
      />
      {/* <TouchableOpacity onPress={()=>navigation.navigate('WorkoutSet')} style={{height:getHeight(7),backgroundColor:colors.buttonColor,width:getWidth(60),borderRadius:5,alignSelf:"center",position:"absolute",bottom:getHeight(1),justifyContent:"center",alignItems:"center"}}>
  <Text style={{fontSize:14,fontFamily:fonts.UBo,color:colors.white}}>Complete workout</Text>
</TouchableOpacity> */}
    </View>
  );
};

export default StartWorkout;
