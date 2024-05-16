import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";

// Local Imports
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import { getFontSize, getHeight, getWidth } from "../../../../utils/ResponsiveFun";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";
import CKeyBoardAvoidWrapper from "../../../Components/Common/CKeyBoardAvoidWrapper";

export default function SearchCoach({ navigation }) {
  const [search, setSearch] = useState("");

  const onChangeSearch = (text) => setSearch(text);

  const onPressBack = () => navigation.goBack();

  const onPressDetail = () => navigation.navigate("CoachDetail");

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
                  12 lessons
                </Text>
              </View>
              <Text style={styles.lessonTextStyle}>•</Text>
              <View style={styles.rowContainer}>
                <Ionicons name="person" size={getFontSize(2)} color={colors.darkBlue} />
                <Text numberOfLines={1} style={styles.lessonTextStyle}>
                  3 Coaches
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
          <Text style={styles.subHeaderTestStyle}>Choose Your Coach</Text>
          <Text style={styles.viewAllTextStyle}>Ready to learn? ️</Text>
          <FlatList
            data={[1, 2, 3]}
            renderItem={RenderItem}
            keyExtractor={(item) => item.toString()}
            scrollEnabled={false}
          />
        </CKeyBoardAvoidWrapper>
      </View>
      <TouchableOpacity onPress={onPressBack} style={styles.goBackBtnStyle}>
        <Text style={styles.backBtnTextStyle}>No, Go Back</Text>
      </TouchableOpacity>
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
    fontFamily: fonts.UBo,
    paddingLeft: getWidth(5),
    marginTop: getHeight(1),
  },
  searchInputStyle: {
    height: getFontSize(6),
    paddingRight: getWidth(5),
    fontSize: getFontSize(2),
    fontFamily: fonts.UMe,
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
    fontFamily: fonts.UMe,
    textTransform: "uppercase",
  },
  titleSTyle: {
    color: colors.black,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.UBo,
  },
  lessonTextStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(1.8),
    fontFamily: fonts.UMe,
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
    fontFamily: fonts.UMe,
    paddingHorizontal: getWidth(5),
    textAlign: "center",
    marginTop: getHeight(1),
  },
  subHeaderTestStyle: {
    color: colors.black,
    fontSize: getFontSize(3.5),
    fontFamily: fonts.UBo,
    marginTop: getHeight(3),
    paddingHorizontal: getWidth(5),
    textAlign: "center",
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
    fontFamily: fonts.UMe,
  },
  playBtnStyle: {
    backgroundColor: colors.orange,
    padding: getWidth(2.5),
    borderRadius: 16,
  },
});
