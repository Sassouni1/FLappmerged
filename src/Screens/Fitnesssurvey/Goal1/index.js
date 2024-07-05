import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const Assessment = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState(
    "Increase sports performance"
  );

  const handleGoalSelection = (Zequipment) => {
    setSelectedGoal(Zequipment);
  };

  const handleContinuePress = () => {
    navigation.navigate("ZEquipment");
  };

  const goalOptions = [
    {
      label: "Increase sports performance",
      value: "Increase sports performance",
    },
    { label: "I wanna lose weight", value: "I wanna lose weight" },
    { label: "I wanna bulk", value: "I wanna bulk" },
    { label: "General health & fitness", value: "General health & fitness" },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../../assets/images/Button1Container1.png")} // Ensure this path is correct
            style={styles.headerImage}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Assessment</Text>
        <Text style={styles.stepCount}>1 OF 14</Text>
      </View>

      <Text style={styles.question}>What's your fitness goal/target?</Text>

      {goalOptions.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.goalOption,
            selectedGoal === option.value && styles.selectedOption,
          ]}
          onPress={() => handleGoalSelection(option.value)}
        >
          <Text
            style={[
              styles.optionText,
              selectedGoal === option.value && styles.selectedOptionText,
            ]}
          >
            {option.label}
          </Text>
          <View
            style={[
              styles.checkbox,
              selectedGoal === option.value && styles.selectedCheckbox,
            ]}
          >
            {selectedGoal === option.value && (
              <View style={styles.checkboxInner} />
            )}
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.continueButton}
        onPress={handleContinuePress}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    marginTop: 50,
  },
  headerImage: {
    width: 45, // Adjust the size to be smaller
    height: 45, // Adjust the size to be smaller
    marginRight: 10,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    flex: 1,
  },
  stepCountContainer: {
    alignItems: "flex-end",
  },
  stepCount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#387CFF",
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10, // Make it fully rounded
    overflow: "hidden", // Ensure the background doesn't overflow
  },
  question: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#000",
    textAlign: "center",
  },
  goalOption: {
    backgroundColor: "#F3F3F4",
    borderRadius: 17,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginVertical: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedOption: {
    backgroundColor: "#FF8036",
    borderRadius: 19,
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderWidth: 4,
    borderColor: "#fae0d0", // Outer border color
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  selectedOptionText: {
    color: "#fff",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedCheckbox: {
    backgroundColor: "#FF8036",
    borderColor: "#fff",
  },
  checkboxInner: {
    width: 8,
    height: 8,
    borderRadius: 3,
    backgroundColor: "#fff",
  },
  continueButton: {
    backgroundColor: "#000",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginVertical: 16,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Assessment; // Correctly export the Assessment component
