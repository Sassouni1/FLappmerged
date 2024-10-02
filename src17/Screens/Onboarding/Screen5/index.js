import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
             source={require('../../../assets/images/WelcomeScreen-2.png')}
        style={styles.backgroundImage}
        />
        
        <Image
          source={require('../../../assets/images/Vector-21.png')}
          style={styles.layoverImage}
        />
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Virtual AI Coaching</Text>
            <Text style={styles.subheading}>The Future of Coaching!</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}activeOpacity={0.8}>
            <Icon name="arrow-forward" size={24} color="#111214" />
          </TouchableOpacity>
        </View>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
   justifyContent: 'flex-end',
   alignItems: 'center',
   height: Dimensions.get('screen').height
  
  },
  backgroundImage: {
    flex: 1,
    objectFit: 'fill',
    
    width: Dimensions.get('screen').width + 10,
    position: 'absolute',
    top: 0,
    left: -5,
    right:0,
    bottom: -10
  },
  gradientOverlay: {
    height: 480,
    
    bottom: 0,
    backgroundColor: 'transparent',},
  layoverImage: {
    position: 'absolute',
    width: Dimensions.get('screen').width,
    resizeMode: 'cover',
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 48,
    gap: 48,
  },
  textContainer: {
    gap: 12,
    marginBottom: 48,
  },
  heading: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: 36,
    lineHeight: 44,
    textAlign: 'center',
    letterSpacing: -0.012,
    color: '#FFFFFF',
  },
  subheading: {
    fontFamily: 'Work Sans',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    letterSpacing: -0.003,
    color: '#FFFFFF',
    marginBottom: -25
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    width: 343,
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;