import {StyleSheet, Platform, StatusBar} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getStatusBarHeight} from 'react-native-safearea-height';
// console.log('device info', DeviceInfo.hasNotch());
// console.log('Platform', Platform.OS);
// console.log('height', StatusBar.currentHeight);

const STATUSBAR_HEIGHT =
  Platform.OS === 'ios'
    ? getStatusBarHeight(true)
    : StatusBar.currentHeight;
export default StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
