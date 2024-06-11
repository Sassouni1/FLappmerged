import React, { useState } from "react";
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
  SectionList,
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
import ChatsCard from "../../../Components/Chats/ChatsCard";
import {
  captureImage,
  chooseImageGallery,
} from "../../../../utils/ImageAndCamera";
import HeaderChatBot from "../../../Components/HeaderChatBot";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight;

const BotAllChatScreen = ({ navigation, route }) => {
  const user = useSelector((state) => state.auth.userData);
  const [pickerModalVisibile, setPickerModalVisibile] = useState(false);
  const [sms, setSms] = useState("");
  const sendChat = async (sms) => {
    setSms("");
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

  const renderAvatar = (props) => {
    return null;
  };
  const backHandler = () => {
    navigation.goBack();
  };
  const renderItem = ({ item, index }) => (
    <ChatsCard item={item} index={index} />
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        style={{ backgroundColor: colors.white }}
      />
      <HeaderChatBot
        title={"My Chats"}
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
      <SectionList
        className="mt-4 pl-4"
        sections={DATA}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title, horizontal, data } }) => (
          <View
            style={
              title == "Chats" ? styles.titleWrapperRow : styles.titleWrapper
            }
          >
            <Text style={styles.headingText}>{title}</Text>
            {title == "Chats" && (
              <Text style={[styles.sellAllText]}>{"See all"}</Text>
            )}
          </View>
        )}
        // contentContainerStyle={{gap: getHeight(2), alignItems: 'center'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerContainer: {
    paddingTop: STATUSBAR_HEIGHT,
    borderBottomLeftRadius: getWidth(10),
    borderBottomRightRadius: getWidth(10),
    alignItems: "flex-start",
    flexDirection: "column",
    backgroundColor: "#000000",
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
    marginTop: 0,
    paddingBottom: getHeight(2),
  },
  headerIconWraaper: {
    marginTop: getHeight(4),
    backgroundColor: colors.black,
    height: getWidth(12),
    width: getWidth(12),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: getWidth(4),
  },
  headerIcons: {
    height: getWidth(8),
    width: getWidth(8),
    tintColor: colors.white,
  },
  headerTitle: {
    paddingTop: getHeight(2),
    color: colors.white,
    fontSize: 30,
    fontFamily: fonts.WB,
    fontWeight: "700",
    textAlign: "left",
    alignSelf: "flex-start",
    paddingBottom: getHeight(2),
  },
  titleWrapper: {
    width: getWidth(91.2),
    alignItems: "flex-start",
    alignSelf: "center",
  },
  titleWrapperRow: {
    width: getWidth(91.2),
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
  },
  headingText: {
    paddingTop: getHeight(2),
    color: colors.black,
    fontSize: 16,
    fontFamily: fonts.WB,
    textAlign: "left",
    alignSelf: "flex-start",
  },
  sellAllText: {
    paddingTop: getHeight(2),
    color: colors.orange,
    fontSize: getFontSize(2),
    fontFamily: fonts.WM,
  },
});

export default BotAllChatScreen;

const DATA = [
  {
    title: "Chats",
    data: [
      { title: "Fight Life Team", subText: "Team", msgCount: "1.7K" },
      {
        title: "Coach Jarvis.AI",
        subText: "My AI Coach",
        msgCount: "870",
        iconUrl: require("../../../assets/images/aiIcon.png"),
        colors: colors.lightRed,
      },
    ],
  },
  {
    title: "Customer Support",
    data: [
      {
        title: "Customer Support",
        subText: "GPT-4",
        msgCount: "875",
        iconUrl: require("../../../assets/images/support.png"),
        colors: colors.greenlight,
      },
    ],
  },
];
