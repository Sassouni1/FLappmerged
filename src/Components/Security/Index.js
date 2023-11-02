import React, {useState, useRef, useEffect} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';
import {SceneMap, TabView} from 'react-native-tab-view';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';

const Security = () => {
  return (
    <View>
      <Text style={styles.accounttext}>GENERAL HIPAA Compliant</Text>
      <Text style={{...styles.ttext, textAlign: 'left', width: getWidth(87)}}>
        SecondLook Ortho is HIPAA Compliant and utilizes end-to-end encryption
        to ensure that only you and the person you're communicating with can
        access your photos, video, and documents. We don't share or sell
        personal information.
      </Text>

      <Text style={styles.accounttext}>How is data kept secure?</Text>
      <Text style={{...styles.ttext, textAlign: 'left', width: getWidth(87)}}>
        Data is kept secure using HIPAA-compliant servers. The data is 256-bit
        encrypted.
      </Text>
    </View>
  );
};
export default Security;
