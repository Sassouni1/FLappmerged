import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useRef, useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Father from "react-native-vector-icons/Feather";

// Local Imports
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import { getFontSize, getHeight, getWidth } from "../../../../utils/ResponsiveFun";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";
import CKeyBoardAvoidWrapper from "../../../Components/Common/CKeyBoardAvoidWrapper";
import FilterWorkout from "./FilterWorkout";

export default function SearchWorkout({ navigation }) {
  const [search, setSearch] = useState("");
  const filterSheetRef = useRef();

  const onChangeSearch = (text) => setSearch(text);

  const onPressCoach = () => navigation.navigate("SearchCoach");

  const onPressBack = () => navigation.goBack();

  const onPressFilter = () => filterSheetRef.current?.show();

  const onPressDetail = () => navigation.navigate("WorkoutDetail");

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={onPressDetail} style={styles.container1Style}>
        <View style={[styles.rowContainer, { flex: 1 }]}>
          <Image source={require("../../../assets/images/home1.png")} style={styles.imageSTyle} />
          <View
            style={{
              gap: getHeight(1.5),
              flex: 1,
            }}
          >
            <Text numberOfLines={1} style={styles.lessonTextStyle}>
              Foundations
            </Text>
            <Text style={styles.titleSTyle} numberOfLines={1}>
              Category
            </Text>
            <View style={styles.rowContainer}>
              <MaterialIcons name="watch-later" size={getFontSize(2)} color={colors.graytext4} />
              <Text numberOfLines={1} style={styles.timeTextStyle}>
                05:30
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.playBtnStyle}>
          <Ionicons name="play" size={getFontSize(3.5)} color={colors.white} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.root}>
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <GeneralStatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor={colors.darkGray}
            translucent={true}
          />
          <TouchableOpacity onPress={onPressBack} style={{ paddingHorizontal: getWidth(4) }}>
            <Ionicons name="chevron-back" size={getFontSize(4)} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTextStyles}>Search Workout</Text>
          <View style={styles.searchContainerStyle}>
            <TextInput
              style={styles.searchInputStyle}
              placeholder="Search Full Database"
              placeholderTextColor={colors.white}
              value={search}
              onChangeText={onChangeSearch}
            />
            <Entypo name="magnifying-glass" size={getFontSize(3)} color={colors.white} />
          </View>
        </View>
        <CKeyBoardAvoidWrapper>
          <View style={styles.subHeaderStyle}>
            <Text style={styles.subHeaderTestStyle}>Filter By</Text>
            <TouchableOpacity onPress={onPressFilter} style={styles.popularityStyle}>
              <Father name="bar-chart-2" size={getFontSize(3)} color={colors.gray1} />
              <Text style={styles.viewAllTextStyle}>Popularity</Text>
              <Ionicons name="chevron-down" size={getFontSize(3)} color={colors.gray1} />
            </TouchableOpacity>
          </View>
          <FlatList
            data={[1, 2, 3]}
            renderItem={RenderItem}
            keyExtractor={(item) => item.toString()}
            scrollEnabled={false}
          />
        </CKeyBoardAvoidWrapper>
      </View>
      <TouchableOpacity onPress={onPressCoach} style={styles.coachBtnStyle}>
        <Text style={styles.backBtnTextStyle}>Choose Your Coach</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressBack} style={styles.goBackBtnStyle}>
        <Text style={styles.backBtnTextStyle}>No, Go Back</Text>
      </TouchableOpacity>
      <FilterWorkout SheetRef={filterSheetRef} />
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
    marginTop: getHeight(1),
  },
  searchInputStyle: {
    height: getFontSize(6),
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
    justifyContent: "flex-start",
    alignItems: "center",
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
  titleSTyle: {
    color: colors.black,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WB,
  },
  lessonTextStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(1.8),
    fontFamily: fonts.WMe,
  },
  timeTextStyle: {
    color: colors.black,
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
    marginTop: getWidth(3),
  },
  viewAllTextStyle: {
    color: colors.darkGray1,
    fontSize: getFontSize(1.7),
    fontFamily: fonts.WMe,
  },
  subHeaderTestStyle: {
    color: colors.black,
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
  },
  popularityStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: getWidth(1),
  },
  goBackBtnStyle: {
    backgroundColor: colors.black,
    paddingVertical: getWidth(4),
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 19,
    width: "90%",
    marginVertical: getWidth(5),
  },
  coachBtnStyle: {
    backgroundColor: colors.black,
    paddingVertical: getWidth(4),
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 19,
    width: "90%",
    marginTop: getWidth(5),
  },
  backBtnTextStyle: {
    color: colors.white,
    fontSize: getFontSize(2.2),
    fontFamily: fonts.WMe,
  },
  playBtnStyle: {
    backgroundColor: colors.orange,
    padding: getWidth(2.5),
    borderRadius: 16,
  },
});
