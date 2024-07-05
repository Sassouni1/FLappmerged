import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { GernalStyle } from "../../constants/GernalStyle";
import { styles } from "./styles";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import Entypo from "react-native-vector-icons/Entypo";
import { SearchSvg } from "../../assets/images";
import Seprator from "../../Components/Seprator";
import { getWidth, getHeight, getFontSize } from "../../../utils/ResponsiveFun";
import { useNavigation } from "@react-navigation/native";
import { setLoader } from "../../Redux/actions/GernalActions";
import { useDispatch, useSelector } from "react-redux";
import { ApiCall } from "../../Services/Apis";
import HeaderBottom from "../../Components/HeaderBottom";
import AntDesign from "react-native-vector-icons/AntDesign";

const Skills = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [invalidEntry, setInvalidEntry] = useState(false);

  // search fun
  useEffect(() => {
    const filtered = data.filter((item) => {
      const title = item.parent_title || "";
      return (
        title.toUpperCase().includes(searchQuery.toUpperCase()) ||
        title.trim() === ""
      );
    });
    setFilteredData(filtered);

    if (filtered.length === 0 && searchQuery) {
      setInvalidEntry(true);
    } else {
      setInvalidEntry(false);
    }
  }, [searchQuery, data]);

  // api function

  const getSkills = async () => {
    try {
      const res = await ApiCall({
        params: { category_name: "skill " },
        route: "exercise/skill_video",
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        setData(res?.response?.category_list);
        setFilteredData(res?.response?.category_list);
        dispatch(setLoader(false));
      } else {
        console.log("error", res.response);
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
  };

  useEffect(() => {
    handleRefresh(); // Call handleRefresh to load data initially
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "rgba(51, 51, 51, 1)" }}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(51, 51, 51, 1)"
        translucent={true}
      />
      <HeaderBottom
        title={"Skills"}
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
          borderRadius: 5,
          alignSelf: "center",
        }}
      >
        <SearchSvg height={20} width={20} style={{ marginLeft: getWidth(6) }} />
        <TextInput
          placeholder="Search a skill"
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
      <View style={{ flex: 1, backgroundColor: "rgba(51, 51, 51, 1)" }}>
        <View style={{ flex: 1 }}>
          {invalidEntry || filteredData.length === 0 ? (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                bottom: getFontSize(9),
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
                No videos on Skills found.
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredData}
              refreshing={false}
              onRefresh={handleRefresh}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: getHeight(10) }} // Ensure some padding at the bottom
              renderItem={({ item, index }) => {
                return (
                  <View>
                    {index > 0 && <Seprator />}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("SubFolder", {
                          folder: item?.child_folder,
                          foldername: item?.parent_title,
                        })
                      }
                      style={styles.listCon}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View style={{ flex: 1 }}>
                          <View
                            style={{
                              flexDirection: "row",
                              alignItems: "center",
                              justifyContent: "space-between",
                            }}
                          >
                            {item?.parent_Image && item?.parent_Image != "" ? (
                              <View>
                                <Image
                                  source={{ uri: item?.parent_Image }}
                                  style={styles.thumbnail}
                                  resizeMode="cover"
                                ></Image>
                              </View>
                            ) : (
                              <Entypo
                                size={45}
                                color={"white"}
                                name="folder"
                                style={{
                                  justifyContent: "center",
                                  marginLeft: getFontSize(1.5),
                                  marginRight: getFontSize(1.5),
                                  alignItems: "center",
                                }}
                              />
                            )}
                            <View style={{ flexDirection: "column", flex: 1 }}>
                              <Text style={styles.text}>
                                {item.parent_title}
                              </Text>
                              <Text
                                style={styles.descriptionText}
                                numberOfLines={2}
                              >
                                {item?.parent_description}
                              </Text>
                            </View>
                            <Text style={{ color: colors.white }}>
                              {item?.child_folder.length} folder
                              {item?.child_folder.length !== 1 ? "s" : "  "}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
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

export default Skills;
