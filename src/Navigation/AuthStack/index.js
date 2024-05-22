import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../Screens/Auth/Login";

import ForgotPassword from "../../Screens/Auth/ForgotPassword";

import MyDrawer from "../drawer";

import ResetPassword from "../../Screens/Auth/ResetPassword";
import OTP from "../../Screens/Auth/OTP";

const stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <stack.Navigator initialRouteName={"Login"} screenOptions={{ headerShown: false }}>
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
