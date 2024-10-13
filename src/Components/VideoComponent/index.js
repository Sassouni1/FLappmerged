import React, { useEffect, useState } from "react";
import { View, StyleSheet,ActivityIndicator } from "react-native";
import VideoPlayer from "react-native-video-player";
import YoutubePlayer from "react-native-youtube-iframe";
import { Vimeo } from "react-native-vimeo-iframe";
import { WebView } from "react-native-webview";

// Function to extract YouTube video ID from URL
const extractYouTubeVideoID = (url) => {
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.+\?v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url?.match(regex);
  return match ? match[1] : null;
};

// Function to check if URL is a Vimeo link
const isVimeoUrl = (url) => {
  const vimeoRegex = /vimeo\.com\/(?:manage\/videos\/)?(\d+)/;
  return vimeoRegex.test(url);
};

// Extract Vimeo video ID from URL (supports both public and managed URLs)
const extractVimeoVideoID = (url) => {
  const match = url?.match(/vimeo\.com\/(?:manage\/videos\/)?(\d+)/);
  return match ? match[1] : null;
};

const VideoComponent = ({ videoUrl, thumbnail }) => {
  const [vimeoPrivateUrl, setVimeoPrivateUrl] = useState();
  const isYouTube = extractYouTubeVideoID(videoUrl);
  const isVimeo = isVimeoUrl(videoUrl);
  const vimeoVideoId = extractVimeoVideoID(videoUrl);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (vimeoVideoId) {
    setIsLoading(true)
      // Fetch private video details from Vimeo API
      fetch(`https://api.vimeo.com/videos/${vimeoVideoId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${"0ffaede4b92457da6e58870aace9493d"}`,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            setIsLoading(false)
            throw new Error("Failed to fetch video data");
          }
          return response.json();
        })
        .then((data) => {
          const videoUrl = data.embed.html.match(/src="([^"]*)"/)[1]; // Extract the iframe URL from the response
          setVimeoPrivateUrl(videoUrl);
          setIsLoading(false)

          console.log(videoUrl);
        })
        .catch((error) => {
          setIsLoading(false)
          console.log("Error:", error);
        });
    }
  }, [vimeoVideoId]);

  return (
    <View style={styles.container}>
      {isLoading ? <ActivityIndicator size={'large'} /> :
      <>
      {isYouTube ? (
        // <View style={styles.youtubeContainer}>
          <YoutubePlayer
            height={230}
            width={"100%"}
            play={false}
            videoId={isYouTube}
          />
        // </View>
      ) : isVimeo ? (
        <View style={styles.vimeoContainer}>
          <WebView
            source={{ uri: vimeoPrivateUrl }}
            style={{ height: 200, width: "100%" }}
            allowsInlineMediaPlayback={true}
          />
          {/* <Vimeo
            videoId={vimeoVideoId}
            width={'100%'}
            height={200} // Adjust as per your design
            autoplay={false}
          /> */}
        </View>
      ) : (
        <VideoPlayer
          video={{ uri: videoUrl }}
          autoplay={false}
          defaultMuted={false}
          thumbnail={{ uri: thumbnail }}
        />
      )}
      </>
}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  youtubeContainer: {
    width: "100%",
    height: 189,
    borderRadius: 15,
    overflow: "hidden",
  },
  vimeoContainer: {
    width: "100%",
    borderRadius: 15,
    height: 200,
    overflow: "hidden",
  },
});

export default VideoComponent;
