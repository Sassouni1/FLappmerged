import {StyleSheet, Platform, StatusBar} from 'react-native';
import {getStatusBarHeight} from 'react-native-safearea-height';

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios'
    ? getStatusBarHeight(true)
    : StatusBar.currentHeight;
export default StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
