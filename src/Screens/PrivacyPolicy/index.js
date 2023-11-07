import { View, Text, TouchableOpacity } from "react-native";
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

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: colors.primary }}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <HeaderBottom
        title={" Privacy Policy"}
        LeftIcon={
          <Ionicons
            //  style={{ alignSelf: "center", marginRight: getWidth(2) }}
            name={"arrow-back"}
            size={25}
            color={"#ffff"}
            onPress={() => navigation.goBack()}
          />
        }
        RightIcon={<View />}
      />
      <View
        style={{
          ...GernalStyle.continer,
          backgroundColor: colors.homeColor,
          marginTop:getFontSize(10)
        }}
      >
        <Text
          style={{  fontSize: getFontSize(2),
            color: colors.white,
            fontFamily: fonts.URe,
            textAlign:"center" }}
        >
          Explore our privacy policy for information on data handling and user
          privacy
        </Text>
      </View>
    </View>
  );
};

export default PrivacyPolicy;
