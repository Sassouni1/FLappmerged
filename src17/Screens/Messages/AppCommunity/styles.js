import {StyleSheet} from 'react-native';
import {fonts} from '../../../constants/fonts';
import {
  getFontSize,
  getHeight,
  getWidth,
} from '../../../../utils/ResponsiveFun';
import {colors} from '../../../constants/colors';

export const styles = StyleSheet.create({
  seprator: {
    marginTop: getHeight(0.5),
    width: getWidth(95),
    alignSelf: 'center',
  },
  timText: {
    fontSize: getFontSize(2),
    color: colors.gray3,
    fontFamily: fonts.UMe,
    alignSelf: 'flex-end',
    marginBottom: getHeight(1),
    marginRight: getWidth(3),
  },
  ruleText: {
    fontSize: 10,
    color: colors.graytext5,
    fontFamily: fonts.URe,
    marginLeft: getWidth(2),
  },
  Insideconn: {
    height: getHeight(15),
    backgroundColor: colors.secondary,
    borderRadius: 5,
    width: getWidth(62),
    marginLeft: getWidth(1),
  },
  headerCon: {
    height: getHeight(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  today: {
    fontSize: getFontSize(2),
    color: colors.graytext5,
    alignSelf: 'center',
    fontFamily: fonts.UMe,
    marginTop: getHeight(2),
  },
  sendBtn: {
    width: getWidth(15),
    backgroundColor: colors.greenlight,
    height: getHeight(7),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: getWidth(1),
    borderRadius: 5,
  },
  textinputCon: {
    width: getWidth(77),
    height: getHeight(7),
    backgroundColor: colors.secondary,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputCon: {
    position: 'absolute',
    bottom: getHeight(1.5),
    paddingHorizontal: getWidth(2),
    alignSelf: 'center',
    width: getWidth(95),
    height: getHeight(8),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sendMsgCon: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-end',
    width: getWidth(96),
    alignSelf: 'center',
    marginTop: getHeight(1),
  },
  rightIconCon: {
    height: getHeight(4),
    marginLeft: getWidth(1),
    width: getWidth(8),
    borderRadius: 25,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chaTcon: {
    height: getHeight(15),
    backgroundColor: colors.black,
    borderRadius: 5,
    width: getWidth(62),
    marginLeft: getWidth(1),
  },
  insideCon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHeight(12),
    paddingHorizontal: getWidth(5),
  },
  chattext: {
    fontSize: getFontSize(2),
    color: colors.white,
    fontFamily: fonts.URe,
  },
  timeText: {
    fontSize: getFontSize(2),
    color: colors.gray3,
    fontFamily: fonts.UMe,
    alignSelf: 'flex-end',
    marginBottom: getHeight(1),
    marginRight: getWidth(3),
  },
  recievedCon: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: getWidth(96),
    alignSelf: 'center',
    marginTop: getHeight(1),
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 13,
    margin: 3,
  },
});
