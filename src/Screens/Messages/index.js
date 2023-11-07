import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { GernalStyle } from "../../constants/GernalStyle";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
// import AppHeader from '../../Components/AppHeader';
import Entypo from "react-native-vector-icons/Entypo";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { ChatUser1, ChatUserBtn } from "../../assets/images";
import Userb from "../../assets/images/userb.svg";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { setLoader } from "../../Redux/actions/GernalActions";
import { useDispatch, useSelector } from "react-redux";
import { ApiCall } from "../../Services/Apis";
import HeaderBottom from "../../Components/HeaderBottom";

const Messages = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [users, setAllUser] = useState([]);
  const [admin, setAdmin] = useState([]);
  const [community, setCommunity] = useState([]);

  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);

  const ChatroomUser = async () => {
    try {
      const res = await ApiCall({
        params: { category_name: "skill" },
        route: "chat/all_chatrooms_users",
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        console.log("chat Romms", res?.response?.chatrooms?.community);

        setAllUser(res?.response?.chatrooms?.member);
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
  useEffect(() => {
    dispatch(setLoader(true));

    ChatroomUser();
  }, []);
  const HeadingText = ({ style, buttontext }) => {
    return (
      <View style={[styles.heading, style]}>
        <Text style={styles.headingtext}>{buttontext}</Text>
      </View>
    );
  };
  
  return (
    <View style={{ flex: 1, backgroundColor: "rgba(51, 51, 51, 1)" }}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(51, 51, 51, 1)"
      />
      <HeaderBottom
        title={"Chats"}
        LeftIcon={
          <Entypo
            size={30}
            color={"white"}
            onPress={() => navigation.openDrawer()}
            name="menu"
          />
        }
        RightIcon={<View />}
      />
      <HeadingText buttontext={"App"} />
      {console.log("admin", admin)}
      {admin.map((item) => (
        <View
          style={{
            width: getWidth(95),
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ConversationScreen", {
                channelId: item._id,
                channelName: item?.admin?.full_name,
                reciver: item?.admin,
                sender: item?.customer,
                chatRoomType: "chat",
              })
            }
            style={{ ...styles.row, marginTop: 5 }}
          >
            <View
              style={{
                ...styles.logoCon,
                marginLeft: getWidth(5),
                marginTop: 5,
                backgroundColor: colors.gray8,
              }}
            >
              {item?.admin?.profile_image == "" ? (
                <Userb height={50} width={50} />
              ) : (
                <Image
                  resizeMode="contain"
                  style={{ height: 50, width: 50, borderRadius: 30 }}
                  source={{ uri: item?.admin?.profile_image }}
                />
              )}
            </View>
            <View>
              <View style={styles.userCon}>
                <Text style={styles.username}>{item?.admin?.full_name}</Text>
                <Text style={styles.time}>
                  {item?.messages.length > 0
                    ? new Date(
                        item?.messages[item?.messages.length - 1].date
                      ).toLocaleTimeString()
                    : null}
                </Text>
              </View>
              <Text style={styles.lastmsg}>
                {item?.messages.length > 0
                  ? item?.messages[item?.messages.length - 1].sender ==
                    user?._id
                    ? "you:" + item?.messages[item?.messages.length - 1].message
                    : item?.customer?.full_name +
                      ":" +
                      item?.messages[item?.messages.length - 1].message
                  : "Tap there and start conversation"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}

      <HeadingText
        buttontext={"Community"}
        style={{ marginTop: getHeight(1) }}
      />

      {community?.map((item) => (
        <View
          style={{
            width: getWidth(95),
            alignSelf: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ConversationScreen", {
                channelId: item._id,
                channelName: "App Comunity",
                reciver: {},
                sender: user,
                chatRoomType: "groupChat",
              })
            }
            style={{ ...styles.row, marginTop: 5 }}
          >
            <View
              style={{
                ...styles.logoCon,
                marginLeft: getWidth(5),
                marginTop: 5,
                backgroundColor: colors.gray8,
              }}
            >
              <ChatUser1 height={30} width={30} />
            </View>
            <View>
              <View style={styles.userCon}>
                <Text style={styles.username}>{"App Comunity"}</Text>
                <Text style={styles.time}>
                  {item?.messages
                    ? new Date(item?.last_message?.date).toLocaleTimeString()
                    : null}
                </Text>
              </View>
              <Text style={styles.lastmsg}>
                {item?.last_message
                  ? item?.last_message?.sender == user?._id
                    ? "you:" + item?.last_message.message
                    : "Other:" + item?.last_message.message
                  : "Tap there and start conversation"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
      <HeadingText buttontext={"Members"} style={{ marginTop: getHeight(1) }} />
      <View style={{ alignSelf: "center", flex: 1 }}>
        <FlatList
          data={users}
          showsVerticalScrollIndicator={false}
          refreshing={false}
          onRefresh={() => ChatroomUser()}
          ListFooterComponent={() => <View style={{ height: getHeight(10) }} />}
          ItemSeparatorComponent={() => (
            <View style={{ height: getHeight(0.5) }} />
          )}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width: getWidth(95),
                  alignSelf: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("ConversationScreen", {
                      channelId: item._id,
                      channelName:
                        user?._id == item?.user?._id
                          ? item?.customer?.full_name
                          : item?.user?.full_name,
                      reciver:
                        user?._id == item?.user?._id
                          ? item?.customer
                          : item?.user,
                      sender:
                        user?._id == item?.user?._id
                          ? item?.user
                          : item?.customer,
                      chatRoomType: "chat",
                    })
                  }
                  style={{ ...styles.row, marginTop: 5 }}
                >
                  <View
                    style={{
                    //  ...styles.logoCon,
                      marginLeft: getWidth(5),
                      marginTop: getFontSize(1),
                   //   backgroundColor: colors.gray8,
                    }}
                  >
                    {item?.customer?.profile_image == "" ? (
                      <Userb height={50} width={50} />
                    ) : (
                      <Image
                        resizeMode="cover"
                        style={{ height: getFontSize(7), width: getFontSize(7), borderRadius: getFontSize(0.5) }}
                        source={{ uri: item?.customer?.profile_image }}
                      />
                    )}
                  </View>
                  <View>
                    <View style={styles.userCon}>
                      <Text style={styles.username}>
                        {user?._id == item?.user?._id
                          ? item?.customer?.full_name
                          : item?.user?.full_name}
                      </Text>
                      <Text style={styles.time}>
                        {item?.messages.length > 0
                          ? new Date(
                              item?.messages[item?.messages.length - 1].date
                            ).toLocaleTimeString()
                          : null}
                      </Text>
                    </View>
                    <Text style={styles.lastmsg}>
                      {item?.messages.length > 0
                        ? item?.messages[item?.messages.length - 1].sender ==
                          user?._id
                          ? "you:" +
                            item?.messages[item?.messages.length - 1].message
                          : item?.customer?.full_name +
                            ":" +
                            item?.messages[item?.messages.length - 1].message
                        : "Tap there and start conversation"}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("AllMember")}
        style={{
          height: getHeight(7),
          width: getWidth(15),
          borderRadius: 9,
          justifyContent: "center",
          alignItems: "center",
          right: getWidth(3),
          bottom: getHeight(2.5),
          position: "absolute",
          backgroundColor: colors.greenlight,
        }}
      >
        <ChatUserBtn height={25} width={25} />
      </TouchableOpacity>
    </View>
  );
};

export default Messages;
