import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";


export const SplashScreen = ({ navigation }) => {
 const progress = useRef(new Animated.Value(0)).current;


 useEffect(() => {
   // Start the animation
   Animated.timing(progress, {
     toValue: 1, // Fully loaded
     duration: 2000, // Duration of 2 seconds
     useNativeDriver: false, // We are animating width/height, so set this to false
   }).start(() => {
     // Navigate to Screen3 after the animation is complete
     navigation.navigate("Home");
   });
 }, [progress, navigation]);


 // Interpolate progress to match the desired height
 const heightInterpolation = progress.interpolate({
   inputRange: [0, 1],
   outputRange: ["40%", "100%"], // From 40% (2/5) to 100%
 });


 return (
   <View style={styles.container}>
     <View style={styles.frame}>
       <View style={styles.progressBarFrame}>
         <Animated.View
           style={[styles.progressBar, { height: heightInterpolation }]}
         />
       </View>
       <View style={styles.textFrame}>
         <Text style={styles.loadingText}>Loading...</Text>
         <View style={styles.iconFrame}>
           <Text style={styles.subText}>Preparing to train</Text>
         </View>
       </View>
     </View>
     <View style={styles.homeIndicatorContainer}>
       <View style={styles.homeIndicatorBackground} />
     </View>
     </View>
 );
};
export const SplashScreenAuth = ({ navigation }) => {
  const progress = useRef(new Animated.Value(0)).current;
 
 
  useEffect(() => {
    // Start the animation
    Animated.timing(progress, {
      toValue: 1, // Fully loaded
      duration: 2000, // Duration of 2 seconds
      useNativeDriver: false, // We are animating width/height, so set this to false
    }).start(() => {
      // Navigate to Screen3 after the animation is complete
      navigation.navigate("Screen1");
    });
  }, [progress, navigation]);
 
 
  // Interpolate progress to match the desired height
  const heightInterpolation = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["40%", "100%"], // From 40% (2/5) to 100%
  });
 
 
  return (
    <View style={styles.container}>
      <View style={styles.frame}>
        <View style={styles.progressBarFrame}>
          <Animated.View
            style={[styles.progressBar, { height: heightInterpolation }]}
          />
        </View>
        <View style={styles.textFrame}>
          <Text style={styles.loadingText}>Loading...</Text>
          <View style={styles.iconFrame}>
            <Text style={styles.subText}>Preparing to train</Text>
          </View>
        </View>
      </View>
      <View style={styles.homeIndicatorContainer}>
        <View style={styles.homeIndicatorBackground} />
      </View>
      </View>
  );
 };

const styles = StyleSheet.create({
 container: {
   width: Dimensions.get("window").width, // Full width of the screen
   height: Dimensions.get("window").height, // Full height of the screen
   backgroundColor: "#FF8036",
   justifyContent: "center",
   alignItems: "center",
 },
 frame: {
   width: 345,
   height: 488,
   justifyContent: "space-between",
   alignItems: "center",
   padding: 0,
   position: "absolute",
   top: Dimensions.get("window").height / 2 - 488 / 2,
   left: Dimensions.get("window").width / 2 - 345 / 2, // Center horizontally
 },
 progressBarFrame: {
   width: 10, // Width of the vertical bar
   height: 343, // Height of the progress bar
   borderColor: "#FFFFFF",
   borderWidth: 1,
   borderRadius: 3,
   justifyContent: "center",
   alignItems: "center",
 },
 progressBar: {
   width: 10, // Keep width consistent with progressBarFrame
   backgroundColor: "#FFFFFF",
   borderRadius: 3,
   position: "absolute",
   bottom: 0, // Start the progress from the bottom
 },
 textFrame: {
   alignItems: "center",
   marginTop: 20, // Adjust margin as needed
   width: 345,
   height: 81,
 },
 loadingText: {
   fontFamily: "Work Sans",
   fontWeight: "700",
   fontSize: 36,
   marginTop: -35,
   lineHeight: 44,
   textAlign: "center",
   letterSpacing: -0.012,
   color: "#FFFFFF",
 },
 iconFrame: {
   flexDirection: "row",
   alignItems: "center",
   justifyContent: "center",
   marginTop: 10, // Space between text and icon
 },
 subText: {
   fontFamily: "Work Sans",
   fontWeight: "500",
   fontSize: 18,
   lineHeight: 21,
   textAlign: "center",
   letterSpacing: -0.004,
   color: "#FFFFFF",
 },
 homeIndicatorContainer: {
   position: "absolute",
   width: Dimensions.get("window").width,
   height: 34,
   bottom: 0,
   justifyContent: "center",
   alignItems: "center",
 },
 homeIndicatorBackground: {
   width: 134,
   height: 5,
   backgroundColor: "#FFFFFF",
   transform: [{ scaleY: -1 }],
 },
});
