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
import { getSingleUser } from '../../Redux/actions/AuthActions';
import { setLoader } from '../../Redux/actions/GernalActions';
import SimpleToast from 'react-native-simple-toast';

const Mood = ({navigation,route}) => {
  const {
    quality,
    id,workout_objId,workoutDay,description,workoutName,
  } = route?.params;
  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken)
  const [qualitymood, setQulitymood] = useState("");
const dispatch=useDispatch()
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
           <Text style={{color:'#182d4a',fontFamily:'Ubuntu-Bold',fontSize:18,alignSelf:'center',marginTop:getHeight(1)}}>Mood</Text>
           <Image
                          style={{alignSelf:'center',marginTop:getHeight(4),height:getHeight(10),width:getWidth(20)}} resizeMode='stretch'

              source={
                  require('../../../assets/images/Mood.png')
              }
            />
            <TouchableOpacity onPress={()=>setQulitymood('Awful')} style={{...styles.listItem,marginTop:getHeight(6)}}>
            
             <Text style={styles.title}>Awful</Text>
        
      <View style={styles.alignView}>
      {(qualitymood=="Awful")?
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
            <TouchableOpacity onPress={()=>setQulitymood('Poor')} style={{...styles.listItem,marginTop:getHeight(2)}}>
            
          <Text style={styles.title}>Poor</Text>
            <View style={styles.alignView}>
            {(qualitymood=="Poor")?
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
            <TouchableOpacity onPress={()=>setQulitymood('Okay')} style={{...styles.listItem,marginTop:getHeight(2)}}>
            
          <Text style={styles.title}>Okay</Text>
        
      <View style={styles.alignView}>
        
       
     
      {(qualitymood=="Okay")?
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
            <TouchableOpacity onPress={()=>setQulitymood('Good')} style={{...styles.listItem,marginTop:getHeight(2)}}>
                    
            <Text style={styles.title}>Good</Text>
                
              <View style={styles.alignView}>
              {(qualitymood=="Good")?
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
            <TouchableOpacity onPress={()=>setQulitymood('Excellent')} style={{...styles.listItem,marginTop:getHeight(2)}}>
                    
            <Text style={styles.title}>Excellent</Text>
                
              <View style={styles.alignView}>
              {(qualitymood=="Excellent")?
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
          {(qualitymood)?<Button
          onPress={() => navigation.navigate('Energy',{qualitymood,quality,id,workout_objId,workoutDay,description,workoutName})}
          text="Next"
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
export default Mood;