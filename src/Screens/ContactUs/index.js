import {View, Text, TextInput,StyleSheet} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import {GernalStyle} from '../../constants/GernalStyle';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';

import GeneralStatusBar from '../../Components/GeneralStatusBar';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../Components/Button';
import { useNavigation } from '@react-navigation/native';
import validator from '../../../utils/validation/validator';
import {validateFields} from '../../../utils/validation/validate-fields'; 
import { styles } from './styles';
import { ApiCall } from '../../Services/Apis';
import { useDispatch, useSelector } from 'react-redux';
import { setLoader } from '../../Redux/actions/GernalActions';


const ContactUs = () => {
  const navigation=useNavigation()
  const token=useSelector((state)=>state.auth.userToken)
  const dispatch=useDispatch()
  const inputRefs = {
    fullname:useRef(null),
    question:useRef(null),
    email: useRef(null),

  };
  const [state, setState] = useState({
    email: '',
    emailError: '',

    fullname:'',
    fullnameError:'',
    question:'',
    questionError:''
  });
  const openDrawer = () => {
    navigation.openDrawer(); // Open the drawer
  };
  const changeHandler = (type, value) => setState({...state, [type]: value});
  const ContectToUser = async () => {
    const {email,fullname,question} = state;
    const emailError = await validator('email', email);
   
    const fullnameError = await validator('fullname', fullname);
    const questionError = await validator('question', question);
  

    if (!emailError  && !fullnameError && !questionError) {
      dispatch(setLoader(true))
          try {
            const res = await ApiCall({
              params: {full_name:fullname,email:email,description:question},
              route: 'contact/contact_us',
              verb: 'post',
              token:token
            });
        
            if (res?.status == '200') {
    
            console.log('res,',res)
              dispatch(setLoader(false));
              navigation.goBack();

              // navigation.navigate('HomeScreen');
            } else {
              console.log('error', res.response);
              dispatch(setLoader(false));
        
              alert(res?.response?.message, [
                {text: 'OK', onPress: () => console.log('OK Pressed')},
              ]);
            }
          } catch (e) {
            console.log('api get skill error -- ', e.toString());
          }
      
  
    } else {
      setState({...state, emailError,fullnameError,questionError});
    }
  };
  useEffect(() => {
    setState({
      email: '',
      emailError: '',
      fullname:'',
    fullnameError:'',
    question:'',
    questionError:''
    });
  }, []);

  return (
    <View style={{...GernalStyle.container, backgroundColor: colors.homeColor}}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      {/* <AppHeader heading={'Contact us'} onPress={openDrawer} backAngel={false}/> */}
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
        <TextInput
          placeholder="Full Name"
          placeholderTextColor={colors.graytext4}
          style={{...GernalStyle.textinput, marginTop: getHeight(4)}}
          ref={inputRefs.fullname}
          value={state.fullname}
          returnKeyType={'send'}
          keyboardType={'default'}
          onFocus={() => setState({...state, fullnameError: ''})}
          onBlur={() =>
            validateFields(state.fullname, 'fullname', error =>
              setState({...state, fullnameError: error}),
            )
          }
          onSubmitEditing={() => inputRefs?.email?.current?.focus()}
          onChangeText={fullname =>
            changeHandler('fullname', fullname)
          }
          blurOnSubmit={false}
        />
        {state.fullnameError && (
          <Text
            style={[
              GernalStyle.inputError,
              {width: getWidth(90), alignSelf: 'center'},
            ]}>
            {state.fullnameError}
          </Text>
        )}
        <TextInput
          placeholder="Email address"
          placeholderTextColor={colors.graytext4}
          style={{...GernalStyle.textinput, marginTop: getHeight(1.5)}}
          ref={inputRefs.email}
          returnKeyType={'next'}
          onChangeText={email => changeHandler('email', email.trim())}
          value={state.email}
          keyboardType="email-address"
          onFocus={() => setState({...state, emailError: ''})}
          onBlur={() =>
            validateFields(state.email, 'email', error =>
              setState({...state, emailError: error}),
            )
          }
          onSubmitEditing={() => inputRefs.question.current?.focus()}
          blurOnSubmit={false}
        />
        {state.emailError && (
          <Text
            style={[
              GernalStyle.inputError,
              {width: getWidth(90), alignSelf: 'center'},
            ]}>
            {state.emailError}
          </Text>
        )}
        {/* <TextInput
          placeholder="Password"
          placeholderTextColor={colors.graytext4}
          style={{...GernalStyle.textinput, marginTop: getHeight(1.5)}}
          ref={inputRefs.password}
          value={state.password}
          returnKeyType={'send'}
          keyboardType={'default'}
          onFocus={() => setState({...state, passwordError: ''})}
          onBlur={() =>
            validateFields(state.password, 'password', error =>
              setState({...state, passwordError: error}),
            )
          }
          onSubmitEditing={() => inputRefs?.question?.current?.focus()}
          onChangeText={password =>
            changeHandler('password', password.trim())
          }
          blurOnSubmit={false}
        />
        {state.passwordError && (
          <Text
            style={[
              GernalStyle.inputError,
              {width: getWidth(90), alignSelf: 'center'},
            ]}>
            {state.passwordError}
          </Text>
        )} */}
        <TextInput
          textAlignVertical="top"
          multiline
          numberOfLines={3}
          placeholder="Write your question/concern/feedback"
          placeholderTextColor={colors.graytext4}
          style={{
            ...GernalStyle.textinput,
            marginTop: getHeight(1.5),
            height: getHeight(15),
          }}
          ref={inputRefs.question}
          value={state.question}
          returnKeyType={'send'}
          keyboardType={'default'}
          onFocus={() => setState({...state, questionError: ''})}
          onBlur={() =>
            validateFields(state.question, 'question', error =>
              setState({...state, questionError: error}),
            )
          }
          onSubmitEditing={() => ContectUs()}
          onChangeText={question =>
            changeHandler('question', question)
          }
          blurOnSubmit={false}
        />
        {state.questionError && (
          <Text
            style={[
              GernalStyle.inputError,
              {width: getWidth(90), alignSelf: 'center'},
            ]}>
            {state.questionError}
          </Text>
        )}
        <Text
          style={styles.textcontect}>
          A member of our support staff will respond as soon as possible.
        </Text>
      </KeyboardAwareScrollView>
      <Button
        buttonText={'Submit'}
        style={{position: 'absolute', bottom: getHeight(4)}}
        onPress={()=>ContectToUser()}
      />
    </View>
  );
};

export default ContactUs;
