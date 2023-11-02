import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  contaner: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
  },

  accounttext: {
    color: '#006D65',
    // fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 36,
    marginTop: 30,
    marginBottom: -5,
    letterSpacing: -0.5,
    alignSelf: 'center',
  },
  ttext: {
    fontSize: getFontSize(2),
    color: '#4F4F4F',
    fontWeight: '400',
    width: getWidth(75),
    marginBottom: 25,
    textAlign: 'center',
    alignSelf: 'center',
  },
  paid: {
    fontSize: 15,
    fontWeight: '400',
    color: '#02C4B7',
    width: getWidth(24),
    textAlign: 'center',
  },
  paid1: {
    fontSize: 13,
    fontWeight: '400',
    color: '#006D65',
    width: getWidth(44),
    padding: 5,
  },
  icon: {marginTop: getHeight(-1)},
  num: {fontSize: 14, fontWeight: '700', color: '#006D65'},
  box: {
    alignSelf: 'center',
    justifyContent: 'space-around',
    padding: 8,

    height: 170,
    width: getWidth(90),
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 2,
  },
  upv: {
    width: '95%',
    alignSelf: 'center',
  },
  issue: {
    marginLeft: 7,
    fontSize: 13,
    fontWeight: '400',
    color: '#006D65',
    alignSelf: 'flex-start',
  },
  date: {
    height: getHeight(6.3),

    alignSelf: 'flex-start',
    marginLeft: getWidth(2),

    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  videocall: {
    height: getHeight(4),
    width: getWidth(33),
    borderRadius: 20,
    backgroundColor: '#02C4B725',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Separator: {width: getWidth(50)},
  butt: {
    height: getHeight(4.5),
    width: getWidth(70),
    borderRadius: 20,
    backgroundColor: '#02C4B720',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
  },
  ttext2: {
    fontSize: getFontSize(2),
    color: '#006D65',
    fontWeight: '600',
    marginBottom: 25,
    textAlign: 'center',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
});
