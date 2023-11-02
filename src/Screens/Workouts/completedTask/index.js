import React, {useState, useRef,useEffect} from 'react';
import {Text, View, TouchableOpacity,ScrollView,Image,TextInput,FlatList,StyleSheet} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';
import {Divider} from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';
import Modal from 'react-native-modal';
import Entypo from 'react-native-vector-icons/Entypo';
import validator from '../../../../utils/validation/validator';
import {styles} from './styles';
import {useDispatch} from 'react-redux';
import Header from '../../../Components/Header';
import { useSelector } from 'react-redux';
import { setLoader } from '../../../Redux/actions/GernalActions';
import { ApiCall } from '../../../Services/Apis';
import WebView from 'react-native-webview';
import ImageCropPicker from 'react-native-image-crop-picker';
import { BASE_URL } from '../../../Services/Constants';
import ImageModal, {ImageDetail} from 'react-native-image-modal';
import { GernalStyle } from '../../../constants/GernalStyle';
import moment from 'moment';
import { timeSince } from '../../../../utils/ResponsiveFun';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const CompletedTask = ({navigation, route}) => {
   
  const [select, setSelect] = useState(0);
  const [file,setFile]=useState([])
 
  const [tskComments, setTskComments] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const { workoutId,
    exerciseId,
    planId,
    cooldown_objId,
    warmup_objId,
    exerciseName,
    description,
      tasksId}=route?.params
  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken);
  const loader = useSelector(state => state.gernal.loader);
  const [task, setTask] = useState();
  
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
          
        },
      });

      if (res?.status == '200') {
       console.log('res',res?.response)
        setTask(res?.response);
       
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
          // task_objId: tasksId,
          warmup_objId:warmup_objId,
          cooldown_objId:cooldown_objId,
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

  const dispatch = useDispatch();
  const [state, setState] = useState({
    file:'',
    fileError: '',
    issue: '',
    IssueError: '',
    task_comments:'',
    task_commentsError:'',
    specifications: '',
    specificationsError: '',
  });
  const inputRefs = {
    Comments: useRef(null),
    equipmentName: useRef(null),
    task_comments:useRef(null),
    specifications: useRef(null),
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
        uri:response?.path,
        name: response?.filename,
        type: response?.mime,
        size:response?.size
      };
      setFile([fileObj1, ...file]);
      setState({...state, fileError: ''});
  
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
      exerciseId&&formData.append('exercise_objId', exerciseId);
      warmup_objId&&formData.append('warmup_objId', warmup_objId);
      cooldown_objId&&formData.append('cooldown_objId', cooldown_objId);
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
        .then((res) => { 
          changeHandler('task_comments', null);
          setFile([]);
          singleTasks();
          TskComments();
          dispatch(setLoader(false));})
        .then((result) => dispatch(setLoader(false)))
        .catch((error) => console.error("catch",error));
      
   
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
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    dispatch(setLoader(true));
    singleTasks();
    TskComments();
  }, []);
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
        title={'Task Detail'}
        LeftIcon={
          <TouchableOpacity onPress={() => navigation.navigate('DayWorkOuts', {
            workoutId,
            exerciseId,
            planId,
            warmup_objId,
            cooldown_objId,
            exerciseName,
            description
            
          })}>
            <Ionicons
              style={{alignSelf: 'center', marginRight: getWidth(3)}}
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
            source={{ uri: task?.guideline }}
            allowsInlineMediaPlayback={false}
            mediaPlaybackRequiresUserAction={false}
            style={{width:getWidth(90),height:400}}
          />
        </View>
      </Modal>

      <Divider style={styles.headerDivider} />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.main}>
          <View style={{marginTop: getHeight(2.5),marginLeft:getWidth(4)}}>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 15,

                color: '#182d4a',
                fontFamily: 'Ubuntu-Bold',
              }}>
              Video guideline
            </Text>
         
            <TouchableOpacity
              onPress={toggleModal}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: getHeight(0.3),
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
              <Text style={styles.Description}>{task?.description}</Text>
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
            <Text style={styles.Discrip}>
              {task?.instruction}
            </Text>
          
          </View>

        </View>

        <View style={{marginTop: getHeight(5),borderBottomWidth:StyleSheet.hairlineWidth,borderColor:'#182d4a'}}/>
        <View
          style={{marginTop:-8}}>
            <View style={styles.comments}>
            <Text
                style={{
                  color: '#182d4a',
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  marginLeft: 7,
                  paddingHorizontal:6,
                  backgroundColor:'white'
                }}>
                Client submission
              </Text>
              {(task?.complete)?<Text style={{ color: '#219653',
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  backgroundColor:'white',
                  paddingHorizontal:5,
                  marginLeft: 7}}>
              <AntDesign name={'checkcircle'} size={15} color={'#219653'} /> Complete</Text>:<Text style={{ color: '#F2994A',
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  backgroundColor:'white',
                  paddingHorizontal:5,
                  marginLeft: 7}}>
              <Entypo name={'circle-with-cross'} size={15} color={'#F2994A'} /> In-complete</Text>}
              
            </View>
          </View>
          <Text style={{
                fontSize: 12,
                fontFamily: 'Ubuntu-Bold',
                marginLeft:getWidth(4),
                lineHeight: 15,
                color: '#182d4a',
                marginTop: getHeight(2.3),
              }}>Client {task?.complete?"submission":"reason"}</Text>
          <Text style={{
                fontSize: 12,
                fontFamily: 'Comfortaa',
                lineHeight: 15,
                marginLeft:getWidth(4),
                width:getWidth(95),
                color: '#182d4a',
                marginTop: getHeight(1),
              }}>{task?.complete?task?.feedback:task?.missedReason}</Text>

{task?.complete&&<View>
  <View>
           <Text
          style={{...styles.WorkOutDays,marginTop:getHeight(2),marginLeft:getWidth(5),}}>
          Attachments
        </Text>
      </View>
     
      <View>
      <FlatList
      
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
         
          horizontal={true}
          data={task?.image}
          ListEmptyComponent={() =>
            loader ? null : (
              <View style={{width:getWidth(30),height:getHeight(15)}}>
                <Image
                  style={{...styles.img, marginTop: getHeight(5)}}
                  resizeMode={'contain'}
                  source={require('../../../assets/images/empty.png')}
                />
              </View>
            )
          }
          ListFooterComponent={() => <View style={{width: getWidth(1)}} />}
          renderItem={({item, index}) => (
            <View>
            <ImageModal
              resizeMode='contain'
              numberOfLines={1}
              style={styles.image}
              source={{uri: item}}
                
              
            />
       
          </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
 

</View>}


        <View style={{marginTop: getHeight(5),borderBottomWidth:StyleSheet.hairlineWidth,borderColor:'#182d4a'}}/>
        {select == 1 ? (
          <TouchableOpacity
          style={{marginTop:-8}}
            onPress={() => {
              setSelect(0);
            }}>
            <View style={styles.comments}>
            <Text
                style={{
                  color: '#182d4a',
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  marginLeft: 7,
                  paddingHorizontal:6,
                  backgroundColor:'white'
                }}>
                Comments
              </Text>
              <Text style={{ color: '#182d4a',
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  backgroundColor:'white',
                  paddingHorizontal:5,
                  marginLeft: 7}}>
              <AntDesign name={'caretdown'} size={10} color={'#182d4a'} />  Collapse</Text>
              
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
          style={{marginTop:-8,marginBottom:getHeight(10)}}
            onPress={() => {
              setSelect(1);
            }}>
            <View style={styles.comments}>
            <Text
                style={{
                  color: '#182d4a',
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  marginLeft: 7,
                  backgroundColor:'white',
                  paddingHorizontal:6
                }}>
                Comments
              </Text>
              <Text style={{ color: '#182d4a',
                  fontFamily: 'Ubuntu-Bold',
                  fontSize: 12,
                  backgroundColor:'white',
                  paddingHorizontal:5,
                  marginLeft: 7}}>
              <AntDesign name={'caretright'} size={10} color={'#182d4a'} />  Collapse</Text>
            
            </View>
          </TouchableOpacity>
        )}
        

        {select == 1 ? (
          <KeyboardAwareScrollView style={styles.commentsBox}>
            <FlatList
              data={tskComments}
              keyExtractor={item => item.id}
              onRefresh={() => Warmupsecc()}
              refreshing={false}
              ItemSeparatorComponent={() => (
                <View style={{height: getHeight(2)}}></View>
              )}
              renderItem={({item, index}) => (
                <View>
                  <View>
                    <View
                      style={{
                        justifyContent: 'flex-start',
                        flexDirection: 'row',
                        marginLeft: 10,
                        marginTop: 10,
                      }}>
                      <ImageModal
                        style={{width: 40, height: 40, borderRadius: 25}}
                      
                        source={
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
                          {/* <Text
                            style={{
                              fontFamily: 'Ubuntu-SemiBold',
                              color: '#182d4a',
                              fontSize: 10,
                            }}>
                            (Trainer)
                          </Text> */}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Ubuntu-SemiBold',
                            color: '#182d4a',
                            fontSize: 10,
                          }}>
                          {timeSince( new Date(item.time))}
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
                  <View style={{flexDirection:'row',marginTop:getHeight(1),width:getWidth(90)}}>
                    {item?.image&& item?.image?.map((item2)=> <ImageModal
                    resizeMode='contain'
                    numberOfLines={1}
                    style={styles.image}
                    source={{uri:item2}}
                  />)}
                    </View>
                </View>
              )}
              ListEmptyComponent={() =>
                loader ? null : (
                  <View>
                    <Image
                      style={{...styles.img, height: 140, width: 140}}
                      resizeMode="stretch"
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

            <View style={{...styles.commentsBox, width: getWidth(95), borderColor:'#182d4a26',
    borderWidth:0.7,}}>
              <TextInput
                mode="outlined"
                // label="Email address"
              label={<Text style={GernalStyle.inputLabelStyle}>Email address</Text>} 

                theme={{roundness: 15}}
                ref={inputRefs.task_comments}
                value={state.task_comments}
            
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
                onFocus={() => setState({...state, task_commentsError: ''})}
                onChangeText={task_comments =>
                  changeHandler('task_comments', task_comments)
                }
                blurOnSubmit={false}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <TouchableOpacity onPress={() => UploadFile()}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      margin: 10,
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
                      width: getWidth(16),
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
              ListFooterComponent={() => <View style={{width: getWidth(4)}} />}
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
          </KeyboardAwareScrollView>
        ) : (
          <View></View>
        )}

   
      </ScrollView>

   
    </View>
  );
};
export default CompletedTask;
