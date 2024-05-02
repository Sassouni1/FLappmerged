import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyDrawer from "../drawer";
import Help from "../../Screens/Help";
import ContactUs from "../../Screens/ContactUs";
import VideoScreen from "../../Screens/Skills/FolderVideo/videoScreen";
import UpdateProfiles from "../../Screens/UpdateProfile";
import ConversationScreen from "../../Screens/Message/conversation";
import OTP from "../../Screens/Auth/OTP";
import ChangePassword from "../../Screens/ChangePassword";
import VideoSkills from "../../Screens/Skills/Video";
import AppCommunity from "../../Screens/Messages/AppCommunity";
import WorkoutHistory from "../../Screens/Workouts/WorkoutHistory";
import WorkoutSet from "../../Screens/Workouts/WorkoutSet";
import WorkoutSucessfully from "../../Screens/Workouts/WorkoutSuccessfully";
import ViewProgram from "../../Screens/Workouts/ViewProgram";
import StartWorkout from "../../Screens/StartWorkout";
import PrivacyPolicy from "../../Screens/PrivacyPolicy";
import AllMember from "../../Screens/Messages/AppCommunity/AllMember";
import TermOfUse from "../../Screens/TermOfUse";
import About from "../../Screens/About";
import CompleteWorkout from "../../Screens/Workouts/CompleteWorkout";
import SubmittedWorkouts from "../../Screens/Workouts/SubmittedWorkouts";
import Notification from "../../Screens/Notifications";
import FolderVideo from "../../Screens/Skills/FolderVideo";
import ExerciseVideo from "../../Screens/Excersises/ExerciseVideo";
import ExSubFolder from "../../Screens/Excersises/ExSubFolder";
import SubFolder from "../../Screens/Skills/SubFolder";
import { useSelector } from "react-redux";
import AditionalWorkout from "../../Screens/AditionalWorkout";
import RestTimeScreen from "../../Screens/Workouts/RestTimeScreen";

const stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{ headerShown: false }}
    >
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="videoScreen"
        component={VideoScreen}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="VideoSkills"
        component={VideoSkills}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="AditionalWorkout"
        component={AditionalWorkout}
      />
    
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="ExSubFolder"
        component={ExSubFolder}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="SubFolder"
        component={SubFolder}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Home"
        component={MyDrawer}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="About"
        component={About}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Help"
        component={Help}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="ContactUs"
        component={ContactUs}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="AppCommunity"
        component={AppCommunity}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="ConversationScreen"
        component={ConversationScreen}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="AllMember"
        component={AllMember}
      />

      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="UpdateProfiles"
        component={UpdateProfiles}
      />
      <stack.Screen
        name="ChangePassword"
        options={{
          headerShown: false,
        }}
        component={ChangePassword}
      />

      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="FolderVideo"
        component={FolderVideo}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="ExerciseVideo"
        component={ExerciseVideo}
      />

      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="WorkoutHistory"
        component={WorkoutHistory}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="SubmittedWorkouts"
        component={SubmittedWorkouts}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="WorkoutSet"
        component={WorkoutSet}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="CompleteWorkout"
        component={CompleteWorkout}
      />
       <stack.Screen
        options={{
          headerShown: false,
        }}
        name="RestTimeScreen"
        component={RestTimeScreen}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="WorkoutSucessfully"
        component={WorkoutSucessfully}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="ViewProgram"
        component={ViewProgram}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="StartWorkout"
        component={StartWorkout}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="TermOfUse"
        component={TermOfUse}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Notification"
        component={Notification}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="OTP"
        component={OTP}
      />
    </stack.Navigator>
  );
};

export default HomeStack;
