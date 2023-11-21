import React, { Component, useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, FlatList, Alert } from "react-native";
import moment from "moment";
import Modal from "react-native-modal";
import { Colors, Divider, RadioButton } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

import styles from "./styles";

import Button from "../../Components/Button";
import Header from "../../Components/Header";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { ApiCall, GetApiCallWithHeader } from "../../Services/Apis";
import { useDispatch, useSelector } from "react-redux";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import { setLoader } from "../../Redux/actions/GernalActions";
import { GernalStyle } from "../../constants/GernalStyle";
import { colors } from "../../constants/colors";
import HeaderBottom from "../../Components/HeaderBottom";
import messaging from "@react-native-firebase/messaging";

// create a component

// export const requestUserPermission = async token => {
//   const authStatus = await messaging().requestPermission();
//   const enabled =
//     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//   if (enabled) {
//     getFcmToken(token);
//   }
// };
// export const getFcmToken = async token => {
//   try {
//     // if (fcmToken == null) {
//     const fcmtoken = await messaging().getToken();
//     sendFcm(token, fcmtoken);
//     console.log('fcmToken is genrated', fcmtoken);

//     // }
//   } catch (error) {
//     console.log('error in featchin fcmToken', error?.message);
//     alert(error?.message);
//   }
// };
export const requestUserPermission = async (token) => {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      await messaging().registerDeviceForRemoteMessages(); // Register for remote messages
      await getFcmToken(token);
    }
  } catch (error) {
    console.log("Error requesting permission:", error?.message);
    Alert.alert("Error requesting permission:", error?.message);
  }
};

export const getFcmToken = async (token) => {
  try {
    const fcmtoken = await messaging().getToken();
    // sendFcm(token, fcmtoken);
    console.log("fcmToken is generated", fcmtoken);
  } catch (error) {
    console.log("Error fetching fcmToken:", error);
    Alert.alert("Error fetching fcmToken:", error?.message);
  }
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
        //console.log("notifications data", res?.response);
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
    requestUserPermission(token);
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
            //  style={{ alignSelf: "center", marginRight: getWidth(2) }}
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
                You have no any Notification Now
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
                    <Text numberOfLines={1} style={styles.heading}>
                      {item?.type}
                    </Text>
                    <Text numberOfLines={2} style={styles.paragraph}>
                      {item?.notification}
                    </Text>
                    <Text style={styles.Time}>
                      {moment(item?.createdAt).format("YYYY-MM-DD")}
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
