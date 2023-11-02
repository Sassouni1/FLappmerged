import {View, Text,Image, ImageBackground,StyleSheet} from 'react-native';
import React from 'react';
import {colors} from '../../constants/colors';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import GeneralStatusBar from '../../Components/GeneralStatusBar';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';


const Help = () => {
  const navigation=useNavigation()
  return (
    <View >
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      {/* <AppHeader heading={'Help'} onPress={() => navigation.goBack()} /> */}
      <KeyboardAwareScrollView>
        <View style={{paddingHorizontal: getWidth(4)}}>
          <View
            style={styles.btnCon}>
            <Text
              style={styles.text}>
              How to use app?
            </Text>
            
          </View>
          <ImageBackground
            resizeMode='stretch'
            blurRadius={6}
            source={require('../../assets/images/home1.png')}
            style={styles.img}
            >
              {/* <View style={styles.playerbtn}>
                <PlayerSvg height={20} width={20} />
              </View> */}
               <View
            style={styles.playerbtn}>
            <Image
              resizeMode="center"
              style={{height: getHeight(3), width: getWidth(4)}}
              source={require('../../assets/images/player.png')}
            />
          </View>
            </ImageBackground>
        </View>
        <View style={{paddingHorizontal: getWidth(4)}}>
          <View
            style={{...styles.btnCon,marginTop:getHeight(6)}}>
            <Text
              style={styles.text}>
              Important FAQs
            </Text>
            
          </View>
          <ImageBackground
              blurRadius={6}

            resizeMode='stretch'
            source={require('../../assets/images/home1.png')}
            style={styles.img}
            >
              {/* <View style={styles.playerbtn}>
                <PlayerSvg height={20} width={20} />
              </View> */}
               <View
            style={styles.playerbtn}>
            <Image
              resizeMode="center"
              style={{height: getHeight(3), width: getWidth(4)}}
              source={require('../../assets/images/player.png')}
            />
          </View>
            </ImageBackground>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default Help;
