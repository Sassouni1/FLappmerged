import React, {useEffect} from 'react';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './styles';
import {getWidth} from '../../../../utils/ResponsiveFun';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {Divider} from 'react-native-paper';
import Header from '../../../Components/Header';
import {useSelector} from 'react-redux';
import {setLoader} from '../../../Redux/actions/GernalActions';
import { getExercisesTasks } from '../../../Redux/actions/WorkoutActions';

const WarmSession = ({navigation, route}) => {
  const {
    workoutId,
    exerciseId,
    planId,
    cooldown_objId,
    warmup_objId,
    exerciseName,
    description,
  } = route?.params;
  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken);
  const loader = useSelector(state => state.gernal.loader);
  const warmUp = useSelector(state => state.workout.exerciseTasks);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(
      getExercisesTasks({
        token,
        planId,
        data: {
      workout_objId: workoutId,
      exercise_objId: exerciseId,
      warmup_objId: warmup_objId,
      cooldown_objId: cooldown_objId,
    }}));
   
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header
        title={exerciseName}
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
          <Text style={styles.WorkOutDays}>Description</Text>
        </View>
        <View>
          <Text style={styles.Description}>{description}</Text>
        </View>
        <Text
          style={{
            color: '#182d4a',
            fontFamily: 'Ubuntu-Bold',
            fontSize: 12,
            marginLeft: 17,
          }}>
          Tasks
        </Text>
        <FlatList
          data={warmUp}
          keyExtractor={item => item.id}
          onRefresh={() =>    dispatch(getExercisesTasks({token,planId,data:{
            workout_objId: workoutId,
            exercise_objId: exerciseId,
            warmup_objId: warmup_objId,
            cooldown_objId: cooldown_objId,
          }}))}
          refreshing={false}
          ListEmptyComponent={() =>
            loader ? null : (
              <View>
                <Image
                  style={styles.img}
                  source={require('../../../assets/images/empty.png')}
                />
                <Text style={styles.listError}>Not found</Text>
              </View>
            )
          }
          renderItem={({item, index}) => (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() =>
                item?.complete == true|| item?.complete==false
                  ? navigation.navigate('CompletedTask', {
                    workoutId,
                    exerciseId,
                    planId,
                    cooldown_objId,
                    exerciseName,
            description,
                    warmup_objId,
                      tasksId: item._id,
                    })
                  : navigation.navigate('Fastpacedwalking', {
                      workoutId,
                      cooldown_objId,
                      warmup_objId,

                      exerciseId,
                      exerciseName,
                      completeTask: warmUp?.filter(e => e.complete == true)
                        .length,
                      inCompleteTask: warmUp?.filter(e => e.complete == false)
                        .length,
                      totaltask: warmUp?.length,
                      tasksId: item._id,
                      title: item?.title,
                      description: item?.description,
                      instruction: item?.instruction,
                      planId: user?.planId[user?.planId.length - 1],
                    })
              }>
                
              <View style={styles.listItem}>
                <View style={styles.alignView}>
                  {item?.complete == true ? (
                    <View style={styles.check1}>
                      <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
                    </View>
                  ) : item?.complete == false ? (
                    <View style={{...styles.check1, backgroundColor: 'red'}}>
                        <Entypo name={'cross'} size={14} color={'white'} />
                      </View>
                  ) : (
                    <View style={styles.check}>
                      <Text style={styles.workoutsNumbring}>{index + 1}</Text>
                    </View>
                  )}
                  <Text style={styles.title}>{item?.title}</Text>
                </View>
                <MaterialIcons
                  name={'keyboard-arrow-right'}
                  size={25}
                  color={'#182d4a'}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </LinearGradient>
    </View>
  );
};

export default WarmSession;
