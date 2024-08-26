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
import ExerciseDetail from "../../Screens/Excersises/ExerciseDetail"
import ExSubFolder from "../../Screens/Excersises/ExSubFolder";
import SubFolder from "../../Screens/Skills/SubFolder";
import { useSelector } from "react-redux";
import AditionalWorkout from "../../Screens/AditionalWorkout";
import RestTimeScreen from "../../Screens/Workouts/RestTimeScreen";

import Fitnesssurvey from "../../Screens/Fitnesssurvey";
import ChatScreen from "../../Screens/ChatBot/ChatScreen";
import BotAllChatScreen from "../../Screens/ChatBot/AllChats";
import CreateChatScreen from "../../Screens/ChatBot/CreateChat";
import TestChatSceen from "../../Screens/ChatBot/Testing";

import SearchWorkout from "../../Screens/Skills/SearchWorkout";
import WorkoutDetail from "../../Screens/Skills/WorkoutDetail";
import CoachDetail from "../../Screens/Skills/CoachDetail";
import LessonComplete from "../../Screens/Skills/LessonComplete";
import SearchCoach from "../../Screens/Skills/SearchCoach";
import TrainingStats from "../../Screens/TrainingStats";
import Achievements from "../../Screens/Achievements";
import LearningCenter from "../../Screens/SquatComponet/LearningCenter";
import WorkoutComplete from "../../Screens/SquatComponet/WorkoutComplete";
import ResetTimer from "../../Screens/SquatComponet/ResetTimer";
import Squat from "../../Screens/SquatComponet/Squat";
import Goal1 from "../../Screens/Fitnesssurvey/Goal1";
import ZEquipment from "../../Screens/Fitnesssurvey/ZEquipment";
import Weightgoals from "../../Screens/Fitnesssurvey/Weightgoals";

import WorkoutExercise from "../../Screens/Workouts/WorkoutExercise";
import AdditionalWorkoutSelected from "../../Screens/Workouts/AdditionalWorkoutSelected";

import AddWorkouts from "../../Screens/Workouts/AddWorkouts";
import AdditionalWorkout from "../../Screens/Workouts/AdditionalWorkout";

import HTUA from "../../Screens/HTUA";
import {SplashScreen} from "../../Screens/SplashScreen";

const stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <stack.Navigator
      initialRouteName={"SplashScreen"}
      screenOptions={{ headerShown: false }}
    >
       <stack.Screen
        options={{
          headerShown: false,
        }}
        name="SplashScreen"
        component={SplashScreen}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="HTUA"
        component={HTUA}
      />
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
        name="Goal"
        component={VideoSkills}
      />

      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Goal1"
        component={Goal1}
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
        name="ZEquipment"
        component={ZEquipment}
      />

      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Fitnesssurvey"
        component={Fitnesssurvey}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Weightgoals"
        component={Weightgoals}
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
        name="ExerciseDetail"
        component={ExerciseDetail}
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
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="SearchWorkout"
        component={SearchWorkout}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="WorkoutDetail"
        component={WorkoutDetail}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="CoachDetail"
        component={CoachDetail}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="LessonComplete"
        component={LessonComplete}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="SearchCoach"
        component={SearchCoach}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="TrainingStats"
        component={TrainingStats}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Achievements"
        component={Achievements}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="LearningCenter"
        component={LearningCenter}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="WorkoutComplete"
        component={WorkoutComplete}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="ResetTimer"
        component={ResetTimer}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Squat"
        component={Squat}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="ChatScreen"
        component={ChatScreen}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="BotAllChatScreen"
        component={BotAllChatScreen}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="CreateChatScreen"
        component={CreateChatScreen}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="TestChatSceen"
        component={TestChatSceen}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="WorkoutExercise"
        component={WorkoutExercise}
      />
       <stack.Screen
        options={{
          headerShown: false,
        }}
        name="AdditionalWorkoutSelected"
        component={AdditionalWorkoutSelected}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="AddWorkouts"
        component={AddWorkouts}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="AdditionalWorkout"
        component={AdditionalWorkout}
      />
    </stack.Navigator>
  );
};

export default HomeStack;
