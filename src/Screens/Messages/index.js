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

  const token = useSelector(state => state.auth.userToken);
  const user = useSelector(state => state.auth.userData);
  console.log('user',user)

  const ChatroomUser = async () => {
    try {
      const res = await ApiCall({
        params: {category_name: 'skill'},
        route: 'chat/all_chatrooms_users',
        verb: 'get',
        token: token,
      });


      if (res?.status == '200') {
        const chatroom = res?.response?.chatrooms.map(
          ({sender: user, message: text, ...rest}) => ({
            user,
            text,
            ...rest,
          }),
        );
 console.log('chat Romms',chatroom)
        
        setAllUser( res?.response?.chatrooms);
       
        dispatch(setLoader(false));
 
      } else {
        dispatch(setLoader(false));

        alert(res?.response?.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } catch (e) {
      console.log('api get chatrooms error -- ', e.toString());
    }
  };
  useEffect(() => {
    dispatch(setLoader(true))

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
            <TouchableOpacity onPress={() => navigation.navigate('ConversationScreen',{channelId:user.chatroomId, channelName:'DaruStrong', reciver:{}, sender:user, chatRoomType:'chat'})}>
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
        onPress={() => navigation.navigate('ConversationScreen',{channelId:user.groupChatId, channelName:'App Community', reciver:{}, sender:user, chatRoomType:'groupChat'})}
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
          refreshing={false}
          onRefresh={()=>ChatroomUser()}
          ListFooterComponent={() => <View style={{height: getHeight(4)}} />}
          renderItem={({item}) => {
           console.log('item',item)
            return (
              <View style={{...styles.chatCon, height: getHeight(11)}}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ConversationScreen',{channelId:item._id, channelName:user?._id==item?.user?._id?item?.customer?.full_name:item?.user?.full_name, reciver:user?._id==item?.user?._id?item?.customer:item?.user, sender:user?._id==item?.user?._id?item?.user:item?.customer, chatRoomType:'chat'})
                  }
                  style={{...styles.row, marginTop: 5}}>
                  <View
                    style={{
                      ...styles.logoCon,
                      marginLeft: getWidth(4),
                      marginTop: 5,
                      backgroundColor: colors.gray8,
                    }}>
                    {item?.customer?.profile_image == '' ? (
                      <UserChat3 height={60} width={60} />
                    ) : (
                      <Image
                        resizeMode="contain"
                        style={{height: 60, width: 60, borderRadius: 30}}
                        source={{uri: item?.customer?.profile_image}}
                      />
                    )}
                  </View>
                  <View>
                    <View style={styles.userCon}>
                      <Text style={styles.username}>{user?._id==item?.user?._id?item?.customer?.full_name:item?.user?.full_name}</Text>
                      <Text style={styles.time}>
                    
                      {item?.messages.length>0?new Date(item?.messages[item?.messages.length-1].date).toLocaleTimeString():null}

                      </Text>
                    </View>
                    <Text style={styles.lastmsg}>
                    
                      {item?.messages.length>0?item?.messages[item?.messages.length-1].sender==user?._id?'you:'+item?.messages[item?.messages.length-1].message:item?.customer?.full_name+':'+item?.messages[item?.messages.length-1].message:'Tap there and start conversation'}
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
