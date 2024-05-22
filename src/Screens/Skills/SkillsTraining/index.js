import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

// Local Imports
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import { getFontSize, getHeight, getWidth } from "../../../../utils/ResponsiveFun";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";
import CKeyBoardAvoidWrapper from "../../../Components/Common/CKeyBoardAvoidWrapper";

export default function SkillsTraining({ navigation }) {
  const [selectedTab, setSelectedTab] = useState(0);

  const onPressTab = (id) => {
    if (id == 1) {
      navigation.navigate("TrainingStats");
    }
    setSelectedTab(id);
  };

  const onPressSearch = () => navigation.navigate("SearchWorkout");

  const onPressDetail = () => navigation.navigate("CoachDetail");

  const onPressAchievement = () => {
    navigation.navigate("Achievements");
  };

  const RenderTab = ({ title, id }) => {
    return (
      <TouchableOpacity
        onPress={() => onPressTab(id)}
        style={[
          styles.tabContainerStyle,
          {
            backgroundColor: selectedTab !== id ? colors.darkGray : colors.white,
          },
        ]}
      >
        <Text
          style={[
            styles.topTabTextStyle,
            {
              color: selectedTab !== id ? colors.white : colors.darkGray,
            },
          ]}
        >
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={onPressDetail} style={styles.container1Style}>
        <View style={styles.rowContainer}>
          <Image source={require("../../../assets/images/home1.png")} style={styles.imageSTyle} />
          <View style={{ gap: getHeight(1), flex: 1 }}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTextStyle}>Category</Text>
            </View>
            <Text style={styles.titleSTyle} numberOfLines={1}>
              Category
            </Text>
            <View style={styles.descRowContainer}>
              <View style={styles.rowContainer}>
                <Entypo name="star" size={getFontSize(2)} color={colors.orange} />
                <Text numberOfLines={1} style={styles.lessonTextStyle}>
                  37 lessons
                </Text>
              </View>
              <Text style={styles.lessonTextStyle}>•</Text>
              <View style={styles.rowContainer}>
                <Ionicons name="person" size={getFontSize(2)} color={colors.darkBlue} />
                <Text numberOfLines={1} style={styles.lessonTextStyle}>
                  5 Coaches
                </Text>
              </View>
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="chevron-forward-outline" size={getFontSize(4)} color={colors.slateGray} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const RenderPopularSkills = () => {
    return (
      <View style={styles.container1Style}>
        <Image source={require("../../../assets/images/home1.png")} style={styles.imageSTyle} />
        <View style={{ flex: 1, gap: getHeight(1.5) }}>
          <Text style={styles.titleSTyle} numberOfLines={1}>
            Category
          </Text>
          <View style={styles.outerProgressStyle}>
            <View style={styles.innerProgressStyle} />
          </View>
          <View style={[styles.descRowContainer, { flex: 0 }]}>
            <View style={styles.rowContainer}>
              <Ionicons name="document-text" size={getFontSize(2)} color={colors.slateGray} />
              <Text numberOfLines={1} style={styles.lessonTextStyle}>
                Movement 4
              </Text>
            </View>
            <Text style={styles.lessonTextStyle}>•</Text>
            <View style={styles.rowContainer}>
              <Ionicons name="person" size={getFontSize(2)} color={colors.darkBlue} />
              <Text numberOfLines={1} style={styles.lessonTextStyle}>
                5 Coaches
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.topContainer}>
        <GeneralStatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={colors.darkGray}
          translucent={true}
        />
        <View>
          <Text style={styles.headerTextStyles}>Skills Training</Text>
        </View>
        <View style={styles.topTabContainer}>
          <RenderTab title="Skill Learning" id={0} />
          <RenderTab title="Skill Workouts" id={1} />
        </View>
        <TouchableOpacity onPress={onPressSearch} style={styles.searchContainerStyle}>
          <Text style={styles.searchInputStyle}>Search Full Database</Text>
          <Entypo name="magnifying-glass" size={getFontSize(3)} color={colors.white} />
        </TouchableOpacity>
      </View>
      <CKeyBoardAvoidWrapper>
        <TouchableOpacity onPress={onPressAchievement}>
          <Text style={styles.achievementsStyle}>Achievements</Text>
        </TouchableOpacity>
        <FlatList
          data={[1, 2, 3]}
          renderItem={RenderItem}
          keyExtractor={(item) => item.toString()}
          scrollEnabled={false}
        />

        <View style={styles.subHeaderStyle}>
          <Text style={styles.titleSTyle}>Popular Skills</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllTextStyle}>See All</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={[1, 2, 3, 4, 5]}
          renderItem={RenderPopularSkills}
          keyExtractor={(item) => item.toString()}
          scrollEnabled={false}
        />
      </CKeyBoardAvoidWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topContainer: {
    backgroundColor: colors.darkGray,
    paddingBottom: getWidth(6),
    borderBottomLeftRadius: getWidth(10),
    borderBottomRightRadius: getWidth(10),
  },
  headerTextStyles: {
    color: colors.white,
    fontSize: getFontSize(3.5),
    fontFamily: fonts.WB,
    paddingLeft: getWidth(5),
  },
  topTabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: getWidth(6),
    marginVertical: getWidth(3),
  },
  tabContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    height: getFontSize(6),
    width: "49%",
    borderRadius: 14,
  },
  topTabTextStyle: {
    color: colors.black,
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
  },
  searchInputStyle: {
    paddingRight: getWidth(5),
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
    color: colors.white,
  },
  searchContainerStyle: {
    borderWidth: 1,
    borderColor: colors.orange,
    backgroundColor: colors.darkGray,
    borderRadius: 16,
    marginHorizontal: getWidth(8),
    paddingHorizontal: getWidth(5),
    paddingVertical: getHeight(1.3),
    marginTop: getWidth(3),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  container1Style: {
    backgroundColor: colors.paleGray,
    marginVertical: getWidth(3),
    marginHorizontal: getWidth(5),
    borderRadius: 32,
    padding: getWidth(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  imageSTyle: {
    width: getWidth(26),
    height: getWidth(26),
    borderRadius: getWidth(4),
    marginRight: getWidth(2),
  },
  categoryContainer: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 14,
    padding: getWidth(2),
    marginTop: getWidth(2),
    alignSelf: "flex-start",
  },
  categoryTextStyle: {
    color: colors.black,
    fontSize: getFontSize(1.7),
    fontFamily: fonts.WMe,
    textTransform: "uppercase",
  },
  titleSTyle: {
    color: colors.black,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WB,
  },
  lessonTextStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(1.8),
    fontFamily: fonts.WMe,
    marginLeft: getWidth(0.8),
  },
  descRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: getWidth(2),
    flex: 1,
  },
  subHeaderStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: getWidth(5),
    marginVertical: getWidth(2),
  },
  viewAllTextStyle: {
    color: colors.orange,
    fontSize: getFontSize(1.7),
    fontFamily: fonts.WMe,
  },
  outerProgressStyle: {
    backgroundColor: colors.gray1,
    height: getWidth(2),
    width: "100%",
  },
  innerProgressStyle: {
    backgroundColor: colors.darkGray1,
    height: getWidth(2),
    width: "70%",
  },
  achievementsStyle: {
    color: colors.orange,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WB,
    marginLeft: getWidth(5),
    marginTop: getWidth(3),
  },
});
