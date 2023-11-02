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
  icon: {
    marginTop: 6,
  },
  icon1: {
   
   position:'absolute',
   top:3,
   right:0,
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
  heading: {
    color: '#182d4a',
    fontFamily: 'Ubuntu-Bold',
    lineHeight: 15,
    fontSize: 12,
    
    marginLeft: getWidth(6),
  },
  text: {color: '#A47CBC', alignSelf: 'center', fontSize: 12},
  linearGradient: {
    alignSelf: 'center',
    width: getWidth(35),
color:'#A47CBC',
    height: getHeight(5.5),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  mview: {
    height: getHeight(15),
    width: getWidth(90),

    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  skip: {
    color: '#EB5757',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 14,
    lineHeight: 17,
  },
  dropdown1BtnTxtStyle: {
    color: '#797D7F',
    textAlign: 'left',
    fontSize:getHeight(2.2),
  },
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444'},
});
