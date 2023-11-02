import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Button = ({
  text,
  leftIcon,
  RightIcon,
  btnTextStyle,
  btnStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => (onPress ? onPress() : console.log('null'))}>
      <LinearGradient colors={['rgba(247, 147, 0, 1)', 'rgba(247, 147, 0, 1)']} style={btnStyle}>
        {leftIcon}
        <Text style={[btnTextStyle]}>{text}</Text>
        {RightIcon}
      </LinearGradient>
    </TouchableOpacity>
  );
};
export default Button;
