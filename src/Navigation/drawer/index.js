import * as React from 'react';
import { Text, View} from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import Image from 'react-native-image-modal';

import {getFontSize, getHeight, getWidth} from '../../../utils/ResponsiveFun';
import BottomTab from '../BottomTab';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import {Divider} from 'react-native-paper';                   
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
// import WorkOut from '../../Screens/Workouts/WorkOut';
import Message from '../../Screens/Message';
import {logout} from '../../Redux/actions/AuthActions';
import ConversationScreen from '../../Screens/Message/conversation';
import ChangePassword from '../../Screens/ChangePassword';
import UpdateProfiles from '../../Screens/UpdateProfile';
import ContactUs from '../../Screens/ContactUs';
import Help from '../../Screens/Help';
import ImageModal from 'react-native-image-modal';

const Drawer = createDrawerNavigator();
function NavHeader(props) {
  const user = useSelector(state => state.auth.userData);
  console.log("user data",user)
  const token = useSelector(state => state.auth.userToken);
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        height: getHeight(12),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          alignSelf: 'center',
          // justifyContent: 'space-around',
          width: '100%',
        }}>
        <ImageModal
          style={{
            width: getWidth(15),
            height: getHeight(8),
            borderRadius: 10,
            marginLeft: getWidth(3),
            marginTop: getHeight(3),
          }}
          resizeMode='cover'
          modalImageResizeMode='contain'
          source={
            user?.profile_image
              ? {uri: user?.profile_image}
              : 
              require('../../assets/images/user.png')
          }
        />
        <View
          style={{
            marginLeft: getWidth(3),
          }}>
          <Text
            style={{
              fontFamily: 'Ubuntu-Bold',
              color: 'white',
              marginBottom: 5,
              width:getWidth(45),
              fontSize: getFontSize(2),
              // marginRight: getWidth(28),
            }}>
            {user?.full_name}
          </Text>
          <Text
            style={{
              color: 'white',
              width: '60%',
              fontSize: getFontSize(1.5),
              fontFamily: 'Ubuntu-Regular',
              // marginRight: getWidth(20),
            }}>
           {user?.email}
          </Text>
        </View>
        {/* )} */}
      </View>
    </View>
  );
}
function CustomDrawerContent(props) {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.userData);

  const dispatch = useDispatch();
  return (
    <DrawerContentScrollView contentContainerStyle={{flex: 1,backgroundColor:'#0B0B0D'}} {...props}>
      <NavHeader {...props} />
      <Divider
        style={{
          height: 2,
          backgroundColor: '#333333',
          borderRadius: 10,
          marginBottom: getHeight(1),
          width: '93%',
          alignSelf: 'center',
        }}
      />

      <DrawerItemList {...props} />

    
      <View style={{marginTop:getHeight(21)}}>
      <DrawerItem
          label={'Privacy Policy'}
        labelStyle={{fontFamily:'Ubuntu-Bold'}}
    
          onPress={() => navigation.navigate('PrivacyPolicy')}
          inactiveTintColor={'#7B7A7A'}
          activeTintColor={'#7B7A7A'}
          labelStyle={{color: '#7B7A7A'}}
          activeBackgroundColor={'#7B7A7A'}
          
        />

<DrawerItem
          label={'Term of Use'}
        labelStyle={{fontFamily:'Ubuntu-Bold'}}     
        onPress={() => navigation.navigate('TermOfUse')}
          inactiveTintColor={'#7B7A7A'}
          activeTintColor={'#7B7A7A'}
          labelStyle={{color: '#7B7A7A'}}
          activeBackgroundColor={'#7B7A7A'}
          
        />

<DrawerItem
          label={'About this app'}
        labelStyle={{fontFamily:'Ubuntu-Bold'}}
        onPress={() => navigation.navigate('About')}
        inactiveTintColor={'#7B7A7A'}
          activeTintColor={'#7B7A7A'}
          labelStyle={{color: '#7B7A7A'}}
          activeBackgroundColor={'#7B7A7A'}
          
        />
<Divider style={{marginTop:getHeight(2)}}/>
        <DrawerItem
          label={'Logout'}
        labelStyle={{fontFamily:'Ubuntu-Bold'}}
          onPress={() => dispatch(logout())}
          inactiveTintColor={'#EB5757'}
          activeTintColor={'#EB5757'}
          labelStyle={{color: '#EB5757'}}
          activeBackgroundColor={'#EB5757'}
          icon={({color, size, focuced}) => (
            <MaterialIcons name={'logout'} size={20} color={'#EB5757'} />
          )}
        />
      </View>
    </DrawerContentScrollView>
  );
}
export default function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerPosition="right"
      screenOptions={(drawerPosition = 'right')}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: '#333333',
          drawerActiveBackgroundColor: 'white',
          drawerIcon: ({color, size, focuced}) => (
            <Fontisto name={'home'} size={14} color={color} />
          ),
        }}
        style={{fontFamily: 'Ubuntu-Bold', fontSize: 12}}
        name="Home"
        component={BottomTab}
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: '#333333',
          drawerActiveBackgroundColor: 'white',
          drawerIcon: ({color, size, focuced}) => (
            <FontAwesome5 name="user-cog" size={18} color={'white'} />


          ),
        }}
        style={{fontFamily: 'Ubuntu-Bold', fontSize: 12}}

        name="Profile Setting"
        component={UpdateProfiles}
     
      />
      <Drawer.Screen
        options={{
          headerShown: false,
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: '#333333',
          drawerActiveBackgroundColor: 'white',
          drawerIcon: ({color, size, focuced}) => (
            <FontAwesome5 name="user-cog" size={18} color={'white'} />
          ),
        }}
        style={{fontFamily: 'Ubuntu-Bold', fontSize: 12}}

        name="Change Password"
        component={ChangePassword}
        
      />

<Drawer.Screen
        options={{
          headerShown: false,
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: '#333333',
          drawerActiveBackgroundColor: 'white',
          drawerIcon: ({color, size, focuced}) => (
            <Ionicons name="information-circle" size={22} color={'white'} />
          ),
        }}
        style={{fontFamily: 'Ubuntu-Bold', fontSize: 12}}

        name="Help"
        component={Help}
        
      />

<Drawer.Screen
        options={{
          headerShown: false,
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: '#333333',
          drawerActiveBackgroundColor: 'white',
          drawerIcon: ({color, size, focuced}) => (
            <FontAwesome name="envelope" size={18} color={'white'} />
          ),
        }}
        style={{fontFamily: 'Ubuntu-Bold', fontSize: 12}}

        name="Contact Us"
        component={ContactUs}
        
      />

      
      
    </Drawer.Navigator>
  );
}
