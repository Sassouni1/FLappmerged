import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../utils/ResponsiveFun';

export const GernalStyle = StyleSheet.create({
  continer: {
    flex: 1,
    backgroundColor: 'white',
  },
  btnText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Ubuntu-Bold',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  
  },
  btn: {
    alignSelf: 'center',
    width: getWidth(90),
    height: getHeight(6),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  inputLabelStyle:{fontSize: 12,fontFamily:'Ubuntu-Regular',color:'rgba(189, 189, 189, 1)',backgroundColor:'rgba(79, 79, 79, 0.1)'},
  input: {
    height: getHeight(6),
    width: getWidth(90),
    backgroundColor: 'rgba(79, 79, 79, 1)',
    color: 'white',
    justifyContent: 'center',
    fontSize: getFontSize(1.6),
    // lineHeight:20,
    fontFamily: 'Ubuntu-Regular',
    alignSelf: 'center',
    paddingLeft: 5,
  },
  InputError: {
    color: 'red',
    fontFamily: 'Ubuntu-Regular',
    marginLeft: 10,
    marginTop: 3,
    // marginBottom: 2,
  },
});
