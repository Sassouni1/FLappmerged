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
import { GernalStyle } from "../../constants/GernalStyle";
import { ApiCall } from "../../Services/Apis";
import { PlayerSvg } from "../../assets/images";
import { fonts } from "../../constants/fonts";

const StartWorkout = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const loader = useSelector((state) => state.gernal.loader);

  const planId = user?.plan_id;
  const customSeparator = {
    // marginLeft: getWidth(5),
    width: getWidth(90),
  };

  const workoutId = route?.params?.workoutId;
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  const getUnit = (set) => {
    if (set.weight) {
      return `${set.weight} kg`;
    } else if (set.seconds) {
      return `${set.seconds} seconds`;
    } else if (set.distance) {
      return `${set.distance} meters`;
    } else if (set.reps) {
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
        },
        route: `assignProgram/view_workout/${planId}`,
        verb: "post",
        token: token,
      });

      if (res?.status == "200") {
        console.log("single___-workout", res?.response?.Workout);
        console.log(
          "single___-innerworkout",
          res?.response?.Workout?.innerWorkout
        );
        setData(res?.response?.Workout);
        setId(res?.response);
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
        {/* <View style={styles.contentContainer}>
          <View style={styles.section}>
            <Text style={styles.title}>{data?.workoutName}</Text>
            <Text style={{ color: "#ffff",alignSelf:'center' }}>{data?.exercise&&data?.exercise.length} total exercises</Text>
          </View>

          <Seprator style={customSeparator} />
        </View> */}

        {/* <View style={{ margin: getHeight(1) }}>

          <FlatList
            data={data?.exercise?data?.exercise:[]}
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
        </View> */}
        <FlatList
          data={data?.innerWorkout}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => (
            <View style={{ height: getHeight(10) }}></View>
          )}
          ListEmptyComponent={() => (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: getHeight(50),
              }}
            >
              {loader ? null : (
                <Text
                  style={{ fontSize: getFontSize(2), color: colors.graytext5 }}
                >
                  No workout found on selected date
                </Text>
              )}
            </View>
          )}
          // refreshing={false}
          //onRefresh={() => getSingleExcercise(selectedDate)}
          renderItem={({ item }) => {
            return (
              <View style={{ marginLeft: getWidth(2) }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingHorizontal: getWidth(3),
                    marginBottom: getHeight(1),
                    marginTop: getHeight(1.8),
                  }}
                >
                  <Text
                    style={{
                      ...styles.chest,
                      fontSize: getFontSize(2.5),
                      marginTop: getHeight(0.5),
                    }}
                  >
                    {item?.workoutName}
                  </Text>
                  <Text
                    style={{
                      color: colors.graytext5,
                      fontFamily: fonts.URe,
                      fontSize: 10,
                    }}
                  >
                    {item?.exercise.length} exercises
                  </Text>
                </View>
                <Seprator
                  style={{
                    width: getWidth(95),
                    alignSelf: "center",
                    marginTop: getHeight(1),
                  }}
                />

                {item.exercise.map((ex) => (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("WorkoutSet", {
                        workoutId: data?._id,
                        innerWorkoutId: item?._id,
                        exerciseId: ex?._id,
                      })
                    }
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginLeft: getWidth(3),
                      marginTop: getHeight(2),
                    }}
                  >
                    <View style={styles.thumbnail}>
                      <PlayerSvg height={30} width={30} />
                    </View>
                    {/* {console.log('ex',ex)} */}
                    <View style={{ marginLeft: getWidth(2) }}>
                      <Text style={styles.heading}>{ex?.exercise_name}</Text>

                      <View
                        style={{
                          flexDirection: "row",
                          marginTop: getFontSize(0.5),
                        }}
                      >
                        <Text
                          style={{
                            ...styles.total,
                            fontSize: getFontSize(1.5),
                          }}
                        >
                          {ex?.no_of_sets} sets
                        </Text>
                        {ex?.sets.map((set, index) => (
                          <Text
                            style={{
                              //...styles.text,
                              fontSize: getFontSize(1.5),
                              color: colors.graytext5,
                            }}
                            key={index}
                          >
                            {` `}|{` `}
                            {getUnit(set)}
                          </Text>
                        ))}
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            );
          }}
        />
      </ScrollView>
      {/* <Button
        onPress={() => navigation.navigate("WorkoutSet")}
        text={"Complete workout"}
        btnStyle={{
          ...GernalStyle.btn,
          backgroundColor: colors.buttonColor,
          position: "absolute",
          bottom: getHeight(2),
        }}
        btnTextStyle={{ ...GernalStyle.btnText, color: colors.white }}
      /> */}
      {/* <TouchableOpacity onPress={()=>navigation.navigate('WorkoutSet')} style={{height:getHeight(7),backgroundColor:colors.buttonColor,width:getWidth(60),borderRadius:5,alignSelf:"center",position:"absolute",bottom:getHeight(1),justifyContent:"center",alignItems:"center"}}>
  <Text style={{fontSize:14,fontFamily:fonts.UBo,color:colors.white}}>Complete workout</Text>
</TouchableOpacity> */}
    </View>
  );
};

export default StartWorkout;
