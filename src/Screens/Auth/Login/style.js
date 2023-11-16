import { StyleSheet } from "react-native";
import {
  getFontSize,
  getHeight,
  getWidth,
} from "../../../../utils/ResponsiveFun";

export const styles = StyleSheet.create({
  contaner: { flex: 1, backgroundColor: "rgba(51, 51, 51, 1)" },
  icon: {
    marginTop: 6,
  },
  accounttext: {
    color: "#006D65",
    // fontFamily: 'Poppins-Bold',
    fontWeight: "700",
    fontSize: 16,
    lineHeight: 36,
    marginTop: 10,
  },
  Accimg: {
    alignItems: "center",
  },
  headig: {
    width: getWidth(85),
    marginTop: getHeight(1),
    marginBottom: getHeight(2),
  },
  gogletext: { color: "#EB5757", fontWeight: "700" },
  googleview: {
    width: getWidth(40),
    backgroundColor: "#EB575725",
    height: getHeight(5.5),
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
  },
  socialmedia: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: getHeight(2),
    width: getWidth(85),
  },
  inputheading: {
    color: "#2B2D2F",
    fontFamily: "Poppins-Light",
    padding: 5,
    marginTop: 20,
    fontWeight: "bold",
  },
  inputsty: {
    // borderColor: '#BDC3C4',

    borderRadius: 70,
    height: getHeight(5.5),
    width: getWidth(88),
    marginTop: getHeight(0.5),
    fontSize: 12,
    paddingLeft: 10,
    backgroundColor: "#FFFFFF",
  },
  radioption: {
    flexDirection: "row",
  },
  radiotext: {
    color: "#2B2D2F",
    alignItems: "center",
    marginTop: 6,
  },
  batonstyle: {
    backgroundColor: "#48AFC9",
    height: getHeight(5.5),
    width: getWidth(88),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: getHeight(2),
  },
  mainview: {
    // alignItems: "",
    paddingHorizontal: getFontSize(3),

    marginTop: getHeight(20),

    justifyContent: "center",
  },
  txtview: {
    width: getWidth(89),

    justifyContent: "center",
    alignItems: "center",
    marginTop: getHeight(2),
  },
  stxtview: {
    width: getWidth(89),
    marginTop: getHeight(2),
    marginVertical: getHeight(2),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  stxt: {
    color: "#182d4a",

    fontSize: 12,
    textAlign: "justify",
    lineHeight: 16,
    fontFamily: "Ubuntu-SemiBold",
  },
  txt: {
    color: "white",

    fontSize: 26,
    fontWeight: "800",
    alignSelf: "center",
    fontFamily: "Russo_One",
  },
  txt2: {
    color: "white",
    alignSelf: "flex-start",
    //marginLeft: getWidth(5),
    marginBottom: getHeight(1),
    fontSize: 24,
    fontWeight: "800",

    fontFamily: "Russo_One",
  },
  ortext: {
    color: "#BDC3C4",
    textTransform: "capitalize",
    marginTop: getHeight(2.5),
  },
  btntxtstyle: {
    fontSize: getFontSize(2),
    color: "#FFFFFF",
    fontWeight: "700",
  },
  checkboxtext: {
    fontFamily: "Poppins-Medium",
    color: "#2B2D2F",
    fontWeight: "400",
    fontSize: 12,
    width: getWidth(40),
  },
  logintext: {
    color: "#FF6E00",
    fontWeight: "600",
    fontFamily: "Poppins-Medium",
    marginTop: getHeight(4),
  },
  forgottext: {
    color: "rgba(247, 147, 0, 1)",
    justifyContent: "flex-end",

    fontFamily: "Ubuntu-Bold",
    fontSize: 14,
    alignItems: "flex-end",
  },
  linearGradient: {
    alignSelf: "center",
    width: getWidth(88),

    height: getHeight(6),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  forgotView: {
    marginBottom: getHeight(0.5),
    paddingBottom: 3,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  checkstyle: {
    flexDirection: "row",
    marginTop: getWidth(3),
    marginLeft: getHeight(1.5),
    width: getWidth(45),
  },

  textintext: {
    color: "#48AFC9",
    fontFamily: "Poppins-Bold",
    fontWeight: "bold",
  },
  logintextView: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    // marginBottom: getHeight(2),

    flexDirection: "row",
  },
});
