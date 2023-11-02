import {StyleSheet} from 'react-native';
import {
  getHeight,
  getWidth,
} from '../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  contaner: {
    flex: 1,
  },
  datePickerStyle:{
    width:getWidth(88),
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    height:getHeight(5.5),
    borderWidth:0.5,
    borderRadius:15,
    borderColor:'#182d4a60',
  },
  filterWorkouts:{
    color: '#182d4a',
    fontFamily: 'Ubuntu-Bold',
    lineHeight: 14,
    marginLeft: 20,
    marginTop: 5,
    marginBottom: getHeight(1),
    fontSize: 12,
  },
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  firstListView:{
    alignSelf:'center',
    width: getWidth(90),
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  SetList:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ListNO3:{
    alignSelf: 'center',
    width: getWidth(90),
    backgroundColor: 'white',
    borderRadius: 15,
    height: getHeight(5.5),
  },
  session2:{
    color: '#182d4a30',
    fontSize: 12,
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 14,
  },
  TuesdayWorkOuts:{
    color: '#182d4a',
    marginRight: getWidth(15),
    fontFamily: 'Ubuntu-Regular',
    fontSize: 12,
    lineHeight: 12,
  },
 CheckedIcon:{
    height: 26,
    backgroundColor: '#182d4a',
    width: 26,
    borderRadius: 13,
    marginRight: getWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  Fixed2:{
    alignSelf: 'center',
    width: getWidth(90),
    backgroundColor: 'white',
    borderRadius: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  secondlistView:{
    alignSelf: 'center',
    width: getWidth(91),
    backgroundColor: 'white',
    borderRadius: 15,

    height: getHeight(5.5),
  },
  mondayWorkouts:{
    color: '#182d4a',
    marginRight: getWidth(15),
    fontFamily: 'Ubuntu-Regular',
    fontSize: 12,
    lineHeight: 12,
  },
  session1:{
    color: '#182d4a30',
    fontSize: 12,
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 14,
  },
  CheckIcon:{
    height: 26,
    backgroundColor: '#182d4a',
    width: 26,
    borderRadius: 13,
    marginRight: getWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  fixed:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  DateText:{
    fontFamily:'Ubuntu-Regular',
    fontSize:12,
    lineHeight:14,
    marginLeft:getWidth(3),
    color:'#182d4a',
  },
  DatePickerView:
  {
    width:getWidth(90),
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    alignSelf:'center',
    backgroundColor:'white',
    height:getHeight(6),
    borderWidth:0.9,
    borderRadius:15,
    borderColor:'#182d4a80',},
 
  text: {
    fontSize: 25,
    color: 'red',
    padding: 3,
    marginBottom: 10,
    textAlign: 'center'
  },
  datePicker: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: 320,
    height: 260,
    display: 'flex',
  },

});
