import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  contaner: {
    flex: 1,
  },
  headerDivider: {
    height: 1,
    backgroundColor: '#182d4a26',
    borderRadius: 10,
    width: '93%',
    marginTop: 15,

    alignSelf: 'center',
  },
  listItem: {
    alignSelf: 'center',
    width: getWidth(91),
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: getWidth(5),
    height: getHeight(6),
    flexDirection: 'row',
    margin: 7,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  circle: {
    height: 26,
    backgroundColor: '#182d4a',
    width: 26,
    borderRadius: 13,
    marginRight: getWidth(5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#182d4a',
    marginRight: getWidth(15),
    fontFamily: 'Ubuntu-Regular',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 15,
  },
  alignView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  main: {
    alignSelf: 'center',
    width: getWidth(100),
    paddingTop: getHeight(2),
    height: getHeight(100),
  },
  WorkOutDays:{
    color: '#182d4a',
    fontFamily: 'Ubuntu-Bold',
    lineHeight: 14,
    marginLeft: 17,
    marginTop: 5,
    marginBottom: getHeight(1),
    fontSize: 12,
  },
  Description:{
    color: '#182d4a',
    fontFamily: 'Ubuntu-Regular',
    lineHeight: 14,
    marginLeft: 17,
    textAlign:'left',
    width:getWidth(91),
    marginBottom: getHeight(1.5),
    fontSize: 12,
  },
});
