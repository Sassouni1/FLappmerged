import React from 'react';
import { View, StyleSheet } from 'react-native';
import VideoPlayer from 'react-native-video-player';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
    getFontSize,
    getHeight,
    getWidth,
  } from "../../../utils/ResponsiveFun";
// Function to extract YouTube video ID from URL
const extractYouTubeVideoID = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.+\?v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

const VideoComponent = ({ videoUrl,thumbnail }) => {
  const isYouTube = extractYouTubeVideoID(videoUrl);
  
  return (
    <View style={styles.container}>
      {isYouTube ? (
         <View style={styles.youtubeContainer}>
        <YoutubePlayer
          height={'100%'}
          width={'100%'}
          play={false}
          videoId={isYouTube}
        />
        </View >
      ) : (
        <VideoPlayer
          video={{ uri: videoUrl }}
          autoplay={false}
          defaultMuted={false}
          thumbnail={{ uri: thumbnail }} 
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  youtubeContainer: {
    width: '100%',
    borderRadius: 15,
    overflow: 'hidden', 
  },
});

export default VideoComponent;
