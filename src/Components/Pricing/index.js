import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Button from '../../Components/Button';
import {styles} from './styles';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
const Pricing = () => {
  return (
    <View>
      <Text style={styles.accounttext}>How much does it cost?</Text>
      <Text style={{...styles.ttext, textAlign: 'left', width: getWidth(87)}}>
        After you sign up or log in and provide all the information needed
        regarding your consultation, you have the choice to pick from written
        report analysis, phone consult and video consult.
      </Text>
      <Text style={styles.accounttext}>Written report analysis ($100):</Text>
      <Text style={{...styles.ttext, textAlign: 'left', width: getWidth(87)}}>
        If you would like more clarification regarding the radiology report and
        imaging then you will choose this option. You will be given a written
        report within 48 hours of what your diagnosis is based on the radiology
        report or imaging and treatment options both non-surgical and surgical.
        The cost of the written report analysis is $100.
      </Text>
      <Text style={styles.accounttext}>Phone Call Consultation ($300):</Text>
      <Text style={{...styles.ttext, textAlign: 'left', width: getWidth(87)}}>
        If you would like to speak to an orthopedic surgeon after you have
        uploaded and entered all of your information then pick phone visit. You
        will be able to speak to an orthopedic surgeon regarding your diagnosis,
        imaging and go over non-surgical and surgical treatment plans and any
        other questions or concerns that you may have. The phone consult will
        last 15 minutes and only include 1 area/joint of concern. The cost of
        this phone consult is $300. If you would like to discuss multiple
        areas/joints, the cost increases $100/joint.
      </Text>
      <Text style={styles.accounttext}>Video Consultation ($500):</Text>
      <Text style={{...styles.ttext, textAlign: 'left', width: getWidth(87)}}>
        If you would like a more in-depth consultation regarding your injury
        then select video visit. You will be able to discuss diagnosis, imaging
        treatment and the orthopedic surgeon will be able to do a limited
        physical exam to help you decide your treatment plan. The cost of a
        video visit is $500.
      </Text>
      <Text style={styles.accounttext}>Follow up Visit ($150)</Text>
      <Text style={{...styles.ttext, textAlign: 'left', width: getWidth(87)}}>
        Follow up visit: If you have been seen by SecondLook Ortho for a
        specific joint and would like to set up a follow up visit for that
        joint. The cost will be $150 The follow up visit is only by phone
        consultation.
      </Text>
    </View>
  );
};
export default Pricing;
