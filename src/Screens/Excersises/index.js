import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import Entypo from "react-native-vector-icons/Entypo";
import AntDesign from "react-native-vector-icons/AntDesign";
import SelectDropdown from "react-native-select-dropdown";
import { setLoader } from "../../Redux/actions/GernalActions";
import { ApiCall } from "../../Services/Apis";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import { PlayerSvg, SearchSvg } from "../../assets/images";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";

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
    <View style={styles.container}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="black"
        translucent={true}
      />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../../assets/images/Monotone3chevron3left.png")}
            style={{
              tintColor: colors.white,
              height: 30,
              width: 30,
              marginLeft: 15,
              marginTop: -14,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Exercise Database</Text>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search an exercise"
            placeholderTextColor="white"
            style={styles.searchInput}
            onChangeText={(text) => setSearchQuery(text)}
            value={searchQuery}
          />
          <SearchSvg height={20} width={20} style={styles.searchIcon} />
        </View>
        <Text style={styles.searchResultText}>
          251 results found for "{searchQuery}"
        </Text>
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Exercise Type</Text>
        <SelectDropdown
          data={allTypes}
          onSelect={(selectedType) => {
            toggleTypeSelection(selectedType);
            handleSelection();
          }}
          defaultButtonText="All Exercises"
          buttonStyle={styles.dropdownButton}
          buttonTextStyle={styles.dropdownButtonText}
          renderDropdownIcon={(isOpened) => (
            <Entypo
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#676C75"}
              size={18}
            />
          )}
          dropdownIconPosition="right"
          dropdownStyle={styles.dropdownWithBackground} // Update the style here
          rowStyle={styles.dropdownRow}
          rowTextStyle={styles.dropdownRowText}
        />
      </View>
      <View style={styles.listContainer}>
        {invalidEntry || filteredData.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <AntDesign name="exclamationcircleo" size={24} color="#676C75" />
            <Text style={styles.noResultsText}>
              No videos on Exercise found.
            </Text>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            refreshing={false}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("VideoSkills", {
                    video: item?.video,
                    name: item?.title,
                  })
                }
                style={styles.exerciseCard}
              >
                <View style={styles.thumbnailContainer}>
                  {item?.video_thumbnail ? (
                    <Image
                      source={{ uri: item?.video_thumbnail }}
                      style={styles.thumbnail}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={styles.placeholderThumbnail}>
                      <PlayerSvg height={20} width={20} />
                    </View>
                  )}
                </View>
                <View style={styles.exerciseDetails}>
                  <Text style={styles.exerciseType}>{item.type}</Text>
                  <Text style={styles.exerciseTitle}>{item?.title}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    flexDirection: "column",
    padding: 16,
    backgroundColor: "black",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "left",
    marginTop: 20,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "111214",
    borderRadius: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#FF8036",
    width: "100%",
    height: 50,
    marginTop: 8,
  },
  searchIcon: {
    marginLeft: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#ffff",
  },
  searchResultText: {
    marginTop: 8,
    fontSize: 14,
    color: "#BABBBE",
    marginLeft: 5,
  },
  dropdownWithBackground: {
    backgroundColor: "#F3F3F4",
    borderRadius: 10,
    borderWidth: 0, // remove any border if needed
    backgroundImage: 'url("../../assets/images/Frameaa.png")',
    backgroundSize: "cover", // cover the entire dropdown
    backgroundRepeat: "no-repeat", // prevent the image from repeating
  },
  dropdownContainer: {
    padding: 16,
    paddingBottom:0,
    // marginBottom: -10,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 8,
    marginTop: 16,
  },
  dropdownButton: {
    width: "100%",
    height: 56,
    backgroundColor: "#F3F3F4",
    borderRadius: 19,
    justifyContent: "center",
  },
  dropdownButtonText: {
    color: "#000000",
    fontSize: 16,
    textAlign: "left",
    fontWeight: "500",
  },
  dropdown: {
    backgroundColor: "#F3F3F4",
    borderRadius: 10,
  },
  dropdownRow: {
    backgroundColor: "#F3F3F4",
  },
  dropdownRowText: {
    color: "#000000",
    fontSize: 16,
    textAlign: "left",
    fontWeight: "500",
  },
  listContainer: {
    flex: 1,
    padding: 16,
    // top: 10,
  },
  noResultsContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  noResultsText: {
    fontSize: 16,
    color: "#676C75",
    marginTop: 8,
    textAlign: "center",
  },
  exerciseCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#F3F3F4",
    borderRadius: 32,
    marginBottom: 16,
    // marginTop: 5,
  },
  thumbnailContainer: {
    width: 80,
    height: 80,
    borderRadius: 27,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: "100%",
  },
  placeholderThumbnail: {
    width: 96,
    height: 96,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#676C75",
    borderRadius: 27,
  },
  exerciseDetails: {
    flex: 1,
    marginLeft: 16,
  },
  exerciseType: {
    fontSize: 16,
    fontWeight: "500",
    color: "#676C75",
  },
  exerciseTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111214",
  },
});

export default Excercises;
