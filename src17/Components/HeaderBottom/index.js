import * as React from 'react';
import {
  Text,
  View,
} from 'react-native';
import {styles} from './style';


const HeaderBottom = ({title, LeftIcon, RightIcon, TitelStyle}) => {
  return (
    <View style={[styles.headerview, styles.containerStyle]}>
       {LeftIcon}
     
       
        <Text style={TitelStyle ? TitelStyle : styles.headerTitle}>
          {title}
        </Text>
   
      {RightIcon}
    </View>
  );
};
export default HeaderBottom;
