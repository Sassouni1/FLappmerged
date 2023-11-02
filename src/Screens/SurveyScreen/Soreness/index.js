import React, { useEffect,useState } from 'react';
import {Text, View, TouchableOpacity, Image,FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GernalStyle} from '../../../constants/GernalStyle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-paper';
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import Button from '../../../Components/Button';
import {Divider} from 'react-native-paper';
import {styles} from './styles';
import Header from '../../../Components/Header';
import {useDispatch, useSelector} from 'react-redux';
import {ApiCall} from '../../../Services/Apis';
import { getSingleUser } from '../../../Redux/actions/AuthActions';
import { setLoader } from '../../../Redux/actions/GernalActions';
import SimpleToast from 'react-native-simple-toast';
import { getUpcomingWorkout } from '../../../Redux/actions/WorkoutActions';
import { CommonActions } from '@react-navigation/native';

const Soreness = ({navigation,route}) => {
  const {
    quality,qualitymood,qualitystress,qualityenergy,id,workout_objId,workoutDay,description,workoutName,
  } = route?.params;
  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken)

  const [qualitySoreness, setQulitySoreness] = useState("");
const dispatch=useDispatch()
const survey = async () => {
  dispatch(setLoader(true))
  try {
    const res = await ApiCall({
      route: 'user/updateAttribute',
      token: token,
      verb: 'patch',
      params: {
        sleep_Quality: quality,
        soreness: qualitySoreness,
        id,
        workout_objId,
        mood: qualitymood,
        energy: qualityenergy,
        stress: qualitystress,
      },
    });

    if (res?.status == '200') {
      console.log('res', res?.response);
      dispatch(getUpcomingWorkout({token,planId:user?.planId[user?.planId.length - 1]}))
     
     
    
        navigation.dispatch(CommonActions.reset({
            index: 1, // Specifies the index of the screen you want to navigate to
            routes: [{ name: 'Home' },{ name: 'DayWorkOuts', params: {
              workoutId: workout_objId,
              workoutDay,workoutName,description,
              planId: id,
            } }], 
        }));
   
  
      // alert("successfully submitted");
      dispatch(getSingleUser(token))
      // setStatus(res?.response);
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
  return (
    <View style={styles.contaner}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <LinearGradient
        colors={['#FFFFFF', '#F5F5F5', '#FFFFFF']}
        style={styles.main}>
           <Text style={{color:'#182d4a',fontFamily:'Ubuntu-Regular',fontSize:12,alignSelf:'center',marginTop:getHeight(1)}}>Readiness survey</Text>
           <Text style={{color:'#182d4a',fontFamily:'Ubuntu-Bold',fontSize:18,alignSelf:'center',marginTop:getHeight(1)}}>Soreness</Text>
           <Image
                         style={{alignSelf:'center',marginTop:getHeight(4),height:getHeight(10),width:getWidth(20)}} resizeMode='stretch'

              source={
                  require('../../../assets/images/soreness.png')
              }
            />
           
             <TouchableOpacity onPress={()=>setQulitySoreness('Awful')} style={{...styles.listItem,marginTop:getHeight(6)}}>
            
             <Text style={styles.title}>Awful</Text>
        
      <View style={styles.alignView}>
        
        
     
      {(qualitySoreness=="Awful")?
      <View
          style={{...styles.check1,backgroundColor:'#182d4a'}}>
          <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
        </View>:
        <View
        style={{...styles.check1,backgroundColor:'#182d4a50'}}>
        {/* <AntDesign name={'check'} size={14} color={'#FFFFFF'} /> */}
      </View>}
        </View>
    </TouchableOpacity>
          <TouchableOpacity onPress={()=>setQulitySoreness('Poor')} style={{...styles.listItem,marginTop:getHeight(2)}}>
            
          <Text style={styles.title}>Poor</Text>
              
            <View style={styles.alignView}>
            {(qualitySoreness=="Poor")?
            <View
                style={{...styles.check1,backgroundColor:'#182d4a'}}>
                <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
              </View>
              :
              <View
                style={{...styles.check1,backgroundColor:'#182d4a50'}}>
                {/* <AntDesign name={'check'} size={14} color={'#FFFFFF'} /> */}
              </View>}
              </View>
          </TouchableOpacity>      
          <TouchableOpacity onPress={()=>setQulitySoreness('Okay')} style={{...styles.listItem,marginTop:getHeight(2)}}>
            
          <Text style={styles.title}>Okay</Text>
        
      <View style={styles.alignView}>
        
       
     
      {(qualitySoreness=="Okay")?
      <View
          style={{...styles.check1,backgroundColor:'#182d4a'}}>
          <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
        </View>
        :
        <View
          style={{...styles.check1,backgroundColor:'#182d4a50'}}>
          {/* <AntDesign name={'check'} size={14} color={'#FFFFFF'} /> */}
        </View>}
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>setQulitySoreness('Good')} style={{...styles.listItem,marginTop:getHeight(2)}}>
            
    <Text style={styles.title}>Good</Text>
        
      <View style={styles.alignView}>
        
      
     
      {(qualitySoreness=="Good")?
      <View
          style={{...styles.check1,backgroundColor:'#182d4a'}}>
          <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
        </View>
        :
        <View
          style={{...styles.check1,backgroundColor:'#182d4a50'}}>
          {/* <AntDesign name={'check'} size={14} color={'#FFFFFF'} /> */}
        </View>}
        </View>
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>setQulitySoreness('Excellent')} style={{...styles.listItem,marginTop:getHeight(2)}}>
            
    <Text style={styles.title}>Excellent</Text>
        
      <View style={styles.alignView}>
        
     
     
      {(qualitySoreness=="Excellent")?
      <View
          style={{...styles.check1,backgroundColor:'#182d4a'}}>
          <AntDesign name={'check'} size={14} color={'#FFFFFF'} />
        </View>
        :
        <View
          style={{...styles.check1,backgroundColor:'#182d4a50'}}>
          {/* <AntDesign name={'check'} size={14} color={'#FFFFFF'} /> */}
        </View>}
        </View>
    </TouchableOpacity>
          {(qualitySoreness)?<Button
          onPress={() => survey()}
          text="Finish"
          btnStyle={{...GernalStyle.btn, marginTop:getHeight(7)}}
          btnTextStyle={GernalStyle.btnText}
        />:<Button
        text="Next"
        onPress={()=>SimpleToast.show('please select one to proceed next!')}
        btnStyle={{...GernalStyle.btn, marginTop:getHeight(7),opacity:0.4}}
        btnTextStyle={GernalStyle.btnText}
      />}
        
      </LinearGradient>
    </View>
  );
};
export default Soreness;