import { min } from "moment";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

const Assessment = ({ navigation }) => {
  const [selectedEquipment, setSelectedEquipment] = useState("");

  useEffect(() => {
    setSelectedEquipment("Bodyweight");
  }, []); // Empty dependency array ensures this runs once when the component mounts

  const handleEquipmentSelection = (equipment) => {
    setSelectedEquipment(equipment);
  };

  const handleContinuePress = () => {
    navigation.navigate("Weightgoals");
  };

  const equipmentOptions = [
    {
      label: "Bodyweight",
      description: "Very minimal equipment, mostly bodyweight training.",
      value: "Bodyweight",
    },
    {
      label: "Dumbbells & Kettlebells",
      description: "I have some equipment.",
      value: "Dumbbells & Kettlebells",
    },
    {
      label: "Full Gym",
      description: "I have a fully gym with all equipment needs.",
      value: "Full Gym",
    },
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
        <Text style={styles.stepCount}>2 OF 14</Text>
      </View>

      <Text style={styles.question}>What Type of Equipment do you use?</Text>

      <View style={styles.optionsContainer}>
        {equipmentOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.equipmentOption,
              selectedEquipment === option.value && styles.selectedOption,
            ]}
            onPress={() => handleEquipmentSelection(option.value)}
          >
            <Text
              style={[
                styles.optionLabel,
                selectedEquipment === option.value && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </Text>
            <Text
              style={[
                styles.optionDescription,
                selectedEquipment === option.value && styles.selectedOptionText,
              ]}
            >
              {option.description}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

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
  headerImage: {
    width: 45, // Adjust the size to be smaller
    height: 45, // Adjust the size to be smaller
    marginRight: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
    marginTop: 50,
  },
  backButton: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    flex: 1,
    textAlign: "center",
  },
  stepCount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#387CFF",
    backgroundColor: "#F0F7FF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    overflow: "hidden",
  },
  question: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 16,
    color: "#000",
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  equipmentOption: {
    width: "48%",
    backgroundColor: "#F3F3F4",
    borderRadius: 17,
    paddingVertical: 50,
    paddingHorizontal: 20,
    marginVertical: 8,
    alignItems: "flex-start", // Correct alignment
    minHeight: 80,
  },
  selectedOption: {
    backgroundColor: "#FF8036",
    borderColor: "#fae0d0",
    backgroundColor: "#FF8036",
    borderRadius: 19,
    borderWidth: 4,
    borderColor: "#fae0d0", // Outer border color
  },
  optionLabel: {
    fontSize: 16,
    alignItems: "flex-start", // Correct alignment
    minHeight: 40, // Increase minimum height to accommodate text
    fontWeight: "bold",
    color: "#393c43",
    marginTop: -30,
    marginBottom: 0,
    flexWrap: "wrap", // Ensure text wraps within the box
  },
  optionDescription: {
    fontSize: 12,
    color: "#676c75",
    textAlign: "left",
    marginBottom: 10,
    flexWrap: "wrap", // Ensure text wraps within the box
  },
  selectedOptionText: {
    color: "#fff",
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

export default Assessment;
