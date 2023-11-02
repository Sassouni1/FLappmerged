import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  contaner: {
    alignItems: 'center',
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#182d4a26',
    borderRadius: 10,
    width: '93%',
    marginTop: 15,

    alignSelf: 'center',
  },
  imageLabel: {
    color: '#182d4a',
    fontSize: 12,
    lineHeight: 15,
    
    fontFamily: 'Ubuntu-Bold',
  },
  heading: {
    color: '#182d4a',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 12,
    lineHeight: 15,
   
    marginBottom: getHeight(1),
  },
  label: {
    color: '#182d4a',
    fontSize: 12,
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 15,
    
    marginBottom: getHeight(2),
  },
  img:{
    width: getWidth(30),
    height: getHeight(8),
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    flex:1,
    
  },
  listError:{color:'#182d4a',fontFamily:'Ubuntu-Bold',fontSize:10, justifyContent:'center',
  alignItems:'center',
  alignSelf:'center',},
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
    width: getWidth(88),
    marginBottom: getHeight(15),
    height: getHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  image: {
    width: getWidth(35),
    marginLeft: getWidth(4.5),
    height: getHeight(12),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#182d4a15',
  },
});
