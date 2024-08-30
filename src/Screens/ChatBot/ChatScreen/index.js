import React, { useState, useEffect, useCallback } from "react";
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
import { useSelector } from "react-redux";
import { SvgUri } from "react-native-svg";
import SimpleToast from "react-native-simple-toast";
import ImageModal from "react-native-image-modal";
import moment from "moment";
import fs from "react-native-fs";
import { GernalStyle } from "../../../constants/GernalStyle";
import { colors } from "../../../constants/colors";
import * as Animatable from "react-native-animatable";
import {
  CameraPicker,
  SendMsg,
  SpeakIcon,
  UserChat,
  BotChat,
} from "../../../assets/images";
import {
  getFontSize,
  getHeight,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import { fonts } from "../../../constants/fonts";
import ImagePickerModal from "../../../Components/ImagePickerModal";
import {
  captureImage,
  chooseImageGallery,
} from "../../../../utils/ImageAndCamera";
import HeaderChatBot from "../../../Components/HeaderChatBot";

const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight;

const BotChatScreen = ({ navigation, route }) => {
  const user = useSelector((state) => state.auth.userData);
  const [pickerModalVisibile, setPickerModalVisibile] = useState(false);
  const [sms, setSms] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello! How can I assist you today?",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "ChatGPT",
        },
      },
    ]);
  }, []);

  const handleSend = useCallback((newMessages = []) => {
    setSms("");
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const message = newMessages[0].text;

    // Add a waiting indicator message
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [
        {
          _id: Math.random().toString(36).substring(7),
          text: "waiting...",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "ChatGPT",
          },
        },
      ])
    );

    fetch("http://54.147.3.191/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: message }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(user);
        const responseMessage = {
          _id: Math.random().toString(36).substring(7),
          text: data?.message,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "ChatGPT",
          },
        };
        setMessages((previousMessages) => {
          const filteredMessages = previousMessages.filter(
            (msg) => msg.text !== "waiting..."
          );
          return GiftedChat.append(filteredMessages, responseMessage);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const sendChat = async (sms) => {
    // setSms("");
    // navigation.navigate("TestChatSceen");
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
  };

  const WaitingDots = () => {
    return (
      <View style={styles.dotsContainer}>
        <Animatable.Text
          animation="bounce"
          iterationCount="infinite"
          style={styles.dot}
        >
          .
        </Animatable.Text>
        <Animatable.Text
          animation="bounce"
          iterationCount="infinite"
          delay={100}
          style={styles.dot}
        >
          .
        </Animatable.Text>
        <Animatable.Text
          animation="bounce"
          iterationCount="infinite"
          delay={200}
          style={styles.dot}
        >
          .
        </Animatable.Text>
      </View>
    );
  };

  const renderBubble = (props) => {
    if (props.currentMessage.text === "waiting...") {
      return <WaitingDots />;
    }
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
  };

  const backHandler = () => navigation.navigate("HomeSc");

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
          source={{ uri: user?.profile_image }}
          style={{ height: "88%", width: "99%", borderRadius: getWidth(3) }}
        />
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" style={{ backgroundColor: "white" }} />
      <HeaderChatBot
        title={
          <Text>
            Coach Jarvis.AI
            <Text style={styles.headerSubText}>{`\t`}</Text>
          </Text>
        }
        titelStyle={styles.headerTitle}
        containerStyle={styles.headerContainer}
        LeftIcon={
          <Pressable style={styles.headerIconWraaper} onPress={backHandler}>
            <Image
              source={require("../../../assets/images/Monotonechevronleft.png")}
              style={styles.headerIcons}
            />
          </Pressable>
        }
      />
      <View style={styles.chatContainer}>
        <GiftedChat
          renderAvatar={(props) => null}
          renderBubble={renderBubble}
          renderMessageText={(props) => {
            return (
              <View>
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
                    {props.currentMessage.user._id == user?._id ? (
                      <RenderProfilePic props={props} />
                    ) : (
                      <View
                        style={{
                          width: getWidth(10),
                          height: getWidth(10),
                          backgroundColor: props.currentMessage.user._id
                            ? colors.orange
                            : colors.greyMedium,
                          justifyContent: "center",
                          alignItems: "center",
                          borderRadius: getWidth(3),
                        }}
                      >
                        {props.currentMessage.user._id ? (
                          <UserChat height={25} width={25} />
                        ) : (
                          <BotChat height={25} width={25} />
                        )}
                      </View>
                    )}
                    <Text
                      style={{
                        paddingHorizontal: getWidth(2),
                        color:
                          props.currentMessage.user._id == user?._id
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
                  <View
                    style={{
                      flexDirection: props.currentMessage.user._id
                        ? "row-reverse"
                        : "row",
                    }}
                  >
                    <View
                      style={[
                        styles.customView,
                        {
                          backgroundColor: props.currentMessage.user._id
                            ? colors.orange
                            : colors.greyMedium,
                        },
                      ]}
                    >
                      {props.currentMessage.user._id ? (
                        <UserChat height={25} width={25} />
                      ) : (
                        <BotChat height={25} width={25} />
                      )}
                    </View>
                    <ImageModal
                      style={[styles.image, props.imageStyle]}
                      resizeMode={"cover"}
                      modalImageResizeMode="contain"
                      source={{ uri: props.currentMessage?.PdfFile }}
                    />
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
              <View style={{ ...styles.inputCon }}>
                <View style={styles.textinputCon}>
                  <TouchableOpacity onPress={() => null}>
                    <SpeakIcon
                      height={25}
                      width={25}
                      style={{ marginLeft: getWidth(2.5) }}
                    />
                  </TouchableOpacity>
                  <TextInput
                    style={{
                      ...GernalStyle.textInputMessage,
                      width: getWidth(60),
                      marginTop: 0,
                      paddingLeft: getWidth(3),
                      color: colors.black,
                      backgroundColor: colors.greyLight,
                    }}
                    value={sms}
                    onChangeText={(e) => setSms(e)}
                    // onSubmitEditing={() => sendChat(sms)}
                    placeholder="Type to start chatting..."
                    // placeholderTextColor={colors.textDark}
                  />
                  <TouchableOpacity
                    onPress={() => setPickerModalVisibile(false)}
                  ></TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    let newMessages = [
                      {
                        _id: Math.random().toString(36).substring(7),
                        text: sms,
                        createdAt: new Date(),
                        user: {
                          _id: user?._id,
                          name: "User",
                        },
                      },
                    ];
                    handleSend(newMessages);
                  }}
                  style={styles.sendBtn}
                >
                  <SendMsg height={25} width={25} />
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
          onSend={(newMessages) => handleSend(newMessages)}
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
    marginRight: getWidth(10),
    marginBottom: getHeight(1),
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
  dotsContainer: {
    flexDirection: "row",
  },
  dot: {
    fontSize: 40,
    color: "#007AFF",
  },
});

export default BotChatScreen;
