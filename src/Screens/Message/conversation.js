import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  Platform,
  Pressable,
} from "react-native";
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { getStatusBarHeight } from "react-native-safearea-height";
import { useDispatch, useSelector } from "react-redux";
import { SvgUri } from "react-native-svg";
import SimpleToast from "react-native-simple-toast";
import ImageModal from "react-native-image-modal";
import moment from "moment";
import fs from "react-native-fs";
import { CameraIcon, PdfIcon, SendIcon } from "../../assets/images";
import { ApiCall } from "../../Services/Apis";
import DocumentPicker from "react-native-document-picker";

import {
  getChats,
  setAllSms,
  setLoader,
} from "../../Redux/actions/GernalActions";
import { IMAGE_URL, SOCKET_URL } from "../../Services/Constants";

import { GernalStyle } from "../../constants/GernalStyle";
import { colors } from "../../constants/colors";
import {
  CameraPicker,
  SendMsg,
  SpeakIcon,
  UserChat,
  BotChat,
} from "../../assets/images";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { fonts } from "../../constants/fonts";
import ImagePickerModal from "../../Components/ImagePickerModal";
import {
  captureImage,
  chooseImageGallery,
} from "../../../utils/ImageAndCamera";
import HeaderChatBot from "../../Components/HeaderChatBot";

const { io } = require("socket.io-client");
const socket = io(SOCKET_URL);

const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight;

const BotChatScreen = ({ navigation, route }) => {
  const { channelId, channelName, reciver, sender, chatRoomType } =
    route.params;

  const dispatch = useDispatch();
  const messagesAll = useSelector((state) => state.gernal.allSms);
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const [messages, setMessages] = useState([]);
  const [pickerModalVisibile, setPickerModalVisibile] = useState(false);
  const [sms, setSms] = useState("");

  const sendChat = async (sms) => {
    console.log("socket emit sms", sms);
    const date = new Date();
    if (chatRoomType == "groupChat") {
      socket.emit("group-chat", {
        text: sms,
        groupChatId: channelId,
        senderId: sender?._id,
        date: date,
        _id: date.valueOf(),
      });
    } else if (chatRoomType == "chat") {
      socket.emit("chat", {
        text: sms,
        chatroomId: channelId,
        senderId: sender?._id,
        date: date,
        _id: date.valueOf(),
      });
    }

    setSms("");
  };

  const UploadFile = async () => {
    try {
      const res = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
      });
      const uri =
        Platform.OS === "ios" ? res.uri.replace("file://", "") : res.uri;
      const Base64 = await fs.readFile(uri, "base64");

      if (chatRoomType == "groupChat") {
        socket.emit(
          "mob-upload-groupchat",
          Base64,
          res?.name,
          res?.type,
          sender?._id,
          channelId,
          (status) => {
            console.log("file...", status);
          }
        );
      } else if (chatRoomType == "chat") {
        socket.emit(
          "mob-upload",
          Base64,
          res?.name,
          res?.type,
          sender?._id,
          channelId,
          (status) => {
            console.log("file...", status);
          }
        );
      }
    } catch (err) {
      console.log("ERROR is ", err);
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
      Platform.OS === "ios"
        ? res?.data?.uri.replace("file://", "")
        : res?.data?.uri;
    const Base64 = await fs.readFile(uri, "base64");

    const imageObject = {
      uri: res.data.uri,
      type: res.data.type,
      name: res.data.name,
    };

    setPickerModalVisibile(false);
    if (chatRoomType == "groupChat") {
      socket.emit(
        "mob-upload-groupchat",
        Base64,
        imageObject?.name,
        imageObject?.type,
        sender?._id,
        channelId,
        (status) => {
          console.log("image", status);
        }
      );
    } else if (chatRoomType == "chat") {
      socket.emit(
        "mob-upload",
        Base64,
        imageObject?.name,
        imageObject?.type,
        sender?._id,
        channelId,
        (status) => {
          console.log("image", status);
        }
      );
    }
  };

  const uploadFromGallry = async () => {
    const res = await chooseImageGallery();

    if (res.status == false) {
      SimpleToast.show(res.error);
      return;
    }
    console.log("image response", res);
    const uri =
      Platform.OS === "ios"
        ? res?.data?.uri.replace("file://", "")
        : res?.data?.uri;
    const Base64 = await fs.readFile(uri, "base64");
    const imageObject = {
      uri: res.data.uri,
      type: res.data.type,
      name: res.data.name,
    };
    console.log("imageObject", imageObject);

    setPickerModalVisibile(false);
    console.log("started");
    if (chatRoomType == "groupChat") {
      socket.emit(
        "mob-upload-groupchat",
        Base64,
        //imageObject?.uri,
        imageObject?.name,
        imageObject?.type,
        sender?._id,
        channelId,
        (status) => {
          console.log("image", status);
        }
      );
    } else if (chatRoomType == "chat") {
      socket.emit(
        "mob-upload",
        Base64,
        //imageObject?.uri,
        imageObject?.name,
        imageObject?.type,
        sender?._id,
        channelId,
        (status) => {
          console.log("image", status);
        }
      );
    }

    console.log("image end");
  };

  const getAllSms = async (item) => {
    try {
      dispatch(setLoader(true));
      let res = null;
      if (chatRoomType == "groupChat") {
        res = await ApiCall({
          route: `groupChat/group_chat_detail/${channelId}`,
          verb: "get",
          token: token,
        });
      } else if (chatRoomType == "chat") {
        res = await ApiCall({
          route: `chat/chat_detail/${channelId}`,
          verb: "get",
          token: token,
        });
      }

      if (res?.status == "200") {
        dispatch(setLoader(false));
        const newArrayOfObj = res?.response?.chat?.messages.map(
          ({ sender: user, message: text, ...rest }) => ({
            user,
            text,
            ...rest,
          })
        );
        dispatch(setAllSms(newArrayOfObj));
      } else {
        console.log("error", res);
        dispatch(setLoader(false));
      }
    } catch (e) {
      dispatch(setLoader(false));

      console.log("saga error -- ", e.toString());
    }
  };
  useEffect(() => {
    getAllSms();
  }, []);
  useEffect(() => {
    socket.emit("join", {
      senderId: sender?._id,
      chatroomId: channelId,
    });
    if (chatRoomType == "groupChat") {
      socket.on("group-chat", (payload) => {
        // console.log("payload there", payload);

        const newArray = [payload].map((item) =>
          item?.sender == sender?._id
            ? {
                PdfFile: IMAGE_URL + item?.file?.url,
                fileType: item?.file?.file_type,
                user: sender,
                reciver: reciver,
                text: item?.message,
                createdAt: item?.date,
                _id: item?._id,
              }
            : {
                PdfFile: IMAGE_URL + item?.file?.url,
                fileType: item?.file?.file_type,
                user: reciver,
                reciver: sender,
                text: item?.message,
                createdAt: item?.date,
                _id: item?._id,
              }
        );
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newArray)
        );
      });
    } else if (chatRoomType == "chat") {
      socket.on("chat", (payload) => {
        // console.log("payload there", payload);

        const newArray = [payload].map((item) =>
          item?.sender == sender?._id
            ? {
                PdfFile: IMAGE_URL + item?.file?.url,
                fileType: item?.file?.file_type,
                user: sender,
                reciver: reciver,
                text: item?.message,
                createdAt: item?.date,
                _id: item?._id,
              }
            : {
                PdfFile: IMAGE_URL + item?.file?.url,
                fileType: item?.file?.file_type,
                user: reciver,
                reciver: sender,
                text: item?.message,
                createdAt: item?.date,
                _id: item?._id,
              }
        );
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newArray)
        );
      });
    }

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

    const newArray = sorted.map((item) =>
      item?.user == sender?._id
        ? {
            PdfFile: IMAGE_URL + item?.file?.url,
            fileType: item?.file?.file_type,
            user: sender,
            reciver: reciver,
            text: item?.text,
            createdAt: item?.date,
            _id: item?._id,
          }
        : {
            PdfFile: IMAGE_URL + item?.file?.url,
            fileType: item?.file?.file_type,
            user: reciver,
            reciver: sender,
            text: item?.text,
            createdAt: item?.date,
            _id: item?._id,
          }
    );

    setMessages(newArray);
  }, [messagesAll]);

  const renderAvatar = (props) => {
    const { currentMessage } = props;
    //console.log("currentMessage", currentMessage);
    const user = currentMessage.user;
    const profileImage = user && user.profile_image;

    return (
      // <Avatar
      //   {...props}
      //   source={{ uri: profileImage }}
      //   imageStyle={{
      //     left: { backgroundColor: 'blue' ,}, // Style for left (receiver) avatar
      //     right: { backgroundColor: 'green' }, // Style for right (sender) avatar
      //   }}
      // />
      <>
        {profileImage !== "" ? (
          <ImageModal
            source={{ uri: profileImage }}
            resizeMode="cover"
            modalImageResizeMode="contain"
            style={{
              width: getWidth(10),
              height: getHeight(4.5),
              borderRadius: getWidth(5),
            }}
          />
        ) : (
          <Image
            resizeMode="cover"
            style={{
              width: getWidth(10),
              height: getHeight(4.5),
              borderRadius: getWidth(5),
            }}
            source={require("../../assets/images/Pimg.jpeg")}
          />
        )}
      </>
    );
  };

  const RenderUserName = ({ props }) => {
    return (
      <View style={{ padding: 5 }}>
        <Text
          style={{
            color:
              props?.currentMessage?.user?._id == user?._id
                ? colors.white
                : colors.black,
            fontWeight: "bold",
          }}
        >
          {props?.currentMessage?.user?.full_name}
        </Text>
      </View>
    );
  };

  const RenderProfilePic = ({ props }) => {
    return (
      <View
        style={[
          styles.customView,
          {
            borderWidth: 1,
            borderColor: props.currentMessage.user._id
              ? colors.orange
              : colors.greyMedium,
          },
        ]}
      >
        <Image
          source={{ uri: props?.currentMessage?.user?.profile_image }}
          style={{ height: "88%", width: "99%", borderRadius: getWidth(3) }}
        />
      </View>
    );
  };
  const backHandler = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" style={{ backgroundColor: "white" }} />
      <HeaderChatBot
        title={
          <Text>
            Fight Life Teams
            <Text style={styles.headerSubText}>{`\n251 Chats Left`}</Text>
          </Text>
        }
        titelStyle={styles.headerTitle}
        containerStyle={styles.headerContainer}
        LeftIcon={
          <Pressable style={styles.headerIconWraaper} onPress={backHandler}>
            <Image
              source={require("../../assets/images/Monotonechevronleft.png")}
              style={styles.headerIcons}
            />
          </Pressable>
        }
        RightIcon={
          <Pressable
            style={styles.headerIconWraaper}
            onPress={() => navigation.navigate("BotAllChatScreen")}
          >
            <Image
              source={require("../../assets/images/settings.png")}
              style={styles.headerIcons}
            />
          </Pressable>
        }
      />

      <View style={styles.chatContainer}>
        <GiftedChat
          renderAvatar={renderAvatar}
          renderBubble={(props) => {
            return (
              <Bubble
                {...props}
                wrapperStyle={{
                  right: styles.rightBuble,
                  left: styles.leftBuble,
                }}
                textStyle={{
                  left: styles.leftBubleText,
                  right: styles.rightBubleText,
                }}
              />
            );
          }}
          renderMessageText={(props) => {
            return (
              <View>
                <RenderUserName props={props} />
                {props.currentMessage?.text != "" ||
                props.currentMessage?.text != null ? (
                  <View
                    style={{
                      flexDirection: props.currentMessage.user._id
                        ? "row-reverse"
                        : "row",
                      paddingLeft: getWidth(2),
                      paddingVertical: getHeight(1),
                    }}
                  >
                    <RenderProfilePic props={props} />
                    <Text
                      style={{
                        paddingHorizontal: getWidth(2),
                        color: props.currentMessage.user._id
                          ? colors.white
                          : colors.black,
                        fontFamily: fonts.WM,
                        fontSize: getFontSize(2),
                        maxWidth: "90%",
                      }}
                    >{`${props.currentMessage?.text}`}</Text>
                  </View>
                ) : null}
              </View>
            );
          }}
          renderCustomView={(props) => {
            return (
              <View>
                {props.currentMessage?.fileType == "image/jpeg" ||
                props.currentMessage?.fileType == "image/png" ||
                props.currentMessage?.fileType == "image/jpg" ? (
                  <View>
                    <RenderUserName props={props} />
                    <View
                      style={{
                        flexDirection: props?.currentMessage?.user?._id
                          ? "row-reverse"
                          : "row",
                      }}
                    >
                      <RenderProfilePic props={props} />
                      <ImageModal
                        style={[styles.image, props.imageStyle]}
                        resizeMode={"cover"}
                        modalImageResizeMode="contain"
                        source={{ uri: props.currentMessage?.PdfFile }}
                      />
                    </View>
                  </View>
                ) : null}
                {props.currentMessage?.fileType == "image/svg+xml" ? (
                  <SvgUri
                    height={100}
                    width={100}
                    color={"red"}
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
              <View style={{ ...styles.inputCon }}>
                <View style={styles.textinputCon}>
                  <TextInput
                    style={{
                      width: getWidth(60),
                      marginTop: 0,
                      paddingLeft: getWidth(3),
                      paddingVertical: 20,
                    }}
                    value={sms}
                    onChangeText={(e) => setSms(e)}
                    onSubmitEditing={() => sendChat(sms)}
                    placeholder="Type a message..."
                    placeholderTextColor={colors.darkGray}
                  />
                  <TouchableOpacity
                    onPress={() => setPickerModalVisibile(true)}
                  >
                    <CameraIcon height={20} width={20} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => UploadFile()}>
                    <PdfIcon
                      height={25}
                      width={25}
                      style={{ marginLeft: getWidth(2.5) }}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    sms == "" ? null : sendChat(sms);
                  }}
                  style={styles.sendBtn}
                >
                  <SendIcon height={25} width={25} />
                </TouchableOpacity>
              </View>
            );
          }}
          renderDay={(props) => {
            return (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: getWidth(91.2),
                  alignSelf: "center",
                  marginVertical: getHeight(1.5),
                }}
              >
                <View
                  style={{
                    backgroundColor: colors.greyMedium,
                    height: getWidth(0.4),
                    flex: 1,
                  }}
                />
                <Text
                  style={{
                    color: colors.greyText,
                    paddingHorizontal: getWidth(2),
                    fontFamily: fonts.WSB,
                    fontSize: 12,
                    fontWeight: "600",
                  }}
                >
                  {moment(props.currentMessage.createdAt).format("hh:mm A")}
                </Text>
                <View
                  style={{
                    backgroundColor: colors.greyMedium,
                    height: getWidth(0.4),
                    flex: 1,
                  }}
                />
              </View>
            );
          }}
          keyboardShouldPersistTaps={"handled"}
          messagesContainerStyle={{
            paddingBottom: getHeight(6),
          }}
          showUserAvatar={false}
          isKeyboardInternallyHandled
          showAvatarForEveryMessage={true}
          showScrollIndicator={false}
          messages={messages}
          onSend={(messages) => sendChat(messages)}
          user={{
            _id: user?._id,
          }}
          renderTime={() => {
            return null;
          }}
        />
      </View>
      <ImagePickerModal
        visible={pickerModalVisibile}
        hideVisible={() => setPickerModalVisibile(false)}
        galleryImage={() => uploadFromGallry()}
        cameraImage={() => uploadFromCamera("image")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: STATUSBAR_HEIGHT,
    borderBottomLeftRadius: getWidth(10),
    borderBottomRightRadius: getWidth(10),
    alignItems: "center",
    paddingBottom: getHeight(2),
    backgroundColor: "#FFFFFF",
    width: getWidth(100),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0,
    shadowRadius: 2.65,
    elevation: 2,
    paddingHorizontal: getWidth(4),
  },
  headerIconWraaper: {
    backgroundColor: colors.greyLight,
    height: getWidth(12),
    width: getWidth(12),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: getWidth(4),
  },
  headerIcons: {
    height: getWidth(8),
    width: getWidth(8),
  },
  headerTitle: {
    color: "#000000",
    fontSize: 24,
    fontFamily: "Russo_One",
    fontWeight: "600",
    textAlign: "left",
  },
  headerSubText: {
    fontSize: getFontSize(2),
    fontFamily: fonts.WM,
    color: colors.greyText,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: colors.greyLight,
  },
  rightBuble: {
    backgroundColor: colors.black,
    borderRadius: getWidth(6),
    maxWidth: getWidth(91),
    marginRight: getWidth(2),
    paddingVertical: getHeight(1),
    paddingHorizontal: getWidth(2),
  },
  leftBuble: {
    backgroundColor: colors.greyBg,
    borderRadius: getWidth(6),
    maxWidth: getWidth(91),
    paddingVertical: getHeight(1),
    paddingHorizontal: getWidth(2),
  },
  leftBubleText: {
    color: colors.textDark,
    fontFamily: fonts.WM,
    fontSize: 14,
  },
  rightBubleText: {
    color: colors.white,
    fontFamily: fonts.WM,
    fontSize: 14,
  },
  customView: {
    width: getWidth(10),
    height: getWidth(10),

    margin: getWidth(1),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: getWidth(3),
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 13,
    margin: 3,
  },
  sendBtn: {
    width: getWidth(15),
    backgroundColor: colors.blueColor,
    height: getWidth(15),
    justifyContent: "center",
    alignItems: "center",
    marginLeft: getWidth(2),
    borderRadius: getWidth(5),
    marginTop: getHeight(2),
  },
  textinputCon: {
    width: getWidth(77),
    backgroundColor: colors.greyLight,
    borderRadius: getWidth(5),
    flexDirection: "row",
    alignItems: "center",
    marginTop: getHeight(2),
    marginLeft: getWidth(1),
  },
  inputCon: {
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(2),
    alignSelf: "center",
    width: getWidth(100),
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: getHeight(4),
    bottom: getHeight(7),
    borderTopLeftRadius: getWidth(10),
    borderTopRightRadius: getWidth(10),
  },
});

export default BotChatScreen;

const oooo = [
  {
    PdfFile: "http://54.234.223.198/undefined",
    _id: "664c3420945d171558b55dc6",
    createdAt: "2024-05-21T05:41:52+00:00",
    fileType: undefined,
    reciver: {},
    text: "Hello, who are you?",
    user: {
      _id: "661e4e621a476bee6cfd68ba",
      allow_programs: false,
      chatroomId: "661e4e631a476bee6cfd6b3b",
      customerId: "cus_Pw0zA3CDcf1aNb",
      email: "gyruhitav@yopmail.com",
      fcmToken:
        "dTivxpfi00mEm1BeX-Sf8U:APA91bFBN9gOUsVk2LqzmLIsE_yYt_EOB0rEgYVh93ngK9KIDhqzzSdE7T77-E1OBts35cDHEC9nGY4iXFioyao34AVI-pMomk4o5wxjST8tJWYEhxANCd-VObDXHzkjK8aHWynzPBMD",
      full_name: "Eugenia Haley",
      groupChatId: "652f88e0a3ed8a769d24ce05",
      height: 5,
      isAssigned: true,
      plan_id: "661f8eb81a476bee6cc8cb65",
      program_id: "660d29bb5d81fb1c1be8eaae",
      role: "customer",
      status: true,
      subscription: [Array],
      target_weight: 150,
      userBadge: [Array],
      user_id: "661e4e611a476bee6cfd6889",
      verification_status: false,
      weight: 100,
      weight_gain: 0,
      weight_loss: 0,
      workout_number: 8,
    },
  },
  {
    PdfFile: "http://54.234.223.198/undefined",
    _id: "6633ef9ca3f2d7f7aaadc1dc",
    createdAt: "2024-05-02T19:55:08+00:00",
    fileType: undefined,
    reciver: {
      _id: "661e4e621a476bee6cfd68ba",
      allow_programs: false,
      chatroomId: "661e4e631a476bee6cfd6b3b",
      customerId: "cus_Pw0zA3CDcf1aNb",
      email: "gyruhitav@yopmail.com",
      fcmToken:
        "dTivxpfi00mEm1BeX-Sf8U:APA91bFBN9gOUsVk2LqzmLIsE_yYt_EOB0rEgYVh93ngK9KIDhqzzSdE7T77-E1OBts35cDHEC9nGY4iXFioyao34AVI-pMomk4o5wxjST8tJWYEhxANCd-VObDXHzkjK8aHWynzPBMD",
      full_name: "Eugenia Haley",
      groupChatId: "652f88e0a3ed8a769d24ce05",
      height: 5,
      isAssigned: true,
      plan_id: "661f8eb81a476bee6cc8cb65",
      program_id: "660d29bb5d81fb1c1be8eaae",
      role: "customer",
      status: true,
      subscription: [Array],
      target_weight: 150,
      userBadge: [Array],
      user_id: "661e4e611a476bee6cfd6889",
      verification_status: false,
      weight: 100,
      weight_gain: 0,
      weight_loss: 0,
      workout_number: 8,
    },
    text: `Hi there! Welcome to Sandow, your personal AI fitness coach. I'm here to guide you on your fitness journey. Whether you want to get fit, lose weight, or build strength, I'm here to help you through! 🙌`,
    user: {},
  },
  {
    PdfFile: "http://54.234.223.198/undefined",
    _id: "664c3420945d171558b55dc600",
    createdAt: "2024-05-21T05:41:52+00:00",
    fileType: undefined,
    reciver: {},
    text: "Wow, amazing!! 💖",
    user: {
      _id: "661e4e621a476bee6cfd68ba",
      allow_programs: false,
      chatroomId: "661e4e631a476bee6cfd6b3b",
      customerId: "cus_Pw0zA3CDcf1aNb",
      email: "gyruhitav@yopmail.com",
      fcmToken:
        "dTivxpfi00mEm1BeX-Sf8U:APA91bFBN9gOUsVk2LqzmLIsE_yYt_EOB0rEgYVh93ngK9KIDhqzzSdE7T77-E1OBts35cDHEC9nGY4iXFioyao34AVI-pMomk4o5wxjST8tJWYEhxANCd-VObDXHzkjK8aHWynzPBMD",
      full_name: "Eugenia Haley",
      groupChatId: "652f88e0a3ed8a769d24ce05",
      height: 5,
      isAssigned: true,
      plan_id: "661f8eb81a476bee6cc8cb65",
      program_id: "660d29bb5d81fb1c1be8eaae",
      role: "customer",
      status: true,
      subscription: [Array],
      target_weight: 150,
      userBadge: [Array],
      user_id: "661e4e611a476bee6cfd6889",
      verification_status: false,
      weight: 100,
      weight_gain: 0,
      weight_loss: 0,
      workout_number: 8,
    },
  },
];
