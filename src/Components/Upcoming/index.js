import React, {useState, useRef, useEffect} from 'react';
import {
  StatusBar,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {setLoader} from '../../Redux/actions/GernalActions';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {GernalStyle} from '../../constants/GernalStyle';
import Button from '../Button';
import {styles} from './styles';
import {useDispatch, useSelector} from 'react-redux';
import { getHeight, getWidth} from '../../../utils/ResponsiveFun';
import {useNavigation} from '@react-navigation/native';
import {ProgressBar} from 'react-native-paper';
import { getUpcomingWorkout } from '../../Redux/actions/WorkoutActions';

const UpComing = () => {
  const token = useSelector(state => state.auth.userToken);
  const loader = useSelector(state => state.gernal.loader);
  const upcomingWorkout = useSelector(state => state.workout.UpcomingWorkouts);
  const user = useSelector(state => state.auth.userData);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(getUpcomingWorkout({token,planId:user?.planId[user?.planId.length - 1]}))
  }, []);
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
      />
      <View>
        <Text style={styles.WorkOutDays}>Workout days</Text>
      </View>
      <Modal isVisible={isModalVisible}>
        <View style={styles.mainview}>
          <View style={styles.secView}>
            <View></View>
            <Text style={styles.taskview}>Task completed</Text>
            <TouchableOpacity onPress={toggleModal}>
              <Ionicons
                style={{marginTop: getHeight(2), marginLeft: getWidth(2)}}
                name={'close-sharp'}
                size={25}
                color={'#182d4a20'}
              />
            </TouchableOpacity>
          </View>
          <View style={{height: getHeight(28)}}></View>
          <Button
            onPress={toggleModal}
            text="ok"
            btnStyle={{
              ...GernalStyle.btn,
              width: getWidth(85),
              marginTop: getHeight(-10),
            }}
            btnTextStyle={GernalStyle.btnText}
          />
        </View>
      </Modal>
      <FlatList
        data={upcomingWorkout}
        keyExtractor={item => item.id}
        onRefresh={() =>dispatch(getUpcomingWorkout({token,planId:user?.planId[user?.planId.length - 1]}))}
        refreshing={false}
        ListEmptyComponent={() =>
          loader ? null : (
            <View>
              <Image
                style={styles.img}
                source={require('../../assets/images/empty.png')}
              />
              <Text style={styles.listError}>Not found</Text>
            </View>
          )
        }
        renderItem={({item, index}) => (
          <View>
     
            {item?.edited_Workout ? (
        
              <TouchableOpacity
                onPress={() => {item?.readiness!=null||item?.edited_Workout?.isRelaxed == true?
                  item?.edited_Workout?.isRelaxed == true
                      ? navigation.navigate('RelaxDay')
                      : navigation.navigate('DayWorkOuts', {
                          workoutId: item?._id,
                          workoutDay: item?.workoutDay,
                          description: item?.edited_Workout?.description,
                          workoutName:
                            item?.edited_Workout?.workoutName,
                          planId: user?.planId[user?.planId.length - 1],
                        }):navigation.navigate('Sleepquality',{id:user?.planId[user?.planId.length - 1],workout_objId:item?._id, workoutDay: item?.workoutDay,
                          description: item?.edited_Workout?.description,
                          workoutName:
                            item?.edited_Workout?.workoutName,});
                }}>
                <View style={styles.Sections}>
                  <View style={styles.sessionIn}>
                    <View style={styles.viewsetup}>
                      {item?.complete == true? (
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
                        {item?.complete == false ? (
                          <Text style={{color: 'red'}}>Incomplete</Text>
                        ) : (
                          <MaterialCommunityIcons
                            style={{
                              marginRight: getWidth(1.5),
                              transform: [{rotateY: '180deg'}],
                            }}
                            name={'lock-open-variant-outline'}
                            size={26}
                            color={'#fbac33'}
                          />
                        )}
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {item?.readiness||item?.edited_Workout?.isRelaxed == true?item?.edited_Workout?.isRelaxed == true
                      ? navigation.navigate('RelaxDay')
                      : navigation.navigate('DayWorkOuts', {
                          workoutId: item?._id,
                          workoutDay: item?.workoutDay,
                          description: item?.description,
                          workoutName: item?.workoutId?.workoutName,
                          planId: user?.planId[user?.planId.length - 1],
                        })
                    :navigation.navigate('Sleepquality',{id:user?.planId[user?.planId.length - 1],workout_objId:item?._id, workoutDay: item?.workoutDay,
                      description: item?.edited_Workout?.description,
                      workoutName:
                        item?.edited_Workout?.workoutName,});
                }}>
                <View style={styles.Sections}>
                  <View style={styles.sessionIn}>
                    <View style={styles.viewsetup}>
                      {item?.complete == true ? (
                        <View style={styles.check1}>
                          <AntDesign
                            name={'check'}
                            size={14}
                            color={'#FFFFFF'}
                          />
                        </View>
                      ) : (
                        <View style={styles.check}>
                          <Text style={styles.workoutsNumbring}>
                            {index + 1}
                          </Text>
                        </View>
                      )}
                      <Text style={styles.WorkoutText}>{item?.workoutName+ "("+item?.workoutDay+")"}</Text>
                    </View>
                    {item?.complete == true ? (
                      <Text style={styles.complete}>Complete</Text>
                    ) : (
                      <View>
                        {(item?.workoutDate != new Date())&&item?.empty_Workout==false ? (
                          <MaterialCommunityIcons
                            style={{
                              marginRight: getWidth(1.5),
                              transform: [{rotateY: '180deg'}],
                            }}
                            name={'lock-open-variant-outline'}
                            size={26}
                            color={'#182d4a20'}
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name={'lock-outline'}
                            size={27}
                            color={'#182d4a20'}
                          />
                        )}
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default UpComing;
