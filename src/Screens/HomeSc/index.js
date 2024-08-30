import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  Dimensions,
  Linking,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import moment from "moment"; // Import moment for date manipulation
import Entypo from "react-native-vector-icons/Entypo";
import PopupModal from "../../Components/ErrorPopup";

import { useDispatch, useSelector } from "react-redux";
import { appListner, requestUserPermission } from "../Notifications";
import { getSingleUser } from "../../Redux/actions/AuthActions";
import { ApiCall } from "../../Services/Apis";
import { setLoader } from "../../Redux/actions/GernalActions";
import { useNavigation } from "@react-navigation/native";
import { Calendar } from "react-native-calendars";
import { colors } from "../../constants/colors";
import { useFocusEffect } from "@react-navigation/native";
import TodoList from "../../Components/TodoList";

const HomeSc = ({ navigation, route }) => {
  const navigate = useNavigation();
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const [adminAlert, setAdminAlert] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [calendarMarkedDates, setCalendarMarkedDates] = useState({});
  const [events, setEvents] = useState();
  const [eventDescription, setEventDescription] = useState("asdasd");
  const [upComingEvent, setUpcomingEvent] = useState();
  const [todayWorkout, setTodayWorkout] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (user.isAssigned != true) setModalVisible(true);
    }, [])
  );
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const openMyFitnessPal = async () => {
    const myFitnessPalURL = "myfitnesspal://"; // MyFitnessPal URL scheme
    const appStoreURL =
      "https://apps.apple.com/us/app/myfitnesspal/id341232718"; // MyFitnessPal App Store URL

    try {
      // Check if MyFitnessPal is installed
      const isAppInstalled = await Linking.canOpenURL(myFitnessPalURL);
      if (isAppInstalled) {
        // Open MyFitnessPal if installed
        await Linking.openURL(myFitnessPalURL);
      } else {
        // If the app is not installed, open the App Store link
        await Linking.openURL(appStoreURL);
      }
    } catch (error) {
      console.error("Error opening MyFitnessPal:", error);
    }
  };

  const handleDayPress = (day) => {
    let find = events?.find((x) => getFormattedDate(x.start) == day.dateString);
    if (find) setEventDescription(find?.title);
    else setEventDescription("");
    setSelectedDate(day.dateString);
  };

  const getAdminAlert = async () => {
    try {
      const res = await ApiCall({
        route: `auth/get-recent-alert`,
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        console.log("admin response", res?.response);
        setAdminAlert(res?.response?.event);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in alert");
      }
    } catch (e) {
      console.log("api get admin alert error -- ", e.toString());
    }
  };

  useEffect(() => {
    requestUserPermission(token);
  }, []);
  useEffect(() => {
    if (token) {
      if (user.isAssigned) dispatch(getSingleUser(token));
      appListner(navigation);
    }
  }, []);
  useEffect(() => {
    getAdminAlert();
    getEvents();
    getTodayWorkout();
  }, []);

  const getTodayWorkout = async () => {
    let currentDate = new Date();
    try {
      const res = await ApiCall({
        route: `assignProgram/given-date-workouts/${
          user?.plan_id
        }&${currentDate.toISOString()}`,
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        console.log("innerWorkout", res?.response?.Workout[0]?.innerWorkout[0]);
        setTodayWorkout(res?.response?.Workout[0]?.innerWorkout[0]);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
      }
    } catch (e) {
      console.log("api get skill errorrrr -- ", e.toString());
    }
  };

  const getEvents = async () => {
    dispatch(setLoader(true));

    try {
      let res = null;

      res = await ApiCall({
        route: "admin/get_alert",
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        console.log("events", res?.response?.admin);
        setEvents(res?.response?.admin);
        setMarkedDates(res?.response?.admin);

        let _events = res?.response?.admin;
        let latestEvent = _events?.reduce((latest, current) => {
          return new Date(current.start) > new Date(latest.start)
            ? current
            : latest;
        }, _events[0]);
        setUpcomingEvent(latestEvent);

        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        Alert.alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  const setMarkedDates = (records) => {
    let allDates = {};
    let currentDate = getFormattedDate(new Date());
    records.forEach((item) => {
      let formatedDate = getFormattedDate(item.start);
      if (formatedDate >= currentDate) {
        let obj = {
          [formatedDate]: {
            selected: true,
            // marked: true,
            selectedColor: colors.blueColor,
          },
        };
        allDates = { ...allDates, ...obj };
      }
    });
    console.log(allDates);
    setCalendarMarkedDates(allDates);
  };

  const getFormattedDate = (_date) => {
    const date = new Date(_date);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  function timeRemaining(targetDate) {
    const now = new Date();
    const endDate = new Date(targetDate);
    const timeDiff = endDate - now;

    if (timeDiff <= 0) {
      return "The date has already passed.";
    }

    const seconds = Math.floor((timeDiff / 1000) % 60);
    const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
    const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (days > 0) {
      return `${days} day${days > 1 ? "s" : ""}`;
    } else if (hours > 0) {
      return `${hours} hour${hours > 1 ? "s" : ""}`;
    } else if (minutes > 0) {
      return `${minutes} minute${minutes > 1 ? "s" : ""}`;
    } else {
      return `${seconds} second${seconds > 1 ? "s" : ""}`;
    }
  }

  const formatCalendarEventDate = (dateStr) => {
    try {
      if (dateStr) {
        // Create a new Date object
        const currentDate = new Date();
        const date = new Date(dateStr);

        // Compare only the date part (ignoring the time)
        const currentDateOnly = new Date(currentDate.toDateString());
        const eventDateOnly = new Date(date.toDateString());

        if (eventDateOnly >= currentDateOnly) {
          // Options for formatting the date and time
          const options = {
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
            timeZone: "America/New_York",
            timeZoneName: "short",
          };

          // Format the date
          const formattedDate = date.toLocaleString("en-US", options);

          // Adjust the output to match the desired format
          const [monthDay, timeAndTimezone] = formattedDate.split(",");

          // Check if time and timezone are defined
          if (timeAndTimezone) {
            const [time, timezone] = timeAndTimezone.trim().split(" ");

            // Check if the event is on the same day
            if (eventDateOnly.getTime() === currentDateOnly.getTime()) {
              const finalFormattedDate = `Upcoming call: Today at ${time?.toLowerCase()} ${timezone?.toLowerCase()}`;
              return finalFormattedDate;
            } else {
              const finalFormattedDate = `Upcoming call: ${monthDay?.trim()} at ${time?.toLowerCase()} ${timezone?.toLowerCase()} with ${
                upComingEvent?.speakers[0]?.name
              }`;

              return finalFormattedDate;
            }
          } else {
            // Fallback if split fails
            return `Upcoming call: ${formattedDate} with ${upComingEvent?.speakers[0]?.name}`;
          }
        } else {
          return "";
        }
      } else {
        return "";
      }
    } catch (e) {
      return "";
    }
  };

  const openURL = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const currentDate = moment().format("MMM DD, YYYY"); // Get current date in the format MMM DD, YYYY

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps={"handled"}>
      {/* <PopupModal isVisible={isModalVisible} toggleModal={toggleModal} /> */}
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/HomeTopBack.png")}
          style={styles.headerImage}
        />
        <View style={styles.dateContainer}>
          <Image
            source={require("../../assets/images/Solid-calendar.png")}
            style={styles.calendarIcon}
          />
          <Text style={styles.dateText}>{currentDate}</Text>
        </View>
        <View style={styles.headerInfo}>
          <View style={styles.profilePicture}>
            <Image
              source={{ uri: user?.profile_image }}
              style={styles.profileImage}
            />
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>
              {"Hello " + user?.full_name?.split(" ")[0]}
            </Text>
          </View>
          <Entypo
            size={30}
            color={"white"}
            onPress={() => navigation.openDrawer()}
            name="menu"
            style={styles.menuIcon}
          />
        </View>
      </View>

      <View style={styles.mainFeatures}>
        <View style={styles.buttonPrimary}>
          <TouchableOpacity
            onPress={() => navigate.navigate("HTUA")}
            style={styles.buttonContent}
          >
            <Text style={styles.buttonText}>Watch How To Use App</Text>
            <View style={styles.solidArrowRight} />
          </TouchableOpacity>
        </View>
        <View style={styles.subNav}>
          <View style={styles.vidTitle}>
            <Text style={styles.subNavText}>Today's Workout</Text>
            <Text style={styles.vidTitleText}>({todayWorkout ? 1 : 0})</Text>
          </View>

          <View style={styles.moreVertical}>
            <View style={styles.moreVerticalLine} />
            <View style={styles.moreVerticalLine} />
            <View style={styles.moreVerticalLine} />
          </View>
        </View>
        <TouchableOpacity
          style={styles.frameContainer}
          onPress={() => navigation.navigate("AddWorkouts")}
        >
          <Image
            source={
              todayWorkout
                ? require("../../assets/images/homevidthumb.png")
                : require("../../assets/images/homevidthumb.png")
            }
            style={styles.vidThumb}
          />
          <Image
            source={require("../../assets/images/blackshadow.png")}
            style={styles.overlay}
          />
          <View style={styles.frameContent}>
            <View style={styles.frameContentUpper}>
              <View style={styles.workoutMessageContainer}>
                <Image
                  source={require("../../assets/images/firefire2.png")}
                  style={styles.fireIcon}
                />
                <Text style={styles.workoutMessage}>Enjoy your workout</Text>
              </View>
            </View>
            <View style={styles.frameContentLower}>
              <View style={styles.frameText}>
                <Text style={styles.frameTitle}>
                  {todayWorkout ? todayWorkout.workoutName : "No Workout Today"}
                </Text>
                <View style={styles.frameSubtitle}>
                  <Text style={styles.frameSubtitleText}>
                    {todayWorkout
                      ? todayWorkout.description
                      : "Enjoy your rest day!"}
                  </Text>
                </View>
              </View>
              <View>
                <Image
                  source={require("../../assets/images/button13.png")}
                  style={styles.playButton}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {upComingEvent && (
        <TouchableOpacity style={styles.liveCallsBtn} onPress={() => {}}>
          <Image
            source={require("../../assets/images/WhiteCalendar.png")}
            style={styles.whiteCalendar}
          />
          <Text style={styles.liveCallsBtnText}>
            {`Next Live Call Is In ${timeRemaining(
              upComingEvent?.start
            )} with ${upComingEvent?.speakers[0]?.name}`}
          </Text>
        </TouchableOpacity>
      )}
      {/* Calendar Start */}
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={handleDayPress}
          markedDates={calendarMarkedDates}
          style={{
            borderRadius: 20,
            backgroundColor: "#f2f2f2",
            margin: 18,
            height: 350,
          }}
          theme={{
            calendarBackground: "#f2f2f2",
            textSectionTitleColor: "#b6c1cd",
            // selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#00adf5",
            dayTextColor: "#2d4150",
            textDisabledColor: "#d9e1e8",
            arrowColor: colors.black,
            monthTextColor: colors.black,
            indicatorColor: "blue",
            textDayFontFamily: "monospace",
            textMonthFontFamily: "monospace",
            textDayHeaderFontFamily: "monospace",
            textDayFontWeight: "300",
            textMonthFontWeight: "bold",
            textDayHeaderFontWeight: "300",
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
        <View style={styles.eventContainer}>
          <Text style={styles.eventText}>
            {formatCalendarEventDate(upComingEvent?.start)}
          </Text>
        </View>
      </View>
      {/* Calendar End */}

      <View style={{ padding: 20 }}>
        <TodoList />
      </View>

      {/* <View style={styles.coachBooking}>
        <View style={styles.coachBookingHeader}>
          <Text style={styles.coachBookingTitle}>Shop & Upgrades</Text>
          <Text style={styles.coachBookingSeeAll}>See All</Text>
        </View>
        <View style={styles.coachBookingItem}>
          <View style={styles.coachBookingContent}>
            <View style={styles.coachBookingImage}>
              <Image source={require("../../assets/images/CoachThumb.png")} />
            </View>
            <View style={styles.coachBookingText}>
              <View style={styles.coachBookingTextUpper}>
                <Text style={styles.coachBookingTitle}>
                  1 on 1 Online Coaching
                </Text>
                <Text style={styles.coachBookingSubtitle}>Custom Coaching</Text>
                <Text style={styles.coachBookingDesc}>
                  Bring your training to the next level with one on one custom
                  coaching
                </Text>
              </View>
            </View>
            <View style={styles.coachBookingChevronRight}></View>
          </View>
        </View>
        <View style={styles.coachBookingItem}>
          <View style={styles.coachBookingContent}>
            <View style={styles.coachBookingImage}>
              <Image source={require("../../assets/images/Homefood.png")} />
            </View>
            <View style={styles.coachBookingText}>
              <View style={styles.coachBookingTextUpper}>
                <Text style={styles.coachBookingTitle}>
                  Ultimate Nutrition Plan
                </Text>
                <Text style={styles.coachBookingSubtitle}>
                  Get the top nutrition to fuel your training
                </Text>
                <Text style={styles.coachBookingDesc}>
                  Created by the nutritionist for Ronda Rousey, Rampage Jackson
                  & Vitor Belfort
                </Text>
              </View>
            </View>
            <View style={styles.coachBookingChevronRight}>
              <Image
                source={require("../../assets/images/Graychevronright.png")}
              />
            </View>
          </View>
        </View>
        <View style={styles.coachBookingItem}>
          <View style={styles.coachBookingContent}>
            <View style={styles.coachBookingImage}>
              <Image source={require("../../assets/images/Homepills.png")} />
            </View>
            <View style={styles.coachBookingText}>
              <View style={styles.coachBookingTextUpper}>
                <Text style={styles.coachBookingTitle}>Battle Tested</Text>
                <Text style={styles.coachBookingSubtitle}>
                  Post Workout Recovery Drink
                </Text>
                <Text style={styles.coachBookingDesc}>
                  Bring your training to the next level with one on one custom
                  coaching
                </Text>
              </View>
            </View>
            <View style={styles.coachBookingChevronRight}>
              <Image
                source={require("../../assets/images/Graychevronright.png")}
              />
            </View>
          </View>
        </View>
      </View> */}

      <View style={styles.mealPlan}>
        <View style={styles.mealPlanHeader}>
          <Text style={styles.mealPlanTitle}>My Fitness Pal Stats</Text>
        </View>
        <View style={styles.mealPlanItem}>
          <Image
            source={require("../../assets/images/Homesalad.png")}
            style={styles.homeSalad}
          />
          <View style={styles.mealPlanContent}>
            <View style={styles.mealPlanNutrition}>
              <View style={styles.mealPlanNutritionItem}>
                <View style={styles.mealPlanNutritionFrame}>
                  <Text style={styles.mealPlanNutritionValue}>25g</Text>
                  <Text style={styles.mealPlanNutritionLabel}>Protein</Text>
                </View>
              </View>
              <View style={styles.mealPlanNutritionItem}>
                <View style={styles.mealPlanNutritionFrame}>
                  <Text style={styles.mealPlanNutritionValue}>17g</Text>
                  <Text style={styles.mealPlanNutritionLabel}>Fat</Text>
                </View>
              </View>
            </View>
            <View style={styles.mealPlanText}>
              <View style={styles.mealPlanTextContent}>
                <Text style={styles.mealPlanTitle}>Salad & Egg</Text>
                <View style={styles.mealPlanInfo}>
                  <View style={styles.mealPlanInfoItem}>
                    <View style={styles.mealPlanInfoIcon}>
                      <Image
                        source={require("../../assets/images/homefireicon.png")}
                      />
                    </View>
                    <Text style={styles.mealPlanInfoText}>548kcal</Text>
                  </View>
                  <View style={styles.mealPlanInfoDivider} />
                  <View style={styles.mealPlanInfoItem}>
                    <View style={styles.mealPlanInfoIcon}>
                      <Image
                        source={require("../../assets/images/homeclockicon.png")}
                        style={[
                          styles.mealPlanInfoIcon,
                          { tintColor: "black" },
                        ]}
                      />
                    </View>
                    <Text style={styles.mealPlanInfoText}>20min</Text>
                  </View>
                </View>
              </View>
              <View>
                <TouchableOpacity onPress={openMyFitnessPal}>
                  <Image
                    source={require("../../assets/images/homeorangearrow.png")}
                    style={styles.orangeArrow}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -50,
    backgroundColor: "#FFFFFF",
  },
  homeSalad: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    objectFit: "cover",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.2,
  },
  header: {
    flexDirection: "column", // Changed to column
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginTop: 20,
    position: "relative",
  },
  menuIcon: {
    marginleft: 25,
  },
  headerImage: {
    position: "absolute",
    top: 0,
    resizeMode: "stretch",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    width: Dimensions.get("window").width,
  },
  dateContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: 80, // Adjusted to fit correctly
    left: 16, // Adjusted to fit correctly
  },
  calendarIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: "contain",
    tintColor: "#FFFFFF", // Ensure the icon matches the text color
    opacity: 0.8,
  },
  dateText: {
    fontFamily: "Work Sans",
    fontSize: 13,
    fontWeight: "700",
    color: "#c8c8c9",
    opacity: 0.8,
  },
  workoutMessageContainer: {
    flexDirection: "row",
    alignItems: "left",
    justifyContent: "left",
    width: "100%",
  },
  fireIcon: {
    width: 24,
    height: 24,
    marginRight: 6,
  },
  workoutMessage: {
    marginTop: 2,
    fontSize: 17,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  headerInfo: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    marginTop: 90,
  },
  profilePicture: {
    width: 54,
    height: 54,
    borderRadius: 18,
    overflow: "hidden",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  headerContent: {
    flex: 1,
    marginLeft: 20,
  },
  greeting: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  chevronRight: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  chevronImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  subHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  vidTitle: {
    flex: 1,
    flexDirection: "row",
    gap: 4,
  },
  vidTitleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "gray",
  },
  calendarIconInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#FFFFFF",
  },
  calendarText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  buttonFab: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#393C43",
    justifyContent: "center",
    alignItems: "center",
  },
  arrowRight: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  arrowRightInner: {
    width: 10,
    height: 10,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "#FFFFFF",
    transform: [{ rotate: "45deg" }],
  },
  notificationCounter: {
    position: "absolute",
    top: 68,
    right: 16,
    width: 12,
    height: 12,
    borderRadius: 4,
    backgroundColor: "#FF8036",
    borderWidth: 2,
    borderColor: "#393C43",
    justifyContent: "center",
    alignItems: "center",
  },
  mainFeatures: {
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginTop: 20,
  },
  buttonPrimary: {
    height: 48,
    borderRadius: 24,
    backgroundColor: "#111214",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  solidArrowRight: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  subNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  subNavText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111214",
  },
  moreVertical: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  moreVerticalLine: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#BABBBE",
    marginVertical: 2,
  },
  //VID THUMB
  frameContainer: {
    borderRadius: 32,
    overflow: "hidden",
    height: 230,
    justifyContent: "space-between",
    flex: 1,
  },
  frameBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#111214",
  },
  frameOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  vidThumb: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    objectFit: "cover",
    width: Dimensions.get("window").width,
  },
  frameContent: {
    padding: 16,
    flex: 1,
    justifyContent: "space-between",
  },
  frameContentUpper: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 16,
    alignItems: "center",
  },
  fitnessInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  fitnessIcon: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 1,
  },
  fitnessText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  frameContentLower: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  frameText: {
    flex: 1,
  },
  frameTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  frameSubtitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  frameSubtitleText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFFFFF",
    marginRight: 8,
  },
  tagMaster: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.32)",
  },
  greeting: {
    fontSize: 25,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  tagText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FFFFFF",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  buttonIconFab: {
    width: 56,
    height: 56,
    borderRadius: 19,
    backgroundColor: "#FF8036",
    justifyContent: "center",
    alignItems: "center",
  },
  solidArrowRightSm: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  solidArrowRightSmInner: {
    width: 10,
    height: 10,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "#FFFFFF",
    transform: [{ rotate: "45deg" }],
  },
  fitnessMetricsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111214",
    marginBottom: 8,
  },
  fitnessMetricsImage: {
    width: "100%",
    height: 31,
    resizeMode: "cover",
    borderRadius: 5,
  },
  fitnessCalendar: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  fitnessCalendarHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  fitnessCalendarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#393C43",
  },
  fitnessCalendarDatePicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  fitnessCalendarDateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#393C43",
    marginRight: 6,
  },
  fitnessCalendarChevronDown: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  fitnessCalendarChevronDownInner: {
    width: 10,
    height: 10,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "#676C75",
    transform: [{ rotate: "45deg" }],
  },
  fitnessCalendarDays: {
    // Add styles for calendar days
  },
  coachBooking: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  coachBookingHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  coachBookingTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111214",
  },
  coachBookingSeeAll: {
    fontSize: 12,
    fontWeight: "500",
    color: "#FF8036",
  },
  coachBookingItem: {
    backgroundColor: "#F3F3F4",
    borderRadius: 32,
    padding: 12,
    marginBottom: 12,
  },
  coachBookingContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  coachBookingImage: {
    width: 80,
    height: 80,
    borderRadius: 27,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  coachBookingImageInner: {
    width: 136,
    height: 90,
    resizeMode: "cover",
  },
  coachBookingText: {
    flex: 1,
  },
  coachBookingTextUpper: {
    gap: 6,
  },
  coachBookingSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: "#676C75",
  },
  coachBookingDesc: {
    fontSize: 12,
    fontWeight: "400",
    color: "black",
  },
  coachBookingTextLower: {
    flexDirection: "row",
    alignItems: "center",
  },
  coachBookingRating: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  coachBookingRatingStar: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  coachBookingRatingText: {
    fontSize: 10,
    fontWeight: "500",
    color: "#393C43",
  },
  coachBookingDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D7D8D9",
    marginHorizontal: 4,
  },
  coachBookingInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  coachBookingInfoIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  coachBookingChevronRight: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  coachBookingChevronRightInner: {
    width: 10,
    height: 10,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "#BABBBE",
    transform: [{ rotate: "45deg" }],
  },
  mealPlan: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  mealPlanHeader: {
    marginBottom: 16,
  },
  mealPlanTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111214",
  },
  mealPlanItem: {
    borderRadius: 32,
    overflow: "hidden",
    height: 220,
    marginBottom: 70,
  },
  mealPlanBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#F3F3F4",
  },
  mealPlanOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(243, 243, 244, 0.8)",
  },
  mealPlanContent: {
    padding: 16,
  },
  mealPlanNutrition: {
    flexDirection: "col",
    marginBottom: 25,
    gap: 6,
    position: "absolute",
    top: 10,
    left: 10,
  },
  mealPlanNutritionItem: {
    marginRight: 8,
  },
  mealPlanNutritionFrame: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignItems: "center",
  },
  mealPlanNutritionValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#111214",
    marginBottom: 4,
  },
  mealPlanNutritionLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: "#111214",
  },
  mealPlanText: {
    flexDirection: "row",
    alignItems: "flex-end",
    height: "100%",
  },
  mealPlanTextContent: {
    flex: 1,
  },
  mealPlanInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  mealPlanInfoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  mealPlanInfoIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
    resizeMode: "contain",
  },
  mealPlanInfoText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#393C43",
  },
  mealPlanInfoDivider: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#BABBBE",
    marginHorizontal: 4,
  },
  mealPlanButtonFab: {
    width: 56,
    height: 56,
    borderRadius: 19,
    backgroundColor: "#FF8036",
    justifyContent: "center",
    alignItems: "center",
  },
  mealPlanButtonArrow: {
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  mealPlanButtonArrowLine: {
    position: "absolute",
    top: "50%",
    left: "16.67%",
    right: "16.67%",
    borderTopWidth: 2,
    borderColor: "#FFFFFF",
  },
  mealPlanButtonArrowHead: {
    position: "absolute",
    top: "79.17%",
    left: "83.33%",
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderTopWidth: 0,
    borderRightWidth: 4,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderTopColor: "transparent",
    borderRightColor: "transparent",
    borderBottomColor: "#FFFFFF",
    borderLeftColor: "transparent",
    transform: [{ rotate: "-45deg" }],
  },

  buttonIconFab: {
    position: "absolute",
    bottom: 16,
    left: "50%",
    marginLeft: -32,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#FF8036",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonIconFabInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
  },

  liveCallsBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    backgroundColor: "#256CD0",
    paddingVertical: 15,
    gap: 6,
    marginHorizontal: 16,
  },
  liveCallsBtnText: {
    fontSize: 12,
    fontWeight: "500",
    color: "white",
    letterSpacing: -0.8,
  },
  whiteCalendar: {
    height: 12,
    width: 12,
  },
  calendarMockup: {
    width: "95%",
    height: Dimensions.get("window").width * 0.9,
    resizeMode: "contain",
  },
  calendarContainer: {
    flex: 1,
  },
  eventContainer: {
    position: "absolute",
    bottom: 38,
    alignItems: "center",
    width: "100%",
  },
  eventText: {
    fontSize: 10,
    left: 0,
    color: colors.black,
  },
  playButton: {
    width: 52, // or whatever size you want
    height: 52,
    resizeMode: "contain",
  },
});

export default HomeSc;
