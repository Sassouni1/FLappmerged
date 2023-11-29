import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { Divider, TextInput } from "react-native-paper";
import Button from "../../Components/Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import { styles } from "./styles";
import { validateFields } from "../../../utils/validation/validate-fields";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GernalStyle } from "../../constants/GernalStyle";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/actions/GernalActions";
import Toast from "react-native-simple-toast";
import validator from "../../../utils/validation/validator";
import { getFontSize, getWidth, getHeight } from "../../../utils/ResponsiveFun";
import { ApiCall } from "../../Services/Apis";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import Header from "../../Components/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { colors } from "../../constants/colors";
import HeaderBottom from "../../Components/HeaderBottom";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useFocusEffect } from "@react-navigation/native";

const ChangePassword = ({ navigation }) => {
  const dispatch = useDispatch();
  const inputRefs = {
    oldPassword: useRef(null),
    newPassword: useRef(null),
    cnfrPassword: useRef(null),
  };
  const [state, setState] = useState({
    oldPassword: "",
    oldPasswordError: "",
    newPassword: "",
    newPasswordError: "",
    cnfrPassword: "",
    cnfrPasswordError: "",
  });
  useFocusEffect(
    React.useCallback(() => {
      setState({
        oldPassword: "",
        oldPasswordError: "",
        newPassword: "",
        newPasswordError: "",
        cnfrPassword: "",
        cnfrPasswordError: "",
      });
    }, [])
  );
  const [hidePass, setHidePass] = useState(true);
  const [hideNewPass, setHideNewPass] = useState(true);
  const [hideCnfPass, setHideCnfPass] = useState(true);
  const token = useSelector((state) => state.auth.userToken);
  const PasswordUpdate = async () => {
    const { oldPassword, newPassword, cnfrPassword } = state;
    const cnfrPasswordError = await validator("passwordC", cnfrPassword);
    const newPasswordError = await validator("passwordN", newPassword);
    const oldPasswordError = await validator("passwordO", oldPassword);
    if (
      !cnfrPasswordError &&
      !newPasswordError &&
      !oldPasswordError &&
      newPassword == cnfrPassword
    ) {
      dispatch(setLoader(true));
      const data = {
        new_password: newPassword,
        old_password: oldPassword,
        confirm_password: cnfrPassword,
      };
      update(data);
    } else {
      if (newPasswordError || cnfrPasswordError || oldPasswordError) {
        setState({
          ...state,
          cnfrPasswordError,
          newPasswordError,
          oldPasswordError,
        });
        return;
      } else {
        setState({ ...state, cnfrPasswordError: "Both Password not matched!" });
      }
    }
  };
  const update = async (param) => {
    try {
      const res = await ApiCall({
        route: "auth/change_password",
        token: token,
        params: param,
        verb: "put",
      });
      if (res?.status == "200") {
        navigation.goBack();
        Toast.show("Password Update Sucessfuly");
        dispatch(setLoader(false));
      } else {
        console.log("err", res?.status);
        alert(res?.response?.message);
        dispatch(setLoader(false));
      }
    } catch (e) {
      dispatch(setLoader(false));
      console.log("saga error change password -- ", e.toString());
    }
  };
  const changeHandler = (type, value) => setState({ ...state, [type]: value });

  const eye = <FontAwesome name="eye" size={20} color={"white"} />;

  const eyeSlash = <FontAwesome name="eye-slash" size={20} color={"white"} />;

  return (
    <View
      style={{ ...GernalStyle.continer, backgroundColor: colors.homeColor }}
    >
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <View style={{ backgroundColor: colors.primary }}>
        <HeaderBottom
          title={"Change Password"}
          LeftIcon={
            <Ionicons
              style={{ alignSelf: "center", marginRight: getWidth(2) }}
              name={"arrow-back"}
              size={25}
              color={"#ffff"}
              onPress={() => navigation.goBack()}
            />
          }
          RightIcon={<View style={{ marginRight: getFontSize(4) }} />}
        />
        <Divider style={styles.headerDivider} />
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={{
          height: getHeight(100),
          marginTop: getHeight(5),
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <TextInput
            mode="outlined"
            label={
              <Text style={GernalStyle.inputLabelStyle}>Old password</Text>
            }
            theme={{ roundness: getFontSize(0.5) }}
            outlineColor="#BDC3C4"
            activeUnderlineColor="#BDC3C4"
            activeOutlineColor="#BDC3C4"
            textColor="white"
            style={GernalStyle.input}
            ref={inputRefs.oldPassword}
            value={state.oldPassword}
            returnKeyType={"send"}
            secureTextEntry={hidePass ? true : false}
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name={hidePass ? "eye-off-outline" : "eye-outline"}
                    size={getFontSize(3)}
                    color={"#ffff"}
                    style={styles.icon}
                    onPress={() => setHidePass(!hidePass)}
                  />
                )}
              />
            }
            onFocus={() => setState({ ...state, oldpasswordError: "" })}
            onBlur={() =>
              validateFields(state.oldPassword, "passwordO", (error) =>
                setState({ ...state, oldpasswordError: error })
              )
            }
            onSubmitEditing={() => inputRefs["newPassword"].current.focus()}
            onChangeText={(oldPassword) =>
              changeHandler("oldPassword", oldPassword.trim())
            }
            blurOnSubmit={false}
          />
          <Text style={{ ...GernalStyle.InputError, marginLeft: getWidth(8) }}>
            {state.oldPasswordError}
          </Text>
        </View>
        <View>
          <TextInput
            mode="outlined"
            //label="New password"
            label={
              <Text style={GernalStyle.inputLabelStyle}>New password</Text>
            }
            theme={{ roundness: getFontSize(0.5) }}
            outlineColor="#BDC3C4"
            activeUnderlineColor="#BDC3C4"
            activeOutlineColor="#BDC3C4"
            textColor="white"
            style={GernalStyle.input}
            ref={inputRefs.newPassword}
            value={state.newPassword}
            returnKeyType={"send"}
            secureTextEntry={hideNewPass ? true : false}
            // right={
            //   <TextInput.Icon
            //     name={hideNewPass ? eye : eyeSlash}
            //     size={getFontSize(2.5)}
            //     color={"blue"}
            //     style={styles.icon}
            //     onPress={() => setHideNewPass(!hideNewPass)}
            //   />
            // }
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name={hideNewPass ? 'eye-off-outline' : 'eye-outline'}
                    size={getFontSize(3)}
                    color={"#ffff"}
                    style={styles.icon}
                    onPress={() => setHideNewPass(!hideNewPass)}
                  />
                )}
              />
            }
            onFocus={() => setState({ ...state, newpasswordError: "" })}
            onBlur={() =>
              validateFields(state.newPassword, "newPassword", (error) =>
                setState({ ...state, newPasswordError: error })
              )
            }
            onSubmitEditing={() => inputRefs["cnfrPassword"].current.focus()}
            onChangeText={(newPassword) =>
              changeHandler("newPassword", newPassword.trim())
            }
            blurOnSubmit={false}
          />

          <Text style={{ ...GernalStyle.InputError, marginLeft: getWidth(8) }}>
            {state.newPasswordError}
          </Text>
        </View>
        <View>
          <TextInput
            mode="outlined"
            // label="Confirm password"
            label={
              <Text style={GernalStyle.inputLabelStyle}>Confirm password</Text>
            }
            theme={{ roundness: getFontSize(0.5) }}
            outlineColor="#BDC3C4"
            activeUnderlineColor="#BDC3C4"
            activeOutlineColor="#BDC3C4"
            textColor="white"
            style={GernalStyle.input}
            ref={inputRefs.cnfrPassword}
            value={state.cnfrPassword}
            returnKeyType={"send"}
            secureTextEntry={hideCnfPass ? true : false}
            right={
              <TextInput.Icon
                icon={() => (
                  <MaterialCommunityIcons
                    name={hideCnfPass ? "eye-off-outline" : "eye-outline"}
                    size={getFontSize(3)}
                    color={"#fff"}
                    style={styles.icon}
                    onPress={() => setHideCnfPass(!hideCnfPass)}
                  />
                )}
              />
            }
            // right={
            //   <TextInput.Icon
            //     name={hideCnfPass ? eye : eyeSlash}
            //     size={getFontSize(2.5)}
            //     color={"blue"}
            //     style={styles.icon}
            //     onPress={() => setHideCnfPass(!hideCnfPass)}
            //   />
            // }
            onFocus={() => setState({ ...state, cnfrPasswordError: "" })}
            onBlur={() =>
              validateFields(state.cnfrPassword, "passwordC", (error) =>
                setState({ ...state, cnfrPasswordError: error })
              )
            }
            onSubmitEditing={() => PasswordUpdate()}
            onChangeText={(cnfrPassword) =>
              changeHandler("cnfrPassword", cnfrPassword.trim())
            }
            blurOnSubmit={false}
          />

          <Text style={{ ...GernalStyle.InputError, marginLeft: getWidth(8) }}>
            {state.cnfrPasswordError}
          </Text>
        </View>
        </KeyboardAwareScrollView>
        {/* <View
          style={{
            bottom: getHeight(5),
            justifyContent: "flex-end",
            alignItems: "center",
            alignSelf: "center",
            marginTop: getFontSize(50),
          }}
        > */}
          <Button
            onPress={() => PasswordUpdate()}
            text="Update Password"
            btnStyle={{
              ...GernalStyle.btn,
              backgroundColor: colors.buttonColor,
              position: "absolute",
              bottom: getHeight(5),
            }}
            btnTextStyle={GernalStyle.btnText}
          />
        {/* </View> */}
    
    </View>
  );
};
export default ChangePassword;
