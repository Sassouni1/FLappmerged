import React, {useState, useRef} from 'react';
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
// import OtpInputs from 'react-native-otp-inputs';
import {TextInput} from 'react-native-paper';
import Button from '../../../Components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {useNavigation} from '@react-navigation/native';
import {validateFields} from '../../../../utils/validation/validate-fields';
import {GernalStyle} from '../../../constants/GernalStyle';
import {useDispatch} from 'react-redux';
import {ApiCall} from '../../../Services/Apis';
import {SafeAreaView} from 'react-native-safe-area-context';
import {setLoader} from '../../../Redux/actions/GernalActions';
import validator from '../../../../utils/validation/validator';
import {Forgot_Password} from '../../../Redux/actions/AuthActions';
import {
  getFontSize,
  getHeight,
  getWidth,
} from '../../../../utils/ResponsiveFun';
import Header from '../../../Components/Header';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';

const OTPverify = ({route}) => {
  const {email} = route?.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const inputRefs = {
    code: useRef(null),
  };

  const [state, setState] = useState({
    codeError: '',
  });
  const verify = async () => {
    const {code} = state;
    const codeError = await validator('code', code);

    if (!codeError) {
      dispatch(setLoader(true));
      const params = {
        email: email,
        OTP: code,
      };
      try {
        const res = await ApiCall({
          route: 'auth/email_verification',
          verb: 'put',
          params: params,
        });

        if (res?.status == '200') {
          console.log('res', res?.response);
          navigation.navigate('ResetPassword', {email: email});
          // setCategory(res.response.data);
          dispatch(setLoader(false));
        } else {
          console.log('error', res.response);
          alert(
            res?.response?.message
              ? res?.response?.message
              : res?.response?.error,
          );
          dispatch(setLoader(false));
        }
      } catch (e) {
        console.log('saga get language error -- ', e.toString());
      }
    } else {
      dispatch(setLoader(false));
      setState({
        ...state,
        codeError,
      });
      alert(
        res?.response?.message ? res?.response?.message : res?.response?.error,
      );
    }
  };
  const otpInput = useRef(null);
  const changeHandler = (type, value) => setState({...state, [type]: value});

  return (
    <View style={{flex: 1, backgroundColor: 'rgba(51, 51, 51, 1)'}}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(51, 51, 51, 1)"
      />
      <Header
        title={'Forgot password?'}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={{alignSelf: 'center', marginRight: getWidth(2)}}
              name={'arrow-back'}
              size={25}
              color={'white'}
            />
          </TouchableOpacity>
        }
      />
   
        <KeyboardAwareScrollView
          contentContainerStyle={{height: getHeight(70)}}
          showsVerticalScrollIndicator={false}>
          
            <Text style={styles.stxt}>
            An OTP has been sent to you email adress{`\n`}
            <Text style={{color:'rgba(247, 147, 0, 1)'}}>"{email}" </Text>
            </Text>
        
          <OTPInputView
            title="code"
            keyboardAppearance="default"
            editable={true}
            
            style={{
              width: '80%',
              height: 90,
              justifyContent: 'center',
              alignSelf: 'center',
            }}
            pinCount={4}
            code={state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
            onCodeChanged={code => {
              setState({code});
            }}
            autoFocusOnLoad
            value={state.code}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            keyboardType={'number-pad'}
            onBlur={() =>
              validateFields(state.code, 'code', error =>
                setState({...state, codeError: error}),
              )
            }
            onChangeText={code => changeHandler('code', code.trim())}
            onCodeFilled={code => {
              console.log(`Code is ${code}, you are good to go!`);
            }}
          />

         
        </KeyboardAwareScrollView>

      
        <Button
            onPress={() => verify()}
            text="Reset password"
            btnStyle={{...GernalStyle.btn,position:'absolute',bottom:getHeight(5)}}
            btnTextStyle={GernalStyle.btnText}
          />
    </View>
  );
};
const styles = StyleSheet.create({
  borderStyleBase: {
    width: 30,
    height: 45,
    backgroundColor: 'red',
  },

  borderStyleHighLighted: {
    borderColor: '#182d4a',
  },
  stxt: {
    color: 'white',
    marginTop:getHeight(3),
    marginLeft:getWidth(5),
    fontSize: 12,
    // textAlign: 'justify',
    lineHeight: 19,
    fontFamily: 'Ubuntu-Bold',
    width: getWidth(80),
    
  },
  stxtview: {
    width: getWidth(90),
    marginTop: getHeight(2.5),
    color: '#182d4a',
    alignSelf:"center",
  },
  underlineStyleBase: {
    width: 55,
    height: 55,
    borderWidth: 1,
    borderRadius:10,
    borderBottomWidth: 1,
    color:'white',
    borderColor:'white'
  },

  underlineStyleHighLighted: {
    borderColor: 'white',
  },
});

export default OTPverify;
