import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import VideoPlayer from "react-native-video-player";

// Local Imports
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import {
  getFontSize,
  getHeight,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";
import CKeyBoardAvoidWrapper from "../../../Components/Common/CKeyBoardAvoidWrapper";

export default function WorkoutDetail({ navigation,route }) {
  const {selectedVideo} = route?.params;

  const onPressBack = () => navigation.goBack();
  const { height, width } = Dimensions.get("window");

  return (
    <View style={styles.root}>
      <View style={styles.topContainer}>
        <GeneralStatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor={colors.darkGray}
          translucent={true}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingHorizontal: getWidth(4) }}
        >
          <Ionicons
            name="chevron-back"
            size={getFontSize(4)}
            color={colors.white}
          />
        </TouchableOpacity>
        <Text style={styles.headerTextStyles}>{selectedVideo?.title}</Text>
      </View>
      <CKeyBoardAvoidWrapper contentContainerStyle={styles.topSTyle}>
        <Text style={styles.subHeaderTestStyle}>Description</Text>
        <Text style={styles.descTextStyle}>
        {selectedVideo?.description}
        </Text>
        <Text style={styles.subHeaderTestStyle}>Video</Text>
        <View style={styles.videoStyle}>
          <VideoPlayer
            video={{uri:selectedVideo?.video}}
            videoWidth={width - getWidth(10)}
            videoHeight={getHeight(25)}
            thumbnail={{ uri: selectedVideo?.video_thumbnail }}
            showDuration={true}
          />
        </View>
        {/* <Text style={styles.subHeaderTestStyle}>Notes:</Text>
        <Text style={styles.descTextStyle}>
          Embrace the morning sun and revitalize your body and mind with our
          'Morning Boost' routine. This energizing workout is designed to
          kickstart your metabolism, increase your energy levels, and set a
          positive tone for the day ahead.
        </Text> */}
        <TouchableOpacity onPress={onPressBack} style={styles.nextBtnStyle}>
          <Text style={styles.backBtnTextStyle}>Next Lesson</Text>
          <Ionicons
            name="arrow-forward"
            size={getFontSize(2.7)}
            style={{
              marginLeft: getWidth(2),
            }}
            color={colors.white}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressBack} style={styles.goBackBtnStyle}>
          <Text style={styles.backBtnTextStyle}>No, Go Back</Text>
        </TouchableOpacity>
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
    marginBottom: getWidth(8),
    borderBottomLeftRadius: getWidth(10),
    borderBottomRightRadius: getWidth(10),
  },
  headerTextStyles: {
    color: colors.white,
    fontSize: getFontSize(3.5),
    fontFamily: fonts.UBo,
    paddingLeft: getWidth(5),
    marginVertical: getHeight(2.5),
  },
  subHeaderTestStyle: {
    color: colors.black,
    fontSize: getFontSize(2),
    fontFamily: fonts.UBo,
    marginHorizontal: getWidth(5),
    marginVertical: getWidth(2),
    marginTop: getWidth(3),
  },
  descTextStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(1.8),
    fontFamily: fonts.URe,
    marginHorizontal: getWidth(5),
    marginBottom: getWidth(2),
  },
  goBackBtnStyle: {
    backgroundColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 19,
    width: "90%",
    height: getHeight(6),
    marginVertical: getWidth(5),
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
    marginTop: getWidth(5),
  },
  backBtnTextStyle: {
    color: colors.white,
    fontSize: getFontSize(2.2),
    fontFamily: fonts.UMe,
  },
  videoStyle: {
    width: "90%",
    height: getHeight(25),
    alignSelf: "center",
    borderRadius: getWidth(6),
  },
  topSTyle: {
    paddingBottom: getHeight(10),
  },
});
