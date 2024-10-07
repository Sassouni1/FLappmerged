import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const WelcomeScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../../assets/images/illustrationfitnessequipmentsdesignbackground.jpeg')}
        style={styles.backgroundImage}
      >
        <View style={styles.gradientOverlay} />
        <Image
          source={require('../../../assets/images/Vector-21.png')}
          style={styles.layoverImage}
        />
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.heading}>Skills Training</Text>
            <Text style={styles.subheading}>Improve your fight skills and learn from top coaches</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Screen3')} activeOpacity={0.8}>
            <Icon name="arrow-forward" size={24} color="#111214" />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: 480,
    bottom: 0,
    backgroundColor: 'transparent',
  },
  layoverImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
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
    height: 96,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelcomeScreen;