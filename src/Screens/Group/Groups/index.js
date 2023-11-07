import React, { useEffect,useState } from 'react';
import {Text, View, TouchableOpacity, Image,FlatList} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {Divider} from 'react-native-paper';
import {styles} from './styles';
import Header from '../../../Components/Header';
import {useDispatch, useSelector} from 'react-redux';
import { getSingleUser } from '../../../Redux/actions/AuthActions';
import { setLoader } from '../../../Redux/actions/GernalActions';
const Groups = ({navigation}) => {
  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken)
  const [group, setGroup] = useState(true);
const dispatch=useDispatch()
// const MyGroup = async () => {
//   try {
//     const res = await ApiCall({
//       route: 'group/myGroups',     
//       token: token,
//       verb: 'get',
//     });

//     if (res?.status == '200') {
//       console.log('res', res?.response?.group);
//       setGroup(res?.response?.group)
//       dispatch(setLoader(false));
//     } else {
//       console.log('error', res.response);
//       alert(
//         res?.response?.message
//           ? res?.response?.message
//           : res?.response?.error,
//       );
//       dispatch(setLoader(false));
//     }
//   } catch (e) {
//     console.log('saga get language error -- ', e.toString());
//   }
// };


//   useEffect(()=>{
//     dispatch(getSingleUser(token));
//     dispatch(setLoader(true))
//     MyGroup();
//   },[])

  return (
    <View style={styles.contaner}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header
        title={'My Group'}
        RightIcon={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            {/* <Image
              style={styles.userImage}
              source={
                user?.profileImage
                  ? {uri: user?.profileImage}
                  : 
                  require('../../../assets/images/Profile.png')
              }
            /> */}
          </TouchableOpacity>
        }
      />
      <Divider style={styles.headerDivider} />
      <LinearGradient
        colors={['#F5F5F5', '#F5F5F5', '#FFFFFF']}
        style={styles.main}>
          <View style={{alignSelf:'center',justifyContent:'center',alignItems:'center',marginTop:getHeight(25)}}><Image
        style={styles.img}
        source={
        
          require('../../../assets/images/empty.png')}
      />
      <Text style={styles.listError}>Not added in a group yet.</Text>
      <Text style={styles.listError1}>You aren’t added in any group yet. Please contact your trainer to be added in a group.</Text>
      </View>
          {/* <FlatList
      data={setGroup}
      keyExtractor={item => item.id}
      onRefresh={()=>MyGroup()}
      refreshing={false}
      ListEmptyComponent={()=>( (loader)?null:<View><Image
        style={styles.img}
        source={
        
          require('../../../assets/images/empty.png')}
      />
      <Text style={styles.listError}>Not found</Text>
      </View>)}
      
      renderItem={({item,index})=>( */}
        {/* <TouchableOpacity
          activeOpacity={1}
          style={styles.listItem}
          onPress={() => navigation.navigate('GroupsName')}>
          <Text style={styles.itemTitle}>Group name goes here</Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:12,fontFamily:'Ubuntu-Regular',color:'#182d4a'}}>4 members</Text>
          <MaterialIcons
            name={'keyboard-arrow-right'}
            size={25}
            color={'#182d4a'}
          />
          </View>
        </TouchableOpacity> */}
        {/* )}/> */}
     
      </LinearGradient>
    </View>
  );
};
export default Groups;