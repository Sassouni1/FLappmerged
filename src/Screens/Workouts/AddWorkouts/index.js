import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
} from "react-native";
//import { ScrollView } from 'react-native-gesture-handler';
import {
  getHeight,
  getWidth,
  getFontSize,
} from "../../../../utils/ResponsiveFun";
import { colors } from "../../../constants/colors";
import Seprator from "../../../Components/Seprator";
import { fonts } from "../../../constants/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import {
  AgreeIcon,
  DelIcon,
  IconWhite,
  RemoveIcon,
} from "../../../../assets/Images";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { ApiCall } from "../../../Services/Apis";
import { setLoader } from "../../../Redux/actions/GernalActions";
import CalendarStrip from "react-native-calendar-strip";
import AntDesign from "react-native-vector-icons/AntDesign";
import Button from "../../../Components/Button";
import { GernalStyle } from "../../../constants/GernalStyle";
import { PlayerSvg } from "../../../assets/images";

const AddWorkouts = ({ data }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [assigWorkout, setAssigWorkout] = useState([]);

  const planId = user?.plan_id;

  const currentDate = new Date().toISOString();

  const handleDateChange = (selectedDate) => {
    setSelectedDate(selectedDate);

    getSingleExcercise(selectedDate);
  };

  const getSingleExcercise = async (selectedDate) => {
    try {
      const res = await ApiCall({
        params: { category_name: "skill" },
        route: `assignProgram/given-date-workouts/${planId}&${selectedDate.toISOString()}`,
        verb: "get",
        token: token,
      });
      console.log("assignProgram started", res);
      if (res?.status == "200") {
        setAssigWorkout(res?.response?.Workout[0]);

        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        setAssigWorkout([]);
        console.log("errorrrr in calenders");
        alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  useEffect(() => {
    dispatch(setLoader(true));
    getSingleExcercise(selectedDate);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <CalendarStrip
        showMonth={false}
        selectedDate={currentDate}
        onDateSelected={handleDateChange}
        calendarAnimation={{ type: "sequence", duration: 30 }}
        daySelectionAnimation={{
          type: "border",
          duration: 200,
          borderWidth: 1,
          borderHighlightColor: colors.buttonColor,
        }}
        iconLeft={require("../../../assets/images/leftp.png")}
        highlightDateNumberStyle={{ color: colors.buttonColor }}
        highlightDateNameStyle={{ color: colors.buttonColor }}
        iconRight={require("../../../assets/images/rightp.png")}
        style={{
          height: getHeight(8),
          marginTop: getHeight(1),
          paddingHorizontal: 5,
        }}
        // calendarHeaderStyle={{color: colors.white}}
        calendarColor={colors.primary}
        dateNumberStyle={{ color: colors.white }}
        dateNameStyle={{ color: colors.white }}
        iconContainer={{ flex: 0.1 }}
      />

      <FlatList
        data={assigWorkout?.innerWorkout}
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
            <Text style={{ fontSize: getFontSize(2), color: colors.graytext5 }}>
              No workout found on selected date
            </Text>
          </View>
        )}
        refreshing={false}
        onRefresh={() => getSingleExcercise(selectedDate)}
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
                        navigation.navigate("StartWorkout", {
                          workoutId: assigWorkout?._id,
                          innerWorkoutId: item?._id,
                          exerciseId: ex?._id,
                        })
                      }
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: getWidth(3),
                        marginTop:getHeight(2)
                      }}
                    >
                      {/* {console.log("ex===:",ex)} */}
                      {/* <Image
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 5,
                          marginTop: getHeight(1),
                        }}
                        source={require("../../../assets/images/wheelStrech.png")}
                      /> */}
                       <View style={styles.thumbnail}>
                      <PlayerSvg height={20} width={20} />
                    </View>
                      {/* {console.log('ex',ex)} */}
                      <View style={{ marginLeft: getWidth(2) }}>
                        <Text style={styles.heading}>{ex?.exercise_name}</Text>
                        <Text
                          style={{
                            ...styles.total,
                            marginTop: getHeight(0.6),
                          }}
                        >
                          {ex?.description}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
             
          );
        }}
      />
      <Button
        text={"Start workout"}
        onPress={() =>
          navigation.navigate("StartWorkout", {
            workoutId: assigWorkout?._id,
          })
        }
        btnStyle={{
         ...GernalStyle.btn,
          width: getWidth(60),
          backgroundColor: colors.greenlight,
          position: "absolute",
          bottom: getHeight(2),
        }}
        btnTextStyle={GernalStyle.btnText}
      />
    </View>
  );
};

export default AddWorkouts;
