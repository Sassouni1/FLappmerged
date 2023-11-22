import React, { useEffect, useState } from "react";
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
import Notification, { requestUserPermission } from "../Notifications";

const HomeSc = ({ navigation, route }) => {
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);

  useEffect(()=>{
    requestUserPermission(token)
  },[])

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
          {/* <HeaderBottom
          title={""}
          LeftIcon={
            <Entypo
              size={30}
              color={"white"}
              onPress={() => navigation.openDrawer()}
              name="menu"
              style={{ marginLeft: getFontSize(-0.7) }}
            />
          }
          RightIcon={<View />}
        /> */}

        

          {/* } */}

          {/* <View
          style={{
            flex: 1,
            justifyContent: "center",
            marginBottom: getFontSize(5),
          }}
        >
          <View style={styles.playerbtn}>
            <Ionicons
              style={{ alignSelf: "center" }}
              name={"play"}
              size={35}
              color={"#ffff"}
              onPress={() =>
                navigation.navigate("VideoSkills", {
                  video: "https://www.youtube.com/watch?v=5JFDAwfF01E",
                  name: "DaruStrong",
                })
              }
            />
          </View>
        </View> */}
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
        {/* </ImageBackground> */}
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
              top: getFontSize(5.5),//27.7
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
