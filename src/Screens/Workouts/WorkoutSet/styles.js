import { StyleSheet } from "react-native";
import { getHeight,getFontSize,getWidth } from "../../../../utils/ResponsiveFun";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";


export const styles = StyleSheet.create({
    buttonMark:{width:getWidth(95),backgroundColor:colors.buttonColor,height:getHeight(7.5),borderRadius:5,alignSelf:"center",marginBottom:getHeight(3),justifyContent:"center",alignItems:"center"},
    rest2:{fontFamily:fonts.UBo,color:colors.white,fontSize:getFontSize(2),marginRight:getWidth(2)},
    tickCon:{height:getHeight(4),width:getHeight(4),borderRadius:30,backgroundColor:colors.graytext5,marginLeft:getWidth(2),justifyContent:"center",alignItems:"center"},
    lbs:{fontSize:getFontSize(2),color:colors.graytext4,fontFamily:fonts.URe,marginTop:getHeight(.5)},
    dashes:{fontSize:getFontSize(2),color:colors.graytext4,fontFamily:fonts.URe},
    horizental:{width:getWidth(.5),height:getHeight(3),backgroundColor:colors.graytext5},
    reps:{fontSize:10,color:colors.graytext4,fontFamily:fonts.URe,marginTop:getHeight(.5)},
    numbr:{fontSize:getFontSize(2),fontFamily:fonts.URe,color:colors.darktext,marginLeft:getWidth(2)},
    count:{fontSize:getFontSize(2.2),color:colors.white,fontFamily:fonts.URe,marginRight:getWidth(2)},
    btnhor:{height:getHeight(3.5),width:getWidth(18),backgroundColor:colors.greenlight,borderRadius:5},
    spabet:{flexDirection:"row",alignItems:"center",height:getHeight(3),marginTop:getHeight(2.5)},
    markas:{color:colors.white,fontSize:getFontSize(2.2),fontFamily:fonts.UBo},
    heading:{
        width: getWidth(100),
        flexDirection: 'row',
        alignItems: 'center',
        height: getHeight(8),
        backgroundColor: '#000',
        justifyContent: 'space-between',
       
      },
      videobtn:{width:getWidth(25),height:getHeight(4),borderRadius:5,justifyContent:"center",alignItems:"center",backgroundColor:colors.whiteOp20,position:"absolute",bottom:getHeight(2.5),left:getWidth(3)},
      flatchest:{fontSize:19,color:colors.white,fontFamily:fonts.UBo,position:"absolute",bottom:getHeight(7),left:getWidth(3)},
      videotext:{fontSize:10,fontFamily:fonts.UBo,color:colors.white},
      start:{
        color: colors.white,
        fontSize: 12,
        fontFamily: fonts.UBo,
        marginLeft: getWidth(1),
      },
      togle:{
        backgroundColor: colors.whiteOp20,
        height: getHeight(5),
        borderRadius: 5,
        width: getWidth(20),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // marginLeft: getWidth(10),
      },
      angel:{
        height: getHeight(8),
        flexDirection: 'row',
        alignItems: 'center',
        width: getWidth(100),
       
      },
    text: {
      fontSize: 18,
      marginHorizontal: 4,
      fontSize: getFontSize(5.2),
      fontFamily: fonts.Re,
      color: colors.white,
      marginLeft: getWidth(2),
    },
    header: {
      //flex:1,
      flexDirection: 'column',
      alignItems: 'center',
      marginRight: 38,
    },
    repsCon:{flexDirection:"row",alignItems:"center",height:getHeight(8),marginTop:getHeight(3)},
    headerTime: {
      //flex:1,
      flexDirection: 'row',
      marginTop: 5,
    },
    betww:{width:getWidth(78),height:getHeight(3.5),borderRadius:5,backgroundColor:colors.secondary,flexDirection:"row",alignItems:"center"},
    whiteCon:{width:getWidth(81),height:getHeight(7),borderRadius:5,borderWidth:1,borderColor:colors.graytext5,backgroundColor:colors.white,justifyContent:"space-around",alignItems:"center",flexDirection:"row"},
    heading:{height:getHeight(3.5),backgroundColor:colors.secondary,width:getWidth(95),alignSelf:"center",borderRadius:5,justifyContent:"center",alignItems:"center",},
    headingtext:{fontSize:getFontSize(1.9),color:colors.graytext4,fontFamily:fonts.UBo},
    imgb:{height:getHeight(35),width:getWidth(100)},
    spacebet:{flexDirection:"row",alignItems:"center",height:getHeight(3),marginTop:getHeight(2.5)},
    rest:{fontFamily:fonts.UBo,color:colors.white,fontSize:getFontSize(2),marginRight:getWidth(2)},
    btng:{width:getWidth(78),height:getHeight(3.5),borderRadius:5,backgroundColor:colors.secondary,flexDirection:"row",alignItems:"center"},
  });