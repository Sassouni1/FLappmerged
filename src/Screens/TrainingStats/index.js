import { ImageBackground, SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { BarChart, LineChart } from "react-native-gifted-charts";
import Entypo from "react-native-vector-icons/Entypo";
import MultiSLider from "@ptomasroos/react-native-multi-slider";
import { Dropdown } from "react-native-element-dropdown";

//Local Imports
import { colors } from "../../constants/colors";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { fonts } from "../../constants/fonts";
import { Calendar, Heartbeat } from "../../assets/images";

export default function TrainingStats({ navigation }) {
  const [sliderValue, setSliderValue] = React.useState(200);
  const [value, setValue] = React.useState("");

  const onPressBack = () => {
    navigation.goBack();
  };

  const barData = [
    { value: 100, label: "Sun", frontColor: colors.orange20 },
    { value: 100, label: "Mon", frontColor: colors.orange20 },
    { value: 95, label: "Tue", frontColor: colors.orange30 },
    { value: 100, label: "Wed" },
    { value: 50, label: "Thurs", frontColor: colors.orange30 },
    { value: 85, label: "Fri", frontColor: colors.orange30 },
    { value: 45, label: "Sat", frontColor: colors.orange20 },
  ];

  const lineData = [
    { value: 0, label: "Sun" },
    { value: 250, label: "Mon" },
    { value: 120, label: "Tue" },
  ];

  const strengthData = [
    { value: 150, label: "Sun", frontColor: colors.orange20 },
    { value: 100, label: "Mon", frontColor: colors.orange20 },
    { value: 600, label: "Tue", frontColor: colors.orange30 },
    { value: 5500, label: "Wed" },
    { value: 1200, label: "Thurs", frontColor: colors.orange30 },
    { value: 600, label: "Fri", frontColor: colors.orange30 },
    { value: 300, label: "Sat", frontColor: colors.orange20 },
  ];

  const data = [
    { label: "1W", value: "1W" },
    { label: "2W", value: "2W" },
    { label: "3W", value: "3W" },
    { label: "4W", value: "4W" },
  ];

  const trainingSeatsData = [
    {
      title: "Apple Watch Stats",
      data: [
        { title: "Sleep", des: "Time in Bed: 7 Hrs 20 mins " },
        { title: "Steps", des: "40,000 steps" },
      ],
    },
    {
      title: "Personal Records",
      data: [
        { title: "Deadlift Variations", des: "234 lb max: Zercher Squat - 09/30/2012 " },
        { title: "Squat Variation", des: "300 lb max: #Exercise Name - #date" },
      ],
    },
  ];

  const onChangeSlider = (value) => setSliderValue(value);

  const RenderLeftIcon = () => {
    return <Calendar />;
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={[styles.containerStyle, { gap: 10 }]}>
        <Text style={styles.sectionTextStyle}>{item.title}</Text>
        <View style={styles.descriptionStyle}>
          <Heartbeat />
          <Text style={styles.descriptionTextStyle}>{item.des}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderSectionHeader = ({ section: { title } }) => {
    return (
      <View style={[styles.trainingContainerStyle, styles.sectionTitleStyle]}>
        <Text style={styles.sectionTextStyle}>{title}</Text>
        <Entypo name={"dots-three-vertical"} size={getFontSize(2.5)} color={colors.axisColor} />
      </View>
    );
  };

  const CustomMarker = ({ currentValue }) => {
    return (
      <View style={styles.customMarkerStyle}>
        <Text style={styles.sliderTextStyle}>{currentValue}</Text>
      </View>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <View>
        <ImageBackground
          source={require("../../assets/images/home1.png")}
          style={styles.imageBgStyle}
          imageStyle={styles.imageStyle}
        >
          <TouchableOpacity onPress={onPressBack} style={styles.headerBtnStyle}>
            <Ionicons name="chevron-back" size={getFontSize(2.5)} color={colors.black} />
          </TouchableOpacity>
          <Text style={styles.statsFontStyle}>Stats</Text>
          <View />
        </ImageBackground>
        <View style={styles.innerContainerStyle}>
          <View style={styles.trainingContainerStyle}>
            <Text style={styles.trainingFontStyle}>Training Completion</Text>
            <Ionicons name="settings" size={getFontSize(2.5)} color={colors.axisColor} />
          </View>
          <View style={styles.chartOuterContainer}>
            <View style={styles.headerTopContainer}>
              <View style={styles.headerTextStyle}>
                <Text style={styles.percentageStyle}>96%</Text>
                <Text style={styles.completionStyle}>Completion rate</Text>
              </View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                iconColor={colors.black}
                data={data}
                labelField="label"
                valueField="value"
                placeholder={"1W"}
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
                renderLeftIcon={RenderLeftIcon}
              />
            </View>
            <BarChart
              frontColor={colors.orange}
              data={barData}
              maxValue={100}
              dashGap={0}
              spacing={8}
              barBorderRadius={4}
              barWidth={30}
              stepValue={20}
              yAxisThickness={0}
              xAxisColor={colors.rulesColor}
              xAxisLabelTextStyle={{ color: colors.axisColor }}
              yAxisTextStyle={{ color: colors.axisColor }}
            />
          </View>
          <View style={styles.trainingContainerStyle}>
            <Text style={styles.trainingFontStyle}>Calories Burned</Text>
            <Ionicons name="settings" size={getFontSize(2.5)} color={colors.axisColor} />
          </View>
          <View style={styles.chartOuterContainer}>
            <View style={styles.headerTopContainer}>
              <View style={styles.headerTextStyle}>
                <Text style={styles.percentageStyle}>549</Text>
                <Text style={styles.completionStyle}>Calories Burned</Text>
              </View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                iconColor={colors.black}
                data={data}
                labelField="label"
                valueField="value"
                placeholder={"1W"}
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
                renderLeftIcon={RenderLeftIcon}
              />
            </View>
            <LineChart
              areaChart
              curved
              data={lineData}
              width={250}
              spacing={getWidth(15)}
              initialSpacing={5}
              color={colors.orange}
              hideDataPoints
              startFillColor1={colors.orange}
              startOpacity={0.8}
              endOpacity={0.3}
              dashGap={0}
              maxValue={400}
              thickness={2}
              rulesColor={colors.rulesColor}
              yAxisThickness={0}
              xAxisColor={colors.rulesColor}
              xAxisLabelTextStyle={{ color: colors.axisColor }}
              yAxisTextStyle={{ color: colors.axisColor }}
            />
          </View>
          <View style={styles.trainingContainerStyle}>
            <Text style={styles.trainingFontStyle}>Strength Progress</Text>
            <Ionicons name="settings" size={getFontSize(2.5)} color={colors.axisColor} />
          </View>
          <Text style={styles.totalVolumeStyle}>Total Volume: 14,540 lbs lifted</Text>
          <View style={styles.chartOuterContainer}>
            <View style={styles.headerTopContainer}>
              <View style={styles.headerTextStyle}>
                <Text style={styles.percentageStyle}>14,450</Text>
                <Text style={[styles.completionStyle, { fontSize: getWidth(3) }]}>Total lbs lifted</Text>
              </View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                iconColor={colors.black}
                data={data}
                labelField="label"
                valueField="value"
                placeholder={"1W"}
                value={value}
                onChange={(item) => {
                  setValue(item.value);
                }}
                renderLeftIcon={RenderLeftIcon}
              />
            </View>
            <BarChart
              frontColor={colors.orange}
              data={strengthData}
              maxValue={20000}
              dashGap={0}
              spacing={8}
              barBorderRadius={4}
              barWidth={30}
              yAxisThickness={0}
              xAxisColor={colors.rulesColor}
              xAxisLabelTextStyle={{ color: colors.axisColor }}
              yAxisTextStyle={{ color: colors.axisColor }}
            />
          </View>
          <View style={styles.weightContainer}>
            <Text style={styles.bodyTextStyle}>Bodyweight Goal</Text>
            <Text style={styles.lbsTextStyle}>Lbs</Text>
          </View>
          <MultiSLider
            value={sliderValue}
            onValueChange={onChangeSlider}
            trackStyle={styles.sliderStyle}
            customMarker={(e) => <CustomMarker currentValue={e.currentValue} />}
            min={100}
            max={500}
            sliderLength={getWidth(90)}
            markerOffsetY={0}
            step={1}
            selectedStyle={{ backgroundColor: colors.green }}
          />
          <TouchableOpacity>
            <Text style={styles.updateTextStyle}>Update Weight</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.root}>
      <SectionList
        sections={trainingSeatsData}
        renderItem={renderItem}
        renderSectionHeader={RenderSectionHeader}
        ListHeaderComponent={ListHeaderComponent}
        showsVerticalScrollIndicator={false}
        bounces={false}
        keyExtractor={(item, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageBgStyle: {
    height: getHeight(35),
    padding: getWidth(8),
    justifyContent: "space-between",
  },
  headerBtnStyle: {
    padding: getWidth(2),
    backgroundColor: colors.white,
    borderRadius: 12,
    width: getWidth(10),
  },
  statsFontStyle: {
    color: colors.white,
    fontSize: getFontSize(5.5),
    fontFamily: fonts.WB,
    textAlign: "center",
  },
  imageStyle: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  innerContainerStyle: {
    paddingHorizontal: getWidth(5),
    paddingVertical: getWidth(7),
  },
  trainingFontStyle: {
    color: colors.black,
    fontSize: getFontSize(4),
    fontFamily: fonts.WB,
  },
  trainingContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  chartOuterContainer: {
    backgroundColor: colors.paleGray,
    borderRadius: 20,
    paddingVertical: getWidth(3),
    paddingHorizontal: getWidth(5),
    marginBottom: getWidth(4),
  },
  percentageStyle: {
    color: colors.black,
    fontSize: getFontSize(5),
    fontFamily: fonts.WB,
  },
  completionStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(1.7),
    fontFamily: fonts.WB,
  },
  headerTextStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidth(1.5),
  },
  calenderStyle: {
    backgroundColor: colors.white,
    paddingHorizontal: getWidth(3),
    paddingVertical: getWidth(1.5),
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: getWidth(1.5),
  },
  headerTopContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  weekTextStyle: {
    color: colors.slateGray,
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
  },
  totalVolumeStyle: {
    color: colors.black,
    fontSize: getFontSize(2.4),
    fontFamily: fonts.WMe,
    marginBottom: getWidth(1),
  },
  bodyTextStyle: {
    color: colors.black,
    fontSize: getFontSize(2),
    fontFamily: fonts.WB,
  },
  lbsTextStyle: {
    color: colors.grayText1,
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
  },
  weightContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTextStyle: {
    color: colors.black,
    fontSize: getFontSize(2.3),
    fontFamily: fonts.WB,
  },
  containerStyle: {
    backgroundColor: colors.paleGray,
    padding: getWidth(4),
    borderRadius: 32,
    marginBottom: getWidth(3),
    marginHorizontal: getWidth(5),
  },
  descriptionStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: getWidth(2),
  },
  sectionTitleStyle: {
    marginBottom: getWidth(2.5),
    paddingHorizontal: getWidth(5),
    paddingVertical: getWidth(2),
  },
  descriptionTextStyle: {
    color: colors.grayText,
    fontSize: getFontSize(1.7),
    fontFamily: fonts.WMe,
  },
  updateTextStyle: {
    color: colors.orange,
    fontSize: getFontSize(1.7),
    fontFamily: fonts.WMe,
    textAlign: "right",
    marginTop: getWidth(2),
    textDecorationLine: "underline",
  },
  dropdown: {
    height: getHeight(4),
    borderRadius: 16,
    paddingHorizontal: getWidth(3),
    backgroundColor: colors.white,
    width: getWidth(20),
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: getFontSize(1.5),
    color: colors.black,
    fontFamily: fonts.WMe,
    marginLeft: getWidth(1),
  },
  selectedTextStyle: {
    fontSize: getFontSize(1.5),
    color: colors.black,
    fontFamily: fonts.WMe,
    marginLeft: getWidth(1),
  },
  iconStyle: {
    width: getWidth(2),
    height: getHeight(2),
  },
  sliderStyle: {
    height: getHeight(2),
    borderRadius: 40,
    backgroundColor: colors.orange,
  },
  customMarkerStyle: {
    paddingHorizontal: getWidth(2.5),
    height: getHeight(4),
    width: getWidth(12),
    backgroundColor: colors.green,
    borderRadius: 3,
    marginTop: getHeight(2),
    borderWidth: 4,
    borderColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  sliderTextStyle: {
    fontSize: getFontSize(1.3),
    color: colors.white,
    fontFamily: fonts.WB,
  },
});
