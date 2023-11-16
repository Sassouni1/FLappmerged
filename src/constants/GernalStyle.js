import { StyleSheet } from "react-native";
import { getFontSize, getHeight, getWidth } from "../../utils/ResponsiveFun";
import { colors } from "./colors";
import { fonts } from "./fonts";

export const GernalStyle = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: "white",
  },
  btnText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Ubuntu-Bold",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  btn: {
    alignSelf: "center",
    width: getWidth(90),
    height: getHeight(6),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  inputLabelStyle: {
    fontSize: 12,
    fontFamily: "Ubuntu-Light",
    color: "rgba(189, 189, 189, 1)",
    backgroundColor: "rgba(79, 79, 79, 0.1)",
  },
  input: {
    height: getHeight(6),
    width: getWidth(90),
    backgroundColor: "rgba(79, 79, 79, 1)",
    color: "white",
    justifyContent: "center",
    fontSize: getFontSize(1.6),
    // lineHeight:20,
    fontFamily: "Ubuntu-Regular",
    alignSelf: "center",
    paddingLeft: 5,
  },
  InputError: {
    color: "red",
    fontFamily: "Ubuntu-Regular",
    marginLeft: 10,
    marginTop: 3,
    // marginBottom: 2,
  },
  textinput: {
    marginTop: getHeight(2.5),
    backgroundColor: colors.secondary,
    width: getWidth(93),
    height: getHeight(7),
    borderRadius: 5,
    paddingLeft: getHeight(2.5),
    alignSelf: "center",
    fontFamily: fonts.URe,
    fontSize: getFontSize(1.9),
    color: colors.graytext4,
  },
  textInputMessage: {
    marginTop: getHeight(2.5),
    backgroundColor: colors.secondary,
    width: getWidth(93),
    height: getHeight(7),
    borderRadius: 5,
    paddingLeft: getHeight(2.5),
    alignSelf: "center",
    fontFamily: fonts.URe,
    fontSize: getFontSize(1.9),
    color: colors.graytext4,
  },
});
