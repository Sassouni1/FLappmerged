import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/actions/GernalActions";
import { ApiCall } from "../../Services/Apis";
import { getHeight, getWidth } from "../../../utils/ResponsiveFun";
import TabBarComponent from "../../Components/TabBarComponent";
import { colors, fonts } from "../../constants";

const HEADER_MAX_HEIGHT = 90;
const HEADER_MIN_HEIGHT = 0; // To hide completely
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const WorkoutDetails = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [program, setProgram] = useState([]);
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const scrollY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    getAllProgram();
    getContinuousProgram();
  }, []);

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
        setProgram(res?.response?.detail);
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

  const tabBarOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE], // Corrected input range length
    outputRange: [1, 0], // Corrected output range length
    extrapolate: "clamp",
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          <Animated.View style={{ opacity: headerOpacity }}>
            <View style={styles.headerWords}>
              <Text style={styles.headerSubtext}>Fight Life 👊</Text>
              <Text style={styles.headerText}>Start Training</Text>
            </View>
          </Animated.View>
        </View>
      </Animated.View>
      {/* <Animated.View
        style={{
          opacity: tabBarOpacity,
        }}
      > */}
      <TabBarComponent
        activeTab={0}
        setActiveTab={(index) => {
          if (index === 1) navigation.navigate("AddWorkouts");
          else if (index === 2) navigation.navigate("AddWorkouts");
        }}
      />
      {/* </Animated.View> */}
      <Animated.ScrollView
        style={{ flex: 1 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>All programs</Text>
          {program.length > 0 &&
            program.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate("ViewProgram", {
                    passData: item,
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
                    <Text style={styles.programTitle}>{item?.title}</Text>
                    <Text style={styles.programDesc}>{item?.description}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
        </View>
        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutDetails;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  profileImage: {
    width: 55,
    height: 55,
    marginLeft: 15,
    borderRadius: 20,
    resizeMode: "cover",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerWords: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  headerSubtext: {
    color: "gray",
  },
  headerText: {
    fontSize: 26,
    fontWeight: "700",
    color: "black",
  },
  contentContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  programContainer: {
    borderRadius: 10,
    backgroundColor: "#e8ebed",
    padding: 10,
    marginBottom: 10,
  },
  programImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  programContent: {
    marginTop: 10,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: "700",
  },
  programDesc: {
    color: "#555",
  },
});
