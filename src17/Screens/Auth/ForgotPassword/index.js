import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setLoader } from '../../../Redux/actions/GernalActions';
import { ApiCall } from '../../../Services/Apis';
import { validateFields } from '../../../../utils/validation/validate-fields';
import validator from '../../../../utils/validation/validator';
import SimpleToast from 'react-native-simple-toast';

const ResetPassword = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inputRefs = {
    email: useRef(null),
  };

  const [state, setState] = useState({
    email: '',
    emailError: '',
  });

  const forgot = async () => {
    const { email } = state;
    const emailError = await validator('email', email);
    if (!emailError) {
      dispatch(setLoader(true));
      const params = {
        email: email,
      };
      try {
        const res = await ApiCall({
          route: 'auth/email_verification',
          verb: 'put',
          params: params,
        });

        if (res?.status == '200') {
          navigation.navigate('OTP', { email });
          SimpleToast.show(res?.response?.message);
          dispatch(setLoader(false));
        } else {
          console.log('error', res.response);
          dispatch(setLoader(false));
          SimpleToast.show(res?.response?.message);
        }
      } catch (e) {
        console.log('saga get language error -- ', e.toString());
      }
    } else {
      dispatch(setLoader(false));
      setState({
        ...state,
        emailError,
      });
    }
  };

  const changeHandler = (type, value) => setState({ ...state, [type]: value });

  return (
    <View style={styles.container}>
      <View style={styles.topFrame}>
        <Image
          source={require('../../../assets/images/silverpadlockwithholemiddlethatsayslock1.png')}
          style={styles.lockImage}
        />
      </View>

      <View style={styles.contentFrame}>
        <View style={styles.topContent}>
          <View style={styles.topNav}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.goBack()}>
              <View style={styles.chevronLeft}>
                <Image source={require('../../../assets/images/Monotonechevronleft.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.titleFrame}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Select what method you'd like to reset</Text>
          </View>
        </View>

        <View style={styles.optionsFrame}>
          <View style={styles.optionFrame}>
            <View style={styles.optionContent}>
              <View style={styles.iconButton}>
                <Image source={require('../../../assets/images/Vector-5.png')} />
              </View>
              <View style={styles.optionTextFrame}>
                <View style={styles.optionTextContent}>
                  <Text style={styles.optionTitle}>Send via Email</Text>
                  <Text style={styles.optionSubtitle}>
                    Seamlessly reset your password via email address
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.chevronRight}></View>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email Address You Signed Up With</Text>
          <View style={styles.inputContent}>
            <View style={styles.inputText}>
              <Image source={require('../../../assets/images/Monotoneemail.png')} style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                ref={inputRefs.email}
                value={state.email}
                returnKeyType={'next'}
                keyboardType="email-address"
                onFocus={() => setState({ ...state, emailError: '' })}
                onBlur={() =>
                  validateFields(state.email, 'email', (error) => setState({ ...state, emailError: error }))
                }
                onSubmitEditing={() => forgot()}
                onChangeText={(email) => changeHandler('email', email.trim())}
                blurOnSubmit={false}
                placeholder="Email Address"
              />
            </View>
          </View>
          {state.emailError && <Text style={styles.errorText}>{state.emailError}</Text>}
        </View>

        <TouchableOpacity style={styles.button} onPress={() => forgot()}>
          <View style={styles.buttonContent}>
            <Text style={styles.buttonText}>Reset Password</Text>
            <View style={styles.arrowIcon}>
              <Image source={require('../../../assets/images/Monotoneright11.png')} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
  },
  topFrame: {
    position: 'absolute',
    width: 375,
    height: 265,
    top: 547,
    left: 0,
  },
  lockImage: {
    position: 'absolute',
    width: 594,
    height: 594,
    left: '50%',
    top: '50%',
    marginLeft: -297,
    marginTop: -297,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#111214',
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  buttonContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
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
  },
  contentFrame: {
    position: 'absolute',
    width: 343,
    height: 269,
    left: '50%',
    top: 68,
    marginLeft: -171.5,
    gap: 32,
  },
  topContent: {
    gap: 24,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  buttonContainer: {
    width: 48,
    height: 48,
    backgroundColor: '#F3F3F4',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chevronLeft: {
    width: 24,
    height: 24,
  },
  titleFrame: {
    gap: 8,
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Work Sans',
    fontWeight: '700',
    fontSize: 30,
    lineHeight: 38,
    letterSpacing: -0.01,
    color: '#111214',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Work Sans',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 26,
    letterSpacing: -0.003,
    color: '#676C75',
    textAlign: 'center',
  },
  optionsFrame: {
    gap: 9,
  },
  optionFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
    backgroundColor: '#F3F3F4',
    borderRadius: 24,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  iconButton: {
    width: 64,
    height: 64,
    backgroundColor: '#FF8036',
    borderRadius: 21,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionTextFrame: {
    gap: 8,
    flex: 1,
  },
  optionTextContent: {
    gap: 4,
  },
  optionTitle: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 21,
    letterSpacing: -0.004,
    color: '#111214',
  },
  optionSubtitle: {
    fontFamily: 'Work Sans',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: -0.002,
    color: '#676C75',
  },
  chevronRight: {
    width: 24,
    height: 24,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Work Sans',
    fontWeight: '700',
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: -0.002,
    color: '#111214',
    marginBottom: 8,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F3F4',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  inputText: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  input: {
    flex: 1,
    fontFamily: 'Work Sans',
    fontSize: 14,
    color: '#393C43',
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  errorText: {
    fontFamily: 'Work Sans',
    fontSize: 12,
    color: 'red',
    marginTop: 4,
  },
});

export default ResetPassword;