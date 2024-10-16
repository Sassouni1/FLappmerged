import React, { Component, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import moment from "moment";
import { Divider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import styles from "./styles";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { ApiCall } from "../../Services/Apis";
import { useDispatch, useSelector } from "react-redux";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import { setLoader } from "../../Redux/actions/GernalActions";
import { GernalStyle } from "../../constants/GernalStyle";
import { colors } from "../../constants/colors";
import HeaderBottom from "../../Components/HeaderBottom";
import messaging from "@react-native-firebase/messaging";

export const requestUserPermission = async (token) => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await getFcmToken(token);
    } else {
      Alert.alert("Permission denied for notifications");
    }
  } catch (error) {
    console.log("Error requesting permission:", error?.message);
  }
};

export const getFcmToken = async (token) => {
  try {
    const apnsToken = await messaging().setAPNSToken("test");
    console.log("APNS token:", apnsToken);
    const fcmToken = await messaging().getToken();
    sendFcm(token, fcmToken);
    console.log("FCM token:", fcmToken);
    // Send fcmtoken to your server for sending notifications
  } catch (error) {
    console.log("Error fetching FCM token:", error?.message);
  }
};

const sendFcm = async (token, fcmtoken) => {
  try {
    const res = await ApiCall({
      route: "auth/update_fcm_token",
      token: token,
      params: { fcmToken: fcmtoken },
      verb: "put",
    });
    if (res?.status == "200") {
      console.log("fcm res == 200 ... ", res);
    } else {
      console.log("error in fcm api", res);
    }
  } catch (e) {
    console.log("saga error -- ", e.toString());
  }
};

export const appListner = async (navigation) => {
  messaging().onNotificationOpenedApp((remoteMessage) => {
    if (remoteMessage && remoteMessage.notification) {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
      if (remoteMessage.notification.title === "Message notification") {
        navigation.navigate("Messages");
      } else {
        console.log("else working");
      }
    } else {
      console.log("Remote message or notification is null");
    }
  });

  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage && remoteMessage.notification) {
        console.log(
          "Notification caused app to open from background state:",
          remoteMessage.notification
        );
        if (remoteMessage.notification.title === "Message notification") {
          navigation.navigate("Messages");
        } else if (
          remoteMessage.notification.title === "Workout notification"
        ) {
          navigation.navigate("Workouts", { data: "tab2" });
        } else {
          console.log("else working");
        }
      } else {
        console.log("Remote message or notification is null");
      }
    });

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    if (remoteMessage && remoteMessage.notification) {
      console.log(
        "Notification caused app to open from background state:",
        remoteMessage.notification
      );
      if (remoteMessage.notification.title === "Message notification") {
        navigation.navigate("Messages");
      } else if (remoteMessage.notification.title === "Workout notification") {
        navigation.navigate("Workouts", { data: "tab2" });
      } else {
        console.log("else working");
      }
    } else {
      console.log("Remote message or notification is null");
    }
  });

  messaging().onMessage(async (remoteMessage) => {
    if (remoteMessage) {
      console.log(
        "Notification caused app to open from quit state:",
        remoteMessage.notification
      );
      console.log("forground state", remoteMessage);
    }
  });
};
const Notification = ({ navigation }) => {
  const dispatch = useDispatch();
  const [DATA, SetDATA] = useState([]);
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);

  const getAllNotification = async () => {
    try {
      const res = await ApiCall({
        route: `notifications/all-notifications/${user?.user_id}`,
        token: token,
        verb: "get",
      });

      if (res?.status == "200") {
        console.log("notifications data", res?.status);
        SetDATA(res?.response?.list);
        dispatch(setLoader(false));
      } else {
        console.log("error", res.response);
        dispatch(setLoader(false));
      }
    } catch (e) {
      console.log("saga get notfication error -- ", e.toString());
    }
  };
  const getall = () => {
    dispatch(setLoader(true));
    getAllNotification();
  };
  useEffect(() => {
    getall();
  }, []);

  return (
    <View
      style={{ ...GernalStyle.continer, backgroundColor: colors.homeColor }}
    >
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <HeaderBottom
        title={"Notifications"}
        LeftIcon={
          <Ionicons
            style={{ alignSelf: "center", marginRight: getWidth(1) }}
            name={"arrow-back"}
            size={25}
            color={"#ffff"}
            onPress={() => navigation.goBack()}
          />
        }
        RightIcon={<View style={{ marginRight: getFontSize(3) }} />}
      />

      <View
        style={{
          ...GernalStyle.continer,
          backgroundColor: colors.homeColor,
          marginTop: getFontSize(1),
        }}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          refreshing={false}
          onRefresh={() => getall()}
          data={DATA}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={() => (
            <View
              style={{
                height: getHeight(70),
                width: getWidth(100),
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.white, fontSize: getFontSize(2) }}>
                You have no notifications right now
              </Text>
            </View>
          )}
          ItemSeparatorComponent={() => <Divider />}
          ListHeaderComponent={() => <View style={{ height: getHeight(2) }} />}
          ListFooterComponent={() => <View style={{ margin: getHeight(12) }} />}
          renderItem={({ item, index }) => (
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.card}>
                <View style={styles.RowView}>
                  <View style={styles.Iconbg}>
                    <MaterialCommunityIcons
                      name={"bell-ring-outline"}
                      size={30}
                      color={colors.buttonColor}
                    />
                  </View>
                  <View>
                    {/* <Text numberOfLines={1} style={styles.heading}>
                      {item?.type}
                    </Text> */}
                    <Text numberOfLines={2} style={styles.paragraph}>
                      {item?.notification}
                    </Text>
                    <Text style={styles.Time}>
                      {moment(item?.createdAt).format(
                        "dddd, MMMM Do YYYY [at] h:mm:ss a"
                      )}
                    </Text>
                  </View>
                  <View style={styles.active} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Notification;
