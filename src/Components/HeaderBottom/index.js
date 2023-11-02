import * as React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  Image,
  Text,
  View,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../Components/Button';
import Entypo from 'react-native-vector-icons/Entypo';
import {styles} from './style';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HeaderBottom = ({title, LeftIcon, RightIcon, TitelStyle}) => {
  return (
    <View style={styles.headerview}>
       {LeftIcon}
     
       
        <Text style={TitelStyle ? TitelStyle : styles.headerTitle}>
          {title}
        </Text>
   
      {RightIcon}
    </View>
  );
};
export default HeaderBottom;
