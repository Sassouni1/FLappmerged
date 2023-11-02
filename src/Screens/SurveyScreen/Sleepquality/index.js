import React, { useState } from 'react';
import {Text, View, TouchableOpacity, Image, FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {GernalStyle} from '../../../constants/GernalStyle';

import {getHeight, getWidth} from '../../../../utils/ResponsiveFun';
import AntDesign from 'react-native-vector-icons/AntDesign';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import Button from '../../../Components/Button';
import {styles} from './styles';
import SimpleToast from 'react-native-simple-toast';
import { useDispatch, useSelector } from 'react-redux';
import { ApiCall } from '../../../Services/Apis';
import { getUpcomingWorkout } from '../../../Redux/actions/WorkoutActions';
import { CommonActions } from '@react-navigation/native';
import { getSingleUser } from '../../../Redux/actions/AuthActions';
import { setLoader } from '../../../Redux/actions/GernalActions';


const Sleepquality = ({navigation,route}) => {
 
  const {id,workout_objId,workoutDay,description,workoutName} = route?.params;
  const [quality, setQulity] = useState("");
  const token=useSelector((state)=>state.auth.userToken)
  const dispatch=useDispatch()

  const survey = async () => {
    dispatch(setLoader(true))
    try {
      const res = await ApiCall({
        route: 'user/updateAttribute',
        token: token,
        verb: 'patch',
        params: {
        
          id,
          workout_objId,
          skip:'true'
          
        },
      });
  
      if (res?.status == '200') {
     
        dispatch(getUpcomingWorkout({token,planId:id}))
       
       
      
          navigation.dispatch(CommonActions.reset({
              index: 1, // Specifies the index of the screen you want to navigate to
              routes: [{ name: 'Home' },{ name: 'DayWorkOuts', params: {
                workoutId: workout_objId,
                workoutDay,workoutName,description,
                planId: id,
              } }], 
          }));
     
        dispatch(getSingleUser(token))
    
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
           <Text style={{color:'#182d4a',fontFamily:'Ubuntu-Bold',fontSize:18,alignSelf:'center',marginTop:getHeight(1)}}>Sleep quality</Text>
           <Image
             style={{alignSelf:'center',marginTop:getHeight(4),height:getHeight(10),width:getWidth(20)}} resizeMode='stretch'
              source={
                  require('../../../assets/images/sleepy.png')
              }
            />
         
          <TouchableOpacity onPress={()=>setQulity('Awful')} style={{...styles.listItem,marginTop:getHeight(6)}}>
            
            {/* <Text style={{...styles.workoutsNumbring, color:'#EB5757'}}>1</Text> */}
        
      
        
        <Text style={styles.title}>Awful</Text>
        <View style={styles.alignView}>
      {(quality=="Awful")?
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
         <TouchableOpacity onPress={()=>setQulity('Poor')} style={{...styles.listItem,marginTop:getHeight(2)}}>
            
                  {/* <Text style={{...styles.workoutsNumbring, color:'#F2C94C'}}>2</Text> */}
              
           
              
              <Text style={styles.title}>Poor</Text>
              <View style={styles.alignView}>
            {(quality=="Poor")?
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
          <TouchableOpacity onPress={()=>setQulity('Okay')} style={{...styles.listItem,marginTop:getHeight(2)}}>
            
            {/* <Text style={{...styles.workoutsNumbring,color:'#F2994A'}}>3</Text> */}
        <Text style={styles.title}>Okay</Text>
        <View style={styles.alignView}>
      {(quality=="Okay")?
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
          <TouchableOpacity onPress={()=>setQulity('Good')} style={{...styles.listItem,marginTop:getHeight(2)}}>
                  
                  {/* <Text style={{...styles.workoutsNumbring, color:'#219653'}}>4</Text> */}
                  <Text style={styles.title}>Good</Text>
            <View style={styles.alignView}>
            {(quality=="Good")?
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
          <TouchableOpacity onPress={()=>setQulity('Excellent')} style={{...styles.listItem,marginTop:getHeight(2)}}>
                  
                  {/* <Text style={{...styles.workoutsNumbring, color:'#182d4a'}}>5</Text> */}
                  <Text style={styles.title}>Excellent</Text>
            <View style={styles.alignView}>
              
            
          
            {(quality=="Excellent")?
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
          {(quality)?<Button
          onPress={() =>   navigation.navigate('Mood',{quality,id,workout_objId,workoutDay,description,workoutName})}
          text="Next"
          btnStyle={{...GernalStyle.btn, marginTop:getHeight(7)}}
          btnTextStyle={GernalStyle.btnText}
        />:<Button
        text="Next"
        onPress={()=>SimpleToast.show('please select one to proceed next!')}
        btnStyle={{...GernalStyle.btn, marginTop:getHeight(7),opacity:0.4}}
        btnTextStyle={GernalStyle.btnText}
      />}
      <Button
        text="Skip"
        onPress={()=>survey()}
        btnStyle={{...GernalStyle.btn, marginTop:getHeight(1),opacity:0.6}}
        btnTextStyle={GernalStyle.btnText}
      />
         
      </LinearGradient>
    </View>
  );
};
export default Sleepquality;