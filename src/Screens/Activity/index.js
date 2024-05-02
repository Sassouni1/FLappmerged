import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import Entypo from "react-native-vector-icons/Entypo";
import { getHeight, getWidth, getFontSize } from "../../../utils/ResponsiveFun";
import { Ellipse } from "../../assets/images";
import { styles } from "./styles";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import HeaderBottom from "../../Components/HeaderBottom";
import ReactNativeCalendarStrip from "react-native-calendar-strip";
import { ApiCall } from "../../Services/Apis";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/actions/GernalActions";
import { LineChart } from "react-native-chart-kit";
import SelectDropdown from "react-native-select-dropdown";
import CircularProgress from "../../Components/CircularProgress";

const Activity = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());

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
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [allTypes, setAllTypes] = useState([
    "Last 7 Days",
    "This Month",
    "Last 3 Months",
    "Last 6 Months",
    "All Time",
  ]);

  const [assigWorkout, setAssigWorkout] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);

  // calender apis call fun
  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    dispatch(setLoader(true));
    getSingleExcercise(selectedDate);
    exerciseWeekProgress(selectedDate);
  };

  // all exercise progress apis functions
  const exerciseProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/user_progress/${user?.user_id}`,
        verb: "post",
        token: token,
        params: {
          givenDate: new Date(),
        },
      });

      if (res?.status == "200") {
        setWeeklyProgress(res?.response?.weeklyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get user_progress error -- ", e.toString());
    }
  };

  const getExerciseMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/monthly_progress/${user?.user_id}`,
        verb: "get",
        token: token,
      });
      console.log("responseeeeee", res?.response);
      if (res?.status == "200") {
        setMonthlyProgress(res?.response?.weeklyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in montly exercise progress");
      }
    } catch (e) {
      console.log("api gettttt monthly_progress error -- ", e.toString());
    }
  };

  const getExerciseThreeMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/last_three_months_progress/${user?.user_id}`,
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        setProgressThreeMonth(res?.response?.monthlyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in three month exercise progress");
      }
    } catch (e) {
      console.log("api get last_three_months_progress error -- ", e.toString());
    }
  };

  const getExerciseSixMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/last_six_months_progress/${user?.user_id}`,
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        setProgressSixMonth(res?.response?.monthlyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in six month exercise progress");
      }
    } catch (e) {
      console.log("api get last_six_months_progress error -- ", e.toString());
    }
  };

  const getExerciseAllMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/all_months_progress/${user?.user_id}`,
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        setYearProgress(res?.response?.yearlyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in all month exercise progress");
      }
    } catch (e) {
      console.log("api gettt all_months_progress error -- ", e.toString());
    }
  };

  // all messages progress apis functions

  const getMessagesProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/totalMessages/${user?._id}`,
        verb: "get",
        token: token,
      });
      console.log("setMessagesProgress", res?.response);
      if (res?.status == "200") {
        setMessagesProgress(res?.response?.weeklyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get totalMessages error -- ", e.toString());
    }
  };

  const getMessagesMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/monthlyMessages/${user?._id}`,
        verb: "get",
        token: token,
      });
      console.log("response of month", res?.response);
      if (res?.status == "200") {
        setMessagesProgressMonth(res?.response?.weeklyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get monthlyMessages error -- ", e.toString());
    }
  };

  const getMessagesThreeMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/last_three_monthly_messages/${user?._id}`,
        verb: "get",
        token: token,
      });
      console.log("last_three_monthly_messages", res?.response);
      if (res?.status == "200") {
        setMessagesProgressThreeMonth(res?.response?.monthlyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log(
        "api get last_three_monthly_messages error -- ",
        e.toString()
      );
    }
  };

  const getMessagesSixMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/last_six_monthly_messages/${user?._id}`,
        verb: "get",
        token: token,
      });
      console.log("response of last_six_monthly_messages", res?.response);
      if (res?.status == "200") {
        setMessagesProgressSixMonth(res?.response?.monthlyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get last_six_monthly_messages error -- ", e.toString());
    }
  };

  const getMessagesAllMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/all_monthly_messages/${user?._id}`,
        verb: "get",
        token: token,
      });
      console.log("response of all_monthly_messages", res?.response);
      if (res?.status == "200") {
        setMessagesProgressAllMonth(res?.response?.yearlyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get all_monthly_messages error -- ", e.toString());
    }
  };

  // all weight progress apis functions

  const getWeightProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/weeklyWeight/${user?.plan_id}`,
        verb: "get",
        token: token,
      });
      console.log("getWeightProgress", res);
      if (res?.status == "200") {
        setWeightProgress(res?.response?.weeklyWeight);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get weeklyWeight error -- ", e.toString());
    }
  };

  const getWeightMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/monthlyWeight/${user?.plan_id}`,
        verb: "get",
        token: token,
      });
      console.log("response of getWeightMonthProgress", res?.response);

      if (res?.status == "200") {
        setMonthlyWeightProgess(res?.response?.monthlyWeight);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get monthlyWeight error -- ", e.toString());
    }
  };

  const getWeightThreeMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/lastThreeMonthWeight/${user?.plan_id}`,
        verb: "get",
        token: token,
      });
      console.log("response of getWeightThreeMonthProgress", res?.response);
      if (res?.status == "200") {
        setWeightProgressThreeMonth(res?.response?.monthlyWeight);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get lastThreeMonthWeight error -- ", e.toString());
    }
  };

  const getWeightSixMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/lastSixMonthWeight/${user?.plan_id}`,
        verb: "get",
        token: token,
      });
      console.log("response of getWeightSixMonthProgress", res?.response);

      if (res?.status == "200") {
        setWeightProgressSixMonth(res?.response?.monthlyWeight);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get lastSixMonthWeight error -- ", e.toString());
    }
  };

  const getWeightAllMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/allMonthsWeight/${user?.plan_id}`,
        verb: "get",
        token: token,
      });
      console.log("response of getWeightAllMonthProgress", res?.response);

      if (res?.status == "200") {
        setWeightProgressAllMonth(res?.response?.monthlyWeight);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get allMonthsWeight error -- ", e.toString());
    }
  };

  // all Calories progress apis functions

  const getCaloriesProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/user_weekly_calories/${user?.user_id}`,
        verb: "post",
        token: token,
        params: {
          givenDate: new Date(),
        },
      });
      console.log("ressss", res?.response);
      if (res?.status == "200") {
        setCaloriesProgress(res?.response?.weeklyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get weeklyWeight error -- ", e.toString());
    }
  };

  const getCaloriesMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/monthly_calories/${user?.user_id}`,
        verb: "get",
        token: token,
      });
      console.log("response of weight", res?.response);

      if (res?.status == "200") {
        setMonthlyCaloriesProgess(res?.response?.weeklyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get monthlyWeight error -- ", e.toString());
    }
  };

  const getCaloriesThreeMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/last_three_months_calories/${user?.user_id}`,
        verb: "get",
        token: token,
      });
      console.log("response of weightLKL", res?.response);
      if (res?.status == "200") {
        setCaloriesProgressThreeMonth(res?.response?.monthlyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get lastThreeMonthWeight error -- ", e.toString());
    }
  };

  const getCaloriesSixMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/last_six_months_calories/${user?.user_id}`,
        verb: "get",
        token: token,
      });
      console.log("response of weightHJJH", res?.response);

      if (res?.status == "200") {
        setCaloriesProgressSixMonth(res?.response?.monthlyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get lastSixMonthWeight error -- ", e.toString());
    }
  };

  const getCaloriesAllMonthProgress = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/all_months_calories/${user?.user_id}`,
        verb: "get",
        token: token,
      });
      console.log("response of weightJKJK", res?.response);

      if (res?.status == "200") {
        setCaloriesProgressAllMonth(res?.response?.yearlyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get allMonthsWeight error -- ", e.toString());
    }
  };

  // all calender progress apis functions

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
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        setAssigWorkout([]);
        console.log("errorrrr in calenders");
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  const exerciseWeekProgress = async (selectedDate) => {
    try {
      const res = await ApiCall({
        route: `assignProgram/user_status/${user?.user_id}`,
        verb: "post",
        token: token,
        params: {
          givenDate: selectedDate,
        },
      });

      if (res?.status == "200") {
        setWeekDataProgress(res?.response?.weeklyProgress);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders progress");
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(setLoader(true));
      getSingleExcercise(date);
      exerciseWeekProgress(date);
      getMessagesProgress();
      exerciseProgress();
      getWeightProgress();
      getCaloriesProgress();
    }, [])
  );

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
  const toggleTypeSelection = (selectedType) => {
    if (selectedType == "Last 7 Days") {
      dispatch(setLoader(true));
      exerciseProgress();
      getMessagesProgress();
      getWeightProgress();
      getCaloriesProgress();
    } else if (selectedType == "This Month") {
      dispatch(setLoader(true));
      getExerciseMonthProgress();
      getMessagesMonthProgress();
      getWeightMonthProgress();
      getCaloriesMonthProgress();
    } else if (selectedType == "Last 3 Months") {
      dispatch(setLoader(true));
      getExerciseThreeMonthProgress();
      getMessagesThreeMonthProgress();
      getWeightThreeMonthProgress();
      getCaloriesThreeMonthProgress();
    } else if (selectedType == "Last 6 Months") {
      dispatch(setLoader(true));
      getExerciseSixMonthProgress();
      getMessagesSixMonthProgress();
      getWeightSixMonthProgress();
      getCaloriesSixMonthProgress();
    } else if (selectedType == "All Time") {
      dispatch(setLoader(true));
      getExerciseAllMonthProgress();
      getMessagesAllMonthProgress();
      getWeightAllMonthProgress();
      getCaloriesAllMonthProgress();
    } else {
      console.log("NO select type selected");
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

  // tooltip for progress
  const [tooltip, setTooltip] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // tooltip for messages
  const [tooltipMessages, setTooltipMessages] = useState(null);
  const [tooltipPositionMessages, setTooltipPositionMessages] = useState({
    left: 0,
    top: 0,
  });
  const [isVisibleMessages, setIsVisibleMessages] = useState(false);

  // tooltip for weight
  const [tooltipWeight, setTooltipWeight] = useState(null);
  const [tooltipPositionWeight, setTooltipPositionWeight] = useState({
    left: 0,
    top: 0,
  });
  const [isVisibleWeight, setIsVisibleWeight] = useState(false);

  // tooltip for CALORIES
  const [tooltipCalories, setTooltipCalories] = useState(null);
  const [tooltipPositionCalories, setTooltipPositionCalories] = useState({
    left: 0,
    top: 0,
  });
  const [isVisibleCalories, setIsVisibleCalories] = useState(false);

  const handleDataPointClick = (
    data,
    setTooltipFunc,
    setTooltipPositionFunc,
    setIsVisibleFunc
  ) => {
    if (
      data &&
      typeof data.x !== "undefined" &&
      typeof data.y !== "undefined" &&
      (typeof data.value === "number" || typeof data.value === "string")
    ) {
      const { x, y, value } = data;

      // Store tooltip content and position
      const tooltipValue = typeof value === "number" ? value.toFixed(2) : value;
      setTooltipFunc(tooltipValue);
      setTooltipPositionFunc({ left: x, top: y });

      setIsVisibleFunc(true);

      setTimeout(() => {
        setIsVisibleFunc(false);
      }, 3000);
    }
  };

  const numValues =
    selectedTypes === "Last 7 Days"
      ? 7
      : selectedTypes === "This Month"
      ? Platform.OS === "ios"
        ? 8
        : 7
      : selectedTypes === "Last 3 Months"
      ? Platform.OS === "ios"
        ? 8.7
        : 7
      : selectedTypes === "Last 6 Months"
      ? Platform.OS === "ios"
        ? 7.2
        : 7
      : selectedTypes === "All Time"
      ? 7
      : 7; // Default to 7 if no specific count is available
  const chartWidth = getWidth(95) * (numValues / 7);

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
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontSize: 24,
                marginBottom: Platform.OS === "ios" ? 3 : 0,
                fontFamily: "Russo_One",
                fontWeight: "600",
              }}
            >
              Hello!{`\n`}
              <Text style={{ fontSize: getFontSize(1.5) }}>
                Here’s how you’re going.
              </Text>
            </Text>
          </View>
        }
        LeftIcon={
          <Entypo
            size={30}
            style={{
              alignSelf: "flex-start",
            }}
            color={"white"}
            onPress={() => navigation.openDrawer()}
            name="menu"
          />
        }
        RightIcon={<View style={{ marginRight: getFontSize(3.5) }} />}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.progress}>Your Progress</Text>

        <ReactNativeCalendarStrip
          showMonth={false}
          selectedDate={date}
          onDateSelected={handleDateChange}
          calendarAnimation={{ type: "sequence", duration: 30 }}
          customDatesStyles={customDatesStyles}
          iconLeft={require("../../assets/images/leftp.png")}
          iconRight={require("../../assets/images/rightp.png")}
          style={{
            height: getHeight(8),
            marginTop: getHeight(1),
            paddingHorizontal: 5,
          }}
          calendarColor={colors.primary}
          iconContainer={{ flex: 0.05 }}
        />

        <View
          style={{
            justifyContent: "center",
            marginVertical: getHeight(2),
            alignItems: "center",
          }}
        >
          <Ellipse height={getHeight(21)} width={getWidth(58)} />
          {/* <CircularProgress
            percentage={assigWorkout?.progress}
            radius={35}
            strokeWidth={10}
            progressColor="#00FF00" // Green color for progress
            bgColor="#FF0000" // Red color for background
          /> */}
          {assigWorkout?.progress ? (
            <Text style={styles.fourtyper}>
              {(assigWorkout?.progress).toFixed(0)}%
            </Text>
          ) : (
            <Text style={styles.fourtyper}>0%</Text>
          )}
          <Text style={styles.todayt}>Today’s progress</Text>
        </View>
        <View style={styles.spaceBet}>
          <Text style={styles.activty}>TRAINING COMPLETETION</Text>
          <View style={styles.activityCon}>
            <SelectDropdown
              defaultValue={"Last 7 Days"}
              data={allTypes}
              onSelect={(selectedType) => {
                toggleTypeSelection(selectedType),
                  setSelectedTypes(selectedType);
              }}
              defaultButtonText="Last 7 Days"
              buttonTextAfterSelection={(selectedItem, index) => {
                return (
                  <Text
                    style={{
                      color: "white",
                      fontSize: getFontSize(2),
                      textAlign: "left",
                    }}
                  >
                    {selectedItem}
                  </Text>
                );
              }}
              buttonStyle={{
                width: getWidth(40),
                height: getHeight(4),
                marginVertical: getHeight(1),
                backgroundColor: colors.secondary,
                borderRadius: 5,
              }}
              buttonTextStyle={{
                color: "white",
                fontSize: getFontSize(2),
                fontFamily: "Ubuntu",
              }}
              renderDropdownIcon={(isOpened) => {
                return (
                  <Entypo
                    name={isOpened ? "chevron-thin-up" : "chevron-thin-down"}
                    color={"#fff"}
                    size={getFontSize(2)}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              showsVerticalScrollIndicator={false}
              dropdownStyle={{
                backgroundColor: colors.secondary,
                height: getHeight(27),
              }}
              rowStyle={{
                backgroundColor: colors.secondary,
                borderBottomColor: "rgba(0, 0, 0, 0.1)",
              }}
              selectedRowTextStyle={{
                color: colors.buttonColor,
              }}
              rowTextStyle={{
                color: "white",
                fontSize: getFontSize(2),
                textAlign: "left",
                paddingLeft: getFontSize(1),
                fontFamily: "Ubuntu-bold",
              }}
            />
          </View>
        </View>
        <View style={{ ...styles.spaceBet, marginTop: getFontSize(3) }}>
          <Text style={styles.activty}>TRAINING COMPLETION</Text>
        </View>
        <View style={styles.graphCon}>
          <LineChart
            data={
              selectedTypes === "Last 7 Days"
                ? {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
                  }
                : selectedTypes === "This Month"
                ? {
                    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                    datasets: [
                      {
                        data: [
                          monthlyProgress.Week1,
                          monthlyProgress.Week2,
                          monthlyProgress.Week3,
                          monthlyProgress.Week4,
                        ],
                      },
                    ],
                  }
                : selectedTypes === "Last 3 Months"
                ? {
                    labels: [
                      monthNameOfThreeMonthProgress[0],
                      monthNameOfThreeMonthProgress[1],
                      monthNameOfThreeMonthProgress[2],
                    ],
                    datasets: [
                      {
                        data: [
                          percentageOfThreeMonthProgress[0],
                          percentageOfThreeMonthProgress[1],
                          percentageOfThreeMonthProgress[2],
                        ],
                      },
                    ],
                  }
                : selectedTypes === "Last 6 Months"
                ? {
                    labels: [
                      monthNameOfSixMonthProgress[0],
                      monthNameOfSixMonthProgress[1],
                      monthNameOfSixMonthProgress[2],
                      monthNameOfSixMonthProgress[3],
                      monthNameOfSixMonthProgress[4],
                      monthNameOfSixMonthProgress[5],
                    ],
                    datasets: [
                      {
                        data: [
                          percentageOfSixMonthProgress[0],
                          percentageOfSixMonthProgress[1],
                          percentageOfSixMonthProgress[2],
                          percentageOfSixMonthProgress[3],
                          percentageOfSixMonthProgress[4],
                          percentageOfSixMonthProgress[5],
                        ],
                      },
                    ],
                  }
                : selectedTypes === "All Time"
                ? {
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    datasets: [
                      {
                        data: [
                          yearProgress.Jan,
                          yearProgress.Feb,
                          yearProgress.Mar,
                          yearProgress.Apr,
                          yearProgress.May,
                          yearProgress.Jun,
                          yearProgress.Jul,
                          yearProgress.Aug,
                          yearProgress.Sep,
                          yearProgress.Oct,
                          yearProgress.Nov,
                          yearProgress.Dec,
                        ],
                      },
                    ],
                  }
                : {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
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
                  }
            }
            width={chartWidth} // from react-native
            height={getHeight(25)}
            onDataPointClick={(data) =>
              handleDataPointClick(
                data,
                setTooltip,
                setTooltipPosition,
                setIsVisible
              )
            }
            yAxisSuffix="%"
            withHorizontalLines={false}
            withVerticalLines={false}
            chartConfig={{
              backgroundColor: colors.secondary,
              backgroundGradientFrom: colors.secondary,
              backgroundGradientTo: colors.secondary,
              decimalPlaces: 0, // round to decimal places
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
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
          {isVisible && (
            <TouchableOpacity
              style={{
                position: "absolute",
                left: tooltipPosition.left,
                top: tooltipPosition.top - 20,
              }}
              onPress={() => setIsVisible(false)}
            >
              <Text
                style={{ color: colors.buttonColor, fontSize: getFontSize(2) }}
              >
                {tooltip}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.spaceBet}>
          <Text style={styles.activty}>INDIVIDUAL EXERCISE</Text>
        </View>
        <View style={{ ...styles.graphCon, marginTop: getHeight(2) }}>
          <LineChart
            data={
              selectedTypes === "Last 7 Days"
                ? {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                      {
                        data: [
                          messagesProgress.Monday,
                          messagesProgress.Tuesday,
                          messagesProgress.Wednesday,
                          messagesProgress.Thursday,
                          messagesProgress.Friday,
                          messagesProgress.Saturday,
                          messagesProgress.Sunday,
                        ],
                      },
                    ],
                  }
                : selectedTypes === "This Month"
                ? {
                    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                    datasets: [
                      {
                        data: [
                          messagesProgressMonth.Week1,
                          messagesProgressMonth.Week2,
                          messagesProgressMonth.Week3,
                          messagesProgressMonth.Week4,
                        ],
                      },
                    ],
                  }
                : selectedTypes === "Last 3 Months"
                ? {
                    labels: [
                      monthNameOfThreeMonth[0],
                      monthNameOfThreeMonth[1],
                      monthNameOfThreeMonth[2],
                    ],
                    datasets: [
                      {
                        data: [
                          percentageOfThreeMonth[0],
                          percentageOfThreeMonth[1],
                          percentageOfThreeMonth[2],
                        ],
                      },
                    ],
                  }
                : selectedTypes === "Last 6 Months"
                ? {
                    labels: [
                      monthNameOfSixMonth[0],
                      monthNameOfSixMonth[1],
                      monthNameOfSixMonth[2],
                      monthNameOfSixMonth[3],
                      monthNameOfSixMonth[4],
                      monthNameOfSixMonth[5],
                    ],
                    datasets: [
                      {
                        data: [
                          percentageOfSixMonth[0],
                          percentageOfSixMonth[1],
                          percentageOfSixMonth[2],
                          percentageOfSixMonth[3],
                          percentageOfSixMonth[4],
                          percentageOfSixMonth[5],
                        ],
                      },
                    ],
                  }
                : selectedTypes === "All Time"
                ? {
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    datasets: [
                      {
                        data: [
                          messagesProgressAllMonth.Jan,
                          messagesProgressAllMonth.Feb,
                          messagesProgressAllMonth.Mar,
                          messagesProgressAllMonth.Apr,
                          messagesProgressAllMonth.May,
                          messagesProgressAllMonth.Jun,
                          messagesProgressAllMonth.Jul,
                          messagesProgressAllMonth.Aug,
                          messagesProgressAllMonth.Sep,
                          messagesProgressAllMonth.Oct,
                          messagesProgressAllMonth.Nov,
                          messagesProgressAllMonth.Dec,
                        ],
                      },
                    ],
                  }
                : {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                      {
                        data: [
                          messagesProgress.Monday,
                          messagesProgress.Tuesday,
                          messagesProgress.Wednesday,
                          messagesProgress.Thursday,
                          messagesProgress.Friday,
                          messagesProgress.Saturday,
                          messagesProgress.Sunday,
                        ],
                      },
                    ],
                  }
            }
            width={chartWidth}
            height={getHeight(25)}
            yAxisSuffix="%"
            onDataPointClick={(data) =>
              handleDataPointClick(
                data,
                setTooltipMessages,
                setTooltipPositionMessages,
                setIsVisibleMessages
              )
            }
            //fromZero={true}
            withHorizontalLines={false}
            withVerticalLines={false}
            chartConfig={{
              backgroundColor: colors.secondary,
              backgroundGradientFrom: colors.secondary,
              backgroundGradientTo: colors.secondary,
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
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
          {isVisibleMessages && (
            <TouchableOpacity
              style={{
                position: "absolute",
                left: tooltipPositionMessages.left,
                top: tooltipPositionMessages.top - 20,
              }}
              onPress={() => setIsVisibleMessages(false)}
            >
              <Text
                style={{ color: colors.buttonColor, fontSize: getFontSize(2) }}
              >
                {tooltipMessages}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.spaceBet}>
          <Text style={styles.activty}>STRENGTH PROGRESS</Text>
        </View>
        <View style={{ ...styles.graphCon, marginTop: getHeight(2) }}>
          <LineChart
            data={
              selectedTypes === "Last 7 Days"
                ? {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

                    datasets: [
                      {
                        data: [
                          weightProgress.Monday,
                          weightProgress.Tuesday,
                          weightProgress.Wednesday,
                          weightProgress.Thursday,
                          weightProgress.Friday,
                          weightProgress.Saturday,
                          weightProgress.Sunday,
                        ],
                      },
                    ],
                  }
                : selectedTypes === "This Month"
                ? {
                    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                    datasets: [
                      {
                        data: [
                          monthlyWeightProgress.Week1,
                          monthlyWeightProgress.Week2,
                          monthlyWeightProgress.Week3,
                          monthlyWeightProgress.Week4,
                        ],
                      },
                    ],
                  }
                : selectedTypes === "Last 3 Months"
                ? {
                    labels: [
                      monthNameOfThreeMonthWeight[0],
                      monthNameOfThreeMonthWeight[1],
                      monthNameOfThreeMonthWeight[2],
                    ],
                    datasets: [
                      {
                        data: [
                          percentageOfThreeMonthWeight[0],
                          percentageOfThreeMonthWeight[1],
                          percentageOfThreeMonthWeight[2],
                        ],
                      },
                    ],
                  }
                : selectedTypes === "Last 6 Months"
                ? {
                    labels: [
                      monthNameOfSixMonthWeight[0],
                      monthNameOfSixMonthWeight[1],
                      monthNameOfSixMonthWeight[2],
                      monthNameOfSixMonthWeight[3],
                      monthNameOfSixMonthWeight[4],
                      monthNameOfSixMonthWeight[5],
                    ],
                    datasets: [
                      {
                        data: [
                          percentageOfSixMonthWeight[0],
                          percentageOfSixMonthWeight[1],
                          percentageOfSixMonthWeight[2],
                          percentageOfSixMonthWeight[3],
                          percentageOfSixMonthWeight[4],
                          percentageOfSixMonthWeight[5],
                        ],
                      },
                    ],
                  }
                : selectedTypes === "All Time"
                ? {
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    datasets: [
                      {
                        data: [
                          weightProgressAllMonth.Jan,
                          weightProgressAllMonth.Feb,
                          weightProgressAllMonth.Mar,
                          weightProgressAllMonth.Apr,
                          weightProgressAllMonth.May,
                          weightProgressAllMonth.Jun,
                          weightProgressAllMonth.Jul,
                          weightProgressAllMonth.Aug,
                          weightProgressAllMonth.Sep,
                          weightProgressAllMonth.Oct,
                          weightProgressAllMonth.Nov,
                          weightProgressAllMonth.Dec,
                        ],
                      },
                    ],
                  }
                : {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                      {
                        data: [
                          weightProgress.Monday,
                          weightProgress.Tuesday,
                          weightProgress.Wednesday,
                          weightProgress.Thursday,
                          weightProgress.Friday,
                          weightProgress.Saturday,
                          weightProgress.Sunday,
                        ],
                      },
                    ],
                  }
            }
            width={chartWidth} // from react-native
            height={getHeight(25)}
            onDataPointClick={(data) =>
              handleDataPointClick(
                data,
                setTooltipWeight,
                setTooltipPositionWeight,
                setIsVisibleWeight
              )
            }
            yAxisSuffix="%"
            withHorizontalLines={false}
            withVerticalLines={false}
            chartConfig={{
              backgroundColor: colors.secondary,
              backgroundGradientFrom: colors.secondary,
              backgroundGradientTo: colors.secondary,
              decimalPlaces: 0, // round to decimal places
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
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
          {isVisibleWeight && (
            <TouchableOpacity
              style={{
                position: "absolute",
                left: tooltipPositionWeight.left,
                top: tooltipPositionWeight.top - 20,
              }}
              onPress={() => setIsVisibleWeight(false)}
            >
              <Text
                style={{ color: colors.buttonColor, fontSize: getFontSize(2) }}
              >
                {tooltipWeight}
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.spaceBet}>
          <Text style={styles.activty}>CALORIES BURNED</Text>
        </View>
        <View style={{ ...styles.graphCon, marginTop: getHeight(2) }}>
          <LineChart
            data={
              selectedTypes === "Last 7 Days"
                ? {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

                    datasets: [
                      {
                        data: [
                          caloriesProgress.Monday,
                          caloriesProgress.Tuesday,
                          caloriesProgress.Wednesday,
                          caloriesProgress.Thursday,
                          caloriesProgress.Friday,
                          caloriesProgress.Saturday,
                          caloriesProgress.Sunday,
                        ],
                      },
                    ],
                  }
                : selectedTypes === "This Month"
                ? {
                    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                    datasets: [
                      {
                        data: [
                          monthlyCaloriesProgress.Week1,
                          monthlyCaloriesProgress.Week2,
                          monthlyCaloriesProgress.Week3,
                          monthlyCaloriesProgress.Week4,
                        ],
                      },
                    ],
                  }
                : selectedTypes === "Last 3 Months"
                ? {
                    labels: [
                      monthNameOfThreeMonthCalories[0],
                      monthNameOfThreeMonthCalories[1],
                      monthNameOfThreeMonthCalories[2],
                    ],
                    datasets: [
                      {
                        data: [
                          percentageOfThreeMonthCalories[0],
                          percentageOfThreeMonthCalories[1],
                          percentageOfThreeMonthCalories[2],
                        ],
                      },
                    ],
                  }
                : selectedTypes === "Last 6 Months"
                ? {
                    labels: [
                      monthNameOfSixMonthCalories[0],
                      monthNameOfSixMonthCalories[1],
                      monthNameOfSixMonthCalories[2],
                      monthNameOfSixMonthCalories[3],
                      monthNameOfSixMonthCalories[4],
                      monthNameOfSixMonthCalories[5],
                    ],
                    datasets: [
                      {
                        data: [
                          percentageOfSixMonthCalories[0],
                          percentageOfSixMonthCalories[1],
                          percentageOfSixMonthCalories[2],
                          percentageOfSixMonthCalories[3],
                          percentageOfSixMonthCalories[4],
                          percentageOfSixMonthCalories[5],
                        ],
                      },
                    ],
                  }
                : selectedTypes === "All Time"
                ? {
                    labels: [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ],
                    datasets: [
                      {
                        data: [
                          caloriesProgressAllMonth.Jan,
                          caloriesProgressAllMonth.Feb,
                          caloriesProgressAllMonth.Mar,
                          caloriesProgressAllMonth.Apr,
                          caloriesProgressAllMonth.May,
                          caloriesProgressAllMonth.Jun,
                          caloriesProgressAllMonth.Jul,
                          caloriesProgressAllMonth.Aug,
                          caloriesProgressAllMonth.Sep,
                          caloriesProgressAllMonth.Oct,
                          caloriesProgressAllMonth.Nov,
                          caloriesProgressAllMonth.Dec,
                        ],
                      },
                    ],
                  }
                : {
                    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                    datasets: [
                      {
                        data: [
                          caloriesProgress.Monday,
                          caloriesProgress.Tuesday,
                          caloriesProgress.Wednesday,
                          caloriesProgress.Thursday,
                          caloriesProgress.Friday,
                          caloriesProgress.Saturday,
                          caloriesProgress.Sunday,
                        ],
                      },
                    ],
                  }
            }
            width={chartWidth} // from react-native
            height={getHeight(25)}
            onDataPointClick={(data) =>
              handleDataPointClick(
                data,
                setTooltipCalories,
                setTooltipPositionCalories,
                setIsVisibleCalories
              )
            }
           // yAxisSuffix="%"
            withHorizontalLines={false}
            withVerticalLines={false}
            chartConfig={{
              backgroundColor: colors.secondary,
              backgroundGradientFrom: colors.secondary,
              backgroundGradientTo: colors.secondary,
              decimalPlaces: 0, // round to decimal places
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(250, 250, 250, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
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
          {isVisibleCalories && (
            <TouchableOpacity
              style={{
                position: "absolute",
                left: tooltipPositionCalories.left,
                top: tooltipPositionCalories.top - 20,
              }}
              onPress={() => setIsVisibleCalories(false)}
            >
              <Text
                style={{ color: colors.buttonColor, fontSize: getFontSize(2) }}
              >
                {tooltipCalories}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
export default Activity;
