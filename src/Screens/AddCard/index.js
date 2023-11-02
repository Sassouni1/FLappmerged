import * as React from 'react';
import {
  TouchableOpacity,
  Animated,
  Text,
  View,
} from 'react-native';
import {SceneMap, TabView} from 'react-native-tab-view';
import {getHeight, getWidth} from '../../../utils/ResponsiveFun';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../Components/Button';
import {GernalStyle} from '../../constants/GernalStyle';
import {styles} from './styles';

import GeneralStatusBar from '../../Components/GeneralStatusBar';
import CardPayment from '../../Components/CardPayment';
import Header from '../../Components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-paper';


const AddCard = ({navigation}) => {


  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header title={'Add card'}  LeftIcon={
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons
              style={{alignSelf: 'center', marginRight: getWidth(2)}}
              name={'arrow-back'}
              size={25}
              color={'#182d4a'}
            />
          </TouchableOpacity>
        }/>
              <Divider style={styles.headerDivider} />
<View style={{marginTop:getHeight(10)}}/>
      <CardPayment add={true}/>
    </View>
  );
};

export default AddCard;