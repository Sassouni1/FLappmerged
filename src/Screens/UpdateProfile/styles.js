import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerDivider: {
    height: 1,
    backgroundColor: '#182d4a26',
    borderRadius: 10,
    width: '93%',
    marginTop: 15,

    alignSelf: 'center',
  },

  accounttext: {
    color: '#006D65',
    // fontFamily: 'Poppins-Bold',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 36,
    marginBottom: 30,
    letterSpacing: -0.5,
  },
  linearGradient: {
    alignSelf: 'center',
    width: getWidth(90),
    marginTop: getHeight(4),
    height: getHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  userProfile: {
    width: 140,
    height: 130,
    marginTop: getHeight(3),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  userName: {
    color: '#182d4a',
    
    fontSize: 18,
    lineHeight: 21,
    fontFamily: 'Ubuntu-Bold',
    marginVertical: getHeight(1),
  },
  userEmail: {
    color: '#182d4a',
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 15,
    fontSize: 12,
    marginBottom: getHeight(4),
  },
  userView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: getHeight(1),
  },
});
