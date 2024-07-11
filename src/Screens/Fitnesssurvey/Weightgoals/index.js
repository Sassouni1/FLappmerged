import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const Assessment = ({ navigation }) => {
  const [currentWeight, setCurrentWeight] = useState(67);
  const [goalWeight, setGoalWeight] = useState(67);

  const handleContinuePress = () => {
    // navigation.navigate("NextScreen");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Assessment</Text>
        <Text style={styles.stepCount}>2 OF 14</Text>
      </View>

      <Text style={styles.question}>Enter your weight & Weight Goals.</Text>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Current Body Weight</Text>
        <View style={styles.sliderRow}>
          <Text style={styles.weight}>{currentWeight}</Text>
        </View>
        <Text style={styles.unit}>kilograms</Text>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.label}>Body Weight Goal</Text>
        <View style={styles.sliderRow}>
          <Text style={styles.weight}>{goalWeight}</Text>
        </View>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  sliderContainer: {
    marginBottom: 32,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#111214",
    marginBottom: 8,
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  slider: {
    flex: 1,
  },
  weight: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF8036",
    marginLeft: 8,
  },
  unit: {
    fontSize: 14,
    color: "#676C75",
    textAlign: "right",
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
