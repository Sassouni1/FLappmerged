import React, { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native'
import {
  Image,
  ScrollView,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native'
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from '../../Redux/actions/GernalActions';
import { ApiCall } from "../../Services/Apis";
import VideoComponent from "../../Components/VideoComponent";

const HTUA = () => {
  const navigation = useNavigation()
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    getInstructions();
}, []);

  const getInstructions = async () => {
    try {
      dispatch(setLoader(true));
      const res = await ApiCall({
        route: `appInstruction/all_instructions`,
        verb: "get",
        token: token,
      });
      console.log("res..",res);
      if (res?.status == 200) {
        setDataList(res?.response?.data);
        dispatch(setLoader(false));
      } else {
        console.log(res?.response);
        dispatch(setLoader(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoader(false));
    }
  };
  
  return (
    <ScrollView>
      <View style={{marginBottom:310}}>
        <Image
          source={require('../../assets/images/HTUATopBack.png')}
          style={{
            objectFit: 'contain',
            width: Dimensions.get('window').width + 10,
            position: 'absolute',
            top: -310,
            left: -4,
          }}
        />

        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/HTUAbtn.png')}
            style={{
              height: 45,
              width: 45,
              position: 'absolute',
              top: 40,
              left: 15,
            }}
          />
        </TouchableOpacity>
      </View>
      {dataList.map((item, index) => (
      <View key={index} style={{paddingHorizontal: 15 }}>
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: 700, fontSize: 18 }}>
            {item.title}
          </Text>
          <Text
            style={{ lineHeight: 22,textAlign:'left', color: '#676C75', letterSpacing: 0.8 }}
          >
            {item.description}
          </Text>
        </View>
        <View style={{marginVertical:21}}>
        <VideoComponent videoUrl={item?.video} thumbnail={item?.video_thumbnail} />
        </View>
      </View>
      ))}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 80,
          marginBottom: 80,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/HTUABottomBtn.png')}
            style={{
              width: Dimensions.get('window').width - 30,
              objectFit: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default HTUA