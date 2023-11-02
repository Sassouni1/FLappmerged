import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  contaner: {
    justifyContent: 'space-between',
    flex: 1,
  },
  headig: {width: getWidth(90), marginVertical: getHeight(2)},

  mainview: {
    alignItems: 'center',
    height: getHeight(90),
    width: '100%',
    borderRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: '#FFFFFF',
    // justifyContent: 'space-around',

    paddingBottom: getHeight(8),
  },
  txtview: {
    width: getWidth(90),

    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    marginTop: getHeight(1),
  },
  txt: {
    color: '#182d4a',
    fontSize: 18,
    letterSpacing: 0.7,
    lineHeight: 20,
    fontFamily: 'Ubuntu-Bold',
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: getHeight(2),
    height: getHeight(7),
    justifyContent: 'space-around',
    backgroundColor: '#CDDAEC',

    alignSelf: 'center',
    borderRadius: 15,
    width: getWidth(90),
  },
  tabItem: {
    borderRadius: 10,
    backgroundColor: '#182d4a',
    alignItems: 'center',
    justifyContent: 'center',
    height: getHeight(5),
    width: getWidth(33),
    marginLeft: getWidth(5),
    marginRight: getWidth(5),
    alignSelf: 'center',
  },
  unselect: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    marginLeft: getWidth(5),
    marginRight: getWidth(5),
    justifyContent: 'center',
    height: getHeight(5),
  },
  selectedTabText: {
    
    color: 'white',
    fontFamily: 'Ubuntu-Bold',
    lineHeight: 17,
    fontSize: 14,
  },
  TabTex: {
    color: '#182d4a',
    
    fontFamily: 'Ubuntu-Bold',
    lineHeight: 17,
    fontSize: 14,
  },
  stxtview: {
    width: getWidth(89),
    marginTop: getHeight(2),
    marginVertical: getHeight(2),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  stxt: {
    color: '#182d4a',

    fontSize: 12,
    textAlign: 'justify',
    lineHeight: 16,
    fontFamily: 'Ubuntu-SemiBold',
  },
  accounttext: {
    color: '#006D65',
    // fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 26,
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
    // marginBottom: getHeight(2),
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
