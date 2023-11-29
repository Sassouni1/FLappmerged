import {
  View,
  Text,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useRef, useState } from "react";
import { colors } from "../../constants/colors";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import GeneralStatusBar from "../../Components/GeneralStatusBar";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import Header from "../../Components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import HeaderBottom from "../../Components/HeaderBottom";
import Video from "react-native-video";

const Help = () => {
  const navigation = useNavigation();
  const videoRef = useRef(null);
  const videoRefFaq = useRef(null);
  

  const [isPaused, setIsPaused] = useState(true);
  const [isPausedFaq, setIsPausedFaq] = useState(true);

  const playVideo = () => {
    if (videoRef.current) {
      //videoRef.current.presentFullscreenPlayer();
      videoRef.current.seek(0);
      videoRef.current.resume();
      setIsPaused(false); // Video is playing, update state
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the video
      setIsPaused(true); // Update state to reflect video pause
    }
  };

  const playVideoFaq = () => {
    if (videoRefFaq.current) {
     // videoRef.current.presentFullscreenPlayer();
      videoRefFaq.current.seek(0);
      videoRefFaq.current.resume();
      setIsPausedFaq(false); // Video is playing, update state
    }
  };

  const pauseVideoFaq = () => {
    if (videoRefFaq.current) {
      videoRefFaq.current.pause(); // Pause the video
      setIsPausedFaq(true); // Update state to reflect video pause
    }
  };
  return (
    <View style={{ backgroundColor: colors.primary, flex: 1 }}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <HeaderBottom
        title={"Help"}
        LeftIcon={
          <Ionicons
            style={{ alignSelf: "center", marginRight: getWidth(2) }}
            name={"arrow-back"}
            size={25}
            color={"#ffff"}
            onPress={() => navigation.goBack()}
          />
        }
        RightIcon={<View style={{ marginLeft: getFontSize(4) }} />}
      />
      {/* <AppHeader heading={'Help'} onPress={() => navigation.goBack()} /> */}
      <KeyboardAwareScrollView>
        <View
          style={{ paddingHorizontal: getWidth(4), marginTop: getFontSize(2) }}
        >
          <View style={styles.btnCon}>
            <Text style={styles.text}>How to use app?</Text>
          </View>
          {/* <ImageBackground
            resizeMode="stretch"
            blurRadius={1}
            source={require("../../assets/images/home1.png")}
            style={styles.img}
            borderRadius={getFontSize(2)}
          > */}
          {/* <View style={styles.playerbtn}> */}
          {/* <Ionicons
                style={{ alignSelf: "center", marginRight: getWidth(2) }}
                name={"play"}
                size={35}
                color={"#ffff"}
                onPress={() =>
                  navigation.navigate("VideoSkills", {
                    video: "https://www.youtube.com/watch?v=5JFDAwfF01E",
                    name: "How to use App",
                  })
                }
              /> */}
          <TouchableOpacity
            onPress={isPaused ? playVideo : pauseVideo}
            activeOpacity={1}
          >
            <Video
              ref={videoRef}
              source={require("../../assets/images/background.mp4")}
              resizeMode="cover"
              repeat={false}
              style={{ ...styles.img }}
              paused={isPaused}
            />
          </TouchableOpacity>
          {/* </View>
          </ImageBackground> */}
        </View>
        <View style={{ paddingHorizontal: getWidth(4) }}>
          <View style={{ ...styles.btnCon, marginTop: getHeight(6) }}>
            <Text style={styles.text}>Important FAQs</Text>
          </View>
          {/* <ImageBackground
            blurRadius={1}
            resizeMode="stretch"
            source={require("../../assets/images/home1.png")}
            style={styles.img}
            borderRadius={getFontSize(2)}
          > */}
          {/* <View style={styles.playerbtn}>
                <PlayerSvg height={20} width={20} />
              </View> */}
          {/* <View style={styles.playerbtn}> */}
          {/* <Ionicons
                style={{ alignSelf: "center", marginRight: getWidth(2) }}
                name={"play"}
                size={35}
                color={"#ffff"}
                onPress={() =>
                  navigation.navigate("VideoSkills", {
                    video: "https://www.youtube.com/watch?v=5JFDAwfF01E",
                    name: "Important FAQ",
                  })
                }
              /> */}
          {/* </View>
          </ImageBackground> */}
          <TouchableOpacity
            onPress={isPausedFaq ? playVideoFaq : pauseVideoFaq}
            activeOpacity={1}
          >
            <Video
              ref={videoRefFaq}
              source={require("../../assets/images/background.mp4")}
              resizeMode="cover"
              repeat={false}
              style={{ ...styles.img }}
              paused={isPausedFaq}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Help;
