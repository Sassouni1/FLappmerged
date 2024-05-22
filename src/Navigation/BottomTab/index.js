import React from "react";
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
          backgroundColor: "#0B0B0D",
          height: getFontSize(9),
          paddingBottom: getFontSize(2.5),
          paddingTop: getFontSize(0.5),
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
          tabBarIcon: ({ focused, color, size }) => (
            <Foundation
              name="home"
              size={getFontSize(2.7)}
              style={{ marginTop: getFontSize(1) }}
              color={focused ? "#F79300" : "white"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Workouts"
        // component={user?.plan_id?WorkoutHistory:Workouts}
        component={user?.isAssigned === true ? Workouts : Workouts}
        initialParams={user?.isAssigned === true ? { data: "tab2" } : { data: "tab1" }}
        options={{
          headerShown: false,

          title: "Workouts",
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo
              name="man"
              size={getFontSize(2.5)}
              style={{ marginTop: getFontSize(1) }}
              color={focused ? "#F79300" : "white"}
            />
          ),
          tabBarItemStyle: {
            right: getFontSize(0.8),
          },
        }}
      />
      <Tab.Screen
        name="Skills"
        // component={Skills}
        component={SkillsTraining}
        options={{
          headerShown: false,
          title: "Skills",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
              name="hand-rock"
              size={getFontSize(2.5)}
              style={{ marginTop: getFontSize(1) }}
              color={focused ? "#F79300" : "white"}
            />
          ),
          tabBarItemStyle: {
            right: getFontSize(1.5),
          },
        }}
      />
      <Tab.Screen
        name="Exercises"
        component={Excercises}
        options={{
          headerShown: false,

          title: "Exercises",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome6
              name="bolt-lightning"
              size={getFontSize(2.4)}
              style={{ marginTop: getFontSize(1) }}
              color={focused ? "#F79300" : "white"}
            />
          ),
          tabBarItemStyle: {
            right: getFontSize(2),
          },
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          headerShown: false,
          title: "Messages",
          tabBarIcon: ({ focused, color, size }) => (
            <Entypo
              name="message"
              size={getFontSize(3)}
              style={{ marginTop: getFontSize(1) }}
              color={focused ? "#F79300" : "white"}
            />
          ),
          tabBarItemStyle: {
            right: getFontSize(1.5),
          },
        }}
      />

      <Tab.Screen
        name="LeaderBoard"
        component={LeaderBoard}
        options={{
          headerShown: false,
          title: "LeaderBoard",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name="trophy-variant"
              size={25}
              style={{ marginTop: getFontSize(1) }}
              color={focused ? "#F79300" : "white"}
            />
          ),
          tabBarItemStyle: {
            right: getFontSize(0.5),
          },
        }}
      />

      <Tab.Screen
        name="Activity"
        component={Activity}
        options={{
          headerShown: false,
          title: "Activity",
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialIcons
              name="bar-chart"
              size={getFontSize(3.5)}
              style={{ marginTop: getFontSize(1), right: getFontSize(0.2) }}
              color={focused ? "#F79300" : "white"}
            />
          ),
          tabBarItemStyle: {
            right: getFontSize(0.2),
          },
        }}
      />
    </Tab.Navigator>
  );
}
