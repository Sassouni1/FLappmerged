import {
  Dimensions,
  ImageBackground,
  Image,
  Platform,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  Button,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BarChart, LineChart } from "react-native-gifted-charts";
import Entypo from "react-native-vector-icons/Entypo";
import MultiSLider from "@ptomasroos/react-native-multi-slider";
import { Dropdown } from "react-native-element-dropdown";
import UpdateProfiles from "../../Screens/UpdateProfile";
import MetricsComponent from "../../Components/MetricsComponent";
const moment = require('moment');

//Local Imports
import { colors } from "../../constants/colors";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { fonts } from "../../constants/fonts";
import { Heartbeat } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { setLoader } from "../../Redux/actions/GernalActions";
import { ApiCall } from "../../Services/Apis";
import SelectDropdown from "react-native-select-dropdown";
// import session from "redux-persist/lib/storage/session";
import PopupModal from "../../Components/ErrorPopup";
import AppleHealthKit from "react-native-health";

const defaultDropDownValue = "Last 7 Days";
export default function TrainingStats({ navigation }) {
  const [appleStatGraphData, setAppleStatGraphData] = useState([]);
  const [selectedAppleStat, setSelectedAppleStat] = useState("steps");
  const [appleStatsDataList,setAppleStatsDataList] = useState([]);
  const [appleStats_dropdown, set_appleStats_dropdown] =
    useState("Last 7 Days");
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const { height, width } = Dimensions.get("window");
  const [isModalVisible, setModalVisible] = useState(false);
  const [healthData, setHealthData] = useState({
    vo2Max: null,
    heartRate: null,
    heartRateVariability: null,
    restingHeartRate: null,
    distanceWalkingRunning: null,
    dailyStepCount: null,
    activeEnergyBurned: null,
    basalEnergyBurned: null,
    stepCount: null,
  });

  let options = {
    permissions: {
      read: [
        "StepCount",
        "DistanceWalkingRunning",
        "ActiveEnergyBurned",
        "HeartRate",
        "RestingHeartRate",
        "HeartRateVariability",
        "SleepAnalysis",
        "BodyFatPercentage",
        "BodyMassIndex",
        "BasalEnergyBurned",
        "BodyMassIndex",
        "LeanBodyMass",
      ],
      write: [],
    },
  };

  useEffect(() => {
    requestPermissionsAndFetchData();
  }, []);

  // Function to request permissions and fetch health data
  const requestPermissionsAndFetchData = () => {
    AppleHealthKit.initHealthKit(options, (err, results) => {
      if (err) {
        console.log("results", err);
        return;
      }
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 6);

      // Fetch VO2 Max
      AppleHealthKit.getVo2MaxSamples(
        { startDate: new Date(2023, 0, 1).toISOString() },
        (err, results) => {
          if (err) {
            console.log("Error fetching VO2 Max:", err);
            return;
          }
          setHealthData((prevData) => ({
            ...prevData,
            vo2Max: results,
          }));
        }
      );

      // Fetch Heart Rate
      AppleHealthKit.getHeartRateSamples(
        { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
        (err, results) => {
          if (err) {
            console.log("Error fetching heart rate:", err);
            return;
          }
          setHealthData((prevData) => ({
            ...prevData,
            heartRate: results,
          }));
        }
      );

      // Fetch Heart Rate Variability
      AppleHealthKit.getHeartRateVariabilitySamples(
        { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
        (err, results) => {
          if (err) {
            console.log("Error fetching heart rate variability.:", err);
            return;
          }
          setHealthData((prevData) => ({
            ...prevData,
            heartRateVariability: results,
          }));
        }
      );

      // Fetch Resting Heart Rate
      AppleHealthKit.getRestingHeartRateSamples(
        { startDate: new Date(2023, 0, 1).toISOString() },
        (err, results) => {
          if (err) {
            console.log("Error fetching resting heart rate:", err);
            return;
          }
          setHealthData((prevData) => ({
            ...prevData,
            restingHeartRate: results,
          }));
        }
      );

      // Fetch Distance Walking Running
      AppleHealthKit.getDailyDistanceWalkingRunningSamples(
        { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
        (err, results) => {
          if (err) {
            console.log("Error fetching distance walking/running:", err);
            return;
          }
          setHealthData((prevData) => ({
            ...prevData,
            distanceWalkingRunning: results,
          }));
        }
      );

      // Fetch Daily Step Count
      AppleHealthKit.getDailyStepCountSamples(
        { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
        (err, results) => {
          if (err) {
            console.log("Error fetching daily step count:", err);
            return;
          }
          const totalSteps =
            results?.reduce((total, sample) => total + sample.value, 0) ||
            "N/A";
          setHealthData((prevData) => ({
            ...prevData,
            dailyStepCount: results,
          }));
        }
      );

      // Fetch Active Energy Burned
      AppleHealthKit.getActiveEnergyBurned(
        { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
        (err, results) => {
          if (err) {
            console.log("Error fetching active energy burned:", err);
            return;
          }
          setHealthData((prevData) => ({
            ...prevData,
            activeEnergyBurned: results,
          }));
        }
      );

      // Fetch Basal Energy Burned
      AppleHealthKit.getBasalEnergyBurned(
        { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
        (err, results) => {
          if (err) {
            console.log("Error fetching basal energy burned:", err);
            return;
          }
          setHealthData((prevData) => ({
            ...prevData,
            basalEnergyBurned: results?.[0]?.value || "N/A",
          }));
        }
      );

      // Fetch Step Count
      AppleHealthKit.getStepCount(
        { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
        (err, results) => {
          if (err) {
            console.log("Error fetching step count:", err);
            return;
          }
          setHealthData((prevData) => ({
            ...prevData,
            stepCount: results?.value || "N/A",
          }));
        }
      );
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      if (user.isAssigned != true) setModalVisible(true);
    }, [])
  );
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function calculatePercentage(value) {
    const minValue = 80;
    const maxValue = 450;
    const maxPercentage = 90;

    // Ensure the value is within the expected range
    if (value < minValue) {
      return 0;
    } else if (value > maxValue) {
      return maxPercentage;
    }

    // Calculate the percentage
    const percentage =
      ((value - minValue) / (maxValue - minValue)) * maxPercentage;
    return percentage;
  }

  useFocusEffect(
    React.useCallback(() => {
      set_tc_dropdown(defaultDropDownValue);
      set_cb_dropdown(defaultDropDownValue);
      set_sp_dropdown(defaultDropDownValue);

      dispatch(setLoader(true));
      getExerciseProgress("weekly", setWeeklyProgress, true);
      getCaloriesProgress("weekly", setCaloriesProgress, true);
      getWeightProgress("weekly", setWeightProgress);
    }, [])
  );

  const onPressBack = () => {
    navigation.goBack();
  };

  // all progress states
  const [weeklyProgress, setWeeklyProgress] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });
  const [monthlyProgress, setMonthlyProgress] = useState({
    Week1: 0,
    Week2: 0,
    Week3: 0,
    Week4: 0,
  });
  const [progressThreeMonth, setProgressThreeMonth] = useState([]);
  const [progressSixMonth, setProgressSixMonth] = useState([]);
  const [yearProgress, setYearProgress] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });
  const [weekDataProgress, setWeekDataProgress] = useState({});

  // all messages progress states
  const [messagesProgress, setMessagesProgress] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });
  const [messagesProgressMonth, setMessagesProgressMonth] = useState({
    Week1: 0,
    Week2: 0,
    Week3: 0,
    Week4: 0,
  });
  const [messagesProgressThreeMonth, setMessagesProgressThreeMonth] = useState(
    []
  );
  const [messagesProgressSixMonth, setMessagesProgressSixMonth] = useState([]);
  const [messagesProgressAllMonth, setMessagesProgressAllMonth] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });

  // all weight progress states
  const [weightProgress, setWeightProgress] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });
  const [monthlyWeightProgress, setMonthlyWeightProgess] = useState({
    Week1: 0,
    Week2: 0,
    Week3: 0,
    Week4: 0,
  });
  const [weightProgressThreeMonth, setWeightProgressThreeMonth] = useState([]);
  const [weightProgressSixMonth, setWeightProgressSixMonth] = useState([]);
  const [weightProgressAllMonth, setWeightProgressAllMonth] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });

  // all calories progress states
  const [caloriesProgress, setCaloriesProgress] = useState({
    Monday: 0,
    Tuesday: 0,
    Wednesday: 0,
    Thursday: 0,
    Friday: 0,
    Saturday: 0,
    Sunday: 0,
  });
  const [monthlyCaloriesProgress, setMonthlyCaloriesProgess] = useState({
    Week1: 0,
    Week2: 0,
    Week3: 0,
    Week4: 0,
  });
  const [caloriesProgressThreeMonth, setCaloriesProgressThreeMonth] = useState(
    []
  );
  const [caloriesProgressSixMonth, setCaloriesProgressSixMonth] = useState([]);
  const [caloriesProgressAllMonth, setCaloriesProgressAllMonth] = useState({
    Jan: 0,
    Feb: 0,
    Mar: 0,
    Apr: 0,
    May: 0,
    Jun: 0,
    Jul: 0,
    Aug: 0,
    Sep: 0,
    Oct: 0,
    Nov: 0,
    Dec: 0,
  });

  // select type states by dropdown

  const [tc_dropdown, set_tc_dropdown] = useState();
  const [cb_dropdown, set_cb_dropdown] = useState();
  const [sp_dropdown, set_sp_dropdown] = useState();
  const [caloriesBurned, setCaloriesBurned] = useState(0);
  const [total_lbs, setTotal_lbs] = useState(0);
  const [workoutsThisWeek, setWorkoutsThisWeek] = useState();

  const [maxLBS, setMaxLBS] = useState();
  const [exerciseName, setExerciseName] = useState();
  const [exerciseDate, setExerciseDate] = useState();
  const [parameter, setParameter] = useState();

  const [maxLBS_DL, setMaxLBS_DL] = useState();
  const [exerciseName_DL, setExerciseName_DL] = useState();
  const [exerciseDate_DL, setExerciseDate_DL] = useState();
  const [parameter_DL, setParameter_DL] = useState();

  useEffect(() => {
    let maxLBS = 0;
    let exerciseName = "";
    let exerciseDate = "";
    let parameter = "";

    let maxLBS_DL = 0;
    let exerciseName_DL = "";
    let exerciseDate_DL = "";
    let parameter_DL = "";
    workoutsThisWeek?.forEach((dayWorkout) => {
      dayWorkout?.innerWorkout?.forEach((element) => {
        element?.exercise?.forEach((exercise) => {
          exercise?.sets?.forEach((additionalSet) => {
            let _exerciseName = exercise?.exercise_name?.toLowerCase();
            if (
              _exerciseName?.includes("squat") &&
              (additionalSet.parameter == "lbs" ||
                additionalSet.parameter == "weight")
            ) {
              let isLBS = additionalSet.parameter == "lbs";
              let _max = isLBS
                ? parseInt(additionalSet?.lbs || 0)
                : parseInt(additionalSet?.weight || 0);
              if (maxLBS < _max) {
                maxLBS = _max;
                parameter = isLBS ? additionalSet.parameter : "kg";
                exerciseName = exercise?.exercise_name;
                exerciseDate = dayWorkout?.workoutDate;
              }
            }
            if (
              _exerciseName?.includes("deadlift") &&
              (additionalSet.parameter == "lbs" ||
                additionalSet.parameter == "weight")
            ) {
              let isLBS = additionalSet.parameter == "lbs";
              let _max = isLBS
                ? parseInt(additionalSet?.lbs || 0)
                : parseInt(additionalSet?.weight || 0);
              if (maxLBS_DL < _max) {
                maxLBS_DL = _max;
                parameter_DL = isLBS ? additionalSet.parameter : "kg";
                exerciseName_DL = exercise?.exercise_name;
                exerciseDate_DL = dayWorkout?.workoutDate;
              }
            }
          });
        });
      });
    });
    setMaxLBS(maxLBS);
    setParameter(parameter);
    setExerciseName(exerciseName);
    setExerciseDate(exerciseDate);

    setMaxLBS_DL(maxLBS_DL);
    setParameter_DL(parameter_DL);
    setExerciseName_DL(exerciseName_DL);
    setExerciseDate_DL(exerciseDate_DL);
  }, [workoutsThisWeek]);

  function formatDate(date) {
    date = new Date(date);
    // Get the day, month, and year from the date object
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    // Return the formatted date string
    return `${month}/${day}/${year}`;
  }

  const [allTypes, setAllTypes] = useState([
    "Last 7 Days",
    "This Month",
    "Last 3 Months",
    "Last 6 Months",
    "All Time",
  ]);

  const [assigWorkout, setAssigWorkout] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  const [sliderValue, setSliderValue] = React.useState([
    user?.weight,
    user?.target_weight,
  ]);
  const token = useSelector((state) => state.auth.userToken);

  const onChangeDropDown = (selectedType, section) => {
    if (section != "appleStats")
      toggleTypeSelection(selectedType, section);
    if (section == "tc") set_tc_dropdown(selectedType);
    else if (section == "cb") set_cb_dropdown(selectedType);
    else if (section == "sp") set_sp_dropdown(selectedType);
    else if (section == "appleStats") set_appleStats_dropdown(selectedType);
  };

  const handleAppleStatSelection = (stat) => {
    setSelectedAppleStat(stat);
  };
  const getExerciseProgress = async (
    timePeriod,
    setProgressFunction,
    isPost = false
  ) => {
    const routes = {
      weekly: `assignProgram/user_progress/${user?.user_id}`,
      monthly: `assignProgram/monthly_progress/${user?.user_id}`,
      threeMonth: `assignProgram/last_three_months_progress/${user?.user_id}`,
      sixMonth: `assignProgram/last_six_months_progress/${user?.user_id}`,
      allMonths: `assignProgram/all_months_progress/${user?.user_id}`,
    };

    try {
      const res = await ApiCall({
        route: routes[timePeriod],
        verb: isPost ? "post" : "get",
        token: token,
        ...(isPost && { params: { givenDate: new Date() } }), // Include params if it's a POST request
      });

      if (res?.status == "200") {
        setProgressFunction(
          res?.response?.weeklyProgress ||
            res?.response?.monthlyProgress ||
            res?.response?.yearlyProgress
        );
        if (timePeriod === "weekly") {
          setWorkoutsThisWeek(res?.response?.workoutsThisWeek); // Additional data for weekly progress
        }
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log(`error in ${timePeriod} exercise progress`);
      }
    } catch (e) {
      console.log(`api get ${timePeriod}Progress error -- `, e.toString());
    }
  };

  const getWeightProgress = async (timePeriod, setProgressFunction) => {
    const routes = {
      weekly: `assignProgram/weeklyWeight/${user?.plan_id}`,
      monthly: `assignProgram/monthlyWeight/${user?.plan_id}`,
      threeMonth: `assignProgram/lastThreeMonthWeight/${user?.plan_id}`,
      sixMonth: `assignProgram/lastSixMonthWeight/${user?.plan_id}`,
      allMonths: `assignProgram/allMonthsWeight/${user?.plan_id}`,
    };

    try {
      const res = await ApiCall({
        route: routes[timePeriod],
        verb: "get",
        token: token,
      });

      console.log(`response of getWeight${timePeriod}Progress`, res?.response);

      if (res?.status == "200") {
        setProgressFunction(
          res?.response?.monthlyWeight || res?.response?.weeklyWeight
        );
        setTotal_lbs(res?.response?.total_lbs);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log(`error in ${timePeriod} progress`);
      }
    } catch (e) {
      console.log(`api get ${timePeriod}Weight error -- `, e.toString());
    }
  };

  const getCaloriesProgress = async (
    timePeriod,
    setProgressFunction,
    isPost = false
  ) => {
    const routes = {
      weekly: `assignProgram/user_weekly_calories/${user?.user_id}`,
      monthly: `assignProgram/monthly_calories/${user?.user_id}`,
      threeMonth: `assignProgram/last_three_months_calories/${user?.user_id}`,
      sixMonth: `assignProgram/last_six_months_calories/${user?.user_id}`,
      allMonths: `assignProgram/all_months_calories/${user?.user_id}`,
    };

    try {
      const res = await ApiCall({
        route: routes[timePeriod],
        verb: isPost ? "post" : "get",
        token: token,
        ...(isPost && { params: { givenDate: new Date() } }), // Include params if it's a POST request
      });

      if (res?.status == "200") {
        setProgressFunction(
          res?.response?.weeklyProgress ||
            res?.response?.monthlyProgress ||
            res?.response?.yearlyProgress
        );
        setCaloriesBurned(res?.response?.totalCalories); // Common for all progress types
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log(`error in ${timePeriod} calories progress`);
      }
    } catch (e) {
      console.log(`api get ${timePeriod}Calories error -- `, e.toString());
    }
  };

  // logic for calender days changing
  let weekProgress = {
    Monday: weekDataProgress?.Monday,
    Tuesday: weekDataProgress?.Tuesday,
    Wednesday: weekDataProgress?.Wednesday,
    Thursday: weekDataProgress?.Thursday,
    Friday: weekDataProgress?.Friday,
    Saturday: weekDataProgress?.Saturday,
    Sunday: weekDataProgress?.Sunday,
  };

  let customDatesStyles = [];
  const startDate = new Date(date);
  const endDate = new Date(date);
  if (startDate.getDay() === 0) {
    startDate.setDate(startDate.getDate() - 6);
  } else {
    const diff = startDate.getDay() - 1;
    startDate.setDate(startDate.getDate() - diff);
  }
  endDate.setDate(startDate.getDate() + 6);

  const dayOfWeekMap = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const selectedDayOfWeek = new Date(date).getDay();
  const selectedDayName = dayOfWeekMap[selectedDayOfWeek];

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    const dayOfWeek = currentDate.getDay();
    const dayName = dayOfWeekMap[dayOfWeek];

    if (dayName == selectedDayName) {
      customDatesStyles.push({
        startDate: currentDate,
        dateNameStyle: { color: "white" },
        dateNumberStyle: { color: "white" },
        dateContainerStyle: {
          height: getHeight(8),
          backgroundColor: "rgba(255,255,255,0.3)",
          borderWidth: 0,
          width: getWidth(11),
          borderRadius: getFontSize(0.5),
        },
      });
    } else {
      switch (weekProgress[dayName]) {
        case "coming soon":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: "#05b7ff" },
            dateNumberStyle: { color: "#05b7ff" },
            dateContainerStyle: {
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: getFontSize(0.5),
            },
          });
          break;
        case "partially complete":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.buttonColor },
            dateNumberStyle: { color: colors.buttonColor },
            dateContainerStyle: {
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: getFontSize(0.5),
            },
          });
          break;
        case "not assigned":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.gray1 },
            dateNumberStyle: { color: colors.gray1 },
            dateContainerStyle: {
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: getFontSize(0.5),
            },
          });
          break;
        case "assigned":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: "#05b7ff" },
            dateNumberStyle: { color: "#05b7ff" },
            dateContainerStyle: {
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: getFontSize(0.5),
            },
          });
          break;
        case "complete":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.greenlight },
            dateNumberStyle: { color: colors.greenlight },
            dateContainerStyle: {
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: getFontSize(0.5),
            },
          });
          break;
        case "missed":
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.redtime },
            dateNumberStyle: { color: colors.redtime },
            dateContainerStyle: {
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: getFontSize(0.5),
            },
          });
        default:
          customDatesStyles.push({
            startDate: currentDate,
            dateNameStyle: { color: colors.white },
            dateNumberStyle: { color: colors.white },
            dateContainerStyle: {
              height: getHeight(8),
              backgroundColor: colors.calendar,
              borderWidth: 0,
              width: getWidth(11),
              borderRadius: getFontSize(0.5),
            },
          });
          break;
      }
    }
  }

  // select api function from dropdown
  const toggleTypeSelection = (selectedType, section) => {
    dispatch(setLoader(true));

    // Define the mappings for selectedType to progress type
    const progressMap = {
      "Last 7 Days": "weekly",
      "This Month": "monthly",
      "Last 3 Months": "threeMonth",
      "Last 6 Months": "sixMonth",
      "All Time": "allMonths",
    };

    // Define the mappings for section to their respective progress functions
    const sectionMap = {
      tc: getExerciseProgress,
      cb: getCaloriesProgress,
      sp: getWeightProgress,
    };

    const setProgressMap = {
      tc: {
        weekly: setWeeklyProgress,
        monthly: setMonthlyProgress,
        threeMonth: setProgressThreeMonth,
        sixMonth: setProgressSixMonth,
        allMonths: setYearProgress,
      },
      cb: {
        weekly: setCaloriesProgress,
        monthly: setMonthlyCaloriesProgess,
        threeMonth: setCaloriesProgressThreeMonth,
        sixMonth: setCaloriesProgressSixMonth,
        allMonths: setCaloriesProgressAllMonth,
      },
      sp: {
        weekly: setWeightProgress,
        monthly: setMonthlyWeightProgess,
        threeMonth: setWeightProgressThreeMonth,
        sixMonth: setWeightProgressSixMonth,
        allMonths: setWeightProgressAllMonth,
      },
    };

    // Retrieve the progressType based on the selectedType
    const progressType = progressMap[selectedType];

    // Ensure progressType and section are valid
    if (progressType && sectionMap[section]) {
      const setProgress = setProgressMap[section][progressType];
      const isPost = selectedType === "Last 7 Days"; // Weekly requires POST request

      // Call the respective function
      sectionMap[section](progressType, setProgress, isPost);
    } else {
      console.log("No valid type or section selected");
    }
  };

  // three month names and their percentages of messages

  let monthNameOfThreeMonth = [];
  if (messagesProgressThreeMonth.length > 0) {
    monthNameOfThreeMonth = messagesProgressThreeMonth.map(
      (item) => item.month
    );
  } else {
    monthNameOfThreeMonth = [0, 0, 0];
  }

  let percentageOfThreeMonth = [];
  if (messagesProgressThreeMonth.length > 0) {
    percentageOfThreeMonth = messagesProgressThreeMonth.map(
      (item) => item.percentage
    );
  } else {
    percentageOfThreeMonth = [0, 0, 0];
  }

  // Six month names and their percentages of messages

  let monthNameOfSixMonth = [];
  if (messagesProgressSixMonth.length > 0) {
    monthNameOfSixMonth = messagesProgressSixMonth.map((item) => item.month);
  } else {
    monthNameOfSixMonth = [0, 0, 0, 0, 0, 0];
  }

  let percentageOfSixMonth = [];
  if (messagesProgressSixMonth.length > 0) {
    percentageOfSixMonth = messagesProgressSixMonth.map(
      (item) => item.percentage
    );
  } else {
    percentageOfSixMonth = [0, 0, 0, 0, 0, 0];
  }

  // progress of three month of progress
  let monthNameOfThreeMonthProgress = [];
  if (progressThreeMonth.length > 0) {
    monthNameOfThreeMonthProgress = progressThreeMonth.map(
      (item) => item.month
    );
  } else {
    monthNameOfThreeMonthProgress = [0, 0, 0];
  }

  let percentageOfThreeMonthProgress = [];
  if (progressThreeMonth.length > 0) {
    percentageOfThreeMonthProgress = progressThreeMonth.map(
      (item) => item.percentage
    );
  } else {
    percentageOfThreeMonthProgress = [0, 0, 0];
  }

  // Six month names progress and their percentages of progress
  let monthNameOfSixMonthProgress = [];
  if (progressSixMonth.length > 0) {
    monthNameOfSixMonthProgress = progressSixMonth.map((item) => item.month);
  } else {
    monthNameOfSixMonthProgress = [0, 0, 0, 0, 0, 0];
  }

  let percentageOfSixMonthProgress = [];
  if (progressSixMonth.length > 0) {
    percentageOfSixMonthProgress = progressSixMonth.map(
      (item) => item.percentage
    );
  } else {
    percentageOfSixMonthProgress = [0, 0, 0, 0, 0, 0];
  }

  // three month names and their percentages of weight

  let monthNameOfThreeMonthWeight = [];
  if (weightProgressThreeMonth.length > 0) {
    monthNameOfThreeMonthWeight = weightProgressThreeMonth.map(
      (item) => item.month
    );
  } else {
    monthNameOfThreeMonthWeight = [0, 0, 0];
  }

  let percentageOfThreeMonthWeight = [];
  if (weightProgressThreeMonth.length > 0) {
    percentageOfThreeMonthWeight = weightProgressThreeMonth.map(
      (item) => item.percentage
    );
  } else {
    percentageOfThreeMonthWeight = [0, 0, 0];
  }

  // Six month names and their percentages of weight

  let monthNameOfSixMonthWeight = [];
  if (weightProgressSixMonth.length > 0) {
    monthNameOfSixMonthWeight = weightProgressSixMonth.map(
      (item) => item.month
    );
  } else {
    monthNameOfSixMonthWeight = [0, 0, 0, 0, 0, 0];
  }

  let percentageOfSixMonthWeight = [];
  if (weightProgressSixMonth.length > 0) {
    percentageOfSixMonthWeight = weightProgressSixMonth.map(
      (item) => item.percentage
    );
  } else {
    percentageOfSixMonthWeight = [0, 0, 0, 0, 0, 0];
  }

  // three month names and their percentages of weight

  let monthNameOfThreeMonthCalories = [];
  if (caloriesProgressThreeMonth.length > 0) {
    monthNameOfThreeMonthCalories = caloriesProgressThreeMonth.map(
      (item) => item.month
    );
  } else {
    monthNameOfThreeMonthCalories = [0, 0, 0];
  }

  let percentageOfThreeMonthCalories = [];
  if (caloriesProgressThreeMonth.length > 0) {
    percentageOfThreeMonthCalories = caloriesProgressThreeMonth.map(
      (item) => item.percentage
    );
  } else {
    percentageOfThreeMonthCalories = [0, 0, 0];
  }

  // Six month names and their percentages of weight

  let monthNameOfSixMonthCalories = [];
  if (caloriesProgressSixMonth.length > 0) {
    monthNameOfSixMonthCalories = caloriesProgressSixMonth.map(
      (item) => item.month
    );
  } else {
    monthNameOfSixMonthCalories = [0, 0, 0, 0, 0, 0];
  }

  let percentageOfSixMonthCalories = [];
  if (caloriesProgressSixMonth.length > 0) {
    percentageOfSixMonthCalories = caloriesProgressSixMonth.map(
      (item) => item.percentage
    );
  } else {
    percentageOfSixMonthCalories = [0, 0, 0, 0, 0, 0];
  }

  const trainingCompletionRate = () => {
    let completionRate = 0;
    let data = trainingCompletionData();
    let total = 0;

    if (data) {
      let length = data?.length;
      data.forEach((element) => {
        total = total + element.value;
      });
      completionRate = (total / (100 * length)) * 100;
    }
    return Math.round(completionRate);
  };

  const trainingCompletionData = () => {
    switch (tc_dropdown) {
      case "Last 7 Days":
        return [
          {
            value: weeklyProgress.Sunday,
            label: "Sun",
          },
          {
            value: weeklyProgress.Monday,
            label: "Mon",
          },
          {
            value: weeklyProgress.Tuesday,
            label: "Tue",
          },
          { value: weeklyProgress.Wednesday, label: "Wed" },
          {
            value: weeklyProgress.Thursday,
            label: "Thurs",
          },
          {
            value: weeklyProgress.Friday,
            label: "Fri",
          },
          {
            value: weeklyProgress.Saturday,
            label: "Sat",
          },
        ];
      case "This Month":
        return [
          {
            value: monthlyProgress.Week1,
            label: "Week1",
          },
          {
            value: monthlyProgress.Week2,
            label: "Week2",
          },
          {
            value: monthlyProgress.Week3,
            label: "Week3",
          },
          {
            value: monthlyProgress.Week4,
            label: "Week4",
          },
        ];
      case "Last 3 Months":
        return [
          {
            value: percentageOfThreeMonthProgress[0],
            label: monthNameOfThreeMonthProgress[0],
          },
          {
            value: percentageOfThreeMonthProgress[1],
            label: monthNameOfThreeMonthProgress[1],
          },
          {
            value: percentageOfThreeMonthProgress[2],
            label: monthNameOfThreeMonthProgress[2],
          },
        ];
      case "Last 6 Months":
        return [
          {
            value: percentageOfSixMonthProgress[0],
            label: monthNameOfSixMonthProgress[0],
          },
          {
            value: percentageOfSixMonthProgress[1],
            label: monthNameOfSixMonthProgress[1],
          },
          {
            value: percentageOfSixMonthProgress[2],
            label: monthNameOfSixMonthProgress[2],
          },
          {
            value: percentageOfSixMonthProgress[3],
            label: monthNameOfSixMonthProgress[3],
          },
          {
            value: percentageOfSixMonthProgress[4],
            label: monthNameOfSixMonthProgress[4],
          },
          {
            value: percentageOfSixMonthProgress[5],
            label: monthNameOfSixMonthProgress[5],
          },
        ];
      case "All Time":
        return [
          { label: "Jan", value: yearProgress.Jan },
          { label: "Feb", value: yearProgress.Feb },
          { label: "Mar", value: yearProgress.Mar },
          { label: "Apr", value: yearProgress.Apr },
          { label: "May", value: yearProgress.May },
          { label: "Jun", value: yearProgress.Jun },
          { label: "Jul", value: yearProgress.Jul },
          { label: "Aug", value: yearProgress.Aug },
          { label: "Sep", value: yearProgress.Sep },
          { label: "Oct", value: yearProgress.Oct },
          { label: "Nov", value: yearProgress.Nov },
          { label: "Dec", value: yearProgress.Dec },
        ];
      default:
        return [
          {
            value: weeklyProgress.Sunday,
            label: "Sun",
          },
          {
            value: weeklyProgress.Monday,
            label: "Mon",
          },
          {
            value: weeklyProgress.Tuesday,
            label: "Tue",
          },
          { value: weeklyProgress.Wednesday, label: "Wed" },
          {
            value: weeklyProgress.Thursday,
            label: "Thurs",
          },
          {
            value: weeklyProgress.Friday,
            label: "Fri",
          },
          {
            value: weeklyProgress.Saturday,
            label: "Sat",
          },
        ];
    }
  };

  const caloriesLineData = () => {
    switch (cb_dropdown) {
      case "Last 7 Days":
        return [
          {
            value: caloriesProgress.Sunday,
            label: "Sun",
          },
          {
            value: caloriesProgress.Monday,
            label: "Mon",
          },
          {
            value: caloriesProgress.Tuesday,
            label: "Tue",
          },
          { value: caloriesProgress.Wednesday, label: "Wed" },
          {
            value: caloriesProgress.Thursday,
            label: "Thurs",
          },
          {
            value: caloriesProgress.Friday,
            label: "Fri",
          },
          {
            value: caloriesProgress.Saturday,
            label: "Sat",
          },
        ];
      case "This Month":
        return [
          {
            value: monthlyCaloriesProgress.Week1,
            label: "Week1",
          },
          {
            value: monthlyCaloriesProgress.Week2,
            label: "Week2",
          },
          {
            value: monthlyCaloriesProgress.Week3,
            label: "Week3",
          },
          { value: monthlyCaloriesProgress.Week4, label: "Week4" },
        ];
      case "Last 3 Months":
        return [
          {
            value: percentageOfThreeMonthCalories[0],
            label: monthNameOfThreeMonthCalories[0],
          },
          {
            value: percentageOfThreeMonthCalories[1],
            label: monthNameOfThreeMonthCalories[1],
          },
          {
            value: percentageOfThreeMonthCalories[2],
            label: monthNameOfThreeMonthCalories[2],
          },
        ];
      case "Last 6 Months":
        return [
          {
            value: percentageOfSixMonthCalories[0],
            label: monthNameOfSixMonthCalories[0],
          },
          {
            value: percentageOfSixMonthCalories[1],
            label: monthNameOfSixMonthCalories[1],
          },
          {
            value: percentageOfSixMonthCalories[2],
            label: monthNameOfSixMonthCalories[2],
          },
          {
            value: percentageOfSixMonthCalories[3],
            label: monthNameOfSixMonthCalories[3],
          },
          {
            value: percentageOfSixMonthCalories[4],
            label: monthNameOfSixMonthCalories[4],
          },
          {
            value: percentageOfSixMonthCalories[5],
            label: monthNameOfSixMonthCalories[5],
          },
        ];
      case "All Time":
        return [
          { label: "Jan", value: caloriesProgressAllMonth.Jan },
          { label: "Feb", value: caloriesProgressAllMonth.Feb },
          { label: "Mar", value: caloriesProgressAllMonth.Mar },
          { label: "Apr", value: caloriesProgressAllMonth.Apr },
          { label: "May", value: caloriesProgressAllMonth.May },
          { label: "Jun", value: caloriesProgressAllMonth.Jun },
          { label: "Jul", value: caloriesProgressAllMonth.Jul },
          { label: "Aug", value: caloriesProgressAllMonth.Aug },
          { label: "Sep", value: caloriesProgressAllMonth.Sep },
          { label: "Oct", value: caloriesProgressAllMonth.Oct },
          { label: "Nov", value: caloriesProgressAllMonth.Nov },
          { label: "Dec", value: caloriesProgressAllMonth.Dec },
        ];
      default:
        return [
          {
            value: caloriesProgress.Sunday,
            label: "Sun",
          },
          {
            value: caloriesProgress.Monday,
            label: "Mon",
          },
          {
            value: caloriesProgress.Tuesday,
            label: "Tue",
          },
          { value: caloriesProgress.Wednesday, label: "Wed" },
          {
            value: caloriesProgress.Thursday,
            label: "Thurs",
          },
          {
            value: caloriesProgress.Friday,
            label: "Fri",
          },
          {
            value: caloriesProgress.Saturday,
            label: "Sat",
          },
        ];
    }
  };

  useEffect(() => {
    if (selectedAppleStat == "steps")
      setAppleStatGraphData(healthData?.dailyStepCount)
    else if (selectedAppleStat == "hrv")
      setAppleStatGraphData(healthData?.heartRateVariability)
    else if (selectedAppleStat == "hr")
      setAppleStatGraphData(healthData?.heartRate)
    else if (selectedAppleStat == "rhr")
      setAppleStatGraphData(healthData?.restingHeartRate)
    else if (selectedAppleStat == "aeb")
      setAppleStatGraphData(healthData?.activeEnergyBurned)
    else if (selectedAppleStat == "wd")
      setAppleStatGraphData(healthData?.distanceWalkingRunning)

  }, [healthData, selectedAppleStat])

  const appleStatsDataByRange = (data, range) => {

    const now = moment(); // Current time
    let startDate;
    let totalValueCount = 0; // Initialize total value

    switch (range) {
       case 'Last 7 Days': {
      // Get the previous Sunday
      const lastSunday = now.clone().day(0); // .day(0) gets the last Sunday (Sunday is day 0 in moment.js)
      
      // Get the last 7 days starting from Sunday
      const result = [...Array(7)].map((_, i) => {
        const day = lastSunday.clone().add(i, 'days'); // Add i days from Sunday
        const dayData = data.find(item => moment(item.startDate).isSame(day, 'day'));

        const value = dayData ? dayData.value : 0; // Use 0 if no data
        totalValueCount += value;
        return {
          label: day.format('ddd'),  // Short weekday name (e.g., 'Sun', 'Mon')
          value: value
        };
      });
      if (typeof totalValueCount === 'number' && !Number.isInteger(totalValueCount)) {
        return totalValueCount.toFixed(2);
    }
      return { data: result, total: totalValueCount };
    }
  
      case 'This Month':{
        startDate = now.clone().startOf('month');
        
        // Group by weeks in the current month
        const weeksOfMonth = [...Array(4)].map((_, index) => {
          const weekStart = startDate.clone().add(index * 7, 'days');
          const weekEnd = weekStart.clone().add(7, 'days');
          
          const weekData = data.filter(item =>
            moment(item.startDate).isBetween(weekStart, weekEnd)
          );
          
          const totalValue = weekData.reduce((acc, curr) => acc + curr.value, 0);
          totalValueCount += totalValue;
          return {
            label: `Week${index + 1}`,
            value: totalValue || 0,  // 0 if no data for the week
          };
        });
        if (typeof totalValueCount === 'number' && !Number.isInteger(totalValueCount)) {
          totalValueCount = totalValueCount.toFixed(2);
        }
        return { data: weeksOfMonth, total: totalValueCount };
      }
  
      case 'Last 3 Months':{
        startDate = now.clone().subtract(3, 'months');
        const last3Months = [...Array(3)].map((_, i) => now.clone().subtract(i, 'months')).reverse();
        
        const result = last3Months.map(month => {
          const monthData = data.filter(item =>
            moment(item.startDate).isSame(month, 'month')
          );
          
          const totalValue = monthData.reduce((acc, curr) => acc + curr.value, 0);
          totalValueCount += totalValue;
          return {
            label: month.format('MMM'),
            value: totalValue || 0,  // 0 if no data for the month
          };
        });
        if (typeof totalValueCount === 'number' && !Number.isInteger(totalValueCount)) {
          totalValueCount = totalValueCount.toFixed(2);
        }
        return { data: result, total: totalValueCount };
      }
  
      case 'Last 6 Months':{
        startDate = now.clone().subtract(6, 'months');
        const last6Months = [...Array(6)].map((_, i) => now.clone().subtract(i, 'months')).reverse();
        
        const result = last6Months.map(month => {
          const monthData = data.filter(item =>
            moment(item.startDate).isSame(month, 'month')
          );
          
          const totalValue = monthData.reduce((acc, curr) => acc + curr.value, 0);
          totalValueCount += totalValue;
          return {
            label: month.format('MMM'),
            value: totalValue || 0,  // 0 if no data for the month
          };
        });
        if (typeof totalValueCount === 'number' && !Number.isInteger(totalValueCount)) {
          totalValueCount = totalValueCount.toFixed(2);
        }
        return { data: result, total: totalValueCount };
      }
  
      case 'All Time':{
        const allMonths = [...Array(12)].map((_, index) => moment().month(index).startOf('month'));
        
        const result = allMonths.map(month => {
          const monthData = data.filter(item =>
            moment(item.startDate).isSame(month, 'month')
          );
          
          const totalValue = monthData.reduce((acc, curr) => acc + curr.value, 0);
          totalValueCount += totalValue;
          return {
            label: month.format('MMM'),
            value: totalValue || 0,  // 0 if no data for the month
          };
        });
        if (typeof totalValueCount === 'number' && !Number.isInteger(totalValueCount)) {
          totalValueCount = totalValueCount.toFixed(2);
        }
        return { data: result, total: totalValueCount };
      }
      default:
        return [];
    }
  };

  const strengthProgressData = () => {
    switch (sp_dropdown) {
      case "Last 7 Days":
        return [
          {
            value: weightProgress.Sunday,
            label: "Sun",
          },
          {
            value: weightProgress.Monday,
            label: "Mon",
          },
          {
            value: weightProgress.Tuesday,
            label: "Tue",
          },
          { value: weightProgress.Wednesday, label: "Wed" },
          {
            value: weightProgress.Thursday,
            label: "Thurs",
          },
          {
            value: weightProgress.Friday,
            label: "Fri",
          },
          {
            value: weightProgress.Saturday,
            label: "Sat",
          },
        ];
      case "This Month":
        return [
          { value: monthlyWeightProgress.Week1, label: "Week1" },
          { value: monthlyWeightProgress.Week2, label: "Week2" },
          { value: monthlyWeightProgress.Week3, label: "Week3" },
          { value: monthlyWeightProgress.Week4, label: "Week4" },
        ];
      case "Last 3 Months":
        return [
          {
            value: percentageOfThreeMonthWeight[0],
            label: monthNameOfThreeMonthWeight[0],
          },
          {
            value: percentageOfThreeMonthWeight[1],
            label: monthNameOfThreeMonthWeight[1],
          },
          {
            value: percentageOfThreeMonthWeight[2],
            label: monthNameOfThreeMonthWeight[2],
          },
        ];
      case "Last 6 Months":
        return [
          {
            value: percentageOfSixMonthWeight[0],
            label: monthNameOfSixMonthWeight[0],
          },
          {
            value: percentageOfSixMonthWeight[1],
            label: monthNameOfSixMonthWeight[1],
          },
          {
            value: percentageOfSixMonthWeight[2],
            label: monthNameOfSixMonthWeight[2],
          },
          {
            value: percentageOfSixMonthWeight[3],
            label: monthNameOfSixMonthWeight[3],
          },
          {
            value: percentageOfSixMonthWeight[4],
            label: monthNameOfSixMonthWeight[4],
          },
          {
            value: percentageOfSixMonthWeight[5],
            label: monthNameOfSixMonthWeight[5],
          },
        ];
      case "All Time":
        return [
          { label: "Jan", value: weightProgressAllMonth.Jan },
          { label: "Feb", value: weightProgressAllMonth.Feb },
          { label: "Mar", value: weightProgressAllMonth.Mar },
          { label: "Apr", value: weightProgressAllMonth.Apr },
          { label: "May", value: weightProgressAllMonth.May },
          { label: "Jun", value: weightProgressAllMonth.Jun },
          { label: "Jul", value: weightProgressAllMonth.Jul },
          { label: "Aug", value: weightProgressAllMonth.Aug },
          { label: "Sep", value: weightProgressAllMonth.Sep },
          { label: "Oct", value: weightProgressAllMonth.Oct },
          { label: "Nov", value: weightProgressAllMonth.Nov },
          { label: "Dec", value: weightProgressAllMonth.Dec },
        ];
      default:
        return [
          {
            value: weightProgress.Sunday,
            label: "Sun",
          },
          {
            value: weightProgress.Monday,
            label: "Mon",
          },
          {
            value: weightProgress.Tuesday,
            label: "Tue",
          },
          { value: weightProgress.Wednesday, label: "Wed" },
          {
            value: weightProgress.Thursday,
            label: "Thurs",
          },
          {
            value: weightProgress.Friday,
            label: "Fri",
          },
          {
            value: weightProgress.Saturday,
            label: "Sat",
          },
        ];
    }
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={[styles.containerStyle, { gap: 10 }]}>
        <Text style={styles.sectionTextStyle}>{item.title}</Text>
        <View style={styles.descriptionStyle}>
          <Heartbeat />
          <Text style={styles.descriptionTextStyle}>{item.des}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const RenderSectionHeader = (title) => {
    return (
      <View style={[styles.trainingContainerStyle, styles.sectionTitleStyle]}>
        <Text style={styles.sectionTextStyle}>{title}</Text>

        <Entypo
          name={"dots-three-vertical"}
          size={getFontSize(2.5)}
          color={colors.axisColor}
        />
      </View>
    );
  };

  const CustomMarkerLeft = ({ currentValue, customStyles }) => {
    return (
      <View style={[styles.customMarkerStyle, customStyles]}>
        <Text style={[styles.sliderTextStyle]}>{currentValue}</Text>
      </View>
    );
  };
  const CustomMarkerRight = ({ currentValue, customStyles }) => {
    return (
      <View style={[styles.targetMarkerContainer, customStyles]}>
        <Text style={styles.targetMarkerTextStyle}>
          {"Weight Goal: " + currentValue}
        </Text>
        <Image
          style={styles.targetMarker}
          source={require("../../assets/images/down-arrow.png")}
        />
      </View>
    );
  };

  const RenderDropdown = ({ value, section }) => {
    return (
      <SelectDropdown
        defaultValue={value}
        data={allTypes}
        onSelect={(value) => {
          onChangeDropDown(value, section);
        }}
        // defaultButtonText={defaultDropDownValue}
        buttonTextAfterSelection={(selectedItem, index) => {
          return (
            <Text
              style={{
                color: colors.black,
                fontSize: getFontSize(2),
                textAlign: "left",
              }}
            >
              {selectedItem}
            </Text>
          );
        }}
        buttonStyle={{
          width: getWidth(30),
          height: getHeight(4),
          marginVertical: getHeight(1),
          marginHorizontal: getWidth(2),
          backgroundColor: colors.white,
          color: colors.black,
          borderRadius: 5,
        }}
        buttonTextStyle={{
          color: colors.black,
          fontSize: getFontSize(2),
          fontFamily: "Ubuntu",
        }}
        renderDropdownIcon={(isOpened) => {
          return (
            <Entypo
              name={isOpened ? "chevron-thin-up" : "chevron-thin-down"}
              color={colors.black}
              size={getFontSize(2)}
            />
          );
        }}
        dropdownIconPosition={"right"}
        showsVerticalScrollIndicator={false}
        dropdownStyle={{
          backgroundColor: colors.white,
          height: getHeight(27),
        }}
        rowStyle={{
          backgroundColor: colors.white,
          borderBottomColor: "rgba(0, 0, 0, 0.1)",
        }}
        selectedRowTextStyle={{
          color: colors.buttonColor,
        }}
        rowTextStyle={{
          color: colors.black,
          fontSize: getFontSize(2),
          textAlign: "left",
          paddingLeft: getFontSize(1),
          fontFamily: "Ubuntu-bold",
        }}
      />
    );
  };

  const TopImage = React.memo(({ onPressBack }) => {
    return (
      <ImageBackground
        source={require("../../assets/images/home1.png")}
        style={styles.imageBgStyle}
        imageStyle={styles.imageStyle}
      >
        <TouchableOpacity onPress={onPressBack} style={styles.headerBtnStyle}>
          <Ionicons
            name="chevron-back"
            size={getFontSize(2.5)}
            color={colors.black}
          />
        </TouchableOpacity>
        <Text style={styles.statsFontStyle}>Stats</Text>
      </ImageBackground>
    );
  });
  const _TrainingCompletionComponent = React.memo(() => {
    return (
      <View>
        <View style={styles.trainingContainerStyle}>
          <Text style={styles.trainingFontStyle}>Training Completion</Text>
          <Ionicons
            name="settings"
            size={getFontSize(2.5)}
            color={colors.axisColor}
          />
        </View>
        <View style={styles.chartOuterContainer}>
          <View style={styles.headerTopContainer}>
            <View style={styles.headerTextStyle}>
              <Text style={styles.percentageStyle}>
                {trainingCompletionRate() + "%"}
              </Text>
              <Text style={styles.completionStyle}>Completion rate</Text>
            </View>
            <RenderDropdown value={tc_dropdown} section={"tc"} />
          </View>
          <BarChart
            frontColor={colors.orange}
            width={width - getWidth(30)}
            data={trainingCompletionData()}
            maxValue={100}
            dashGap={0}
            spacing={22}
            barBorderRadius={4}
            barWidth={30}
            stepValue={20}
            yAxisThickness={0}
            xAxisColor={colors.rulesColor}
            xAxisLabelTextStyle={{ color: colors.axisColor }}
            yAxisTextStyle={{ color: colors.axisColor }}
          />
        </View>
      </View>
    );
  });
  const _CaloriesBurnedComponent = React.memo(() => {
    return (
      <View>
        <View style={styles.trainingContainerStyle}>
          <Text style={styles.trainingFontStyle}>Calories Burned</Text>
          <Ionicons
            name="settings"
            size={getFontSize(2.5)}
            color={colors.axisColor}
          />
        </View>
        <View style={styles.chartOuterContainer}>
          <View style={styles.headerTopContainer}>
            <View style={styles.headerTextStyle}>
              <Text style={styles.percentageStyle}>{caloriesBurned}</Text>
              <Text style={styles.completionStyle}>Calories Burned</Text>
            </View>
            <RenderDropdown value={cb_dropdown} section={"cb"} />
          </View>
          <LineChart
            areaChart
            curved
            data={caloriesLineData()}
            width={width - getWidth(30)}
            spacing={getWidth(15)}
            initialSpacing={5}
            color={colors.orange}
            hideDataPoints
            startFillColor1={colors.orange}
            startOpacity={0.8}
            endOpacity={0.3}
            dashGap={0}
            thickness={2}
            rulesColor={colors.rulesColor}
            yAxisThickness={0}
            xAxisColor={colors.rulesColor}
            xAxisLabelTextStyle={{ color: colors.axisColor }}
            yAxisTextStyle={{ color: colors.axisColor }}
          />
        </View>
      </View>
    );
  });
  const _StrengthProgressComponent = React.memo(() => {
    return (
      <View>
        <View style={styles.trainingContainerStyle}>
          <Text style={styles.trainingFontStyle}>Strength Progress</Text>
          <Ionicons
            name="settings"
            size={getFontSize(2.5)}
            color={colors.axisColor}
          />
        </View>
        <Text style={styles.totalVolumeStyle}>
          {`Total Volume: ${Math.round(total_lbs)} lbs lifted`}
        </Text>
        <View style={styles.chartOuterContainer}>
          <View style={styles.headerTopContainer}>
            <View style={styles.headerTextStyle}>
              <Text style={styles.percentageStyle}>
                {Math.round(total_lbs)}
              </Text>
              <Text style={[styles.completionStyle, { fontSize: getWidth(3) }]}>
                Total lbs lifted
              </Text>
            </View>
            <RenderDropdown value={sp_dropdown} section={"sp"} />
          </View>
          <BarChart
            frontColor={colors.orange}
            data={strengthProgressData()}
            // maxValue={Math.round(total_lbs) > 10 ? Math.round(total_lbs) : 10}
            maxValue={100}
            dashGap={0}
            spacing={8}
            barBorderRadius={4}
            barWidth={30}
            width={width - getWidth(30)}
            yAxisThickness={0}
            xAxisColor={colors.rulesColor}
            xAxisLabelTextStyle={{ color: colors.axisColor }}
            yAxisTextStyle={{ color: colors.axisColor }}
          />
        </View>
      </View>
    );
  });

  const TopImageComponent = useMemo(() => {
    return <TopImage onPressBack={onPressBack} />;
  }, []);

  const TrainingCompletionComponent = useMemo(() => {
    return <_TrainingCompletionComponent />;
  }, [trainingCompletionData()]);

  const CaloriesBurnedComponent = useMemo(() => {
    return <_CaloriesBurnedComponent />;
  }, [caloriesLineData()]);

  const StrengthProgressComponent = useMemo(() => {
    return <_StrengthProgressComponent />;
  }, [strengthProgressData()]);

  return (
    <ScrollView>
      {/* <PopupModal isVisible={isModalVisible} toggleModal={toggleModal} /> */}
      {TopImageComponent}
      <View style={styles.innerContainerStyle}>
        {TrainingCompletionComponent}
        {CaloriesBurnedComponent}
        {StrengthProgressComponent}

        <View>
          <View style={styles.trainingContainerStyle}>
            <Text style={styles.trainingFontStyle}>Apple Stats</Text>
          </View>
          <Text style={styles.completionStyle}>

                  {selectedAppleStat === "steps"
                    ? "Total Steps"
                    : "Latest HRV (ms)"}
                </Text>
          <View style={styles.chartOuterContainer}>
            <View style={styles.headerTopContainer}>
              <View style={styles.headerTextStyle}>
                <Text style={[styles.percentageStyle,{fontSize:26}]}>
                  {appleStatsDataByRange(appleStatGraphData || [],appleStats_dropdown)?.total || "N/A"}
                </Text>
                
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Dropdown
                  style={[
                    styles.dropdown,
                    { marginRight: 10, width: getWidth(25) },
                  ]} // Adjust width as needed
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={{
                    fontSize: getFontSize(1.8), // Smaller text for selected item
                    color: colors.black,
                    fontFamily: fonts.WMe,
                  }}
                  itemTextStyle={{
                    fontSize: getFontSize(1.8), // Smaller text for all items in the dropdown
                    color: colors.black,
                    fontFamily: fonts.WMe,
                  }}
                  data={[
                    { label: "Steps", value: "steps" },
                    { label: "Heart Rate", value: "hr" },
                    { label: "Heart Rate Variability", value: "hrv" },
                    { label: "Resting Heart Rate", value: "rhr" },
                    { label: "Active energy burned", value: "aeb" },
                    { label: "Walking distance", value: "wd" },
                  ]}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder="Select stat"
                  value={selectedAppleStat}
                  onChange={(item) => handleAppleStatSelection(item.value)}
                />
                <RenderDropdown
                  value={appleStats_dropdown}
                  section={"appleStats"}
                />
              </View>
            </View>
            <LineChart
              areaChart
              curved
              data={appleStatsDataByRange(appleStatGraphData || [],appleStats_dropdown)?.data}
              width={width - getFontSize(20)}
              spacing={getFontSize(15)}
              initialSpacing={5}
              color={colors.orange}
              hideDataPoints
              startFillColor1={colors.orange}
              startOpacity={0.8}
              endOpacity={0.3}
              dashGap={0}
              thickness={2}
              rulesColor={colors.rulesColor}
              yAxisThickness={0}
              xAxisColor={colors.rulesColor}
              xAxisLabelTextStyle={{ color: colors.axisColor }}
              yAxisTextStyle={{ color: colors.axisColor }}
            />
          </View>
        </View>

        {/* New metrics */}
        {MetricsComponent}

        <View style={styles.weightContainer}>
          <Text style={styles.bodyTextStyle}>Bodyweight Goal</Text>
          <Text style={styles.lbsTextStyle}>Lbs</Text>
        </View>
        <View
          style={{
            height: 13,
            borderRadius: 10,
            marginVertical: 15,
            backgroundColor: colors.orange,
          }}
        >
          <CustomMarkerLeft
            customStyles={{
              position: "absolute",
              top: -6,
              left: calculatePercentage(user?.weight) + "%",
            }}
            currentValue={user?.weight}
          />
          <CustomMarkerRight
            customStyles={{
              position: "absolue",
              top: -33,
              left: calculatePercentage(user?.target_weight) + "%",
            }}
            currentValue={user?.target_weight}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("UpdateProfiles");
          }}
        >
          <Text style={styles.updateTextStyle}>Update Weight</Text>
        </TouchableOpacity>
      </View>
      {RenderSectionHeader("Apple Watch Stats")}
      {renderItem({ title: "Sleep", des: "Time in Bed: 7 Hrs 20 mins " })}
      {renderItem({ title: "Steps", des: "40,000 steps" })}

      {RenderSectionHeader("Personal Records")}

      {renderItem({
        title: "Deadlift Variations",
        des: `${maxLBS_DL} ${parameter_DL} max: ${exerciseName_DL} - ${
          exerciseDate_DL ? formatDate(exerciseDate_DL) : ""
        }`,
      })}
      {renderItem({
        title: "Squat Variation",
        des: `${maxLBS} ${parameter} max: ${exerciseName} - ${
          exerciseDate ? formatDate(exerciseDate) : ""
        }`,
      })}

      <View style={{ height: 100 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white, // or any background color you need
  },
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageBgStyle: {
    height: getHeight(35),
    padding: getWidth(8),
    justifyContent: "space-between",
    // Ensure image does not overlap with status bar
    paddingTop: Platform.OS === "ios" ? getHeight(8) : getHeight(5),
  },
  headerBtnStyle: {
    padding: getWidth(2),
    backgroundColor: colors.white,
    borderRadius: 12,
    width: getWidth(10),
    marginTop: Platform.OS === "ios" ? 0 : getHeight(2), // adjust margin for iOS and Android
  },
  statsFontStyle: {
    color: colors.white,
    fontSize: getFontSize(5.5),
    fontFamily: fonts.WB,
    textAlign: "center",
  },
  imageStyle: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  innerContainerStyle: {
    paddingHorizontal: getWidth(5),
    paddingVertical: getWidth(7),
  },
  trainingFontStyle: {
    color: colors.black,
    fontSize: getFontSize(4),
    fontFamily: fonts.WB,
  },
  trainingContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chartOuterContainer: {
    backgroundColor: colors.paleGray,
    borderRadius: 20,
    paddingVertical: getWidth(3),
    paddingHorizontal: getWidth(5),
    marginBottom: getWidth(4),
  },
  percentageStyle: {
    color: colors.black,
    fontSize: getFontSize(5),
    fontFamily: fonts.WB,
  },
  completionStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(1.7),
    fontFamily: fonts.WB,
    flex: 1,
  },
  headerTextStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidth(1.5),
    flex: 1,
  },
  calenderStyle: {
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(3),
    paddingVertical: getWidth(1.5),
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: getWidth(1.5),
  },
  headerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weekTextStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
  },
  totalVolumeStyle: {
    color: colors.black,
    fontSize: getFontSize(2.4),
    fontFamily: fonts.WMe,
    marginBottom: getWidth(1),
  },
  bodyTextStyle: {
    color: colors.black,
    fontSize: getFontSize(2),
    fontFamily: fonts.WB,
    // Move the text up by 10 pixels (adjust as needed)
    marginBottom: 20, // Reduce bottom margin
    // Alternatively, use position
    // position: 'relative',
    // top: -10,  // Moves it 10 pixels up
  },
  lbsTextStyle: {
    color: colors.grayText1,
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
  },
  weightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTextStyle: {
    color: colors.black,
    fontSize: getFontSize(2.3),
    fontFamily: fonts.WB,
  },
  containerStyle: {
    backgroundColor: colors.paleGray,
    padding: getWidth(4),
    borderRadius: 32,
    marginBottom: getWidth(3),
    marginHorizontal: getWidth(5),
  },
  descriptionStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidth(2),
  },
  sectionTitleStyle: {
    marginBottom: getWidth(2.5),
    paddingHorizontal: getWidth(5),
    paddingVertical: getWidth(2),
  },
  descriptionTextStyle: {
    color: colors.grayText,
    fontSize: getFontSize(1.7),
    fontFamily: fonts.WMe,
  },
  updateTextStyle: {
    color: colors.orange,
    fontSize: getFontSize(1.7),
    fontFamily: fonts.WMe,
    textAlign: "right",
    marginTop: getWidth(2),
    textDecorationLine: "underline",
  },
  dropdown: {
    height: getHeight(4),
    borderRadius: 16,
    paddingHorizontal: getWidth(3),
    backgroundColor: colors.white,
    width: getWidth(20),
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: getFontSize(1.5),
    color: colors.black,
    fontFamily: fonts.WMe,
    marginLeft: getWidth(1),
  },
  selectedTextStyle: {
    fontSize: getFontSize(1.5),
    color: colors.black,
    fontFamily: fonts.WMe,
    marginLeft: getWidth(1),
  },
  iconStyle: {
    width: getWidth(2),
    height: getHeight(2),
  },
  sliderStyle: {
    height: getHeight(2),
    borderRadius: 20,
    backgroundColor: colors.orange,
  },
  customMarkerStyle: {
    paddingHorizontal: getWidth(2.5),
    height: 27,
    width: getWidth(12),
    backgroundColor: colors.green,
    borderRadius: 3,
    // marginTop: getHeight(2),
    borderWidth: 4,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  targetMarkerContainer: {
    width: getWidth(10),
  },
  targetMarker: {
    height: getHeight(2),
    width: getWidth(5),
    alignSelf: "center",
    marginBottom: 34,
  },
  targetMarkerTextStyle: {
    textAlign: "center",
    fontSize: getFontSize(1),
    color: colors.black,
    fontFamily: fonts.WB,
  },
  sliderTextStyle: {
    fontSize: getFontSize(1.3),
    color: colors.white,
    fontFamily: fonts.WB,
  },
});