import React, { useState, useRef } from "react";
import {
  ScrollView,
  Text,
  View,
  Alert,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import { TextInput } from "react-native-paper";
import Button from "../../../Components/Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { validateFields } from "../../../../utils/validation/validate-fields";
import { GernalStyle } from "../../../constants/GernalStyle";
import { useDispatch } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { ApiCall } from "../../../Services/Apis";
import { setLoader } from "../../../Redux/actions/GernalActions";
import validator from "../../../../utils/validation/validator";
import { Forgot_Password } from "../../../Redux/actions/AuthActions";
import {
  getFontSize,
  getHeight,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import Header from "../../../Components/Header";
import SimpleToast from "react-native-simple-toast";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import HeaderBottom from "../../../Components/HeaderBottom";
import { colors } from "../../../constants/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const ForgotPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inputRefs = {
    email: useRef(null),
  };

  const [state, setState] = useState({
    emailError: "",
  });

  const forgot = async () => {
    const { email } = state;
    const emailError = await validator("email", email);
    if (!emailError) {
      dispatch(setLoader(true));
      const params = {
        email: email,
      };
      try {
        const res = await ApiCall({
          route: "auth/email_verification",
          verb: "put",
          params: params,
        });

        if (res?.status == "200") {
          navigation.navigate("OTP", { email });
          console.log("res", res?.response);
          SimpleToast.show(res?.response?.message);
          dispatch(setLoader(false));
        } else {
          console.log("error", res.response);
          dispatch(setLoader(false));
          SimpleToast.show(res?.response?.message);
        }
      } catch (e) {
        console.log("saga get language error -- ", e.toString());
      }
    } else {
      dispatch(setLoader(false));
      setState({
        ...state,
        emailError,
      });
      alert(
        res?.response?.message ? res?.response?.message : res?.response?.error
      );
    }
  };
  const changeHandler = (type, value) => setState({ ...state, [type]: value });

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(51, 51, 51, 1)" }}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(51, 51, 51, 1)"
      />
      <HeaderBottom
        title={"Forgot password?"}
        LeftIcon={
          <Ionicons
            style={{ alignSelf: "center", marginRight: getWidth(2) }}
            name={"arrow-back"}
            size={25}
            color={"white"}
            onPress={() => navigation.goBack()}
          />
        }
        RightIcon={<View style={{marginRight:getFontSize(4)}}/>}
      />
      <KeyboardAwareScrollView
          // contentContainerStyle={{height: getHeight(40)}}

          showsVerticalScrollIndicator={false}
        >
      <View style={styles.contaner}>
        <Text style={styles.stxt}>
          Enter your email address. We will send a verification email.
        </Text>

        {/* <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
          }}
        >
          <Text
            onPress={() => navigation.goBack()}
            style={{
              margin: getHeight(1.5),
              color: "white",
              fontSize: getFontSize(2.2),
            }}
          >
            <Ionicons
              name={"chevron-back"}
              color="white"
              size={getFontSize(2.5)}
            />
            Back
          </Text>
        </View> */}
        <View style={styles.mainview}>
          <View>
            <TextInput
              mode="outlined"
              // label="Email address"
              label={
                <Text style={GernalStyle.inputLabelStyle}>Email address</Text>
              }
              theme={{ roundness: 10 }}
              outlineColor="rgba(189, 189, 189, 1)"
              cursorColor="rgba(189, 189, 189, 1)"
              textColor="rgba(189, 189, 189, 1)"
              activeUnderlineColor="rgba(189, 189, 189, 1)"
              activeOutlineColor="rgba(189, 189, 189, 1)"
              style={GernalStyle.input}
              ref={inputRefs.email}
              value={state.email}
              returnKeyType={"next"}
              keyboardType="email-address"
              onFocus={() => setState({ ...state, emailError: "" })}
              onBlur={() =>
                validateFields(state.email, "email", (error) =>
                  setState({ ...state, emailError: error })
                )
              }
              onSubmitEditing={() => forgot()}
              onChangeText={(email) => changeHandler("email", email.trim())}
              blurOnSubmit={false}
            />
            <Text style={GernalStyle.InputError}>{state.emailError}</Text>
          </View>
        </View>
      </View>
      </KeyboardAwareScrollView>
      <Button
        onPress={() => forgot()}
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

export default ForgotPassword;
