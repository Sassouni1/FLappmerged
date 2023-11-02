import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import { fonts } from '../../constants/fonts';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  contaner: {flex: 1, backgroundColor: 'rgba(51, 51, 51, 1)'},
  headerTitle: {
    color: '#182d4a',

    fontSize: 18,
    alignSelf: 'flex-end',
    marginBottom: 3,
    fontFamily: 'Ubuntu-Bold',
  },
  eliteconnn:{
    height: getHeight(5),
    width: getWidth(43),
    marginLeft: getWidth(3),
  },
  playerbtn:{
    height: getHeight(7),
    width: getHeight(7),
    borderRadius: getHeight(7) / 2,
    backgroundColor: colors.graytext5,
    opacity: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome:{
 
    color: colors.white,
 
    fontSize: getFontSize(3.2),
    fontFamily: fonts.Re,
  },
  header: {
    height: getHeight(8),
    position: 'absolute',
    top: getHeight(4.2),
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: getWidth(2),
    // justifyContent: 'space-between',
    justifyContent: 'space-between',
    width: getWidth(100),
    paddingHorizontal: getWidth(3),
  },
  dotCon: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginRight: getWidth(45),
  },
  dot: {
    height: getHeight(1),
    width: getHeight(1),
    backgroundColor: colors.white,
    borderRadius: getHeight(1) / 2,
  },
  imageCon: {
    height: getHeight(10),
    paddingHorizontal: getWidth(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {height: getHeight(8), width: getWidth(16)},
  elite: {fontSize: getFontSize(2), fontFamily: fonts.Re, color: colors.white},
  custom: {
    fontSize: getFontSize(1.3),
    fontFamily: fonts.UMe,
    color: colors.white,
    marginTop: getHeight(0.8),
  },
  greenbtn: {
    marginRight: getWidth(6),
    marginTop: getHeight(1),
    backgroundColor: colors.greenlight,
    marginBottom: getHeight(1),
    height: getHeight(4),
    borderRadius: 5,
    width: getWidth(26),
    justifyContent: 'center',
    alignItems: 'center',
  },
  call: {
    color: colors.white,
    fontSize: getFontSize(1.6),
    fontFamily: fonts.UBo,
  },
  paragraph: {
    fontSize: getFontSize(1.4),
    color: colors.graytext5,
    fontFamily: fonts.URe,
    marginLeft: getWidth(2.8),
  },
  para2: {
    fontSize: getFontSize(1.4),
    color: colors.graytext5,
    fontFamily: fonts.URe,
    marginLeft: getWidth(2.8),
    marginTop: getHeight(0.3),
  },
  nutration: {
    fontSize: getFontSize(1.4),
    color: colors.graytext5,
    fontFamily: fonts.URe,
    marginTop: getHeight(0.5),
    paddingHorizontal: getWidth(2.5),
  },
  live: {
    fontSize: getFontSize(1.4),
    color: colors.graytext5,
    fontFamily: fonts.URe,
    marginTop: getHeight(0.4),
    paddingHorizontal: getWidth(2.5),
  },
  eliteCon: {
    width: getWidth(94),
    backgroundColor: colors.homeConColor,
    alignSelf: 'center',
    borderRadius: 7,
  },
  img:{
    height: getHeight(35),
    paddingTop:getHeight(5),
    paddingBottom:getHeight(2),
    width: getWidth(100),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
