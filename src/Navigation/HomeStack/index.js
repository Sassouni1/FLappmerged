import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../../Screens/Auth/Login';
import MyDrawer from '../drawer';
import Help from '../../Screens/Help';
import Payment from '../../Screens/PaymentMethod';
import ContactUs from '../../Screens/ContactUs';
import Profile from '../../Screens/Myprofile';
import Message from '../../Screens/Message';
// import WarmSession from '../../Screens/Workouts/WarmSession';
import UpdateProfiles from '../../Screens/UpdateProfile';
import Equipments from '../../Screens/Equipment/Equipments';
import EquipmentDetails from '../../Screens/Equipment/EquipmentDetails';
import AddNewEquipments from '../../Screens/Equipment/AddNewEquipments';
// import Fastpacedwalking from '../../Screens/Workouts/Fastpacedwalking';
// import Fastpacedwalking1 from '../../Screens/Workouts/Fastpacedwalking1';
import CoachSubscription from '../../Screens/Equipment/CoachSubscription';
import GroupsName from '../../Screens/Group/GroupsName';
import SelectedGroup from '../../Screens/Group/SelectedGroup';
import GroupDayWorkOuts from '../../Screens/Group/GroupDayWorkouts';
import WarmUpSession from '../../Screens/Group/Warmupsession';
// import WorkoutDetail from '../../Screens/Group/WorkoutDetail';
// import WorkoutDetail1 from '../../Screens/Group/WorkoutDetail1';
import EditEquipment from '../../Screens/Equipment/EditEquipment';
// import PastDayWorkouts from '../../Screens/Workouts/PastDayWorkouts';
import ConversationScreen from '../../Screens/Message/conversation';
// import TodaysProgress from '../../Screens/Workouts/TodaysProgress';
import OTP from '../../Screens/Auth/OTP';
// import RelaxDay from '../../Screens/Workouts/Relaxday';
// import CompletedTask from '../../Screens/Workouts/completedTask';
// import EditedWorkout from '../../Screens/Workouts/EditedWorkout';
import Sleepquality from '../../Screens/SurveyScreen/Sleepquality';
import Mood from '../../Screens/SurveyScreen/Mood';
import Energy from '../../Screens/SurveyScreen/Energy';
import Stress from '../../Screens/SurveyScreen/Stress';
import Soreness from '../../Screens/SurveyScreen/Soreness';
import { useSelector } from 'react-redux';
import ChangePassword from '../../Screens/ChangePassword';
import AddCard from '../../Screens/AddCard';
import VideoSkills from '../../Screens/Skills/Video';
import AppCommunity from '../../Screens/Messages/AppCommunity';
import WorkoutHistory from '../../Screens/Workouts/WorkoutHistory';
import WorkoutSet from '../../Screens/Workouts/WorkoutSet';
import WorkoutSucessfully from '../../Screens/Workouts/WorkoutSuccessfully';
import ViewProgram from '../../Screens/Workouts/ViewProgram';
import StartWorkout from '../../Screens/StartWorkout';
import PrivacyPolicy from '../../Screens/PrivacyPolicy';
import AllMember from '../../Screens/Messages/AppCommunity/AllMember';
import TermOfUse from '../../Screens/TermOfUse';
import About from '../../Screens/About';
import CompleteWorkout from '../../Screens/Workouts/CompleteWorkout';
import SubmittedWorkouts from '../../Screens/Workouts/SubmittedWorkouts';
import Notification from '../../Screens/Notifications';

const stack = createNativeStackNavigator();
const HomeStack = () => {
  const user = useSelector(state => state.auth.userData);


  return (
    <stack.Navigator initialRouteName={"Home"} screenOptions={{headerShown: false}}>
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
        name="Profile"
        component={Profile}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="AppCommunity"
        component={AppCommunity}
      />
      {/* <stack.Screen
        options={{
          headerShown: false,
        }}
        name="DayWorkOuts"
        component={DayWorkOuts}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="PastDayWorkouts"
        component={PastDayWorkouts}
      /> */}
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
      name='ChangePassword'
      options={{
        headerShown: false,
      }}
      component={ChangePassword}/>
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Equipments"
        component={Equipments}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="EquipmentDetails"
        component={EquipmentDetails}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="AddNewEquipments"
        component={AddNewEquipments}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="CoachSubscription"
        component={CoachSubscription}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="AddCard"
        component={AddCard}
      />
      {/* <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Fastpacedwalking"
        component={Fastpacedwalking}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Fastpacedwalking1"
        component={Fastpacedwalking1}
      /> */}
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="GroupsName"
        component={GroupsName}
      />
      {/* <stack.Screen
       options={{
        headerShown: false,
      }}
      name="GroupsName"
      component={GroupsName}
      /> */}
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="SelectedGroup"
        component={SelectedGroup}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="GroupDayWorkOuts"
        component={GroupDayWorkOuts}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="WarmUpSession"
        component={WarmUpSession}
      />
      {/* <stack.Screen
        options={{
          headerShown: false,
        }}
        name="WorkoutDetail"
        component={WorkoutDetail}
      /> */}
      {/* <stack.Screen
        options={{
          headerShown: false,
        }}
        name="WorkoutDetail1"
        component={WorkoutDetail1}
      /> */}
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="EditEquipment"
        component={EditEquipment}
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
      {/* <stack.Screen
        options={{
          headerShown: false,
        }}
        name="TodaysProgress"
        component={TodaysProgress}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="RelaxDay"
        component={RelaxDay}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="CompletedTask"
        component={CompletedTask}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="EditedWorkout"
        component={EditedWorkout}
      /> */}
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Sleepquality"
        component={Sleepquality}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Mood"
        component={Mood}
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
        name="Energy"
        component={Energy}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Stress"
        component={Stress}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Soreness"
        component={Soreness}
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
