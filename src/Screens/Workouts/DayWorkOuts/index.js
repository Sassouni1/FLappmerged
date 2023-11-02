import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  Image,
  View,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ImageModal from 'react-native-image-modal';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import Header from '../../../Components/Header';
import {styles} from './styles';
import {
  getFontSize,
  getHeight,
  getWidth,
  timeSince,
} from '../../../../utils/ResponsiveFun';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';

import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {Divider} from 'react-native-paper';
import validator from '../../../../utils/validation/validator';
import {useSelector} from 'react-redux';
import {setLoader} from '../../../Redux/actions/GernalActions';
import {ApiCall} from '../../../Services/Apis';
import {
  getExercises,
  getUpcomingWorkout,
  getWorkoutComments,
  setExercises,
} from '../../../Redux/actions/WorkoutActions';
import ImageCropPicker from 'react-native-image-crop-picker';
import {BASE_URL} from '../../../Services/Constants';
import SimpleToast from 'react-native-simple-toast';
import moment from 'moment';
import {GernalStyle} from '../../../constants/GernalStyle';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Button from '../../../Components/Button';
import { async } from 'validate.js';
const DayWorkOuts = ({navigation, route}) => {
  validator;
  const inputRefs = {task_comments: useRef('')};
  const {workoutId, planId, workoutDay, description} = route?.params;
  const user = useSelector(state => state.auth.userData);

  const token = useSelector(state => state.auth.userToken);
  const loader = useSelector(state => state.gernal.loader);
  const tskCommentss = useSelector(state => state.workout.workoutComments);
  const exercises = useSelector(state => state.workout.exercises);
  const [select, setSelect] = useState(0);
  const [file, setFile] = useState([]);
  const [errors, setErrors] = useState({});
  const [cooldown, setCooldown] = useState(exercises?.cooldown_Exercise);
  const [warmups, setWarmups] = useState(exercises?.warmup_Exercise);
  const [workoutExe, setWorkoutExe] = useState(exercises?.exercise);
  const [state, setState] = useState({
    task_commentsError: '',
    task_comments: '',
  });

  const dispatch = useDispatch();
  const UploadFile = async () => {
    const options = {
      mediaTypes: 'Images',
      quality: 0.5,
      allowsEditing: true,
      aspect: [4, 3],
    };
    const response = await ImageCropPicker.openPicker(options);

    if (!response.cancelled) {
      let fileObj1 = {
        uri: response?.path,
        name: response?.filename,
        type: response?.mime,
        size: response?.size,
      };
      setFile([fileObj1, ...file]);
      setState({...state, fileError: ''});
      setErrors({...errors, file: ''});
    }
  };
  const sendcomments = async () => {
    const {task_comments} = state;
    const fileError = await validator('file', file);
    const task_commentsError = await validator('task_comments', task_comments);
    if (!task_commentsError && !fileError) {
      dispatch(setLoader(true));

      const formData = new FormData();
      const date = moment.now();
      file?.map(item => formData.append('image', item));
      formData.append('workout_objId', workoutId);
      formData.append('time', date);
      formData.append('workout_comments', task_comments);

      fetch(BASE_URL + `/assignplan/addCommentsInWorkoutByUser/${planId}`, {
        method: 'POST',
        body: formData,

        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
        .then(res => {
          SimpleToast.show(res?.response?.message);
          dispatch(
            getWorkoutComments({
              token,
              planId,
              data: {workout_objId: workoutId},
            }),
          );
          setFile([]);
          setState({});
          dispatch(setLoader(false));
        })
        .then(result => dispatch(setLoader(false)))
        .catch(error => console.error('catch', error));
      const params = {
        workout_objId: workoutId,
        workout_comments: task_comments,
        image: file,
        time: new Date(),
      };
    } else {
      dispatch(setLoader(false));
      setState({
        ...state,
        task_commentsError,
      });
      // alert(
      //   res?.response?.message ? res?.response?.message : res?.response?.error,
      // );
    }
  };

  const completeWorkout=async()=>{
    dispatch(setLoader(true))
    try {
      const res = await ApiCall({
        route: `assignplan/updateWorkout/${planId}`,
        verb: 'post',
        params:{
          "workout_objId":workoutId,
      },
        token: token,
      });
      if (res?.status == 200) {
        console.log('res',res)
        SimpleToast.show('Workout Completed Sucessfully')
    dispatch(getUpcomingWorkout({token,planId:planId}))

        navigation.goBack()
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));
        console.log('error', res?.response);
      }
    } catch (e) {
      console.log('saga error -- ', e.toString());
    }
  }
  useEffect(() => {
    dispatch(setLoader(true));
    dispatch(getExercises({token, planId, data: {workout_objId: workoutId}}));
    dispatch(
      getWorkoutComments({token, planId, data: {workout_objId: workoutId}}),
    );
  }, []);
  useEffect(() => {
    setCooldown(exercises?.cooldown_Exercise);
    setWarmups(exercises?.warmup_Exercise);
    setWorkoutExe(exercises?.exercise);
  }, [exercises]);
  const changeHandler = (type, value) => setState({...state, [type]: value});
  return (
    <View style={styles.head}>
      <View style={{backgroundColor: 'white'}}>
        <GeneralStatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="white"
          translucent={true}
        />
        <Header
          title={workoutDay}
          LeftIcon={
            <TouchableOpacity
              onPress={() => {
                dispatch(
                  setExercises({
                    exercise: [],
                    cooldown_Exercise: [],
                    warmup_Exercise: [],
                  }),
                );
                navigation.goBack();
              }}>
              <Ionicons
                style={styles.backerrow}
                name={'arrow-back'}
                size={25}
                color={'#182d4a'}
              />
            </TouchableOpacity>
          }
        />
        <Divider style={styles.headerDivider} />
      </View>

      <LinearGradient
        colors={[
          '#FFFFFF',
          '#F5F5F5',
          '#F5F5F5',
          '#F5F5F5',
          '#F5F5F5',
          '#F5F5F5',
          '#F5F5F5',
          '#FFFFFF',
        ]}
        style={styles.main}>
        <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={{width: getWidth(100)}}>
          <Text style={styles.exer}>Exercises</Text>

          <FlatList
            data={workoutExe}
            keyExtractor={item => item.id}
            onRefresh={() =>
              dispatch(
                getExercises({token, planId, data: {workout_objId: workoutId}}),
              )
            }
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
              <View>
                {item?.task.length > 1 ? (
                 item?.task.map((item2,index2)=> <View><TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>item?.task[index2==0?0:index2-1].complete==true||item?.task[index2==0?0:index2-1].complete==false||index2==0?
                      item2?.complete == true || item2?.complete == false
                        ? navigation.navigate('CompletedTask', {
                            workoutId,

                            planId: user?.planId[user?.planId.length - 1],
                            exerciseId: item?._id,
                            tasksId:item2?._id,
                            exerciseName: item2?.title,
                            description: item2?.description,
                          })
                        : navigation.navigate('Fastpacedwalking', {
                            workoutId,
                            exerciseId: item?._id,
                            tasksId:item2?._id,
                            planId: user?.planId[user?.planId.length - 1],
                            instruction: item2?.instruction,
                            exerciseName: item2?.title,
                            description: item2?.description,
                            completeTask:1,
                            totaltask:item?.task.length,

                            title: item2?.title,
                          }):alert('Complete uperOne first')
                    }>
                    <View style={styles.listItem}>
                      <View style={styles.alignView}>
                        {item2?.complete == true ? (
                          <View style={styles.check1}>
                            <AntDesign
                              name={'check'}
                              size={14}
                              color={'#FFFFFF'}
                            />
                          </View>
                        ) : item2?.complete == false ? (
                          <View
                            style={{...styles.check1, backgroundColor: 'red'}}>
                            <Entypo name={'cross'} size={14} color={'white'} />
                          </View>
                        ) : (
                          <View style={styles.check}>
                            <Text style={styles.workoutsNumbring}>
                              {String.fromCharCode(64+index+1)+(index2+1)}
                            </Text>
                          </View>
                        )}

                        <Text style={styles.title}>{item2?.title}{item2?.tag=='default'?' ':'('+item2?.tag+')'}</Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {/* <Text style={styles.cooldown}>{item?.tasks.filter((item)=>item?.complete==undefined).length} remaning</Text> */}
                        <MaterialIcons
                          name={'keyboard-arrow-right'}
                          size={25}
                          color={'#182d4a'}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
           
                  {item?.task.length>index2+1?<View style={{height:getHeight(3.2),width:10,backgroundColor:'white',position:'absolute',bottom:-20,left:getWidth(11.5)}}><Text></Text></View>:null}

                    </View>
                )) : (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() =>
                      item?.complete == true || item?.complete == false
                        ? navigation.navigate('CompletedTask', {
                            workoutId,

                            planId: user?.planId[user?.planId.length - 1],
                            exerciseId: item?._id,

                            exerciseName: item?.title,
                            description: item?.description,
                          })
                        : navigation.navigate('Fastpacedwalking', {
                            workoutId,
                            exerciseId: item?._id,
                            planId: user?.planId[user?.planId.length - 1],
                            instruction: item?.instruction,
                            exerciseName: item?.title,
                            description: item?.description,

                            title: item?.title,
                          })
                    }>
                    <View style={styles.listItem}>
                      <View style={styles.alignView}>
                        {item?.complete == true ? (
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
                            {String.fromCharCode(64+index+1)}
                            </Text>
                          </View>
                        )}

                        <Text style={styles.title}>{item?.title}{item?.tag=='default'?' ':item?.tag}</Text>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {/* <Text style={styles.cooldown}>{item?.tasks.filter((item)=>item?.complete==undefined).length} remaning</Text> */}
                        <MaterialIcons
                          name={'keyboard-arrow-right'}
                          size={25}
                          color={'#182d4a'}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
          />
          {select == 1 ? (
            <TouchableOpacity
              style={{marginLeft: getWidth(2.5), marginTop: getHeight(1)}}
              onPress={() => {
                setSelect(0);
              }}>
              <View style={styles.comments}>
                <AntDesign name={'caretdown'} size={10} color={'#182d4a'} />
                <Text style={styles.commentsheader}>Comments</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{marginLeft: getWidth(2.5), marginTop: getHeight(1)}}
              onPress={() => {
                setSelect(1);
              }}>
              <View style={styles.comments}>
                <AntDesign name={'caretright'} size={10} color={'#182d4a'} />
                <Text style={styles.commentsheader}>Comments</Text>
              </View>
            </TouchableOpacity>
          )}
          {select == 1 ? (
            <KeyboardAwareScrollView style={styles.commentsBox}>
              <FlatList
                data={tskCommentss}
                keyExtractor={item => item.id}
                onRefresh={() =>
                  dispatch(
                    getWorkoutComments({
                      token,
                      planId,
                      data: {workout_objId: workoutId},
                    }),
                  )
                }
                refreshing={false}
                ItemSeparatorComponent={() => (
                  <View style={{height: getHeight(2)}}></View>
                )}
                renderItem={({item, index}) => (
                  <View>
                    <View>
                      <View style={styles.prof}>
                      {user?._id == item?.senderId ? (
                        <ImageModal
                          style={{width: 30, height: 30, borderRadius: 15}}
                          source={
                            // user?._id==item?.senderId
                            user?.profileImage
                              ? {uri: user?.profileImage}
                              : require('../../../assets/images/Profile.png')
                          }
                        />):(   <ImageModal
                          style={{width: 30, height: 30, borderRadius: 15}}
                          source={
                            // user?._id==item?.senderId
                            user?.coachId?.profileImage
                              ? {uri:user?.coachId?.profileImage}
                              : require('../../../assets/images/Profile.png')
                          }
                        />)}

                        <View style={{marginLeft: 7}}>
                          {user?._id == item?.senderId ? (
                            <Text
                              style={{
                                fontFamily: 'Ubuntu-Bold',
                                color: '#182d4a',
                                fontSize: 15,
                              }}>
                              {user?.firstName} {user?.lastName}
                              <Text
                                style={{
                                  fontFamily: 'Ubuntu-SemiBold',
                                  color: '#182d4a',
                                  fontSize: 10,
                                }}>
                                (you)
                              </Text>
                            </Text>
                          ) : (
                            <Text
                              style={{
                                fontFamily: 'Ubuntu-Bold',
                                color: '#182d4a',
                                fontSize: 15,
                              }}>
                              {user?.coachId?.firstName}{' '}
                              {user?.coachId?.lastName}
                              <Text
                                style={{
                                  fontFamily: 'Ubuntu-SemiBold',
                                  color: '#182d4a',
                                  fontSize: 10,
                                }}>
                                (coach)
                              </Text>
                            </Text>
                          )}

                          <Text
                            style={{
                              fontFamily: 'Ubuntu-SemiBold',
                              color: '#182d4a',
                              fontSize: 10,
                            }}>
                            {timeSince(new Date(item?.time)) + ' ago'}
                          </Text>
                        </View>
                      </View>

                      <Text
                        style={{
                          color: '#182d4a',
                          marginLeft: getWidth(4),
                          marginTop: 10,
                          width: getWidth(87),
                          textAlign: 'left',
                          fontFamily: 'Ubuntu-Regular',
                          fontSize: 12,
                        }}>
                        {item.comment}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: getHeight(1),
                        width: getWidth(90),
                      }}>
                      {item?.image &&
                        item?.image?.map(item2 => (
                          <ImageModal
                            resizeMode="stretch"
                            numberOfLines={1}
                            style={styles.image}
                            source={{uri: item2}}
                          />
                        ))}
                    </View>
                  </View>
                )}
                ListEmptyComponent={() =>
                  loader ? null : (
                    <View>
                      <Image
                        style={{
                          ...styles.img,
                          // height: getHeight(10),
                          // width: getWidth(20),
                        }}
                        source={require('../../../assets/images/empty.png')}
                      />
                      <Text style={styles.listError}>Empty Comments</Text>
                      <View style={{height: getHeight(2.5)}}></View>
                    </View>
                  )
                }
                ListFooterComponent={() => (
                  <View style={{height: getHeight(2.5)}}></View>
                )}
              />

              <View
                style={{
                  ...styles.commentsBox,
                  marginBottom: 10,
                  width: getWidth(87),
                }}>
                <TextInput
                  mode="outlined"
                  // label="Email address"
                  label={
                    <Text style={GernalStyle.inputLabelStyle}>
                      Write comment...
                    </Text>
                  }
                  theme={{roundness: 15}}
                  clearButtonMode={'always'}
                  ref={inputRefs.task_comments}
                  value={state.task_comments}
                  returnKeyType={'send'}
                  placeholder="Write comment..."
                  outlineColor="#BDC3C4"
                  activeUnderlineColor="#182d4a"
                  activeOutlineColor="#182d4a"
                  style={{
                    height: getHeight(5),
                    width: getWidth(80),
                    backgroundColor: 'white',
                    color: '#182d4a',
                    alignSelf: 'center',
                  }}
                  onSubmitEditing={() => sendcomments()}
                  onFocus={() => setState({...state, task_commentsError: ''})}
                  onChangeText={task_comments =>
                    changeHandler('task_comments', task_comments)
                  }
                  blurOnSubmit={false}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                  }}>
                  <TouchableOpacity onPress={() => UploadFile()}>
                    <View
                      style={{
                        flexDirection: 'row',
                        margin: 10,
                        alignItems: 'center',
                      }}>
                      <Entypo
                        style={{margin: 3}}
                        name={'camera'}
                        size={16}
                        color={'#182d4a'}
                      />
                      <Text
                        style={{
                          color: '#182d4a',
                          fontFamily: 'Ubuntu-Regular',
                        }}>
                        Attach video/image
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      sendcomments();
                    }}>
                    <View
                      style={{
                        height: getHeight(6),
                        width: getWidth(15),
                        backgroundColor: '#182d4a',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 15,
                        margin: 5,
                      }}>
                      <Ionicons name={'send'} size={19} color={'#FFFFFF'} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Text style={GernalStyle.InputError}>
                {state?.task_commentsError}
              </Text>

              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={file}
                ListFooterComponent={() => (
                  <View style={{width: getWidth(4)}} />
                )}
                renderItem={({item, index}) => (
                  <View>
                    <ImageModal
                      resizeMode="stretch"
                      numberOfLines={1}
                      style={styles.image}
                      source={item}
                    />
                    <Entypo
                      name={'cross'}
                      size={25}
                      color={'#EB5757'}
                      style={styles.icon1}
                      onPress={() => {
                        setFile(file.filter(a => a != item));
                      }}
                    />
                  </View>
                )}
                keyExtractor={item => item.id}
              />
              <View style={{height: getHeight(1)}} />
            </KeyboardAwareScrollView>
          ) : (
            <View></View>
          )}

          <View style={styles.footer}></View>
    

        </ScrollView>
        
      </LinearGradient>
      <Button
      onPress={()=>completeWorkout()}
      btnStyle={{...GernalStyle.btn,position:'absolute',
    bottom:getHeight(15)}} btnTextStyle={GernalStyle.btnText} text={'Complete Workout'}/>
    </View>
  );
};

export default DayWorkOuts;
