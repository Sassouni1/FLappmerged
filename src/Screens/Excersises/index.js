import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
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

const Exercises = () => {
  const navigation = useNavigation();
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();

  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [invalidEntry, setInvalidEntry] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedType, setSelectedType] = useState("All Exercises");
  const [allTypes, setAllTypes] = useState(["All Exercises"]);

  const filterNoVideo = useCallback((items) => {
    return items.filter(
      (item) =>
        item &&
        item.exercise_name &&
        item.exercise_name.toLowerCase() !== "no video" &&
        item.video_thumbnail
    );
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = filterNoVideo(data);

    if (selectedType && selectedType !== "All Exercises") {
      filtered = filtered.filter((item) => item.category === selectedType);
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((item) => {
        const title = item.exercise_name || "";
        return title.toUpperCase().includes(searchQuery.toUpperCase());
      });
    }

    setFilteredData(filtered);
    setIsRefreshing(false);
    setInvalidEntry(filtered.length === 0 && searchQuery.trim() !== "");
  }, [data, selectedType, searchQuery, filterNoVideo]);

  const getSkills = useCallback(async () => {
    try {
      const res = await ApiCall({
        params: { category_name: "skill" },
        route: "exercise/active_exercises",
        verb: "get",
        token: token,
      });
      if (res?.status == "200") {
        const filteredSkills = filterNoVideo(res?.response?.newData);
        setData(filteredSkills);
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
      dispatch(setLoader(false));
    }
  }, [token, dispatch, filterNoVideo]);

  const getAllCategories = useCallback(async () => {
    try {
      const res = await ApiCall({
        params: "",
        route: "category/get_all_categories",
        verb: "get",
        token: token,
      });

      if (res?.status == "200") {
        const categoryNames = [
          "All Exercises",
          ...res?.response?.detail
            .map((item) => item.category_name)
            .filter((name) => name && name.toLowerCase() !== "no video"),
        ];
        setAllTypes(categoryNames);
      } else {
        console.log("error", res.response);
      }
    } catch (e) {
      console.log("Error getting Categories -- ", e.toString());
    }
  }, [token]);

  const handleRefresh = useCallback(() => {
    dispatch(setLoader(true));
    getSkills();
    getAllCategories();
    setIsRefreshing(true);
  }, [dispatch, getSkills, getAllCategories]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const renderExerciseItem = useCallback(
    ({ item }) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("ExerciseDetail", {
            exercise: item,
            exercises: data,
          })
        }
        style={styles.exerciseCard}
      >
        <View style={styles.thumbnailContainer}>
          {item.video_thumbnail ? (
            <Image
              source={{ uri: item.video_thumbnail }}
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
          <Text style={styles.exerciseType}>{item.category}</Text>
          <Text style={styles.exerciseTitle}>{item.exercise_name}</Text>
        </View>
      </TouchableOpacity>
    ),
    [navigation, data]
  );

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
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
          <SearchSvg height={20} width={20} style={styles.searchIcon} />
        </View>
        <Text style={styles.searchResultText}>
          {searchQuery
            ? `${filteredData.length} results found for '${searchQuery}'`
            : ""}
        </Text>
      </View>
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Exercise Type</Text>
        <SelectDropdown
          data={allTypes}
          onSelect={setSelectedType}
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
          dropdownStyle={styles.dropdownWithBackground}
          rowStyle={styles.dropdownRow}
          rowTextStyle={styles.dropdownRowText}
        />
      </View>
      <View style={styles.listContainer}>
        {invalidEntry || filteredData.length === 0 ? (
          <View style={styles.noResultsContainer}>
            <AntDesign name="exclamationcircleo" size={24} color="#676C75" />
            <Text style={styles.noResultsText}>No Exercise found.</Text>
          </View>
        ) : (
          <FlatList
            data={filteredData}
            keyExtractor={(item) =>
              item.id ? item.id.toString() : Math.random().toString()
            }
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            showsVerticalScrollIndicator={false}
            renderItem={renderExerciseItem}
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
    padding: 8,
    backgroundColor: "black",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "left",
    marginTop: 10,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111214",
    borderRadius: 18,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#FF8036",
    height: 40,
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
    borderWidth: 0,
  },
  dropdownContainer: {
    padding: 8,
  },
  dropdownButton: {
    width: "100%",
    height: 45,
    backgroundColor: "#F3F3F4",
    borderRadius: 19,
    justifyContent: "center",
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#000000",
    marginBottom: 4,
    marginTop: 8,
  },
  listContainer: {
    flex: 1,
    padding: 12,
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

export default Exercises;
