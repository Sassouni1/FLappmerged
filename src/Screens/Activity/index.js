import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";

import { colors } from "../../constants/colors";
import Entypo from "react-native-vector-icons/Entypo";
import { getHeight, getWidth, getFontSize } from "../../../utils/ResponsiveFun";
import {
  AgreeIcon,
  AngelLeft,
  AngelRight,
  CalenderSvg,
  DelIcon,
  Ellipse,
  GraphActivity,
  IconWhite,
  RemoveIcon,
} from "../../assets/images";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import HeaderBottom from "../../Components/HeaderBottom";
import ReactNativeCalendarStrip from "react-native-calendar-strip";
import { ApiCall } from "../../Services/Apis";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/actions/GernalActions";
import Modal from "react-native-modal";
import { Calendar } from "react-native-calendars";
import { fonts } from "../../constants/fonts";
import { LineChart } from 'react-native-chart-kit';
import { max } from "moment";



const Activity = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(
    new Date()
  );
  const [isModalVisible, setModalVisible] = useState(false);
  const [weeklyProgress, setWeeklyProgress] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });

  const [assigWorkout, setAssigWorkout] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    dispatch(setLoader(true));
    getSingleExcercise(selectedDate);
  };

  const generateDateRange = (selectedDate) => {
    const startDate = new Date(selectedDate);
    const endDate = new Date(selectedDate);
      const diff = startDate.getDay() - 1; // Sunday = 0, Monday = 1, ..., Saturday = 6
    // Set the start date to the previous Monday
    startDate.setDate(startDate.getDate() - diff);
    // Calculate the end date by adding 6 days to the start date
    endDate.setDate(startDate.getDate() + 6);
  
    const startMonth = startDate.toLocaleString("default", { month: "short" });
    const endMonth = endDate.toLocaleString("default", { month: "short" });
  
    const startDateString = `${startDate.getDate()} ${startMonth}`;
    const endDateString = `${endDate.getDate()} ${endMonth}, ${endDate.getFullYear()}`;
  
    return `${startDateString} - ${endDateString}`;
  };
  

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };
  const toggleModal = () => {
    console.log("Opening modal");
    setModalVisible(true);
    console.log("Opened modal");
  };

  const exerciseProgress = async (selectedDate) => {
    try {
      const res = await ApiCall({
        route: `assignProgram/user_progress/${user?.user_id}`,
        verb: "post",
        token: token,
        params:{
          givenDate: selectedDate
        }
      });
      console.log('progress response',res)

      if (res?.status == "200") {
        console.log("workouts progress response", res);
        setWeeklyProgress(res?.response?.weeklyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        //setAssigWorkout([]);
        console.log("errorrrr in calenders progress");
        // Alert.alert(res?.response?.message, [
        //   { text: "OK", onPress: () => console.log("OK Pressed") },
        // ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };
  // useEffect(() => {
  //   dispatch(setLoader(true));
  //   getSingleExcercise(date);
  // }, []);

  const getSingleExcercise = async (selectedDate) => {
    try {
      const res = await ApiCall({
        route: `assignProgram/given-date-workouts/${
          user?.plan_id
        }&${selectedDate.toISOString()}`,
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        setAssigWorkout(res?.response?.Workout[0]);
        console.log("workouts details", res?.response?.Workout[0].progress);

        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        setAssigWorkout([]);
        console.log("errorrrr in calenders");
        // Alert.alert(res?.response?.message, [
        //   { text: "OK", onPress: () => console.log("OK Pressed") },
        // ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  useEffect(() => {
    dispatch(setLoader(true));
    getSingleExcercise(date);
    exerciseProgress(selectedDate)
  }, []);

  const DayCon = ({
    backgroundColor,
    color,
    colorDay,
    icon,
    dayName,
    dayDate,
  }) => {
    return (
      <View style={[styles.dayconn, { backgroundColor: backgroundColor }]}>
        <Text style={[styles.dayText, { color: color }]}>{dayName}</Text>
        <Text style={[styles.datetexxt, { color: colorDay }]}>{dayDate}</Text>
        {icon}
      </View>
    );
  };
  return (
    <View style={styles.contaner}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(51, 51, 51, 1)"
        translucent={true}
      />
      <HeaderBottom
        title={
          <Text style={{ textAlign: "center" }}>
            Hello!{`\n`}
            <Text style={{ fontSize: 12 }}>Here’s how you’re going.</Text>
          </Text>
        }
        LeftIcon={
          <Entypo
            size={30}
            style={{ alignSelf: "flex-start" }}
            color={"white"}
            onPress={() => navigation.openDrawer()}
            name="menu"
          />
        }
        RightIcon={<View />}
      />

      <Text style={styles.progress}>Your Progress</Text>


      <ReactNativeCalendarStrip
          showMonth={false}
          selectedDate={date}
          onDateSelected={handleDateChange}
          calendarAnimation={{ type: "sequence", duration: 30 }}
          daySelectionAnimation={{
            type: "border",
            duration: 200,
            borderWidth: 2,
            borderHighlightColor:
              assigWorkout?.progress == 100
                ? { color: colors.greenlight }
                : assigWorkout?.progress < 100 && assigWorkout?.progress > 0
                ? { color: colors.buttonColor }
                : assigWorkout?.progress == 0
                ? { color: colors.redtime }
                : { color: colors.gray1 },
          }}
          iconLeft={require("../../assets/images/leftp.png")}
          highlightDateNumberStyle={
            assigWorkout?.progress == 100
              ? { color: colors.greenlight }
              : assigWorkout?.progress < 100 && assigWorkout?.progress > 0
              ? { color: colors.buttonColor }
              : assigWorkout?.progress == 0
              ? { color: colors.redtime }
              : { color: colors.gray1 }
          }
          highlightDateNameStyle={
            assigWorkout?.progress == 100
              ? { color: colors.greenlight }
              : assigWorkout?.progress < 100 && assigWorkout?.progress > 0
              ? { color: colors.buttonColor }
              : assigWorkout?.progress == 0
              ? { color: colors.redtime }
              : { color: colors.gray1 }
          }
          iconRight={require("../../assets/images/rightp.png")}
          style={{
            height: getHeight(8),
            marginTop: getHeight(1),
            paddingHorizontal: 5,
          }}
          // calendarHeaderStyle={{color: colors.white}}
          calendarColor={colors.primary}
          dateNumberStyle={{ color: colors.white }}
          dateNameStyle={{ color: colors.white }}
          //iconContainer={{ flex: 0.1 }}
          iconContainer={({ date, iconStyle }) => {
            return (
              <View style={{ flex: 0.1 }}>
                {assigWorkout?.innerWorkout[0].progress === 100 && (
                  <Ionicons
                    name="checkmark-circle-outline"
                    size={20}
                    color={colors.greenlight}
                    style={iconStyle}
                  />
                )}
              </View>
            );
          }}
        />

      {/* <View style={styles.textconn}> */}
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <DayCon
            backgroundColor={colors.timeCon}
            dayDate={"27"}
            dayName={"Sat"}
            colorDay={colors.buttonColor}
            color={colors.buttonColor}
            icon={
              <RemoveIcon
                height={20}
                width={20}
                style={{ marginTop: getHeight(0.5) }}
              />
            }
          />
          <DayCon
            backgroundColor={colors.timeCon}
            dayDate={"28"}
            dayName={"Fri"}
            colorDay={colors.greenlight}
            color={colors.greenlight}
            icon={
              <AgreeIcon
                height={20}
                width={20}
                style={{ marginTop: getHeight(0.5) }}
              />
            }
          />
          <DayCon
            backgroundColor={colors.timeCon}
            dayDate={"29"}
            dayName={"Sun"}
            colorDay={colors.redtime}
            color={colors.redtime}
            icon={
              <DelIcon
                height={20}
                width={20}
                style={{ marginTop: getHeight(0.5) }}
              />
            }
          />
          <DayCon
            backgroundColor={colors.blackOp}
            dayDate={"30"}
            dayName={"Mon"}
            colorDay={colors.white}
            color={colors.white}
            icon={
              <IconWhite
                height={20}
                width={20}
                style={{ marginTop: getHeight(0.5) }}
              />
            }
          />
          <DayCon
            backgroundColor={colors.timeCon}
            dayDate={"1"}
            dayName={"Tue"}
            colorDay={colors.white}
            color={colors.white}
            icon={
              <IconWhite
                height={20}
                width={20}
                style={{ marginTop: getHeight(0.5) }}
              />
            }
          />
          <DayCon
            backgroundColor={colors.timeCon}
            dayDate={"2"}
            dayName={"Wed"}
            colorDay={colors.white}
            color={colors.white}
            icon={
              <IconWhite
                height={20}
                width={20}
                style={{ marginTop: getHeight(0.5) }}
              />
            }
          />
          <DayCon
            backgroundColor={colors.timeCon}
            dayDate={"3"}
            dayName={"Thu"}
            colorDay={colors.white}
            color={colors.white}
            icon={
              <IconWhite
                height={20}
                width={20}
                style={{ marginTop: getHeight(0.5) }}
              />
            }
          />
        </ScrollView> */}
      {/* </View> */}
      <View
        style={{
          justifyContent: "center",
          marginVertical: getHeight(2),
          alignItems: "center",
        }}
      >
        <Ellipse height={getHeight(21)} width={getWidth(58)} />
        {assigWorkout?.progress ?
        <Text style={styles.fourtyper}>{(assigWorkout?.progress).toFixed(0)}%</Text>:<Text style={styles.fourtyper}>0%</Text>}
        <Text style={styles.todayt}>Today’s progress</Text>
      </View>
      <View style={styles.spaceBet}>
        <Text style={styles.activty}>Activity</Text>
        <View style={styles.activityCon}>
          {/* <AngelLeft height={15} width={15} /> */}
          <TouchableOpacity onPress={()=> toggleModal()} style={{flexDirection:"row"}}>
          <CalenderSvg
            height={15}
            width={15}
            style={{ marginLeft: getWidth(2) }}
          />
         <Text style={{...styles.textDay,marginRight:getFontSize(2)}}>{generateDateRange(selectedDate)}</Text></TouchableOpacity>
          {/* <AngelRight
            height={15}
            width={15}
            style={{ marginLeft: getWidth(1) }}
          /> */}
        </View>
      </View>
      <View style={styles.graphCon}>
        {/* <GraphActivity
          height={getHeight(30)}
          width={getWidth(100)}
          style={{ alignSelf: "center" }}
        /> */}
        <LineChart
        data={{
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              data: [
                weeklyProgress.Monday,
                weeklyProgress.Tuesday,
                weeklyProgress.Wednesday,
                weeklyProgress.Thursday,
                weeklyProgress.Friday,
                weeklyProgress.Saturday,
                weeklyProgress.Sunday,
              ],
            },
          ],
        }}
        width={getWidth(95)} // from react-native
        height={getHeight(25)}
        yAxisSuffix="%"
        withHorizontalLines={false}
        withVerticalLines={false}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0, // round to decimal places
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
          yAxis: {
            min: 0, 
            max: 100,
          },
        }}
        bezier // smooth lines
        style={{
          marginVertical: 8,
          borderRadius: getFontSize(2),
        }}
      />
      </View>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Text style={{ color: "red" }}>Close</Text>
          </TouchableOpacity>

          <Calendar
            onDayPress={handleDayPress}
            markedDates={{
              [selectedDate]: {
                selected: true,
                selectedColor: colors.buttonColor,
              },
            }}
          />
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false)
              exerciseProgress(selectedDate)
            }}
            style={styles.donebtn}
          >
            <Text
              style={{
                fontSize: 14,
                color: colors.white,
                fontFamily: fonts.UBo,
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

    </View>
  );
};

export default Activity;
