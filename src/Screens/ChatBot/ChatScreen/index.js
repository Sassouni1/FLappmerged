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
import SimpleToast from "react-native-simple-toast";
import moment from "moment";
import fs from "react-native-fs";
import { GernalStyle } from "../../../constants/GernalStyle";
import { colors } from "../../../constants/colors";
import * as Animatable from "react-native-animatable";
import { SendMsg, BotChat } from "../../../assets/images";
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
import Messages from "../../../Screens/Messages";

const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight;

const BotChatScreen = ({ navigation, route }) => {
  const user = useSelector((state) => state.auth.userData);
  const [pickerModalVisibile, setPickerModalVisibile] = useState(false);
  const [sms, setSms] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputHeight, setInputHeight] = useState(getHeight(5)); // Moved outside renderInputToolbar

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

  const handleSend = useCallback(
    (newMessages = []) => {
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
    },
    [user]
  );

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

  const uploadFromGallery = async () => {
    // Corrected function name
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

  const backHandler = () => navigation.navigate("Messages");

  const RenderProfilePic = ({ props }) => {
    if (props.currentMessage.user._id === 2) {
      // Assistant's messages
      return (
        <View
          style={[
            styles.customView,
            {
              borderColor: colors.greyMedium, // Ensure this color exists in your colors object
            },
          ]}
        >
          <BotChat height={25} width={25} />
        </View>
      );
    } else if (props.currentMessage.user._id === user?._id) {
      // User's messages
      return (
        <View
          style={[
            styles.customView,
            {
              borderWidth: 0.6,
              borderColor: colors.white,
            },
          ]}
        >
          <Image
            source={{ uri: user?.profile_image }}
            style={{ height: "88%", width: "99%", borderRadius: getWidth(3) }}
          />
        </View>
      );
    }
    return null;
  };

  const renderMessageText = (props) => {
    const isUserMessage = props.currentMessage.user._id === user?._id;
    return (
      <View>
        {props.currentMessage?.text !== "" &&
        props.currentMessage?.text != null ? (
          <View
            style={{
              flexDirection: isUserMessage ? "row-reverse" : "row",
              paddingLeft: getWidth(2),
              paddingRight: getWidth(6), // Add padding on the right
              paddingVertical: getHeight(1),
            }}
          >
            <RenderProfilePic props={props} />
            <View
              style={{
                backgroundColor: isUserMessage ? colors.black : colors.greyBg,
                borderRadius: getWidth(6),
                maxWidth: "90%", // Reduce maxWidth to create more space
                paddingVertical: getHeight(1),
                paddingHorizontal: getWidth(3),
                marginLeft: isUserMessage ? 0 : getWidth(2),
                marginRight: isUserMessage ? getWidth(2) : 0,
              }}
            >
              <Text
                style={{
                  color: isUserMessage ? colors.white : colors.textDark,
                  fontFamily: fonts.WM,
                  fontSize: getFontSize(2),
                }}
              >{`${props.currentMessage?.text}`}</Text>
            </View>
          </View>
        ) : null}
      </View>
    );
  };

  const renderInputToolbar = () => {
    return (
      <View style={styles.inputCon}>
        <View style={styles.textinputCon}>
          <TextInput
            style={{
              ...GernalStyle.textInputMessage,
              width: getWidth(75), // Default width for starting, adjust to make it wider
              paddingLeft: getWidth(3),
              color: colors.black,
              borderRadius: getWidth(5),
              marginTop: getHeight(1),
              backgroundColor: colors.greyLight,
              height: inputHeight, // Dynamically set the height
              minHeight: getHeight(5), // Set a minimum height for the input
              maxHeight: getHeight(15), // Optional: Set a maximum height to prevent over-expansion
            }}
            multiline={true} // Enable multiline input
            value={sms}
            onChangeText={(e) => setSms(e)}
            onContentSizeChange={(e) => {
              setInputHeight(
                Math.min(e.nativeEvent.contentSize.height, getHeight(15))
              ); // Adjust height dynamically with a max limit
            }}
            placeholder="Type to start chatting..."
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            if (sms.trim() === "") {
              SimpleToast.show("Cannot send empty message");
              return;
            }
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
  };

  const renderDay = (props) => {
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
            backgroundColor: colors.greyLight, // Lighter gray color
            height: getWidth(0.2), // Thinner line
            flex: 1,
          }}
        />
        <Text
          style={{
            color: colors.greyLightText, // Lighter text color
            paddingHorizontal: getWidth(2),
            fontFamily: fonts.WR, // Changed to a regular weight font
            fontSize: 10, // Smaller font size
            fontWeight: "400", // Lighter font weight
          }}
        >
          {moment(props.currentMessage.createdAt).format("hh:mm A")}
        </Text>
        <View
          style={{
            backgroundColor: colors.greyUltraLight, // Lighter gray color
            height: getWidth(0.2), // Thinner line
            flex: 1,
          }}
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
          renderAvatar={() => null}
          renderBubble={renderBubble}
          renderMessageText={renderMessageText}
          renderInputToolbar={renderInputToolbar}
          renderDay={renderDay}
          keyboardShouldPersistTaps={"handled"}
          messagesContainerStyle={{
            flexGrow: 1,
            //paddingBottom: getHeight(10), // Adjust this as necessary to ensure enough space for the input
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
        galleryImage={() => uploadFromGallery()}
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
    borderBottomLeftRadius: getWidth(10),
    alignItems: "center",
    paddingBottom: getHeight(2),
    backgroundColor: "#FFFFFF",
    width: getWidth(100),
    shadowColor: "#000", // Add drop shadow for iOS
    shadowOffset: {
      width: 0,
      height: 4, // Adjust to create a stronger shadow
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
    paddingBottom: getHeight(6), // Set this to zero to avoid extra space below the chat
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
  textinputCon: {
    flex: 1,
    backgroundColor: colors.greyLight,
    borderRadius: getWidth(5),
    marginRight: getWidth(2),
    justifyContent: "center",
    minHeight: getHeight(8), // Set a minimum height for the input
    maxHeight: getHeight(15), // Optional: Set a maximum height to prevent over-expansion
  },
  inputCon: {
    flexDirection: "row",
    alignItems: "flex-end", // Align to the bottom
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(4),
    paddingVertical: getHeight(1),
    borderTopLeftRadius: getWidth(10),
    borderTopRightRadius: getWidth(10),
    // position: "absolute",
    // bottom: 0, // Ensures it's at the bottom
    width: "100%", // Full width for proper alignment
    shadowColor: "#000", // Optional for shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2, // Elevation for Android shadow
    paddingBottom: getHeight(4), // Add padding to prevent content from touching the edges
  },
  sendBtn: {
    width: getWidth(15),
    height: getWidth(15),
    backgroundColor: colors.blueColor,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: getWidth(5),
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
