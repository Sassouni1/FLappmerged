import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Linking,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import GeneralStatusBar from '../../../../Components/GeneralStatusBar';
import {GernalStyle} from '../../../../constants/GernalStyle';
import {colors} from '../../../../constants/colors';
import {
  getHeight,
  getFontSize,
  getWidth,
  useForceUpdate,
  chooseImageGallery,
  captureImage,
} from '../../../../Config/functions copy';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {fonts} from '../../../../constants/fonts';
import Seprator from '../../../../Components/Seprator';
import {
  CameraIcon,
  PdfIcon,
  RightIcon,
  SendIcon,
  UserChat3,
} from '../../../../assets/Images';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import {Bubble, GiftedChat} from 'react-native-gifted-chat';
import io from 'socket.io-client';
import {ApiCall} from '../../../../Services/Apis';
import {setLoader} from '../../../../Redux/actions/GernalActions';
import {IMAGE_URL, SOCKET_URL} from '../../../../Services/Constants';
import ImageModal from 'react-native-image-modal';
import ImagePickerModal from '../../../../Components/ImageModal';
import DocumentPicker from 'react-native-document-picker';
import fs from 'react-native-fs';
import SimpleToast from 'react-native-simple-toast';
import {SvgUri} from 'react-native-svg';

const ChatScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [imageObject, setImageObject] = useState();
  const [imageSave, setImageSave] = useState();
  const [pickerModalVisibile, setPickerModalVisibile] = useState(false);
  const [sms, setSms] = useState('');
  const [NameAdmin, setAdmin] = useState();
  const forceUpdate = useForceUpdate();
  const isFocused = useIsFocused();
  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken);
  const channelId = user.chatroomId;
  const sender = user;
  const userId = user?.chatroomId;
  const socket = io(SOCKET_URL);
  var dateString = new Date();

  var date = new Date(dateString);

  const sendChat = async sms => {
    const body = {
      text: sms,
      chatroomId: channelId,
      senderId: sender?._id,
      date: date,
    };
    console.log('SEND message body', body);
    socket.emit('chat', body);
    setSms('');
    getChat();
  };

  // useeffect for payload
  useEffect(() => {
    console.log('chat startes');
    getChat();
    const joinBody = {
      chatroomId: channelId,
    };
    console.log('joinBody', joinBody);
    socket.emit('join', joinBody);
    socket.on('chat', payload => {
      console.log('here i get payload,', payload);
      // if(payload?.file?.name){
      const obj = [
        {
          ...payload,
          text: payload.message,
          file: IMAGE_URL + payload?.file?.url,
          fileName: payload?.file?.name,
          fileType: payload?.file?.file_type,
          _id: payload.sender,
          user: {
            _id: payload.sender == user?._id ? user?._id : payload?.sender,
          },
        },
      ];
      setMessages(previousMessages => GiftedChat.append(previousMessages, obj));
    });
    return () => {
      socket.disconnect();
      socket.emit('end');
      socket.off('chat');
    };
  }, [isFocused]);

  // useEffect for getChat
  useEffect(() => {
    dispatch(setLoader(true));
    getChat();
  }, []);

  // get all chat from server...
  const getChat = async () => {
    try {
      const res = await ApiCall({
        params: {category_name: 'skill '},
        route: `chat/chat_detail/${userId}`,
        verb: 'get',
        token: token,
      });
      console.log('chat response', res?.response);
      var arr = res?.response?.chat?.messages;
      var receiver = res?.response?.chat?.admin?._id;
      if (res?.status == '200') {
        console.log('admin chat...', res?.response?.chat?.messages);
        setAdmin(res?.response?.chat?.admin);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        alert(res?.response?.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } catch (e) {
      console.log('api get skill error -- ', e.toString());
    }
    const updatedArray = arr?.map(item => {
      console.log('item__', item);
      return {
        ...item,
        text: item.message,
        PdfFile: IMAGE_URL + item?.file?.url,
        fileType: item?.file?.file_type,

        user: {
          _id: user._id == item.sender ? item.sender : receiver,
          name: user._id == item.sender ? 'sender' : 'reciever',
        },
        side: user._id == item.sender ? 'right' : 'left',
      };
    });

    setMessages(updatedArray?.reverse());
  };

  // upload from camera
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

    setImageObject(imageObject);
    setPickerModalVisibile(false);

    socket.emit(
      'mob-upload',
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
    setImageSave(res?.data?.uri);
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
    setImageObject(imageObject);
    setPickerModalVisibile(false);
    console.log('started');

    socket.emit(
      'mob-upload',
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

  // upload from broswer

  const UploadFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
      });
      const uri =
        Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri;
      const Base64 = await fs.readFile(uri, 'base64');

      socket.emit(
        'mob-upload',
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

  return (
    <View style={{...GernalStyle.container, backgroundColor: colors.homeColor}}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <View style={styles.headerCon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="chevron-left"
            size={getFontSize(5)}
            color={colors.gray3}
            style={{marginBottom: getHeight(2.5)}}
          />
        </TouchableOpacity>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              resizeMode="contain"
              style={{
                height: getHeight(4.5),
                width: getWidth(9),
                borderRadius: 30,
              }}
              source={{uri: NameAdmin?.profile_image}}
            />
            <Text style={{...GernalStyle.headertext, marginLeft: getWidth(2)}}>
              {NameAdmin?.full_name}
            </Text>
          </View>
          <Text style={{...styles.ruleText, marginTop: getHeight(1)}}>
            Fitness coach
          </Text>
        </View>
      </View>
      <ImagePickerModal
        visible={pickerModalVisibile}
        hideVisible={() => setPickerModalVisibile(false)}
        galleryImage={() => uploadFromGallry()}
        cameraImage={() => uploadFromCamera('image')}
      />
      <Seprator style={styles.seprator} />
      <KeyboardAvoidingView style={{flex: 1, marginTop: getHeight(4)}}>
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
          messagesContainerStyle={{marginTop: -getHeight(4)}}
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
      </KeyboardAvoidingView>
    </View>
  );
};
export default ChatScreen;
