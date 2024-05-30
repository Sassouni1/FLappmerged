import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants/colors";
import { styles } from "./styles";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import Entypo from "react-native-vector-icons/Entypo";
import { getWidth, getHeight, getFontSize } from "../../../utils/ResponsiveFun";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { setLoader } from "../../Redux/actions/GernalActions";
import { useDispatch, useSelector } from "react-redux";
import { ApiCall } from "../../Services/Apis";
import HeaderBottom from "../../Components/HeaderBottom";
import WelcomeScreens from "../WelcomeScreens/WelcomeScreens";

const LeaderBoard = ({ navigation }) => {
  const token = useSelector((state) => state.auth.userToken);
  const loader = useSelector((state) => state.gernal.loader);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [dataWeight, setDataWeight] = useState([]);
  const [dataMessages, setDataMessages] = useState([]);
  const [isAchievementsSelected, setIsAchievementsSelected] = useState(false);

  const [showAll, setShowAll] = useState(false);
  const topItems = showAll ? data : data.slice(0, 5);

  const [showAllWeight, setShowAllWeight] = useState(false);
  const topItemsWeight = showAllWeight ? dataWeight : dataWeight.slice(0, 5);

  const [showAllMessages, setShowAllMessages] = useState(false);
  const topItemsMessages = showAllMessages
    ? dataMessages
    : dataMessages.slice(0, 5);

  const handleSeeMore = () => {
    setShowAll(!showAll);
  };

  const handleSeeLess = () => {
    setShowAll(false);
  };

  const handleSeeMoreWeight = () => {
    setShowAllWeight(true);
  };

  const handleSeeLessWeight = () => {
    setShowAllWeight(false);
  };

  const handleSeeMoreMessages = () => {
    setShowAllMessages(true);
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
        setData(res?.response?.maxComplete);
        setDataWeight(res?.response?.maxWeight);
        setDataMessages(res?.response?.maxMessages);
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

  useFocusEffect(
    React.useCallback(() => {
      handleRefresh();
    }, [])
  );

  const handleNavigateToAchievements = () => {
    setIsAchievementsSelected(true);
    navigation.navigate("WelcomeScreens");
  };

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
            }}
          />
        }
        RightIcon={
          <TouchableOpacity
            onPress={handleNavigateToAchievements}
            style={{
              marginRight: getFontSize(4),
              backgroundColor: isAchievementsSelected ? "#FF8036" : "transparent",
              paddingHorizontal: getFontSize(2),
              paddingVertical: getFontSize(1),
              borderRadius: getFontSize(2),
            }}
          >
            <Text
              style={[
                styles.txt,
                { color: isAchievementsSelected ? "white" : "#FF8036" },
              ]}
            >
              Achievements
            </Text>
          </TouchableOpacity>
        }
      />

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Render the leaderboard sections */}
        <View
          style={{
            backgroundColor: colors.secondary1,
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
                      borderRadius: 32,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        margin: getFontSize(1.3),
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
                          {item?.userImage && item?.userImage !== "" ? (
                            <View>
                              <Image
                                source={{ uri: item?.userImage }}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
                            </View>
                          ) : (
                            <View>
                              <Image
                                source={require("../../assets/images/Pimg.jpeg")}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
                            </View>
                          )}
                          <View style={{ flexDirection: "column", flex: 1 }}>
                            <Text style={styles.text}>
                              {item.username} #{index + 1}
                            </Text>
                            <Text style={styles.descriptionText} numberOfLines={2}>
                              {item?.totalCompletedExercises} consecutive days
                            </Text>
                          </View>
                          {index === 0 ? (
                            <View>
                              <Image
                                source={require("../../assets/images/first1.png")}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
                            </View>
                          ) : index === 1 ? (
                            <View>
                              <Image
                                source={require("../../assets/images/second2.png")}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
                            </View>
                          ) : index === 2 ? (
                            <View>
                              <Image
                                source={require("../../assets/images/third3.png")}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
                            </View>
                          ) : index > 2 ? (
                            <View>
                              <Image
                                source={require("../../assets/images/rest4.png")}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
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
              <TouchableOpacity onPress={handleSeeMore} style={{ margin: getFontSize(3) }}>
                <Text style={styles.txt}>SEE MORE</Text>
              </TouchableOpacity>
            )}
            {showAll && (
              <TouchableOpacity onPress={handleSeeLess} style={{ margin: getFontSize(3) }}>
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
                      borderRadius: 32,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        margin: getFontSize(1.3),
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
                          item?.userDetails?.profile_image !== "" ? (
                            <View>
                              <Image
                                source={{
                                  uri: item?.userDetails?.profile_image,
                                }}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
                            </View>
                          ) : (
                            <View>
                              <Image
                                source={require("../../assets/images/Pimg.jpeg")}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
                            </View>
                          )}
                          <View style={{ flexDirection: "column", flex: 1 }}>
                            <Text style={styles.text}>
                              {item?.userDetails?.full_name} #{index + 1}
                            </Text>
                            <Text style={styles.descriptionText} numberOfLines={2}>
                              {item?.totalMessages} messages
                            </Text>
                          </View>
                          {index === 0 ? (
                            <View>
                              <Image
                                source={require("../../assets/images/first1.png")}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
                            </View>
                          ) : index === 1 ? (
                            <View>
                              <Image
                                source={require("../../assets/images/second2.png")}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
                            </View>
                          ) : index === 2 ? (
                            <View>
                              <Image
                                source={require("../../assets/images/third3.png")}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
                            </View>
                          ) : index > 2 ? (
                            <View>
                              <Image
                                source={require("../../assets/images/rest4.png")}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
                            </View>
                          ) : null}
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            ))}
            {!showAllMessages && dataMessages.length > 5 && (
              <TouchableOpacity onPress={handleSeeMoreMessages} style={{ margin: getFontSize(3) }}>
                <Text style={styles.txt}>SEE MORE</Text>
              </TouchableOpacity>
            )}
            {showAllMessages && (
              <TouchableOpacity onPress={handleSeeLessMessages} style={{ margin: getFontSize(3) }}>
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
                      borderRadius: 32,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        margin: getFontSize(1.3),
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
                          {item?.userImage && item?.userImage !== "" ? (
                            <View>
                              <Image
                                source={{ uri: item?.userImage }}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
                            </View>
                          ) : (
                            <View>
                              <Image
                                source={require("../../assets/images/Pimg.jpeg")}
                                style={styles.thumbnail}
                                resizeMode="cover"
                              />
                            </View>
                          )}
                          <View style={{ flexDirection: "column", flex: 1 }}>
                            <Text style={styles.text}>
                              {item.username} #{index + 1}
                            </Text>
                            <Text style={styles.descriptionText} numberOfLines={2}>
                              {typeof item?.totalWeight === "number"
                                ? item?.totalWeight.toFixed(0)
                                : item?.totalWeight}{" "}
                              weight lift
                            </Text>
                          </View>
                          {index === 0 ? (
                            <View>
                              <Image
                                source={require("../../assets/images/first1.png")}
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
      {/* </>
      )} */}
    </View>
  );
};

export default LeaderBoard;
