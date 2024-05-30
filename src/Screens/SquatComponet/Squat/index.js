import {
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  getFontSize,
  getHeight,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Squat({ navigation }) {
  const onPressBack = () => {
    navigation.goBack();
  };

  const onPressReset = () => navigation.navigate("ResetTimer");

  const RenderSquare = ({ title, desc, icon }) => {
    return (
      <View style={styles.innerContainer}>
        <Image source={icon} style={styles.iconStyle} />
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.descStyle}>{desc}</Text>
      </View>
    );
  };

  const RenderCategory = ({ no, lbs, isSuccess = true, isBottom = true }) => {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.outerContainer}>
          <View style={styles.numberContainer}>
            <Text style={styles.numberTextSTyle}>{no}</Text>
          </View>
          <View
            style={{
              gap: getWidth(1.5),
            }}
          >
            <Text style={styles.titleStyle}>{lbs}</Text>
            <Text style={styles.descStyle}>
              {lbs}
              {" Reps"}
            </Text>
          </View>
          <View style={styles.semiDividerSTyle} />
          <View style={styles.rowSTyle}>
            <View style={styles.rowDividerStyle} />
            <Text style={styles.lbsTextSTyle}>lbs</Text>
          </View>
          <View style={styles.dividerStyle} />
          <Ionicons
            name="checkmark-circle"
            size={getFontSize(5)}
            color={!isSuccess ? colors.axisColor : colors.orange}
            style={{ marginRight: getWidth(5) }}
          />
        </View>
        {isBottom && (
          <View style={styles.bottomStyle}>
            <View style={styles.bottomDividerSTyle}></View>
            <View style={styles.itemContainer}>
              <View style={styles.dotContainer} />
              <Text style={styles.itemTextStyle}>1 min rest</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <Ionicons
              name="play"
              size={getFontSize(3.5)}
              color={colors.white}
            />
          </TouchableOpacity>
          <Text style={styles.statsFontStyle}>Squat</Text>
          <View />
        </ImageBackground>
        <View style={styles.categoryContainer}>
          <RenderSquare
            title="3x5"
            desc="Reps"
            icon={require("../../../assets/images/squatsIcon3.png")}
          />
          <View style={styles.dividerStyle} />
          <RenderSquare
            title="1.2.3.1"
            desc="Tempo"
            icon={require("../../../assets/images/squatsIcon2.png")}
          />
          <View style={styles.dividerStyle} />
          <RenderSquare
            title="85%"
            desc="Max"
            icon={require("../../../assets/images/squatsIcon1.png")}
          />
          <View style={styles.dividerStyle} />
          <RenderSquare
            title="10"
            desc="RPE"
            icon={require("../../../assets/images/squatsIcon1.png")}
          />
          <View style={styles.dividerStyle} />
          <RenderSquare
            title="2"
            desc="RIR"
            icon={require("../../../assets/images/squatsIcon1.png")}
          />
          <View style={styles.dividerStyle} />
        </View>
        <View style={styles.rowContainerSTyle}>
          <View style={styles.rowDividerSTyle} />
          <Text style={styles.workingSetSTyle}>3 WORKING SETS</Text>
          <View style={styles.rowDividerSTyle} />
        </View>
        <RenderCategory no={1} lbs="100" isSuccess={true} />
        <RenderCategory no={2} lbs="100" isSuccess={false} />
        <RenderCategory no={3} lbs="100" isSuccess={false} isBottom={false} />
        <TouchableOpacity style={styles.addButtonContainer}>
          <Text style={styles.addTitleStyle}>+ Add Set</Text>
        </TouchableOpacity>
        <View style={styles.bottomBtnStyle}>
          <TouchableOpacity onPress={onPressBack} style={styles.rightContainer}>
            <Ionicons
              name="arrow-back-outline"
              size={getFontSize(3)}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressReset} style={styles.leftContainer}>
            <Text style={styles.nextExerciseStyle}>Next Exercise</Text>
            <Ionicons
              name="arrow-forward-outline"
              size={getFontSize(3)}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    fontSize: getFontSize(5),
    fontFamily: fonts.WB,
    textAlign: "center",
    marginTop: getHeight(1.5),
  },
  imageStyle: {
    borderBottomLeftRadius: getWidth(14),
    borderBottomRightRadius: getWidth(14),
  },
  playBtnStyle: {
    backgroundColor: colors.orange,
    padding: getWidth(2.5),
    borderRadius: 16,
    alignSelf: "center",
    marginTop: getHeight(7),
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: getWidth(5),
    paddingVertical: getHeight(3),
    gap: getWidth(5),
  },
  iconStyle: {
    width: getWidth(7),
    height: getWidth(7),
  },
  titleStyle: {
    color: colors.black,
    fontSize: getFontSize(2.6),
    fontFamily: fonts.WB,
    textAlign: "center",
  },
  descStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
    textAlign: "center",
  },
  innerContainer: {
    gap: getWidth(2),
    alignItems: "center",
  },
  dividerStyle: {
    height: "100%",
    width: getHeight(0.1),
    backgroundColor: colors.rulesColor,
  },
  workingSetSTyle: {
    color: colors.slateGray,
    fontSize: getFontSize(2.7),
    fontFamily: fonts.WMe,
    textAlign: "center",
    paddingHorizontal: getWidth(3),
  },
  rowDividerSTyle: {
    height: getHeight(0.1),
    width: "20%",
    backgroundColor: colors.rulesColor,
  },
  rowContainerSTyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: getWidth(5),
    paddingBottom: getHeight(3),
  },
  outerContainer: {
    backgroundColor: colors.paleGray,
    borderRadius: getWidth(8),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    alignSelf: "center",
  },
  numberContainer: {
    backgroundColor: colors.rulesColor,
    paddingVertical: getWidth(8),
    paddingHorizontal: getWidth(5.5),
    borderTopLeftRadius: getWidth(8),
    borderBottomLeftRadius: getWidth(8),
    alignItems: "center",
    justifyContent: "center",
  },
  numberTextSTyle: {
    color: colors.black,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WMe,
  },
  lbsTextSTyle: {
    color: colors.slateGray,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WMe,
  },
  semiDividerSTyle: {
    height: "50%",
    width: getHeight(0.1),
    backgroundColor: colors.rulesColor,
  },
  rowDividerStyle: {
    height: getHeight(0.1),
    width: getWidth(20),
    backgroundColor: colors.axisColor,
    marginBottom: getHeight(1),
  },
  rowSTyle: {
    alignItems: "center",
    justifyContent: "center",
  },
  bottomDividerSTyle: {
    height: getHeight(10),
    width: getWidth(0.5),
    backgroundColor: colors.rulesColor,
    justifyContent: "center",
  },
  mainContainer: {
    marginHorizontal: getWidth(5),
  },
  bottomStyle: {
    left: getWidth(7),
    ms: "center",
    justifyContent: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    top: getHeight(4),
    left: getWidth(-2),
    position: "absolute",
  },
  dotContainer: {
    height: getWidth(4),
    width: getWidth(4),
    borderRadius: getWidth(2),
    backgroundColor: colors.orange,
  },
  itemTextStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WMe,
    marginLeft: getWidth(2),
  },
  addButtonContainer: {
    padding: getWidth(4),
    marginHorizontal: getWidth(5),
    borderRadius: getWidth(8),
    justifyContent: "center",
    alignItems: "center",
    marginVertical: getHeight(3),
    borderWidth: 1,
    borderColor: colors.grayText2,
    borderStyle: "dashed",
  },
  addTitleStyle: {
    color: colors.grayText2,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WMe,
  },
  bottomBtnStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: getWidth(5),
    marginBottom: getHeight(2),
  },
  rightContainer: {
    paddingVertical: getWidth(4),
    width: "20%",
    borderRadius: getWidth(6),
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.black,
  },
  leftContainer: {
    width: "75%",
    paddingVertical: getWidth(4),
    borderRadius: getWidth(6),
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.orange,
  },
  nextExerciseStyle: {
    color: colors.white,
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
    marginRight: getWidth(2),
  },
});
