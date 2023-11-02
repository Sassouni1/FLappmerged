import React, {useState, useRef} from 'react';
import {
  StatusBar,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../Button';
import {validateFields} from '../../../utils/validation/validate-fields';
import {styles} from './styles';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import {useNavigation} from '@react-navigation/native';

const GroupUpComing = () => {
  const navigation = useNavigation();
  const [state, setState] = useState(true);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
      />
       <View>
        <Text
          style={styles.WorkOutDays}>
          Description
        </Text>
      </View>
      <View>
        <Text
          style={styles.Description}>
          This is description. Lorem ipsum dolor sit amet consectetur. Ut interdum aliquet suspendisse at eget tempor. Tristique ut pulvinar purus etiam tincidunt pellentesque commodo.
        </Text>
      </View>
      <View>
        <Text
          style={styles.WorkOutDays}>
          Workout days
        </Text>
      </View>

      <TouchableOpacity onPress={() => setState(!state)}>
        <View
          style={styles.Sections}>
          <View
            style={styles.sessionIn}>
            <View
              style={styles.viewsetup}>
              <View
                style={styles.check}>
                <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
              </View>
              <Text
                style={styles.WorkoutText}>
                Monday workout
              </Text>
            </View>
            <Text
              style={styles.complete}>
              Completed
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('GroupDayWorkOuts')}>
        <View
          style={styles.Sections}>
          <View
            style={styles.sessionIn}>
            <View
              style={styles.viewsetup}>
              <View
                style={styles.viewed}>
                <Text style={{color: '#182d4a'}}>2</Text>
              </View>
              <Text
                style={styles.WorkoutText}>
                Tuesday workout
              </Text>
            </View>
            <Image source={require('../../assets/images/progress.png')} />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
      //  onPress={() =>navigation.navigate('DayWorkOuts')}
      >
        <View
          style={styles.Sections}>
          <View
            style={styles.sessionIn}>
            <View
              style={styles.viewsetup}>
              <View
                style={styles.viewed}>
                <Text style={{color: '#182d4a'}}>3</Text>
              </View>
              <Text
                style={styles.WorkoutText}>
                Wednesday workout
              </Text>
            </View>
            <Feather name={'lock'} size={20} color={'#182d4a40'} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
      // onPress={() =>navigation.navigate('DayWorkOuts')}
      >
        <View
          style={styles.Sections}>
          <View
            style={styles.sessionIn}>
            <View
              style={styles.viewsetup}>
              <View
                style={styles.viewed}>
                <Text style={{color: '#182d4a'}}>4</Text>
              </View>
              <Text
                style={styles.WorkoutText}>
                Thursday workout
              </Text>
            </View>
            <Feather name={'lock'} size={20} color={'#182d4a40'} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GroupUpComing;
