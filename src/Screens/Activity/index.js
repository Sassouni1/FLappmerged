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
import moment from 'moment-timezone';

// Remove static userCurrentDate - make it dynamic
const defaultDropDownValue = "Last 7 Days";
export default function TrainingStats({ navigation }) {
  const [appleStatGraphData, setAppleStatGraphData] = useState([]);
  const [selectedAppleStat, setSelectedAppleStat] = useState("steps");
  const [appleStatsDataList,setAppleStatsDataList] = useState([]);
  const [appleStats_dropdown, set_appleStats_dropdown] =
    useState("Last 7 Days");
  const dispatch = useDispatch();
  const [totalWorkoutDays, setTotalWorkoutDays] = useState(0);
  const [date, setDate] = useState(new Date());
  const { height, width } = Dimensions.get("window");
  const [isModalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.auth.userData);
  const userTimezone = useSelector((state) => state.auth.userTimezone || 'UTC');

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
    if(Platform.OS==="ios"){
    requestPermissionsAndFetchData();
    }
  }, []);

  function addCommasToNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

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
      if (user?.showGuestUserPopup == true && user.isGuestUser == true && user?.hasCombatKettlebell != true && user?.hasBuildDifferent !=true) setModalVisible(true);
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
      
      // Use new analytics APIs for initial load
      getTrainingCompletionV2("weekly", setWeeklyProgress);
      getCaloriesProgress("weekly", setCaloriesProgress, true);
      getStrengthProgressV2("weekly", setWeightProgress);
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
    Week5: 0,
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
    Week5: 0
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

  // Separate dropdown options - Training Completion keeps Today, Strength Progress removes it
  const [trainingCompletionTypes] = useState([
    "Today",
    "Last 7 Days",
    "This Month",
    "Last 3 Months",
    "Last 6 Months",
    "All Time",
  ]);

  const [strengthProgressTypes] = useState([
    // "Today", // Removed Today from Strength Progress as requested
    "Last 7 Days",
    "This Month",
    "Last 3 Months",
    "Last 6 Months",
    "All Time",
  ]);

  const [allTypes, setAllTypes] = useState([
    "Today", // Keep for Calories Burned and other sections
    "Last 7 Days",
    "This Month",
    "Last 3 Months",
    "Last 6 Months",
    "All Time",
  ]);

  const [assigWorkout, setAssigWorkout] = useState([]);
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
  // Enhanced function for training completion using new analytics APIs
  const getTrainingCompletionV2 = async (timePeriod, setProgressFunction) => {
    const periodMap = {
      today: 'today',
      weekly: 'last7days',
      monthly: 'thismonth',
      threeMonth: 'last3months',
      sixMonth: 'last6months',
      allMonths: 'alltime',
    };

    const period = periodMap[timePeriod];
    if (!period) {
      console.log('Invalid time period for training completion:', timePeriod);
      return;
    }

    try {
      const res = await ApiCall({
        route: `assignProgram/training-completion/${user?.user_id}/${period}?timezone=${encodeURIComponent(userTimezone)}`,
        verb: "get",
        token: token,
      });

      console.log(`=== NEW TRAINING COMPLETION API RESPONSE ===`);
      console.log(`response of getTrainingCompletion${period}:`, res?.response?.data);
      console.log(`API Status:`, res?.status);

      if (res?.status == 200 && res?.response?.data && !res?.response?.error) {
        const data = res.response.data;
        
        try {
          // Ensure data is valid object
          if (!data || typeof data !== 'object') {
            console.log('Invalid training completion data received:', data);
            setProgressFunction({});
            return;
          }
          
          if (period === 'last7days' && data.trainingCompletionData && Array.isArray(data.trainingCompletionData)) {
            // Convert to the format expected by existing UI
            const weeklyData = {
              Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0,
              Thursday: 0, Friday: 0, Saturday: 0
            };
            
            data.trainingCompletionData.forEach(day => {
              if (day && day.label && typeof day.value === 'number' && !isNaN(day.value)) {
                const dayName = getDayNameFromLabel(day.label);
                if (dayName && weeklyData.hasOwnProperty(dayName)) {
                  weeklyData[dayName] = Math.max(0, Math.min(100, day.value)); // Clamp between 0-100
                }
              }
            });
            console.log('Setting training completion weekly data:', weeklyData);
            setProgressFunction(weeklyData);
          } else if (period === 'today') {
            // For today, show just today's data
            const completionValue = (typeof data.completionPercentage === 'number' && !isNaN(data.completionPercentage)) ? data.completionPercentage : 0;
            const todayData = {
              [getDayName(new Date())]: completionValue
            };
            setProgressFunction(todayData);
          } else {
            // For other periods, typically no chart data available
            console.log(`Period ${period}: No training completion chart data available`);
            setProgressFunction({
              Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0,
              Thursday: 0, Friday: 0, Saturday: 0
            });
          }
        } catch (dataProcessingError) {
          console.log(`Error processing training completion data:`, dataProcessingError);
          setProgressFunction({
            Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0,
            Thursday: 0, Friday: 0, Saturday: 0
          });
        }
        
        dispatch(setLoader(false));
      } else {
        console.log(`Error in new training completion API:`, res);
        // Fallback to old API
        getExerciseProgress(timePeriod, setProgressFunction, timePeriod === 'weekly');
      }
    } catch (e) {
      console.log(`New training completion API error:`, e.toString());
      // Fallback to old API
      getExerciseProgress(timePeriod, setProgressFunction, timePeriod === 'weekly');
    }
  };

  // Helper function to convert chart labels to day names
  const getDayNameFromLabel = (label) => {
    const labelMap = {
      'Sun': 'Sunday',
      'Mon': 'Monday',
      'Tue': 'Tuesday',
      'Wed': 'Wednesday',
      'Thurs': 'Thursday',
      'Fri': 'Friday',
      'Sat': 'Saturday'
    };
    return labelMap[label] || label;
  };

  const getExerciseProgress = async (
    timePeriod,
    setProgressFunction,
    isPost = false
  ) => {
    // Generate fresh current date for each API call
    const userCurrentDate = new Date().toISOString();
    
    const routes = {
      weekly: `assignProgram/user_progress/${user?.user_id}/${userCurrentDate}`,
      monthly: `assignProgram/monthly_progress/${user?.user_id}/${userCurrentDate}`,
      threeMonth: `assignProgram/last_three_months_progress/${user?.user_id}/${userCurrentDate}`,
      sixMonth: `assignProgram/last_six_months_progress/${user?.user_id}/${userCurrentDate}`,
      allMonths: `assignProgram/all_months_progress/${user?.user_id}/${userCurrentDate}`,
    };

    try {
      const res = await ApiCall({
        route: routes[timePeriod],
        verb: isPost ? "post" : "get",
        token: token,
        ...(isPost && { params: { givenDate: new Date() } }), // Include params if it's a POST request
      });

      if (res?.status == "200") {
        setTotalWorkoutDays(res?.response?.totalWorkoutDays || 0)
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

  // Enhanced function that uses new analytics APIs
  const getStrengthProgressV2 = async (timePeriod, setProgressFunction) => {
    const periodMap = {
      today: 'today',
      weekly: 'last7days',
      monthly: 'thismonth',
      threeMonth: 'last3months',
      sixMonth: 'last6months',
      allMonths: 'alltime',
    };

    const period = periodMap[timePeriod];
    if (!period) {
      console.log('Invalid time period for new analytics:', timePeriod);
      return;
    }

    try {
      const res = await ApiCall({
        route: `assignProgram/strength-progress/${user?.user_id}/${period}?timezone=${encodeURIComponent(userTimezone)}`,
        verb: "get",
        token: token,
      });

      console.log(`=== NEW ANALYTICS API RESPONSE ===`);
      console.log(`response of getStrengthProgress${period}:`, res?.response?.data);
      console.log(`API Status:`, res?.status);

      if (res?.status == 200 && res?.response?.data && !res?.response?.error) {
        const data = res.response.data;
        
        try {
          // Ensure data is valid object
          if (!data || typeof data !== 'object') {
            console.log('Invalid data received:', data);
            setProgressFunction({});
            setTotal_lbs(0);
            return;
          }
          
          // Safely extract totalWeight with validation
          const totalWeight = (typeof data.totalWeight === 'number' && !isNaN(data.totalWeight)) ? data.totalWeight : 0;
          const total_lbs = (typeof data.total_lbs === 'number' && !isNaN(data.total_lbs)) ? data.total_lbs : totalWeight;
          
          if (period === 'last7days') {
            // Use the weeklyWeight format for compatibility
            if (data.weeklyWeight && typeof data.weeklyWeight === 'object') {
              // Validate weeklyWeight data
              const validWeeklyWeight = {};
              Object.keys(data.weeklyWeight).forEach(day => {
                const value = data.weeklyWeight[day];
                validWeeklyWeight[day] = (typeof value === 'number' && !isNaN(value)) ? value : 0;
              });
              console.log(`Setting strength progress data:`, validWeeklyWeight);
              setProgressFunction(validWeeklyWeight);
              setTotal_lbs(total_lbs);
            } else {
              // Fallback if weeklyWeight is missing
              console.log('weeklyWeight missing, using fallback');
              setProgressFunction({
                Sunday: 0, Monday: 0, Tuesday: 0, Wednesday: 0,
                Thursday: 0, Friday: 0, Saturday: 0
              });
              setTotal_lbs(totalWeight);
            }
          } else if (period === 'today') {
            // For today, show just today's data
            const todayData = {
              [getDayName(new Date())]: totalWeight
            };
            setProgressFunction(todayData);
            setTotal_lbs(totalWeight);
          } else {
            // For other periods (thismonth, last3months, etc.), handle safely
            setTotal_lbs(totalWeight);
            
            // For longer periods, typically no chart data is available
            // Just set empty chart data and show total weight
            console.log(`Period ${period}: No chart data, showing total weight: ${totalWeight}`);
            setProgressFunction({});
          }
        } catch (dataProcessingError) {
          console.log(`Error processing strength data:`, dataProcessingError);
          setProgressFunction({});
          setTotal_lbs(0);
        }
        
        dispatch(setLoader(false));
      } else {
        console.log(`Error in new strength progress API:`, res);
        // Fallback to old API
        getWeightProgress(timePeriod, setProgressFunction);
      }
    } catch (e) {
      console.log(`New strength progress API error:`, e.toString());
      // Fallback to old API
      getWeightProgress(timePeriod, setProgressFunction);
    }
  };

  // Helper function to get day name
  const getDayName = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
  };

  const getWeightProgress = async (timePeriod, setProgressFunction) => {
    // Generate fresh current date for each API call
    const userCurrentDate = new Date().toISOString();
    
    const routes = {
      weekly: `assignProgram/weeklyWeight/${user?.plan_id}/${userCurrentDate}`,
      monthly: `assignProgram/monthlyWeight/${user?.plan_id}/${userCurrentDate}`,
      threeMonth: `assignProgram/lastThreeMonthWeight/${user?.plan_id}/${userCurrentDate}`,
      sixMonth: `assignProgram/lastSixMonthWeight/${user?.plan_id}/${userCurrentDate}`,
      allMonths: `assignProgram/allMonthsWeight/${user?.plan_id}/${userCurrentDate}`,
    };

    try {
      const res = await ApiCall({
        route: routes[timePeriod],
        verb: "get",
        token: token,
      });

      console.log(`=== FRONTEND API RESPONSE ===`);
      console.log(`response of getWeight${timePeriod}Progress`, res?.response);
      console.log(`API Status:`, res?.status);
      console.log(`Raw response:`, res);

      if (res?.status == "200") {
        const weightData = res?.response?.monthlyWeight || res?.response?.weeklyWeight;
        console.log(`Setting weight progress data:`, weightData);
        
        if (weightData && typeof weightData === 'object') {
          console.log(`Weight data keys:`, Object.keys(weightData));
          console.log(`Weight data values:`, Object.values(weightData));
          setProgressFunction(weightData);
        } else {
          console.log('Weight data is undefined or not an object:', weightData);
          setProgressFunction({});
        }
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
      "Today": "today", // Keep for Training Completion
      "Last 7 Days": "weekly",
      "This Month": "monthly",
      "Last 3 Months": "threeMonth",
      "Last 6 Months": "sixMonth",
      "All Time": "allMonths",
    };

    // Enhanced section map with new analytics functions
    const sectionMap = {
      tc: {
        v2: getTrainingCompletionV2,
        v1: getExerciseProgress
      },
      cb: {
        v2: getCaloriesProgress,  // Keep existing for now
        v1: getCaloriesProgress
      },
      sp: {
        v2: getStrengthProgressV2,
        v1: getWeightProgress
      },
    };

    const setProgressMap = {
      tc: {
        today: setWeeklyProgress,  // Use weekly state for today's data
        weekly: setWeeklyProgress,
        monthly: setMonthlyProgress,
        threeMonth: setProgressThreeMonth,
        sixMonth: setProgressSixMonth,
        allMonths: setYearProgress,
      },
      cb: {
        today: setCaloriesProgress,  // Use weekly state for today's data
        weekly: setCaloriesProgress,
        monthly: setMonthlyCaloriesProgess,
        threeMonth: setCaloriesProgressThreeMonth,
        sixMonth: setCaloriesProgressSixMonth,
        allMonths: setCaloriesProgressAllMonth,
      },
      sp: {
        today: setWeightProgress,  // Use weekly state for today's data
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
      
      // Use V2 (new analytics) APIs for training completion and strength progress
      const useV2API = (section === 'tc' || section === 'sp');
      const apiFunction = useV2API ? sectionMap[section].v2 : sectionMap[section].v1;
      
      if (useV2API) {
        // Call the new analytics API
        apiFunction(progressType, setProgress);
      } else {
        // Call the old API
        const isPost = selectedType === "Last 7 Days"; // Weekly requires POST request
        apiFunction(progressType, setProgress, isPost);
      }
    } else {
      console.log("No valid type or section selected");
      dispatch(setLoader(false));
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
      let length = totalWorkoutDays > 0 ? totalWorkoutDays : data?.length;
      data.forEach((element) => {
        total = total + element.value;
      });
      completionRate = (total / (100 * length)) * 100;
    }
    return Math.round(completionRate);
  };

  const trainingCompletionData = () => {
    try {
      switch (tc_dropdown) {
        case "Today":
          const todayDayName = getDayName(new Date());
          return [
            { value: weeklyProgress[todayDayName] || 0, label: "Today" }
          ];
        case "Last 7 Days":
        const days = [
          { value: (typeof weeklyProgress.Sunday === 'number' && !isNaN(weeklyProgress.Sunday)) ? weeklyProgress.Sunday : 0, label: "Sun" },
          { value: (typeof weeklyProgress.Monday === 'number' && !isNaN(weeklyProgress.Monday)) ? weeklyProgress.Monday : 0, label: "Mon" },
          { value: (typeof weeklyProgress.Tuesday === 'number' && !isNaN(weeklyProgress.Tuesday)) ? weeklyProgress.Tuesday : 0, label: "Tue" },
          { value: (typeof weeklyProgress.Wednesday === 'number' && !isNaN(weeklyProgress.Wednesday)) ? weeklyProgress.Wednesday : 0, label: "Wed" },
          { value: (typeof weeklyProgress.Thursday === 'number' && !isNaN(weeklyProgress.Thursday)) ? weeklyProgress.Thursday : 0, label: "Thurs" },
          { value: (typeof weeklyProgress.Friday === 'number' && !isNaN(weeklyProgress.Friday)) ? weeklyProgress.Friday : 0, label: "Fri" },
          { value: (typeof weeklyProgress.Saturday === 'number' && !isNaN(weeklyProgress.Saturday)) ? weeklyProgress.Saturday : 0, label: "Sat" },
        ];

        // Get the current day as an index based on user's timezone (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const currentDayIndex = moment.tz(userTimezone).day();

        // Reorder the array to place the current day at the end
        const reorderedDays = [
          ...days.slice(currentDayIndex + 1), // Days after the current day
          ...days.slice(0, currentDayIndex), // Days before the current day
          days[currentDayIndex], // Current day at the end
        ];

        return reorderedDays;
      case "This Month":
        return [
          {
            value: (typeof monthlyProgress?.Week1 === 'number' && !isNaN(monthlyProgress.Week1)) ? monthlyProgress.Week1 : 0,
            label: "Week1",
          },
          {
            value: (typeof monthlyProgress?.Week2 === 'number' && !isNaN(monthlyProgress.Week2)) ? monthlyProgress.Week2 : 0,
            label: "Week2",
          },
          {
            value: (typeof monthlyProgress?.Week3 === 'number' && !isNaN(monthlyProgress.Week3)) ? monthlyProgress.Week3 : 0,
            label: "Week3",
          },
          {
            value: (typeof monthlyProgress?.Week4 === 'number' && !isNaN(monthlyProgress.Week4)) ? monthlyProgress.Week4 : 0,
            label: "Week4",
          },
          {
            value: (typeof monthlyProgress?.Week5 === 'number' && !isNaN(monthlyProgress.Week5)) ? monthlyProgress.Week5 : 0,
            label: "Week5",
          },
        ];
      case "Last 3 Months":
        return [
          {
            value: (typeof percentageOfThreeMonthProgress?.[0] === 'number' && !isNaN(percentageOfThreeMonthProgress[0])) ? percentageOfThreeMonthProgress[0] : 0,
            label: monthNameOfThreeMonthProgress?.[0] || "Month1",
          },
          {
            value: (typeof percentageOfThreeMonthProgress?.[1] === 'number' && !isNaN(percentageOfThreeMonthProgress[1])) ? percentageOfThreeMonthProgress[1] : 0,
            label: monthNameOfThreeMonthProgress?.[1] || "Month2",
          },
          {
            value: (typeof percentageOfThreeMonthProgress?.[2] === 'number' && !isNaN(percentageOfThreeMonthProgress[2])) ? percentageOfThreeMonthProgress[2] : 0,
            label: monthNameOfThreeMonthProgress?.[2] || "Month3",
          },
        ];
      case "Last 6 Months":
        return [
          {
            value: (typeof percentageOfSixMonthProgress?.[0] === 'number' && !isNaN(percentageOfSixMonthProgress[0])) ? percentageOfSixMonthProgress[0] : 0,
            label: monthNameOfSixMonthProgress?.[0] || "Month1",
          },
          {
            value: (typeof percentageOfSixMonthProgress?.[1] === 'number' && !isNaN(percentageOfSixMonthProgress[1])) ? percentageOfSixMonthProgress[1] : 0,
            label: monthNameOfSixMonthProgress?.[1] || "Month2",
          },
          {
            value: (typeof percentageOfSixMonthProgress?.[2] === 'number' && !isNaN(percentageOfSixMonthProgress[2])) ? percentageOfSixMonthProgress[2] : 0,
            label: monthNameOfSixMonthProgress?.[2] || "Month3",
          },
          {
            value: (typeof percentageOfSixMonthProgress?.[3] === 'number' && !isNaN(percentageOfSixMonthProgress[3])) ? percentageOfSixMonthProgress[3] : 0,
            label: monthNameOfSixMonthProgress?.[3] || "Month4",
          },
          {
            value: (typeof percentageOfSixMonthProgress?.[4] === 'number' && !isNaN(percentageOfSixMonthProgress[4])) ? percentageOfSixMonthProgress[4] : 0,
            label: monthNameOfSixMonthProgress?.[4] || "Month5",
          },
          {
            value: (typeof percentageOfSixMonthProgress?.[5] === 'number' && !isNaN(percentageOfSixMonthProgress[5])) ? percentageOfSixMonthProgress[5] : 0,
            label: monthNameOfSixMonthProgress?.[5] || "Month6",
          },
        ];
      case "All Time":
        return [
          { label: "Jan", value: (typeof yearProgress?.Jan === 'number' && !isNaN(yearProgress.Jan)) ? yearProgress.Jan : 0 },
          { label: "Feb", value: (typeof yearProgress?.Feb === 'number' && !isNaN(yearProgress.Feb)) ? yearProgress.Feb : 0 },
          { label: "Mar", value: (typeof yearProgress?.Mar === 'number' && !isNaN(yearProgress.Mar)) ? yearProgress.Mar : 0 },
          { label: "Apr", value: (typeof yearProgress?.Apr === 'number' && !isNaN(yearProgress.Apr)) ? yearProgress.Apr : 0 },
          { label: "May", value: (typeof yearProgress?.May === 'number' && !isNaN(yearProgress.May)) ? yearProgress.May : 0 },
          { label: "Jun", value: (typeof yearProgress?.Jun === 'number' && !isNaN(yearProgress.Jun)) ? yearProgress.Jun : 0 },
          { label: "Jul", value: (typeof yearProgress?.Jul === 'number' && !isNaN(yearProgress.Jul)) ? yearProgress.Jul : 0 },
          { label: "Aug", value: (typeof yearProgress?.Aug === 'number' && !isNaN(yearProgress.Aug)) ? yearProgress.Aug : 0 },
          { label: "Sep", value: (typeof yearProgress?.Sep === 'number' && !isNaN(yearProgress.Sep)) ? yearProgress.Sep : 0 },
          { label: "Oct", value: (typeof yearProgress?.Oct === 'number' && !isNaN(yearProgress.Oct)) ? yearProgress.Oct : 0 },
          { label: "Nov", value: (typeof yearProgress?.Nov === 'number' && !isNaN(yearProgress.Nov)) ? yearProgress.Nov : 0 },
          { label: "Dec", value: (typeof yearProgress?.Dec === 'number' && !isNaN(yearProgress.Dec)) ? yearProgress.Dec : 0 },
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
    } catch (error) {
      console.log('Error in trainingCompletionData:', error);
      return [
        { value: 0, label: "Sun" },
        { value: 0, label: "Mon" },
        { value: 0, label: "Tue" },
        { value: 0, label: "Wed" },
        { value: 0, label: "Thurs" },
        { value: 0, label: "Fri" },
        { value: 0, label: "Sat" },
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
    try {
      switch (sp_dropdown) {
        // case "Today": // Commented out since Today is removed from dropdown
        //   const todayDayName = getDayName(new Date());
        //   return [
        //     { value: weightProgress[todayDayName] || 0, label: "Today" }
        //   ];
        case "Last 7 Days":
        const days = [
          { value: (typeof weightProgress.Sunday === 'number' && !isNaN(weightProgress.Sunday)) ? weightProgress.Sunday : 0, label: "Sun" },
          { value: (typeof weightProgress.Monday === 'number' && !isNaN(weightProgress.Monday)) ? weightProgress.Monday : 0, label: "Mon" },
          { value: (typeof weightProgress.Tuesday === 'number' && !isNaN(weightProgress.Tuesday)) ? weightProgress.Tuesday : 0, label: "Tue" },
          { value: (typeof weightProgress.Wednesday === 'number' && !isNaN(weightProgress.Wednesday)) ? weightProgress.Wednesday : 0, label: "Wed" },
          { value: (typeof weightProgress.Thursday === 'number' && !isNaN(weightProgress.Thursday)) ? weightProgress.Thursday : 0, label: "Thurs" },
          { value: (typeof weightProgress.Friday === 'number' && !isNaN(weightProgress.Friday)) ? weightProgress.Friday : 0, label: "Fri" },
          { value: (typeof weightProgress.Saturday === 'number' && !isNaN(weightProgress.Saturday)) ? weightProgress.Saturday : 0, label: "Sat" },
        ];
        console.log('strengthProgressData for Last 7 Days:', days);

        // Get the current day as an index based on user's timezone (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const currentDayIndex = moment.tz(userTimezone).day();

        // Reorder the array to place the current day at the end
        const reorderedDays = [
          ...days.slice(currentDayIndex + 1), // Days after the current day
          ...days.slice(0, currentDayIndex), // Days before the current day
          days[currentDayIndex], // Current day at the end
        ];

        return reorderedDays;
      case "This Month":
        return [
          { value: (typeof monthlyWeightProgress?.Week1 === 'number' && !isNaN(monthlyWeightProgress.Week1)) ? monthlyWeightProgress.Week1 : 0, label: "Week1" },
          { value: (typeof monthlyWeightProgress?.Week2 === 'number' && !isNaN(monthlyWeightProgress.Week2)) ? monthlyWeightProgress.Week2 : 0, label: "Week2" },
          { value: (typeof monthlyWeightProgress?.Week3 === 'number' && !isNaN(monthlyWeightProgress.Week3)) ? monthlyWeightProgress.Week3 : 0, label: "Week3" },
          { value: (typeof monthlyWeightProgress?.Week4 === 'number' && !isNaN(monthlyWeightProgress.Week4)) ? monthlyWeightProgress.Week4 : 0, label: "Week4" },
          { value: (typeof monthlyWeightProgress?.Week5 === 'number' && !isNaN(monthlyWeightProgress.Week5)) ? monthlyWeightProgress.Week5 : 0, label: "Week5" },
        ];
      case "Last 3 Months":
        return [
          {
            value: (typeof percentageOfThreeMonthWeight?.[0] === 'number' && !isNaN(percentageOfThreeMonthWeight[0])) ? percentageOfThreeMonthWeight[0] : 0,
            label: monthNameOfThreeMonthWeight?.[0] || "Month1",
          },
          {
            value: (typeof percentageOfThreeMonthWeight?.[1] === 'number' && !isNaN(percentageOfThreeMonthWeight[1])) ? percentageOfThreeMonthWeight[1] : 0,
            label: monthNameOfThreeMonthWeight?.[1] || "Month2",
          },
          {
            value: (typeof percentageOfThreeMonthWeight?.[2] === 'number' && !isNaN(percentageOfThreeMonthWeight[2])) ? percentageOfThreeMonthWeight[2] : 0,
            label: monthNameOfThreeMonthWeight?.[2] || "Month3",
          },
        ];
      case "Last 6 Months":
        return [
          {
            value: (typeof percentageOfSixMonthWeight?.[0] === 'number' && !isNaN(percentageOfSixMonthWeight[0])) ? percentageOfSixMonthWeight[0] : 0,
            label: monthNameOfSixMonthWeight?.[0] || "Month1",
          },
          {
            value: (typeof percentageOfSixMonthWeight?.[1] === 'number' && !isNaN(percentageOfSixMonthWeight[1])) ? percentageOfSixMonthWeight[1] : 0,
            label: monthNameOfSixMonthWeight?.[1] || "Month2",
          },
          {
            value: (typeof percentageOfSixMonthWeight?.[2] === 'number' && !isNaN(percentageOfSixMonthWeight[2])) ? percentageOfSixMonthWeight[2] : 0,
            label: monthNameOfSixMonthWeight?.[2] || "Month3",
          },
          {
            value: (typeof percentageOfSixMonthWeight?.[3] === 'number' && !isNaN(percentageOfSixMonthWeight[3])) ? percentageOfSixMonthWeight[3] : 0,
            label: monthNameOfSixMonthWeight?.[3] || "Month4",
          },
          {
            value: (typeof percentageOfSixMonthWeight?.[4] === 'number' && !isNaN(percentageOfSixMonthWeight[4])) ? percentageOfSixMonthWeight[4] : 0,
            label: monthNameOfSixMonthWeight?.[4] || "Month5",
          },
          {
            value: (typeof percentageOfSixMonthWeight?.[5] === 'number' && !isNaN(percentageOfSixMonthWeight[5])) ? percentageOfSixMonthWeight[5] : 0,
            label: monthNameOfSixMonthWeight?.[5] || "Month6",
          },
        ];
      case "All Time":
        return [
          { label: "Jan", value: (typeof weightProgressAllMonth?.Jan === 'number' && !isNaN(weightProgressAllMonth.Jan)) ? weightProgressAllMonth.Jan : 0 },
          { label: "Feb", value: (typeof weightProgressAllMonth?.Feb === 'number' && !isNaN(weightProgressAllMonth.Feb)) ? weightProgressAllMonth.Feb : 0 },
          { label: "Mar", value: (typeof weightProgressAllMonth?.Mar === 'number' && !isNaN(weightProgressAllMonth.Mar)) ? weightProgressAllMonth.Mar : 0 },
          { label: "Apr", value: (typeof weightProgressAllMonth?.Apr === 'number' && !isNaN(weightProgressAllMonth.Apr)) ? weightProgressAllMonth.Apr : 0 },
          { label: "May", value: (typeof weightProgressAllMonth?.May === 'number' && !isNaN(weightProgressAllMonth.May)) ? weightProgressAllMonth.May : 0 },
          { label: "Jun", value: (typeof weightProgressAllMonth?.Jun === 'number' && !isNaN(weightProgressAllMonth.Jun)) ? weightProgressAllMonth.Jun : 0 },
          { label: "Jul", value: (typeof weightProgressAllMonth?.Jul === 'number' && !isNaN(weightProgressAllMonth.Jul)) ? weightProgressAllMonth.Jul : 0 },
          { label: "Aug", value: (typeof weightProgressAllMonth?.Aug === 'number' && !isNaN(weightProgressAllMonth.Aug)) ? weightProgressAllMonth.Aug : 0 },
          { label: "Sep", value: (typeof weightProgressAllMonth?.Sep === 'number' && !isNaN(weightProgressAllMonth.Sep)) ? weightProgressAllMonth.Sep : 0 },
          { label: "Oct", value: (typeof weightProgressAllMonth?.Oct === 'number' && !isNaN(weightProgressAllMonth.Oct)) ? weightProgressAllMonth.Oct : 0 },
          { label: "Nov", value: (typeof weightProgressAllMonth?.Nov === 'number' && !isNaN(weightProgressAllMonth.Nov)) ? weightProgressAllMonth.Nov : 0 },
          { label: "Dec", value: (typeof weightProgressAllMonth?.Dec === 'number' && !isNaN(weightProgressAllMonth.Dec)) ? weightProgressAllMonth.Dec : 0 },
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
    } catch (error) {
      console.log('Error in strengthProgressData:', error);
      return [
        { value: 0, label: "Sun" },
        { value: 0, label: "Mon" },
        { value: 0, label: "Tue" },
        { value: 0, label: "Wed" },
        { value: 0, label: "Thurs" },
        { value: 0, label: "Fri" },
        { value: 0, label: "Sat" },
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
    // Use different dropdown options based on section
    const getDropdownData = () => {
      if (section === 'sp') {
        return strengthProgressTypes; // Strength Progress without Today
      } else if (section === 'tc') {
        return trainingCompletionTypes; // Training Completion with Today
      } else {
        return allTypes; // Default for other sections
      }
    };

    return (
      <SelectDropdown
        defaultValue={value}
        data={getDropdownData()}
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
          {/* <Ionicons
            name="settings"
            size={getFontSize(2.5)}
            color={colors.axisColor}
          /> */}
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
          {/* <Ionicons
            name="settings"
            size={getFontSize(2.5)}
            color={colors.axisColor}
          /> */}
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
          {/* <Ionicons
            name="settings"
            size={getFontSize(2.5)}
            color={colors.axisColor}
          /> */}
        </View>
        <Text style={styles.totalVolumeStyle}>
          {`Total Volume: ${addCommasToNumber(Math.round(total_lbs) || 0)} lbs lifted`}
        </Text>
        <View style={styles.chartOuterContainer}>
          <View style={styles.headerTopContainer}>
            <View style={{marginBottom:5}}>
              <Text style={[styles.percentageStyle,{fontSize:24}]}>
                {addCommasToNumber(Math.round(total_lbs) || 0)}
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
            maxValue={Math.max(...(strengthProgressData().map(item => {
              const value = (typeof item?.value === 'number' && !isNaN(item.value)) ? item.value : 0;
              return Math.max(value, 0);
            })), 1000)}
            dashGap={0}
            spacing={8}
            barBorderRadius={4}
            barWidth={30}
            width={width - getWidth(30)}
            yAxisThickness={0}
            xAxisColor={colors.rulesColor}
            xAxisLabelTextStyle={{ color: colors.axisColor }}
            yAxisTextStyle={{ color: colors.axisColor }}
            formatYLabel={(value) => {
              if (value >= 1000) {
                return (value / 1000).toFixed(1) + 'K';
              }
              return value.toString();
            }}
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
      <PopupModal isVisible={isModalVisible} toggleModal={toggleModal} />
      {TopImageComponent}
      <View style={styles.innerContainerStyle}>
        {TrainingCompletionComponent}
        {/* {CaloriesBurnedComponent} */}
        {StrengthProgressComponent}

        {Platform.OS === "ios" &&
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
                  <Text style={[styles.percentageStyle, { fontSize: getFontSize(4) }]}>
                    {appleStatsDataByRange(appleStatGraphData || [], appleStats_dropdown)?.total || "N/A"}
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
                data={appleStatsDataByRange(appleStatGraphData || [], appleStats_dropdown)?.data}
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
        }

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

      {/* {RenderSectionHeader("Personal Records")}

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
      })} */}

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

