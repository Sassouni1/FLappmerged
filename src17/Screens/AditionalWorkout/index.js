import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Platform,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";

import GeneralStatusBar from "../../Components/GeneralStatusBar";
import { GernalStyle } from "../../constants/GernalStyle";
import { colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";
import { getHeight, getFontSize, getWidth } from "../../../utils/ResponsiveFun";
import { fonts } from "../../constants/fonts";
import Seprator from "../../Components/Seprator";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/actions/GernalActions";
import { ApiCall } from "../../Services/Apis";
import AntDesign from "react-native-vector-icons/AntDesign";
import HeaderBottom from "../../Components/HeaderBottom";
import { PlayerSvg } from "../../assets/images";
import Button from "../../Components/Button";

const AditionalWorkout = ({ route }) => {
  const navigation = useNavigation();
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const planID = user?.plan_id;
  const assignedWorkout = route?.params;
  const targetId = assignedWorkout?.targetWorkout?._id;
  const [program, setProgram] = useState(null);
  const [select, setSelect] = useState(null);
  const [excerciseName, setExcerciseName] = useState(null);
  const dispatch = useDispatch();
  const handlePress = (item) => {
    select == item?._id ? setSelect(null) : setSelect(item?._id);
    setExcerciseName(item?.workoutName);
  };
  const getViewProgram = async () => {
    dispatch(setLoader(true));
    try {
      const res = await ApiCall({
        route: "workout/all_workouts",
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        console.log(
          "sd fasfdaasdfasdfasdf asfd afs asdfa dfsa sda dsfadsf afsd asd fdsaf fsd a",
          res?.response?.workout_list
        );

        setProgram(res?.response?.workout_list);
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

  const switchProgram = async () => {
    dispatch(setLoader(true));
    try {
      const res = await ApiCall({
        route: `assignProgram/switch_workout_day_in_assignPlan/${planID}`,
        verb: "put",
        token: token,
        params: {
          sourceWorkoutId: select,
          targetWorkoutId: targetId,
        },
      });

      if (res?.status == "200") {
        console.log(
          "succesful response of switch workout",
          res?.response?.Assigned_Program?.workout
        );

        setProgram(res?.response?.workout_list);
        dispatch(setLoader(false));
        navigation.goBack();
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
  const AdditionalProgram = async () => {
    dispatch(setLoader(true));
    try {
      const res = await ApiCall({
        route: `assignProgram/additional_workout_day_in_assignPlan/${planID}`,
        verb: "put",
        token: token,
        params: {
          sourceWorkoutId: select,
          targetWorkoutId: targetId,
        },
      });

      if (res?.status == "200") {
        console.log(
          "succesful response of switch workout",
          res?.response?.Assigned_Program?.workout
        );

        setProgram(res?.response?.workout_list);
        dispatch(setLoader(false));
        navigation.goBack();
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
    getViewProgram();
  }, []);
  const handleDone = () => {
    if (select) {
      Alert.alert("Do You Want to Add This Workout?", `${excerciseName}`, [
        {
          text: "Cancel",
          onPress: () => {
            console.log("Cancel Pressed"), setSelect(null);
          },
          style: "cancel",
        },
        {
          text: "Add additionals",
          onPress: () => {
            console.log("Additional Pressed");
            AdditionalProgram();
          },
          style: "default",
        },
        {
          text: "Switch",
          onPress: () => {
            console.log("Switch Pressed");
            switchProgram();
          },
        },
      ]);
    } else {
      Alert.alert("First Select a Workout");
    }
  };
  return (
    <View style={{ ...GernalStyle.continer, backgroundColor: colors.primary }}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <HeaderBottom
        title={"Additional Workout's"}
        TitelStyle={{
          color: "white",
          fontSize: 24,
          alignSelf: "flex-end",
          marginBottom: Platform.OS === "ios" ? 3 : 0,
          fontFamily: "Russo_One",
          fontWeight: "600",
          textAlign: "center",
        }}
        //  onPress={() => navigation.goBack()}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name={"left"} size={30} color="#ffff" />
          </TouchableOpacity>
        }
        RightIcon={<View style={{ marginRight: getFontSize(4.5) }} />}
      />
      <Seprator
        style={{
          width: getWidth(90),
          alignSelf: "center",
          marginTop: getHeight(1),
        }}
      />
      <FlatList
        data={program}
        ListHeaderComponent={() => <View style={{ height: getHeight(2) }} />}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handlePress(item)}
            style={{
              backgroundColor: select == item?._id ? colors.bluebtn : "white",
              marginHorizontal: 12,
              marginVertical: getHeight(0.7),
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,

              elevation: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: getWidth(3),
                marginBottom: getHeight(1),
              }}
            >
              <Text
                style={{
                  ...styles.heading,
                  fontSize: getFontSize(2.5),
                  marginTop: getHeight(2),
                }}
              >
                {item?.workoutName}
              </Text>
              <Text
                style={{
                  color: colors.black2,
                  fontFamily: fonts.URe,
                  fontSize: 10,
                  marginTop: getHeight(2),
                }}
              >
                {item?.exercise.length} exercises
              </Text>
            </View>
            <Seprator
              style={{
                width: getWidth(90),
                alignSelf: "center",
                marginTop: getHeight(1),
              }}
            />

            {item.exercise.map((ex) => (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: getWidth(3),
                }}
              >
                {ex?.exerciseId?.video_thumbnail ? (
                  <Image
                    source={{ uri: ex?.exerciseId?.video_thumbnail }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  ></Image>
                ) : (
                  <View style={styles.thumbnail}>
                    <PlayerSvg height={20} width={20} />
                  </View>
                )}

                <View style={{ marginLeft: getWidth(2) }}>
                  <Text
                    style={{ ...styles.chest, fontSize: 16, fontWeight: "500" }}
                  >
                    {ex?.exerciseId?.exercise_name}
                  </Text>
                  <Text style={{ ...styles.total, marginTop: getHeight(0.6) }}>
                    {ex?.exerciseId?.description}
                  </Text>
                </View>
              </View>
            ))}
          </TouchableOpacity>
        )}
      />

      <Button
        btnStyle={{
          ...GernalStyle.btn,
          backgroundColor: select ? colors.buttonColor : colors.btncolor,
          marginBottom: getHeight(2.5),
        }}
        btnTextStyle={GernalStyle.btnText}
        text={"add"}
        onPress={() => handleDone()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  workt: {
    color: colors.white,
    fontFamily: fonts.UBo,
    fontSize: getFontSize(2.5),
  },
  thumbnail: {
    backgroundColor: colors.white,
    justifyContent: "center",
    height: 65,
    width: 85,
    borderRadius: 10,
    alignItems: "center",
    marginTop: getFontSize(1),
    marginBottom: getFontSize(1),
  },
  startwork: {
    width: getWidth(66),
    height: getHeight(7.5),
    backgroundColor: colors.greenlight,
    borderRadius: 5,
    position: "absolute",
    bottom: getHeight(3),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  isTimeCon: {
    height: getHeight(10),
    width: getWidth(100),
    paddingHorizontal: getWidth(3),
    flexDirection: "row",
    alignItems: "center",
    marginTop: getHeight(3),
    marginBottom: getHeight(2),
  },
  sep: {
    width: getWidth(95),
    alignSelf: "center",
    marginTop: getHeight(2),
  },
  spacebet: {
    paddingHorizontal: getWidth(3),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: getHeight(3),
  },
  chest: {
    color: colors.black,
    fontSize: getFontSize(2.8),
    fontFamily: fonts.Re,
  },
  total: {
    //   fontSize: getFontSize(1.5),
    fontSize: getFontSize(1.3),

    color: colors.black2,
    fontFamily: fonts.Re,
    width: getWidth(70),
  },
  heading: {
    fontSize: getFontSize(2.2),
    color: colors.black,
    fontFamily: fonts.UBo,
  },
  conImg: {
    paddingHorizontal: getWidth(3),
    flexDirection: "row",
    alignItems: "center",
    marginTop: getHeight(1.5),
  },
});
export default AditionalWorkout;
