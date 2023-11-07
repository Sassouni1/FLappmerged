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
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import GeneralStatusBar from '../../Components/GeneralStatusBar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ApiCall} from '../../Services/Apis';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import ImageModal from 'react-native-image-modal';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
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
import { colors } from '../../constants/colors';
import { CameraIcon, PdfIcon, SendIcon } from '../../assets/images';
import { fonts } from '../../constants/fonts';
import ImagePickerModal from '../../Components/ImagePickerModal';
import { captureImage, chooseImageGallery } from '../../../utils/ImageAndCamera';

const {io} = require('socket.io-client');
const socket = io(SOCKET_URL);

const ConversationScreen = ({navigation, route}) => {
  const {channelId, channelName, reciver, sender, chatRoomType} =
    route.params;

  const dispatch = useDispatch();
  const messagesAll = useSelector(state => state.gernal.allSms);
  const [pickerModalVisibile, setPickerModalVisibile] = useState(false);

  const [messages, setMessages] = useState([]);
  const token = useSelector(state => state.auth.userToken);
  const user = useSelector(state => state.auth.userData);
  const [sms, setSms] = useState('');


  const sendChat = async sms => {
    console.log('socket emit sms', sms);
   const date=new Date()
    socket.emit('group-chat', {
      text: sms,
      groupChatId: channelId,
      senderId: sender?._id,
      date: date,
    });
  
    setSms('');
  };




const UploadFile = async () => {
  try {
    const res = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.pdf],
    });
    const uri =
      Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri;
    const Base64 = await fs.readFile(uri, 'base64');

    socket.emit(
      'mob-upload-groupchat',
      Base64,
      res?.name,
      res?.type,
      sender?._id,
      channelId,
      status => {
        console.log('file...', status);
      },
    );
  } catch (err) {
    console.log('ERROR is ', err);
    if (DocumentPicker.isCancel(err)) {
    } else {
      throw err;
    }
  }
};

const uploadFromCamera = async () => {
  const res = await captureImage();
  if (res.status == false) {
    SimpleToast.show(res.error);
    return;
  }
  const uri =
    Platform.OS === 'ios'
      ? res?.data?.uri.replace('file://', '')
      : res?.data?.uri;
  const Base64 = await fs.readFile(uri, 'base64');

  const imageObject = {
    uri: res.data.uri,
    type: res.data.type,
    name: res.data.name,
  };

  setPickerModalVisibile(false);

  socket.emit(
    'mob-upload-groupchat',
    Base64,
    imageObject?.name,
    imageObject?.type,
    sender?._id,
    channelId,
    status => {
      console.log('image', status);
    },
  );
};

// upload from gallery
const uploadFromGallry = async () => {
  const res = await chooseImageGallery();
 
  if (res.status == false) {
    SimpleToast.show(res.error);
    return;
  }
  console.log('image response', res);
  const uri =
    Platform.OS === 'ios'
      ? res?.data?.uri.replace('file://', '')
      : res?.data?.uri;
  const Base64 = await fs.readFile(uri, 'base64');
  const imageObject = {
    uri: res.data.uri,
    type: res.data.type,
    name: res.data.name,
  };
  console.log('imageObject', imageObject);
 
  setPickerModalVisibile(false);
  console.log('started');

  socket.emit(
    'mob-upload-groupchat',
    Base64,
    //imageObject?.uri,
    imageObject?.name,
    imageObject?.type,
    sender?._id,
    channelId,
    status => {
      console.log('image', status);
    },
  );
  console.log('image end');
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
              PdfFile: IMAGE_URL  + item?.file?.url,
              fileType: item?.file?.file_type,
              user: sender,
              reciver: reciver,
              text: item?.message,
              createdAt: item?.date,
              _id: item?._id,
            }
          : {
              PdfFile: IMAGE_URL  + item?.file?.url,
              fileType: item?.file?.file_type,
              user: reciver,
              reciver: sender,
              text: item?.message,
              createdAt: item?.date,
              _id: item?._id,
            },
      );
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newArray),
      );
    });

    return () => {
      dispatch(setAllSms([]));
      // socket.disconnect();
      // socket.emit('end');
    };
  }, []);
  useEffect(() => {
    const sorted = messagesAll.sort(function (a, b) {

      return b.date.localeCompare(a.date);
    });

    const newArray = sorted.map(item =>
      item?.user == sender?._id
        ? {
            PdfFile: IMAGE_URL  + item?.file?.url,
            fileType: item?.file?.file_type,
            user: sender,
            reciver: reciver,
            text: item?.text,
            createdAt: item?.date,
            _id: item?._id,
          }
        : {
            PdfFile: IMAGE_URL+ item?.file?.url,
            fileType: item?.file?.file_type,
            user: reciver,
            reciver: sender,
            text: item?.text,
            createdAt: item?.date,
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
      <ImagePickerModal
        visible={pickerModalVisibile}
        hideVisible={() => setPickerModalVisibile(false)}
        galleryImage={() => uploadFromGallry()}
        cameraImage={() => uploadFromCamera('image')}
      />
      <View style={{flex:1,bottom:getFontSize(1.5)}}>
      <GiftedChat
          renderBubble={props => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: {
                    backgroundColor: 'orange',
                    borderRadius: 5,
                  },
                  left: {
                    backgroundColor: colors.secondary,
                    borderRadius: 5,
                  },
                }}
                textStyle={{
                  left: {
                    color: colors.white,
                    fontFamily: fonts.URe,
                    fontSize: 14,
                  },
                  right: {
                    color: colors.white,
                    fontFamily: fonts.URe,
                    fontSize: 14,
                  },
                }}
              />
            );
          }}
          renderCustomView={props => {
            //console.log('propssssss', props?.currentMessage);
            return (
              <View>
                {props.currentMessage?.fileType == 'application/pdf' ? (
                  <TouchableOpacity
                    style={props.containerStyle}
                    onPress={() => {
                      Linking.openURL(`${props.currentMessage?.PdfFile}`);
                    }}>
                    <View style={{width: getWidth(36)}}>
                      <FontAwesome
                        name="file-pdf-o"
                        size={getFontSize(5)}
                        color={colors.white}
                        style={{marginTop: getFontSize(1.5),marginLeft: getFontSize(1.5)}}
                      />
                      <Text
                        style={{
                          color: colors.white,
                          fontSize: getFontSize(1.5),
                          fontWeight:"600",
                          padding:getFontSize(1.5)
                        }}>
                        {props.currentMessage?.file?.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : null}
                {props.currentMessage?.fileType == 'image/jpeg' ||
                props.currentMessage?.fileType == 'image/png' ||
                props.currentMessage?.fileType == 'image/jpg' ? (
                  <ImageModal
                    style={[styles.image, props.imageStyle]}
                    resizeMode={'cover'}
                    modalImageResizeMode="contain"
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
          renderInputToolbar={() => {
            return (
              // null
              <View style={{...styles.inputCon}}>
                <View style={styles.textinputCon}>
                  <TextInput
                    style={{
                      ...GernalStyle.textinput,
                      width: getWidth(60),
                      marginTop: 0,
                      paddingLeft: getWidth(3),
                    }}
                    value={sms}
                    onChangeText={e => setSms(e)}
                    onSubmitEditing={() => sendChat(sms)}
                    placeholder="Message to coach..."
                    placeholderTextColor={colors.graytext4}
                  />
                  <TouchableOpacity
                    onPress={() => setPickerModalVisibile(true)}>
                    <CameraIcon height={20} width={20} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => UploadFile()}>
                    <PdfIcon
                      height={25}
                      width={25}
                      style={{marginLeft: getWidth(2.5)}}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => sendChat(sms)}
                  style={styles.sendBtn}>
                  <SendIcon height={25} width={25} />
                </TouchableOpacity>
              </View>
            );
          }}
          renderAvatarOnTop={true}
          // messagesContainerStyle={{marginTop: -getHeight(4)}}
          keyboardShouldPersistTaps={'handled'}
          renderUsernameOnMessage
          showAvatarForEveryMessage={true}
          isKeyboardInternallyHandled
          showScrollIndicator={false}
          messages={messages}
          onSend={messages => sendChat(messages)}
          user={{
            _id: user?._id,
          }}
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
  seprator: {
    marginTop: getHeight(0.5),
    width: getWidth(95),
    alignSelf: 'center',
  },
  timText: {
    fontSize: getFontSize(2),
    color: colors.gray3,
    fontFamily: fonts.UMe,
    alignSelf: 'flex-end',
    marginBottom: getHeight(1),
    marginRight: getWidth(3),
  },
  ruleText: {
    fontSize: 10,
    color: colors.graytext5,
    fontFamily: fonts.URe,
    marginLeft: getWidth(2),
  },
  Insideconn: {
    height: getHeight(15),
    backgroundColor: colors.secondary,
    borderRadius: 5,
    width: getWidth(62),
    marginLeft: getWidth(1),
  },
  headerCon: {
    height: getHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  today: {
    fontSize: getFontSize(2),
    color: colors.graytext5,
    alignSelf: 'center',
    fontFamily: fonts.UMe,
    marginTop: getHeight(2),
  },
  sendBtn: {
    width: getWidth(15),
    backgroundColor: colors.greenlight,
    height: getHeight(7),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: getWidth(1),
    borderRadius: 5,
  },
  textinputCon: {
    width: getWidth(77),
    height: getHeight(7),
    backgroundColor: colors.secondary,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputCon: {
    // position: 'absolute',
    // bottom: getHeight(1.5),
    paddingHorizontal: getWidth(2),
    alignSelf: 'center',
    width: getWidth(95),
    height: getHeight(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendMsgCon: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    width: getWidth(96),
    alignSelf: 'center',
    marginTop: getHeight(1),
  },
  rightIconCon: {
    height: getHeight(4),
    marginLeft: getWidth(1),
    width: getWidth(8),
    borderRadius: 25,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chaTcon: {
    height: getHeight(15),
    backgroundColor: colors.black,
    borderRadius: 5,
    width: getWidth(62),
    marginLeft: getWidth(1),
  },
  insideCon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHeight(12),
    paddingHorizontal: getWidth(5),
  },
  chattext: {
    fontSize: getFontSize(2),
    color: colors.white,
    fontFamily: fonts.URe,
  },
  timeText: {
    fontSize: getFontSize(2),
    color: colors.gray3,
    fontFamily: fonts.UMe,
    alignSelf: 'flex-end',
    marginBottom: getHeight(1),
    marginRight: getWidth(3),
  },
  recievedCon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: getWidth(96),
    alignSelf: 'center',
    marginTop: getHeight(1),
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 13,
    margin: 3,
  },  
});

export default ConversationScreen;
