import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Pressable,
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

const VideoSkills = ({ data }) => {
  const video = data?.video;
  const name = data?.Name;
 // console.log(video);
  const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);

  var Video_id;

  if (video?.includes("https://youtu.be/")) {
    Video_id = video.split("https://youtu.be/")[1];
  } else {
    Video_id = video?.split("v=")[1];
  }

 // console.log(Video_id);

  var ampersandPosition = Video_id?.indexOf("&");
  if (ampersandPosition !== -1) {
    Video_id = Video_id?.substring(0, ampersandPosition);
  }

 // console.log(Video_id);

  // var Video_id = video?.split("https://youtu.be/")[1];
  // console.log(Video_id);
  // var ampersandPosition = Video_id?.indexOf("&");
  // if (ampersandPosition !== -1) {
  //   Video_id = Video_id?.substring(0, ampersandPosition);
  // }

  // const youtubeEmbedUrl = `https://www.youtube.com/embed/${video_id}?autoplay=1&controls=0`;

  // const onMessage = (event) => {
  //   const data = JSON.parse(event.nativeEvent.data);
  //   setIsPlaying(data.event === "stateChange" && data.info.playerState === 1);
  // };
  const youtubePlayerRef = useRef(null);
  // useEffect(() => {
  //   if (isPlaying) {
  //     console.log("Video is playing");
  //   } else {
  //     console.log("Video is paused or stopped");
  //   }
  // }, [isPlaying]);
  // const getYouTubeHTML = (VideoUrl) => {
  //   return `
  //     <html>
  //       <body>
  //         <iframe
  //           width="100%"
  //           height="100%"
  //           src="${VideoUrl}"
  //           frameborder="0"
  //           allowfullscreen
  //         ></iframe>
  //       </body>
  //     </html>
  //   `;
  // };
  return (
    <View style={{ flex: 1, backgroundColor: "rgba(51, 51, 51, 1)",borderRadius:30 }}>
      <View style={styles.mainCon}>
        <View style={{ width: getWidth(100), height: getHeight(30) }}>
          {/* <WebView
            source={{ html: getYouTubeHTML(youtubeEmbedUrl) }}
            onMessage={onMessage}
            style={{
              height: getHeight(30),
              width: getWidth(100),
              backgroundColor: "black",
            }}
          /> */}
          <YoutubePlayer
            ref={youtubePlayerRef}
            height={400}
            play={isPlaying}
            videoId={Video_id}
            // useLocalHTML={() => getYouTubeHTML}
            initialPlayerParams={{ controls: 0 }}
          />
          <View style={styles.overlay}>
            <TouchableOpacity
              style={{
                width: "100%",
                height: "97.5%",

                backgroundColor: isPlaying
                  ? "rgba(255,255,255,0) 100%"
                  : "rgba(155,155,155,0.22825630252100846) 100%",
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
                  <TouchableOpacity
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
                  </TouchableOpacity>
                  <Text
                    style={{
                      textAlign: "left",
                      fontSize: getFontSize(3),
                      fontWeight: 700,
                      color: "white",
                      width: getWidth(40),
                      // marginTop: getHeight(10),
                      marginBottom: getHeight(2),
                    }}
                  >
                    {name}
                  </Text>
                  {/* <Text
                    style={{
                      textAlign: "left",
                      fontSize: getFontSize(2.5),
                      fontWeight: 400,
                      color: "white",
                    }}
                  >
                    description
                  </Text> */}
                  {/* <Text style={styles.description}>{description}</Text> */}
                  {/* Add your custom actions here */}
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
