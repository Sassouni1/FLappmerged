import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Screens/Auth/Login";

import ForgotPassword from "../../Screens/Auth/ForgotPassword";

import MyDrawer from "../drawer";

import ResetPassword from "../../Screens/Auth/ResetPassword";
import OTP from "../../Screens/Auth/OTP";
import Screen1 from "../../Screens/Onboarding/Screen1";
import Screen2 from "../../Screens/Onboarding/Screen2";
import Screen3 from "../../Screens/Onboarding/Screen3";
import Screen4 from "../../Screens/Onboarding/Screen4";
import Screen5 from "../../Screens/Onboarding/Screen5";

import WelcomeChatScreen from "../../Screens/ChatBot/WelcomeChat";

const stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <stack.Navigator
      initialRouteName={"Screen1"}
      screenOptions={{ headerShown: false }}
    >
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Screen1"
        component={Screen1}
      />

      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Screen2"
        component={Screen2}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Screen3"
        component={Screen3}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Screen4"
        component={Screen4}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Screen5"
        component={Screen5}
      />

      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="Login"
        component={Login}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="MyDrawer"
        component={MyDrawer}
      />

      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <stack.Screen
        options={{
          headerShown: false,
        }}
        name="ResetPassword"
        component={ResetPassword}
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

export default AuthStack;
