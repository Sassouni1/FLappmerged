import React, {useState, useRef,useEffect} from 'react';
import {
  StatusBar,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DatePicker from 'react-native-date-picker';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';
import {getHeight, getWidth} from '../../../utils/ResponsiveFun';
import {useDispatch, useSelector} from 'react-redux';
import { setLoader } from '../../Redux/actions/GernalActions';
import {useNavigation} from '@react-navigation/native';
import { getPastWorkout } from '../../Redux/actions/WorkoutActions';
import { ProgressBar } from 'react-native-paper';

const Past = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userToken);
  const loader = useSelector(state => state.gernal.loader);
  const user = useSelector(state => state.auth.userData);
  const pastWorkout = useSelector(state => state.workout.PastWorkouts);
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());


  function showDatePicker() {
    setDatePicker(true);
  };


  useEffect(() => {
    dispatch(setLoader(true))
    dispatch(getPastWorkout({token,planId:user?.planId[user?.planId.length - 1],data:{givenDate:date}}))
  }, []);

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
      <TouchableOpacity onPress={()=>setDatePicker(true)} style={styles.DatePickerView}>
      <Text style={styles.DateText}>{date.toDateString()}</Text>

 {datePicker && (
   <DatePicker
   modal

     open={datePicker}
     date={date}
     mode={'date'}
     onConfirm={(date) => {
       setDatePicker(false);
       dispatch(getPastWorkout({token,planId:user?.planId[user?.planId.length - 1],data:{givenDate:date}}))
       setDate(date);
     }}
     onCancel={() => {
      setDatePicker(false)

     }}
  
   />
 )}
 {!datePicker && (
   <View style={{ margin: 10 }}>
     <Fontisto name={'date'} size={17} color={'#182d4a'}  onPress={showDatePicker} />
   </View>
 )}

</TouchableOpacity>

<FlatList
      data={pastWorkout}
      keyExtractor={item => item.id}
      onRefresh={()=>    dispatch(getPastWorkout({token,planId:user?.planId[user?.planId.length - 1]}))
    }
    ListHeaderComponent={()=><View style={{height:getHeight(2)}}/>}
    ListFooterComponent={()=><View style={{height:getHeight(10)}}/>}
      refreshing={false}
      ListEmptyComponent={()=>( (loader)?null:<View><Image
        style={styles.img}
        source={
        
          require('../../assets/images/empty.png')}
      />
      <Text style={styles.listError}>Not found</Text>
      </View>)}
      renderItem={({item,index})=>(
 
      <TouchableOpacity

        onPress={() => 
          navigation.navigate('DayWorkOuts',{workoutId:item?._id,workoutDay:item?.workoutDay,description:item?.workoutId?.description,workoutName:item?.workoutId?.workoutName,planId:user?.planId[user?.planId.length-1]})}
        >
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
              <View style={styles.fixed}>
              {item?.complete == true && item?.progress > 90 ? (
                        <View style={styles.check1}>
                          <AntDesign
                            name={'check'}
                            size={14}
                            color={'#FFFFFF'}
                          />
                        </View>
                      ) : item?.complete == false ? (
                        <View
                          style={{...styles.check1, backgroundColor: 'red'}}>
                          <Entypo name={'cross'} size={14} color={'white'} />
                        </View>
                      ) : (
                        <View style={styles.check}>
                          <Text style={styles.workoutsNumbring}>
                            {index + 1}
                          </Text>
                        </View>
                      )}
                                          <Text style={styles.WorkoutText}>{item?.workoutDay}</Text>

                    </View>
                    {item?.complete == true ? (
                                              <Text style={{ color:'#fbac33',fontSize:14,fontWeight:'bold',fontFamily:'Ubuntu-Regular',marginRight:5}}>{item?.total_CompLength+'/'+item?.totallength}</Text>

                    ) : (
                      <View>
                        {item?.complete == false && 
                          <Text style={{color: 'red'}}>Incomplete</Text>
                       }
                      </View>
                    )}
            {/* <Text
              style={styles.session1}>
                {item?.exercise.length} sessions
            </Text> */}
          </View>
        </View>
      </TouchableOpacity>)}/>
     

    </View>
  );
};

export default Past;
