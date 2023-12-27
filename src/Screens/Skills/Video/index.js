import { View, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import { colors } from "../../../constants/colors";
import {
  getHeight,
  getWidth,
  getFontSize,
} from "../../../../utils/ResponsiveFun";
import WebView from "react-native-webview";
import Seprator from "../../../Components/Seprator";
import HeaderBottom from "../../../Components/HeaderBottom";
import Ionicons from "react-native-vector-icons/Ionicons";

const VideoSkills = ({ route }) => {
  const { video, name } = route?.params;
  const navigation = useNavigation();
  var video_id = video?.split("v=")[1];
  var ampersandPosition = video_id?.indexOf("&");
  if (ampersandPosition !== -1) {
    video_id = video_id?.substring(0, ampersandPosition);
  }
  const isYouTubeUrl = video?.includes("www.youtube.com");

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(51, 51, 51, 1)" }}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(51, 51, 51, 1)"
      />
      <HeaderBottom
        title={name}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name={"arrow-back"} size={25} color={"white"} />
          </TouchableOpacity>
        }
        RightIcon={<View style={{ marginRight: getFontSize(2.5) }} />}
      />
      <View style={styles.mainCon}>
        {isYouTubeUrl ? (
          <View style={{ width: getWidth(100), height: getHeight(35) }}>
            <WebView
              source={{
                uri: `https://www.youtube.com/embed/${video_id}?autoplay=1`,
              }}
              style={{
                height: getHeight(30),
                width: getWidth(100),
                backgroundColor: colors.primary,
              }}
            />

            <Seprator />
          </View>
        ) : (
          <View style={{ width: getWidth(100), height: getHeight(35) }}>
            <WebView
              source={{ uri: video }}
              style={{
                height: getHeight(30),
                width: getWidth(100),
                backgroundColor: colors.primary,
              }}
            />
          </View>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  playerbtn: {
    height: getHeight(6),
    width: getWidth(12),
    borderRadius: getWidth(12) / 2,
    backgroundColor: colors.graytext4,
    opacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  mainCon: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginBottom: getHeight(7),
  },
  img: {
    width: getWidth(100),
    height: getHeight(33),
    justifyContent: "center",
    alignItems: "center",
  },
});
export default VideoSkills;
