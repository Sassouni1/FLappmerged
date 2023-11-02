import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import GeneralStatusBar from '../../Components/GeneralStatusBar';
import {Divider} from 'react-native-paper';
import {styles} from './styles';
import Header from '../../Components/Header';
import {useSelector} from 'react-redux';
const Profile = ({navigation}) => {
  const user = useSelector(state => state.auth.userData);
  return (
    <View style={styles.contaner}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
       <Header
        title={'My Profile'}
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
      {/* <Header
        title={'My Profile'}
        RightIcon={
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              style={styles.userImage}
              source={
                user?.profileImage
                  ? {uri: user?.profileImage}
                  : 
                  require('../../assets/images/Profile.png')
              }
            />
          </TouchableOpacity>
        }
      /> */}
      <Divider style={styles.headerDivider} />
      <LinearGradient
        colors={['#F5F5F5', '#F5F5F5', '#FFFFFF']}
        style={styles.main}>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.listItem}
          onPress={() => navigation.navigate('UpdateProfiles')}>
          <Text style={styles.itemTitle}>Profile Settings</Text>
          <MaterialIcons
            name={'keyboard-arrow-right'}
            size={25}
            color={'#182d4a'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.listItem}
          onPress={() => navigation.navigate('Equipments')}>
          <Text style={styles.itemTitle}>Equipments</Text>
          <MaterialIcons
            name={'keyboard-arrow-right'}
            size={25}
            color={'#182d4a'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.listItem}
          onPress={() => navigation.navigate('CoachSubscription')}>
          <Text style={styles.itemTitle}>Coach Me Subscription</Text>
          <MaterialIcons
            name={'keyboard-arrow-right'}
            size={25}
            color={'#182d4a'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.listItem}
          onPress={() => navigation.navigate('ChangePassword')}>
          <Text style={styles.itemTitle}>Change Password</Text>
          <MaterialIcons
            name={'keyboard-arrow-right'}
            size={25}
            color={'#182d4a'}
          />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};
export default Profile;
