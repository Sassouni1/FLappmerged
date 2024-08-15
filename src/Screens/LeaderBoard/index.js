import {
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

//Local imports
import { colors } from "../../constants/colors";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { fonts } from "../../constants/fonts";
import PopupModal from "../../Components/ErrorPopup";
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from "react-redux";

export default function Achievements({ navigation }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const user = useSelector((state) => state.auth.userData);

  useFocusEffect(
    React.useCallback(() => {
      if (user.isAssigned != true)
        setModalVisible(true);
    }, [])
  );
  const toggleModal = () => {
      setModalVisible(!isModalVisible);
  };

  const onPressTab = (id) => {
    setSelectedTab(id);
  };

  const onPressBack = () => {
    navigation.goBack();
  };

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const RenderTab = ({ title, id }) => {
    return (
      <TouchableOpacity
        onPress={() => onPressTab(id)}
        style={[
          styles.buttonStyle,
          {
            backgroundColor: selectedTab !== id ? null : colors.orange,
          },
        ]}
      >
        <Text style={[styles.fontsStyle]}>{title}</Text>
      </TouchableOpacity>
    );
  };

  const RenderItemAchievements = ({ item }) => {
    return (
      <TouchableOpacity style={styles.btnStyle}>
        <Text numberOfLines={1} style={styles.textContainerStyle}>
          Achievements
        </Text>
      </TouchableOpacity>
    );
  };

  const RenderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.container1Style}>
        <View style={styles.rowContainer}>
          <Image
            source={require("../../assets/images/home1.png")}
            style={styles.imageContainerSTyle}
          />
          <View style={{ gap: getHeight(1), flex: 1 }}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categoryTextStyle}>#1</Text>
            </View>
            <Text style={styles.titleSTyle} numberOfLines={1}>
              Aaron Ince
            </Text>
            <Text style={{ color: colors.grayText1 }}>
              43 consecutive Days{" "}
            </Text>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons
            name="chevron-forward-outline"
            size={getFontSize(3)}
            color={colors.slateGray}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  return (
    // <SafeAreaView style={styles.root}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
      <PopupModal isVisible={isModalVisible} toggleModal={toggleModal} />

        <ImageBackground
          source={require("../../assets/images/home1.png")}
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
          <Text style={styles.achievementStyle}>Achievements</Text>
          <View style={styles.topContainerStyle}>
            <RenderTab title="Leader Board" id={0} />
            <RenderTab title="Achievements" id={1} />
          </View>
        </ImageBackground>
        <View style={styles.mainContainer}>
          {selectedTab === 0 ? (
            <View style={styles.mostConsistentUserStyle}>
              <Text style={styles.userFontStyle}>Most Consistent User</Text>
              <FlatList
                data={[1, 2, 3]}
                renderItem={RenderItem}
                keyExtractor={(item) => item.toString()}
                scrollEnabled={false}
              />
              <TouchableOpacity>
                <Text style={styles.seeAllTextStyle}>See All</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              {/* <Text style={styles.sectionTextStyle}>Workouts</Text> */}
              {/* <View style={styles.workoutsStyle}>
                {data.map((item, index) => (
                  <RenderItemAchievements key={index} item={item} />
                ))}
              </View> */}
              {/* <Text style={styles.sectionTextStyle}>Programs</Text>
              <View style={styles.workoutsStyle}>
                {data.map((item, index) => (
                  <RenderItemAchievements key={index} item={item} />
                ))}
              </View> */}
            </View>
          )}
          <View style={styles.mostConsistentUserStyle}>
            <Text style={styles.userFontStyle}>Heaviest Squat</Text>
            <FlatList
              data={[1, 2, 3]}
              renderItem={RenderItem}
              keyExtractor={(item) => item.toString()}
              scrollEnabled={false}
            />
            <TouchableOpacity>
              <Text style={styles.seeAllTextStyle}>See All</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageBgStyle: {
    height: getHeight(30),
    padding: getWidth(6),
    justifyContent: "space-between",
  },
  imageStyle: {
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  headerBtnStyle: {
    padding: getWidth(2),
    backgroundColor: colors.white,
    borderRadius: 12,
    width: getWidth(10),
  },
  achievementStyle: {
    fontSize: getFontSize(4),
    fontFamily: fonts.WB,
    color: colors.white,
  },
  buttonStyle: {
    padding: getWidth(3),
    borderRadius: 14,
    width: getWidth(42),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.orange,
    marginVertical: getHeight(1),
  },
  topContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderRadius: 10,
  },
  fontsStyle: {
    fontSize: getFontSize(2),
    fontFamily: fonts.WB,
    color: colors.white,
  },
  mostConsistentUserStyle: {
    backgroundColor: colors.paleGray,
    padding: getWidth(3),
    borderRadius: 40,
  },
  mainContainer: {
    paddingHorizontal: getWidth(2),
    paddingVertical: getHeight(3),
    gap: getHeight(3),
  },
  userFontStyle: {
    fontSize: getFontSize(2.3),
    fontFamily: fonts.WB,
    color: colors.black,
    textAlign: "center",
    marginVertical: getHeight(1),
  },
  container1Style: {
    backgroundColor: colors.white,
    marginVertical: getWidth(1),
    marginHorizontal: getWidth(3),
    borderRadius: 32,
    padding: getWidth(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  imageContainerSTyle: {
    width: getWidth(26),
    height: getWidth(26),
    borderRadius: getWidth(4),
    marginRight: getWidth(2),
  },
  categoryContainer: {
    borderColor: colors.slateGray,
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: getWidth(0.6),
    paddingHorizontal: getWidth(2.2),
    alignSelf: "flex-start",
  },
  categoryTextStyle: {
    color: colors.black,
    fontSize: getFontSize(1.7),
    fontFamily: fonts.WMe,
  },
  titleSTyle: {
    color: colors.black,
    fontSize: getFontSize(2.5),
    fontFamily: fonts.WB,
  },
  seeAllTextStyle: {
    fontSize: getFontSize(1.7),
    fontFamily: fonts.WMe,
    textAlign: "right",
    marginRight: getWidth(5),
    color: colors.grayText1,
  },
  sectionTextStyle: {
    fontSize: getFontSize(2.3),
    fontFamily: fonts.WB,
    color: colors.black,
    padding: getWidth(2.4),
  },
  workoutsStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: getWidth(1),
    rowGap: getWidth(3),
    marginTop: getHeight(1),
    marginBottom: getHeight(2),
  },
  btnStyle: {
    backgroundColor: colors.orange,
    borderRadius: 32,
    padding: getWidth(1),
    width: "23%",
  },
  textContainerStyle: {
    color: colors.white,
    fontSize: getFontSize(1.5),
    fontFamily: fonts.WB,
  },
});
