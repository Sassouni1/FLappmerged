import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import { colors } from '../../constants/colors';
import { fonts } from '../../constants/fonts';

export const styles = StyleSheet.create({
  contaner: {
    alignItems: 'center',
    flex: 1,
  },
  headig: {width: getWidth(85)},
  mainview: {
    alignItems: 'center',
    height: getHeight(100),
    width: '100%',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    marginTop: getHeight(8),
  },
  accounttext: {
    color: colors.buttonColor,
    // fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 25,
    marginTop: getHeight(2),
  },
  ttext: {
    fontSize: getFontSize(1.8),
    color: colors.white,
    fontWeight: '400',
    width: getWidth(75),
    marginBottom: getHeight(2),
    textAlign: 'center',
    alignSelf: 'center',
    lineHeight: 20,
    marginTop: getHeight(1),
    fontFamily: fonts.URe,
  },
  Separator: {padding: 3},
  ttext2: {
    fontSize: getFontSize(2),
    color: '#006D65',
    fontWeight: '600',
    margin: 8,
    textAlign: 'center',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 2.65,

    elevation: 2,
  },
  ttext23: {
    fontSize: getFontSize(2),
    color: '#FFFFFF',
    fontWeight: '600',

    textAlign: 'center',
    padding: 12,
    margin: 8,
    marginHorizontal: 0,
    borderRadius: 5,
    backgroundColor: '#FF6E00',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.29,
    shadowRadius: 2.65,

    elevation: 2,
  },
  Accimg: {
    alignItems: 'center',
  },
  inputheading: {
    color: '#2B2D2F',
    fontFamily: 'Poppins-Light',
    padding: 4,

    fontWeight: 'bold',
  },

  radioption: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  radiotext: {
    color: '#2B2D2F',
    alignItems: 'center',
    // marginTop: 3,
  },

  btntxtstyle: {fontSize: getFontSize(2), color: '#FFFFFF', fontWeight: '700'},
  checkboxtext: {
    fontFamily: 'Poppins-Medium',
    color: '#2B2D2F',
    fontWeight: '400',
    fontSize: 12,
  },
  logintext: {
    color: '#FF6E00',

    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
  },
  logintextView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',

    paddingBottom: 20,
    marginTop: getHeight(3),

    flexDirection: 'row',
  },

  checkstyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: getHeight(2),
    width: getWidth(80),
  },

  textintext: {
    color: '#48AFC9',
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
  },
});
