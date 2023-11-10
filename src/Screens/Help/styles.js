import { StyleSheet } from "react-native";

import { fonts } from "../../constants/fonts";
import { colors } from "../../constants/colors";
import { getFontSize, getHeight, getWidth } from "../../../utils/ResponsiveFun";

export const styles = StyleSheet.create({
  playerbtn: {
    height: getHeight(6),
    width: getWidth(13),
    borderRadius: getWidth(14) / 2,
    backgroundColor: 'rgb(189, 189, 189,0.1)',
    //opacity: 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: getWidth(92),
    height: getHeight(25),
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: getFontSize(2.3),
    fontFamily: fonts.Re,
    color: colors.white,
    fontWeight:"700"
  },
  btnCon: {
    height: getHeight(7),
    //backgroundColor: colors.black2,
    marginTop: getHeight(3),
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius:getFontSize(1),
    borderTopRightRadius:getFontSize(1)
  },
});
