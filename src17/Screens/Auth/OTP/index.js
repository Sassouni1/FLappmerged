import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import validator from '../../../../utils/validation/validator';
import { setLoader } from '../../../Redux/actions/GernalActions';
import { useDispatch } from 'react-redux';
import { ApiCall } from '../../../Services/Apis';
import SimpleToast from 'react-native-simple-toast';
import { validateFields } from "../../../../utils/validation/validate-fields";

const OTPverify = ({ route }) => {
  const { email } = route?.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inputRefs = {
    code: useRef(null),
  };

  const [state, setState] = useState({
    code: '',
    codeError: '',
    email: email,
    emailError: '',
  });

  const [countdown, setCountdown] = useState(30);
  const [isResendingCode, setIsResendingCode] = useState(false);

  useEffect(() => {
    let timer;
    if (countdown > 0 && !isResendingCode) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      clearInterval(timer);
    };
  }, [countdown, isResendingCode]);

  const handleResendCode = async () => {
    const { email } = state;
    const emailError = await validator('email', email);

    if (!emailError) {
      setIsResendingCode(true);
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
          
          SimpleToast.show(res?.response?.message);
          setCountdown(30);
          setIsResendingCode(false);
          inputRefs.code.current.clear(); // Clear the OTP input field
          dispatch(setLoader(false));
        } else {
          console.log('error', res.response);
          dispatch(setLoader(false));
          SimpleToast.show(res?.response?.message);
          setIsResendingCode(false);
        }
      } catch (e) {
        console.log('saga get language error -- ', e.toString());
        dispatch(setLoader(false));
        SimpleToast.show('An error occurred while resending the code');
        setIsResendingCode(false);
      }
    } else {
      dispatch(setLoader(false));
      setState({
        ...state,
        emailError,
      });
    }
  };

  const verify = async () => {
    const { code } = state;
    const codeError = await validator('code', code);

    if (!codeError) {
      dispatch(setLoader(true));
      try {
        dispatch(setLoader(true));
        const res = await ApiCall({
          params: { email:email, verification_code:code },
          route: 'auth/code_verification',
          verb: 'post',
        });

        if (res?.status == '200') {
          navigation.navigate('ResetPassword', { email: email });
          dispatch(setLoader(false));
        } else {
          console.log('error', res.response);
         
          dispatch(setLoader(false));
          Alert.alert('Error', res?.response?.message);
        }
      } catch (e) {
        console.log('saga get language error -- ', e.toString());
        dispatch(setLoader(false));
        Alert.alert('Error', 'An error occurred while verifying the code');
      }
    } else {
      dispatch(setLoader(false));
      inputRefs.code.current.clear();
      setState({
        ...state,
        codeError,
      });
      Alert.alert('Error', 'Invalid code');
    }
  };

  const changeHandler = (code) => setState({ ...state, code });

  console.log(state.code)

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/images/silverpadlockwithkeymiddle.png')}
        style={styles.padlockImage}
      />

      <View style={styles.topNav}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.buttonContainer}
        >
          <Image
            source={require('../../../assets/images/Monotonechevronleft.png')}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.frame}>
        <Text style={styles.heading}>
          Password Sent!{' '}
          <Image
            source={require('../../../assets/images/greencheck.png')}
            style={styles.checkIcon}
          />
        </Text>
        <Text style={styles.description}>
          We've sent the password to {'\n'}
          {email}
        </Text>

        {countdown > 0 ? (
          <Text style={styles.timerText}>
            Didn't receive it? Retry in {countdown}s
          </Text>
        ) : (
          <TouchableOpacity
            onPress={handleResendCode}
            disabled={isResendingCode}
          >
            <Text style={styles.resendCodeText}>
              {isResendingCode ? 'Resending code...' : 'Resend Code'}
            </Text>
          </TouchableOpacity>
        )}

        <OTPInputView
          ref={inputRefs.code}
          style={styles.otpInputStyle}
          pinCount={6}
          code={state.code}
          onCodeChanged={(code) => changeHandler(code)}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          keyboardType={'number-pad'}
          onBlur={() =>
            validator('code', state.code, (error) =>
              setState({ ...state, codeError: error })
            )
          }
          value={state.code}
        />

        <TouchableOpacity
          style={styles.buttonPrimaryIcon}
          onPress={() => verify()}
        >
          <Text style={styles.buttonText}>Verify</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.homeIndicator} />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  padlockImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  topNav: {
    position: 'absolute',
    top: 70,
    left: 40,
    zIndex: 1,
  },
  buttonContainer: {
    width: 50,
    height: 50,
    backgroundColor: '#F3F3F4',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frame: {
    alignItems: 'center',
    gap: 12,
    width: '100%',
    paddingBottom: 150,
    backgroundColor: 'rgba(255, 255, 255, 255)',
    borderRadius: 40,
    paddingVertical: 24,
    paddingHorizontal: 16,
    zIndex: 1,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 400,
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
  heading: {
    fontFamily: 'Work Sans',
    fontWeight: '700',
    fontSize: 24,
    lineHeight: 28,
    textAlign: 'center',
    letterSpacing: -0.008,
    color: '#111214',
    marginBottom: 4,
    marginTop: 50,
  },
  description: {
    fontFamily: 'Work Sans',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.003,
    color: '#676C75',
    marginBottom: 10,
  },
  timerText: {
    fontFamily: 'Work Sans',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    letterSpacing: -0.003,
    color: '#676C75',
    marginBottom: 16,
  },
  resendCodeText: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
    letterSpacing: -0.003,
    color: '#111214',
    marginBottom: 16,
  },
  otpInputStyle: {
    width: '90%',
    height: 90,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  underlineStyleBase: {
    width: 48,
    height: 48,
    borderWidth: 1.5,
    borderRadius: 13,
    backgroundColor: 'white',
    color: 'black',
    borderColor: '#CCCCCC',
  },
  underlineStyleHighLighted: {
    borderColor: '#CCCCCC',
  },
  underlineStyleHighLighted: {
    borderColor: '#CCCCCC',
  },
  underlineStyleHighLighted: {
    borderColor: 'black',
  },
  buttonPrimaryIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    width: '100%',
    backgroundColor: '#ef8749',
    borderRadius: 19,
  },
  buttonText: {
    fontFamily: 'Work Sans',
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 19,
    letterSpacing: -0.003,
    color: '#FFFFFF',
  },
  homeIndicator: {
    position: 'absolute',
    width: 50,
    height: 6,
    bottom: 40,
    backgroundColor: '#FFFFFF',
  },
});

export default OTPverify;