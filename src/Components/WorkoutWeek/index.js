import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {SceneMap, TabView} from 'react-native-tab-view';
import {Divider} from 'react-native-paper';
const WorkoutWeek = ({navigation}) => {
  const user = useSelector(state => state.auth.userData);
  const [index, setIndex] = React.useState(0);

  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <LinearGradient
        colors={['#F5F5F5', '#F5F5F5', '#FFFFFF']}
        style={styles.main}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('WarmSession')}>
          <View style={styles.listItem}>
            <View style={styles.alignView}>
              <View style={styles.circle}>
                <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
              </View>
              <Text style={styles.title}>A - Warm-up session</Text>
            </View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={25}
              color={'#182d4a'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('WarmSession')}>
          <View style={styles.listItem}>
            <View style={styles.alignView}>
              <View style={{...styles.circle, backgroundColor: '#E1DBE5'}}>
                <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
              </View>
              <Text style={styles.title}>B - Bench press</Text>
            </View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={25}
              color={'#182d4a'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('WarmSession')}>
          <View style={styles.listItem}>
            <View style={styles.alignView}>
              <View style={{...styles.circle, backgroundColor: '#E1DBE5'}}>
                <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
              </View>
              <Text style={styles.title}>C - Shoulder stretch</Text>
            </View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={25}
              color={'#182d4a'}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('WarmSession')}>
          <View style={styles.listItem}>
            <View style={styles.alignView}>
              <View style={{...styles.circle, backgroundColor: '#E1DBE5'}}>
                <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
              </View>
              <Text style={styles.title}>D - Chest stretch</Text>
            </View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={25}
              color={'#182d4a'}
            />
          </View>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default WorkoutWeek;
