import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { GernalStyle } from "../../constants/GernalStyle";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import { PlayerSvg, SearchSvg } from "../../assets/images";
import { getHeight, getWidth, getFontSize } from "../../../utils/ResponsiveFun";
import { styles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../Redux/actions/GernalActions";
import { ApiCall } from "../../Services/Apis";
import HeaderBottom from "../../Components/HeaderBottom";
import AntDesign from "react-native-vector-icons/AntDesign";
import SelectDropdown from "react-native-select-dropdown";

const Excercises = () => {
  const navigation = useNavigation();

  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [invalidEntry, setInvalidEntry] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);

  const [allTypes, setAllTypes] = useState([
    "All Exercises",
    "Abs",
    "Back",
    "Biceps",
    "Calves",
    "Chest",
    "Forearms",
  ]);

  const toggleTypeSelection = (selectedType) => {
    setSelectedTypes([selectedType]);
  };

  // Function to filter videos based on selected types
  const filterVideosBySelectedTypes = () => {
    if (selectedTypes.length === 0) {
      setFilteredData(data);
    } else {
      if (selectedTypes.includes("All Exercises")) {
        setFilteredData(data);
      } else {
        const filtered = data.filter((item) =>
          selectedTypes.includes(item.type)
        );
        setFilteredData(filtered);
      }
    }
  };

  useEffect(() => {
    filterVideosBySelectedTypes();
  }, [selectedTypes]);

  useEffect(() => {
    const filtered = data.filter((item) => {
      const title = item.title || "";
      return (
        title.toUpperCase().includes(searchQuery.toUpperCase()) ||
        title.trim() === ""
      );
    });
    setFilteredData(filtered);
    setIsRefreshing(true);
    if (filtered.length === 0 && searchQuery) {
      setInvalidEntry(true);
    } else {
      setInvalidEntry(false);
    }
  }, [searchQuery, data]);

  const getSkills = async () => {
    try {
      const res = await ApiCall({
        params: { category_name: "skill" },
        route: "exercise/exercise_video",
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        console.log("res of exercise video", res?.response);
        setData(res?.response?.video_list);
        setFilteredData(res?.response?.video_list);
        dispatch(setLoader(false));
      } else {
        console.log("error", res?.response);
        dispatch(setLoader(false));

        alert(res?.response?.message, [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      }
    } catch (e) {
      console.log("api get skill error -- ", e.toString());
    }
  };
  const handleRefresh = () => {
    dispatch(setLoader(true));
    getSkills();
    setIsRefreshing(true);
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  const handleSelection = () => {
    if (isRefreshing) {
      setIsRefreshing(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(51, 51, 51, 1)" }}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(51, 51, 51, 1)"
        translucent={true}
      />
      <HeaderBottom
        title={"Exercise"}
        LeftIcon={
          <Entypo
            size={30}
            color={"white"}
            onPress={() => navigation.openDrawer()}
            name="menu"
            style={{
              alignSelf: "flex-start",
            }}
          />
        }
        RightIcon={<View style={{ marginRight: getFontSize(4) }} />}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: getWidth(95),
          height: getHeight(7),
          marginVertical: getHeight(1),
          marginTop: getHeight(2.5),
          backgroundColor: colors.secondary,
          borderRadius: getFontSize(0.6),
          alignSelf: "center",
        }}
      >
        <SearchSvg height={20} width={20} style={{ marginLeft: getWidth(6) }} />
        <TextInput
          placeholder="Search an exercise"
          placeholderTextColor={colors.graytext4}
          style={{
            ...GernalStyle.textinput,
            marginTop: getHeight(0),
            paddingLeft: getWidth(2),
            width: getWidth(75),
            fontWeight: "600",
          }}
          onChangeText={(text) => {
            setSearchQuery(text);
          }}
          value={searchQuery}
        />
      </View>

      <View>
        <Text
          style={{
            fontSize: getFontSize(2),
            color: colors.white,
            marginLeft: getFontSize(1.3),
            marginTop: getFontSize(2),
            fontFamily: "Ubuntu",
          }}
        >
          Exercise Type
        </Text>
        <SelectDropdown
          defaultValue={isRefreshing ? "All Exercises" : undefined}
          data={allTypes}
          onSelect={(selectedType) => {
            toggleTypeSelection(selectedType), handleSelection();
          }}
          defaultButtonText="Select Exercise Type"
          buttonTextAfterSelection={(selectedItem, index) => {
            return (
              <Text
                style={{
                  color: "white",
                  fontSize: getFontSize(2),
                  textAlign: "left",
                }}
              >
                {isRefreshing ? "All Exercises" : selectedItem}
              </Text>
            );
          }}
          buttonStyle={{
            width: getWidth(95),
            height: getHeight(7),
            marginVertical: getHeight(1),
            backgroundColor: colors.secondary,
            borderRadius: getFontSize(0.6),
            alignSelf: "center",
            justifyContent: "center",
          }}
          buttonTextStyle={{
            color: "white",
            fontSize: getFontSize(2),
            fontFamily: "Ubuntu",
          }}
          renderDropdownIcon={(isOpened) => {
            return (
              <Entypo
                name={isOpened ? "chevron-thin-up" : "chevron-thin-down"}
                color={"#fff"}
                size={getFontSize(2)}
              />
            );
          }}
          dropdownIconPosition={"right"}
          showsVerticalScrollIndicator={false}
          dropdownStyle={{
            backgroundColor: colors.secondary,
            height: getHeight(30),
          }}
          rowStyle={{
            backgroundColor: colors.secondary,
            borderBottomColor: "rgba(0, 0, 0, 0.1)",
          }}
          selectedRowTextStyle={{
            color: colors.buttonColor,
          }}
          rowTextStyle={{
            color: "white",
            fontSize: getFontSize(2),
            textAlign: "left",
            paddingLeft: getFontSize(1),
            fontFamily: "Ubuntu-bold",
          }}
        />
      </View>
      <View style={{ flex: 1, backgroundColor: "rgba(51, 51, 51, 1)" }}>
        <View style={{ flex: 1, marginTop: getFontSize(2) }}>
          {invalidEntry || filteredData.length === 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: getHeight(40),
              }}
            >
              <AntDesign
                size={getFontSize(8)}
                color={"white"}
                name="exclamationcircleo"
              />
              <Text
                style={{
                  fontSize: getFontSize(2),
                  color: colors.white,
                  marginLeft: getFontSize(5),
                  marginRight: getFontSize(5),
                  textAlign: "center",
                  marginTop: getHeight(1),
                }}
              >
                No videos on Exercise found.
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredData}
              refreshing={false}
              onRefresh={handleRefresh}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <View
                      style={{
                        backgroundColor: colors.secondary1,
                        width: getWidth(95),
                        borderRadius: getFontSize(0.6),
                        marginBottom: getFontSize(2),
                        height: getHeight(7),
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("VideoSkills", {
                            video: item?.video,
                            name: item?.title,
                          })
                        }
                        style={styles.listCon}
                      >
                        {item?.video_thumbnail ? (
                          <View
                            style={{
                              ...Platform.select({
                                ios: {
                                  shadowColor: "black",
                                  shadowOffset: { width: 10, height: 1 },
                                  shadowOpacity: 0.4,
                                  shadowRadius: 5,
                                },
                                android: {
                                  elevation: 4,
                                },
                              }),
                            }}
                          >
                            <Image
                              source={{ uri: item?.video_thumbnail }}
                              style={{ ...styles.thumbnail }}
                              resizeMode="cover"
                            ></Image>
                          </View>
                        ) : (
                          <View style={styles.thumbnail}>
                            <PlayerSvg height={20} width={20} />
                          </View>
                        )}
                        <View style={{ flexDirection: "column" }}>
                          <Text style={styles.text}>{item?.title}</Text>

                          <Text
                            style={styles.descriptionText}
                            numberOfLines={2}
                          >
                            {item?.description}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default Excercises;
