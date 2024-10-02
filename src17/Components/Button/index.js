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
      style={btnStyle}
      onPress={() => (onPress ? onPress() : console.log('null'))}>
    
        {leftIcon}
        <Text style={[btnTextStyle]}>{text}</Text>
        {RightIcon}
  
    </TouchableOpacity>
  );
};
export default Button;
