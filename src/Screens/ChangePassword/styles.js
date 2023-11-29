import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import { colors } from '../../constants/colors';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export const styles = StyleSheet.create({
  contaner: {
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor:colors.primary
  },
  accounttext: {
    color: '#ffffff',
    // fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 22,
    lineHeight: 36,
    textAlign: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#182d4a26',
    borderRadius: 10,
    width: '93%',
    marginTop: 15,

    alignSelf: 'center',
  },
  Accimg: {
    alignItems: 'center',
  },
  gogletext: {color: '#EB5757', fontWeight: '700'},
  googleview: {
    width: getWidth(40),
    backgroundColor: '#EB575725',
    height: getHeight(5.5),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  icon: {
     marginTop: getFontSize(1),
    // height:getFontSize(4),
  },
  socialmedia: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: getHeight(2),
    width: getWidth(85),
  },
  inputheading: {
    color: '#2B2D2F',
    fontFamily: 'Poppins-Light',
    padding: 5,
    marginTop: 20,
    fontWeight: 'bold',
  },
  inputsty: {
    // borderColor: '#BDC3C4',

    borderRadius: 70,
    height: getHeight(5.5),
    width: getWidth(88),
    marginTop: getHeight(0.5),
    fontSize: 12,
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
  },
  radioption: {
    flexDirection: 'row',
  },
  radiotext: {
    color: '#2B2D2F',
    alignItems: 'center',
    marginTop: 6,
  },
  batonstyle: {
    backgroundColor: '#48AFC9',
    height: getHeight(5.5),
    width: getWidth(88),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getHeight(2),
  },
  mainview: {
    alignItems: 'center',
    height: getHeight(90),
    width: '100%',
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
  },
  ortext: {
    color: '#BDC3C4',
    textTransform: 'capitalize',
    marginTop: getHeight(2.5),
  },
  btntxtstyle: {fontSize: getFontSize(2), color: '#FFFFFF', fontWeight: '700'},
  checkboxtext: {
    fontFamily: 'Poppins-Medium',
    color: '#2B2D2F',
    fontWeight: '400',
    fontSize: 12,
    width: getHeight(40),
  },
  logintext: {
    color: '#02C4B7',
    fontWeight: '700',
    fontFamily: 'Poppins-Medium',
    marginTop: getHeight(2),
  },
  forgottext: {
    color: '#9B654C',
    marginRight: getWidth(5),
    fontWeight: '700',
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
  },
  forgotView: {
    width: '100%',
    marginBottom: getHeight(0.5),
    paddingBottom: 5,

    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  checkstyle: {
    flexDirection: 'row',
    marginTop: getWidth(3),
    marginLeft: getHeight(1.5),
    width: getHeight(45),
  },

  textintext: {
    color: '#48AFC9',
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
  },
  logintextView: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // marginBottom: getHeight(2),

    flexDirection: 'row',
  },
});
