import React, { useEffect } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/actions/GernalActions";
import { ApiCall } from "../../Services/Apis";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getHeight, getFontSize, getWidth } from "../../../utils/ResponsiveFun";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";
import TabBarComponent from "../../Components/TabBarComponent";

const WorkoutDetails = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [program, setProgram] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState();
  const [betweenTwoHandles, setbetweenTwoHandles] = useState(false);
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalVisible(true);
  };

  const handleDoubleTap = (item) => {
    navigation.navigate("ViewProgram", {
      passData: item,
      url: betweenTwoHandles
        ? "cont_program/detail_cont_program/"
        : "program/detail_program/",
    });
  };

  useEffect(() => {
    getAllProgram();
    getContinuousProgram();
  }, []);

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleSelect = (index) => {
    if (index == "S&C Program") {
      setbetweenTwoHandles(false);
      getAllProgram();
    } else {
      setbetweenTwoHandles(true);
      getContinuousProgram();
    }
  };

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
        console.log(res?.response?.detail?.length)
        setData(res?.response?.detail?.filter((el) => !el?.isDeleted));
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        Alert.alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
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
        console.log(res?.response?.detail?.length)
        setProgram(res?.response?.detail);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        Alert.alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };

  // useEffect(() => {
  //   const fetchSelectedItemId = async () => {
  //     const latestSelectedItemId = await AsyncStorage.getItem(
  //       "latestSelectedItemId"
  //     );

  //     if (latestSelectedItemId) {
  //       setSelectedItemId(latestSelectedItemId);
  //     }
  //   };
  //   fetchSelectedItemId();
  // }, []);

  const toggleSelection = async (item) => {
    console.log("item inside toggle selection", item);
    let prevSelectedItems = await AsyncStorage.getItem("selectedItems");
    prevSelectedItems = JSON.parse(prevSelectedItems) || [];

    const index = prevSelectedItems.findIndex(
      (selectedItem) => selectedItem._id === item._id
    );

    if (index !== -1) {
      prevSelectedItems.splice(index, 1);
    } else {
      prevSelectedItems.push(item);
    }

    await AsyncStorage.setItem(
      "selectedItems",
      JSON.stringify(prevSelectedItems)
    );

    await AsyncStorage.setItem("latestSelectedItemId", item._id);
    setSelectedItemId(item._id);
  };

  const handleAddToCalendar = () => {
    if (user?.isAssigned === true) {
      Alert.alert("", " Do you want to switch to new program?", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "destructive",
        },
        { text: "Continue", onPress: () => toggleModal(), style: "default" },
      ]);
    } else {
      toggleModal();
    }
  };

  return (
    <SafeAreaView>
        <View style={[styles.header]}>
            <View style={styles.headerLeft}>
              <Image
                source={{uri:user?.profile_image}}
                style={styles.profileImage}
              />
              <View style={styles.headerWords}>
                <Text style={styles.headerSubtext}>Fight Life 👊 </Text>
                <Text style={styles.headerText}> Start Training</Text>
              </View>
            </View>
            {/* <TouchableOpacity>
              <Image
                source={require("../../assets/images/workoutssearch.png")}
              />
            </TouchableOpacity> */}
          </View>
      <TabBarComponent activeTab={0} setActiveTab={(index) => {
        if (index == 1)
          navigation.navigate("AdditionalWorkout")
        else if (index == 2)
          navigation.navigate("AddWorkouts")
      }} />
    <ScrollView>
      {/* <TouchableOpacity
        onPress={() => navigation.navigate("Howtoreadprogram")}
        style={{ width: "100%", marginTop: -30, marginBottom: -10 }}
      >
        <Image
          source={require("../../assets/images/workoutsbtn1.png")}
          style={{ width: "100%", resizeMode: "contain" }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Fitnesssurvey")}
        style={{ width: "100%", marginTop: -50 }}
      >
        <Image
          source={require("../../assets/images/workoutsquizbtn.png")}
          style={{ width: "100%", resizeMode: "contain" }}
        />
      </TouchableOpacity> */}
      <View
        style={{
          padding: 6,
          gap: 14,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            All programs
          </Text>
          {/* <Text
            style={{
              color: "darkorange",
            }}
          >
            See all
          </Text> */}
        </View>
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
              <View
                style={{
                  borderRadius: 30,
                  marginBottom: 10,
                }}
              >
                <Image
                  source={{ uri: item?.program_Image }}
                  style={{
                    width: "100%",
                    objectFit: "cover",
                    borderRadius: 30,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                  }}
                />
                <View
                  style={{
                    padding: 20,
                    justifyContent: "space-between",
                    height: 220,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Image
                        source={require("../../assets/images/homeclockicon.png")}
                      />
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        {item?.equipments_needed}
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 5,
                        width: 5,
                        backgroundColor: "gray",
                        borderRadius: 10,
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Image
                        source={require("../../assets/images/homefireicon.png")}
                      />
                      <Text
                        style={{
                          color: "white",
                        }}
                      >
                        {item?.program_for}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 22,
                        color: "white",
                        fontWeight: "700",
                      }}
                    >
                      {item?.title}
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <View style={{flex:1}}>
                      <Text
                        style={{color: "white"}}
                        numberOfLines={1}
                      >
                        {item?.description}
                      </Text>
                      </View>
                      <View
                        style={{
                          backgroundColor: "rgba(170, 170, 170, 0.42)",
                          paddingVertical: 6,
                          paddingHorizontal: 10,
                          borderRadius: 12,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontWeight: "600",
                            fontSize: 12,
                          }}
                        >
                          START
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </View>
      {/* <View
        style={{
          padding: 6,
          gap: 14,
          marginTop: 26,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: 4,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
              }}
            >
              Recent Workouts
            </Text>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: "gray",
              }}
            >
              {`(${data.length})`}
            </Text>
          </View>

          <Text
            style={{
              color: "darkorange",
            }}
          >
            See all
          </Text>
        </View>
        {data.length > 0 &&
          data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                borderRadius: 30,
                backgroundColor: "#e8ebed",
              }}
              onPress={() =>
                navigation.navigate("ViewProgram", {
                  passData: item,
                  url: "cont_program/detail_cont_program/",
                })
              }
            >
              <View
                style={{
                  padding: 14,
                  flexDirection: "row",
                  gap: 10,
                }}
              >
                <Image
                  source={require("../../assets/images/workoutsyoga.png")}
                  style={{
                    width: 60,
                    height: 60,
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    gap: 6,
                    width: "75%",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 8,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 18,
                        color: "black",
                        fontWeight: "700",
                      }}
                    >
                      {item?.title}
                    </Text>
                    <View
                      style={{
                        padding: 6,
                        borderWidth: 1,
                        borderRadius: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          color: "black",
                          fontWeight: "600",
                        }}
                      >
                        YOGA
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      width: "100%",
                      backgroundColor: "lightgray",
                      height: 6,
                    }}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                      marginTop: 4,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 4,
                        alignItems: "center",
                        marginTop: 4,
                      }}
                    >
                      <Image
                        source={require("../../assets/images/workoutdocicon.png")}
                        style={{
                          width: 16,
                          height: 16,
                        }}
                      />
                      <Text
                        style={{
                          color: "black",
                        }}
                      >
                        Movement 4
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 4,
                        alignItems: "center",
                        marginTop: 4,
                      }}
                    >
                      <Image
                        source={require("../../assets/images/workoutstopwatchicon.png")}
                        style={{
                          width: 16,
                          height: 16,
                        }}
                      />
                      <Text
                        style={{
                          color: "black",
                        }}
                      >
                        87%
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </View> */}
      <View style={{height:200}} />
    </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutDetails;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: getHeight(2),
  },
  profileImage: {
    width: 55,
    height: 55,
    marginLeft:15,
    borderRadius:10,
    resizeMode: "cover",
  },
  header1: {
    marginTop: 1,
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
  title: {
    flex: 1,
    fontSize: getFontSize(3.2),
    fontFamily: fonts.Re,
    color: colors.white,
    marginLeft: getWidth(2),
    marginRight: getWidth(8),
    textAlign: "center",
  },
 
});