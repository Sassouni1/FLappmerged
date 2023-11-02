import {StyleSheet} from 'react-native';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';

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
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: getHeight(2),
    marginBottom: getHeight(2),
    height: getHeight(7),
    justifyContent: 'space-around',
    backgroundColor: '#CDDAEC',

    alignSelf: 'center',
    borderRadius: 15,
    width: getWidth(90),
  },
  tabItem: {
    borderRadius: 10,
    backgroundColor: '#182d4a',
    alignItems: 'center',
    justifyContent: 'center',
    height: getHeight(4),
    width: getWidth(33),
    marginLeft: getWidth(5),
    marginRight: getWidth(5),
    alignSelf: 'center',
  },
  unselect: {
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
    marginLeft: getWidth(5),
    marginRight: getWidth(5),
    justifyContent: 'center',
    height: getHeight(5),
  },
  selectedTabText: {
  
    color: '#182d4a',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 14,
    lineHeight: 17,
  },
  TabTex: {
    fontFamily: 'Ubuntu-Bold',
    fontSize: 14,
    lineHeight: 17,
    color: '#182d4a',
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
});
