import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";

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

export default function CoachDetail({ navigation, route }) {
  const { selectedSkill, selectedCoach } = route?.params;

  const onPressDetail = (selectedVideo) =>
    navigation.navigate("WorkoutDetail", { selectedVideo: selectedVideo });
  const onPressPlay = () => navigation.navigate("LessonComplete");
  const onPressStart = () => {};
  const onPressBack = () => navigation.goBack();

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          onPressDetail(item);
        }}
        style={styles.container1Style}
      >
        <View style={[styles.rowContainer, { flex: 1 }]}>
          <Image
            source={{ uri: item?.video_thumbnail }}
            style={styles.imageSTyle}
          />
          <View
            style={{
              gap: getHeight(1.5),
              flex: 1,
            }}
          >
            <Text style={styles.titleSTyle}>{item?.title}</Text>
            <View style={styles.rowContainer}>
              <MaterialIcons
                name="watch-later"
                size={getFontSize(2)}
                color={colors.graytext4}
              />
              <Text numberOfLines={1} style={styles.timeTextStyle}>
                05:30
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={onPressPlay} style={styles.playBtnStyle}>
          <Ionicons name="play" size={getFontSize(3.5)} color={colors.white} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <CKeyBoardAvoidWrapper containerStyle={{ flexGrow: 1 }}>
        <View style={styles.root}>
          <ImageBackground
            source={{ uri: selectedCoach?.folder_Image }}
            style={styles.topContainer}
            resizeMode="cover"
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: getWidth(4),
                marginTop: getHeight(1),
              }}
            >
              <TouchableOpacity
                onPress={onPressBack}
                style={styles.headerBtnStyle}
              >
                <Ionicons
                  name="chevron-back"
                  size={getFontSize(2.5)}
                  color={colors.white}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.categoryTitleContainer}>
              <Text style={styles.cTextStyle}>
                {selectedSkill?.parent_title}
              </Text>
            </View>
            <Text style={styles.headerTextStyles}>
              {selectedCoach?.folder_title}
            </Text>
            <Text style={styles.beginSTyle}>Let’s Begin</Text>
          </ImageBackground>
          <View style={styles.bottomContainer}>
            <Text style={styles.descTextStyle}></Text>
            <View style={styles.subHeaderStyle}>
              <Text style={styles.subHeaderTestStyle}>Lessons</Text>
            </View>
            <FlatList
              data={selectedCoach?.videos}
              renderItem={RenderItem}
              keyExtractor={(item) => item._id.toString()}
              scrollEnabled={false}
            />
            <TouchableOpacity
              onPress={onPressStart}
              style={styles.nextBtnStyle}
            >
              <Text style={styles.backBtnTextStyle}>Start Lesson</Text>
              <Ionicons
                name="alarm"
                size={getFontSize(2.7)}
                style={{
                  marginLeft: getWidth(2),
                }}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
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
    height: getHeight(45), // Adjust this value as needed to control the size of the image background
    backgroundColor: colors.darkGray,
    borderBottomLeftRadius: getWidth(10),
    borderBottomRightRadius: getWidth(10),
    marginBottom: getWidth(3),
    paddingTop: getHeight(8), // Ensure padding to account for status bar overlap
  },
  headerBtnStyle: {
    padding: getWidth(2),
    backgroundColor: colors.slateGray,
    borderRadius: 12,
  },
  headerTextStyles: {
    color: colors.white,
    fontSize: getFontSize(3.5),
    fontFamily: fonts.WB,
    paddingHorizontal: getWidth(5),
    marginTop: getHeight(1),
    textAlign: "center",
  },
  beginSTyle: {
    color: colors.paleGray,
    marginTop: getHeight(1),
    fontSize: getFontSize(2.3),
    fontFamily: fonts.WMe,
    textAlign: "center",
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
  subHeaderStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: getWidth(5),
    marginVertical: getWidth(2),
    marginTop: getWidth(3),
  },
  bottomContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    top: -getWidth(10),
    paddingTop: getWidth(10),
    borderTopLeftRadius: getWidth(10),
    borderTopRightRadius: getWidth(10),
  },
  subHeaderTestStyle: {
    color: colors.black,
    fontSize: getFontSize(2),
    fontFamily: fonts.WB,
  },
  playBtnStyle: {
    backgroundColor: colors.orange,
    padding: getWidth(2.5),
    borderRadius: 16,
  },
  categoryTitleContainer: {
    borderColor: colors.white,
    borderWidth: 1,
    borderRadius: 14,
    padding: getWidth(2),
    marginTop: getWidth(20),
    alignSelf: "center",
  },
  cTextStyle: {
    color: colors.white,
    fontSize: getFontSize(1.8),
    fontFamily: fonts.WMe,
    textTransform: "uppercase",
  },
  descTextStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(1.8),
    fontFamily: fonts.WMe,
    marginHorizontal: getWidth(5),
    marginBottom: getWidth(-4),
    textAlign: "center",
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
