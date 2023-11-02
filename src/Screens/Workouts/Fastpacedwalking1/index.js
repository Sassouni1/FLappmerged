import React, {useState, useRef, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  FlatList,
} from 'react-native';
import ImageModal from 'react-native-image-modal';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {
  getFontSize,
  getHeight,
  getWidth,
} from '../../../../utils/ResponsiveFun';
import {Divider, TextInput} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Modal from 'react-native-modal';
import {GernalStyle} from '../../../constants/GernalStyle';
import Entypo from 'react-native-vector-icons/Entypo';
import validator from '../../../../utils/validation/validator';
import {validateFields} from '../../../../utils/validation/validate-fields';
import {styles} from './styles';
import Button from '../../../Components/Button';
import {useDispatch} from 'react-redux';
import Header from '../../../Components/Header';
import {useSelector} from 'react-redux';
import {setLoader} from '../../../Redux/actions/GernalActions';
import {ApiCall} from '../../../Services/Apis';
import {
  getExercises,
  getExercisesTasks,
  getUpcomingWorkout,
} from '../../../Redux/actions/WorkoutActions';
import WebView from 'react-native-webview';
import ImageCropPicker from 'react-native-image-crop-picker';
import {BASE_URL} from '../../../Services/Constants';
import {getSingleUser} from '../../../Redux/actions/AuthActions';
validator;
const Fastpacedwalking1 = ({navigation, route}) => {
  const inputRefs = {
    reps: useRef(null),
    labs: useRef(null),
    feedback: useRef(null),
    reason: useRef(null),
  };
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const toggleModal1 = () => {
    setModalVisible1(!isModalVisible1);
  };
  const toggleModal2 = () => {
    setModalVisible2(!isModalVisible2);
  };
  const {
    workoutId,
    tasksId,
    cooldown_objId,
    warmup_objId,
    planId,
    exerciseName,
    instruction,
    exerciseId,
    completeTask,
    title,
    inCompleteTask,
    description,
    data,
    totaltask,
    task,
  } = route?.params;

  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken);
  const [task_requirement, setTask_requirement] = useState(task.requirements);
  const [file, setFile] = useState([]);
  const [complete, setComplete] = useState(true);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    fileError: '',
    imgError: '',
    feedback: '',
    repsError: '',
    labsError: '',
    task_requirementError: '',
    completeError: '',
    feedbackError: '',
  });

  const save = async () => {
    // toggleModal1();
    toggleModal();

    dispatch(setLoader(true));
    const {feedback} = state;
    dispatch(setLoader(true));
    const formData = new FormData();
    file?.map(item => formData.append('image', item));
    formData.append('workout_objId', workoutId);
    formData.append('exercise_objId', exerciseId);
    tasksId && formData.append('task_objId', tasksId);

    formData.append('task_complete', complete);
    formData.append('task_feedback', feedback);
    tasksId && formData.append('totalTask', totaltask);
    tasksId && formData.append('completeTask', completeTask);

    fetch(BASE_URL + `/assignplan/updateTask/${planId}`, {
      method: 'POST',
      body: formData,

      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(res => {
        dispatch(getSingleUser(token));
        dispatch(getUpcomingWorkout({token, planId}));
        dispatch(
          getExercises({token, planId, data: {workout_objId: workoutId}}),
        );

        dispatch(setLoader(false));
        // navigation.goBack();
        navigation.navigate('DayWorkOuts', {
          workoutId,
          exerciseId,
          planId,
          cooldown_objId,
          exerciseName,
          description,
          warmup_objId,
          tasksId,
        });

        dispatch(setLoader(false));
      })
      .then(result => dispatch(setLoader(false)))
      .catch(error => console.error('catch', error));
  };
  const missTask = async () => {
    const {reason} = state;
    // const reasonError = await validator('reason', reason);
    // if (!reasonError) {
      toggleModal1();
      dispatch(setLoader(true));

      try {
        const res = await ApiCall({
          route: `assignplan/missedTask/${planId}`,
          token: token,
          verb: 'patch',
          params: {
            workout_objId: workoutId,
            exercise_objId: exerciseId,
            task_objId: tasksId,
            ...(reason?.trim() !=='' && { task_reason: reason,})
          
          },
        });

        if (res?.status == '200') {
          toggleModal1();
          dispatch(getUpcomingWorkout({token, planId}));
          dispatch(
            getExercises({token, planId, data: {workout_objId: workoutId}}),
          );

          navigation.navigate('DayWorkOuts', {
            workoutId,
            exerciseName,
            exerciseId,
            cooldown_objId,
            warmup_objId,
            description: description,
            planId: user?.planId[user?.planId.length - 1],
          });
          changeHandler('reason', null);
          dispatch(setLoader(false));
        } else {
          toggleModal1();

          console.log('error', res.response);
          dispatch(setLoader(false));
        }
      } catch (e) {
        console.log('saga get language error -- ', e.toString());
      }
    // } else {
    //   dispatch(setLoader(false));
    //   setState({
    //     ...state,
    //     reasonError,
    //   });
    //   // alert("error accoured");
    // }
  };

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
    }
  };

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
              name={'arrow-back'}
              size={25}
              color={'#182d4a'}
            />
          </TouchableOpacity>
        }
      />
      <Divider style={styles.headerDivider} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <Modal isVisible={isModalVisible}>
            <View
              style={{
                width: '100%',
                backgroundColor: 'white',
                borderRadius: 15,
                alignItems: 'center',
              }}>
              <View style={styles.secView}>
                <View />
                <Text style={{...styles.taskview, marginTop: 8}}>
                  Task completed
                </Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Ionicons
                    style={{marginTop: getHeight(1), marginLeft: getWidth(1)}}
                    name={'close-sharp'}
                    size={25}
                    color={'#182d4a20'}
                  />
                </TouchableOpacity>
              </View>

              <View style={{marginTop: getHeight(2)}}>
                <TextInput
                  mode="outlined"
                  // label="Feedback"
                  label={
                    <Text style={GernalStyle.inputLabelStyle}>Feedback</Text>
                  }
                  placeholder="Feedback"
                  multiline={true}
                  theme={{roundness: 15}}
                  outlineColor="#BDC3C4"
                  activeUnderlineColor="#182d4a"
                  activeOutlineColor="#182d4a"
                  style={{
                    ...GernalStyle.input,
                    height: getHeight(13),
                    width: getWidth(85),
                  }}
                  ref={inputRefs.feedback}
                  value={state.feedback}
                  returnKeyType={'next'}
                  keyboardType="ascii-capable"
                  onFocus={() => setState({...state, feedbackError: ''})}
                  onBlur={() =>
                    validateFields(state.feedback, 'feedback', error =>
                      setState({...state, feedbackError: error}),
                    )
                  }
                  onSubmitEditing={() => save()}
                  // onSubmitEditing={() => inputRefs[save()]}
                  onChangeText={feedback => changeHandler('feedback', feedback)}
                  blurOnSubmit={false}
                />
                <Text style={GernalStyle.InputError}>
                  {state.feedbackError}
                </Text>
              </View>

              <TouchableOpacity onPress={() => UploadFile()}>
                <View style={styles.neview}>
                  <Entypo
                    style={{alignSelf: 'center'}}
                    name={'attachment'}
                    size={18}
                    color={'#182d4a'}
                  />
                  <Text style={styles.atteched}>Attach video/image</Text>
                </View>
              </TouchableOpacity>

              <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{marginTop: getHeight(1)}}
                horizontal={true}
                data={file}
                ListFooterComponent={() => (
                  <View
                    style={{width: getWidth(1), marginLeft: getWidth(70)}}
                  />
                )}
                renderItem={({item, index}) => (
                  <View>
                    <ImageModal
                      resizeMode="cover"
                      numberOfLines={1}
                      style={{
                        ...styles.image,
                        width: getWidth(20),
                        height: getHeight(8),
                      }}
                      source={file[index]}
                    />
                    <Entypo
                      name={'cross'}
                      size={20}
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
              <Button
                onPress={() => save()}
                text="Submit & Mark as complete"
                btnStyle={{
                  ...GernalStyle.btn,
                  width: getWidth(85),
                  marginBottom: getHeight(2),
                  marginTop: getHeight(3),
                }}
                btnTextStyle={GernalStyle.btnText}
              />
            </View>
          </Modal>
          <Modal isVisible={isModalVisible1}>
            <View style={{...styles.mainview, height: getHeight(30)}}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end', marginRight: 10}}
                onPress={toggleModal1}>
                <Ionicons
                  style={{
                    marginTop: getHeight(0.5),
                    marginBottom: getHeight(1.5),
                  }}
                  name={'close-sharp'}
                  size={25}
                  color={'#182d4a20'}
                />
              </TouchableOpacity>

              <View>
                <TextInput
                  mode="outlined"
                  // label="Write reason"
                  label={
                    <Text style={GernalStyle.inputLabelStyle}>
                      Write reason
                    </Text>
                  }
                  placeholder="Write reason"
                  theme={{roundness: 15}}
                  multiline={true}
                  numberOfLines={10}
                  outlineColor="#BDC3C4"
                  activeUnderlineColor="#182d4a"
                  activeOutlineColor="#182d4a"
                  style={{
                    ...GernalStyle.input,
                    width: getWidth(85),

                    height: getHeight(13),
                  }}
                  ref={inputRefs.reason}
                  value={state.reason}
                  returnKeyType={'next'}
                  keyboardType="ascii-capable"
                  onFocus={() => setState({...state, reasonkError: ''})}
                  onBlur={() =>
                    validateFields(state.reason, 'reason', error =>
                      setState({...state, reasonkError: error}),
                    )
                  }
                  onSubmitEditing={() => missTask()}
                  onChangeText={reason => changeHandler('reason', reason)}
                  blurOnSubmit={false}
                />
                <Text style={GernalStyle.InputError}>{state.reasonError}</Text>
              </View>

              <Button
                onPress={() => missTask()}
                text="Submit"
                btnStyle={{
                  ...GernalStyle.btn,
                  width: getWidth(85),
                  marginTop: getHeight(2),
                  marginBottom: getHeight(2),
                }}
                btnTextStyle={GernalStyle.btnText}
              />
            </View>
          </Modal>
          <Modal isVisible={isModalVisible2}>
            <View style={styles.mainview}>
              <TouchableOpacity
                style={{
                  alignSelf: 'flex-end',
                  marginRight: getWidth(5),
                }}
                onPress={toggleModal2}>
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
          <View style={{marginTop: getHeight(2.5)}}>
            <Text style={styles.heding}>How to perform this excercise?</Text>
            <Text style={styles.maindiscription}>
              Here is a video to properly perform this excercise.
            </Text>
            {/* <TouchableOpacity onPress={ ()=>{ Linking.openURL(commentss)}}> */}
            <TouchableOpacity onPress={toggleModal2}>
              <View style={styles.youtube}>
                <Ionicons name={'logo-youtube'} size={30} color={'#182d4a'} />
                <Text style={styles.videoguideline}>View video guideline.</Text>
              </View>
            </TouchableOpacity>
            <View style={{marginTop: getHeight(1)}}>
              <Text style={styles.WorkOutDays}>Description</Text>
            </View>
            <View>
              <Text style={styles.Description}>{description}</Text>
            </View>
            <Text style={styles.record}>Instruction</Text>
            <Text style={styles.Discrip}>{instruction}</Text>
          </View>
        </View>
        <Text style={GernalStyle.InputError}>{state.repsError}</Text>
        <Text style={GernalStyle.InputError}>{state.labsError}</Text>
        <Text
          style={{
            ...styles.WorkOutDays,
            marginLeft: 15,
            marginTop: getHeight(2),
          }}>
          Submit your workout
        </Text>
        <TouchableOpacity onPress={() => UploadFile()}>
          <View style={styles.uploadFile}>
            <View style={styles.Camera}>
              <Text style={styles.attach}> Attach video/image</Text>
              <Entypo name={'camera'} size={16} color={'#182d4a'} />
            </View>
          </View>
        </TouchableOpacity>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: getHeight(2.8)}}
          horizontal={true}
          data={file}
          ListFooterComponent={() => <View style={{width: getWidth(4)}} />}
          renderItem={({item, index}) => (
            <View>
              <ImageModal
                resizeMode="contain"
                numberOfLines={1}
                style={styles.image}
                source={file[index]}
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
        <TouchableOpacity
          // onPress={() => missTask()}
          onPress={toggleModal1}>
          <Text style={styles.missMark}>Mark as missed</Text>
        </TouchableOpacity>
        <Button
          onPress={toggleModal}
          text="Mark as complete"
          btnStyle={{...GernalStyle.btn}}
          btnTextStyle={GernalStyle.btnText}
        />
        <View style={styles.footer}></View>
      </ScrollView>
    </View>
  );
};
export default Fastpacedwalking1;
