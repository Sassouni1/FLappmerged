import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../constants/colors";
import { getHeight, getFontSize, getWidth } from "../../../utils/ResponsiveFun";
import { fonts } from "../../constants/fonts";
import GeneralStatusBar from "../GeneralStatusBar";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import AntDesign from "react-native-vector-icons/AntDesign";


import { PlayerSvg, StopSvg } from "../../assets/images/index";

const DigitalTimer = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false); // Track timer state

  useEffect(() => {
    let interval;

    if (isRunning) {
      // Only start the timer when it's running
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 59) {
            setMinutes((prevMinutes) => {
              if (prevMinutes === 59) {
                setHours((prevHours) => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    }

    // Clean up the interval when the component unmounts or timer is paused
    return () => clearInterval(interval);
  }, [isRunning]);

  const toggleTimer = () => {
    setIsRunning(!isRunning); // Toggle timer state
  };

  return (
    <View style={styles.container}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <View style={styles.header}>
        <Fontisto name={"stopwatch"} size={40} color="#ffff" />
        <View style={styles.headerTime}>
          <Text style={styles.text}>{hours.toString().padStart(2, "0")}:</Text>
          <Text style={styles.text}>
            {minutes.toString().padStart(2, "0")}:
          </Text>
          <Text style={styles.text}>{seconds.toString().padStart(2, "0")}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={toggleTimer}>
          {isRunning ? (
            <FontAwesome6 name={"pause"} size={20} color={'white'}/>
          ) : (
            <AntDesign name={"caretright"} size={22} color={'white'}/>
          )}

          <Text style={styles.buttonText}>{isRunning ? "Pause" : "Start"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    //flex:1,
    flexDirection: "column",
    alignItems: "center",
    marginRight: 38,
  },
  headerTime: {
    //flex:1,
    flexDirection: "row",
    marginTop: 5,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 4,
    fontSize: getFontSize(5.2),
    fontFamily: fonts.Re,
    color: colors.white,
    marginLeft: getWidth(2),
    height: getHeight(10),
  },
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 4,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    height: getHeight(5.5),
    width: getWidth(23),
    justifyContent: "center",
  },
  buttonText: {
    color: colors.white,
    fontSize: getFontSize(2),
    fontFamily: fonts.UBo,
    marginLeft: getWidth(1.5),
  },
});

export default DigitalTimer;
