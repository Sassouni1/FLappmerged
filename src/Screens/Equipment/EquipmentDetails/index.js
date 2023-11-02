import React, {useState, useRef, useEffect} from 'react';
import {
  FlatList,
  Text,
  View,

  TouchableOpacity,
} from 'react-native';
import Image from 'react-native-image-modal';

import Button from '../../../Components/Button';
import {styles} from './styles';
import {getFontSize, getHeight, getWidth} from '../../../../utils/ResponsiveFun';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {GernalStyle} from '../../../constants/GernalStyle';
import GeneralStatusBar from '../../../Components/GeneralStatusBar';
import {setLoader} from '../../../Redux/actions/GernalActions';
import {Divider} from 'react-native-paper';
import { useSelector} from 'react-redux';
import Header from '../../../Components/Header';
import { ApiCall } from '../../../Services/Apis';


const EquipmentDetails = ({navigation, route}) => {
  const {data,getAllEquipment} = route.params;

  const loader = useSelector(state => state.gernal.loader);

  // const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken);
  
  const dispatch = useDispatch();
  
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header
        title={' Equipment detail'}
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
      <View
        style={{
          marginLeft: getWidth(6),
          marginTop: getHeight(2),
          marginBottom: getHeight(1),
        }}>
        <Text style={styles.imageLabel}>Images</Text>
      </View>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          style={{marginLeft: getWidth(2)}}
         
          horizontal={true}
          data={data?.images}
          ListEmptyComponent={()=>( (loader)?null:<View style={{height:getHeight(10),width:getWidth(80)}}><Image
            style={styles.img}
            resizeMode='contain'
            source={
            
              require('../../../assets/images/empty.png')}
          />
          <Text style={styles.listError}>Not found</Text>
          </View>)}
          renderItem={({item}) => (
            <Image
            resizeMode='contain'
              style={styles.image}
              source={{uri:item}}
            />
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View style={{marginBottom: getHeight(7), marginLeft: getWidth(6)}}>
        <View style={{marginTop: getHeight(3)}}>
          <Text style={styles.heading}>Name</Text>
          <Text style={styles.label}>{data?.equipmentName}</Text>
        </View>
        <View style={{marginTop: getHeight(2)}}>
          <Text style={styles.heading}>Category</Text>
          <Text style={styles.label}>{data?.category}</Text>
        </View>
        <View style={{marginTop: getHeight(2)}}>
          <Text style={styles.heading}>Specifications of equipment</Text>
          {data?.specifications.map((item)=><Text style={styles.label}>{item}</Text>)}
        
        </View>
      </View>
      <Button
        onPress={() => navigation.navigate('EditEquipment',{data:data,getAllEquipment})}
        text="Edit detail"
        btnStyle={GernalStyle.btn}
        btnTextStyle={GernalStyle.btnText}
      />
    </View>
  );
};
export default EquipmentDetails;
