// import { StyleSheet } from "react-native";
// import { getFontSize,getHeight,getWidth } from "../../../../utils/ResponsiveFun";
// import { fonts } from "../../../constants/fonts";
// import { colors } from "../../../constants/colors";

// export const styles = StyleSheet.create({
//     weekDayContainer: {
//       marginRight: 10,
//       padding: 10,
//       backgroundColor: colors.secondary,
//       borderRadius: 10,
//       height: getHeight(11),
//       margin: 15,
//       marginLeft: getWidth(4),
//       padding: 17,
//     },
//     dayOfWeek: {
//       fontSize: 14,
//       fontFamily:fonts.Re,
//       color:colors.white,
//     },
//     thumbnail: {
//       backgroundColor: colors.white,
//       justifyContent: 'center',
//       height:65,
//       width: 85,
//       borderRadius: 10,
//       alignItems: 'center',
//     },
//     date: {
//       fontFamily: 'Ubuntu-Bold',
//       fontSize: 20,
//       color: '#ffff',
//     },
//     header: {
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'flex-start',
//       paddingHorizontal: getWidth(3),
//       paddingVertical: getHeight(2),
//     },
//     header1: {
//       flexDirection: 'row',
//       alignItems: 'center',
//     //   justifyContent: 'flex-start',
//       paddingHorizontal: getWidth(3),
//       paddingVertical: getHeight(0.7),
//     },
//     title: {
//       flex: 1,
//       fontSize: getFontSize(3.2),
//       fontFamily: fonts.Re,
//       color: colors.white,
//       marginLeft: getWidth(2),
//       // textAlign: 'center',
//     },
//     Exercisetitle: {
//       flex: 1,
//       fontSize: getFontSize(2.2),
//       fontFamily: fonts.Re,
//       color: colors.white,
//       marginLeft: getWidth(2),
//       // textAlign: 'center',
//     },
//     img: {
//       justifyContent: 'center',
//       height: getHeight(10),
//       width: getWidth(19),
//       alignItems: 'center',
//     },
//     text: {
//       color: colors.white,
//       fontSize: 15,
//       fontFamily: fonts.UBo,
//       marginLeft: getWidth(5),
//     },
//     dayconn: {
//       width: getWidth(13),
//       borderRadius: 5,
//       height: getHeight(14),
//       backgroundColor: colors.dayConColor,
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginRight: getWidth(1),
//     },
//     dayText: {fontSize: 13, color: colors.white, fontFamily: fonts.URe},
//     datetexxt: {
//       fontSize: 22,
//       color: colors.white,
//       fontFamily: fonts.UBo,
//       marginTop: getHeight(0.5),
//     },
//     workt: {
//       color: colors.white,
//       fontFamily: fonts.UBo,
//       fontSize: getFontSize(2.5),
//     },
//     startwork: {
//       width: getWidth(66),
//       height: getHeight(7.5),
//       backgroundColor: colors.greenlight,
//       borderRadius: 5,
//       position: 'absolute',
//       bottom: getHeight(3),
//       alignSelf: 'center',
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     isTimeCon: {
//       height: getHeight(10),
//       width: getWidth(100),
//       paddingHorizontal: getWidth(3),
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginTop: getHeight(3),
//       marginBottom: getHeight(2),
//     },
//     sep: {
//       width: getWidth(95),
//       alignSelf: 'center',
//       marginTop: getHeight(2),
//     },
//     spacebet: {
//       paddingHorizontal: getWidth(3),
//       flexDirection: 'row',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       marginTop: getHeight(3),
//     },
//     chest: {
//       color: colors.white,
//       fontSize: getFontSize(2.8),
//       fontFamily: fonts.Re,
//     },
//     total: {
//       fontSize: getFontSize(1.7),
//       color: colors.graytext5,
//       fontFamily: fonts.Re,
//     },
//     heading: {
//       fontSize: getFontSize(2.2),
//       color: colors.white,
//       fontFamily: fonts.UBo,
//     },
//     conImg: {
//       paddingHorizontal: getWidth(3),
//       flexDirection: 'row',
//       alignItems: 'center',
//       marginTop: getHeight(1.5),
//     },
//   });

import { StyleSheet } from "react-native";
import {
  getHeight,
  getFontSize,
  getWidth,
} from "../../../../utils/ResponsiveFun";
import { fonts } from "../../../constants/fonts";
import { colors } from "../../../constants/colors";

export const styles = StyleSheet.create({
  workt: {
    color: colors.white,
    fontFamily: fonts.UBo,
    fontSize: getFontSize(2.5),
  },
  startwork: {
    width: getWidth(66),
    height: getHeight(7.5),
    backgroundColor: colors.greenlight,
    borderRadius: 5,
    position: "absolute",
    bottom: getHeight(3),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  isTimeCon: {
    height: getHeight(10),
    width: getWidth(100),
    paddingHorizontal: getWidth(3),
    flexDirection: "row",
    alignItems: "center",
    marginTop: getHeight(3),
    marginBottom: getHeight(2),
  },
  sep: {
    width: getWidth(95),
    alignSelf: "center",
    marginTop: getHeight(2),
  },
  spacebet: {
    paddingHorizontal: getWidth(3),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: getHeight(3),
  },
  thumbnail: {
    backgroundColor: colors.white,
    justifyContent: "center",
    height: 65,
    width: 85,
    borderRadius: 10,
    alignItems: "center",
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
  conImg: {
    paddingHorizontal: getWidth(3),
    flexDirection: "row",
    alignItems: "center",
    marginTop: getHeight(1.5),
  },
  heading: {
    fontSize: getFontSize(2.6),
    color: colors.white,
    fontFamily: fonts.UBo,
  },
  dayconn: {
    width: getWidth(13),
    borderRadius: 5,
    height: getHeight(15),
    backgroundColor: colors.timeCon,
    justifyContent: "center",
    alignItems: "center",
    marginRight: getWidth(1),
  },
  dayText: {
    fontSize: getFontSize(1.9),
    color: colors.buttonColor,
    fontFamily: fonts.URe,
  },
  datetexxt: {
    fontSize: 22,
    color: colors.buttonColor,
    fontFamily: fonts.UBo,
    marginTop: getHeight(0.5),
  },
  calenderStyle: {
    height: getHeight(8),
    width: getWidth(11),
    borderRadius: getFontSize(0.5),
    backgroundColor: colors.calendar,
    borderWidth: 0,
  },
});
