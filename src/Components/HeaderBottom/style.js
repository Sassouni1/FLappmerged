import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  headerview: {
    width: getWidth(90),
    marginTop:getHeight(1),
    // height: getHeight(4.5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    alignItems: 'flex-end',
  
  },

  headingtext: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  headerTitle: {
    color: 'white',
    fontSize: 24,
    alignSelf: 'flex-end',
    marginBottom: 3,
    fontFamily: 'Russo_One',
    fontWeight:'600'
  },
});
