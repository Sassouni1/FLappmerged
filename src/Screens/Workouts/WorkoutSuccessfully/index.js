import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { GernalStyle } from "../../../constants/GernalStyle";
import { colors } from "../../../constants/colors";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import {
  getHeight,
  getFontSize,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { setCalanderRefreshKey } from "../../../Redux/actions/GernalActions";
import { useDispatch } from "react-redux";


const WorkoutSucessfully = ({ route }) => {
  const navigation = useNavigation();
  const selectDate = route?.params;
  const dispatch = useDispatch();

  const styles = StyleSheet.create({
    container: {
      ...GernalStyle.continer,
      backgroundColor: "#FFFFFF",
    },
    contentContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: getFontSize(10),
    },
    iconContainer: {
      marginBottom: getFontSize(2),
    },
    addSuccess: {
      fontSize: getFontSize(3),
      fontWeight: "bold",
      color: "#FF7133", // Matching the orange from the reference
      marginTop: getFontSize(2),
      marginBottom: getFontSize(1),
    },
    subtitle: {
      fontSize: getFontSize(1.8),
      color: "#666666",
      textAlign: "center",
      paddingHorizontal: getFontSize(2),
    },
    button: {
      position: "absolute",
      bottom: getHeight(3),
      backgroundColor: "#FF7133", // Matching the orange from the reference
      height: getHeight(6),
      width: getWidth(90),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: getFontSize(2.5), // Increased border radius to match reference
      margin: getFontSize(2),
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: getFontSize(2),
      fontWeight: "600",
    },
  });

  return (
    <View style={styles.container}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#FFFFFF"
        translucent={true}
      />
      <View style={styles.contentContainer}>
        <View style={styles.iconContainer}>
          <MaterialIcons
            name="event-available"
            size={getWidth(25)}
            color="#FF7133"
          />
        </View>
        <Text style={styles.addSuccess}>Added Successfully!</Text>
        <Text style={styles.subtitle}>
          Workout has been added to your calendar
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => {
         dispatch(setCalanderRefreshKey(true));
          navigation.navigate("AddWorkouts")
        }}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Okay</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutSucessfully;