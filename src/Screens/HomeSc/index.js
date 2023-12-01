import React, { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  FlatList,
  ScrollView,
  ImageBackground,
  StatusBar,
} from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { styles } from "./styles";
import Header from "../../Components/Header";
import { useDispatch, useSelector } from "react-redux";
import HeaderBottom from "../../Components/HeaderBottom";
import { colors } from "../../constants/colors";
import Ionicons from "react-native-vector-icons/Ionicons";
import Video from "react-native-video";
import Notification, {
  appListner,
  requestUserPermission,
} from "../Notifications";
import { useNavigation } from "@react-navigation/native";
import { getSingleUser } from "../../Redux/actions/AuthActions";
import { ApiCall } from "../../Services/Apis";
import { setLoader } from "../../Redux/actions/GernalActions";

const HomeSc = ({ navigation, route }) => {
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const videoRef = useRef(null);
  const videoRefFaq = useRef(null);
  const videoRef3 = useRef(null);
  const videoRef4 = useRef(null);

  const [adminAlert, setAdminAlert] = useState("");

  const [isPaused, setIsPaused] = useState(true);
  const [isPausedFaq, setIsPausedFaq] = useState(true);
  const [isPaused3, setIsPaused3] = useState(true);
  const [isPaused4, setIsPaused4] = useState(true);

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

  const playVideo3 = () => {
    if (videoRef3.current) {
      //videoRef.current.presentFullscreenPlayer();
      videoRef3.current.seek(0);
      videoRef3.current.resume();
      setIsPaused3(false); // Video is playing, update state
    }
  };

  const pauseVideo3 = () => {
    if (videoRef3.current) {
      videoRef3.current.pause(); // Pause the video
      setIsPaused3(true); // Update state to reflect video pause
    }
  };

  const playVideo4 = () => {
    if (videoRef4.current) {
      //videoRef.current.presentFullscreenPlayer();
      videoRef4.current.seek(0);
      videoRef4.current.resume();
      setIsPaused4(false); // Video is playing, update state
    }
  };

  const pauseVideo4 = () => {
    if (videoRef4.current) {
      videoRef4.current.pause(); // Pause the video
      setIsPaused4(true); // Update state to reflect video pause
    }
  };

  const getAdminAlert = async () => {
    try {
      const res = await ApiCall({
        route: `admin/get_alert`,
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        console.log("admin response", res?.response);
        setAdminAlert(res?.response?.admin);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log("errorrrr in calenders");
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  // const navigation = useNavigation()

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

  const Workout = ({ paragraphtext, headingText, subheading }) => {
    return (
      <View style={{ ...styles.eliteCon, marginBottom: getHeight(1.5) }}>
        <View style={{ ...styles.eliteCon, marginBottom: getHeight(1.5) }}>
          <View style={styles.imageCon}>
            <Image
              resizeMode="center"
              style={styles.image}
              source={require("../../assets/images/home3.png")}
            />
            <View
              style={{
                height: getHeight(5),
                width: getWidth(43),
                marginLeft: getWidth(3),
              }}
            >
              <Text style={styles.elite}>{headingText}</Text>
              <Text style={styles.custom}>{subheading}</Text>
            </View>
            <View style={{ ...styles.greenbtn, backgroundColor: colors.white }}>
              <Text style={{ ...styles.call, color: colors.secondary }}>
                Shop
              </Text>
            </View>
          </View>
          <Text
            style={{
              ...styles.paragraph,
              textAlign: "left",
              marginRight: getWidth(6),
              lineHeight: 16,
            }}
          >
            {paragraphtext}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.contaner}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="rgba(51, 51, 51, 1)"
          translucent={true}
        />

        {/* <ImageBackground
          resizeMode="cover"
          source={require("../../assets/images/home1.png")}
          style={styles.img}
        > */}
        <View style={{ flex: 1 }}>
          <Video
            source={require("../../assets/images/background.mp4")}
            resizeMode="cover"
            repeat={true}
            style={styles.img}
          />
          <View
            style={{
              flex: 1,
              position: "absolute",
              bottom: getHeight(2),
              left: getWidth(2.5),
            }}
          >
            <Text style={styles.welcome}>Welcome to DaruStrong</Text>
          </View>
        </View>
        <View
          style={{
            // width: getWidth(90),
            height: getHeight(5),
            // backgroundColor: colors.homeConColor,
            width: getWidth(96),
            backgroundColor: colors.homeConColor,
            alignSelf: "center",
            borderRadius: 7,
            justifyContent: "center",
            alignItems: "center",
            marginTop: getFontSize(2),
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              size={20}
              color={"white"}
              name="calendar"
              style={{ paddingRight: getFontSize(1) }}
            />
            <Text
              style={{
                color: colors.white,
                fontSize: getFontSize(2),
                fontFamily: "ubuntu",
              }}
            >
              {adminAlert}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              flex: 1,
              alignItems: "center",
              marginTop: getFontSize(2),
            }}
          >
            <View>
              {/* <Video
                source={require("../../assets/images/background.mp4")}
                resizeMode="cover"
                // repeat={true}
                style={styles.imgHome}
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
                  style={styles.imgHome}
                  paused={isPaused}
                />
              </TouchableOpacity>
              <Text style={styles.VideoText}>Welcome to Fight Life</Text>
            </View>
            <View>
              {/* <Video
                source={require("../../assets/images/background.mp4")}
                resizeMode="cover"
                // repeat={true}
                style={styles.imgHome}
              /> */}
              <TouchableOpacity
                onPress={isPausedFaq ? playVideoFaq : pauseVideoFaq}
                activeOpacity={1}
              >
                <Video
                  ref={videoRefFaq}
                  source={require("../../assets/images/background.mp4")}
                  resizeMode="cover"
                  repeat={false}
                  style={styles.imgHome}
                  paused={isPausedFaq}
                />
              </TouchableOpacity>
              <Text style={styles.VideoText}>How to Use App</Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              flex: 1,
              alignItems: "center",
              marginTop: getFontSize(2),
            }}
          >
            <View>
              {/* <Video
                source={require("../../assets/images/background.mp4")}
                resizeMode="cover"
                // repeat={true}
                style={styles.imgHome}
              /> */}
              <TouchableOpacity
                onPress={isPaused3 ? playVideo3 : pauseVideo3}
                activeOpacity={1}
              >
                <Video
                  ref={videoRef3}
                  source={require("../../assets/images/background.mp4")}
                  resizeMode="cover"
                  repeat={false}
                  style={styles.imgHome}
                  paused={isPaused3}
                />
              </TouchableOpacity>
              <Text style={styles.VideoText}>Meet your Strength Coach</Text>
            </View>
            <View>
              {/* <Video
                source={require("../../assets/images/background.mp4")}
                resizeMode="cover"
                // repeat={true}
                style={styles.imgHome}
              /> */}
              <TouchableOpacity
                onPress={isPaused4 ? playVideo4 : pauseVideo4}
                activeOpacity={1}
              >
                <Video
                  ref={videoRef4}
                  source={require("../../assets/images/background.mp4")}
                  resizeMode="cover"
                  repeat={false}
                  style={styles.imgHome}
                  paused={isPaused4}
                />
              </TouchableOpacity>
              <Text style={styles.VideoText}>Everything You Need to Know</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            ...styles.eliteCon,
            marginBottom: getHeight(1.5),
            marginTop: getHeight(1.4),
          }}
        >
          <View style={styles.imageCon}>
            <Image
              resizeMode="center"
              style={styles.image}
              source={require("../../assets/images/home2.png")}
            />
            <View style={styles.eliteconnn}>
              <Text style={styles.elite}>Elite VIP</Text>
              <Text style={styles.custom}>Custom coaching</Text>
            </View>
            <View style={styles.greenbtn}>
              <Text style={styles.call}>Schedule call</Text>
            </View>
          </View>
          <Text style={styles.paragraph}>
            Bring your training to the next level with one on one custom
            coaching
          </Text>
          <Text style={styles.para2}>
            and with Coach Phil Daru or your own Daru Strong Certified Coach.
          </Text>
          <Text style={styles.nutration}>
            - Nutrition Custom Coaching - Accountability
          </Text>
          <Text style={{ ...styles.live, marginBottom: getHeight(2) }}>
            - Live Video Calls
          </Text>
        </View>
        <Workout
          headingText={"Post workout"}
          subheading={"Recovery Drink"}
          paragraphtext={
            "Bring your training to the next level with one on one custom coaching and with Coach Phil Daru or your own Daru Strong Certified Coach. Bring your training to the next level with one on one custom coaching and with Coach Phil Daru or your own Daru Strong Certified Coach."
          }
        />
        <Workout
          headingText={"Daru Strong"}
          subheading={"Nutrition"}
          paragraphtext={
            "Bring your training to the next level with one on one custom coaching and with Coach Phil Daru or your own Daru Strong Certified Coach."
          }
        />
      </ScrollView>
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: getFontSize(5.5), //27.7
          left: getWidth(3.5),
        }}
      >
        <Entypo
          size={30}
          color={"white"}
          onPress={() => navigation.openDrawer()}
          name="menu"
          style={{ marginLeft: getFontSize(-0.7) }}
        />
      </View>
    </View>
  );
};
export default HomeSc;
