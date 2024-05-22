import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import ActionSheet from "react-native-actions-sheet";
import { Dropdown } from "react-native-element-dropdown";
import Feather from "react-native-vector-icons/Feather";
import Ionicons from "react-native-vector-icons/Ionicons";

// Local Imports
import { colors } from "../../../constants/colors";
import { getFontSize, getHeight, getWidth } from "../../../../utils/ResponsiveFun";
import { fonts } from "../../../constants/fonts";

const RenderSportContainer = ({ image, id, sportType, onPressType }) => {
  return (
    <TouchableOpacity
      onPress={() => onPressType(id)}
      style={[
        styles.sportContainerStyle,
        {
          backgroundColor: sportType === id ? colors.darkGray : colors.paleGray,
        },
      ]}
    >
      <Image
        source={image}
        style={[
          styles.imageSTyle,
          {
            tintColor: sportType !== id ? colors.slateGray : colors.white,
          },
        ]}
      />
    </TouchableOpacity>
  );
};

export default function FilterWorkout({ SheetRef }) {
  const [value, setValue] = React.useState("");
  const [sportType, setSportType] = React.useState(1);

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  const onPressSportType = (id) => setSportType(id);

  const onPressClose = () => SheetRef.current?.hide();

  return (
    <ActionSheet ref={SheetRef} gestureEnabled={true} containerStyle={styles.root}>
      <View style={styles.container}>
        <Text style={styles.titleSTyle}>Filter Workout</Text>
        <Text style={styles.subHeaderTestStyle}>Filter By</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          iconColor={colors.black}
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={"Most Popular"}
          value={value}
          onChange={(item) => {
            setValue(item.value);
          }}
          renderLeftIcon={() => (
            <Feather style={styles.icon} color={colors.black} name="bar-chart-2" size={getFontSize(3)} />
          )}
        />
        <Text style={styles.descTextStyle}>251 results found for “Cardio workout”</Text>
        <Text style={styles.sportTypeStyle}>Sport Type</Text>
        <View style={styles.selectContainer}>
          <RenderSportContainer
            image={require("../../../assets/images/searchWorkoutFilter1.png")}
            id={1}
            sportType={sportType}
            onPressType={onPressSportType}
          />
          <RenderSportContainer
            image={require("../../../assets/images/searchWorkoutFilter2.png")}
            id={2}
            sportType={sportType}
            onPressType={onPressSportType}
          />
          <RenderSportContainer
            image={require("../../../assets/images/searchWorkoutFilter3.png")}
            id={3}
            sportType={sportType}
            onPressType={onPressSportType}
          />
          <RenderSportContainer
            image={require("../../../assets/images/searchWorkoutFilter4.png")}
            id={4}
            sportType={sportType}
            onPressType={onPressSportType}
          />
        </View>
        <TouchableOpacity onPress={onPressClose} style={styles.goBackBtnStyle}>
          <Text style={styles.backBtnTextStyle}>Apply Filter (24)</Text>
          <Ionicons
            name="options"
            size={getFontSize(3)}
            style={{
              transform: [{ rotate: "90deg" }],
              marginLeft: getWidth(2),
            }}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  container: {
    backgroundColor: "#fff",
    padding: getWidth(6),
  },
  titleSTyle: {
    color: colors.black,
    fontSize: getFontSize(3),
    fontFamily: fonts.WB,
    alignSelf: "center",
    marginBottom: getHeight(3),
  },
  subHeaderTestStyle: {
    color: colors.black,
    fontSize: getFontSize(2.3),
    fontFamily: fonts.WB,
  },
  dropdown: {
    height: getHeight(6),
    borderColor: "gray",
    borderRadius: 16,
    paddingHorizontal: getWidth(3),
    backgroundColor: colors.paleGray,
    marginTop: getHeight(1),
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: getFontSize(2),
    color: colors.black,
    fontFamily: fonts.WMe,
  },
  selectedTextStyle: {
    fontSize: getFontSize(2),
    color: colors.black,
    fontFamily: fonts.WMe,
  },
  iconStyle: {
    width: getWidth(5),
    height: getHeight(3.5),
  },
  descTextStyle: {
    color: colors.graytext4,
    fontSize: getFontSize(1.8),
    fontFamily: fonts.WMe,
    marginTop: getHeight(1),
  },
  sportTypeStyle: {
    color: colors.black,
    fontSize: getFontSize(2.3),
    fontFamily: fonts.WMe,
    marginTop: getHeight(3),
  },
  selectContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: getHeight(1),
  },
  imageSTyle: {
    width: getWidth(6),
    height: getHeight(4),
  },
  sportContainerStyle: {
    borderRadius: 19,
    width: "24%",
    alignItems: "center",
    paddingVertical: getHeight(2.5),
  },
  goBackBtnStyle: {
    backgroundColor: colors.black,
    paddingVertical: getWidth(4),
    alignItems: "center",
    borderRadius: 19,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginVertical: getWidth(15),
  },
  backBtnTextStyle: {
    color: colors.white,
    fontSize: getFontSize(2.2),
    fontFamily: fonts.WMe,
  },
});
