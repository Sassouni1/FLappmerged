import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput,
  FlatList,
  Linking,
} from 'react-native';
import ImageModal from 'react-native-image-modal';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {
  getFontSize,
  getHeight,
  getWidth,
  timeSince,
} from '../../../../utils/ResponsiveFun';
import {Divider} from 'react-native-paper';

import {GernalStyle} from '../../../constants/GernalStyle';
import DocumentPicker from 'react-native-document-picker';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {styles} from './styles';
import validator from '../../../../utils/validation/validator';
import Button from '../../../Components/Button';
import Header from '../../../Components/Header';
import {useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import {ApiCall} from '../../../Services/Apis';
import {setLoader} from '../../../Redux/actions/GernalActions';
import WebView from 'react-native-webview';
import {BASE_URL} from '../../../Services/Constants';
import SimpleToast from 'react-native-simple-toast';
import ImageCropPicker from 'react-native-image-crop-picker';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
validator;
const Fastpacedwalking = ({navigation, route}) => {
  const inputRefs = {task_comments: useRef(null)};
  const {
    workoutId,
    tasksId,
    warmup_objId,
    cooldown_objId,
    planId,
    exerciseName,
    exerciseId,
    title,
    description,
    instruction,
    totaltask,
    completeTask,
  } = route?.params;
  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken);
  const loader = useSelector(state => state.gernal.loader);
  const [select, setSelect] = useState(0);
  // const getVideoId = require('get-video-id');
  const [task, setTask] = useState([]);
  const [task_comments, setTask_comments] = useState([]);
  const [commentss, setCommentss] = useState();
  const [tskCommentss, setTskComments] = useState();
  const [isModalVisible, setModalVisible] = useState(false);
  const [numbers, setNumbers] = useState();
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const [file, setFile] = useState([]);
  const dispatch = useDispatch();
  const formData = new FormData();
  formData.append('task_comments', task_comments);

  const [state, setState] = useState({
    tskComments: '',
    task_commentsError: '',
  });
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
      file?.map(item => formData.append('image', item));
      formData.append('workout_objId', workoutId);
      formData.append('exercise_objId', exerciseId);
      tasksId && formData.append('task_objId', tasksId);

      const date = moment.now();
      formData.append('time', date);
      formData.append('task_comments', task_comments);

      fetch(BASE_URL + `/assignplan/addCommentsInTaskByUser/${planId}`, {
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
          changeHandler('task_comments', null);
          setFile([]);
          singleTasks();
          TskComments();
          dispatch(setLoader(false));
        })
        .then(result => dispatch(setLoader(false)))
        .catch(error => console.error('catch', error));
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

  const singleTasks = async () => {
    try {
      const res = await ApiCall({
        route: `assignplan/singleTask/${planId}`,
        token: token,
        verb: 'post',
        params: {
          workout_objId: workoutId,
          exercise_objId: exerciseId,
          task_objId: tasksId,
          cooldown_objId: cooldown_objId,
          warmup_objId: warmup_objId,
        },
      });

      if (res?.status == '200') {
        setTask(res?.response);

        // setCommentss(res?.response?.guideline);

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
        route: `assignplan/commentsInTask/${planId}`,
        token: token,
        verb: 'post',
        params: {
          workout_objId: workoutId,
          exercise_objId: exerciseId,
          task_objId: tasksId,
        },
      });

      if (res?.status == '200') {
        setTskComments(res?.response);
        console.log('commm', res?.response[0]);
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

  // getVideoId(commentss);
  // const { id } = getVideoId(commentss);
  // console.log('id', id);
  useEffect(() => {
    dispatch(setLoader(true));
    singleTasks();
    TskComments();
  }, []);
  const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;">
          <video width="100%" height="100%" autoplay controls>
            <source src="https://youtu.be/p9tvdKK8uJs" type="video/mp4" />
          </video>
        </body>
      </html>
    `;

  const changeHandler = (type, value) => setState({...state, [type]: value});
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header
        title={title}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={{alignSelf: 'center', marginRight: getWidth(2)}}
              height={200}
              width={200}
              name={'arrow-back'}
              size={25}
              color={'#182d4a'}
            />
          </TouchableOpacity>
        }
      />

      <Modal isVisible={isModalVisible}>
        <View style={styles.mainview}>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              marginRight: getWidth(5),
            }}
            onPress={toggleModal}>
            <Ionicons
              style={{marginTop: getHeight(1)}}
              name={'close-sharp'}
              size={25}
              color={'#182d4a20'}
            />
          </TouchableOpacity>
          <WebView
            source={{uri: task?.guideline}}
            allowsInlineMediaPlayback={false}
            mediaPlaybackRequiresUserAction={false}
            style={{width: getWidth(90), height: 400}}
          />
        </View>
      </Modal>

      <Divider style={styles.headerDivider} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <View style={{marginTop: getHeight(2.5)}}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 15,

                color: '#182d4a',
                fontFamily: 'Ubuntu-Bold',
              }}>
              How to perform this exercise?
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                fontFamily: 'Ubuntu-Regular',
                lineHeight: 14,
                color: '#182d4a',
                marginTop: getHeight(1),
              }}>
              Here is a video to properly perform this excercise.
            </Text>
            <TouchableOpacity
              // onPress={() => {
              //   Linking.openURL(commentss);
              // }}
              onPress={toggleModal}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: getHeight(2.3),
                }}>
                <Ionicons name={'logo-youtube'} size={30} color={'#182d4a'} />
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 17,
                    fontFamily: 'Ubuntu-Bold',
                    marginLeft: getWidth(2),
                    color: '#182d4a',
                  }}>
                  View video guideline.
                </Text>
              </View>
            </TouchableOpacity>
            <View style={{marginTop: getHeight(1.5)}}>
              <Text style={styles.WorkOutDays}>Description</Text>
            </View>
            <View>
              <Text style={styles.Description}>{description}</Text>
            </View>

            <Text
              style={{
                fontSize: 12,
                fontFamily: 'Ubuntu-Bold',
                lineHeight: 15,
                color: '#182d4a',
                marginTop: getHeight(2.3),
              }}>
              Instruction
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 15,
                fontFamily: 'Ubuntu-Regular',
                fontWeight: '400',
                color: '#182d4a',
                marginTop: getHeight(1),
                width: getWidth(90),
              }}>
              {instruction}
            </Text>
          </View>

          {/* <View style={{marginTop: getHeight(3.5)}}>
            <FlatList
              data={task?.requirements}
              keyExtractor={item => item.id}
              onRefresh={() => singleTasks()}
              refreshing={false}
              ListEmptyComponent={() =>
                loader ? null : (
                  <View>
                    <Image
                      style={{...styles.img, marginTop: getHeight(5)}}
                      source={require('../../../assets/images/empty.png')}
                    />
                  </View>
                )
              }
              ListHeaderComponent={(item, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 12,
                      lineHeight: 15,
                      color: '#182d4a',
                    }}>
                    Sets
                  </Text>
                  <Text
                    style={{
                      marginLeft: getWidth(10),
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 12,
                      lineHeight: 15,
                      color: '#182d4a',
                    }}>
                    Reps
                  </Text>
                  <Text
                    style={{
                      marginLeft: getWidth(25),
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 12,
                      lineHeight: 15,
                      color: '#182d4a',
                    }}>
                    Lb
                  </Text>
                </View>
              )}
              renderItem={({item, index}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    marginTop: getHeight(1.5),
                    width: getWidth(90),

                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontFamily: 'Ubuntu-Bold',
                      fontSize: 12,
                      lineHeight: 15,
                      color: '#182d4a',
                    }}>
                    {index + 1}
                  </Text>
                  <View
                    style={{
                      borderRadius: 15,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: '#E1DBE5',
                      width: getWidth(32),
                      height: getHeight(5),
                    }}>
                    <Text
                      style={{
                        color: '#182d4a',
                        fontFamily: 'Ubuntu-Regular',
                        fontSize: 12,
                        fontWeight: '400',
                        lineHeight: 15,
                      }}>
                      {item?.reps} required
                    </Text>
                  </View>
                  <View
                    style={{
                      borderRadius: 15,
                      borderWidth: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderColor: '#E1DBE5',
                      width: getWidth(32),
                      height: getHeight(5),
                    }}>
                    <Text
                      style={{
                        color: '#182d4a',
                        fontFamily: 'Ubuntu-Regular',
                        fontSize: 12,
                        fontWeight: '400',
                        lineHeight: 15,
                      }}>
                      {item?.lebs}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 26,
                      backgroundColor: '#182d4a15',
                      width: 26,
                      borderRadius: 13,
                      marginRight: getWidth(1),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
                  </View>
                </View>
              )}
            />
          </View> */}
        </View>

        <View style={{height: getHeight(2)}}></View>
        {select == 1 ? (
          <TouchableOpacity
            onPress={() => {
              setSelect(0);
            }}>
            <View style={styles.comments}>
              <AntDesign name={'caretdown'} size={10} color={'#182d4a'} />
              <Text
                style={{
                  color: '#182d4a',
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  marginLeft: 7,
                }}>
                Comments
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setSelect(1);
            }}>
            <View style={styles.comments}>
              <AntDesign name={'caretright'} size={10} color={'#182d4a'} />
              <Text
                style={{
                  color: '#182d4a',
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  marginLeft: 7,
                }}>
                Comments
              </Text>
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
                      <ImageModal
                        style={{width: 30, height: 30, borderRadius: 15}}
                        source={
                          // user?._id==item?.senderId
                          user?.profileImage
                            ? {uri: user?.profileImage}
                            : require('../../../assets/images/Profile.png')
                        }
                      />

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
                            {user?.coachId?.firstName} {user?.coachId?.lastName}
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
                          {timeSince(new Date(item?.time)) + 'ago'}
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
                      {item?.comment}
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
                    Write comment...ß
                  </Text>
                }
                theme={{roundness: 15}}
                clearButtonMode={'always'}
                ref={inputRefs.task_comments}
                value={state.task_comments}
                returnKeyType="send"
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
              ListFooterComponent={() => <View style={{width: getWidth(4)}} />}
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
        <Button
          onPress={() =>
            navigation.navigate('Fastpacedwalking1', {
              workoutId,

              exerciseId,
              numbers: numbers,
              totaltask,
              task: task,
              completeTask,
              tasksId,

              warmup_objId,
              cooldown_objId,
              data: task,
              exerciseName,
              commentss: commentss,

              title: title,
              description: description,
              planId: user?.planId[user?.planId.length - 1],
            })
          }
          text="Click to Proceed"
          btnStyle={{
            ...GernalStyle.btn,
          }}
          btnTextStyle={GernalStyle.btnText}
        />
        <View style={styles.footer}></View>
      </ScrollView>
    </View>
  );
};
export default Fastpacedwalking;
