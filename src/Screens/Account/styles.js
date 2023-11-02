import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  contaner: {
    alignItems: 'center',
  },
  accounttext: {
    color: '#006D65',
    // fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,

    letterSpacing: 0.5,
  },
  mainv: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: getWidth(85),
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.11,

    elevation: 5,
  },
  smview: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: getWidth(78),
    marginTop: getHeight(2),
  },
  sapert: {
    backgroundColor: '#90909060',
    width: getWidth(78),
    height: 0.5,
    marginTop: getHeight(2),
  },
  textt: {color: '#006D65', fontSize: 15},
});
