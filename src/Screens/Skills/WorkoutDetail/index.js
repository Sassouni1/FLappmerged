import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState, useEffect } from "react";
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

export default function WorkoutDetail({ navigation, route }) {
  // Destructure both the selectedVideo and videos list from the params
  const { selectedVideo, videos } = route?.params;

  // Use state to manage the current video
  const [currentVideo, setCurrentVideo] = useState(selectedVideo);

  const onPressBack = () => navigation.goBack();
  const { height, width } = Dimensions.get("window");

  // Debugging: Confirm initial props
  useEffect(() => {
    console.log("WorkoutDetail Mounted");
    console.log("Selected Video:", selectedVideo);
    console.log("Videos List:", videos);
  }, []);

  // Monitor state changes
  useEffect(() => {
    if (currentVideo) {
      console.log("Current Video Updated:", currentVideo.title);
    }
  }, [currentVideo]);

  // Function to navigate to the next video using state instead of navigation.push
  const onPressNextVideo = () => {
    console.log("Next Video button clicked");

    // Check if videos array exists and is not empty
    if (!Array.isArray(videos) || videos.length === 0) {
      console.log("No videos available");
      return;
    }

    // Find the index of the current video in the list
    const currentIndex = videos.findIndex(
      (video) => video._id === currentVideo._id
    );
    console.log("Current Index:", currentIndex);

    // Check if currentIndex is valid
    if (currentIndex === -1) {
      console.log("Current video not found in the list");
      return;
    }

    // Get the next video if it exists
    const nextVideo = videos[currentIndex + 1];
    console.log("Next Video:", nextVideo);

    // If there's a next video, update the state to show it
    if (nextVideo) {
      setCurrentVideo(nextVideo);
      console.log("Updated to next video:", nextVideo.title);
    } else {
      // Handle if there are no more videos
      console.log("No more videos available");
      navigation.goBack();
    }
  };

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
          onPress={onPressBack}
          style={{ paddingHorizontal: getWidth(4) }}
        >
          <Ionicons
            name="chevron-back"
            size={getFontSize(4)}
            color={colors.white}
          />
        </TouchableOpacity>
      </View>

      <CKeyBoardAvoidWrapper contentContainerStyle={styles.topSTyle}>
        {/* Display the current video title */}
        <Text style={styles.headerTextStyles}>{currentVideo?.title}</Text>

        {/* Video Player */}
        <View style={styles.videoStyle}>
          <VideoComponent
            videoUrl={currentVideo?.video}
            thumbnail={currentVideo?.video_thumbnail}
          />
        </View>

        {/* Next Video Button */}
        <TouchableOpacity
          onPress={onPressNextVideo}
          style={styles.nextBtnStyle}
        >
          <Text style={styles.backBtnTextStyle}>Next Video</Text>
          <Ionicons
            name="arrow-forward"
            size={getFontSize(2.7)}
            style={{ marginLeft: getWidth(2) }}
            color={colors.white}
          />
        </TouchableOpacity>

        {/* Back Button */}
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
    color: colors.black,
    fontSize: getFontSize(3),
    fontFamily: fonts.UBo,
    marginTop: getHeight(3),
    marginBottom: getHeight(2),
    textAlign: "center",
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
    // Optional: Adjust zIndex if needed
    zIndex: 1,
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
    borderRadius: getWidth(6),
  },
  topSTyle: {
    paddingBottom: getHeight(10),
  },
});
