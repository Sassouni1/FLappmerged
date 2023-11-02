import React, {useState, useRef, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  StatusBar,
  RefreshControl,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import Button from '../../Components/Button';
import {styles} from './styles';
import {SceneMap, TabView} from 'react-native-tab-view';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import AntDesign from 'react-native-vector-icons/AntDesign';
import validator from '../../../utils/validation/validator';
import {useNavigation} from '@react-navigation/native';
import {validateFields} from '../../../utils/validation/validate-fields';

import {TouchableOpacity} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {setAllSms, setLoader} from '../../Redux/actions/GernalActions';
import {patientSignupRequest} from '../../Redux/actions/AuthActions';
import {ApiCall} from '../../Services/Apis';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';

const History = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.userToken);
  const [refreshing, setRefreshing] = useState(false);

  const [data, setData] = useState([]);

  const getHistory = async () => {
    try {
      const res = await ApiCall({
        route: 'consultations/get-history-consultation',
        verb: 'get',
        token: token,
      });

      if (res?.status == '200') {
        setData(res?.response);

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
  const getAllSms = async item => {
    try {
      dispatch(setLoader(true));
      const res = await ApiCall({
        route: `twilio/get-messages/${item?._id}`,
        verb: 'get',
        token: token,
      });
      if (res?.status == '200') {
        dispatch(setLoader(false));

        console.log('res', res?.response);
        navigation.navigate('conversation', {
          channelId: item?._id,
          channelName: item?.conversationName,
          chatRoomType: item?.chatRoomType,
          sender: item?.patientId,
          reciver: item?.doctorId,
        });
        const newArrayOfObj = res?.response.map(
          ({sender: user, message: text, ...rest}) => ({
            user,
            text,
            ...rest,
          }),
        );
        dispatch(setAllSms(newArrayOfObj));
      } else {
        // console.log('error', res?.response);
        dispatch(setLoader(false));

        alert(res?.response?.error);
      }
    } catch (e) {
      dispatch(setLoader(false));

      console.log('saga error -- ', e.toString());
    }
  };
  useEffect(() => {
    getHistory();
  }, []);
  return (
    <FlatList
      data={data}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={() => <View style={{padding: 10}} />}
      ItemSeparatorComponent={() => <View style={{padding: 5}} />}
      refreshing={refreshing}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => getHistory()}
        />
      }
      ListEmptyComponent={() => (
        <View
          style={{
            height: getHeight(70),
            width: getWidth(100),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'black'}}>
            You have no any Previous Consultation
          </Text>
        </View>
      )}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => getAllSms(item?.chatRoomId)}
          style={styles.box}>
          <View style={styles.upv}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
                width: '100%',
              }}>
              <Text style={{...styles.num, width: getWidth(40)}}>
                Patient: {item?.firstName + ' ' + item?.lastName}
              </Text>

              <View style={styles.videocall}>
                <View
                  style={{
                    paddingHorizontal: 15,
                    flexDirection: 'row',
                    paddingVertical: 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {item?.consultationType == 'video_call' ? (
                    <FontAwesome
                      name={'video-camera'}
                      size={getFontSize(2.5)}
                      color={'#02C4B7'}
                    />
                  ) : item?.consultationType == 'phone_call' ? (
                    <Feather
                      name={'phone-call'}
                      size={getFontSize(2.5)}
                      color={'#02C4B7'}
                    />
                  ) : (
                    <Ionicons
                      name={'document-text-outline'}
                      size={getFontSize(2.5)}
                      color={'#02C4B7'}
                    />
                  )}

                  <Text style={styles.paid}>
                    {item?.consultationType == 'video_call'
                      ? 'Video call'
                      : item?.consultationType == 'phone_call'
                      ? 'Audio call'
                      : 'Written Report '}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Text style={styles.issue}>Orthopedic issue: {item?.medical}</Text>
          <Text style={{...styles.issue, marginLeft: 7}}>
            State: {item?.state}
          </Text>

          <View style={styles.date}>
            <AntDesign
              name={'calendar'}
              size={getFontSize(3)}
              color={'#006D65'}
              style={styles.icon}
            />
            <Text style={styles.paid1}>
              {new Date(item?.timeSlot?.startTime).toLocaleString(undefined, {
                year: 'numeric',

                month: 'long',
                day: '2-digit',

                weekday: 'long',
                hour: '2-digit',
                hour12: true,
                minute: '2-digit',
              })}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id}
    />
  );
};
export default History;
