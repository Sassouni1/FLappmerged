import React, { useEffect } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  Text,
  ImageBackground,
  Alert,
  Dimensions,
  Image,
  ScrollView,
} from "react-native";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { Calendar } from "react-native-calendars";
import { useState } from "react";
import Modal from "react-native-modal";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./styles";
import { ApiCall } from "../../Services/Apis";
import { setLoader } from "../../Redux/actions/GernalActions";
import { useDispatch, useSelector } from "react-redux";
import { Assprogram, getSingleUser } from "../../Redux/actions/AuthActions";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { TextInput } from "react-native-paper";
import { GernalStyle } from "../../constants/GernalStyle";
import SelectDropdown from "react-native-select-dropdown";

const WorkoutDetails = () => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState();
  const [betweenTwoHandles, setbetweenTwoHandles] = useState(false);
  const token = useSelector((state) => state.auth.userToken);
  const user = useSelector((state) => state.auth.userData);
  const dispatch = useDispatch();
  const toggleModal = () => {
    console.log("Opening modal");
    setModalVisible(true);
    console.log("Opened modal");
  };
  const handleDoubleTap = (item) => {
    console.log("double tap screen", item);
    navigation.navigate("ViewProgram", {
      passData: item,

      url: betweenTwoHandles
        ? "cont_program/detail_cont_program/"
        : "program/detail_program/",
    });
  };

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
        console.log("programsss", res?.response);
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
    setData([]);

    try {
      const res = await ApiCall({
        route: "program/all_programs",
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        console.log("programsss", res?.response);
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
  useEffect(() => {
    getAllProgram(0);
  }, []);

  const AssignProgram = async () => {
    dispatch(setLoader(true));
    const today = new Date();
    today.setDate(today.getDate() + 7);
    try {
      const res = await ApiCall({
        params: {
          startDate: selectedDate,
          programId: selectedItemId,
        },

        route: betweenTwoHandles
          ? "assignProgram/assign-continuous-program"
          : "assignProgram/assign_Program",
        verb: "post",

        token: token,
      });
      if (res?.status == "200") {
        dispatch(Assprogram(res?.response?.Assigned_Program));
        dispatch(getSingleUser(token));
        dispatch(setLoader(false));
        navigation.navigate("WorkoutSucessfully", { selectDate: selectedDate });
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

  const SwitchProgram = async () => {
    dispatch(setLoader(true));
    const today = new Date();
    today.setDate(today.getDate() + 7);

    try {
      const res = await ApiCall({
        params: {
          startDate: selectedDate,
          programId: selectedItemId,
          planId: user?.plan_id,
          isContinuous: betweenTwoHandles ? "true" : "false",
        },
        route: "assignProgram/switch_assign_Program",
        verb: "post",
        token: token,
      });
      if (res?.status == "200") {
        dispatch(Assprogram(res?.response?.Assigned_Program));
        dispatch(getSingleUser(token));
        dispatch(setLoader(false));
        navigation.navigate("WorkoutSucessfully", { selectDate: selectedDate });
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
    const fetchSelectedItemId = async () => {
      const latestSelectedItemId = await AsyncStorage.getItem(
        "latestSelectedItemId"
      );

      if (latestSelectedItemId) {
        setSelectedItemId(latestSelectedItemId);
      }
    };
    fetchSelectedItemId();
  }, []);

  // Your toggleSelection function...
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

    // Update the latest selected program ID in AsyncStorage
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
    <ScrollView>
      <TouchableOpacity
        style={{
          width: "100%",
          marginTop: -20,
        }}
      >
        <Image
          source={require("../../assets/images/workoutsbtn1.png")}
          style={{
            width: "100%",
            objectFit: "contain",
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: "100%",
          marginTop: -50,
        }}
      >
        <Image
          source={require("../../assets/images/workoutsquizbtn.png")}
          style={{
            width: "100%",
            objectFit: "contain",
          }}
        />
      </TouchableOpacity>
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
          <Text
            style={{
              color: "darkorange",
            }}
          >
            See all
          </Text>
        </View>
        <View
          style={{
            borderRadius: 30,
          }}
        >
          <Image
            source={require("../../assets/images/homevidthumb.png")}
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
                  All Equipment
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
                  For Everyone
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
                Testing Week
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  Get your base line numbers
                </Text>
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
      </View>
      <View
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
              (4)
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
        <TouchableOpacity
          style={{
            borderRadius: 30,
            backgroundColor: "#e8ebed",
          }}
          onPress={() => navigation.navigate("ViewProgram")}
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
                    fontSize: 20,
                    color: "black",
                    fontWeight: "700",
                  }}
                >
                  Zen Flow Yoga
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
        <View
          style={{
            borderRadius: 30,
            backgroundColor: "#e8ebed",
          }}
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
                    fontSize: 20,
                    color: "black",
                    fontWeight: "700",
                  }}
                >
                  Zen Flow Yoga
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
        </View>
        <View
          style={{
            borderRadius: 30,
            backgroundColor: "#e8ebed",
            marginBottom: 100,
          }}
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
                    fontSize: 20,
                    color: "black",
                    fontWeight: "700",
                  }}
                >
                  Zen Flow Yoga
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
        </View>
      </View>
    </ScrollView>
  );
};

export default WorkoutDetails;
