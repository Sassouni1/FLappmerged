import { StyleSheet } from "react-native";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";
import { colors } from "../../constants/colors";
import { fonts } from "../../constants/fonts";


export const styles=StyleSheet.create({
    heading:{height:getHeight(3.5),backgroundColor:colors.secondary,width:getWidth(95),alignSelf:"center",borderRadius:5,marginTop:getHeight(2.5),justifyContent:"center",alignItems:"center",},
    headingtext:{fontSize:getFontSize(1.9),color:colors.gray1,fontFamily:fonts.UBo},
    chatCon:{width:getWidth(95),alignSelf:"center",height:getHeight(11),alignItems:"center"},
    row:{flexDirection:"row",alignItems:"center"},
    logoCon:{width:getHeight(8),height:getWidth(16),borderRadius:5,backgroundColor:colors.gray7,justifyContent:"center",alignItems:"center",marginTop:getHeight(1.5)},
    logotext:{fontSize:getFontSize(2.1),color:colors.chatlogo,fontFamily:fonts.UBo},
    userCon:{flexDirection:"row",alignItems:"center",justifyContent:"space-between",width:getWidth(74),marginLeft:getWidth(2.5)},
    username:{fontSize:getFontSize(2),color:colors.white,fontFamily:fonts.UMe},
  time:{color:colors.graytext5,fontFamily:fonts.UMe,fontSize:getFontSize(1.3),alignSelf:"flex-end"},
  lastmsg:{fontSize:getFontSize(1.3),color:colors.graytext5,marginLeft:getWidth(3),marginTop:getHeight(.5),width:getWidth(80)},
  })