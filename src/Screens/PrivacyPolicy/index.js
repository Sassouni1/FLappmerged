import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";
import { GernalStyle } from "../../constants/GernalStyle";
import Header from "../../Components/Header";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getWidth } from "../../../utils/ResponsiveFun";
import { useNavigation } from "@react-navigation/native";
import GeneralStatusBar from "../../Components/GeneralStatusBar";

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex:1,backgroundColor:colors.primary}}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <Header
        title={" Privacy Policy"}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={{ alignSelf: "center", marginRight: getWidth(2) }}
              name={"arrow-back"}
              size={25}
              color={"#ffff"}
            />
          </TouchableOpacity>
        }
      />
      <View
        style={{
          ...GernalStyle.continer,
          backgroundColor: colors.homeColor,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{ fontSize: 15, color: colors.white, fontFamily: fonts.URe }}
        >
          Coming Soon
        </Text>
      </View>
    </View>
  );
};

export default PrivacyPolicy;
