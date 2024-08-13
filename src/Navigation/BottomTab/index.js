import React from "react";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Entypo from "react-native-vector-icons/Entypo";
import Foundation from "react-native-vector-icons/Foundation";
import { getFontSize, getHeight } from "../../../utils/ResponsiveFun";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Message from "../../Screens/Message";
import HomeSc from "../../Screens/HomeSc";
import ConversationScreen from "../../Screens/Message/conversation";
import Activity from "../../Screens/Activity";
import Excercises from "../../Screens/Excersises";
import Skills from "../../Screens/Skills";
import Messages from "../../Screens/Messages";
import Workouts from "../../Screens/Workouts";
import { useSelector } from "react-redux";
import AddWorkouts from "../../Screens/Workouts/AddWorkouts";
import WorkoutHistory from "../../Screens/Workouts/WorkoutHistory";
import LeaderBoard from "../../Screens/LeaderBoard";
import SkillsTraining from "../../Screens/Skills/SkillsTraining";

const Tab = createBottomTabNavigator();
const borderRadius = 30;
const backgroundColor = "#ffffff";
const shadowColor = "#000";
const tabBarActiveColor = "#F79300";
const tabBarActiveIconColor = "#000000";
const tabBarInActiveColor = "#808082";
const image = require("../../assets/images/tabbaricon.png");

const TabBarText = (title, focused) =>
  !focused ? (
    <Text
      style={{
        color: focused ? tabBarActiveColor : tabBarInActiveColor,
        fontSize: getFontSize(1.1),
      }}
    >
      {title}
    </Text>
  ) : null;
const TabBarIcon = ({ icon, focused }) =>
  focused ? (
    <ImageBackground
      source={image}
      resizeMode="cover"
      style={styles.iconContainerActive}
    >
      {icon}
    </ImageBackground>
  ) : (
    <View style={styles.iconContainerInActive}>{icon}</View>
  );
export default function BottomTab() {
  const user = useSelector((state) => state.auth.userData);
  console.log("user", user);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#F79300",
        inactiveTintColor: "white",
      }}
      screenOptions={{
        tabBarStyle: {
          headerShown: false,
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          backgroundColor: backgroundColor,
          height: getFontSize(9),
          paddingBottom: getFontSize(1.6),
          paddingTop: getFontSize(0.5),
          position: "absolute",
          overflow: "hidden",
          shadowColor: shadowColor,
          shadowOffset: {
            width: 100,
            height: 100,
          },
          shadowOpacity: 100,
          shadowRadius: 100,
          elevation: 100,
        },
      }}
      options={{ headerShown: false }}
    >
      <Tab.Screen
        name="HomeSc"
        component={HomeSc}
        options={{
          headerShown: false,
          title: "Home",
          tabBarLabel: ({ focused }) => TabBarText("Home", focused),
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              icon={
                <Foundation
                  name="home"
                  size={getFontSize(2.7)}
                  color={focused ? tabBarActiveIconColor : tabBarInActiveColor}
                />
              }
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Workouts"
        component={Workouts}
        initialParams={
          user?.isAssigned !== true ? { data: "tab2" } : { data: "tab1" }
        }
        options={{
          headerShown: false,
          title: "Workouts",
          tabBarLabel: ({ focused }) => TabBarText("Workouts", focused),
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              icon={
                <Entypo
                  name="man"
                  size={getFontSize(2.5)}
                  style={{ marginTop: getFontSize(1) }}
                  color={focused ? tabBarActiveIconColor : tabBarInActiveColor}
                />
              }
              focused={focused}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Skills"
        component={Skills}
        options={{
          headerShown: false,
          title: "Skills",
          tabBarLabel: ({ focused }) => (TabBarText('Skills',focused)),
          tabBarIcon: ({ focused, color, size }) => (
             <TabBarIcon
              icon={
                <FontAwesome5
                  name="hand-rock"
                  size={getFontSize(2.5)}
                  style={{ marginTop: getFontSize(1) }}
                  color={focused ? tabBarActiveIconColor : tabBarInActiveColor}
                />
              }
              focused={focused}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="SkillsTraining"
        component={SkillsTraining}
        options={{
          headerShown: false,
          title: "New Skills",
          tabBarLabel: ({ focused }) => TabBarText("New Skills", focused),
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              icon={
                <FontAwesome5
                  name="speakap"
                  size={getFontSize(2.5)}
                  // style={{ marginTop: getFontSize(1) }}
                  color={focused ? tabBarActiveIconColor : tabBarInActiveColor}
                />
              }
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={Excercises}
        options={{
          headerShown: false,

          title: "Exercises",
          tabBarLabel: ({ focused }) => TabBarText("Exercises", focused),
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              icon={
                <FontAwesome6
                  name="bolt-lightning"
                  size={getFontSize(2.4)}
                  // style={{ marginTop: getFontSize(1) }}
                  color={focused ? tabBarActiveIconColor : tabBarInActiveColor}
                />
              }
              focused={focused}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          headerShown: false,
          title: "Messages",
          tabBarLabel: ({ focused }) => TabBarText("Messages", focused),
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              icon={
                <Entypo
                  name="message"
                  size={getFontSize(3)}
                  // style={{ marginTop: getFontSize(1) }}
                  color={focused ? tabBarActiveIconColor : tabBarInActiveColor}
                />
              }
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="LeaderBoard"
        component={LeaderBoard}
        options={{
          headerShown: false,
          title: "LeaderBoard",
          tabBarLabel: ({ focused }) => TabBarText("LeaderBoard", focused),
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              icon={
                <MaterialCommunityIcons
                  name="trophy-variant"
                  size={25}
                  // style={{ marginTop: getFontSize(1) }}
                  color={focused ? tabBarActiveIconColor : tabBarInActiveColor}
                />
              }
              focused={focused}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          headerShown: false,
          title: "Activity",
          tabBarLabel: ({ focused }) => TabBarText("Activity", focused),
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon
              icon={
                <MaterialIcons
                  name="bar-chart"
                  size={getFontSize(3.5)}
                  // style={{ marginTop: getFontSize(1), right: getFontSize(0.2) }}
                  color={focused ? tabBarActiveIconColor : tabBarInActiveColor}
                />
              }
              focused={focused}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainerActive: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  iconContainerInActive: {
    height: 48,
    width: 48,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
  },
});
