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
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {Divider} from 'react-native-paper';
import Header from '../../../Components/Header';
const WarmUpSession = ({navigation}) => {
  const [state, setState] = useState(true);
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header 
        title={'David Warne - Warm-up session'}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={{alignSelf: 'center', marginRight: getWidth(2)}}
              name={'arrow-back'}
              size={25}
              color={'#182d4a'}
            />
          </TouchableOpacity>
        }
      />
      <Divider style={styles.headerDivider} />
      
      <LinearGradient
        colors={['#F5F5F5', '#F5F5F5', '#FFFFFF']}
        style={styles.main}>
          <View>
           <Text
          style={styles.WorkOutDays}>
         Description
        </Text>
      </View>
      <View>
        <Text
          style={styles.Description}>
          This is the program description added as workout details. Lorem ipsum dolor sit amet consectetur. Ut interdum aliquet suspendisse at eget tempor. Tristique ut pulvinar purus etiam tincidunt pellentesque commodo.
        </Text>
      </View>
          <Text style={{color:'#182d4a', fontFamily:'Ubuntu-Bold',fontSize:12, marginLeft:17}}>Tasks</Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('WorkoutDetail')}>
          <View style={styles.listItem}>
            <View style={styles.alignView}>
              <View style={styles.circle}>
                <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
              </View>
              <Text style={styles.title}>A1 - Fast-paced walking</Text>
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
          onPress={() => navigation.navigate('WorkoutDetail')}>
          <View style={styles.listItem}>
            <View style={styles.alignView}>
              <View style={{...styles.circle, backgroundColor: '#E1DBE5'}}>
                <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
              </View>
              <Text style={styles.title}>A2 - Walking up and down stairs</Text>
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
          onPress={() => navigation.navigate('WorkoutDetail')}>
          <View style={styles.listItem}>
            <View style={styles.alignView}>
              <View style={{...styles.circle, backgroundColor: '#E1DBE5'}}>
                <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
              </View>
              <Text style={styles.title}>A3 - Arm swings</Text>
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
          onPress={() => navigation.navigate('WorkoutDetail')}>
          <View style={styles.listItem}>
            <View style={styles.alignView}>
              <View style={{...styles.circle, backgroundColor: '#E1DBE5'}}>
                <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
              </View>
              <Text style={styles.title}>A4 - Squats</Text>
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

export default WarmUpSession;
