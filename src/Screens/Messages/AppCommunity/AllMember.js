import { View, Text,TouchableOpacity, FlatList, Image, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import GeneralStatusBar from '../../../Components/GeneralStatusBar'
import { colors } from '../../../constants/colors'
import { GernalStyle } from '../../../constants/GernalStyle'
import { styles } from './styles'
import Feather from 'react-native-vector-icons/Feather';
import { getFontSize, getWidth,getHeight} from '../../../../utils/ResponsiveFun'
import { fonts } from '../../../constants/fonts'
import { ApiCall } from '../../../Services/Apis'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { setLoader } from '../../../Redux/actions/GernalActions'


const AllMember = () => {
    const navigation=useNavigation()
    const dispatch=useDispatch()
    const [allUser,setAllUser]=useState([])
    const token = useSelector(state => state.auth.userToken);
    const createChatBox = async (item) => {
      // dispatch(setLoader(true))
      try {
        const res = await ApiCall({
          params: {id:item?.user_id},
          route: 'chat/create_chat_box',
          verb: 'post',
          token: token,
        });
        // var arr = res?.response?.detail?.messages;
        // console.log('arra',arr)
        if (res?.status == '200') {
          console.log('Create chat box___', res?.response?.detail);
       
          dispatch(setLoader(false));
          navigation.goBack();

        } else {
          dispatch(setLoader(false));
  
          alert(res?.response?.message, [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ]);
        }
      } catch (e) {
        console.log('api get skill error -- ', e.toString());
      }
  
    };
const getAllUser = async () => {
    dispatch(setLoader(true))
    try {
      const res = await ApiCall({
        params: {category_name: 'skill'},
        route: 'chat/all_users',
        verb: 'get',
        token: token,
      });

      if (res?.status == '200') {
        console.log('workout', res?.response?.users);
        setAllUser(res?.response?.users)
        // console.log('workout',res?.response?.detail)

        // setData(res?.response?.detail)
        // setProgram(res?.response?.detail?.workouts);
        dispatch(setLoader(false));
        // navigation.goBack();

        // navigation.navigate('HomeScreen');
      } else {
        dispatch(setLoader(false));

        alert(res?.response?.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } catch (e) {
      console.log('api get skill error -- ', e.toString());
    }
  };
  useEffect(()=>{
    getAllUser()
   
  },[])
  return (
    <View style={{...GernalStyle.container, backgroundColor: colors.homeColor}}>
      <GeneralStatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor={colors.primary}
        translucent={true}
      />
      <View style={styles.headerCon}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather
            name="chevron-left"
            size={getFontSize(5)}
            color={colors.gray3}
          />
        </TouchableOpacity>
        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}}>
            {/* <Image
            resizeMode='contain'
            style={{height:getHeight(4.5),width:getWidth(9),borderRadius:30}}
            source={{uri:NameAdmin?.profile_image}}
            /> */}
          <Text style={{...GernalStyle.headertext,marginLeft:getWidth(1),fontSize:24}}>
          {/* {NameAdmin?.full_name} */}
          App community
          </Text>
          {/* <Text style={styles.ruleText}>Fitness coach</Text> */}
        </View>
       
      </View>
      <FlatList
      showsVerticalScrollIndicator={false}
      ListFooterComponent={()=><View style={{height:getHeight(4)}} />}
      data={allUser}
      renderItem={({item})=>{
        return(
           <View>
            <Pressable 
            onPress={()=>{
              createChatBox(item)
        
            }} 
            style={{flexDirection:"row",alignItems:"center",marginTop:getHeight(1.5)}}>
                <Image
                resizeMode='contain'
                style={{width:getWidth(12),height:getHeight(6),borderRadius:30,marginLeft:getWidth(4)}}
                source={item?.profile_image===""?require('../../../assets/images/user.png'):{uri:item?.profile_image}}
                />
                <View style={{marginLeft:getWidth(4)}}>
                <Text style={{fontSize:18,fontFamily:fonts.URe,color:colors.white}}>{item.full_name}</Text>
                {/* <Text style={{fontSize:14,fontFamily:fonts.URe,color:colors.white}}>{item.lastmsg}</Text> */}
                </View>
            </Pressable>
           </View> 
        )
      }}
      />
      </View>
  )
}

export default AllMember