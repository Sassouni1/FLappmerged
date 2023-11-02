import {StyleSheet} from 'react-native';
import {
  getFontSize,
  getHeight,
  getWidth,
} from '../../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  contaner: {
    flex: 1,
  },
  mview: {
    height: getHeight(12),
    width: getWidth(88),
    justifyContent: 'space-between',

    alignItems: 'center',

    flexDirection: 'row',
    alignSelf: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    width: getWidth(90),
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#182d4a26',
    borderRadius: 10,
    width: '93%',
    marginTop: 15,

    alignSelf: 'center',
  },
  skip: {color: '#EB5757', fontWeight: '400', fontSize: 12},
  linearGradient: {
    alignSelf: 'center',
    width: getWidth(88),
    position: 'absolute',
    bottom: getHeight(5),
    height: getHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  WorkOutDays: {
    color: '#182d4a',
    fontFamily: 'Ubuntu-Bold',
    lineHeight: 14,
    marginTop: 5,
    marginBottom: getHeight(1),
    fontSize: 12,
  },
  Description: {
    color: '#182d4a',
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 14,
    textAlign: 'left',
    width: getWidth(91),
    marginBottom: getHeight(1.5),
    fontSize: 12,
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: getWidth(5.5),
  },
  mainview: {
    height: getHeight(30),
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
   
  },
  taskview: {
    color: '#182d4a',
    fontSize: 18,
    fontFamily: 'Ubuntu-Bold',
  },
  secView: {
    width: getWidth(99),
    justifyContent: 'space-around',
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  img: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    marginTop: getHeight(5),
  },
  listError: {
    color: '#182d4a',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: getHeight(1),
  },
  commentsBox: {
    width: getWidth(93),
    borderColor: '#182d4a26',
    borderWidth: 0.7,
    marginTop: getHeight(1),
    backgroundColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    //justifyContent: 'center',
  },
  icon1: {
    position: 'relative',
    marginLeft: getWidth(25),
  },
  image: {
    width: getWidth(20),
    marginLeft: getWidth(2.5),
    height: getHeight(8),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#182d4a15',
  },
  prof: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginLeft: 10,
    marginTop: 10,
  },
  footer: {
    height: getHeight(5),
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    margin: 10,
  },
  icon1: {
   
    position:'absolute',
    top:0,
    right:0,
   },
   
});
