import React from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircularProgress = ({ percentage, radius, strokeWidth, progressColor, bgColor }) => {
  const circumference = 2*(Math.PI * radius);
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View>
      <Svg width={radius * 20} height={110} viewBox={`0 0 ${radius * 2} ${radius}`}>
        {/* Background Semi-Circle Outline */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          stroke={bgColor}
          strokeWidth={strokeWidth}
        />

        {/* Progress Semi-Circle Outline */}
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
    </View>
  );
};

export default CircularProgress;
