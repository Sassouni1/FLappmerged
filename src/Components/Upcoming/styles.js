import {StyleSheet} from 'react-native';
import {
  getFontSize,
  getHeight,
  getWidth,
} from '../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  contaner: {
    flex: 1,
  },
  WorkOutDays:{
    color: '#182d4a',
    fontFamily: 'Ubuntu-Bold',
    lineHeight: 14,
    marginLeft: 20,
    marginTop: 6,
    marginBottom: getHeight(1.7),
    fontSize: 14,
  },
  img:{
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    flex:1,
    marginTop:getHeight(15),
  },
  listError:{color:'#182d4a',fontFamily:'Ubuntu-Bold',fontSize:15, justifyContent:'center',
  alignItems:'center',
  alignSelf:'center',  marginTop:getHeight(2),},
  check:{
    height: 26,
    backgroundColor: '#182d4a',
    width: 26,
    borderRadius: 13,
    marginRight: getWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  check1:{
    height: 26,
    backgroundColor: '#182d4a',
    width: 26,
    borderRadius: 13,
    marginRight: getWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  complete:{
    color: '#182d4a',
    fontSize: 12,

    fontWeight: '400',
  },
  mainview:{ 
    height:getHeight(70),
    width:getWidth(90),
    backgroundColor:'white',
    borderRadius:15,
    alignItems:'center',
  },
  taskview:{
    color:'#182d4a',
    fontSize:18,
    fontFamily:'Ubuntu-Bold'
  },
  secView:{
    width:getWidth(99),
    justifyContent:'space-around',
    alignContent:'center',
    alignItems:'center',
    flexDirection:'row'
  },
  workoutsNumbring:{
    color:'white',
    fontFamily: 'Ubuntu-Bold',
    fontSize:12,
  },
  viewsetup:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionIn:{
    alignSelf: 'center',
    width: getWidth(90),
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  WorkoutText:{
    color: '#182d4a',
    marginRight: getWidth(15),
    fontFamily: 'Ubuntu-Regular',
    fontSize: 13,
    fontWeight: '400',
    width:getWidth(40),
    lineHeight: 15,
  },
  Sections:{
    alignSelf: 'center',
    width: getWidth(91),
    backgroundColor: 'white',
    borderRadius: 15,
    height: getHeight(5.5),
  },
  viewed:{
    height: 26,
    backgroundColor: '#E1DBE5',
    width: 26,
    borderRadius: 13,
    marginRight: getWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Description:{
    color: '#182d4a',
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 14,
    marginLeft: 20,
    textAlign:'left',
    width:getWidth(91),
    marginBottom: getHeight(1.5),
    fontSize: 12,
  }
});
