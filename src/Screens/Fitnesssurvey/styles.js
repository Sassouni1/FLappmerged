import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

const ComprehensiveFitnessAssessment = () => {
  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.topNav}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Image source={require('./assets/icons/chevron-left.png')} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.heading}>Comprehensive Fitness Assessment</Text>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>PRICING</Text>
        </View>
      </View>

      {/* Fitness Goal */}
      <Text style={styles.fitnessGoalHeading}>What's your fitness goal target?</Text>
      <View>
        <View style={[styles.assessmentGoal, styles.unselectedGoal]}>
          <View style={styles.goalContent}>
            <View style={styles.iconContainer}>
              <Image source={require('./assets/icons/heart.png')} style={styles.icon} />
            </View>
            <Text style={styles.goalText}>I wanna reduce stress</Text>
            <View style={styles.checkboxContainer}>
              <View style={styles.checkbox} />
            </View>
          </View>
        </View>

        <View style={[styles.assessmentGoal, styles.selectedGoal]}>
          <View style={styles.goalContent}>
            <View style={styles.iconContainer}>
              <Image source={require('./assets/icons/heart.png')} style={[styles.icon, styles.whiteIcon]} />
            </View>
            <Text style={[styles.goalText, styles.whiteText]}>Reduce stress</Text>
            <View style={styles.checkboxContainer}>
              <View style={[styles.checkbox, styles.whiteCheckbox]} />
            </View>
          </View>
        </View>

        {/* Add more goals here */}
      </View>

      {/* Primary Button */}
      <TouchableOpacity style={styles.primaryButton}>
        <View style={styles.buttonContent}>
          <Text style={styles.buttonText}>Next</Text>
          <Image source={require('./assets/icons/arrow-right.png')} style={styles.icon} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    marginBottom: 48,
  },
  buttonContainer: {
    backgroundColor: '#F3F3F4',
    borderRadius: 18,
    padding: 12,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: '#676C75',
  },
  whiteIcon: {
    tintColor: '#FFFFFF',
  },
  heading: {
    fontFamily: 'Work Sans',
    fontWeight: '700',
    fontSize: 20,
    letterSpacing: -0.005,
    color: '#111214',
    marginHorizontal: 12,
    flex: 1,
  },
  tagContainer: {
    backgroundColor: '#F0F8FF',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  tagText: {
    fontFamily: 'Work Sans',
    fontWeight: '700',
    fontSize: 12,
    letterSpacing: 0.1,
    textTransform: 'uppercase',
    color: '#256CD0',
  },
  fitnessGoalHeading: {
    fontFamily: 'Work Sans',
    fontWeight: '700',
    fontSize: 30,
    letterSpacing: -0.01,
    color: '#111214',
    marginBottom: 48,
    textAlign: 'center',
  },
  assessmentGoal: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 16,
    borderRadius: 19,
    marginBottom: 8,
  },
  unselectedGoal: {
    backgroundColor: '#F3F3F4',
  },
  selectedGoal: {
    backgroundColor: '#FF8036',
    shadowColor: 'rgba(255, 128, 54, 0.25)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
  },
  goalContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  goalText: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: -0.003,
    color: '#111214',
    flex: 1,
  },
  whiteText: {
    color: '#FFFFFF',
  },
  checkboxContainer: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#111214',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteCheckbox: {
    borderColor: '#FFFFFF',
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 2,
    backgroundColor: '#676C75',
  },
  primaryButton: {
    backgroundColor: '#111214',
    borderRadius: 19,
    paddingHorizontal: 24,
    paddingVertical: 16,
    marginTop: 48,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: -0.003,
    color: '#FFFFFF',
    marginRight: 16,
  },
});

export default ComprehensiveFitnessAssessment;