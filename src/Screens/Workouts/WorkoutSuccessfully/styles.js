import { StyleSheet } from "react-native";
import { getHeight,getFontSize,getWidth } from "../../../../utils/ResponsiveFun";
import { colors } from "../../../constants/colors";
import { fonts } from "../../../constants/fonts";


export const styles=StyleSheet.create({
    tickbtn:{width:getHeight(6),height:getHeight(6),borderRadius:30,backgroundColor:colors.greentick,marginLeft:getWidth(25),marginTop:getHeight(-6),justifyContent:"center",alignItems:"center"},
    addsucess:{fontSize:24,color:colors.white,fontFamily:fonts.Re,marginTop:getHeight(4)},
    subtitle:{color:colors.graytext5,fontFamily:fonts.URe,fontSize:12,marginTop:getHeight(1)},
    ok:{fontSize:14,color:colors.buttonColor,fontFamily:fonts.UBo},
    workoutbtn:{borderColor:colors.buttonColor,borderRadius:5,borderWidth:1,width:getWidth(95),height:getHeight(7),justifyContent:"center",alignItems:"center",position:"absolute",bottom:getHeight(3)},
    })