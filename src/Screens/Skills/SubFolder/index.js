import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors } from "../../../constants/colors";
import { GernalStyle } from "../../../constants/GernalStyle";
import { styles } from "./styles";
import GeneralStatusBar from "../../../Components/GeneralStatusBar";
import Entypo from "react-native-vector-icons/Entypo";
import { SearchSvg } from "../../../assets/images";
import Seprator from "../../../Components/Seprator";
import {
  getWidth,
  getHeight,
  getFontSize,
} from "../../../../utils/ResponsiveFun";
import { useNavigation } from "@react-navigation/native";
import HeaderBottom from "../../../Components/HeaderBottom";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";

const SubFolder = ({ route }) => {
  const navigation = useNavigation();
  const { folder, foldername } = route?.params;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [invalidEntry, setInvalidEntry] = useState(false);


  useEffect(() => {
    const filtered = folder.filter((item) =>
      item.folder_title.toUpperCase().includes(searchQuery.toUpperCase())
    );
    setFilteredData(filtered);

    if (filtered.length === 0 && searchQuery) {
      setInvalidEntry(true);
    } else {
      setInvalidEntry(false);
    }
  }, [searchQuery, folder]);

  const handleRefresh = () => {
    //dispatch(setLoader(true));
    folder;
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
        title={foldername}
        LeftIcon={
          <Ionicons
            size={25}
            color={"white"}
            onPress={() => navigation.goBack()}
            name="arrow-back"
          />
        }
        RightIcon={<View style={{ marginRight: getFontSize(3) }} />}
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
          {invalidEntry || folder.length === 0 ? (
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
              renderItem={({ item, index }) => {
                return (
                  <View>
                    {index > 0 && <Seprator />}
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate("FolderVideo", {
                          childFolderVideos: item?.videos,
                          childFolderName: item?.folder_title,
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
                            {item?.folder_Image && item?.folder_Image != "" ? (
                              <View>
                                <Image
                                  source={{ uri: item?.folder_Image }}
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
                                {item.folder_title}
                              </Text>
                              <Text
                                style={styles.descriptionText}
                                numberOfLines={2}
                              >
                                {item?.folder_description}
                              </Text>
                            </View>
                            <Text style={{ color: colors.white }}>
                              {item?.videos.length} video
                              {item?.videos.length !== 1 ? "s" : "  "}
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

export default SubFolder;
