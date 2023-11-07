import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../constants/colors';
import {GernalStyle} from '../../constants/GernalStyle';
import GeneralStatusBar from '../../Components/GeneralStatusBar';
// import AppHeader from '../../Components/AppHeader';
import Entypo from 'react-native-vector-icons/Entypo'
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import {
  ChatUser1,
  ChatUserBtn,
  UserChat2,
  UserChat3,
} from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {setLoader} from '../../Redux/actions/GernalActions';
import {useDispatch, useSelector} from 'react-redux';
import {ApiCall} from '../../Services/Apis';
import HeaderBottom from '../../Components/HeaderBottom';

const Messages = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [users, setAllUser] = useState([]);
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const token = useSelector(state => state.auth.userToken);
  const user = useSelector(state => state.auth.userData);
  console.log('user',user)

  const ChatroomUser = async () => {
    dispatch(setLoader(true))
    try {
      const res = await ApiCall({
        params: {category_name: 'skill'},
        route: 'chat/all_chatrooms_users',
        verb: 'get',
        token: token,
      });

      console.log('chatrooms id for all chat', res?.response?.chatrooms);
      if (res?.status == '200') {
        const chatroom = res?.response?.chatrooms;

        const users = chatroom?.map(chatroom => chatroom?.user);

        console.log('users ', users);
        setAllUser(users);
        // console.log('workout',res?.response?.detail)

        // setData(res?.response?.detail)
        // setProgram(res?.response?.detail?.workouts);
        dispatch(setLoader(false));
        // navigation.goBack();

        // navigation.navigate('HomeScreen');
      } else {
        dispatch(setLoader(false));

        alert(res?.response?.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } catch (e) {
      console.log('api get skill error -- ', e.toString());
    }
  };
  useEffect(() => {
    ChatroomUser();
  }, []);
  const HeadingText = ({style, buttontext}) => {
    return (
      <View style={[styles.heading, style]}>
        <Text style={styles.headingtext}>{buttontext}</Text>
      </View>
    );
  };
  const ChatUser = ({userImg, userName, lastmsg, style, onPress}) => {
    return (
      <View style={{alignSelf: 'center'}}>
        <View style={styles.chatCon}>
          <TouchableOpacity onPress={onPress} style={styles.row}>
            <View style={[{...styles.logoCon, marginLeft: getWidth(4)}, style]}>
              {userImg}
            </View>
            <View>
              <View style={styles.userCon}>
                <Text style={styles.username}>{userName}</Text>
                <Text style={styles.time}>11:40 AM</Text>
              </View>
              <Text style={styles.lastmsg}>{lastmsg}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1,backgroundColor:'rgba(51, 51, 51, 1)'}}>
    <GeneralStatusBar
       barStyle="light-content"
       hidden={false}
       backgroundColor="rgba(51, 51, 51, 1)"
     />
      <HeaderBottom
       title={'Chats'}
       LeftIcon={
         <Entypo size={30} color={'white'} onPress={()=>navigation.openDrawer()} name='menu'/>

       }
       RightIcon={<View/>}
     />
      <HeadingText buttontext={'App'} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: getWidth(100),
        }}>
        <View style={styles.chatCon}>
          <View style={styles.row}>
            <View style={{...styles.logoCon, marginLeft: getWidth(4)}}>
              <Text style={styles.logotext}>logo</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('ConversationScreen',{channelId:user.groupChatId, channelName:'DaruStrong', reciver:{}, sender:user, chatRoomType:'App'})}>
              <View style={styles.userCon}>
                <Text style={styles.username}>DaruStrong</Text>
                <Text style={styles.time}>11:40 AM</Text>
              </View>
              <Text style={styles.lastmsg}>
                Yes, you can repeat some exercise today.
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <HeadingText buttontext={'Community'} style={{marginTop: getHeight(0)}} />
      <ChatUser
        onPress={() => navigation.navigate('ConversationScreen',{channelId:user.groupChatId, channelName:'DaruStrong', reciver:{}, sender:user, chatRoomType:'App'})}
        userImg={<ChatUser1 height={30} width={30} />}
        userName={'App Community'}
        lastmsg={
          '4 litres per day is recommended for the one that is continuo...'
        }
      />
      <HeadingText buttontext={'Members'} style={{marginTop: getHeight(0)}} />
      <View style={{alignSelf: 'center', flex: 1}}>
        <FlatList
          data={users}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{height: getHeight(4)}} />}
          renderItem={({item}) => {
            // console.log('item,',item)
            return (
              <View style={{...styles.chatCon, height: getHeight(11)}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ConversationScreen',{channelId:user.groupChatId, channelName:'DaruStrong', reciver:{}, sender:user, chatRoomType:'App'})
                  }
                  style={{...styles.row, marginTop: 5}}>
                  <View
                    style={{
                      ...styles.logoCon,
                      marginLeft: getWidth(4),
                      marginTop: 5,
                      backgroundColor: colors.gray8,
                    }}>
                    {item?.profile_image == '' ? (
                      <UserChat3 height={60} width={60} />
                    ) : (
                      <Image
                        resizeMode="contain"
                        style={{height: 60, width: 60, borderRadius: 30}}
                        source={{uri: item?.profile_image}}
                      />
                    )}
                  </View>
                  <View>
                    <View style={styles.userCon}>
                      <Text style={styles.username}>{item?.full_name}</Text>
                      <Text style={styles.time}>
                        {item?.createdAt.slice(11, 19)}
                      </Text>
                    </View>
                    <Text style={styles.lastmsg}>
                      It will help you in anyway. Trust me.
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('AllMember')}
        style={{
          height: getHeight(7),
          width: getWidth(15),
          borderRadius: 9,
          justifyContent: 'center',
          alignItems: 'center',
          right: getWidth(3),
          bottom: getHeight(2.5),
          position: 'absolute',
          backgroundColor: colors.greenlight,
        }}>
        <ChatUserBtn height={25} width={25} />
      </TouchableOpacity>
    </View>
  );
};

export default Messages;
