import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';
import Button from '../Button';
import {validateFields} from '../../../utils/validation/validate-fields';
import {styles} from './styles';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequest} from '../../Redux/actions/AuthActions';
import validator from '../../../utils/validation/validator';
import {GernalStyle} from '../../constants/GernalStyle';
import {setLoader} from '../../Redux/actions/GernalActions';
import {color} from 'react-native-reanimated';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ContactUs from '../../Screens/ContactUs';
import { ApiCall } from '../../Services/Apis';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ContectUsComp = () => {
  const navigation=useNavigation();
  const token = useSelector(state => state.auth.userToken);

  const dispatch = useDispatch();
  const inputRefs = {
    email: useRef(null),
    question: useRef(null),
  };
  const [state, setState] = useState({
    email: '',
    emailError: '',
    question: '',
    questionError: '',
  });


  const ContactUsApi = async () => {

    const {email, question} = state;
    const emailError = await validator('email', email);
    const questionError = await validator('question', question);


    if (!emailError && !questionError) {
      dispatch(setLoader(true));
      try {
        const res = await ApiCall({                                                                         
          route: 'contact/ask-a-question',
          params: {email,question},
          verb: 'post',
          token: token,
        });

        if (res?.status == '200') {
         
          dispatch(setLoader(false));
          navigation.goBack();
        } else {
          dispatch(setLoader(false));
        Alert(res?.response?.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        }
      } catch (e) {
        console.log('saga get language error -- ', e.toString());
      }
      // dispatch(loginRequest({email: email, question: question}));
    } else {
      dispatch(setLoader(false));
      setState({...state, emailError, questionError});
    }
  };
  const changeHandler = (type, value) => setState({...state, [type]: value});
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
      />
      <View style={styles.contaner}>
        <View style={styles.mainview}>
          <KeyboardAwareScrollView
            contentContainerStyle={{height: getHeight(70)}}
            showsVerticalScrollIndicator={false}>
            <View>
              <TextInput
                mode="outlined"
                // label="Email address"
              label={<Text style={GernalStyle.inputLabelStyle}>Email address</Text>} 
                
                theme={{roundness: 15}}
                outlineColor="#BDC3C4"
                activeUnderlineColor="#182d4a"
                activeOutlineColor="#182d4a"
                style={GernalStyle.input}
                ref={inputRefs.email}
                value={state.email}
                returnKeyType={'next'}
                keyboardType="email-address"
                onFocus={() => setState({...state, emailError: ''})}
                onBlur={() =>
                  validateFields(state.email, 'email', error =>
                    setState({...state, emailError: error}),
                  )
                }
                onSubmitEditing={() => inputRefs['question'].current.focus()}
                onChangeText={email => changeHandler('email', email.trim())}
                blurOnSubmit={false}
              />
              <Text style={GernalStyle.InputError}>{state.emailError}</Text>
            </View>
            <View>
              <TextInput
                mode="outlined"
                // label="Write question, concern, or feedback"
              label={<Text style={GernalStyle.inputLabelStyle}>Write question, concern, or feedback</Text>} 

                theme={{roundness: 15}}
                outlineColor="#BDC3C4"
              activeUnderlineColor="#182d4a"
              activeOutlineColor="#182d4a"
                style={{...GernalStyle.input, height: getHeight(20)}}
                ref={inputRefs.question}
                value={state.question}
                returnKeyType={'send'}
                // secureTextEntry={hidePass ? true : false}
                multiline={true}
                onFocus={() => setState({...state, questionError: ''})}
                onBlur={() =>
                  validateFields(state.question, 'question', error =>
                    setState({...state, questionError: error}),
                  )
                }
                onSubmitEditing={() => login()}
                onChangeText={question =>
                  changeHandler('question', question.trim())
                }
                blurOnSubmit={false}
              />

              <Text style={GernalStyle.InputError}>{state.questionError}</Text>
            </View>

            <Button
              onPress={() => ContactUsApi()}
              text="Submit"
              btnStyle={{...GernalStyle.btn, marginTop: getHeight(4)}}
              btnTextStyle={GernalStyle.btnText}
            />
          </KeyboardAwareScrollView>
        </View>
      </View>
    </View>
  );
};

export default ContectUsComp;
