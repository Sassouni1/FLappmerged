import React, {useState, useRef,useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  Text,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import Image from 'react-native-image-modal';

import LinearGradient from 'react-native-linear-gradient';
import { Avatar } from 'react-native-paper';
import Button from '../../../Components/Button';
import Header from '../../../Components/Header';
import {validateFields} from '../../../../utils/validation/validate-fields';
import {styles} from './styles';
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';
import { SwipeListView } from 'react-native-swipe-list-view';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {Divider} from 'react-native-paper';
import {setLoader} from '../../../Redux/actions/GernalActions';
import { ApiCall } from '../../../Services/Apis';

const Equipments = ({navigation}) => {
  const dispatch=useDispatch();
  const [data, setData] = useState([]);
  const loader = useSelector(state => state.gernal.loader);
  const [data1, setData1] = useState([]);
  const token = useSelector(state => state.auth.userToken);
  const getAllEquipment = async item => {
    try {
      dispatch(setLoader(true));
      const res = await ApiCall({
        route: `equipment/allEquipments`,
        verb: 'get',
        token: token,
      });
      if (res?.status == '200') {
        console.log('resss',res)
        setData(res?.response)
        dispatch(setLoader(false));

      } else {
        console.log('error', res?.response);
        dispatch(setLoader(false));

        alert(
          res?.response?.message
            ? res?.response?.message
            : res?.response?.error,
        );
      }
    } catch (e) {
      dispatch(setLoader(false));

      console.log('saga error -- ', e.toString());
    }
  };
  const DeleteEquipment = async item => {
  
    try {
      dispatch(setLoader(true));
      const res = await ApiCall({
        route: `equipment/delete-Equipment/${item?._id}`,
        verb: 'patch',
        token: token,
      });
      if (res?.status == '200') {
        console.log('resss',res)
        getAllEquipment()
        // dispatch(setLoader(false));

      } else {
        console.log('error', res?.response);
        dispatch(setLoader(false));

        alert(
          res?.response?.message
            ? res?.response?.message
            : res?.response?.error,
        );
      }
    } catch (e) {
      dispatch(setLoader(false));

      console.log('saga error -- ', e.toString());
    }
  };
  useEffect(() => {
    getAllEquipment()
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
        title={' Equipments'}
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

      <LinearGradient
        colors={['#F5F5F5', '#F5F5F5', '#FFFFFF', '#FFFFFF']}
        style={styles.main}>
        <SwipeListView
        showsHorizontalScrollIndicator={false}
      onRefresh={()=>getAllEquipment()}
      refreshing={false}
      showsVerticalScrollIndicator={false}
      data={data}
      ListEmptyComponent={() =>
        loader ? null : (
          <View>
            <Image
              style={styles.emptImg}
              source={require('../../../assets/images/empty.png')}
            />
            <Text style={styles.listError}>Not found</Text>
          </View>
        )
      }
      keyExtractor={(item) =>  item.id}
      renderItem={({item}) => (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.listItem}
          onPress={() => navigation.navigate('EquipmentDetails',{data:item,getAllEquipment})}>
         <View>
            <Text style={styles.heading}>{item?.equipmentName}</Text>
            <Text style={styles.description}>{item?.category}</Text>
          </View> 
        
          <Image
            style={styles.img}
            resizeMode={'contain'}
            source={
             item.images[0]?{uri:item.images[0]}: 
              require('../../../assets/images/equipment.png')}
          />
        
        </TouchableOpacity>
         )}
         renderHiddenItem={ ({item}) => (
          <View style={styles.rowBack}>
          <View style={[styles.backRightBtn]}>
            <TouchableOpacity
                    onPress={() => DeleteEquipment(item)}
            >
          <Ionicons
            name={'ios-trash-outline'}
            size={30}
            color={'#EB5757'}
          />
          </TouchableOpacity>
          </View>
      </View>
      )}
      // leftOpenValue={75}
        rightOpenValue={-75}
         />
        <LinearGradient
            colors={['#F5F5F5', '#F5F5F5', '#FFFFFF', '#FFFFFF']}
            style={{borderRadius:10,position: 'absolute',  bottom: getHeight(4),
            right: getWidth(5)}}>
            <View
           >
                <TouchableOpacity 
                onPress={() => navigation.navigate('AddNewEquipments',{getAllEquipment})}
                >
                <Avatar.Icon style={{borderRadius:17,backgroundColor:'#182d4a'}} colors={'#7D5098'}  size={65} icon="plus" />
                </TouchableOpacity>
            </View>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

export default Equipments;
