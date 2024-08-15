import React, { useState, useEffect } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { SvgUri } from "react-native-svg";
import SimpleToast from "react-native-simple-toast";
import ImageModal from "react-native-image-modal";
import moment from "moment";
import fs from "react-native-fs";

import { GernalStyle } from "../../../constants/GernalStyle";
import { colors } from "../../constants/colors";
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
  timeSince,
} from "../../../utils/ResponsiveFun";
import { fonts } from "../../constants/fonts";
import ChatsCard from "../../Components/Chats/ChatsCard";
import {
  captureImage,
  chooseImageGallery,
} from "../../../utils/ImageAndCamera";
import HeaderChatBot from "../../Components/HeaderChatBot";
import { ApiCall } from "../../Services/Apis";
import { setLoader } from "../../Redux/actions/GernalActions";
import PopupModal from "../../Components/ErrorPopup";
import { useFocusEffect } from '@react-navigation/native';


const STATUSBAR_HEIGHT =
  Platform.OS === "ios" ? getStatusBarHeight(true) : StatusBar.currentHeight;

const BotAllChatScreen = ({ navigation, route }) => {
  const user = useSelector((state) => state.auth.userData);
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);
  const dispatch = useDispatch();
  const [admin, setAdmin] = useState([]);
  const [community, setCommunity] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (user.isAssigned != true)
        setModalVisible(true);
    }, [])
  );
  const toggleModal = () => {
      setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    dispatch(setLoader(true));
    ChatroomUser();
  }, []);

  const ChatroomUser = async () => {
    try {
      const res = await ApiCall({
        params: { category_name: "skill" },
        route: "chat/all_chatrooms_users",
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        setAdmin(res?.response?.chatrooms?.admin);
        setCommunity(res?.response?.chatrooms?.community);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get chatrooms error -- ", e.toString());
    }
  };

  const backHandler = () => {
    navigation.goBack();
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() =>
          item.title === "Coach Jarvis.AI"
            ? navigation.navigate("CreateChatScreen")
            : navigation.navigate("ConversationScreen", {
                channelId: item._id,
                channelName: item.title,
                receiver: item.subText === "GPT-4" ? {} : item.admin,
                sender: user,
                chatRoomType: item.subText === "GPT-4" ? "groupChat" : "chat",
              })
        }
      >
        <ChatsCard item={item} index={index} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* <PopupModal isVisible={isModalVisible} toggleModal={toggleModal} /> */}
      <StatusBar
        barStyle="light-content"
        style={{ backgroundColor: colors.white }}
      />
      <HeaderChatBot
        title={"My Chats"}
        titelStyle={styles.headerTitle}
        containerStyle={styles.headerContainer}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../../assets/images/Monotone3chevron3left.png")}
              style={{
                tintColor: colors.white,
                height: 30,
                width: 30,
                marginLeft: 16,
                marginTop: 2,
              }}
            />
          </TouchableOpacity>
        }
      />
      {loader ? null : (
        <SectionList
          className="mt-4 pl-4"
          sections={[
            {
              title: "Chats",
              data: [
                ...community.map((item) => ({
                  _id: item._id,
                  title: "Fight Life Team",
                  subText: "GPT-4",
                  msgCount: item?.messages
                    ? item?.messages.length.toString()
                    : "0",
                  iconUrl: require("../../assets/images/support.png"),
                  colors: colors.greenlight,
                })),
                {
                  _id: "team",
                  title: "Coach Jarvis.AI",
                  subText: "Team",
                  msgCount: "1.7K",
                  iconUrl: require("../../assets/images/teamIcon.png"),
                  colors: colors.lightBlue,
                },
                ...admin.map((item) => ({
                  _id: item._id,
                  title: "Customer Support",
                  subText: "Support",
                  msgCount: item?.messages
                    ? item?.messages.length.toString()
                    : "0",
                  iconUrl: require("../../assets/images/aiIcon.png"),
                  colors: colors.lightRed,
                  admin: item?.admin,
                })),
              ],
            },
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.titleWrapperRow}>
              <Text style={styles.headingText}>{title}</Text>
              <Text style={[styles.sellAllText]}>{"See all"}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    flexDirection: "column",
    justifyContent: "space-between",
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
        iconUrl: require("../../assets/images/aiIcon.png"),
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
        iconUrl: require("../../assets/images/support.png"),
        colors: colors.greenlight,
      },
    ],
  },
];
