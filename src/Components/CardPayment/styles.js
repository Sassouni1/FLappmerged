import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    // justifyContent: 'space-around',
  },
  icon: {
    marginTop: 6,
  },
  accounttext: {
    color: '#006D65',
    // fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 36,
    marginTop: 10,
  },
  Accimg: {
    alignItems: 'center',
  },
  headig: {
    width: getWidth(85),
    marginTop: getHeight(1),
    marginBottom: getHeight(2),
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
    width: '100%',

    backgroundColor: 'green',
    justifyContent: 'space-between',
  },

  txt: {
    color: '#182d4a',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.7,
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
    width: getWidth(40),
  },
  logintext: {
    color: '#FF6E00',
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    marginTop: getHeight(4),
  },
  forgottext: {
    color: '#4184FB',
    justifyContent: 'flex-end',
    fontWeight: '600',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    alignItems: 'flex-end',
  },
  linearGradient: {
    alignSelf: 'center',
    width: getWidth(90),
    marginTop: getHeight(5),
    height: getHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  forgotView: {
    marginTop: getHeight(1),
    height: getHeight(18),
    width: getWidth(90),
    borderRadius: 15,
    backgroundColor: '#182d4a15',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 3,
  },
  checkstyle: {
    flexDirection: 'row',
    marginTop: getWidth(3),
    marginLeft: getHeight(1.5),
    width: getWidth(45),
  },
  txtview:{
    height: getHeight(0.2),
    marginTop: getHeight(1),
    width: getWidth(55),
    backgroundColor: '#182d4a26',
  },
  nonvew:{
    height: getHeight(0.2),
    width: getWidth(55),
    backgroundColor: '#182d4a26',
  },
  month:{fontSize: 12, color: '#182d4a', fontFamily:'Ubuntu-Regular'},
  dolar:{fontSize: 24, color: '#182d4a', fontFamily:'Ubuntu-Bold'},
  paymentdetail: {fontSize: 12,
  color: '#182d4a',
  alignSelf: 'center',
  fontFamily:'Ubuntu-Regular'},

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
