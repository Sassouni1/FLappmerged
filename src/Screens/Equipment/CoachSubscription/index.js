import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {RadioButton} from 'react-native-paper';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import Button from '../../../Components/Button';
import {styles} from './Styles';
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Divider} from 'react-native-paper';
import {GernalStyle} from '../../../constants/GernalStyle';
import Header from '../../../Components/Header';
import { async } from 'validate.js';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { ApiCall } from '../../../Services/Apis';
import { setLoader } from '../../../Redux/actions/GernalActions';
const CoachSubscription = ({navigation}) => {
  const [checked, setChecked] = React.useState('first');
  const dispatch=useDispatch();
  const user=useSelector((state)=>state.auth.userData)
  const token=useSelector((state)=>state.auth.userToken)
  const [state, setState] = useState();
  const [myPlan, setMyPlan] = useState();

  const [cards,setCards]=useState([])

  const getAllCard=async()=>{

    try {
      const res = await ApiCall({
        route: `coach/list-payment-methods/${user?._id}`,
        verb: 'get',
        token: token,
      });
      if (res?.status == 200) {
    dispatch(setLoader(false))

        setCards(res?.response?.data)
      } else {
    dispatch(setLoader(false))

        console.log('error', res?.response);
      }
    } catch (e) {
      console.log('saga error -- ', e.toString());
    }
  }
  const getSubcriptionPlan=async()=>{

    try {
      const res = await ApiCall({
        route: `coach/get-stripe-subscription-details`,
        verb: 'get',
        token: token,
      });
      if (res?.status == 200) {
    dispatch(setLoader(false))
console.log('RES',res)
        setMyPlan(res?.response?.data)
      } else {
    dispatch(setLoader(false))

        console.log('error', res?.response);
      }
    } catch (e) {
      console.log('saga error -- ', e.toString());
    }
  }
  const getPaypalSubcriptionPlan=async()=>{

    try {
      const res = await ApiCall({
        route: `coach/get-subscription`,
        verb: 'get',
        token: token,
      });
      if (res?.status == 200) {
    dispatch(setLoader(false))
console.log('RES',res)
        setMyPlan(res?.response?.data)
      } else {
    dispatch(setLoader(false))

        console.log('error', res?.response);
      }
    } catch (e) {
      console.log('saga error -- ', e.toString());
    }
  }
  const deleteCard=async(id)=>{
dispatch(setLoader(true))
    try {
      const res = await ApiCall({
        route: `coach/detach-payment-methods/${user?._id}`,
        verb: 'put',
        token: token,
        params:{paymentId:id}
      });
      if (res?.status == 200) {

    getAllCard()
      } else {
    dispatch(setLoader(false))

        console.log('error', res?.response);
      }
    } catch (e) {
      console.log('saga error -- ', e.toString());
    }
  }
  const updateCard=async(id)=>{
    dispatch(setLoader(true))
        try {
          const res = await ApiCall({
            route: `coach/update-payment-method`,
            verb: 'put',
            token: token,
            params:{newPaymentMethodId:id}
          });
          if (res?.status == 200) {
    
        getAllCard()
          } else {
        dispatch(setLoader(false))
    
            console.log('error', res?.response);
          }
        } catch (e) {
          console.log('saga error -- ', e.toString());
        }
      }

  useEffect(()=>{
    dispatch(setLoader(true));
   user?.paymentSource=='paypal' ?getPaypalSubcriptionPlan():getSubcriptionPlan()
    getAllCard();
  },[user])
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header
        title={' Coach Me Subscription'}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={{alignSelf: 'center', marginRight: getWidth(2)}}
              name={'arrow-back'}
              size={25}
              color={'#182d4a'}
            />
          </TouchableOpacity>
        }
      />
      <Divider style={styles.headerDivider} />
      <LinearGradient
        colors={['#F5F5F5', '#F5F5F5', '#FFFFFF']}
        style={styles.main}>
        <View style={{backgroundColor: '#182d4a0'}}>
          <Text style={styles.heading}>My subscription</Text>
          <View style={styles.planView}>
            <View style={{flexDirection: 'row'}}>
              <MaterialIcons
                name={'self-improvement'}
                size={35}
                color={'#182d4a'}
              />
              <Text style={styles.planText}>Monthly plan</Text>
            </View>
            <Text style={styles.planPrice}>
              $30
              <Text style={styles.planMonth}>/month</Text>
            </Text>
          </View>
          <Text style={{...styles.heading, marginTop: getHeight(3)}}>
            Payment methods
          </Text>
          <View style={{height: getHeight(50)}}>
          <FlatList
      data={cards}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <View style={{padding: 10}} />}
      ItemSeparatorComponent={() => <View style={{padding: 5}} />}
     onRefresh={()=>getAllCard()}
      ListEmptyComponent={() => (
        <View
          style={{
            height: getHeight(70),
            width: getWidth(100),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black'}}>
            You have no any Card
          </Text>
        </View>
      )}
      renderItem={({item}) => (<View>
        {state!=item?.id ? (
          <TouchableOpacity
            style={styles.list}
            onPress={() => setState(item?.id)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Fontisto name={'visa'} size={20} color={'#182d4a'} />
              <Text
                style={{
                  color: '#182d4a',
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  lineHeight: 15,
                  left: getWidth(5),
                }}>
                ***{item?.card?.last4}
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  color: '#182d4a',
                  fontSize: 10,
                  fontFamily: 'Ubuntu-Regular',
                  fontWeight: '700',
                }}>
                Using this
              </Text>
              <RadioButton
                color="#182d4a"
                value="first"
                status={checked === 'first' ? 'checked' : 'unchecked'}
                onPress={() => setChecked('first')}
              />
              <MaterialIcons
                name={'keyboard-arrow-down'}
                size={25}
                color={'#182d4a'}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setState(null)}>
            <View style={styles.openBox}>
              <View style={styles.list2}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Fontisto name={item?.card?.brand} size={20} color={'#182d4a'} />
                  <Text
                    style={{
                      color: '#182d4a',
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 12,
                      lineHeight: 15,
                      left: getWidth(5),
                    }}>
                    ***{item?.card?.last4}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: '#182d4a',
                      fontSize: 10,
                      fontFamily: 'Ubuntu-Regular',
                      fontWeight: '700',
                    }}>
                    Using this
                  </Text>
                  <RadioButton
                    color="#182d4a"
                    value="first"
                    status={checked === 'second' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('second')}
                  />
                  <MaterialIcons
                    name={'keyboard-arrow-up'}
                    size={25}
                    color={'#182d4a'}
                  />
                </View>
              </View>
           
              <View style={styles.mview}>
                <Text
                  onPress={()=>deleteCard(item?.id)}
                  style={styles.skip}>
                  Delete card
                </Text>

                <Button
                 onPress={()=>updateCard(item?.id)}
                  text="Update"
                  btnStyle={{...GernalStyle.btn, width: getWidth(30)}}
                  btnTextStyle={GernalStyle.btnText}
                />
              </View>
            </View>
          </TouchableOpacity>
        )}</View>
      )}
      keyExtractor={item => item.id}
    />
           
            
          </View>
        </View>
        <View
          style={{
            position: 'absolute',
            width: getWidth(90),
            bottom: getHeight(4),
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text onPress={() => navigation.navigate('Home')} style={styles.skip}>
            Cancel subscription
          </Text>
          <Button
          onPress={()=>navigation.navigate('AddCard')}
            text="+"
            btnStyle={{
              ...GernalStyle.btn,
              height: 70,
              width: 70,
            }}
            btnTextStyle={{
              ...GernalStyle.btnText,
              fontSize: 34,
              alignSelf: 'center',
            }}
          />
        </View>
      </LinearGradient>
    </View>
  );
};
export default CoachSubscription;
