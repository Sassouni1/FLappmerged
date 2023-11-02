import React, {useState, useRef,useEffect} from 'react';
import {
  Text,
  Animated,
  Image,
  View,
  FlatList,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {GernalStyle} from '../../../constants/GernalStyle';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../../Components/Header';
import {validateFields} from '../../../../utils/validation/validate-fields';
import {styles} from './styles';
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch} from 'react-redux';
import {SceneMap, TabView} from 'react-native-tab-view';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {Divider} from 'react-native-paper';
import Comments from '../../../Components/Comments';
import WorkoutWeek from '../../../Components/WorkoutWeek';
import {useSelector} from 'react-redux';
import { setLoader } from '../../../Redux/actions/GernalActions';
import { ApiCall } from '../../../Services/Apis';
const PastDayWorkouts = ({navigation,route}) => {
  const {workoutId,planId}=route?.params
  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken);
  const loader = useSelector(state => state.gernal.loader);
  const [index, setIndex] = useState(0);
  const [select, setSelect] = useState(0);
  const [workoutExe, setWorkoutExe] = useState([]);
  const dispatch = useDispatch();
  const dayWorkout = async () => {
    try {
      const res = await ApiCall({
        route: `assignplan/exericeInWorkout/${planId}`,
        token: token,
        verb: 'post',
        params: {workout_objId:workoutId},
      });

      if (res?.status == '200') {
  
        console.log('res', res?.response?.exercise);
        setWorkoutExe(res?.response?.exercise)
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
    dispatch(setLoader(true))
    dayWorkout();
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
        title={workoutId.workoutName}
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
  <ScrollView>
     
      <LinearGradient
        colors={['#FFFFFF','#F5F5F5','#F5F5F5','#F5F5F5','#F5F5F5','#F5F5F5','#F5F5F5', '#FFFFFF']}
        style={styles.main}>
              <View>
        <Text
          style={styles.WorkOutDays}>
          Workout description
        </Text>
      </View>
      <View>
        <Text
          style={styles.Description}>
          This is the program description added as workout details. Lorem ipsum dolor sit amet consectetur. Ut interdum aliquet suspendisse at eget tempor. Tristique ut pulvinar purus etiam tincidunt pellentesque commodo.
        </Text>
      </View>
          <Text style={{color:'#182d4a', fontFamily:'Ubuntu-Bold',fontSize:12, marginLeft:7}}>Exercises</Text>
          <FlatList
      data={workoutExe}
      keyExtractor={item => item.id}
      onRefresh={()=>dayWorkout()}
      refreshing={false}
      ListEmptyComponent={()=>( (loader)?null:<View><Image
        style={styles.img}
        source={
        
          require('../../../assets/images/empty.png')}
      />
      <Text style={styles.listError}>Not found</Text>
      </View>)}
      
      renderItem={({item,index})=>(
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('WarmSession')}>
          <View style={styles.listItem}>
            <View style={styles.alignView}>
            {(item?.complete=='true')?
                <View
                style={styles.check1}>
                <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
              </View>
              :<View
                style={styles.check}>
                  <Text style={styles.workoutsNumbring}>{index+1}</Text>
              </View>
              }
              {/* <View style={styles.circle}>
                <AntDesign name={'check'} size={15} color={'#FFFFFF'} />
              </View> */}
              <Text style={styles.title}>{item?._id.exerciseName}</Text>
            </View>
            <MaterialIcons
              name={'keyboard-arrow-right'}
              size={25}
              color={'#182d4a'}
            />
          </View>
        </TouchableOpacity>)}/>
       
        {select==1 ?(   <TouchableOpacity    
        onPress={() => {
               setSelect(0);
            }}>
        <View style={styles.comments}>
        <AntDesign
              name={'caretdown'}
              size={10}
              color={'#182d4a'}
            />
        <Text 
        style={{color:'#182d4a', fontFamily:'Ubuntu-Bold',fontSize:12, marginLeft:7}}>
          Comments
          </Text>
        </View>
        </TouchableOpacity>):(
                  <TouchableOpacity       onPress={() => {
                    setSelect(1);
                 }}>
                  <View style={styles.comments}>
                  <AntDesign
                        name={'caretright'}
                        size={10}
                        color={'#182d4a'}
                      />
                  <Text 
                  style={{color:'#182d4a', fontFamily:'Ubuntu-Bold',fontSize:12, marginLeft:7}}>
                    Comments
                    </Text>
                  </View>
                  </TouchableOpacity>
        )}
     

        </LinearGradient>
        {select==1? (<View style={styles.commentsBox}>
        <View style={{justifyContent:'flex-start',flexDirection:'row',marginLeft:10,marginTop:10}}>
          <Image
          style={{width:40,height:40,borderRadius:25}}
             source={require('../../../assets/images/Profile.png')}
                 />
                 <View style={{marginLeft:7}}>
             <Text style={{fontFamily:'Ubuntu-Bold',color:'#182d4a',fontSize:12}}>John Doe<Text style={{fontFamily:'Ubuntu-SemiBold', color:'#182d4a',fontSize:10}}> (Trainer)</Text></Text>
             <Text style={{fontFamily:'Ubuntu-SemiBold', color:'#182d4a',fontSize:10}}>24 Nov, 2022 | 12:00 PM</Text>
          </View>
          
      </View>
      
      <Text style={{color:'#182d4a',marginLeft:10,marginTop:5,width:getWidth(87),textAlign:'left',fontFamily:'Ubuntu-Regular',fontSize:12}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing eli. Integer magna felis volutpat vitae, elit ullamcorper en. Eu velit odio nulla tincidunt. Vel porta et nunc aenean risus vivamus fermentum quis integer. In leo imperdiet velit, eget tempor id non ornare.
        </Text>
      <Image
          style={{margin:10,height:getHeight(11),width:getWidth(27),borderRadius:15}}
             source={require('../../../assets/images/addequip.png')}
                 />
                  <View style={{justifyContent:'flex-start',flexDirection:'row',marginLeft:10,marginTop:10}}>
          <Image
          style={{width:40,height:40,borderRadius:25}}
             source={require('../../../assets/images/Profile.png')}
                 />
                 <View style={{marginLeft:7}}>
             <Text style={{fontFamily:'Ubuntu-Bold',color:'#182d4a',fontSize:12}}>You</Text>
             <Text style={{fontFamily:'Ubuntu-SemiBold', color:'#182d4a',fontSize:10}}>24 Nov, 2022 | 12:00 PM</Text>
          </View>
          
      </View>
      
      <Text style={{color:'#182d4a',marginLeft:10,marginTop:5,width:getWidth(87),textAlign:'left',fontFamily:'Ubuntu-Regular',fontSize:12}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing eli. Integer magna felis volutpat vitae, elit ullamcorper en. Eu velit odio nulla tincidunt. Vel porta et nunc aenean risus vivamus fermentum quis integer. In leo imperdiet velit, eget tempor id non ornare.
        </Text>
        <View style={{...styles.commentsBox,width:getWidth(87)}}>
        <TextInput
              mode="outlined"
              // label="Email address"
              label={<Text style={GernalStyle.inputLabelStyle}>Write comment...</Text>} 

              theme={{roundness: 15}}
              outlineColor="#BDC3C4"
              placeholder='Write comment...'
              outlineColor="#BDC3C4"
              activeUnderlineColor="#182d4a"
              activeOutlineColor="#182d4a"
              style={{height: getHeight(5),
                width: getWidth(80),
                backgroundColor: 'white',
                color: '#182d4a',
                alignSelf: 'center',
                }}
            />
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',margin:10}}>
            <Entypo
            style={{margin:3}}
              name={'camera'}
              size={16}
              color={'#182d4a'}
            />
              <Text style={{color:'#182d4a',fontFamily:'Ubuntu-Regular'}}>Attach video/image</Text>
            </View>
            <View style={{height:getHeight(6),width:getWidth(12),backgroundColor:'#7D5098',justifyContent:'center',alignItems:'center',borderRadius:15,margin:5}}>
            <Ionicons

              name={'send'}
              size={16}
              color={'#FFFFFF'}
            />
            </View>
            </View>
        </View>
        <View style={styles.footer}>
          <Text style={{color:'#182d4a',fontSize:10,fontFamily:'Ubuntu-Bold',fontSize:10}}>Expand comments</Text>
          <Entypo
              name={'menu'}
              size={11}
              color={'#182d4a'}
            />
        </View>
        </View>):(<View></View>)}
        
       <View style={styles.footer}></View>
      </ScrollView>
    </View>
    
  );
};

export default PastDayWorkouts;
