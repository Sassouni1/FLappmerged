import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Button from '../Button';
import {validateFields} from '../../../utils/validation/validate-fields';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import {useDispatch, useSelector} from 'react-redux';
import {getSingleUser, loginRequest} from '../../Redux/actions/AuthActions';
import validator from '../../../utils/validation/validator';
import {GernalStyle} from '../../constants/GernalStyle';
import {setLoader} from '../../Redux/actions/GernalActions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ApiCall } from '../../Services/Apis';

const CardPayment = ({add}) => {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken);

  const dispatch = useDispatch();
  const inputRefs = {
    Cardnumber: useRef(null),
    ExpiryYear: useRef(null),
    Expirydate: useRef(null),
    Securitycode: useRef(null),
    password: useRef(null),
  };
  const [state, setState] = useState({
    Cardnumber: '',
    CardnumberError: '',
    Cardname: '',
    CardnameError: '',
    ExpiryYear: '',
    ExpiryYearError: '',
    Expirydate: '',
    ExpirydateError: '',
    Securitycode: '',
    SecuritycodeError: '',
  });

  const subscribed = async () => {
    const {Cardnumber, ExpiryYear, Expirydate, Securitycode,Cardname} = state;
    const CardnumberError = await validator('Cardnumber', Cardnumber);
    const CardnameError = await validator('Cardname', Cardname);
    const ExpiryYearError = await validator('ExpiryYear', ExpiryYear);
    const ExpirydateError = await validator('Expirydate', Expirydate);
    const SecuritycodeError = await validator('Securitycode', Securitycode);

    if (
      !CardnumberError &&
      !CardnameError&&
      !ExpiryYearError &&
      !ExpirydateError &&
      !SecuritycodeError
    ) {
      dispatch(setLoader(true));
      try {
        const res = await ApiCall({
          route: add?`coach/add-card-on-stripe/${user?._id}`:`coach/create-subscription-onstripe/${user?._id}`,
          verb: 'post',
          token: token,
params:{"cardNumber":Cardnumber,
"expMonth":Expirydate,
"expYear":ExpiryYear,
"cvc":Securitycode,
"customerId":user?.customerId}
        });
        if (res?.status == 200) {
          dispatch(setLoader(false))
          
          dispatch(getSingleUser(token))
          navigation.navigate('Home')
          console.log('res', res?.response);
          
        } else {
          dispatch(setLoader(false))
          console.log('error', res?.response);
          alert(res?.response)
        }
      } catch (e) {
        dispatch(setLoader(false))
     
        console.log('api error -- ', e.toString());
      }
     
    } else {
      dispatch(setLoader(false));
      setState({
        ...state,
        CardnumberError,
        CardnameError,
        ExpiryYearError,
        ExpirydateError,
        SecuritycodeError,
      });
    }
  };
  const changeHandler = (type, value) => setState({...state, [type]: value});

  return (
    <View style={styles.contaner}>
   <KeyboardAwareScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
   <View>
        <TextInput
          mode="outlined"
          label="Card holder name"
          theme={{roundness: 15}}
          outlineColor="#BDC3C4"
          activeUnderlineColor="#ffff"
          activeOutlineColor="#BDC3C4"
          style={GernalStyle.input}
          ref={inputRefs.Cardname}
          value={state.Cardname}
          returnKeyType={'next'}
          keyboardType="default"
          onFocus={() => setState({...state, CardnameError: ''})}
          onBlur={() =>
            validateFields(state.Cardname, 'Cardname', error =>
              setState({...state, CardnameError: error}),
            )
          }
          onSubmitEditing={() => inputRefs['Cardnumber'].current.focus()}
          onChangeText={Cardname =>
            changeHandler('Cardname', Cardname.trim())
          }
          blurOnSubmit={false}
        />
        <Text style={GernalStyle.InputError}>{state.CardnameError}</Text>
      </View>
   <View>
        <TextInput
          mode="outlined"
          label="Card number"
          theme={{roundness: 15}}
          outlineColor="#BDC3C4"
          activeUnderlineColor="#ffff"
          activeOutlineColor="#BDC3C4"
          style={GernalStyle.input}
          ref={inputRefs.Cardnumber}
          value={state.Cardnumber}
          returnKeyType={'next'}
          keyboardType="numeric"
          onFocus={() => setState({...state, CardnumberError: ''})}
          onBlur={() =>
            validateFields(state.Cardnumber, 'Cardnumber', error =>
              setState({...state, CardnumberError: error}),
            )
          }
          onSubmitEditing={() => inputRefs['ExpiryYear'].current.focus()}
          onChangeText={Cardnumber =>{
            changeHandler('Cardnumber', Cardnumber.trim())}
          }
          blurOnSubmit={false}
        />
        <Text style={GernalStyle.InputError}>{state.CardnumberError}</Text>
      </View>
      <View>
        <TextInput
          mode="outlined"
          label="Expiry Year"
          theme={{roundness: 15}}
          
          outlineColor="#BDC3C4"
          activeUnderlineColor="#ffff"
          activeOutlineColor="#BDC3C4"
          style={GernalStyle.input}
          placeholderTextColor="red"
          ref={inputRefs.ExpiryYear}
          value={state.ExpiryYear}
          returnKeyType={'next'}
          keyboardType="numeric"
          onFocus={() => setState({...state, ExpiryYearError: ''})}
          onBlur={() =>
            validateFields(state.ExpiryYear, 'ExpiryYear', error =>
              setState({...state, ExpiryYearError: error}),
            )
          }
          onSubmitEditing={() => inputRefs['Expirydate'].current.focus()}
          onChangeText={ExpiryYear =>
            changeHandler('ExpiryYear', ExpiryYear.trim())
          }
          blurOnSubmit={false}
        />
        <Text style={GernalStyle.InputError}>{state.ExpiryYearError}</Text>
      </View>
      <View>
        <TextInput
          mode="outlined"
          label="Expiry Month"
          theme={{roundness: 15}}
          outlineColor="#BDC3C4"
          activeUnderlineColor="#ffff"
          activeOutlineColor="#BDC3C4"
          style={GernalStyle.input}
          ref={inputRefs.Expirydate}
          value={state.Expirydate}
          returnKeyType={'next'}
          keyboardType="numeric"
          onFocus={() => setState({...state, ExpirydateError: ''})}
          onBlur={() =>
            validateFields(state.Expirydate, 'Expirydate', error =>
              setState({...state, ExpirydateError: error}),
            )
          }
          onSubmitEditing={() => inputRefs['Securitycode'].current.focus()}
          onChangeText={Expirydate =>
            changeHandler('Expirydate', Expirydate.trim())
          }
          blurOnSubmit={false}
        />
        <Text style={GernalStyle.InputError}>{state.ExpirydateError}</Text>
      </View>
      <View>
        <TextInput
          mode="outlined"
          label="CVV"
          theme={{roundness: 15}}
          outlineColor="#BDC3C4"
          activeUnderlineColor="#ffff"
          activeOutlineColor="#BDC3C4"
          placeholderTextColor={'#182d4a'}
          clearTextOnFocus="#182d4a"
          style={GernalStyle.input}
          ref={inputRefs.Securitycode}
          value={state.Securitycode}
          returnKeyType={'send'}
          keyboardType="numeric"
      
          onFocus={() => setState({...state, SecuritycodeError: ''})}
          onBlur={() =>
            validateFields(state.Securitycode, 'Securitycode', error =>
              setState({...state, SecuritycodeError: error}),
            )
          }
          onSubmitEditing={() => subscribed()}
          onChangeText={Securitycode =>
            changeHandler('Securitycode', Securitycode.trim())
          }
          blurOnSubmit={false}
        />

        <Text style={GernalStyle.InputError}>{state.SecuritycodeError}</Text>
      </View>
 

      {/* <View style={styles.forgotView}>
        <View>
          <Text style={styles.paymentdetail}>Payment details</Text>
          <View style={styles.txtview} />
        </View>
        <Text style={styles.dolar}>
          $30
          <Text style={styles.month}>/month</Text>
        </Text>
        <View style={styles.nonvew}></View>
      </View> */}

      <Button
        onPress={() => {subscribed()}}
        text={add?"Add Card":"Confirm payment"}
        btnStyle={{...GernalStyle.btn, marginTop: getHeight(6)}}
        btnTextStyle={GernalStyle.btnText}
      /></KeyboardAwareScrollView>
    </View>
  );
};

export default CardPayment;
