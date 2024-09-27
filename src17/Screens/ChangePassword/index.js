import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { setLoader } from "../../Redux/actions/GernalActions";
import Toast from "react-native-simple-toast";
import validator from "../../../utils/validation/validator";
import { ApiCall } from "../../Services/Apis";
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
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showCnfPassword, setShowCnfPassword] = useState(false);
  const token = useSelector((state) => state.auth.userToken);

  const handlePasswordUpdate = async () => {
    const { oldPassword, newPassword, cnfrPassword } = state;
    const cnfrPasswordError = await validator("passwordC", cnfrPassword);
    const newPasswordError = await validator("passwordN", newPassword);
    const oldPasswordError = await validator("passwordO", oldPassword);
    if (
      !cnfrPasswordError &&
      !newPasswordError &&
      !oldPasswordError &&
      newPassword === cnfrPassword
    ) {
      dispatch(setLoader(true));
      const data = {
        new_password: newPassword,
        old_password: oldPassword,
        confirm_password: cnfrPassword,
      };
      updatePassword(data);
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
        setState({
          ...state,
          cnfrPasswordError: "Both Passwords do not match!",
        });
      }
    }
  };

  const updatePassword = async (param) => {
    try {
      const res = await ApiCall({
        route: "auth/change_password",
        token: token,
        params: param,
        verb: "put",
      });
      if (res?.status === "200") {
        navigation.goBack();
        Toast.show("Password Updated Successfully");
        dispatch(setLoader(false));
      } else {
        alert(res?.response?.message);
        dispatch(setLoader(false));
      }
    } catch (e) {
      dispatch(setLoader(false));
      console.log("Error changing password -- ", e.toString());
    }
  };

  const handleChange = (type, value) => setState({ ...state, [type]: value });

  return (
    <View style={styles.container}>
       <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
        >
          <Image
            source={require("../../assets/images/Monotone3chevron3left.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Change Password</Text>
      </View>

      <View style={styles.inputFieldsContainer}>
        <View style={styles.inputFieldContainer}>
          <Text style={styles.inputLabel}>Old Password</Text>
          <View style={styles.inputField}>
            <View style={styles.inputContent}>
              <TextInput
                style={styles.inputText}
                value={state.oldPassword}
                onChangeText={(value) => handleChange("oldPassword", value)}
                placeholder="*************"
                placeholderTextColor="#393C43"
                secureTextEntry={!showOldPassword}
                ref={inputRefs.oldPassword}
              />
              <Pressable onPress={() => setShowOldPassword(!showOldPassword)}>
                <MaterialCommunityIcons
                  name={showOldPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#393C43"
                />
              </Pressable>
            </View>
            <Text style={styles.errorText}>{state.oldPasswordError}</Text>
          </View>
        </View>

        <View style={styles.inputFieldContainer}>
          <Text style={styles.inputLabel}>New Password</Text>
          <View style={styles.inputField}>
            <View style={styles.inputContent}>
              <TextInput
                style={styles.inputText}
                value={state.newPassword}
                onChangeText={(value) => handleChange("newPassword", value)}
                placeholder="*************"
                placeholderTextColor="#393C43"
                secureTextEntry={!showNewPassword}
                ref={inputRefs.newPassword}
              />
              <Pressable onPress={() => setShowNewPassword(!showNewPassword)}>
                <MaterialCommunityIcons
                  name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#393C43"
                />
              </Pressable>
            </View>
            <Text style={styles.errorText}>{state.newPasswordError}</Text>
          </View>
        </View>

        <View style={styles.inputFieldContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputField}>
            <View style={styles.inputContent}>
              <TextInput
                style={styles.inputText}
                value={state.cnfrPassword}
                onChangeText={(value) => handleChange("cnfrPassword", value)}
                placeholder="*************"
                placeholderTextColor="#393C43"
                secureTextEntry={!showCnfPassword}
                ref={inputRefs.cnfrPassword}
              />
              <Pressable onPress={() => setShowCnfPassword(!showCnfPassword)}>
                <MaterialCommunityIcons
                  name={showCnfPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#393C43"
                />
              </Pressable>
            </View>
            <Text style={styles.errorText}>{state.cnfrPasswordError}</Text>
          </View>
        </View>
      </View>

      <Pressable style={styles.primaryButton} onPress={handlePasswordUpdate}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Update Password</Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={24}
            color="#FFFFFF"
          />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#111214",
    height: 204,
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    position: "relative",
  },
  headerContainer: {
    backgroundColor: "#1c1c1c",
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  backBtn: {
    // position: "absolute",
    // left: 20,
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
headerText: {
    fontFamily: "Work Sans",
    fontWeight: "700",
    fontSize: 22,
    lineHeight: 21,
    textAlign: "left",
    // marginRight: 130,
    // letterSpacing: -0.004,
    color: "#FFFFFF",
  },
  inputFieldsContainer: {
    marginHorizontal: 16,
    marginTop: 20,
    gap: 10,
    paddingBottom: 24,
  },
  inputFieldContainer: {
    marginBottom: 16,
    gap: 10,
  },
  inputLabel: {
    fontFamily: "Work Sans",
    fontWeight: "700",
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.002,
    color: "#111214",
  },
  inputField: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 16,
    gap: 10,
    width: "100%",
    height: 56,
    backgroundColor: "#F3F3F4",
    borderRadius: 19,
  },
  inputContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  inputText: {
    fontFamily: "Work Sans",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: 1,
    color: "#393C43",
    flex: 1,
  },
  errorText: {
    color: "#ff5252",
  },
  primaryButton: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "95%",
    height: 56,
    backgroundColor: "#111214",
    borderRadius: 19,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  buttonText: {
    fontFamily: "Work Sans",
    fontWeight: "600",
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.003,
    color: "#FFFFFF",
  },
});

export default ChangePassword;
