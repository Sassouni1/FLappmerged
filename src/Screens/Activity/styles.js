import { StyleSheet } from "react-native";
import { fonts } from "../../constants/fonts";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { colors } from "../../constants/colors";



export const styles = StyleSheet.create({
  contaner: {flex: 1, backgroundColor: 'rgba(51, 51, 51, 1)'},

    howyou:{
      fontFamily: fonts.URe,
      fontSize: getFontSize(2.1),
      color: colors.white,
      alignSelf: 'center',
    },
    progress:{
      fontFamily: fonts.UBo,
      fontSize: getFontSize(2.4),
      color: colors.white,
      marginTop: getHeight(4),
      marginLeft: getWidth(3),
    },
    hellotext:{
      fontSize: getFontSize(3.5),
      color: colors.white,
      fontFamily: fonts.Re,
      marginLeft: getWidth(10),
    },
    fourtyper:{
      fontSize: 24,
      fontFamily: fonts.Re,
      color: colors.white,
      position: 'absolute',
      bottom: getHeight(7),
    },
    todayt:{
      fontSize: 10,
      fontFamily: fonts.URe,
      color: colors.white,
      position: 'absolute',
      bottom: getHeight(5.5),
    },
    activityCon:{flexDirection: 'row', alignItems: 'center'},
    activty:{fontSize: getFontSize(1.8), color: colors.white, fontFamily: 'Ubuntu-bold'},
    spaceBet:{
      paddingHorizontal: getWidth(3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    textDay:{
      fontSize: getFontSize(1.5),
      color: colors.white,
      fontFamily: fonts.UMe,
      marginLeft: getWidth(2),
    },
    graphCon:{
      paddingHorizontal: getWidth(3),
      marginBottom: getHeight(3),
      marginTop: getHeight(1),
    },
    dayconn: {
      width: getWidth(13),
      borderRadius: 5,
      height: getHeight(14),
      backgroundColor: colors.timeCon,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: getWidth(1),
    },
    dayText: {fontSize: 13, color: colors.buttonColor, fontFamily: fonts.URe},
    datetexxt: {
      fontSize: 22,
      color: colors.buttonColor,
      fontFamily: fonts.UBo,
      marginTop: getHeight(0.5),
    },
    headerCon:{
      height: getHeight(8),
      width: getWidth(100),
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    textconn:{
      height: getHeight(16),
      // marginTop: getHeight(1),
      width: getWidth(100),
      // paddingHorizontal: getWidth(3),
      flexDirection: 'row',
      alignItems: 'center',
    },
    calendarContainer: {
      marginTop: 20, // Adjust the margin as needed
      width: '80%', // Adjust the calendar container width as needed
      backgroundColor: 'white', // Customize calendar container background color
      borderRadius: 5,
      elevation: 4, // Add shadow or elevation as desired
    },
    modalContainer: {
      backgroundColor: 'white', // Customize modal background color
      borderRadius: 5,
      padding: 20,
    },
    closeButton: {
      // justifyContent:"flex-start",
      alignItems: 'flex-start',
    }, donebtn: {
      height: getHeight(6),
      borderRadius: 5,
      width: getWidth(25),
      backgroundColor: colors.bluebtn,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: getHeight(1),
    },
  });