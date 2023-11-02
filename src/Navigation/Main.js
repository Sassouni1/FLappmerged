import {NavigationContainer} from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import { useDispatch } from 'react-redux';

import {useSelector} from 'react-redux';

import {getHeight, getWidth} from '../../utils/ResponsiveFun';
import { getSingleUser } from '../Redux/actions/AuthActions';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

const Main = () => {
  const dispatch=useDispatch();
  const loader = useSelector(state => state.gernal.loader);
  const token = useSelector(state => state.auth.userToken);
 useEffect(()=>{if(token){
  dispatch(getSingleUser(token));
 }
 },[])

  return (
    <NavigationContainer>
   
        {token == null ? <AuthStack /> : <HomeStack />}
        {loader ? (
          <View style={styles.loaderbackground}>
            <View>
              <ActivityIndicator size={getHeight(5)} color="rgba(247, 147, 0, 1)" />
            </View>
          </View>
        ) : null}
  
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  loaderbackground: {
    justifyContent: 'center',
    alignItems: 'center',
    height: getHeight(110),
    width: getWidth(100),
    backgroundColor: 'rgba(52, 52, 52, 0.5)',
    position: 'absolute',
    alignSelf: 'center',
  },
});
export default Main;
