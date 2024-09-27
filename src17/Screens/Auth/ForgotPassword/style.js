import {StyleSheet} from 'react-native';
import {
  getFontSize,
  getHeight,
  getWidth,
} from '../../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    justifyContent: 'space-between',
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
  icon: {
    marginTop: 6,
  },
  stxt: {
    color: 'white',
    marginLeft:getWidth(5),
    marginTop:getHeight(5),
    fontSize: getFontSize(1.7),
    // textAlign: 'justify',
    lineHeight: 20,
    fontFamily: 'Ubuntu-Bold',
    width: getWidth(70),
    paddingBottom: getHeight(1),
  },
  stxtview: {
    width: getWidth(90),
    marginTop: getHeight(2.5),
    color: '#182d4a',
    justifyContent: 'center',
    alignItems: 'center',
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
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,

    justifyContent: 'space-between',
    paddingBottom: getHeight(70),
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
    color: '#7D5098',
    
    fontFamily: 'Ubuntu-Bold',
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
