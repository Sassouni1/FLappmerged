import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    alignItems: 'center',
  },
  main: {
    alignSelf: 'center',
    width: getWidth(100),
    height:getHeight(100),
    flex: 1,
  },
  listItem: {
    alignSelf: 'center',
    width: getWidth(90),
    backgroundColor: 'white',
    borderRadius: 15,
    marginTop: getHeight(2),
    paddingTop:getHeight(1),
 height:getHeight(8),
    flexDirection: 'row',
    paddingHorizontal: getWidth(5),
    justifyContent: 'space-between',
    alignItems:'center',

  },
  heading: {
    color: '#182d4a',
  
    fontSize: 12,
   
    fontFamily: 'Ubuntu-Regular',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 10,
    
  },
  emptImg:{
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    flex:1,
    marginTop:getHeight(15),
  },
  description: {
    color: '#BDBDBD',
    alignSelf:'flex-start',
    fontSize: 10,
    fontFamily: 'Ubuntu-Bold',
    lineHeight: 12,
    marginTop: 5,
  },
 
  listError:{color:'#182d4a',fontFamily:'Ubuntu-Bold',fontSize:15, justifyContent:'center',
  alignItems:'center',
  alignSelf:'center',  marginTop:getHeight(2),},
  rowBack: {
    alignItems: 'center',
    
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
},
backRightBtn: {
  alignItems: 'center',
  bottom: 0,
  justifyContent: 'center',
  position: 'absolute',
  top: 0,
  right: 0,
  width: 90,
},
backRightBtnRight: {
 
  right: 0,
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
    
    fontSize: 16,
    lineHeight: 36,
    marginBottom: 30,
    letterSpacing: -0.5,
  },
  mview: {
    height: getHeight(12),
    width: getWidth(88),
    justifyContent: 'space-between',

    alignItems: 'center',

    flexDirection: 'row',
    alignSelf: 'center',
  },
  skip: {color: '#EB5757', fontSize: 12 ,},
  linearGradient: {
    alignSelf: 'center',
    width: getWidth(30),
    height: getHeight(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
});
