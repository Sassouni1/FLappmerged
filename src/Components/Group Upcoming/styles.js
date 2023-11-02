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
    marginTop: 5,
    marginBottom: getHeight(2),
    fontSize: 12,
  },
  check:{
    height: 26,
    backgroundColor: '#182d4a',
    width: 26,
    borderRadius: 13,
    marginRight: getWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  complete:{
    color: '#182d4a30',
    fontSize: 12,

    fontWeight: '400',
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
    fontSize: 12,
    fontWeight: '400',
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
