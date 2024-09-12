import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { getWidth } from "../../../utils/ResponsiveFun";
import { fonts } from "../../constants/fonts";

const TabBarComponent = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "tab1", title: "Programs" },
    { key: "tab2", title: "Calendar" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.tab, activeTab === index && styles.activeTab]}
            onPress={() => setActiveTab(index)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === index && styles.activeTabText,
              ]}
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  content: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between", // Create space between the tabs
    alignItems: "center",
    backgroundColor: "#e1e1e3", // Keep background color
    borderRadius: 10, // Round the corners
    //marginHorizontal: 20, // Prevent container from touching screen edges
    //paddingHorizontal: 1, // Keep padding within bounds
    alignSelf: "center", // Center the container
    width: "auto", // Let the width adjust to the content
    maxWidth: "97%", // Prevent overhang by limiting max width
  },
  tab: {
    borderWidth: 0,
    borderRadius: 15,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    width: '50%',//if tabs 3 then 33.3%
  },
  activeTab: {
    borderWidth: 4,
    borderColor: "#babbbc",
    backgroundColor: "black",
    borderRadius: 15,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    width: '50%',//if tabs 3 then 33.3%
  },
  tabText: {
    color: "#686c74",
    fontFamily: fonts.Re,
    fontSize: 15,
    fontWeight: "700",
  },
  activeTabText: {
    color: "white",
    fontFamily: fonts.Re,
    fontSize: 15,
    fontWeight: "700",
  },
});

export default TabBarComponent;
