import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
 Image,
  Text,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Divider} from 'react-native-paper';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {setLoader} from '../../Redux/actions/GernalActions';
import {ApiCall} from '../../Services/Apis';
import {
  getFontSize,
  getHeight,
  getWidth,
  timeSince,
} from '../../../utils/ResponsiveFun';


import Feather from 'react-native-vector-icons/Feather';
import GeneralStatusBar from '../../Components/GeneralStatusBar';
import Header from '../../Components/Header';
import {getChats, setAllSms} from '../../Redux/actions/GernalActions';

const Message = props => {
  const dispatch = useDispatch();
  console.log('started')
  const token = useSelector(state => state.auth.userToken);
  const [state, setState] = useState([]);
  const chats = useSelector(state => state.gernal.chats);
  const user = useSelector(state => state.auth.userData);
  const [refreshing, setRefreshing] = useState(false);
  const getAllSms = async item => {
    try {
      dispatch(setLoader(true));
      const res = await ApiCall({
        route: `chat/get-messages/${item?._id}`,
        verb: 'get',
        token: token,
      });
      if (res?.status == '200') {
        dispatch(setLoader(false));
        console.log('item', item);
        props.navigation.navigate('ConversationScreen', {
          channelId: item?._id,
          chatRoomType: item?.chatRoomType,
          sender: user,
          reciver: item?.coachId,
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
        console.log('error', res?.response);
        dispatch(setLoader(false));

        alert(res?.response?.error);
      }
    } catch (e) {
      dispatch(setLoader(false));

      console.log('saga error -- ', e.toString());
    }
  };

  useEffect(() => {
    dispatch(getChats({token}));
  }, []);

  const chatRoom = async () => {
    try {
      const res = await ApiCall({
        route: 'chat/get-chat-rooms',
        token: token,
        verb: 'get',
      });

      if (res?.status == '200') {
        //console.log('resssss', res?.response);
        setState(res?.response);
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
  };
  useEffect(() => {
    dispatch(setLoader(true));
    chatRoom();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GeneralStatusBar
        backgroundColor="white"
        barStyle="dark-content"
        hidden={false}
        translucent={true}
      />
      <Header
        title={'Messages'}
        RightIcon={
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            {/* <Image
              style={{
                width: 37,
                height: 37,
                borderRadius: 10,
              }}
              source={
                user?.profileImage
                  ? {uri: user?.profileImage}
                  : require('../../assets/images/Profile.png')
              }
            /> */}
          </TouchableOpacity>
        }
      />
      <Divider
        style={{
          height: 1,
          backgroundColor: '#182d4a26',
          borderRadius: 10,
          width: '93%',
          marginTop: 15,

          alignSelf: 'center',
        }}
      />

      <FlatList
      
        data={state}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Divider />}
        onRefresh={() => chatRoom()}
        refreshing={false}
        ListEmptyComponent={() => (
          <View
            style={{
              flex: 1,
              height: getHeight(80),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: getFontSize(3),
                color: '#182d4a',
                fontWeight: '500',
                fontFamily: 'Ubuntu-Regular',
              }}>
              No messages yet
            </Text>
            <Text
              style={{
                width: '80%',
                fontFamily: 'Ubuntu-Regular',
                textAlign: 'center',
                color: '#182d4a',
                letterSpacing: 0.5,
                marginTop: 5,
              }}>
              Looks like you haven’t initiated a converstion with your Coach.
            </Text>
          </View>
        )}
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={() => dispatch(({token}))}
        //   />
        // }
        renderItem={({item, index}) => (
          <TouchableOpacity
            onPress={() => {
              getAllSms(item);
            }}
            // onPress={() => navigation.navigate('ConversationScreen')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: 10,
              height: getHeight(10),
              alignItems: 'center',
            }}>
           
              {/* <Image
                style={{height: 45, width: 45, borderRadius: 40}}
                resizeMode={'cover'}
                source={
                  item?.coachId?.profileImage
                    ? {uri: item?.coachId?.profileImage}
                    : require('../../assets/images/Profile.png')
                }
              /> */}
              
            <View style={{flex: 1, marginLeft: getWidth(5)}}>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'Ubuntu-Bold',
                  color: '#182d4a',
                }}>
                {item?.coachId.firstName} {item?.coachId.lastName}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: '#70747d',
                  fontFamily: 'Ubuntu-Regular',

                  marginTop: 5,
                }}>
                {item?.last_message?.message || 'Tap to start chatting...'}
              </Text>
            </View>
            <View>
              {item?.unread_count ? (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'flex-end',
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    marginBottom: 7,
                    backgroundColor: '#032f3c',
                    color: 'white',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                    }}>
                    {item?.unread_count}
                  </Text>
                </View>
              ) : null}
              {item?.last_message?.message ? (
                <Text
                  style={{
                    color: '#70747d',
                    fontFamily: 'Ubuntu-Bold',
                    fontSize: 9,
                  }}>
                  {timeSince(new Date(item?.last_message?.createdAt))} ago
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Message;
