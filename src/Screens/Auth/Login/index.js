import React, { useState, useRef } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import Button from "../../../Components/Button";
import { validateFields } from "../../../../utils/validation/validate-fields";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import { styles } from "./style";
import { getFontSize, getHeight, getWidth } from "../../../../utils/ResponsiveFun";
import { useDispatch } from "react-redux";
import { loginRequest } from "../../../Redux/actions/AuthActions";
import validator from "../../../../utils/validation/validator";
import { GernalStyle } from "../../../constants/GernalStyle";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../../../constants/colors";
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
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
  const [hidePass, setHidePass] = useState(true);
  const login = async () => {
    const { email, password } = state;
    const emailError = await validator("email", email);
    const passwordError = await validator("password", password);
    if (!emailError && !passwordError) {
      dispatch(setLoader(true));
      dispatch(
        loginRequest({ email: email, password: password, role: "customer" })
      );
    } else {
      dispatch(setLoader(false));
      setState({ ...state, emailError, passwordError });
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
 <KeyboardAwareScrollView
          // contentContainerStyle={{height: getHeight(40)}}

          showsVerticalScrollIndicator={false}
        >
      <Text style={styles.txt}>DaruStrong</Text>

      <View style={styles.mainview}>
        <Text style={styles.txt2}>
          Welcome,{"\n"}
          <Text style={{ color: "rgba(189, 189, 189, 1)" }}>
            Login to continue
          </Text>
        </Text>

       
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
            onSubmitEditing={() => inputRefs["password"].current.focus()}
            onChangeText={(email) => changeHandler("email", email.trim())}
            blurOnSubmit={false}
          />
          <Text style={GernalStyle.InputError}>{state.emailError}</Text>
          <TextInput
            mode="outlined"
            // label="Password"
            label={<Text style={GernalStyle.inputLabelStyle}>Password</Text>}
            theme={{ roundness: 10 }}
            outlineColor="rgba(189, 189, 189, 1)"
            cursorColor="rgba(189, 189, 189, 1)"
            textColor="rgba(189, 189, 189, 1)"
            activeUnderlineColor="rgba(189, 189, 189, 1)"
            activeOutlineColor="rgba(189, 189, 189, 1)"
            style={GernalStyle.input}
            ref={inputRefs.password}
            value={state.password}
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
            onFocus={() => setState({ ...state, passwordError: "" })}
            onBlur={() =>
              validateFields(state.password, "password", (error) =>
                setState({ ...state, passwordError: error })
              )
            }
            onSubmitEditing={() => login()}
            onChangeText={(password) =>
              changeHandler("password", password.trim())
            }
            blurOnSubmit={false}
          />

          <Text style={GernalStyle.InputError}>{state.passwordError}</Text>

          <View style={styles.forgotView}>
            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={styles.forgottext}>Forgot password?</Text>
            </TouchableOpacity>
          </View>

          <Button
            onPress={() => login()}
            text="Login"
            btnStyle={{ ...GernalStyle.btn, marginTop: getHeight(5),backgroundColor:colors.buttonColor }}
            btnTextStyle={GernalStyle.btnText}
          />

          {/* <View
            style={{
              alignSelf: "center",
              width: getWidth(90),
              height: getHeight(6),
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
              backgroundColor:colors.buttonColor
            }}
          >
            <TouchableOpacity 
             onPress={() => login()}>
<Text>Login</Text>
            </TouchableOpacity>
          </View> */}
      </View>
      </KeyboardAwareScrollView>

    </View>
  );
};

export default Login;
