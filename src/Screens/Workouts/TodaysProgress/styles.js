import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';

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
  main: {
    flex: 1,
    
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
  WorkOutDays:{
    color: '#182d4a',
    fontFamily: 'Ubuntu-Bold',
    lineHeight: 14,
    marginTop: 5,
    marginBottom: getHeight(1),
    fontSize: 12,
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
  icon1: {
   
    position:'absolute',
    bottom:getHeight(9),
    left:getWidth(36),
   },
   text: {color: '#7D5098', alignSelf: 'center', fontSize: 12},
  Description:{
    color: '#182d4a',
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 14,
    textAlign:'left',
    width:getWidth(91),
    marginBottom: getHeight(1.5),
    fontSize: 12,
  },
  comments:{
    flexDirection:'row',
    alignItems:'center',
    marginLeft:getWidth(5),
    marginTop:getHeight(2)
      },
      img: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        flex: 1,
        marginTop: getHeight(5),
      },
  commentsBox:{
    width:getWidth(93),
    
    borderColor:'#182d4a26',
    borderWidth:0.7,
    
    marginTop:getHeight(1),
    backgroundColor:'white',
    borderRadius:15,
    alignSelf:'center',
  },
  footer:{height:getHeight(5),flexDirection:'row',alignItems:'flex-end',alignSelf:'flex-end',margin:10},
});
