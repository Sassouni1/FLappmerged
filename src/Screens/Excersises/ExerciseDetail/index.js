import {
    Dimensions,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Image
  } from "react-native";
  import React, { useState,useRef } from "react";
  import Ionicons from "react-native-vector-icons/Ionicons";
import VideoComponent from "../../../Components/VideoComponent";
  // Local Imports
  import GeneralStatusBar from "../../../Components/GeneralStatusBar";
  import {
    getFontSize,
    getHeight,
    getWidth,
  } from "../../../../utils/ResponsiveFun";
  import { colors } from "../../../constants/colors";
  import { fonts } from "../../../constants/fonts";
  import CKeyBoardAvoidWrapper from "../../../Components/Common/CKeyBoardAvoidWrapper";
  
  export default function ExerciseDetail({ navigation,route }) {
    const {exercise,exercises} = route?.params;
    const [selectedExercise,setSelectedExercise] = useState(exercise);

    const onPressBack = () => navigation.goBack();
    const onPressNextExercise = ()=>{
      const currentIndex = exercises?.findIndex(ex => ex?._doc?._id == selectedExercise?._id || ex?._doc?._id == selectedExercise?._doc?._id);
      let nextExercise = exercises[currentIndex+1]
      if (nextExercise) {
        setSelectedExercise(nextExercise?._doc);
      }
    }
  
    return (
      <View style={styles.root}>
        <View style={styles.topContainer}>
          <GeneralStatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor={colors.darkGray}
            translucent={true}
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingHorizontal: getWidth(4) }}
          >
           <Image
            source={require("../../../assets/images/Monotone3chevron3left.png")}
            style={{
              tintColor: colors.white,
              height: 30,
              width: 30,
              marginLeft: 15,
              marginTop: -14,
            }}
          />
          </TouchableOpacity>
          <Text style={styles.headerTextStyles}>{selectedExercise?.exercise_name}</Text>
        </View>
        <CKeyBoardAvoidWrapper contentContainerStyle={styles.topSTyle}>
          <View style={styles.videoStyle}>
            <VideoComponent videoUrl={selectedExercise?.video} thumbnail={selectedExercise?.video_thumbnail} />
          </View>
          <TouchableOpacity onPress={onPressNextExercise} style={styles.nextBtnStyle}>
          <Text style={styles.backBtnTextStyle}>Next Exercise</Text>
          <Ionicons
            name="arrow-forward"
            size={getFontSize(2.7)}
            style={{
              marginLeft: getWidth(2),
            }}
            color={colors.white}
          />
        </TouchableOpacity>
          <TouchableOpacity onPress={onPressBack} style={styles.goBackBtnStyle}>
            <Text style={styles.backBtnTextStyle}>No, Go Back</Text>
          </TouchableOpacity>
        </CKeyBoardAvoidWrapper>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    root: {
      flex: 1,
      backgroundColor: colors.white,
    },
    topContainer: {
      backgroundColor: colors.darkGray,
      paddingBottom: getWidth(6),
      marginBottom: getWidth(8),
      borderBottomLeftRadius: getWidth(10),
      borderBottomRightRadius: getWidth(10),
    },
    headerTextStyles: {
      color: colors.white,
      fontSize: getFontSize(3.5),
      fontFamily: fonts.UBo,
      paddingLeft: getWidth(5),
      marginVertical: getHeight(2.5),
    },
    subHeaderTestStyle: {
      color: colors.black,
      fontSize: getFontSize(2),
      fontFamily: fonts.UBo,
      marginHorizontal: getWidth(5),
      marginVertical: getWidth(2),
      marginTop: getWidth(3),
    },
    descTextStyle: {
      color: colors.slateGray,
      fontSize: getFontSize(1.8),
      fontFamily: fonts.URe,
      marginHorizontal: getWidth(5),
      marginBottom: getWidth(2),
    },
    goBackBtnStyle: {
      backgroundColor: colors.black,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "center",
      borderRadius: 19,
      width: "90%",
      height: getHeight(6),
      marginVertical: getWidth(5),
    },
    nextBtnStyle: {
      backgroundColor: colors.orange,
      alignItems: "center",
      alignSelf: "center",
      flexDirection: "row",
      justifyContent: "center",
      borderRadius: 19,
      height: getHeight(6),
      width: "90%",
      marginTop: getWidth(5),
    },
    backBtnTextStyle: {
      color: colors.white,
      fontSize: getFontSize(2.2),
      fontFamily: fonts.UMe,
    },
    videoStyle: {
      width: "90%",
      height: getHeight(28),
      alignSelf: "center",
      borderRadius: 15,
    },
    topSTyle: {
      paddingBottom: getHeight(10),
    },
  });
  