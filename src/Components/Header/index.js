import * as React from 'react';
import {
  Text,
  View,
} from 'react-native';
import {styles} from './style';

const Header = ({title, LeftIcon, RightIcon, TitelStyle}) => {
  return (
    <View style={styles.headerview}>
      <View
        style={{flexDirection: 'row'}}>
        {LeftIcon}
        <Text style={TitelStyle ? TitelStyle : styles.headerTitle}>
          {title}
        </Text>
      </View>
      {RightIcon}
    </View>
  );
};
export default Header;
