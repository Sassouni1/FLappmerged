import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/actions/GernalActions";
import { ApiCall } from "../../Services/Apis";
import { getHeight, getWidth, getFontSize } from "../../../utils/ResponsiveFun";
import TabBarComponent from "../../Components/TabBarComponent";
import { colors, fonts } from "../../constants";
import PopupModal from "../../Components/ErrorPopup";
import { useFocusEffect } from "@react-navigation/native";

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 0;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const WorkoutDetails = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [program, setProgram] = useState([]);
  const [userPlan, setUserPlan] = useState();
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const [isModalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [dataList, setDataList] = useState([]);

  // Add function to get hardcoded subheader based on program title
  const getHardcodedSubheader = (title) => {
    const subheaders = {
      "Combat Kettlebell": "Kettlebell Only Sports Performance Training",
      "BODY ARMOR": "Combat Sport Bodyweight Program",
      "Muay Thai S&C": "In-Camp Muay Thai Training",
      "Heavy Hitter Boxing": "The definitive program for boxing performance",
      "The Grind: Grappling & Wrestling": "Grappling & Wrestling Performance",
      "Brutal Bareknuckle": "Bareknuckle Boxing Strength & Conditioning",
    };

    // Case-insensitive matching for program titles
    const matchingTitle = Object.keys(subheaders).find(
      (key) => title?.toLowerCase() === key.toLowerCase()
    );

    return matchingTitle ? subheaders[matchingTitle] : "";
  };

  useEffect(() => {
    getAllProgram();
    // getContinuousProgram();
    getInstructions();
    getUserPlan();
  }, []);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useFocusEffect(
    React.useCallback(() => {
      if (user?.showGuestUserPopup == true && user.isGuestUser == true)
        setModalVisible(true);
    }, [])
  );

  const getContinuousProgram = async () => {
    dispatch(setLoader(true));
    setData([]);
    try {
      const res = await ApiCall({
        route: "cont_program/all_cont_programs",
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        setData(res?.response?.detail?.filter((el) => !el?.isDeleted));
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        Alert.alert(res?.response?.message);
      }
    } catch (e) {
      console.log("api error -- ", e.toString());
    }
  };


  const getUserPlan = async () => {
    try {
      const res = await ApiCall({
        route: `assignProgram/view_assignProgram_user/${user?.plan_id}`,
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        setUserPlan(res?.response?.Assigned_Program)
        console.log("userPlan", res);
      } else {
        Alert.alert(res?.response?.message);
      }
    } catch (e) {
      console.log("api error -- ", e.toString());
    }
  };

  const getInstructions = async () => {
    dispatch(setLoader(true));
    try {
      const res = await ApiCall({
        route: 'appInstruction/all_instructions',
        verb: "get",
        token: token,
      });
      if (res?.status == 200) {
        setDataList(
          res?.response?.data?.filter((x) => x.type == "WorkoutProgram")
        );
      } else {
        console.log(res?.response);
      }
      dispatch(setLoader(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoader(false));
    }
  };

  const getAllProgram = async () => {
    dispatch(setLoader(true));
    setProgram([]);
    try {
      const res = await ApiCall({
        route: "program/all_active_programs",
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        const programData = res?.response?.detail;

        // Define the priority order with the correct sequence
        const priorityOrder = [
          "Combat Kettlebell",
          "body armor",
          "Muay Thai s&C",
          "heavy hitter",
          "the grind",
        ];

        // Sort programs based on priority
        const sortedProgramData = programData.sort((a, b) => {
          const aTitle = a.title ? a.title.toLowerCase() : "";
          const bTitle = b.title ? b.title.toLowerCase() : "";

          // Find the index of the program in the priority order, default to a high number if not found
          const aPriority = priorityOrder.findIndex((keyword) =>
            aTitle.includes(keyword.toLowerCase())
          );
          const bPriority = priorityOrder.findIndex((keyword) =>
            bTitle.includes(keyword.toLowerCase())
          );

          // If not found in the priority list, they get the last rank
          const aRank = aPriority !== -1 ? aPriority : priorityOrder.length;
          const bRank = bPriority !== -1 ? bPriority : priorityOrder.length;

          return aRank - bRank;
        });

        setProgram(sortedProgramData);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        Alert.alert(res?.response?.message);
      }
    } catch (e) {
      console.log("api error -- ", e.toString());
    }
  };

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: "clamp",
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PopupModal isVisible={isModalVisible} toggleModal={toggleModal} />
      <Animated.View
        style={[
          styles.header,
          {
            height: headerHeight,
            opacity: headerOpacity,
          },
        ]}
      >
        <View style={styles.headerLeft}>
          <Image
            source={{ uri: user?.profile_image }}
            style={styles.profileImage}
          />
          <View style={styles.headerWords}>
            <Text style={styles.headerSubtext}>Fight Life 👊</Text>
            <Text style={styles.headerText}>Start Training</Text>
          </View>
        </View>
      </Animated.View>
      <TabBarComponent
        activeTab={0}
        setActiveTab={(index) => {
          if (index === 1 || index === 2) navigation.navigate("AddWorkouts");
        }}
      />
      <Animated.ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 50 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>Choose Your Program</Text>
          <Text style={styles.subTitle}>
            After adding your program, complete 5 workouts to unlock more training!
          </Text>
          {program.length > 0 &&
            program.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("ViewProgram", {
                    passData: item,
                    userPlan:userPlan,
                    programVideos: dataList?.filter(
                      (x) => x.program == item?._id
                    ),
                    url: "program/detail_program/",
                  })
                }
              >
                <View style={styles.programContainer}>
                  <Image
                    source={{ uri: item?.program_Image }}
                    style={styles.programImage}
                  />
                  <View style={styles.programContent}>
                    <View style={styles.programHeader}>
                      <View style={styles.programInfoLeft}>
                        <Image
                          source={require("../../assets/images/homeclockicon.png")}
                        />
                        <Text style={styles.programInfoText}>
                          {item?.equipments_needed}
                        </Text>
                      </View>
                      <View style={styles.programInfoRight}>
                        <Image
                          source={require("../../assets/images/homefireicon.png")}
                        />
                        <Text style={styles.programInfoText}>
                          {item?.program_for}
                        </Text>
                      </View>
                    </View>
                    <Text style={styles.programTitle}>{item?.title}</Text>
                    <Text style={styles.programDesc}>
                      {getHardcodedSubheader(item?.title)}
                    </Text>
                    <View style={styles.startButton}>
                      <Text style={styles.startButtonText}>START</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: getHeight(2),
    backgroundColor: "white",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileImage: {
    width: 55,
    height: 55,
    marginLeft: 15,
    borderRadius: 20,
    resizeMode: "cover",
  },
  headerWords: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerSubtext: {
    fontFamily: "Ubuntu",
    fontWeight: "500",
    fontStyle: "normal",
    textAlign: "center",
    color: "gray",
  },
  headerText: {
    fontFamily: "Ubuntu",
    fontSize: 26,
    fontWeight: "700",
    fontStyle: "normal",
    color: "black",
  },
  contentContainer: {
    padding: 6,
    gap: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  subTitle: {
    color: "black",
    fontWeight: "400",
    fontSize: 13,
    paddingRight: 60,
    paddingLeft: 2,
    marginTop: -20,
  },
  programContainer: {
    borderRadius: 30,
    marginBottom: 10,
    overflow: "hidden",
  },
  programImage: {
    width: "100%",
    height: 220,
    resizeMode: "cover",
  },
  programContent: {
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, .3)",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
  programHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  programInfoLeft: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  programInfoRight: {
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 10,
  },
  programInfoText: {
    color: "white",
  },
  programTitle: {
    fontSize: 22,
    color: "white",
    fontWeight: "700",
    marginBottom: 0,
    marginTop: 90,
    shadowColor: "black",
    shadowOpacity: 0.5,
    left: 5,
  },
  programDesc: {
    color: "white",
    marginBottom: 5,
    left: 5,
  },
  startButton: {
    backgroundColor: "rgba(170, 170, 170, 0.42)",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignSelf: "flex-start",
    left: 5,
  },
  startButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 10,
  },
});

export default WorkoutDetails;