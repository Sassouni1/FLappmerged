import {StatusBar, PixelRatio, Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
const {height, width} = Dimensions.get('window');
export function isIphoneX() {
  return Platform.OS === 'ios' && DeviceInfo.hasNotch();
}

export function getHeight(h) {
  const elemHeight = parseFloat(h);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
}
export function getWidth(w) {
  const elemWidth = parseFloat(w);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
}
export function getFontSize(font) {
  const deviceHeight = isIphoneX()
    ? height * 0.9
    : Platform.OS === 'android'
    ? height - StatusBar.currentHeight
    : height;
  const deviceHeightPercent = (font * deviceHeight) / 100;
  return Math.round(deviceHeightPercent);
}
export function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;
  if (interval > 1) {
    return Math.floor(interval) + (Math.floor(interval) === 1 ? ' year ago' : ' years ago');
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + (Math.floor(interval) === 1 ? ' month ago' : ' months ago');
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + (Math.floor(interval) === 1 ? ' day ago' : ' days ago');
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + (Math.floor(interval) === 1 ? ' hour ago' : ' hours ago');
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + (Math.floor(interval) === 1 ? ' minute ago' : ' minutes ago');
  }
  return Math.floor(seconds) + (Math.floor(seconds) === 1 ? ' second ago' : ' seconds ago');
}
