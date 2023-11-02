import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';

export const styles = StyleSheet.create({
  contaner: {flex: 1, backgroundColor: 'white'},
  headerTitle: {
    color: '#182d4a',
    
    fontSize: 18,
    alignSelf: 'flex-end',
    marginBottom: 3,
    fontFamily: 'Ubuntu-Bold',
  },
  userImage: {
    width: 37,
    height: 37,

    borderRadius: 10,
  },
  headerView: {
    width: getWidth(87),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
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
  main: {
    alignSelf: 'center',
    width: getWidth(100),
    height: getHeight(50),
  },
  listItem: {
    marginTop: getHeight(2.5),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: getWidth(91),
    backgroundColor: 'white',
    borderRadius: 15,

    paddingHorizontal: getWidth(5),
    height: getHeight(6),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 1,

    elevation: 1.5,
  },
  itemTitle: {
    color: '#182d4a',
    
    fontSize: 12,
    lineHeight: 15,
    fontFamily: 'Ubuntu-Bold',
  },
});
