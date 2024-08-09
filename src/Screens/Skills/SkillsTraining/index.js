import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState,useEffect } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ApiCall } from "../../../Services/Apis";
import {useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../Redux/actions/GernalActions";

// Local Imports
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import {
  getFontSize,
  getHeight,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";

export default function SkillsTraining({ navigation }) {
  const [selectedTab, setSelectedTab] = useState(0);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.userToken);
  const [skills,setSkills] = useState();

  const onPressTab = (id) => {
    if (id === 1) {
      navigation.navigate("TrainingStats");
    }
    setSelectedTab(id);
  };

  useEffect(() => {
    getSkills();
  }, []);

  const getSkills = async () => {
    try {
      const res = await ApiCall({
        route: `skillVideo/active_skill_videos`,
        verb: "get",
        token: token,
      });
      console.log("list",res?.response?.video_list[0].child_folder[0]);
      if (res?.response) {
        setSkills(res?.response?.video_list);
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
      }
    } catch (e) {
      console.log("api get skill errorrrr -- ", e.toString());
    }
  };

  const getLessonsCount = (dataArray) => {
    let totalVideos = 0;
    if (dataArray) {
      totalVideos = dataArray.reduce((total, item) => {
        return total + item?.videos?.length;
      }, 0);
    }

    return totalVideos;
  }

  const onPressSearch = () => navigation.navigate("SearchWorkout");

  const onPressDetail = (selectedSkill,selectedCoach) => {
    navigation.navigate("CoachDetail",{selectedSkill:selectedSkill,selectedCoach:selectedCoach})
  };
  const onPressCategory = () => navigation.navigate("Squat");

  const RenderHeader = () => (
    <View style={styles.topContainer}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        translucent={false}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require("../../../assets/images/Monotone3chevron3left.png")}
          style={{
            tintColor: colors.white,
            height: 30,
            width: 30,
            marginLeft: 31,
            marginTop: -2,
          }}
        />
      </TouchableOpacity>
      <View style={{ marginTop: 10 }}>
        <Text style={styles.headerTextStyles}>Skills Training</Text>
      </View>
    </View>
  );

  const RenderSkillItem = ({ item }) => (
    item?.child_folder?.map((childItem, index) => (
      <TouchableOpacity key={index} onPress={()=>{onPressDetail(item,childItem)}} style={styles.container1Style}>
      <View style={styles.rowContainer}>
        <Image
          source={{uri:childItem?.folder_Image}}
          style={styles.imageSTyle}
        />
        <View style={{ gap: getHeight(1), flex: 1 }}>
          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTextStyle}>{item?.parent_title}</Text>
          </View>
          <Text style={styles.titleSTyle} numberOfLines={1}>
            {childItem?.folder_title}
          </Text>
          <View style={styles.descRowContainer}>
            <View style={styles.rowContainer}>
              <Entypo name="star" size={getFontSize(2)} color={colors.orange} />
              <Text numberOfLines={1} style={styles.lessonTextStyle}>
                {getLessonsCount(item?.child_folder)+ " lessons"}
              </Text>
            </View>
            <Text style={styles.lessonTextStyle}>•</Text>
            <View style={styles.rowContainer}>
              <Ionicons
                name="person"
                size={getFontSize(2)}
                color={colors.darkBlue}
              />
              <Text numberOfLines={1} style={styles.lessonTextStyle}>
                 {item?.child_folder?.length+ " Coaches"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity>
        <Ionicons
          name="chevron-forward-outline"
          size={getFontSize(4)}
          color={colors.slateGray}
        />
      </TouchableOpacity>
    </TouchableOpacity>
    ))
  );

  const RenderPopularSkillItem = ({ item }) => (
    <TouchableOpacity onPress={onPressCategory} style={styles.container1Style}>
      <Image
        source={require("../../../assets/images/home1.png")}
        style={styles.imageSTyle}
      />
      <View style={{ flex: 1, gap: getHeight(1.5) }}>
        <Text style={styles.titleSTyle} numberOfLines={1}>
          Category
        </Text>
        <View style={styles.outerProgressStyle}>
          <View style={styles.innerProgressStyle} />
        </View>
        <View style={[styles.descRowContainer, { flex: 0 }]}>
          <View style={styles.rowContainer}>
            <Ionicons
              name="document-text"
              size={getFontSize(2)}
              color={colors.slateGray}
            />
            <Text numberOfLines={1} style={styles.lessonTextStyle}>
              Movement 4
            </Text>
          </View>
          <Text style={styles.lessonTextStyle}>•</Text>
          <View style={styles.rowContainer}>
            <Ionicons
              name="person"
              size={getFontSize(2)}
              color={colors.darkBlue}
            />
            <Text numberOfLines={1} style={styles.lessonTextStyle}>
              5 Coaches
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    return <RenderSkillItem item={item} />;

    if (item.type === "skill") {
      return <RenderSkillItem item={item} />;
    } else if (item.type === "popularSkill") {
      return <RenderPopularSkillItem item={item} />;
    } else if (item.type === "popularHeader") {
      return (
        <View style={styles.subHeaderStyle}>
          <Text style={styles.titleSTyle}>Popular Skills</Text>
          <TouchableOpacity>
            <Text style={styles.viewAllTextStyle}>See All</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const data = [
    { id: "s1", type: "skill" },
    { id: "s2", type: "skill" },
    { id: "s3", type: "skill" },
    { id: "ph", type: "popularHeader" },
    { id: "ps1", type: "popularSkill" },
    { id: "ps2", type: "popularSkill" },
    { id: "ps3", type: "popularSkill" },
    { id: "ps4", type: "popularSkill" },
    { id: "ps5", type: "popularSkill" },
  ];

  return (
    <View style={styles.root}>
      {RenderHeader()}
      <FlatList
        data={skills}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingBottom: getHeight(4) }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  topContainer: {
    backgroundColor: colors.black,
    paddingTop: getWidth(1),
    paddingBottom: getWidth(10),
    borderBottomLeftRadius: getWidth(8),
    borderBottomRightRadius: getWidth(8),
  },
  headerTextStyles: {
    color: colors.white,
    fontSize: getFontSize(3.8),
    fontFamily: fonts.WB,
    paddingLeft: getWidth(3.5),
    marginTop: 10,
    marginLeft: 5,
    fontWeight: "800",
  },
  topTabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: getWidth(6),
    marginVertical: getWidth(3),
  },
  tabContainerStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    height: getFontSize(6),
    width: "49%",
    borderRadius: 14,
  },
  topTabTextStyle: {
    color: colors.black,
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
  },
  searchInputStyle: {
    paddingRight: getWidth(5),
    fontSize: getFontSize(2),
    fontFamily: fonts.WMe,
    color: colors.white,
  },
  searchContainerStyle: {
    borderWidth: 1,
    borderColor: colors.orange,
    backgroundColor: colors.darkGray,
    borderRadius: 16,
    marginHorizontal: getWidth(8),
    paddingHorizontal: getWidth(5),
    paddingVertical: getHeight(1.3),
    marginTop: getWidth(3),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  imageSTyle: {
    width: getWidth(26),
    height: getWidth(26),
    borderRadius: getWidth(4),
    marginRight: getWidth(2),
  },
  categoryContainer: {
    borderColor: colors.black,
    borderWidth: 1,
    borderRadius: 14,
    padding: getWidth(2),
    marginTop: getWidth(2),
    alignSelf: "flex-start",
  },
  categoryTextStyle: {
    color: colors.black,
    fontSize: getFontSize(1.7),
    fontFamily: fonts.WMe,
    textTransform: "uppercase",
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
    marginLeft: getWidth(0.8),
  },
  descRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: getWidth(2),
    flex: 1,
  },
  subHeaderStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: getWidth(5),
    marginVertical: getWidth(2),
  },
  viewAllTextStyle: {
    color: colors.orange,
    fontSize: getFontSize(1.7),
    fontFamily: fonts.WMe,
  },
  outerProgressStyle: {
    backgroundColor: colors.gray1,
    height: getWidth(2),
    width: "100%",
  },
  innerProgressStyle: {
    backgroundColor: colors.darkGray1,
    height: getWidth(2),
    width: "70%",
  },
});
