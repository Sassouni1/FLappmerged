import {
  View,
  Text,
  TextInput,
  FlatList,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../constants/colors";
import { GernalStyle } from "../../constants/GernalStyle";
import { styles } from "./styles";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
// import AppHeader from '../../Components/AppHeader';
import Entypo from "react-native-vector-icons/Entypo";
import { SearchSvg, PlayerSvg, InvalidSearch } from "../../assets/images";
import Seprator from "../../Components/Seprator";
import { getWidth, getHeight, getFontSize } from "../../../utils/ResponsiveFun";
import { useNavigation } from "@react-navigation/native";
import { setLoader } from "../../Redux/actions/GernalActions";
import { useDispatch, useSelector } from "react-redux";
import { ApiCall } from "../../Services/Apis";
import Header from "../../Components/Header";
import HeaderBottom from "../../Components/HeaderBottom";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Skills = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [invalidEntry, setInvalidEntry] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  //console.log('filtered data',filteredData)

  useEffect(() => {
    dispatch(setLoader(true));
    getSkills();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    getSkills();
    setIsRefreshing(false);
  };

  useEffect(() => {
    const filtered = data.filter((item) =>
      item.title.toUpperCase().includes(searchQuery.toUpperCase())
    );
    setFilteredData(filtered);

    // Check if there are no matching results
    if (filtered.length === 0 && searchQuery) {
      setInvalidEntry(true);
    } else {
      setInvalidEntry(false);
    }
  }, [searchQuery, data]);

  const getSkills = async () => {
    try {
      const res = await ApiCall({
        params: { category_name: "skill " },
        route: "exercise/skill_video",
        verb: "get",
        token: token,
      });
      console.log("skill response", res?.response);
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

  return (
    <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: "rgba(51, 51, 51, 1)" }}>
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
             style={{ alignSelf: "flex-start",
             //marginLeft:getFontSize(-1.5) 
            }}
          />
        }
        RightIcon={<View style={{marginRight:getFontSize(4)}}/>}
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
          placeholder="Search an skill"
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
      <View style={{ flex: 1 }}>
        {invalidEntry ? (
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <FontAwesome size={getFontSize(10)} color={"white"} name="exclamation-circle" />
            <Text
              style={{
                fontSize: getFontSize(2),
                color: colors.white,
                marginLeft: getFontSize(5),
                marginRight: getFontSize(5),
                textAlign: "center",
              }}
            >
              No videos on Skills found.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={handleRefresh}
              />
            }
            showsVerticalScrollIndicator={false}
            renderItem={({ item ,index}) => {
              return (
                <View>
                   {index > 0 && <Seprator />}
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("VideoSkills", {
                        video: item?.video,
                        name: item?.title,
                      })
                    }
                    style={styles.listCon}
                  >
                    <View style={styles.thumbnail}>
                      <PlayerSvg height={20} width={20} />
                    </View>
                    <View style={{ flexDirection: "column" }}>
                      <Text style={styles.text}>
                        {(item?.title).toUpperCase()}
                      </Text>
                      <Text style={styles.descriptionText} numberOfLines={2}>
                        {item?.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
          />
        )}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Skills;
