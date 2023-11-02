import React, {useState, useCallback, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Linking,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import {GiftedChat} from 'react-native-gifted-chat';
import GeneralStatusBar from '../../Components/GeneralStatusBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ApiCall} from '../../Services/Apis';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import ImageModal from 'react-native-image-modal';

import {SvgUri} from 'react-native-svg';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import fs from 'react-native-fs';
import {
  getChats,
  setAllSms,
  setLoader,
} from '../../Redux/actions/GernalActions';
import {IMAGE_URL, SOCKET_URL} from '../../Services/Constants';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Header from '../../Components/Header';
import {Divider} from 'react-native-paper';
import {GernalStyle} from '../../constants/GernalStyle';

const {io} = require('socket.io-client');
const socket = io(SOCKET_URL);

const ConversationScreen = ({navigation, route}) => {
  const {channelId, channelName, reciver, sender, chatRoomType} =
    route.params;

  const dispatch = useDispatch();
  const messagesAll = useSelector(state => state.gernal.allSms);

  const [messages, setMessages] = useState([]);
  const token = useSelector(state => state.auth.userToken);
  const user = useSelector(state => state.auth.userData);
  const [sms, setSms] = useState('');

  // const channelId = user.chatroomId;
  // const reciver = user.coachId;
  // const sender = user;
  const sendChat = async sms => {
    console.log('socket emit sms', sms);
   const date=new Date()
    socket.emit('group-chat', {
      text: sms,
      groupChatId: channelId,
      senderId: sender?._id,
      date: date,
    });
    // socket.emit('chat', {
    //   message: sms,
    //   // receiver: reciver?._id,
    //   chatroomId: channelId,
    //   sender: sender?._id,
    // });
    setSms('');
  };

  const UploadFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });

      for (const res of results) {
        const uri =
          Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri;
        const base64 = await fs.readFile(uri, 'base64');
        // const arrayBuffer = decode(base64);

        socket.emit(
          'mob-upload-groupchat',
          base64,
          res?.name,
          res?.type,
          sender?._id,
          channelId,
          reciver?._id,
          status => {
            console.log('file', status);
          },
        );
      }
    } catch (err) {
      console.log('ERROR is ', err);
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const getAllSms = async item => {
    try {
      dispatch(setLoader(true));
      const res = await ApiCall({
        route: `groupChat/group_chat_detail/${channelId}`,
        verb: 'get',
        token: token,
      });
      if (res?.status == '200') {
        dispatch(setLoader(false));
        console.log('item', res);

        const newArrayOfObj = res?.response?.chat?.messages.map(
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
      }
    } catch (e) {
      dispatch(setLoader(false));

      console.log('saga error -- ', e.toString());
    }
  };
  useEffect(() => {
    getAllSms();
  }, []);
  useEffect(() => {
    socket.emit('join', {
      senderId: sender?._id,
      chatroomId: channelId,
    });
    socket.on('group-chat', payload => {
      console.log('payload there', payload);

      const newArray = [payload].map(item =>
        item?.sender == sender?._id
          ? {
              PdfFile: IMAGE_URL + '/' + item?.file?.file,
              fileType: item?.file?.fileType,
              user: sender,
              reciver: reciver,
              text: item?.message,
              createdAt: item?.createdAt,
              _id: item?._id,
            }
          : {
              PdfFile: IMAGE_URL + '/' + item?.file?.file,
              fileType: item?.file?.fileType,
              user: reciver,
              reciver: sender,
              text: item?.message,
              createdAt: item?.createdAt,
              _id: item?._id,
            },
      );
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newArray),
      );
    });

    return () => {
      dispatch(setAllSms([]));
      socket.disconnect();
      socket.emit('end');
    };
  }, []);
  useEffect(() => {
    // const sorted = messagesAll.sort(function (a, b) {
    //   return b.createdAt.localeCompare(a.createdAt);
    // });

    const newArray = messagesAll.map(item =>
      item?.user == sender?._id
        ? {
            PdfFile: IMAGE_URL + '/' + item?.file?.file,
            fileType: item?.file?.fileType,
            user: sender,
            reciver: reciver,
            text: item?.text,
            createdAt: item?.createdAt,
            _id: item?._id,
          }
        : {
            PdfFile: IMAGE_URL + '/' + item?.file?.file,
            fileType: item?.file?.fileType,
            user: reciver,
            reciver: sender,
            text: item?.text,
            createdAt: item?.createdAt,
            _id: item?._id,
          },
    );

    setMessages(newArray);
  }, [messagesAll]);

  return (
    <SafeAreaView style={{flex: 1,backgroundColor:'#333333'}}>
      <StatusBar
   
        barStyle="light-content"
        hidden={false}
        translucent={true}
      />
      <View style={{backgroundColor: '#333333'}}>
        <Header
          title={channelName}
          
          LeftIcon={
            <AntDesign onPress={()=>navigation.goBack()} name='left' style={{alignSelf:'center',marginRight:getWidth(4)}} color="white" size={20}/>
          }
          RightIcon={<View/>}
        />
        <Divider
          style={{
            height: 1,
            backgroundColor: '#333333',
            borderRadius: 10,
            width: '100%',
            marginTop: 15,
            alignSelf: 'center',
          }}
        />
      </View>

      <View style={{flex:1,bottom:getFontSize(1.5)}}>
        <GiftedChat
          messages={messages}
          renderAvatarOnTop
          renderCustomView={props => {
            return (
              <View>
                {props.currentMessage?.fileType == 'application/pdf' ? (
                  <TouchableOpacity
                    style={props.containerStyle}
                    onPress={() => {
                      Linking.openURL(`${props.currentMessage?.PdfFile}`);
                    }}>
                    <AntDesign name="pdffile1" size={150} color={'#182d4a'} />
                    {/* <Image
                    // {...props.imageProps}
                    resizeMode={'stretch'}
                    style={[styles.image, props.imageStyle]}
                    source={require('../../assets/images/Profile.png')}
                  /> */}
                  </TouchableOpacity>
                ) : null}

                {props.currentMessage?.fileType == 'image/jpeg' ||
                props.currentMessage?.fileType == 'image/png' ||
                props.currentMessage?.fileType == 'image/jpg' ? (
                  <ImageModal
                    style={[styles.image, props.imageStyle]}
                    resizeMode={'contain'}
                    source={{uri: props.currentMessage?.PdfFile}}
                  />
                ) : null}
                {props.currentMessage?.fileType == 'image/svg+xml' ? (
                  <SvgUri
                    height={100}
                    width={100}
                    color={'red'}
                    style={[styles.image, props.imageStyle]}
                    uri={props.currentMessage?.PdfFile}
                  />
                ) : null}
              </View>
            );
          }}
          renderInputToolbar={() => (
            <View style={styles.footer}>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputs}
                  value={sms}
                  placeholder="Write your message..."
                  
                  multiline={true}
                  outlineColor="white"
                  activeUnderlineColor="white"
                  activeOutlineColor="white"
                  placeholderTextColor={'white'}
                  cursorColor={'white'}
                  
                  onChangeText={e => setSms(e)}
                />
                <MaterialIcons
                  name="attach-file"
                  style={{padding: 5}}
                  onPress={() => {
                    UploadFile();
                  }}
                  size={20}
                  color="#fbac33"
                />
              </View>

              <TouchableOpacity
                onPress={() => {
                  sendChat(sms);
                }}
                style={styles.btnSend}>
                <MaterialIcons name="send" size={20} color="white" />
              </TouchableOpacity>
            </View>
          )}
          renderUsernameOnMessage
          showAvatarForEveryMessage
          user={user}
          onSend={messages => sendChat(messages)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headview: {
    height: getHeight(8),

    flexDirection: 'row',
    backgroundColor: '#182d4a',
    justifyContent: 'space-between',
    padding: 10,
    alignItems: 'center',
    shadowColor: '#126BB7',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 0,
    marginBottom: -getHeight(3.8),
  },
  titletext: {
    fontSize: getFontSize(2.5),
    fontFamily: 'Rubik-Medium',
    color: '#182d4a',
  },
  viewstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: getWidth(5),
    justifyContent: 'center',
    minHeight: getHeight(9),
    maxHeight: getHeight(9),
  },
  imageview2: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  messagetext: {
    fontSize: getFontSize(2.2),
    width: getWidth(90),
    fontFamily: 'Ubuntu-Bold',
    marginLeft: getWidth(2),
    color: 'white',
  },
  selfimage: {width: 30, height: 30, marginRight: 10, borderRadius: 15},
  imageviewstyle: {
    width: 40,
    borderRadius: 20,
    height: 40,
    position: 'absolute',
    left: -50,
  },
  list: {
    paddingHorizontal: 17,
  },
  footer: {
    flexDirection: 'row',
    //height: getFontSize(20),
    backgroundColor: '#4F4F4F',
    paddingHorizontal: 15,
    padding: getFontSize(1),
    //marginTop: getFontSize(-1),
  },
  btnSend: {
    backgroundColor: '#182d4a',
    width: 50,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 20,
    height: 20,

    alignSelf: 'center',
  },
  inputContainer: {
    borderColor: 'black',
    backgroundColor: '#4F4F4F',
    borderRadius: 10,
    borderWidth: 1,
    height: getFontSize(5),
    marginBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  inputs: {
    height: 40,
    marginLeft: 16,
    borderBottomColor: '#F6F6F6',
    flex: 1,
  },
  balloon: {
    maxWidth: 280,
    padding: 15,
    borderRadius: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 13,
    margin: 3,
  },
  itemIn: {
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  itemOut: {
    alignSelf: 'flex-end',
    backgroundColor: '#EBF3F5',
  },
  time: {
    alignSelf: 'flex-end',
    margin: 15,
    fontSize: 12,
    color: '#808080',
  },
  item: {
    marginVertical: 8,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#eeeeee',
    borderRadius: 30,
    padding: 5,
  },
  userImage: {
    width: 37,
    height: 37,
    borderRadius: 10,
  },
});

export default ConversationScreen;
