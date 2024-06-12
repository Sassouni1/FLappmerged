import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import CountDown from "react-native-countdown-component";
import Ionicons from "react-native-vector-icons/Ionicons";
import { colors } from "../../../constants/colors";
import {
  getFontSize,
  getHeight,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import { fonts } from "../../../constants/fonts";

export default function ResetTimer({ navigation }) {
  const [counterId, setCounterId] = useState("1");
  const onPressBack = () => navigation.goBack();

  const onPressNext = () => navigation.navigate("WorkoutComplete");

  const onFinishTimer = () => navigation.goBack();

  return (
    <View style={styles.root}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={colors.white}
        translucent={true}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: getWidth(4),
            paddingVertical: getHeight(2),
          }}
        >
          <TouchableOpacity onPress={onPressBack} style={styles.headerBtnStyle}>
            <Ionicons
              name="chevron-back"
              size={getFontSize(2.5)}
              color={colors.white}
            />
          </TouchableOpacity>
          <Text style={styles.titleSTyle}>Rest Timer</Text>
          <TouchableOpacity style={styles.headerBtnStyle}>
            <Ionicons
              name="settings-outline"
              size={getFontSize(2.5)}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          <View>
            <CountDown
              id={counterId}
              until={6}
              onFinish={onFinishTimer}
              digitStyle={styles.digitStyle}
              digitTxtStyle={styles.headerTextStyles}
              timeToShow={["H", "M", "S"]}
              separatorStyle={styles.headerTextStyles}
              showSeparator
              timeLabels={{
                d: null,
                h: null,
                m: null,
                s: null,
              }}
            />
            <Text style={styles.beginSTyle}>Rest</Text>
          </View>
          <TouchableOpacity onPress={onFinishTimer} style={styles.nextBtnStyle}>
            <Text style={styles.backBtnTextStyle}>Skip</Text>
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
    backgroundColor: colors.gray1,
    borderRadius: 16,
  },
  headerTextStyles: {
    color: colors.black,
    fontSize: getFontSize(4),
    fontFamily: fonts.WB,
    // paddingHorizontal: getWidth(1),
    textAlign: "center",
  },
  titleSTyle: {
    color: colors.black,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WB,
  },
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  beginSTyle: {
    color: colors.darkGray1,
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
  digitStyle: {
    height: getHeight(6),
    width: getWidth(12),
    alignItems: "center",
    justifyContent: "center",
  },
});
