import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";
import {
  getFontSize,
  getHeight,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fonts } from "../../../constants/fonts";
import LinearGradient from "react-native-linear-gradient";
import { CalBurnIcon, TimeIcon, VolumeIcon } from "../../../assets/images";

export default function WorkoutComplete({ navigation }) {
  const onPressBack = () => navigation.goBack();

  const onPressNext = () => navigation.navigate("Home");

  const onPressLearning = () => navigation.navigate("LearningCenter");

  const RenderDesc = ({ title, value, Icon }) => (
    <View style={styles.descContainerTSYle}>
      <Icon height={getWidth(7)} width={getWidth(7)} />
      <Text style={styles.descTitleSTyle}>{value}</Text>
      <Text style={styles.descTextSTyle}>{title}</Text>
    </View>
  );

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={colors.white}
        translucent={true}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <ImageBackground
          style={styles.imageSTyle}
          source={require("../../../assets/images/home1.png")}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: getWidth(4),
              paddingVertical: getHeight(2),
            }}
          >
            <TouchableOpacity
              onPress={onPressBack}
              style={styles.headerBtnStyle}
            >
              <Ionicons
                name="chevron-back"
                size={getFontSize(2.5)}
                color={colors.slateGray}
              />
            </TouchableOpacity>
            <Text style={styles.titleSTyle}>Lesson Complete</Text>
            <TouchableOpacity
              onPress={onPressLearning}
              style={styles.headerBtnStyle}
            >
              <Ionicons
                name="settings-outline"
                size={getFontSize(2.5)}
                color={colors.slateGray}
              />
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={["#00000000", "#ffffff30", "#ffffff", "#ffffff"]}
            style={styles.linearContainer}
          >
            <Text style={styles.workoutTextSTyle}>Workout Complete</Text>
            <Text style={styles.descSTyle}>You burned 254 Cal</Text>
            <View style={styles.rowContainerStyle}>
              <RenderDesc title="Minute" value="30m" Icon={TimeIcon} />
              <RenderDesc title="Cal" value="254" Icon={CalBurnIcon} />
              <RenderDesc title="Volume" value="14,000" Icon={VolumeIcon} />
            </View>
            <TouchableOpacity onPress={onPressNext} style={styles.nextBtnStyle}>
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
          </LinearGradient>
        </ImageBackground>
      </SafeAreaView>
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
    backgroundColor: colors.paleGray,
    borderRadius: 16,
  },
  headerTextStyles: {
    color: colors.black,
    fontSize: getFontSize(5.5),
    fontFamily: fonts.WB,
    paddingHorizontal: getWidth(5),
    textAlign: "center",
  },
  titleSTyle: {
    color: colors.white,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WB,
    textAlign: "center",
  },
  descSTyle: {
    color: colors.darkGray1,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WMe,
    textAlign: "center",
    marginBottom: getHeight(1),
  },
  workoutTextSTyle: {
    color: colors.black,
    fontSize: getFontSize(4),
    fontFamily: fonts.WB,
    textAlign: "center",
    marginVertical: getHeight(1),
  },
  imageSTyle: {
    height: "100%",
    justifyContent: "space-between",
  },
  linearContainer: {
    height: "85%",
    justifyContent: "flex-end",
    paddingHorizontal: getWidth(4),
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
  descContainerTSYle: {
    alignItems: "center",
    justifyContent: "center",
    gap: getHeight(1),
  },
  rowContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: getHeight(2),
  },
  descTitleSTyle: {
    color: colors.darkGray,
    fontSize: getFontSize(2.7),
    fontFamily: fonts.WB,
  },
  descTextSTyle: {
    color: colors.darkGray1,
    fontSize: getFontSize(2.2),
    fontFamily: fonts.WMe,
  },
});
