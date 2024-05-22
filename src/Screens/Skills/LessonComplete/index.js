import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

// Local Imports
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import { getFontSize, getHeight, getWidth } from "../../../../utils/ResponsiveFun";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";

export default function LessonComplete({ navigation }) {
  const onPressBack = () => navigation.goBack();

  return (
    <View style={styles.root}>
      <GeneralStatusBar barStyle="dark-content" hidden={false} backgroundColor={colors.white} translucent={true} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: getWidth(4),
        }}
      >
        <TouchableOpacity onPress={onPressBack} style={styles.headerBtnStyle}>
          <Ionicons name="chevron-back" size={getFontSize(2.5)} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.titleSTyle}>Lesson Complete</Text>
        <TouchableOpacity style={styles.headerBtnStyle}>
          <Ionicons name="settings-outline" size={getFontSize(2.5)} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.headerTextStyles}>Lessons Complete</Text>
        <Text style={styles.beginSTyle}>#coach Name </Text>
        <TouchableOpacity onPress={onPressBack} style={styles.nextBtnStyle}>
          <Text style={styles.backBtnTextStyle}>Complete</Text>
          <Ionicons
            name="checkmark"
            size={getFontSize(2.7)}
            style={{
              marginLeft: getWidth(2),
            }}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  headerBtnStyle: {
    padding: getWidth(2.5),
    backgroundColor: colors.gray1,
    borderRadius: 16,
  },
  headerTextStyles: {
    color: colors.black,
    fontSize: getFontSize(3.5),
    fontFamily: fonts.WB,
    paddingHorizontal: getWidth(5),
    marginTop: getHeight(1),
    textAlign: "center",
  },
  beginSTyle: {
    color: colors.black,
    marginTop: getHeight(1),
    fontSize: getFontSize(2.3),
    fontFamily: fonts.WMe,
    textAlign: "center",
  },
  titleSTyle: {
    color: colors.black,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WB,
  },
  nextBtnStyle: {
    backgroundColor: colors.orange,
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 19,
    height: getHeight(6),
    width: "90%",
    marginVertical: getWidth(5),
  },
  backBtnTextStyle: {
    color: colors.white,
    fontSize: getFontSize(2.2),
    fontFamily: fonts.WMe,
  },
});
