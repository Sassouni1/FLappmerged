import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet,ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { validateFields } from "../../../../utils/validation/validate-fields";
import { useDispatch } from "react-redux";
import { loginRequest,setLoginData } from "../../../Redux/actions/AuthActions";
import validator from "../../../../utils/validation/validator";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFocusEffect } from "@react-navigation/native";
import randomstring from 'randomstring';
import {put} from 'redux-saga/effects';
import {ApiCall} from '../../../Services/Apis';

const SignUp = ({ navigation }) => {
  const dispatch = useDispatch();
  const [hidePass, setHidePass] = useState(true);

  const inputRefs = {
    email: useRef(null),
    password: useRef(null),
  };
  const [state, setState] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  });
  useFocusEffect(
    React.useCallback(() => {
      setState({
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
      });
    }, [])
  );

    
    const onClickSignUp = async () => {
        const { email, password } = state;
        const emailError = await validator("email", email);
        const passwordError = await validator("password", password);
        if (!emailError && !passwordError) {
            let obj = {
                email: email,
                password: password,
                weight: 0,
                height: 0
            }
            try {
                dispatch(setLoader(true));
                const res = await ApiCall({
                    params: obj,
                    route: "admin/add_client",
                    verb: "post",
                });
                if (res.status == 200 || res?.response?.message == 'Email already exist') {
                    dispatch(
                        loginRequest({ email: email, password: password, role: "customer", isGuestUser: true })
                    );
                }
                else {
                    dispatch(setLoader(false));
                }
            }
            catch (e) {
                dispatch(setLoader(false));
            }
        } else {
            dispatch(setLoader(false));
            setState({ ...state, emailError, passwordError });
        }
    };
  const generateRendomPassword =()=>{
    const generatedString = randomstring.generate(6);
    setState({ ...state, password: generatedString });
  }

  const changeHandler = (type, value) => setState({ ...state, [type]: value });
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require("../../../assets/images/jakajake.jpg")}
        style={styles.backgroundImage}
      />
      <Image
        source={require("../../../assets/images/22212.png")}
        style={styles.backgroundImageCover}
      />

      <View style={styles.content}>
        <View style={styles.frame}>
          <View style={styles.iconContainer}>
            <Image
              source={require("../../../assets/images/Frame.png")}
              style={styles.icon}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>LogIn as guest user To Fight Life</Text>
            <Text style={styles.subtitle}>Train Like a World Champion</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputContent}>
              <View style={styles.inputText}>
                <Image
                  source={require("../../../assets/images/Monotoneemail.png")}
                  style={styles.inputIcon}
                />
                <TextInput
                  mode="outlined"
                  label={
                    <Text style={styles.inputPlaceholder}>Email Address</Text>
                  }
                  theme={{ roundness: 19 }}
                  outlineColor="#F3F3F4"
                  activeOutlineColor="#F3F3F4"
                  style={styles.input}
                  ref={inputRefs.email}
                  value={state.email}
                  returnKeyType={"next"}
                  keyboardType="email-address"
                  onFocus={() => setState({ ...state, emailError: "" })}
                  onBlur={() =>
                    validateFields(state.email, "email", (error) =>
                      setState({ ...state, emaiolError: error })
                    )
                  }
                  onSubmitEditing={() => inputRefs["password"].current.focus()}
                  onChangeText={(email) => changeHandler("email", email.trim())}
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>
          {state.emailError && (
            <Text style={styles.errorText}>{state.emailError}</Text>
          )}

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContent}>
              <View style={styles.inputText}>
                <Image
                  source={require("../../../assets/images/Monotonelockpassword.png")}
                  style={styles.inputIcon}
                />
                <TextInput
                  mode="outlined"
                  label={<Text style={styles.inputPlaceholder}>Password</Text>}
                  theme={{ roundness: 19 }}
                  outlineColor="#F3F3F4"
                  editable={false}
                  activeOutlineColor="#F3F3F4"
                  style={styles.input}
                  ref={inputRefs.password}
                  value={state.password}
                  returnKeyType={"send"}
                  secureTextEntry={hidePass ? true : false}
                  right={
                    <TextInput.Icon
                      icon={() => (
                        <MaterialCommunityIcons
                          name={hidePass ? "eye-off-outline" : "eye-outline"}
                          size={24}
                          color="#393C43"
                          onPress={() => setHidePass(!hidePass)}
                        />
                      )}
                    />
                  }
                  onFocus={() => setState({ ...state, passwordError: "" })}
                  onBlur={() =>
                    validateFields(state.password, "password", (error) =>
                      setState({ ...state, passwordError: error })
                    )
                  }
                  onChangeText={(password) =>
                    changeHandler("password", password.trim())
                  }
                  blurOnSubmit={false}
                />
              </View>
            </View>
          </View>
          {state.passwordError && (
            <Text style={styles.errorText}>{state.passwordError}</Text>
          )}

          <TouchableOpacity
            style={styles.forgotPasswordButton}
            onPress={() => generateRendomPassword()}
          >
            <Text style={styles.forgotPasswordText}>Generate Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => onClickSignUp()}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Sign In</Text>
              <Image
                source={require("../../../assets/images/Monotonearrowright.png")}
                style={styles.buttonIcon}
              />
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate("Login")}} style={styles.footerContainer}>
          <Text style={styles.footerText}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  backgroundImage: {
    position: "absolute",
    top: -285,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    resizeMode: "contain",
  },
  backgroundImageCover: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "49%",
    resizeMode: "cover",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 130,
  },
  frame: {
    alignItems: "center",
    marginBottom: 48,
  },
  iconContainer: {
    backgroundColor: "#FF8036",
    borderRadius: 16,
    padding: 8,
    marginBottom: 16,
  },
  icon: {
    width: 32,
    height: 32,
  },
  titleContainer: {
    alignItems: "center",
  },
  title: {
    fontFamily: "Work Sans",
    fontWeight: "700",
    fontSize: 30,
    lineHeight: 38,
    textAlign: "center",
    letterSpacing: -0.01,
    color: "#111214",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Work Sans",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 26,
    textAlign: "center",
    letterSpacing: -0.003,
    color: "#393C43",
  },
  formContainer: {
    marginBottom: 48,
    marginTop: -10,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontFamily: "Work Sans",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.002,
    color: "#111214",
    marginBottom: 8,
  },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F3F4",
    borderRadius: 19,
    paddingHorizontal: 16,
    paddingVertical: 5,
  },
  inputText: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  inputPlaceholder: {
    fontFamily: "Work Sans",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.003,
    color: "#393C43",
  },
  input: {
    flex: 1,
    fontFamily: "Work Sans",
    fontSize: 16,
    color: "#393C43",
    backgroundColor: "transparent",
    borderWidth: 0,
    paddingHorizontal: 0,
  },

  errorText: {
    fontFamily: "Work Sans",
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
  forgotPasswordButton: {
    // alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: "Work Sans",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.002,
    color: "#FF8036",
    textDecorationLine: "underline",
  },
  button: {
    backgroundColor: "#111214",
    borderRadius: 19,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Work Sans",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.003,
    color: "#FFFFFF",
    marginRight: 16,
  },
  buttonIcon: {
    width: 24,
    height: 24,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 48,
  },
  socialButton: {
    borderWidth: 1,
    borderColor: "#BABBBE",
    borderRadius: 19,
    padding: 8,
    marginHorizontal: 4,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  footerContainer: {
    alignItems: "center",
  },
  footerText: {
    fontFamily: "Work Sans",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.002,
    color: "#676C75",
    marginBottom: 16,
  },
});

export default SignUp;
