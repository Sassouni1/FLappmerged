import React, { useEffect, useState } from "react";
import { Text, View, Image, StyleSheet, Dimensions, Linking, TouchableOpacity, Alert, ScrollView } from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { appListner, requestUserPermission } from "../Notifications";
import { getSingleUser } from "../../Redux/actions/AuthActions";
import { ApiCall } from "../../Services/Apis";
import { setLoader } from "../../Redux/actions/GernalActions";
import { useNavigation } from "@react-navigation/native";

const HomeSc = ({ navigation, route }) => {
  const navigate = useNavigation();
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  const [adminAlert, setAdminAlert] = useState("");

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
      dispatch(getSingleUser(token));
      appListner(navigation);
    }
  }, []);
  useEffect(() => {
    getAdminAlert();
  }, []);

  const openURL = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps={"handled"}>
      <View style={styles.header}>
        <Image source={require("../../assets/images/HomeTopBack.png")} style={styles.headerImage} />
        <View style={styles.headerInfo}>
          <View style={styles.profilePicture}>
            <Image source={require("../../assets/images/ProfilePicture.png")} style={styles.profileImage} />
          </View>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Hello Chris</Text>
          </View>
          <View style={styles.chevronRight}>
            <Image source={require("../../assets/images/homerightarrow.png")} />
          </View>
        </View>
      </View>

      <View style={styles.mainFeatures}>
        <View style={styles.buttonPrimary}>
          <TouchableOpacity onPress={() => console.log("FUXCK")} style={styles.buttonContent}>
            <Text style={styles.buttonText}>Watch How To Use App</Text>
            <View style={styles.solidArrowRight} />
          </TouchableOpacity>
        </View>
        <View style={styles.subNav}>
          <View style={styles.vidTitle}>
            <Text style={styles.subNavText}>Today's Workout</Text>
            <Text style={styles.vidTitleText}>(25)</Text>
          </View>

          <View style={styles.moreVertical}>
            <View style={styles.moreVerticalLine} />
            <View style={styles.moreVerticalLine} />
            <View style={styles.moreVerticalLine} />
          </View>
        </View>
        <View style={styles.frameContainer}>
          <Image source={require("../../assets/images/homevidthumb.png")} style={styles.vidThumb} />
          <View style={styles.frameContent}>
            <View style={styles.frameContentUpper}>
              <View style={styles.fitnessInfo}>
                <View style={styles.fitnessIcon}>
                  <Image source={require("../../assets/images/homeclockicon.png")} />
                </View>
                <Text style={styles.fitnessText}>25min</Text>
              </View>
              <View style={styles.fitnessInfo}>
                <View style={styles.fitnessIcon}>
                  <Image source={require("../../assets/images/homefireicon.png")} />
                </View>
                <Text style={styles.fitnessText}>412kcal</Text>
              </View>
            </View>
            <View style={styles.frameContentLower}>
              <View style={styles.frameText}>
                <Text style={styles.frameTitle}>Upper Strength 2</Text>
                <View style={styles.frameSubtitle}>
                  <Text style={styles.frameSubtitleText}>8 Series Workout</Text>
                  <View style={styles.tagMaster}>
                    <Text style={styles.tagText}>INTENSE</Text>
                  </View>
                </View>
              </View>
              <View>
                <Image source={require("../../assets/images/homeplaybtn.png")} />
              </View>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.liveCallsBtn} onPress={() => Linking.openURL("https://www.zoom.com/us")}>
        <Image source={require("../../assets/images/WhiteCalendar.png")} style={styles.whiteCalendar} />
        <Text style={styles.liveCallsBtnText}>Next Live Call Is In 7 Hours With Jeff Mayweather</Text>
      </TouchableOpacity>

      <View style={styles.fitnessCalendar}>
        <Image source={require("../../assets/images/CalendarMockup.png")} style={styles.calendarMockup} />
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: "10%",
            gap: 5,
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 5,
              width: 5,
              backgroundColor: "#256CD0",
              borderRadius: 2,
            }}
          />
          <Text style={{ fontSize: 12 }}>Call with Jeff Mayweather at 9:00 PM</Text>
        </View>
      </View>

      <View style={styles.coachBooking}>
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
                <Text style={styles.coachBookingTitle}>1 on 1 Online Coaching</Text>
                <Text style={styles.coachBookingSubtitle}>Custom Coaching</Text>
                <Text style={styles.coachBookingDesc}>
                  Bring your training to the next level with one on one custom coaching
                </Text>
              </View>
            </View>
            <View style={styles.coachBookingChevronRight}>
              <Image source={require("../../assets/images/Graychevronright.png")} />
            </View>
          </View>
        </View>
        <View style={styles.coachBookingItem}>
          <View style={styles.coachBookingContent}>
            <View style={styles.coachBookingImage}>
              <Image source={require("../../assets/images/Homefood.png")} />
            </View>
            <View style={styles.coachBookingText}>
              <View style={styles.coachBookingTextUpper}>
                <Text style={styles.coachBookingTitle}>Ultimate Nutrition Plan</Text>
                <Text style={styles.coachBookingSubtitle}>Get the top nutrition to fuel your training</Text>
                <Text style={styles.coachBookingDesc}>
                  Created by the nutritionist for Ronda Rousey, Rampage Jackson & Vitor Belfort
                </Text>
              </View>
            </View>
            <View style={styles.coachBookingChevronRight}>
              <Image source={require("../../assets/images/Graychevronright.png")} />
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
                <Text style={styles.coachBookingSubtitle}>Post Workout Recovery Drink</Text>
                <Text style={styles.coachBookingDesc}>
                  Bring your training to the next level with one on one custom coaching
                </Text>
              </View>
            </View>
            <View style={styles.coachBookingChevronRight}>
              <Image source={require("../../assets/images/Graychevronright.png")} />
            </View>
          </View>
        </View>
      </View>

      <View style={styles.mealPlan}>
        <View style={styles.mealPlanHeader}>
          <Text style={styles.mealPlanTitle}>My Fitness Pal Stats</Text>
        </View>
        <View style={styles.mealPlanItem}>
          <Image source={require("../../assets/images/Homesalad.png")} style={styles.homeSalad} />
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
                      <Image source={require("../../assets/images/homefireicon.png")} />
                    </View>
                    <Text style={styles.mealPlanInfoText}>548kcal</Text>
                  </View>
                  <View style={styles.mealPlanInfoDivider} />
                  <View style={styles.mealPlanInfoItem}>
                    <View style={styles.mealPlanInfoIcon}>
                      <Image source={require("../../assets/images/homeclockicon.png")} />
                    </View>
                    <Text style={styles.mealPlanInfoText}>20min</Text>
                  </View>
                </View>
              </View>
              <View>
                <Image source={require("../../assets/images/homeorangearrow.png")} />
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    position: "relative",
  },
  headerImage: {
    position: "absolute",
    top: 0,
    resizeMode: "stretch",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    width: Dimensions.get("window").width,
  },
  headerInfo: {
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
    marginTop: 90,
  },
  profilePicture: {
    width: 64,
    height: 64,
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
  polygonStroke: {
    width: 10,
    height: 10,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: "#FFFFFF",
    transform: [{ rotate: "45deg" }],
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
  calendarContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  calendarIcon: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(255, 255, 255, 0.64)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
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
    marginRight: 4,
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
    width: 20,
    height: 20,

    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
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
});

export default HomeSc;
