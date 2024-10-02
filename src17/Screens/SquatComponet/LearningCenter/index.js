import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import VideoPlayer from "react-native-video-player";

import {
  getFontSize,
  getHeight,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";
import { LearningIcon } from "../../../assets/images";
import CKeyBoardAvoidWrapper from "../../../Components/Common/CKeyBoardAvoidWrapper";

export default function LearningCenter({ navigation }) {
  const onPressBack = () => navigation.goBack();
  const { height, width } = Dimensions.get("window");

  const RenderItem = ({ title }) => {
    return (
      <View>
        <Text style={styles.subHeaderTestStyle}>{title}</Text>
        <Text style={styles.descTextStyle}>
          Embrace the morning sun and revitalize your body and mind with our
          'Morning Boost' routine. This energizing workout is designed to
          kickstart your metabolism, increase your energy levels, and set a
          positive tone for the day ahead.
        </Text>
        <View style={styles.videoStyle}>
          <VideoPlayer
            video={require("../../../assets/images/background.mp4")}
            videoWidth={width - getWidth(10)}
            videoHeight={getHeight(25)}
            thumbnail={require("../../../assets/images/home1.png")}
            showDuration={true}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <CKeyBoardAvoidWrapper contentContainerStyle={styles.topSTyle}>
        <ImageBackground
          source={require("../../../assets/images/home1.png")}
          style={styles.imageBgStyle}
          imageStyle={styles.imageStyle}
        >
          <TouchableOpacity onPress={onPressBack} style={styles.headerBtnStyle}>
            <Ionicons
              name="chevron-back"
              size={getFontSize(2.5)}
              color={colors.black}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.playBtnStyle}>
            <LearningIcon height={getWidth(6)} width={getWidth(6)} />
            <Text style={styles.learningTextSTyle}>Learning Center</Text>
          </TouchableOpacity>
          <Text style={styles.statsFontStyle}>Using Fight Life</Text>
          <View />
        </ImageBackground>
        <RenderItem title="Welcome to Fight Life" />
        <RenderItem title="How to Use App" />
        <RenderItem title="Meet Your Strength Coach" />
        <RenderItem title="Meet Your Strength Coach" />
      </CKeyBoardAvoidWrapper>
      <TouchableOpacity onPress={onPressBack} style={styles.goBackBtnStyle}>
        <Text style={styles.backBtnTextStyle}>No, Go Back</Text>
        <Ionicons
          name="checkmark"
          size={getFontSize(2.7)}
          style={{
            marginLeft: getWidth(2),
          }}
          color={colors.white}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageBgStyle: {
    height: getHeight(33),
    padding: getWidth(8),
    paddingHorizontal: getWidth(4),
  },
  headerBtnStyle: {
    padding: getWidth(2.5),
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  statsFontStyle: {
    color: colors.white,
    fontSize: getFontSize(4),
    fontFamily: fonts.WB,
    textAlign: "center",
    marginTop: getHeight(1.5),
  },
  imageStyle: {
    borderBottomLeftRadius: getWidth(14),
    borderBottomRightRadius: getWidth(14),
  },
  playBtnStyle: {
    padding: getWidth(2.5),
    borderRadius: 16,
    alignSelf: "center",
    marginTop: getHeight(7),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.white,
    borderWidth: 1,
  },
  learningTextSTyle: {
    color: colors.white,
    fontSize: getFontSize(1.8),
    fontFamily: fonts.WB,
    textAlign: "center",
    marginLeft: getWidth(2),
    textTransform: "uppercase",
  },
  subHeaderTestStyle: {
    color: colors.black,
    fontSize: getFontSize(2),
    fontFamily: fonts.UBo,
    marginHorizontal: getWidth(5),
    marginVertical: getWidth(2),
    marginTop: getWidth(3.5),
  },
  descTextStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(1.8),
    fontFamily: fonts.URe,
    marginHorizontal: getWidth(5),
    marginBottom: getWidth(3),
  },
  videoStyle: {
    width: "90%",
    height: getHeight(25),
    alignSelf: "center",
    borderRadius: getWidth(6),
  },
  topSTyle: {
    paddingBottom: getHeight(3),
  },
  goBackBtnStyle: {
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 19,
    width: "90%",
    height: getHeight(6),
    marginVertical: getWidth(5),
  },
  backBtnTextStyle: {
    color: colors.white,
    fontSize: getFontSize(2.2),
    fontFamily: fonts.UMe,
  },
});
