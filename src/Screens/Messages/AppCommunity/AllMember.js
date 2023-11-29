import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  Pressable,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import { colors } from "../../../constants/colors";
import { GernalStyle } from "../../../constants/GernalStyle";
import { styles } from "./styles";
import Feather from "react-native-vector-icons/Feather";
import {
  getFontSize,
  getWidth,
  getHeight,
} from "../../../../utils/ResponsiveFun";
import { fonts } from "../../../constants/fonts";
import { ApiCall } from "../../../Services/Apis";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setLoader } from "../../../Redux/actions/GernalActions";
import HeaderBottom from "../../../Components/HeaderBottom";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import ImageModal from "react-native-image-modal";

const AllMember = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [allUser, setAllUser] = useState([]);
  //const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [invalidEntry, setInvalidEntry] = useState(false);

  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const [searchText, setSearchText] = useState("");
  const createChatBox = async (item) => {
    // dispatch(setLoader(true))
    try {
      const res = await ApiCall({
        params: { id: item?.user_id },
        route: "chat/create_chat_box",
        verb: "post",
        token: token,
      });
      // var arr = res?.response?.detail?.messages;
      // console.log('arra',arr)
      if (res?.status == "200") {
        console.log("Create chat box___", res?.response?.detail);
        dispatch(setLoader(true));
        const chatResponse = res?.response?.detail;
        navigation.navigate("ConversationScreen", {
          channelId: chatResponse._id,
          channelName:
            user?._id == chatResponse?.user?._id
              ? chatResponse?.customer?.full_name
              : chatResponse?.user?.full_name,
          reciver:
            user?._id == chatResponse?.user?._id
              ? chatResponse?.customer
              : chatResponse?.user,
          sender:
            user?._id == chatResponse?.user?._id
              ? chatResponse?.user
              : chatResponse?.customer,
          chatRoomType: "chat",
        });
        // navigation.goBack();
      } else {
        dispatch(setLoader(false));

        alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };
  const getAllUser = async () => {
    dispatch(setLoader(true));
    try {
      const res = await ApiCall({
        params: { category_name: "skill" },
        route: "chat/all_users",
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        console.log("single meber data", res?.response?.users);
        setAllUser(res?.response?.users);
        // console.log('workout',res?.response?.detail)

        // setData(res?.response?.detail)
        // setProgram(res?.response?.detail?.workouts);
        dispatch(setLoader(false));
        // navigation.goBack();

        // navigation.navigate('HomeScreen');
      } else {
        dispatch(setLoader(false));

        alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };
  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    const filtered = allUser.filter((item) => {
      const title = item.full_name || "";
      return (
        title.toUpperCase().includes(searchText.toUpperCase()) ||
        title.trim() === ""
      );
    });
    setFilteredData(filtered);

    if (filtered.length === 0 && searchText) {
      setInvalidEntry(true);
    } else {
      setInvalidEntry(false);
    }
  }, [searchText, allUser]);
  return (
    <View
      style={{ ...GernalStyle.continer, backgroundColor: colors.homeColor }}
    >
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <HeaderBottom
        title={"All Users"}
        LeftIcon={
          <Ionicons
            name={"arrow-back"}
            size={25}
            color={"#ffff"}
            onPress={() => navigation.goBack()}
          />
        }
        RightIcon={<View style={{ marginRight: getFontSize(3) }} />}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: getWidth(96),
          height: getHeight(7),
          marginVertical: getHeight(1),
          marginTop: getHeight(2.5),
          backgroundColor: colors.secondary,
          borderRadius: 5,
          alignSelf: "center",
        }}
      >
        <FontAwesome
          name={"search"}
          size={25}
          color={"#ffff"}
          style={{ paddingLeft: getFontSize(2) }}
        />
        <TextInput
          style={{
            ...GernalStyle.textinput,
            marginTop: getHeight(0),
            paddingLeft: getWidth(2),
            width: getWidth(75),
            fontWeight: "600",
          }}
          placeholder="Search by name"
          placeholderTextColor={colors.graytext4}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      {invalidEntry || filteredData.length === 0 ? (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            bottom: getFontSize(9),
          }}
        >
          <AntDesign
            size={getFontSize(8)}
            color={"white"}
            name="exclamationcircleo"
          />
          <Text
            style={{
              fontSize: getFontSize(2),
              color: colors.white,
              marginLeft: getFontSize(5),
              marginRight: getFontSize(5),
              textAlign: "center",
              marginTop: getHeight(1),
            }}
          >
            User not found.
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          ListFooterComponent={() => <View style={{ height: getHeight(4) }} />}
          data={filteredData}
          // data={allUser.filter((user) =>
          //   user.full_name.toLowerCase().includes(searchText.toLowerCase())
          // )}
          renderItem={({ item }) => {
            console.log("item", item);
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    createChatBox(item);
                  }}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: getHeight(1.5),
                  }}
                >
                  <ImageModal
                    resizeMode="cover"
                    modalImageResizeMode="contain"
                    style={{
                      width: getWidth(13.5),
                      height: getHeight(6),
                      borderRadius: 30,
                      marginLeft: getWidth(4),
                    }}
                    source={
                      item?.profile_image === ""
                        ? require("../../../assets/images/Pimg.jpeg")
                        : { uri: item?.profile_image }
                    }
                  />
                  <View style={{ marginLeft: getWidth(4) }}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: fonts.URe,
                        color: colors.white,
                      }}
                    >
                      {item.full_name}
                    </Text>
                    {/* <Text style={{fontSize:14,fontFamily:fonts.URe,color:colors.white}}>{item.lastmsg}</Text> */}
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default AllMember;
