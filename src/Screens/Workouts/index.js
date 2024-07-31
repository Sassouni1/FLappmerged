import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { getHeight, getFontSize, getWidth } from "../../../utils/ResponsiveFun";
import WorkoutDetails from "../WorkoutDetails";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState } from "react";
import AddWorkouts from "./AddWorkouts";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import HeaderBottom from "../../Components/HeaderBottom";
import Entypo from "react-native-vector-icons/Entypo";
import StandAlone from "./StandAlone";
import { ScrollView } from "react-native-gesture-handler";
import AdditionalWorkout from "./AdditionalWorkout";

const Tab1 = () => <WorkoutDetails />;
const Tab2 = () => <AddWorkouts />;
const Tab3 = () => <AdditionalWorkout />;

const initialLayout = { width: Dimensions.get("window").width };

const Workouts = ({ route }) => {
  const navigation = useNavigation();

  const [index, setIndex] = useState(0);
  const [focusedTab, setfocusedTab] = useState(0);

  const renderScene = SceneMap({
    tab1: Tab1,
    tab2: Tab2,
    tab3: Tab3,
  });

  const [routes] = useState([
    { key: "tab1", title: "Programs" },
    { key: "tab3", title: "Additional" },
    { key: "tab2", title: "Calendar" },
  ]);

  useEffect(() => {
    if (route?.params?.data === "tab2") {
      console.log('Setting index to 1 for "My Calendar" tab');
      setIndex(2);
    } else {
      console.log('Setting index to 0 for "S&C Programs" tab');
      setIndex(0);
    }
  }, [route]);

  console.log(route);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <GeneralStatusBar hidden={false} translucent={true} />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 10,
        }}
      >
        {index === 0 && (
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Image
                source={require("../../assets/images/workoutsgirlpic.png")}
              />
              <View style={styles.headerWords}>
                <Text style={styles.headerSubtext}>Fight Life 👊 </Text>
                <Text style={styles.headerText}> Start Training</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Image
                source={require("../../assets/images/workoutssearch.png")}
              />
            </TouchableOpacity>
          </View>
        )}
        {index == 1 && (
          <View>
            <Image
              source={require("../../assets/images/guyback.png")}
              style={{
                width: Dimensions.get("screen").width,
                height: 360,
                position: "absolute",
                top: -60,
                right: 0,
                left: -10,
                resizeMode: "cover",
              }}
            />
            <View
              style={{
                borderRadius: 30,
                width: Dimensions.get("screen").width + 5,
                height: 100,
                backgroundColor: "white",
                position: "absolute",
                top: 250,
                right: 0,
                left: -12,
              }}
            />
          </View>
        )}
        {index == 2 && (
          <View>
            <Image
              source={require("../../assets/images/guyback.png")}
              style={{
                width: Dimensions.get("screen").width,
                height: 360,
                position: "absolute",
                top: -60,
                right: 0,
                left: -10,
                resizeMode: "cover",
              }}
            />
            <View
              style={{
                borderRadius: 30,
                width: Dimensions.get("screen").width + 5,
                height: 100,
                backgroundColor: "white",
                position: "absolute",
                top: 250,
                right: 0,
                left: -12,
              }}
            />
          </View>
        )}
        <TabView
          style={{
            position: "absolute",
            top: 100,
            left: 10,
            right: 10,
            bottom: 0,
          }}
          navigationState={{ index, routes }}
          renderScene={renderScene}
          // onIndexChange={setIndex}
          onIndexChange={(i) => {
            setIndex(i); // Update the index state
            setfocusedTab(i); // Update the focusedTab state
          }}
          initialLayout={initialLayout}
          renderTabBar={(props) => (
            <TabBar
              {...props}
              gap={0}
              indicatorStyle={{
                backgroundColor: "transparent",
              }}
              style={{
                marginBottom: 10,
                backgroundColor: "#f3f3f4",
                borderRadius: 15,
              }}
              renderTabBarItem={({ route, focused, onPress }) => {
                console.log(focused);
                return (
                  <TouchableOpacity
                    onPress={onPress} // Use the onPress prop provided by TabBar
                    style={{
                      borderWidth: index == routes.indexOf(route) ? 4 : 0,
                      borderColor: "#babbbc",
                      backgroundColor:
                        index == routes.indexOf(route) ? "black" : "#f3f3f4",
                      borderRadius: 15,
                      height: 43,
                      justifyContent: "center",
                      alignItems: "center",
                      width: getWidth(31.6), //getHeight(17.8),
                    }}
                  >
                    <Text
                      style={{
                        color:
                          index == routes.indexOf(route) ? "white" : "#686c74",
                        fontFamily: fonts.Re,
                        fontSize: 15,
                        fontWeight: "700",
                      }}
                    >
                      {route.title}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    paddingVertical: getHeight(2),
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
    flex: 1, // Allow the title to take up remaining space
    fontSize: getFontSize(3.2),
    fontFamily: fonts.Re,
    color: colors.white,
    marginLeft: getWidth(2),
    marginRight: getWidth(8),
    textAlign: "center",
  },
  Btntext: {
    width: 95,
    height: 16,
    fontFamily: "Ubuntu",
    fontSize: 14,
    fontWeight: "700",
    fontStyle: "normal",
    lineHeight: 14,
    textAlign: "center",
    color: "black",
  },
  AnotherText: {
    width: 81,
    height: 16,
    fontFamily: fonts.URe,
    fontSize: 14,

    lineHeight: 14,
    textAlign: "center",
    color: "blue",
  },
  tabContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    color: "blue",
  },
  tabBar: {
    backgroundColor: "black",
    margin: 14, // Customize tab bar background color
  },
  indicator: {
    backgroundColor: "blue", // Customize tab indicator color
  },
  label: {
    fontWeight: "blue",
    fontSize: 14,
  },
});

export default Workouts;
