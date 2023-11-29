import React, { useState, useRef } from "react";
import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradient from "react-native-linear-gradient";
import Button from "../../../Components/Button";
import { validateFields } from "../../../../utils/validation/validate-fields";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import { styles } from "./styles";
import {
  getFontSize,
  getHeight,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import { useDispatch, useSelector } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { loginRequest } from "../../../Redux/actions/AuthActions";
import validator from "../../../../utils/validation/validator";
import { GernalStyle } from "../../../constants/GernalStyle";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { ApiCall } from "../../../Services/Apis";
import Header from "../../../Components/Header";
import HeaderBottom from "../../../Components/HeaderBottom";
import { colors } from "../../../constants/colors";
const ResetPassword = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { email } = route?.params;
  console.log("route", route);
  const inputRefs = {
    newPassword: useRef(null),
    cpassword: useRef(null),
  };
  const [state, setState] = useState({
    newPassword: "",
    newPasswordError: "",
    cpassword: "",
    cpasswordError: "",
  });
  const [hidePass, setHidePass] = useState(true);
  const [hidePass2, setHidePass2] = useState(true);
  const Reset = async () => {
    const { newPassword, cpassword } = state;
    const newPasswordError = await validator("newPassword", newPassword);
    const cpasswordError = await validator("cpassword", cpassword);
    if (!newPasswordError && !cpasswordError && newPassword == cpassword) {
      dispatch(setLoader(true));
      try {
        const res = await ApiCall({
          params: {
            email: email,
            password: newPassword,
            confirm_password: cpassword,
          },
          route: "auth/reset_password",
          verb: "put",
        });

        if (res?.status == "200") {
          navigation.navigate("Login");
          console.log("res", res?.response);
          alert(res?.response?.message);
          dispatch(setLoader(false));
        } else {
          console.log("error", res.response);
          alert(res?.response?.message);
          dispatch(setLoader(false));
        }
      } catch (e) {
        console.log("saga reset password error -- ", e.toString());
      }
      // dispatch(loginRequest({newPassword: newPassword, cpassword: cpassword}));
    } else {
      dispatch(setLoader(false));
      if (newPasswordError || cpasswordError) {
        setState({ ...state, newPasswordError, cpasswordError });

        return;
      } else {
        setState({ ...state, cpasswordError: "Both Password not matched!" });
      }
    }
  };
  const changeHandler = (type, value) => setState({ ...state, [type]: value });
  return (
    <View style={styles.contaner}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(51, 51, 51, 1)"
        translucent={true}
      />

      <HeaderBottom
        title={"Reset password"}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={{ alignSelf: "center", marginRight: getWidth(2) }}
              name={"arrow-back"}
              size={25}
              color={"white"}
            />
          </TouchableOpacity>
        }
        RightIcon={<View style={{ marginRight: getFontSize(4.5) }} />}
      />

      <Text style={styles.stxt}>Reset your password</Text>
      <KeyboardAwareScrollView
        contentContainerStyle={{ height: getHeight(70) }}
        showsVerticalScrollIndicator={false}
      >
        <TextInput
          mode="outlined"
          // label="New password"
          label={<Text style={GernalStyle.inputLabelStyle}>New password</Text>}
          theme={{ roundness: 10 }}
          outlineColor="rgba(189, 189, 189, 1)"
          cursorColor="rgba(189, 189, 189, 1)"
          textColor="rgba(189, 189, 189, 1)"
          activeUnderlineColor="rgba(189, 189, 189, 1)"
          activeOutlineColor="rgba(189, 189, 189, 1)"
          style={GernalStyle.input}
          ref={inputRefs.newPassword}
          value={state.newPassword}
          returnKeyType={"next"}
          keyboardType="default"
          onFocus={() => setState({ ...state, newPasswordError: "" })}
          secureTextEntry={hidePass2 ? true : false}
          right={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={hidePass2 ? "eye-off-outline" : "eye-outline"}
                  size={getFontSize(3)}
                  color={"#ffff"}
                  style={styles.icon}
                  onPress={() => setHidePass2(!hidePass2)}
                />
              )}
            />
          }
          onBlur={() =>
            validateFields(state.newPassword, "newPassword", (error) =>
              setState({ ...state, newPasswordError: error })
            )
          }
          onSubmitEditing={() => inputRefs["cpassword"].current.focus()}
          onChangeText={(newPassword) =>
            changeHandler("newPassword", newPassword.trim())
          }
          blurOnSubmit={false}
        />
        <Text style={{ ...GernalStyle.InputError, marginLeft: getWidth(7) }}>
          {state.newPasswordError}
        </Text>
        <TextInput
          mode="outlined"
          // label="Confirm new password"
          label={
            <Text style={GernalStyle.inputLabelStyle}>
              Confirm new password
            </Text>
          }
          theme={{ roundness: 10 }}
          outlineColor="rgba(189, 189, 189, 1)"
          cursorColor="rgba(189, 189, 189, 1)"
          textColor="rgba(189, 189, 189, 1)"
          activeUnderlineColor="rgba(189, 189, 189, 1)"
          activeOutlineColor="rgba(189, 189, 189, 1)"
          style={GernalStyle.input}
          ref={inputRefs.cpassword}
          value={state.cpassword}
          returnKeyType={"send"}
          secureTextEntry={hidePass ? true : false}
          right={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons
                  name={hidePass ? "eye-off-outline" : "eye-outline"}
                  size={getFontSize(3)}
                  color={"#fff"}
                  style={styles.icon}
                  onPress={() => setHidePass(!hidePass)}
                />
              )}
            />
          }
          onFocus={() => setState({ ...state, cpasswordError: "" })}
          onBlur={() =>
            validateFields(state.cpassword, "cpassword", (error) =>
              setState({ ...state, cpasswordError: error })
            )
          }
          onSubmitEditing={() => Reset()}
          onChangeText={(cpassword) =>
            changeHandler("cpassword", cpassword.trim())
          }
          blurOnSubmit={false}
        />

        <Text style={{ ...GernalStyle.InputError, marginLeft: getWidth(7) }}>
          {state.cpasswordError}
        </Text>
      </KeyboardAwareScrollView>

      {/* <Button
        onPress={() => Reset()}
        text="Reset password"
        btnStyle={{
          ...GernalStyle.btn,
          position: "absolute",
          bottom: getHeight(5),
        }}
        btnTextStyle={GernalStyle.btnText}
      /> */}
      <Button
        onPress={() => Reset()}
        text="Reset password"
        btnStyle={{
          ...GernalStyle.btn,
          position: "absolute",
          bottom: getHeight(5),
          backgroundColor:colors.buttonColor
        }}
        btnTextStyle={GernalStyle.btnText}
      />
    </View>
  );
};
export default ResetPassword;
