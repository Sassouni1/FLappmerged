import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Image,
  Linking,
  Text,
  Modal,
  Button,
  Alert,
  TouchableOpacity,
  View,
} from "react-native";
import React,{useState} from "react";
import { colors } from "../../../constants/colors";
import {
  getFontSize,
  getHeight,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fonts } from "../../../constants/fonts";
import Clipboard from '@react-native-community/clipboard';

export default function WorkoutComplete({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const onPressBack = () => navigation.goBack();
  const onPressNext = () => navigation.navigate("AddWorkouts");

  const link = 'https://www.fightersupplements.com/products/battle-tested';
  
  const copyToClipboard = () => {
    Clipboard.setString(link);
    Alert.alert('Copied!', 'Link has been copied to your clipboard.');
  };

  return (
    <View style={styles.root}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.popup}>
            <Text style={styles.title}>Shop Battle Tested</Text>
            <Text selectable style={styles.link}>{link}</Text>
            <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
              <Text style={styles.copyText}>Copy Link</Text>
            </TouchableOpacity>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={colors.white}
        translucent={true}
      />
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          {/* First set of content */}
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={onPressBack}
                style={styles.headerBtnStyle}
              >
                <Image
                  source={require("../../../assets/images/Button1Container1.png")}
                  style={styles.buttonImage}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.workoutTextSTyle}>Workout Complete!</Text>
            <Text style={styles.workoutTextSTyle1}>Recovery Tip:</Text>
            <Text style={styles.workoutTextSTyle2}>
              {"\n"}For enhanced post-workout recovery, try 
              <Text style={{ fontWeight: "bold" }}>Battle Tested</Text>, Fight
              Life’s official recovery drink. It’s expertly formulated by Phil
              Daru to reduce soreness and inflammation, helping you recover
              faster and perform better in your next workout.
            </Text>

            <Image
              source={require("../../../assets/images/89_3024x.jpeg")}
              style={styles.juicyImageStyle}
            />
          </View>

          {/* Second set of content */}
          <View style={styles.contentContainer}>
            <Text style={styles.workoutTextSTyle3}>
              <Text style={[styles.workoutTextSTyle4, { fontWeight: "bold" }]}>
                Ingredients:
              </Text>
              {"\n"}Dextrose - 35g {"\n"}BCAA - 5g {"\n"}L-Glutamine - 3g {"\n"}
              Tart Cherry Extract - 3g {"\n"}Coconut Water Extract - 2g {"\n"}
              spirulina Powder - 1g {"\n"}Green Tea Extract - 500 mg {"\n"}
              Ashwagandha Root - 400mg {"\n"}Sodium - 300mg {"\n"}Potassium -
              205mg {"\n"}Magnesium - 125mg {"\n"}Tumeric - 100mg {"\n"}Calcium
              - 50mg Zinc - 11mg
            </Text>
          </View>

          {/* Buttons at the bottom */}
          <View style={styles.linearContainer}>
            <TouchableOpacity
              onPress={() =>
                setModalVisible(true)
                // Linking.openURL(
                //   "https://www.fightersupplements.com/products/battle-tested"
                // )
              }
              style={styles.nextBtnStyle}
            >
              <Text style={styles.backBtnTextStyle}>Shop Battle Tested</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.linearContainer}>
            <TouchableOpacity
              onPress={onPressNext}
              style={styles.nextBtnStyle3}
            >
              <Text style={styles.backBtnTextStyle3}>Complete Workout</Text>
              <Ionicons
                name="checkmark"
                size={getFontSize(2.7)}
                style={{
                  marginLeft: getWidth(2),
                }}
                color={colors.white}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewContent: {
    paddingHorizontal: getWidth(4),
    paddingBottom: getHeight(2),
  },
  contentContainer: {
    marginBottom: getHeight(4),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: getWidth(4),
    paddingVertical: getHeight(2),
  },
  headerBtnStyle: {
    width: getWidth(12.5), // Adjust as needed
    height: getWidth(12.5), // Adjust as needed
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.paleGray,
    borderRadius: 16,
  },
  buttonImage: {
    width: "100%",
    height: "100%",
  },
  workoutTextSTyle: {
    color: colors.black,
    fontSize: getFontSize(4.5),
    fontFamily: fonts.WB,
    textAlign: "center",
    marginVertical: getHeight(1), // Reduced margin to bring it closer to the top
    marginBottom: 10,
  },
  workoutTextSTyle1: {
    color: "#393C43",
    fontSize: getFontSize(2.3),
    fontFamily: fonts.WB,
    marginLeft: 30,
    marginTop: -3,
    marginBottom: 1,
    marginVertical: getHeight(0), // Reduced margin to bring it closer to the top
  },
  workoutTextSTyle2: {
    color: "#393C43",
    fontSize: getFontSize(2.1),
    fontFamily: fonts.WB,
    marginLeft: 30,
    marginRight: 20, // Increased marginRight to ensure proper padding
    fontWeight: "300",
    textAlign: "left",
    width: "87%", // Use full width of the container
    marginBottom: 1,
  },
  workoutTextSTyle3: {
    color: "#393C43",
    fontSize: getFontSize(2.1),
    fontFamily: fonts.WB,
    marginLeft: 20,
    marginRight: 20, // Increased marginRight to ensure proper padding
    fontWeight: "300",
    textAlign: "left",
    width: "87%", // Use full width of the container
  },
  workoutTextSTyle4: {
    marginTop: 200,
    color: "#393C43",
    fontSize: getFontSize(2.2),
    fontFamily: fonts.WB,
    marginLeft: 20,
    marginRight: 20, // Increased marginRight to ensure proper padding
    fontWeight: "300",
    textAlign: "left",
    width: "87%", // Use full width of the container
  },
  juicyImageStyle: {
    width: getWidth(80),
    height: getHeight(36),
    alignSelf: "center",
    marginVertical: getHeight(0),
    marginTop: 13,
    borderRadius: 16,
    marginBottom: 10,
  },
  linearContainer: {
    justifyContent: "flex-end",
    paddingHorizontal: getWidth(4),
    paddingBottom: getHeight(2),
  },
  nextBtnStyle: {
    backgroundColor: colors.black,
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 19,
    height: getHeight(6),
    width: "90%",
    marginVertical: getWidth(0),
  },
  backBtnTextStyle: {
    color: colors.white,
    fontSize: getFontSize(2.2),
    fontFamily: fonts.WMe,
  },
  nextBtnStyle3: {
    backgroundColor: colors.orange,
    alignItems: "center",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 19,
    height: getHeight(6),
    width: "90%",
    marginVertical: getWidth(0),
  },
  backBtnTextStyle3: {
    color: colors.white,
    fontSize: getFontSize(2.2),
    fontFamily: fonts.WMe,
  },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
  popup: { width: 300, padding: 20,paddingHorizontal:10, backgroundColor: 'white', borderRadius: 8, alignItems: 'center' },
  title: { fontSize: 18, marginBottom: 10 },
  link: { fontSize: 16, color: 'blue', marginBottom: 20,textAlign:'center' },
  copyButton: { backgroundColor: '#007AFF', padding: 10, borderRadius: 5 },
  copyText: { color: 'white' },
});