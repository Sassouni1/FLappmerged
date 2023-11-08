import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome6  from 'react-native-vector-icons/FontAwesome6';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Foundation from 'react-native-vector-icons/Foundation';
import {getFontSize, getHeight} from '../../../utils/ResponsiveFun';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Profile from '../../Screens/Myprofile';
import Message from '../../Screens/Message';
import Groups from '../../Screens/Group/Groups';
import HomeSc from '../../Screens/HomeSc';
import ConversationScreen from '../../Screens/Message/conversation';
import Activity from '../../Screens/Activity';
import Excercises from '../../Screens/Excersises';
import Skills from '../../Screens/Skills';
import Messages from '../../Screens/Messages';
import Workouts from '../../Screens/Workouts';
import { useSelector } from 'react-redux';
import AddWorkouts from '../../Screens/Workouts/AddWorkouts';
import WorkoutHistory from '../../Screens/Workouts/WorkoutHistory';


const Tab = createBottomTabNavigator();

export default function BottomTab() {
  const user=useSelector((state)=>state.auth.userData)
  console.log('user',user)
  return (
    <Tab.Navigator

      tabBarOptions={{
        activeTintColor: '#F79300',
        inactiveTintColor: 'white',
       

        
     }}
      screenOptions={{
        
        tabBarStyle: {
          headerShown: false,
          backgroundColor:'#0B0B0D',
          // marginBottom:getHeight(1)
          height:getFontSize(9),
          // alignItems:'flex-start',
          // justifyContent:'space-evenly'
       
          paddingBottom:getFontSize(2.5),
          paddingTop:getFontSize(0.5)
        },
        
      }}
      options={{headerShown: false}}
   
      >
        <Tab.Screen
        name="Home"
        
        component={HomeSc}
        options={{
          headerShown: false,

          title: 'Home',
          tabBarIcon: ({focused, color, size}) => (
            <Foundation
              name="home"
              size={22}
              style={{marginTop:getFontSize(1)}}
              color={focused ? '#F79300' : 'white'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Workouts"
        component={user?.plan_id?WorkoutHistory:Workouts}
        options={{
          headerShown: false,

          title: 'Workouts',
          tabBarIcon: ({focused, color, size}) => (
            <Entypo
            name="man"
            size={22}
            style={{marginTop:getFontSize(1)}}
            color={focused ? '#F79300' : 'white'}
          />
          ),
        }}
      />
        <Tab.Screen
        name="Skills"
        component={Skills}
        options={{
          headerShown: false,

          title: 'Skills',
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome5
            name="hand-rock"
            size={22}
            style={{marginTop:getFontSize(1)}}
            color={focused ? '#F79300' : 'white'}
          />
          ),
        }}
      />
        <Tab.Screen
        name="Exercises"
        component={Excercises}
        options={{
          headerShown: false,

          title: 'Exercises',
          tabBarIcon: ({focused, color, size}) => (
            <FontAwesome6
            name="bolt-lightning"
            size={21}
            style={{marginTop:getFontSize(1)}}
            color={focused ? '#F79300' : 'white'}
          />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          headerShown: false,
          title: 'Messages',
          tabBarIcon: ({focused, color, size}) => (
            <Entypo
            name="message"
            size={23}
            style={{marginTop:getFontSize(1)}}
            color={focused ? '#F79300' : 'white'}
          />
          ),
        }}
      />

      <Tab.Screen
        name="Activity"
        component={Activity}
        tabBarOptions={{}}
        options={{
          headerShown: false,
          title: 'Activity',
          tabBarIcon: ({focused, color, size}) => (
            <MaterialIcons
            name="bar-chart"
            size={22}
            style={{marginTop:getFontSize(1)}}
            color={focused ? '#F79300' : 'white'}
          />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
