import { StyleSheet } from "react-native";
import { getHeight,getFontSize,getWidth } from "../../../../utils/ResponsiveFun";
import { fonts } from "../../../constants/fonts";
import { colors } from "../../../constants/colors";


export const styles = StyleSheet.create({
    workt:{color:colors.white,fontFamily:fonts.UBo,fontSize:getFontSize(2.5)},
    startwork:{width:getWidth(66),height:getHeight(7.5),backgroundColor:colors.greenlight,borderRadius:5,position:"absolute",bottom:getHeight(3),alignSelf:"center",justifyContent:"center",alignItems:"center"},
    isTimeCon:{height:getHeight(10),width:getWidth(100),paddingHorizontal:getWidth(3),flexDirection:"row",alignItems:"center",marginTop:getHeight(3),marginBottom:getHeight(2)},
      sep:{
          width: getWidth(95),
          alignSelf: 'center',
          marginTop: getHeight(2),
        },
    spacebet: {
      paddingHorizontal: getWidth(3),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: getHeight(3),
    },
    thumbnail: {
      backgroundColor: colors.white,
      justifyContent: 'center',
      height:65,
      width: 85,
      borderRadius: 10,
      alignItems: 'center',
    },
    chest: {
      color: colors.white,
      fontSize: getFontSize(2.8),
      fontFamily: fonts.Re,
    },
    total: {
      fontSize: getFontSize(1.7),
      color: colors.graytext5,
      fontFamily: fonts.Re,
    },
    conImg:{
      paddingHorizontal: getWidth(3),
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: getHeight(1.5),
    },
    heading:{
      fontSize: getFontSize(2.6),
      color: colors.white,
      fontFamily: fonts.UBo,
    },
    dayconn: {
      width: getWidth(13),
      borderRadius: 5,
      height: getHeight(15),
      backgroundColor: colors.timeCon,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: getWidth(1),
    },
    dayText: {fontSize: getFontSize(1.9), color: colors.buttonColor, fontFamily: fonts.URe},
    datetexxt: {
      fontSize: 22,
      color: colors.buttonColor,
      fontFamily: fonts.UBo,
      marginTop: getHeight(0.5),
    },
  });