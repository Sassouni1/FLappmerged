import { View, Text, TouchableOpacity ,ScrollView} from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { GernalStyle } from "../../constants/GernalStyle";
import Header from "../../Components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getFontSize, getWidth } from "../../../utils/ResponsiveFun";
import { useNavigation } from "@react-navigation/native";
import GeneralStatusBar from "../../Components/GeneralStatusBar";
import HeaderBottom from "../../Components/HeaderBottom";
import { styles } from "./styles";

const About = () => {
  const navigation = useNavigation();

  return (
    <View  style={{ ...GernalStyle.continer, backgroundColor: colors.homeColor }}>
    <GeneralStatusBar
      barStyle="light-content"
      hidden={false}
      backgroundColor={colors.primary}
      translucent={true}
    />
      <HeaderBottom
        title={"About This App"}
        LeftIcon={
            <Ionicons
            //  style={{ alignSelf: "center", marginRight: getWidth(2) }}
              name={"arrow-back"}
              size={25}
              color={"#ffff"}
              onPress={() => navigation.goBack()}
            />
        }
        RightIcon={<View style={{marginRight:getFontSize(3)}}/>}
      />
      <View
        style={{
          ...GernalStyle.continer,
          backgroundColor: colors.homeColor,
          marginTop:getFontSize(1)        
        }}
      >
        {/* <Text
          style={{ fontSize: getFontSize(2), color: colors.white, fontFamily: fonts.URe ,textAlign:"center"}}
        >
          Learn more about our app and its features.
        </Text> */}
         <ScrollView>
          <Text style={styles.accounttext}>How much does it cost?</Text>
          <Text
            style={{ ...styles.ttext, textAlign: "left", width: getWidth(87) }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec aliquam
            turpis purus pulvinar in at in vitae libero. Nulla condimentum
            placerat aliquet arcu feugiat. Posuere amet nibh curabitur in sit
            sed scelerisque vivamus elit. Molestie in vulputate euismod quis
            lectus et ac.
          </Text>
          <Text style={styles.accounttext}>Confidential Information:</Text>
          <Text
            style={{ ...styles.ttext, textAlign: "left", width: getWidth(87) }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec aliquam
            turpis purus pulvinar in at in vitae libero. Nulla condimentum
            placerat aliquet arcu feugiat. Posuere amet nibh curabitur in sit
            sed scelerisque vivamus elit.
          </Text>
          <Text style={styles.accounttext}>User Rights:</Text>
          <Text
            style={{ ...styles.ttext, textAlign: "left", width: getWidth(87) }}
          >
            Nulla condimentum placerat aliquet arcu feugiat. Posuere amet nibh
            curabitur in sit sed scelerisque vivamus elit. Molestie in vulputate
            euismod quis lectus et ac.
          </Text>
          <Text style={styles.accounttext}>Legal Requirements:</Text>
          <Text
            style={{ ...styles.ttext, textAlign: "left", width: getWidth(87) }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec aliquam
            turpis purus pulvinar in at in vitae libero. Nulla condimentum
            placerat aliquet arcu feugiat. Posuere amet nibh curabitur in sit
            sed scelerisque vivamus elit. Molestie in vulputate euismod quis
            lectus et ac.
          </Text>
          <Text style={styles.accounttext}>Follow up:</Text>
          <Text
            style={{ ...styles.ttext, textAlign: "left", width: getWidth(87) }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nec aliquam
            turpis purus pulvinar in at in vitae libero. Nulla condimentum
            placerat aliquet arcu feugiat. Posuere amet nibh curabitur in sit
            sed scelerisque vivamus elit. Molestie in vulputate euismod quis
            lectus et ac.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

export default About;
