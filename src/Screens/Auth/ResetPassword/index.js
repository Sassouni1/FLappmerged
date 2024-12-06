import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useDispatch,useSelector } from "react-redux";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { ApiCall } from "../../../Services/Apis";
import Toast from "react-native-simple-toast";
import validator from "../../../../utils/validation/validator";
import { err } from "react-native-svg/lib/typescript/xml";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { useNavigation } from '@react-navigation/native';

const App = ({ route }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { email } = route?.params;
  const token = useSelector((state) => state.auth.userToken);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [error, setError] = useState("")

  const handlePasswordChangePassword = async () => {
    const cnfrPasswordError = await validator("passwordC", confirmPassword);
    const newPasswordError = await validator("passwordN", newPassword);
    if (
      !cnfrPasswordError &&
      !newPasswordError &&
      newPassword === confirmPassword
    ) {
      setError("");
      resetPassword();
    } else {
      if (newPasswordError && cnfrPasswordError) {
        setError(newPasswordError+"\n"+cnfrPasswordError)
      }
      else if(newPasswordError){
        setError(newPasswordError)
      }
      else if(cnfrPasswordError){
        setError(cnfrPasswordError)
      }
       else {
        setError('Both Passwords do not match!')
      }
    }
  };

  const resetPassword = async () => {
    let param={
      email:email,
      password:newPassword,
      confirm_password:confirmPassword
    }
    try {
      dispatch(setLoader(true))
      const res = await ApiCall({
        route: "auth/reset_password",
        token: token,
        params: param,
        verb: "put",
      });
      console.log(res);
      if (res?.response?.code == "200") {
        navigation.navigate("Login");
        Toast.show("Reset Password Successfully");
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
  const handleNewPasswordChange = (value) => {
    setNewPassword(value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
  };

  const getPasswordStrengthColor = () => {
    switch (getPasswordStrength(newPassword)) {
      case "none":
        return "#e54f5d"; // Red for weak
      case "Moderate":
        return "#eeb045"; // Yellow for moderate
      case "Strong":
        return "#4fe568"; // Green for strong
      default:
        return "#FFFFFF"; // White for no password entered
    }
  };

  const getProgressBarWidth = () => {
    const passwordLength = newPassword.length;
    if (passwordLength === 0) {
      return "0%"; // No width for no password entered
    } else if (passwordLength < 6) {
      return "25%"; // 25% width for weak passwords
    } else if (passwordLength >= 6 && passwordLength < 8) {
      return "50%"; // 50% width for moerate passwords
    } else if (passwordLength >= 8) {
      return "100%"; // 100% width for strong passwords
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return "None";
    const length = password.length;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (length < 6) return "Weak";
    if (
      length >= 6 &&
      (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar)
    )
      return "Moderate";
    if (
      length >= 8 &&
      hasUppercase &&
      hasLowercase &&
      hasNumber &&
      hasSpecialChar
    )
      return "Strong";
    return "None";
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backBtn}
      >
        <MaterialCommunityIcons name="chevron-left" size={30} color="#393C43" />
      </TouchableOpacity>

      {/* Input Fields */}
      <View style={styles.inputFieldsContainer}>
        <View style={styles.inputFieldContainer}>
          <Text style={styles.inputLabel}>Create New Password</Text>
          <View style={styles.inputField}>
            <View style={styles.inputContent}>
              <TextInput
                style={styles.inputText}
                value={newPassword}
                onChangeText={handleNewPasswordChange}
                placeholder="*************"
                placeholderTextColor="#393C43"
                secureTextEntry={!showNewPassword}
              />
              <Pressable onPress={toggleNewPasswordVisibility}>
                <MaterialCommunityIcons
                  name={showNewPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#393C43"
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.inputFieldContainer}>
          <Text style={styles.inputLabel}>Confirm Password</Text>
          <View style={styles.inputField}>
            <View style={styles.inputContent}>
              <TextInput
                style={styles.inputText}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="*************"
                placeholderTextColor="#393C43"
                secureTextEntry={!showPassword}
              />
              <Pressable onPress={togglePasswordVisibility}>
                <MaterialCommunityIcons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#393C43"
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>

      {error &&
        <Text style={styles.errorText}>{error}</Text>
      }
      {/* Password Strength */}
      <Text style={styles.passwordStrength}>Password Strength</Text>
      <View style={[styles.progressBar, { backgroundColor: "#FFFFFF" }]}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: getProgressBarWidth(),
              backgroundColor: getPasswordStrengthColor(),
            },
          ]}
        />
      </View>
      <Text style={styles.weakStrength}>
        {getPasswordStrength(newPassword) === "Weak"
          ? "Weak Increase strength"
          : getPasswordStrength(newPassword)}
      </Text>

      {/* Button Primary Icon */}
      <Pressable onPress={handlePasswordChangePassword} style={styles.primaryButton}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Change Password</Text>
          <MaterialCommunityIcons
            name="arrow-right"
            size={24}
            color="#FFFFFF"
          />
        </View>
      </Pressable>

      {/* Home Indicator */}
      <View style={styles.homeIndicator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingVertical: 50,
  },
  backBtn: {
    position: "absolute",
    top: 60,
    left: 30,
  },
  inputFieldsContainer: {
    // marginHorizontal: 16,
    marginTop: 80,
    gap: 10,
    paddingBottom: 24, // Add some padding at the bottom
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
    gap: 134,
    width: 311,
    height: 24,
  },
  errorText: {
    color: "#ff5252",
    marginBottom:10,
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
  passwordStrength: {
    fontFamily: "Work Sans",
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 21,
    textAlign: "center",
    letterSpacing: -0.004,
    color: "#393C43",
    marginTop: -6, // Decrease the marginTop value
  },
  progressBar: {
    // width: 342,
    height: 10,
    // marginHorizontal: 16,
    marginTop: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 6,
  },
  progressBarFill: {
    height: 10,
    borderRadius: 3,
  },
  weakStrength: {
    fontFamily: "Work Sans",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    letterSpacing: -0.003,
    color: "#393C43",
    marginTop: 8,
  },
  primaryButton: {
    marginLeft: 8, // Adjust the left margin
    marginRight: 200, // Auto margin on the right to push the button left
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
    width: "95%", // Slightly reduce the button width
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
    fontSize: 16, // Increase the font size if needed
    lineHeight: 19, // Adjust the line height if needed
    letterSpacing: -0.003,
    color: "#FFFFFF",
  },
  arrowIcon: {
    width: 24,
    height: 24,
    borderColor: "#FFFFFF",
    borderWidth: 2,
  },
});

export default App;
