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
  WorkOutSession:{
    color: '#182d4a',
    fontWeight: '400',
    marginLeft: 20,
    fontFamily: 'Ubuntu-Regular',
    marginTop: 5,
    fontSize: 12,
    lineHeight: 15,
  },
  QuestionList:{
    alignSelf: 'center',
    width: getWidth(90),
    marginTop: getHeight(2),
    height: getHeight(6),
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: getWidth(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
  questionText:{
    color: '#182d4a',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 12,
    lineHeight: 15,
  },
 answer:{
    color: '#182d4a',
    panding: 5,
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'justify',
    lineHeight: 15,
    letterSpacing: 0.5,
    width: getWidth(80),
  },
  questonlist1:{
    alignSelf: 'center',
    width: getWidth(91),
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: getHeight(2),
    borderRadius: 15,
  },
 
  faqListView:{
    alignSelf: 'center',
    width: getWidth(90),
    height: getHeight(6),
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: getWidth(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
 
});
