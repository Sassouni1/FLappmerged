import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Assessment = ({ navigation }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
  };

  const handleContinuePress = () => {
    // Add your navigation logic here based on the selected option
    // For example:
    if (selectedOption === 'Increase sports performance') {
      navigation.navigate('WhatIsYourMainFocus');
    } else if (selectedOption === 'I wanna lose weight') {
      navigation.navigate('LoseWeightFlow');
    }
    // Add more cases for other options
  };

  const options = [
    { label: "Increase sports performance", value: "Increase sports performance" },
    { label: "I wanna lose weight", value: "I wanna lose weight" },
    { label: "I wanna Bulk", value: "I wanna Bulk" },
    { label: "General Health & Fitness", value: "General Health & Fitness" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.topNav}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonContainer}
        >
        </TouchableOpacity>
      </View>
        <Text style={styles.headerText}>Assessment</Text>
        <Text style={styles.stepCount}>2 OF 6</Text>
      </View>

      <Text style={styles.question}>What's your main goal?</Text>

      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.option,
            selectedOption === option.value && styles.selectedOption,
          ]}
          onPress={() => handleOptionSelection(option.value)}
        >
          <Text
            style={[
              styles.optionText,
              selectedOption === option.value && styles.selectedOptionText,
            ]}
          >
            {option.label}
          </Text>
          <View
            style={[
              styles.checkbox,
              selectedOption === option.value && styles.selectedCheckbox,
            ]}
          >
            {selectedOption === option.value && <View style={styles.checkboxInner} />}
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.continueButton} onPress={() => navigation.navigate("ForgotPassword")}>
        <View style={styles.continueButtonContent}>
          <Text style={styles.continueButtonText}>Continue</Text>
          <Image
            style={styles.continueButtonIcon}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'left',
    marginVertical: 16,
    marginTop: 100,
    left: 10,
  },
  backButton: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    left: 20,
    top: 3,
  },
  stepCount: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    backgroundColor: '#F0F7FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    position: 'absolute',
    right: 16,
    top: 0,
    borderRadius: 12,
    overflow: 'hidden',
  },
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 16,
    paddingTop: 70,
    color: '#000',
    textAlign: 'center',
  },
  option: {
    backgroundColor: '#F3F3F4',
    borderRadius: 17,
    paddingVertical: 15,
    paddingHorizontal: 16,
    marginVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedOption: {
    backgroundColor: '#FF8036',
  },
  optionText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  selectedOptionText: {
    color: '#fff',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2.4,
    borderColor: '#000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCheckbox: {
    backgroundColor: '#FF8036',
    borderColor: '#fff',
  },
  checkboxInner: {
    width: 8,
    height: 8,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  continueButton: {
    backgroundColor: '#000',
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginVertical: 16,
    alignItems: 'center',
  },
  continueButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 8,
  },
  continueButtonIcon: {
    width: 24,
    height: 24,
  },
});

export default Assessment;