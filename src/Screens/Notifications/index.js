import React, {Component, useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import moment from 'moment';
import Modal from 'react-native-modal';
import {Colors, Divider, RadioButton} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';

import Button from '../../Components/Button';
import Header from '../../Components/Header';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import {ApiCall, GetApiCallWithHeader} from '../../Services/Apis';
import {useDispatch, useSelector} from 'react-redux';
import GeneralStatusBar from '../../Components/GeneralStatusBar';
import {setLoader} from '../../Redux/actions/GernalActions';
// create a component
const Notification = ({navigation}) => {
  const dispatch = useDispatch();
  const [DATA, SetDATA] = useState([]);
  const token = useSelector(state => state.auth.userToken);

  const getAllNotification = async () => {
    try {
      const res = await ApiCall({
        route: 'notifications/my-notifications',
        token: token,
        verb: 'get',
      });

      if (res?.status == '200') {
        console.log('res payment', res?.response);
        SetDATA(res?.response?.data);
        dispatch(setLoader(false));
      } else {
        console.log('error', res.response);
        dispatch(setLoader(false));
      }
    } catch (e) {
      console.log('saga get notfication error -- ', e.toString());
    }
  };
  useEffect(() => {
    dispatch(setLoader(true));
    getAllNotification();
  }, []);

  return (
    <View style={styles.container}>
      <GeneralStatusBar
        backgroundColor="white"
        barStyle="dark-content"
        hidden={false}
        translucent={true}
      />
      <View
        style={{
          flexDirection: 'row',
          width: getWidth(60),
          justifyContent: 'space-around',
        }}>
        <Ionicons
          onPress={() => navigation.goBack()}
          name={'chevron-back'}
          size={27}
          color={'#006D65'}
          style={{
            marginTop: getHeight(2),
          }}
        />

        <Text
          style={{
            color: '#006D65',
            // fontFamily: 'Poppins-Bold',
            fontWeight: '700',
            marginLeft: getWidth(20),
            fontSize: 16,
            lineHeight: 36,
            marginTop: getHeight(1),

            alignSelf: 'center',
          }}>
          Notification
        </Text>
      </View>

      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          useFlatList={true}
          data={DATA}
          keyExtractor={(item, index) => index}
          ListEmptyComponent={() => (
            <View
              style={{
                height: getHeight(70),
                width: getWidth(100),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>You have no any Notification Now</Text>
            </View>
          )}
          ItemSeparatorComponent={() => <Divider />}
          ListHeaderComponent={() => <View style={{height: getHeight(2)}} />}
          ListFooterComponent={() => <View style={{margin: getHeight(12)}} />}
          renderItem={({item, index}) => (
            <TouchableOpacity activeOpacity={1}>
              <View style={styles.card}>
                <View style={styles.RowView}>
                  <View style={styles.Iconbg}>
                    <MaterialCommunityIcons
                      name={'bell-ring-outline'}
                      size={30}
                      color={'#006D65'}
                    />
                  </View>
                  <View>
                    <Text numberOfLines={1} style={styles.heading}>
                      {item?.type}
                    </Text>
                    <Text numberOfLines={2} style={styles.paragraph}>
                      {item?.notification}
                    </Text>
                    <Text style={styles.Time}>
                      {moment(item?.createdAt).format('YYYY-MM-DD')}
                    </Text>
                  </View>
                  <View style={styles.active} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Notification;
