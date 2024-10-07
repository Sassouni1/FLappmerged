import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
  Dimensions
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import WebView from "react-native-webview";
import {
  getHeight,
  getWidth,
  getFontSize,
  uyt,
} from "../../../../utils/ResponsiveFun";
import YoutubePlayer from "react-native-youtube-iframe";
import Antdesign from "react-native-vector-icons/AntDesign";
const {height,width} = Dimensions.get("window");

const VideoSkills = ({ data }) => {
  const video = data?.video;
  const name = data?.Name;
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);

  var Video_id;

  if (video?.includes("https://youtu.be/")) {
    Video_id = video.split("https://youtu.be/")[1];
  } else {
    Video_id = video?.split("v=")[1];
  }


  var ampersandPosition = Video_id?.indexOf("&");
  if (ampersandPosition !== -1) {
    Video_id = Video_id?.substring(0, ampersandPosition);
  }

  const youtubePlayerRef = useRef(null);
  
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.mainCon}>
        <View style={{ width: getWidth(100), minHeight: height/3.3 }}>
          <YoutubePlayer
            ref={youtubePlayerRef}
            height={'100%'}
            // webViewStyle={{height:200}}
            play={isPlaying}
            videoId={Video_id}
            initialPlayerParams={{ controls: 0 }}
          />
          <View style={styles.overlay}>
            <TouchableOpacity
              style={{
                width: "100%",
                height: "97.5%",
                paddingLeft: getWidth(2.5),
              }}
              onPress={() => setIsPlaying(!isPlaying)}
            >
              {!isPlaying && (
                <View
                  style={{
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  {/* <TouchableOpacity
                    style={{
                      backgroundColor: "white",
                      width: getWidth(19.5),
                      height: getHeight(6.25),
                      borderRadius: getWidth(3),
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      top: getHeight(11.5),
                      bottom: 0,
                      left: getWidth(37),
                      right: 0,
                    }}
                    onPress={() => setIsPlaying(!isPlaying)}
                  >
                    <Antdesign size={30} name="caretright" color="black" />
                  </TouchableOpacity> */}
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: getFontSize(3),
                      fontWeight: 700,
                      color: "white",
                      width: getWidth(40),
                      marginBottom: getHeight(5),
                    }}
                  >
                    {name}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainCon: {
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // paddingBottom: getWidth(5),
    // paddingLeft: getWidth(2.5),
  },
  title: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
  actionText: {
    color: "white",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});

export default VideoSkills;
