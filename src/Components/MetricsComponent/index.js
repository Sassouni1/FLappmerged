import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import { colors } from "../../constants/colors"; // Adjust path based on your project structure

const MetricsComponent = () => {
  const [selectedTimeFrame, setSelectedTimeFrame] = useState("1 Day");
  const [heartRateData, setHeartRateData] = useState([]);
  const [hrvData, setHRVData] = useState([]);
  const [maxHRData, setMaxHRData] = useState([]);
  const [vo2MaxData, setVO2MaxData] = useState([]);

  // Updated timeframes
  const timeFrames = [
    "1 Day",
    "3 Days",
    "7 Days",
    "1 Month",
    "3 Months",
    "6 Months",
    "1 Year",
  ];

  useEffect(() => {
    // Fetch the data based on the selected time frame
    fetchData(selectedTimeFrame);
  }, [selectedTimeFrame]);

  const fetchData = async (timeFrame) => {
    try {
      // Define API endpoints (Replace with actual endpoints)
      const heartRateUrl = `https://api.example.com/heart-rate?timeFrame=${timeFrame}`;
      const hrvUrl = `https://api.example.com/hrv?timeFrame=${timeFrame}`;
      const maxHRUrl = `https://api.example.com/max-hr?timeFrame=${timeFrame}`;
      const vo2MaxUrl = `https://api.example.com/vo2-max?timeFrame=${timeFrame}`;

      // Example API calls using axios
      const [heartRateResponse, hrvResponse, maxHRResponse, vo2MaxResponse] =
        await Promise.all([
          axios.get(heartRateUrl),
          axios.get(hrvUrl),
          axios.get(maxHRUrl),
          axios.get(vo2MaxUrl),
        ]);

      // Update state with the fetched data
      setHeartRateData(heartRateResponse.data);
      setHRVData(hrvResponse.data);
      setMaxHRData(maxHRResponse.data);
      setVO2MaxData(vo2MaxResponse.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Dropdown to select time frame */}
      <SelectDropdown
        data={timeFrames}
        defaultValue={selectedTimeFrame}
        onSelect={(selectedItem) => setSelectedTimeFrame(selectedItem)}
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={styles.dropdownButtonText}
        dropdownStyle={styles.dropdownStyle}
      />

      {/* Heart Rate Chart */}
      <View style={styles.metricContainer}>
        <Text style={styles.metricTitle}>Average Heart Rate</Text>
        <LineChart
          data={heartRateData}
          width={300}
          spacing={30}
          color={colors.orange}
          thickness={2}
        />
      </View>

      {/* HRV Chart */}
      <View style={styles.metricContainer}>
        <Text style={styles.metricTitle}>HRV</Text>
        <LineChart
          data={hrvData}
          width={300}
          spacing={30}
          color={colors.blue}
          thickness={2}
        />
      </View>

      {/* Max HR Chart */}
      <View style={styles.metricContainer}>
        <Text style={styles.metricTitle}>Maximum HR</Text>
        <LineChart
          data={maxHRData}
          width={300}
          spacing={30}
          color={colors.red}
          thickness={2}
        />
      </View>

      {/* VO2 Max Chart */}
      <View style={styles.metricContainer}>
        <Text style={styles.metricTitle}>VO2 Max</Text>
        <LineChart
          data={vo2MaxData}
          width={300}
          spacing={30}
          color={colors.green}
          thickness={2}
        />
      </View>
    </View>
  );
};

export default MetricsComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  metricContainer: {
    marginVertical: 20,
  },
  metricTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dropdownButton: {
    backgroundColor: colors.white,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  dropdownButtonText: {
    color: colors.black,
    fontSize: 16,
  },
});
