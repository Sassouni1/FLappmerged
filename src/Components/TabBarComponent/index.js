import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { getWidth } from "../../../utils/ResponsiveFun";
import { fonts } from "../../constants/fonts";

const TabBarComponent = ({ activeTab, setActiveTab }) => {

  const tabs = [
    { key: "tab1", title: "Programs" },
    { key: "tab3", title: "Additional" },
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
            <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>
              {tab.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  content: {
    flex: 1,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: "#e1e1e3",
    marginHorizontal:4,
    borderRadius: 15,
  },
  tab: {
    borderWidth: 0,
    borderRadius: 15,
    height: 43,
    justifyContent: "center",
    alignItems: "center",
    width: getWidth(31.6),
  },
    tabText: {
        color: "#686c74",
        fontFamily: fonts.Re,
        fontSize: 15,
        fontWeight: "700",
    },
    activeTab: {
        borderWidth: 4,
        borderColor: "#babbbc",
        backgroundColor: "black",
        borderRadius: 15,
        height: 43,
        justifyContent: "center",
        alignItems: "center",
        width: getWidth(31.6),
    },
    activeTabText: {
        color: "white",
        fontFamily: fonts.Re,
        fontSize: 15,
        fontWeight: "700",
    },
});

export default TabBarComponent;
