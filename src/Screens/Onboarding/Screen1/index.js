import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  Image,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import LinearGradient from "react-native-linear-gradient";
import BackgroundImage from "../../../assets/images/Jake.png";
import OverlayImage from "../../../assets/images/BlackBackground.png";
import LogoImage from "../../../assets/images/Vector-20.png";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../Redux/actions/GernalActions";
import { loginRequest } from "../../../Redux/actions/AuthActions";


const WelcomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const loginAsGuest = async () => {
    const email = "Guestuser@gmail.com";
    const password = "123456";
    try {
      dispatch(setLoader(true));
      dispatch(
        loginRequest({ email: email, password: password, role: "customer", isGuestUser: true })
      );
      setTimeout(() => {
        dispatch(setLoader(false));
      }, 3000);
    }
    catch (e) {
      dispatch(setLoader(false));
    }
  };

  return (
    <ImageBackground source={BackgroundImage} style={styles.backgroundImage}>
      <ImageBackground source={OverlayImage} style={styles.overlayImage}>
        <LinearGradient
          colors={["rgba(0, 0, 0, 0.0)", "transparent"]}
          style={styles.gradient}
        >
          <View style={styles.container}>
            <Image
              source={LogoImage}
              style={{
                position: "absolute",
                top: -70,
                left: Dimensions.get("window").width / 2.2,
              }}
            />
            <View style={styles.headingContainer}>
              <Text style={styles.heading}>Welcome to</Text>
              <Text style={[styles.heading, styles.fightLife]}>Fight Life</Text>
            </View>
            <Text style={styles.subheading}>
              Your path to elite performance
            </Text>
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Screen2")} // Change this line
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Get Started</Text>
                <Icon name="arrow-forward" size={24} color="#FFFFFF" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.signInText}>
                Already have account?{" "}
                <Text style={styles.signInLink}>Sign In</Text>
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {loginAsGuest()}}>
              <Text style={styles.signInText}>
                <Text style={styles.signInLink}>Continue as Guest</Text>
              </Text>
            </TouchableOpacity>
            <Text style={styles.poweredByText}>
              Powered By Sassouni Digital Media
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  signInText: {
    fontFamily: "Work Sans",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: -0.002,
    color: "#FFFFFF",
    marginBottom: 16,
  },
  signInLink: {
    color: "#FF8036",
    textDecorationLine: "underline",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  overlayImage: {
    flex: 1,
    resizeMode: "cover",
  },
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 300,
  },
  heading: {
    fontFamily: "Work Sans",
    fontWeight: "bold",
    fontSize: 40,
    lineHeight: 36,
    letterSpacing: 0,
    color: "#FFFFFF",
    marginBottom: 12,
    textAlign: "center",
    marginTop: 10,
  },
  subheading: {
    fontFamily: "Work Sans",
    fontSize: 18,
    lineHeight: 28,
    letterSpacing: -0.003,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 22,
  },
  button: {
    backgroundColor: "#FF8036",
    borderRadius: 15,
    paddingHorizontal: 32,
    paddingVertical: 20,
    marginBottom: 32,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    fontFamily: "Work Sans",
    fontWeight: "600",
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.004,
    color: "#FFFFFF",
    marginRight: 8,
  },
  poweredByText: {
    fontFamily: "Work Sans",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 18,
    letterSpacing: -0.002,
    color: "#FFFFFF",
  },
});

export default WelcomeScreen;
