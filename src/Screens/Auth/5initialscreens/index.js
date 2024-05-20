import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const PasswordSent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <View style={styles.buttonContainer}>
          <Image
            source={require('./assets/monotone-chevron-left.png')}
            style={styles.chevronIcon}
          />
        </View>
      </View>

      <View style={styles.frame}>
        <View style={styles.iconContainer}>
          <Image
            source={require('./assets/solid-lock-password.png')}
            style={styles.lockIcon}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.heading}>Password Sent</Text>
          <Text style={styles.description}>
            We've sent the password to gmail.com Resend if not received
          </Text>
        </View>

        <View style={styles.buttonPrimaryIcon}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Resend</Text>
            <Image
              source={require('./assets/monotone-arrow-right.png')}
              style={styles.arrowIcon}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 812,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    width: 343,
    height: 48,
    marginHorizontal: '50%',
    marginTop: 68,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: 48,
    height: 48,
    backgroundColor: '#F3F3F4',
    borderRadius: 18,
  },
  chevronIcon: {
    width: 24,
    height: 24,
    transform: [{ rotate: '-90deg' }],
    borderWidth: 2,
    borderColor: '#676C75',
  },
  frame: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 24,
    width: 343,
    height: 260,
    marginHorizontal: 16,
    marginTop: 46,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    width: 64,
    height: 64,
    backgroundColor: '#F3F3F4',
    borderRadius: 20,
  },
  lockIcon: {
    width: 24,
    height: 24,
    backgroundColor: '#676C75',
  },
  textContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 12,
    width: 343,
    height: 92,
  },
  heading: {
    fontFamily: 'Work Sans',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'center',
    letterSpacing: -0.008,
    color: '#111214',
  },
  description: {
    fontFamily: 'Work Sans',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'center',
    letterSpacing: -0.003,
    color: '#676C75',
  },
  buttonPrimaryIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    width: 343,
    height: 56,
    backgroundColor: '#111214',
    borderRadius: 19,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    width: 179,
    height: 24,
  },
  buttonText: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.003,
    color: '#FFFFFF',
  },
  arrowIcon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});

export default PasswordSent;