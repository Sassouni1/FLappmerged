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
// import {fonts} from '../../../../constants/fonts';
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import Button from "../../../Components/Button";
import { Image } from "react-native";

const WorkoutSucessfully = ({route}) => {
  const navigation = useNavigation();
  const selectDate = route?.params
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center",marginBottom:getFontSize(10) }}>
        <Image
          style={{ height: getHeight(15), width: getWidth(35) }}
          resizeMode="contain"
          source={require("../../../assets/images/workoutAdded.png")}
        />
        <Text style={styles.addsucess}>Added Successfully!</Text>
        <Text style={styles.subtitle}>
          Workout has been added to your calendar
        </Text>
      </View>
      
      <TouchableOpacity
        onPress={() => navigation.navigate("AddWorkouts")}
        style={{
          position: "absolute",
          bottom: getHeight(3),
          backgroundColor: colors.primary,
          borderWidth: 1,
          borderColor: colors.buttonColor,
          height: getHeight(6),
          width: getWidth(90),
          justifyContent: "center",
          alignItems: "center",
          borderRadius: getFontSize(1),
          margin: getFontSize(2),
        }}
      >
        
          <Text style={{ color: colors.buttonColor, fontSize: getFontSize(2) }}>
            Okay
          </Text>
      
      </TouchableOpacity>
    </View>
  );
};

export default WorkoutSucessfully;
