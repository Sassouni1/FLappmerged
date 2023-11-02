import React, {useState, useRef, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getHeight, getWidth} from '../../../utils/ResponsiveFun';
import {WebView} from 'react-native-webview';
import { setLoader } from '../../Redux/actions/GernalActions';
import { ApiCall } from '../../Services/Apis';
import { useNavigation } from '@react-navigation/native';

const PaypalPayment = ({planId}) => {
  const navigation=useNavigation();
  const [url, setUrl] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);
  const user = useSelector(state => state.auth.userData);

  function onMessage(e) {
    dispatch(setLoader(true));
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(data);
    let payment = JSON.parse(data);
    console.log('payemnt', payment);
    if (payment.status === 'COMPLETED') {
      alert('Subscription Purchased Successfully!');
      dispatch(setLoader(true));
      subcriptionPurchased({
        id: payment?.id,
        subscribeDate: payment?.update_time,
      });
    } else {
      dispatch(setLoader(false));
      if(payment.status!='FAILED'){
      alert('PAYMENT FAILED. PLEASE TRY AGAIN.');}
    }
  }
  const subcriptionPurchased = async ({id, subscribeDate}) => {
    try {
      const res = await ApiCall({
        route: 'user/activeSubscription',
        verb: 'patch',
        token: token,
        params: {
          subscriptionID: id,
          subscribeDate: subscribeDate,
          isSubscribed: true,
        },
      });

      if (res?.status == '200') {
       
          navigation.navigate('Home');
       
        dispatch(setLoader(false));
      } else {
        console.log('error', res);
        dispatch(setLoader(false));

        alert(res?.response?.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };

  const [showGateway, setShowGateway] = useState(false);
  const getSubcriptionToken = async () => {
    try {
      const res = await ApiCall({
        route: 'coach/create-subscription/PAYPAL',
        verb: 'post',
        token: token,
      });

      if (res?.status == '200') {
        
        setUrl(res?.response?.links[0]?.href);

        dispatch(setLoader(false));
      } else {
        // console.log('error', res.response);
        dispatch(setLoader(false));

        alert(res?.response?.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };
  useEffect(() => {
    getSubcriptionToken();
  }, []);


  return (

    <WebView
    javaScriptEnabled={true}
    domStorageEnabled={true}
    startInLoadingState={true}
    showsHorizontalScrollIndicator={false}
    showsVerticalScrollIndicator={false}
    scalesPageToFit={true}
    source={{
      uri: `https://my-pay-web.web.app/?client-id=ASuzX8fAuHKJpMA52fPGIqLTGa_ZRAWszSXHUqD_lvI90OahaI9nJBb7MvPHz-rG8TUfKJcZF_OB33Co`,
    }}
    style={{width: getWidth(90), alignSelf: 'center'}}
    onLoadStart={() => {
      dispatch(setLoader(true));
    }}
    onLoadProgress={() => {
      dispatch(setLoader(true));
    }}
    onLoadEnd={() => {
      dispatch(setLoader(false));
    }}
    onLoad={() => {
      dispatch(setLoader(true));
    }}
    onMessage={onMessage}
  />
    
     
  );
};

export default PaypalPayment;

