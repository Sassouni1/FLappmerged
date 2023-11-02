import React, {useState, useRef} from 'react';
import {
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import Fontisto from 'react-native-vector-icons/Fontisto';
// import styles from './styles';
import { styles } from './styles';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import {useDispatch} from 'react-redux';

const GroupPast = ({navigation}) => {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [timePicker, setTimePicker] = useState(false);
  const [time, setTime] = useState(new Date(Date.now()));
  function showDatePicker() {
    setDatePicker(true);
  };
  function showTimePicker() {
    setTimePicker(true);
  };
  function onDateSelected(event, value) {
    setDate(value);
    setDatePicker(false);
  };
  function onTimeSelected(event, value) {
    setTime(value);
    setTimePicker(false);
  };
  const [state, setState] = useState(true);
  const dispatch = useDispatch();
  // const [date, setDate] = useState('09-10-2021');
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
      />
      <View>
        <Text
          style={styles.filterWorkouts}>
         Filter workouts
        </Text>
      </View>
      <View style={styles.DatePickerView}>
      <Text style={styles.DateText}>{date.toDateString()}</Text>

 {datePicker && (
   <DateTimePicker
     value={date}
     mode={'date'}
     display={Platform.OS === 'ios' ? 'spinner' : 'default'}
     is24Hour={true}
     onChange={onDateSelected}
   />
 )}
 {!datePicker && (
   <View style={{ margin: 10 }}>
     <Fontisto name={'date'} size={17} color={'#182d4a'}  onPress={showDatePicker} />
   </View>
 )}

</View>


 
      <TouchableOpacity
        style={{marginTop: getHeight(1.5)}}
        onPress={() => setState(!state)}>
        <View
          style={{
            alignSelf: 'center',
            width: getWidth(91),
            backgroundColor: 'white',
            borderRadius: 15,

            height: getHeight(5.5),
          }}>
          <View
            style={styles.firstListView}>
            <View
              style={styles.fixed}>
              <View
                style={styles.CheckIcon}>
                <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
              </View>
              <Text
                style={styles.mondayWorkouts}>
                Monday workout
              </Text>
            </View>
            <Text
              style={styles.session1}>
              3 sessions
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setState(!state)}>
        <View
          style={styles.secondlistView}>
          <View
            style={styles.Fixed2}>
            <View
              style={styles.SetList}>
              <View
                style={styles.CheckedIcon}>
                <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
              </View>
              <Text
                style={styles.TuesdayWorkOuts}>
                Tuesday workout
              </Text>
            </View>
            <Text
              style={styles.session2}>
              4 sessions
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setState(!state)}>
        <View
          style={styles.ListNO3}>
          <View
            style={styles.firstListView}>
            <View
              style={styles.SetList}>
              <View
                style={styles.CheckedIcon}>
                <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
              </View>
              <Text
                style={styles.TuesdayWorkOuts}>
                Wednesday workout
              </Text>
            </View>
            <Text
              style={styles.session2}>
              5 sessions
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setState(!state)}>
        <View
          style={styles.ListNO3}>
          <View
            style={styles.firstListView}>
            <View
              style={styles.SetList}>
              <View
                style={styles.CheckedIcon}>
                <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
              </View>
              <Text
                style={styles.TuesdayWorkOuts}>
                Thursday workout
              </Text>
            </View>
            <Text
              style={styles.session2}>
              5 sessions
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default GroupPast;
