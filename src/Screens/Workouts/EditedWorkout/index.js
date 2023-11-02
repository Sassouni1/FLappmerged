import React, {useState, useRef, useEffect} from 'react';
import {Text,Image,View,FlatList,TextInput,ScrollView,TouchableOpacity,} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';
import Header from '../../../Components/Header';
import {styles} from './styles';
import {getFontSize,getHeight,getWidth,} from '../../../../utils/ResponsiveFun';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {format} from 'date-fns';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {Divider} from 'react-native-paper';
import validator from '../../../../utils/validation/validator';
import {useSelector} from 'react-redux';
import {setLoader} from '../../../Redux/actions/GernalActions';
import {ApiCall} from '../../../Services/Apis';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
const EditedWorkout = ({navigation, route}) => {
  validator;
  const inputRefs = {task_comments: useRef('')};
  const {workoutId, planId, workoutName, workoutDay, description} =route?.params;
  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken);
  const loader = useSelector(state => state.gernal.loader);
  const [totalEx, settotalEx] = useState(0);
  const [select, setSelect] = useState(0);
  const [file, setFile] = useState([]);
  const [errors, setErrors] = useState({});
  const [exComplete, setExComplete] = useState(0);
  const [tskCommentss, setTskCommentss] = useState();
  const [task_comments, setTask_comments] = useState([]);
  const [cooldown, setCooldown] = useState([]);
  const [cooldownLength, setCooldownLength] = useState(0);
  const [cooldownComp, setCooldownComp] = useState(0);
  const [warmups, setWarmups] = useState([]);
  const [warmupsLength, setWarmupsLength] = useState(0);
  const [warmupsComp, setWarmupsComp] = useState(0);
  const [workoutExe, setWorkoutExe] = useState([]);
  const [editworkoutExe, setEditWorkoutExe] = useState([]);
  const [editExe, setEditExe] = useState([]);
  const formData = new FormData();
  formData.append('task_comments', task_comments);
  const [state, setState] = useState({
    task_commentsError: '',
    task_comments:'',

  });
  const dispatch = useDispatch();
  const UploadFile = async () => {
    try {
      const results = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(results);
      for (const res of results) {
        console.log('response of file in file upload function', res);
        let fileObj1 = {
          uri: res.uri,
          name: res.name,
          type: res.type,
          fileCopyUri: res.fileCopyUri,
          uri: Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri,
        };
        setFile([fileObj1, ...file]);
        setState({...state, fileError: ''});
        setErrors({...errors, file: ''});
        console.log('fileeeeeeee', file);
      }
    } catch (err) {
      console.log('ERROR is ', err);
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const sendcomments = async () => {
    const {task_comments} = state;
    const fileError = await validator('file', file);
    const task_commentsError = await validator('task_comments', task_comments);
    if (!task_commentsError && !fileError) {
      dispatch(setLoader(true));
      const params = {
        workout_objId: workoutId,
        workout_comments: task_comments,
        image: file,
        time: Date.now(),
      };
      try {
        const res = await ApiCall({
          route: `assignplan/addCommentsInWorkoutByUser/${planId}`,
          token: token,
          verb: 'post',
          params: params,
        });

        if (res?.status == '200') {
          console.log('responce', res?.response);
          changeHandler('task_comments', null);
          dayWorkout();
          TskComments();
          dispatch(setLoader(false));
        } else {
          console.log('error', res.response);
          dispatch(setLoader(false));
        }
      } catch (e) {
        console.log('saga get language error -- ', e.toString());
      }
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
  const dayWorkout = async () => {
    try {
      const res = await ApiCall({
        route: `assignplan/exericeInWorkout/${planId}`,
        token: token,
        verb: 'post',
        params: {workout_objId: workoutId},
      });
      if (res?.status == '200') {
        setWorkoutExe(res?.response?.exercise);
        setEditWorkoutExe(res?.response?.edited_Workout);
        setEditExe(res?.response?.edited_Workout?.exercise);
        console.log('edited', res?.response?.edited_Workout?.exercise[0]);
        setCooldown(res?.response?.cooldown_Exercise);
        setCooldownLength(res?.response?.cooldown_Exercise?.length);
        setCooldownComp(
          res?.response?.cooldown_Exercise?.filter(
            item => item?.complete == true,
          )?.length,
        );
        setWarmups(res?.response?.warmup_Exercise);
        setWarmupsLength(res?.response?.warmup_Exercise?.length);
        setWarmupsComp(
          res?.response?.warmup_Exercise?.filter(item => item?.complete == true)
            ?.length,
        );
        settotalEx(res?.response?.exercise?.length);
        setExComplete(
          res?.response?.exercise?.filter(item => item?.complete == true)
            ?.length + 1,
        );
        dispatch(setLoader(false));
      } else {
        console.log('error', res.response);
        alert(
          res?.response?.message
            ? res?.response?.message
            : res?.response?.error,
        );
        dispatch(setLoader(false));
      }
    } catch (e) {
      console.log('saga get language error -- ', e.toString());
    }
  };
  const TskComments = async () => {
    try {
      const res = await ApiCall({
        route: `assignplan/commentsInWorkout/${planId}`,
        token: token,
        verb: 'post',
        params: {
          workout_objId: workoutId,
        },
      });

      if (res?.status == '200') {
        setTskCommentss(res?.response);
        console.log('commm', res?.response);
        dispatch(setLoader(false));
      } else {
        console.log('error', res.response);
        alert(
          res?.response?.message
            ? res?.response?.message
            : res?.response?.error,
        );
        dispatch(setLoader(false));
      }
    } catch (e) {
      console.log('saga get language error -- ', e.toString());
    }
  };
  useEffect(() => {
    dispatch(setLoader(true));
    dayWorkout();
    TskComments();
  }, []);
  const changeHandler = (type, value) => setState({...state, [type]: value});
  return (
    <View style={styles.head}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header
        title={workoutDay}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
      <ScrollView>
        <LinearGradient
          colors={['#FFFFFF','#F5F5F5','#F5F5F5','#F5F5F5','#F5F5F5','#F5F5F5','#F5F5F5','#FFFFFF', ]}
          style={styles.main}>
          <View>
            <Text style={styles.WorkOutDays}>Workout description</Text>
          </View>
          <View>
            <Text style={styles.Description}>{description}</Text>
          </View>
          <Text style={styles.exer}>Exercises</Text>
          {/* <FlatList
            data={editExe}
            keyExtractor={item => item.id}
            onRefresh={() => dayWorkout()}
            refreshing={false}
            ListFooterComponent={() => (
              <View>
                {cooldown[0]?._id == null ? (
                  <View></View>
                ) : (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => {
                      navigation.navigate('WarmSession', {
                        workoutId,
                        completeEx: exComplete + warmupsComp + cooldownComp,
                        totalEx: totalEx + warmupsLength + cooldownLength,
                        cooldown_objId: cooldown[0]?._id,
                        description: cooldown[0]?.description,
                        exerciseName: cooldown[0]?.cooldownName,
                        planId: user?.planId[user?.planId.length - 1],
                      });
                    }}>
                    <View style={styles.listItem}>
                      <View style={styles.alignView}>
                        {cooldown[0]?.complete == true ? (
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
                              {totalEx + 2}
                            </Text>
                          </View>
                        )}
                        <Text style={styles.title}>
                          {cooldown[0]?.cooldownName}
                          <Text
                            style={styles.cooldown}>
                            {' '}
                            (CoolDown)
                          </Text>
                        </Text>
                      </View>
                      <MaterialIcons
                        name={'keyboard-arrow-right'}
                        size={25}
                        color={'#182d4a'}
                      />
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            )}
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
                onPress={() => {
                  navigation.navigate('WarmSession', {
                    workoutId,
                    completeEx: exComplete,
                    totalEx: totalEx,
                    exerciseId: item?._id,
                    description: item?.description,
                    exerciseName: item?.exerciseName,
                    planId: user?.planId[user?.planId.length - 1],
                  });
                }}>
                <View style={styles.listItem}>
                  <View style={styles.alignView}>
                    {item?.complete == true ? (
                      <View style={styles.check1}>
                        <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
                      </View>
                    ) : (
                      <View style={styles.check}>
                        <Text style={styles.workoutsNumbring}>{index + 2}</Text>
                      </View>
                    )}

                    <Text style={styles.title}>{item?.exerciseName}</Text>
                  </View>
                  <MaterialIcons
                    name={'keyboard-arrow-right'}
                    size={25}
                    color={'#182d4a'}
                  />
                </View>
              </TouchableOpacity>
            )}
            ListHeaderComponent={() => (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => {
                  navigation.navigate('WarmSession', {
                    workoutId,
                    completeEx: exComplete,
                    totalEx: totalEx,
                    warmup_objId: warmups[0]?._id,
                    description: warmups[0]?.description,
                    exerciseName: warmups[0]?.warmupName,
                    planId: user?.planId[user?.planId.length - 1],
                  });
                }}>
                <View style={styles.listItem}>
                  <View style={styles.alignView}>
                    {warmups[0]?.complete == true ? (
                      <View style={styles.check1}>
                        <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
                      </View>
                    ) : (
                      <View style={styles.check}>
                        <Text style={styles.workoutsNumbring}>1</Text>
                      </View>
                    )}
                    <Text style={styles.title}>
                      {warmups[0]?.warmupName}
                      <Text
                        style={styles.cooldown}>
                        {' '}
                        (WarmUp)
                      </Text>
                    </Text>
                  </View>
                  <MaterialIcons name={'keyboard-arrow-right'} size={25} color={'#182d4a'}/>
                </View>
              </TouchableOpacity>
            )}
          /> */}
          <FlatList 
          data={editExe}
          renderItem={(item)=>(<Text>{item?.exerciseName}</Text>)}
          />
          
          {select == 1 ? (
            <TouchableOpacity
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
                onRefresh={() => TskComments()}
                refreshing={false}
                ItemSeparatorComponent={() => (
                  <View style={{height: getHeight(2)}}></View>
                )}
                renderItem={({item, index}) => (
                  <View>
                    <View>
                      <View
                        style={styles.prof}>
                        <Image
                          style={{width: 40, height: 40, borderRadius: 25}}
                          source={
                            // user?._id==item?.senderId
                            user?.profileImage
                              ? {uri: user?.profileImage}
                              : require('../../../assets/images/Profile.png')
                          }
                        />
                        {/* <Image
          style={{height:45,width:45,borderRadius:40}}
             source={ item?.coachId?.profileImage
              ? {uri: item?.coachId?.profileImage}
              : 
              require('../../../assets/images/Profile.png')}
                 /> */}
                        <View style={{marginLeft: 7}}>
                          <Text
                            style={{
                              fontFamily: 'Ubuntu-Bold',
                              color: '#182d4a',
                              fontSize: 12,
                            }}>
                            {user?.firstName} {user?.lastName}
                            {user?._id == item?.senderId ? (
                              <Text
                                style={{
                                  fontFamily: 'Ubuntu-SemiBold',
                                  color: '#182d4a',
                                  fontSize: 10,
                                }}>
                                (Trainer)
                              </Text>
                            ) : null}
                          </Text>
                          {/* { var date = ((item)=>item?.time);

var formattedDate = format(date, "MMMM do, yyyy H:mma");
  const formData = new FormData();} */}
                          <Text
                            style={{
                              fontFamily: 'Ubuntu-SemiBold',
                              color: '#182d4a',
                              fontSize: 10,
                            }}>
                            {item?.time}
                          </Text>
                        </View>
                      </View>

                      <Text
                        style={{
                          color: '#182d4a',
                          marginLeft: getWidth(4),
                          marginTop: 5,
                          width: getWidth(87),
                          textAlign: 'left',
                          fontFamily: 'Ubuntu-Regular',
                          fontSize: 12,
                        }}>
                        {item.comment}
                      </Text>
                    </View>
                    {/* <Image
                    style={{
                      margin: 10,
                      height: getHeight(11),
                      width: getWidth(27),
                      borderRadius: 15,
                    }}
                    source={require('../../../assets/images/addequip.png')}
                  /> */}
                  </View>
                )}
                ListEmptyComponent={() =>
                  loader ? null : (
                    <View>
                      <Image
                        style={styles.img}
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

              <View style={{...styles.commentsBox, width: getWidth(87)}}>
                <TextInput
                  mode="outlined"
                  label="Email address"
                  theme={{roundness: 15}}
                  clearButtonMode={'always'}
                  ref={inputRefs.task_comments}
                  value={state.task_comments}
                  outlineColor="#BDC3C4"
              activeUnderlineColor="#182d4a"
              returnKeyType='send'
              activeOutlineColor="#182d4a"
                  placeholder="Write comment..."
                  
                  style={{
                    height: getHeight(5),
                    width: getWidth(80),
                    backgroundColor: 'white',
                    color: '#182d4a',
                    alignSelf: 'center',
                  }}
                  onSubmitEditing={() => current.focus()}
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
                  }}>
                  <TouchableOpacity onPress={() => UploadFile()}>
                    <View style={{flexDirection: 'row', margin: 10}}>
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
                        width: getWidth(12),
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
            <Text style={GernalStyle.InputError}>{state?.task_commentsError}</Text>

              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{marginTop: getHeight(2.8)}}
                horizontal={true}
                data={file}
                ListFooterComponent={() => (
                  <View style={{width: getWidth(4)}} />
                )}
                renderItem={({item, index}) => (
                  <View>
                    <Image
                      resizeMode="stretch"
                      numberOfLines={1}
                      style={styles.image}
                      source={file[index]}
                    />
                    <Entypo
                      name={'cross'}
                      size={getFontSize(4)}
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
              <View style={styles.footer}>
                <Text
                  style={{
                    color: '#182d4a',
                    fontSize: 10,
                    fontFamily: 'Ubuntu-Bold',
                    fontSize: 10,
                  }}>
                  Expand comments
                </Text>
                <Entypo name={'menu'} size={11} color={'#182d4a'} />
              </View>
            </KeyboardAwareScrollView>
          ) : (
            <View></View>
          )}

          <View style={styles.footer}></View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

export default EditedWorkout;
