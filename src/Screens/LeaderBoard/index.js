import {
  View,
  Text,
  TextInput,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  Image,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { GernalStyle } from "../../constants/GernalStyle";
import { styles } from "./styles";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import Entypo from "react-native-vector-icons/Entypo";
import { SearchSvg, PlayerSvg, InvalidSearch } from "../../assets/images";
import Seprator from "../../Components/Seprator";
import { getWidth, getHeight, getFontSize } from "../../../utils/ResponsiveFun";
import { useNavigation } from "@react-navigation/native";
import { setLoader } from "../../Redux/actions/GernalActions";
import { useDispatch, useSelector } from "react-redux";
import { ApiCall } from "../../Services/Apis";
import HeaderBottom from "../../Components/HeaderBottom";
import AntDesign from "react-native-vector-icons/AntDesign";

const LeaderBoard = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dataWeight, setDataWeight] = useState([]);
  const [dataMessages, setDataMessages] = useState([]);

  const [filteredData, setFilteredData] = useState([]);

  const [showAll, setShowAll] = useState(false);
  const topItems = showAll ? data : data.slice(0, 5);

  const handleSeeMore = () => {
    setShowAll(!showAll);
  };
  const handleSeeLess = () => {
    setShowAll(false);
  };

  const [showAllWeight, setShowAllWeight] = useState(false);
  const topItemsWeight = showAllWeight ? dataWeight : dataWeight.slice(0, 5);

  const handleSeeMoreWeight = () => {
    setShowAllWeight(!showAll);
  };
  const handleSeeLessWeight = () => {
    setShowAllWeight(false);
  };

  const [showAllMessages, setShowAllMessages] = useState(false);
  const topItemsMessages = showAllMessages
    ? dataMessages
    : dataMessages.slice(0, 5);

  const handleSeeMoreMessages = () => {
    setShowAllMessages(!showAll);
  };
  const handleSeeLessMessages = () => {
    setShowAllMessages(false);
  };

  const getConsistentUser = async () => {
    try {
      const res = await ApiCall({
        route: "assignProgram/maxComplete",
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        console.log("maxComplete response", res?.response?.maxMessages);
        setData(res?.response?.maxComplete);
        setDataWeight(res?.response?.maxWeight);
        setDataMessages(res?.response?.maxMessages);
        // setFilteredData(res?.response?.category_list);
        dispatch(setLoader(false));
      } else {
        console.log("error", res.response);
        dispatch(setLoader(false));
        alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };
  const handleRefresh = () => {
    dispatch(setLoader(true));
    getConsistentUser();
  };

  useEffect(() => {
    handleRefresh(); // Call handleRefresh to load data initially
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(51, 51, 51, 1)" }}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(51, 51, 51, 1)"
        translucent={true}
      />
      <HeaderBottom
        title={"LeaderBoard"}
        LeftIcon={
          <Entypo
            size={30}
            color={"white"}
            onPress={() => navigation.openDrawer()}
            name="menu"
            style={{
              alignSelf: "flex-start",
              //marginLeft:getFontSize(-1.5)
            }}
          />
        }
        RightIcon={<View style={{ marginRight: getFontSize(4) }} />}
      />
      {loader ? null : (
        <>
          <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
            <View
              style={{
                backgroundColor: colors.secondary1,
                // height: getHeight(59),
                marginTop: getFontSize(8),
                margin: getFontSize(1),
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: getFontSize(2),
                    marginBottom: getFontSize(2),
                  }}
                >
                  <Text style={styles.txt}>MOST CONSISTENT USER</Text>
                </View>
                {/* <FlatList
              data={topItems}
              refreshing={false}
              onRefresh={handleRefresh}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return ( */}
                {topItems.map((item, index) => (
                  <View key={index}>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: getFontSize(1),
                      }}
                    >
                      <View
                        style={{
                          width: getWidth(90),
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "white",
                          height: getHeight(8),
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: getFontSize(2),
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              {item?.userImage && item?.userImage != "" ? (
                                <View>
                                  <Image
                                    source={{ uri: item?.userImage }}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : (
                                <View>
                                  <Image
                                    source={require("../../assets/images/Pimg.jpeg")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              )}
                              <View
                                style={{ flexDirection: "column", flex: 1 }}
                              >
                                <Text style={styles.text}>
                                  {item.username} #{index + 1}
                                </Text>
                                <Text
                                  style={styles.descriptionText}
                                  numberOfLines={2}
                                >
                                  {item?.totalCompletedExercises} consective
                                  days
                                </Text>
                              </View>
                              {index == 0 ? (
                                <View>
                                  <Image
                                    source={require("../../assets/images/first1.png")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : index == 1 ? (
                                <View>
                                  <Image
                                    source={require("../../assets/images/second2.png")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : index == 2 ? (
                                <View>
                                  <Image
                                    source={require("../../assets/images/third3.png")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : index > 2 ? (
                                <View>
                                  <Image
                                    source={require("../../assets/images/rest4.png")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : null}
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
                {!showAll && data.length > 5 && (
                  <TouchableOpacity
                    onPress={handleSeeMore}
                    style={{ margin: getFontSize(3) }}
                  >
                    <Text style={styles.txt}>SEE MORE</Text>
                  </TouchableOpacity>
                )}
                {showAll && (
                  <TouchableOpacity
                    onPress={handleSeeLess}
                    style={{ margin: getFontSize(3) }}
                  >
                    <Text style={styles.txt}>SEE LESS</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/* </ScrollView> */}

            {/* <ScrollView style={{ flex: 1 }} */}
            {/* showsVerticalScrollIndicator="false"> */}

            <View
              style={{
                backgroundColor: colors.secondary1,
                marginTop: getFontSize(5),
                margin: getFontSize(1),
                marginBottom: getFontSize(1),
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: getFontSize(2),
                    marginBottom: getFontSize(2),
                  }}
                >
                  <Text style={styles.txt}>MOST ENGAGED USER ON CHAT</Text>
                </View>
                {/* <FlatList
              data={topItems}
              refreshing={false}
              onRefresh={handleRefresh}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return ( */}
                {topItemsMessages.map((item, index) => (
                  <View key={index}>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: getFontSize(1),
                      }}
                    >
                      <View
                        style={{
                          width: getWidth(90),
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "white",
                          height: getHeight(8),
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: getFontSize(2),
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              {item?.userDetails?.profile_image &&
                              item?.userDetails?.profile_image != "" ? (
                                <View>
                                  <Image
                                    source={{
                                      uri: item?.userDetails?.profile_image,
                                    }}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : (
                                <View>
                                  <Image
                                    source={require("../../assets/images/Pimg.jpeg")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              )}
                              <View
                                style={{ flexDirection: "column", flex: 1 }}
                              >
                                <Text style={styles.text}>
                                  {item?.userDetails?.full_name} #{index + 1}
                                </Text>
                                <Text
                                  style={styles.descriptionText}
                                  numberOfLines={2}
                                >
                                  {item?.totalMessages} messages
                                </Text>
                              </View>
                              {index == 0 ? (
                                <View>
                                  <Image
                                    source={require("../../assets/images/first1.png")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : index == 1 ? (
                                <View>
                                  <Image
                                    source={require("../../assets/images/second2.png")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : index == 2 ? (
                                <View>
                                  <Image
                                    source={require("../../assets/images/third3.png")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : index > 2 ? (
                                <View>
                                  <Image
                                    source={require("../../assets/images/rest4.png")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : null}
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
                {!showAllWeight && dataWeight.length > 5 && (
                  <TouchableOpacity
                    onPress={handleSeeMoreWeight}
                    style={{ margin: getFontSize(3) }}
                  >
                    <Text style={styles.txt}>SEE MORE</Text>
                  </TouchableOpacity>
                )}
                {showAllWeight && (
                  <TouchableOpacity
                    onPress={handleSeeLessWeight}
                    style={{ margin: getFontSize(3) }}
                  >
                    <Text style={styles.txt}>SEE LESS</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View
              style={{
                backgroundColor: colors.secondary1,
                marginTop: getFontSize(5),
                margin: getFontSize(1),
                marginBottom: getFontSize(4),
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: getFontSize(2),
                    marginBottom: getFontSize(2),
                  }}
                >
                  <Text style={styles.txt}>HEAVIEST SQUAT</Text>
                </View>
                {/* <FlatList
              data={topItems}
              refreshing={false}
              onRefresh={handleRefresh}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return ( */}
                {topItemsWeight.map((item, index) => (
                  <View key={index}>
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: getFontSize(1),
                      }}
                    >
                      <View
                        style={{
                          width: getWidth(90),
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "white",
                          height: getHeight(8),
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            margin: getFontSize(2),
                          }}
                        >
                          <View style={{ flex: 1 }}>
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                              }}
                            >
                              {item?.userImage && item?.userImage != "" ? (
                                <View>
                                  <Image
                                    source={{ uri: item?.userImage }}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : (
                                <View>
                                  <Image
                                    source={require("../../assets/images/Pimg.jpeg")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              )}
                              <View
                                style={{ flexDirection: "column", flex: 1 }}
                              >
                                <Text style={styles.text}>
                                  {item.username} #{index + 1}
                                </Text>
                                <Text
                                  style={styles.descriptionText}
                                  numberOfLines={2}
                                >
                                  {item?.totalWeight} consective days
                                </Text>
                              </View>
                              {index == 0 ? (
                                <View>
                                  <Image
                                    source={require("../../assets/images/first1.png")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : index == 1 ? (
                                <View>
                                  <Image
                                    source={require("../../assets/images/second2.png")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : index == 2 ? (
                                <View>
                                  <Image
                                    source={require("../../assets/images/third3.png")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : index > 2 ? (
                                <View>
                                  <Image
                                    source={require("../../assets/images/rest4.png")}
                                    style={styles.thumbnail}
                                    resizeMode="cover"
                                  ></Image>
                                </View>
                              ) : null}
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
                {!showAllWeight && dataWeight.length > 5 && (
                  <TouchableOpacity
                    onPress={handleSeeMoreWeight}
                    style={{ margin: getFontSize(3) }}
                  >
                    <Text style={styles.txt}>SEE MORE</Text>
                  </TouchableOpacity>
                )}
                {showAllWeight && (
                  <TouchableOpacity
                    onPress={handleSeeLessWeight}
                    style={{ margin: getFontSize(3) }}
                  >
                    <Text style={styles.txt}>SEE LESS</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default LeaderBoard;
