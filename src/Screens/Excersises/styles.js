import {Platform, StyleSheet} from 'react-native';
import {getHeight, getWidth, getFontSize} from '../../../utils/ResponsiveFun';
import {colors} from '../../constants/colors';
import {fonts} from '../../constants/fonts';

export const styles = StyleSheet.create({
  listCon: {
    // height: getHeight(8),
    // paddingHorizontal: getWidth(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    justifyContent: 'center',
    height: getHeight(10),
    width: getWidth(19),
    alignItems: 'center',
  },
  playerCon: {
    width: getWidth(8),
    height: getHeight(4),
    borderRadius: 25,
    backgroundColor: colors.white,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.white,
    fontSize: getFontSize(2.2),
    fontFamily: fonts.UBo,
    marginLeft: getWidth(5),
    fontWeight:"600"
  },
  descriptionText: {
    color: colors.white,
    fontSize: getFontSize(1.5),
    fontFamily: fonts.Re,
    marginLeft: getWidth(5),
    width:getWidth(70),
    marginTop:getHeight(0.5)
  },
  thumbnail: {
    backgroundColor: colors.white,
    justifyContent: 'center',
    height: getHeight(7),
    width: getWidth(19),
    borderTopLeftRadius: getFontSize(0.6),
    borderBottomLeftRadius:getFontSize(0.6),
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 10, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 5,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
