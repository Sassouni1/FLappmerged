import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
const Assessment = ({ navigation }) => {
  
  const [selectedAge, setSelectedAge] = useState('18-25');

  const handleAgeSelection = (age) => {
    setSelectedAge(age);
  };

  const handleContinuePress = () => {
    if (selectedAge === '18-25') {
      navigation.navigate('Help');
    } else if (selectedAge === '35-45') {
      navigation.navigate('Screen1');
    }
  };

  const ageOptions = [
    { label: 'Under 18', value: 'Under 18' },
    { label: '18-25', value: '18-25' },
    { label: '25-35', value: '25-35' },
    { label: '35-45', value: '35-45' },
    { label: '45-55', value: '45-55' },
    { label: '55-65+', value: '55-65+' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>

          <Text style={styles.backButton}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Assessment</Text>
        <Text style={styles.stepCount}>1 OF 14</Text>
      </View>

      <Text style={styles.question}>What's your age?</Text>

      {ageOptions.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.ageOption,
            selectedAge === option.value && styles.selectedOption,
          ]}
          onPress={() => handleAgeSelection(option.value)}
        >
          <Text
            style={[
              styles.optionText,
              selectedAge === option.value && styles.selectedOptionText,
            ]}
          >
            {option.label}
          </Text>
          <View
            style={[
              styles.checkbox,
              selectedAge === option.value && styles.selectedCheckbox,
            ]}
          >
            {selectedAge === option.value && <View style={styles.checkboxInner} />}
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.continueButton}
        onPress={() => navigation.navigate("Goal")}>
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
    fontSize: 16,
    color: 'black',
    backgroundColor: '#F0F7FF',
    borderColor: '#F0F7FF',
    left: 140,
    top: 5,
    width: 100,
  },
  question: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 16,
    paddingTop: 70,
    color: '#000',
    textAlign: 'center',
  },
  ageOption: {
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
    marginRight: 8, // Add some space between text and icon
  },
  continueButtonIcon: {
    width: 24,
    height: 24,
  },
});

export default Assessment;