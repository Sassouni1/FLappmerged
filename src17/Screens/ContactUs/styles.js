import { StyleSheet } from "react-native";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";


export const styles=StyleSheet.create({
    textcontect:{
      alignSelf: 'center',
      fontSize: getFontSize(1.8),
      color: colors.textgray6,
      fontFamily: fonts.URe,
      marginTop: getHeight(5),
      paddingHorizontal: getWidth(17),
      textAlign: 'center',
    }
  })