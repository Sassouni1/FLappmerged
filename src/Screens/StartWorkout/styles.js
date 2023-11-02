import { StyleSheet } from "react-native";
import { getHeight,getFontSize,getWidth } from "../../../utils/ResponsiveFun";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.primary,
    },
    header: {
      flexDirection: 'row',
      alignItems: "flex-start",
      justifyContent: "space-evenly",
      paddingHorizontal: getWidth(2),
      paddingVertical: getHeight(3),
      backgroundColor:"#000"
    },
    scrollContainer: {
      flex: 1,
    },
    contentContainer: {
      marginHorizontal: getWidth(5),
      marginTop: getHeight(1),
    },
    section: {
      margin: getHeight(2),
      flexDirection:"column",
      alignItems:"center"
    },
    title: {
      fontSize: getFontSize(3.2),
      fontFamily: fonts.Re,
      color: colors.white,
      marginLeft: getWidth(2),
    },
    header1: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingHorizontal: getWidth(3),
      paddingVertical: getHeight(0.7),
    },
    img: {
      justifyContent: 'center',
      height: getHeight(10),
      width: getWidth(19),
      alignItems: 'center',
    },
    text: {
      color: colors.white,
      fontSize: 15,
      fontFamily: fonts.UBo,
      marginLeft: getWidth(5),
    },
  });