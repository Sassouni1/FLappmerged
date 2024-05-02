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
import { SearchSvg, PlayerSvg } from "../../../assets/images";
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

const FolderVideo = ({ route }) => {
  const navigation = useNavigation();
  const { childFolderVideos, childFolderName } = route?.params;

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [invalidEntry, setInvalidEntry] = useState(false);

  useEffect(() => {
    const filtered = childFolderVideos.filter((item) =>
      item.title.toUpperCase().includes(searchQuery.toUpperCase())
    );
    setFilteredData(filtered);
    // Check if there are no matching results
    if (filtered.length === 0 && searchQuery) {
      setInvalidEntry(true);
    } else {
      setInvalidEntry(false);
    }
  }, [searchQuery, childFolderVideos]);

  const handleRefresh = () => {
    //dispatch(setLoader(true));
    childFolderVideos;
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
        title={childFolderName}
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
          {invalidEntry || childFolderVideos.length === 0 ? (
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
                        navigation.navigate("videoScreen", {
                          video: item?.video,
                          name: item?.title,
                        })
                      }
                      style={styles.listCon}
                    >
                      {item?.video_thumbnail ? (
                        <View>
                          <Image
                            source={{ uri: item?.video_thumbnail }}
                            style={styles.thumbnail}
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
      </View>
    </View>
  );
};

export default FolderVideo;
