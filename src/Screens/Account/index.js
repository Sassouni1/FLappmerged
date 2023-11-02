import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {styles} from './styles';
import {getHeight, getWidth, getFontSize} from '../../../utils/ResponsiveFun';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../Components/Button';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch, useSelector} from 'react-redux';
import {getSingleUser, logout} from '../../Redux/actions/AuthActions';
import LinearGradient from 'react-native-linear-gradient';
import GeneralStatusBar from '../../Components/GeneralStatusBar';
import {setLoader} from '../../Redux/actions/GernalActions';
import SimpleToast from 'react-native-simple-toast';
import ImagePickerModal from '../../Components/ImagePickerModal';
import {ApiCall} from '../../Services/Apis';
import {IMAGE_URL} from '../../Services/Constants';
import {
  requestCameraPermission,
  requestExternalWritePermission,
} from '../../../utils/ImageAndCamera';
import FastImage from 'react-native-fast-image';

const Account = ({navigation}) => {
  const dispatch = useDispatch();
  const [pickerModalVisibile, setPickerModalVisibile] = useState(false);
  const user = useSelector(state => state.auth.userData);
  const token = useSelector(state => state.auth.userToken);
  const [imageToUpload, setImageToUpload] = useState('');
  const [imageObject, setImageObject] = useState();
  const captureImage = async contentType => {
    let options = {
      mediaType: contentType,
      quality: 1,
      noData: true,
      videoQuality: 'low',
      durationLimit: 30,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled camera picker');

          return;
        } else if (response.errorCode == 'camera_unavailable') {
          console.log('Camera not available on device');

          return;
        } else if (response.errorCode == 'permission') {
          console.log('Permission not satisfied');

          return;
        } else if (response.errorCode == 'others') {
          console.log(response.errorMessage);
          return;
        }
        let uri = response?.assets[0]?.uri;
        let type = response?.assets[0]?.type;
        let name = response?.assets[0]?.fileName;
        const MyObject = {uri, type, name};
        setImageObject(MyObject);
        setImageToUpload(uri);
        setTimeout(function () {
          cropimage(uri);
          dispatch(setLoader(false));
        }, 3000);
      });
    } else {
      console.log('no ', isCameraPermitted);
    }
  };

  const chooseImageGallery = () => {
    let options = {
      mediaType: 'mixed',
      quality: 1,
      noData: true,
      selectionLimit: 1,
    };
    launchImageLibrary(options, response => {
      dispatch(setLoader(true));
      if (response.didCancel) {
        console.log('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        console.log('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        console.log('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
        return;
      }
      let uri = response?.assets[0]?.uri;
      let type = response?.assets[0]?.type;
      let name = response?.assets[0]?.fileName;
      const MyObject = {uri, type, name};
      setImageObject(MyObject);
      setImageToUpload(uri);
      setTimeout(function () {
        cropimage(uri);
        dispatch(setLoader(false));
      }, 3000);
    });
  };
  const cropimage = uri => {
    ImagePicker.openCropper({
      path: Platform.OS === 'android' ? 'file://' + uri : uri,
    }).then(image => {
      setImageToUpload(image?.path);
      const MyObject = {
        uri: image?.path,
        type: image?.mime,
        name: 'profileImage' + user?._id,
      };
      setImageObject(MyObject);
      setPickerModalVisibile(false);
      userUpdate(MyObject);
    });
  };
  const userUpdate = async MyObject => {
    dispatch(setLoader(true));
    const form = new FormData();
    form.append('image', MyObject);
    try {
      const res = await ApiCall({
        route: 'patients/update-profile',
        params: form,
        verb: 'put',
        token: token,
      });
      if (res?.status == '200') {
        SimpleToast.show(res?.response?.message);
        dispatch(getSingleUser(token));
        navigation.goBack();
        dispatch(setLoader(false));
      } else {
        dispatch(setLoader(false));

        alert(res?.response?.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
      }
    } catch (e) {
      console.log('saga login error -- ', e.toString());
    }
  };
  return (
    <LinearGradient
      colors={['#F9FFFF', '#F9FFFF', '#F9FFFF']}
      style={{flex: 1}}>
      <GeneralStatusBar
        backgroundColor="white"
        barStyle="dark-content"
        hidden={false}
        translucent={true}
      />
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <ImagePickerModal
          visible={pickerModalVisibile}
          hideVisible={() => setPickerModalVisibile(false)}
          galleryImage={() => chooseImageGallery()}
          cameraImage={() => captureImage('image')}
        />
        <View style={{flex: 1}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: getWidth(5),
            }}>
            <Ionicons
              onPress={() => navigation.goBack()}
              name="chevron-back"
              size={20}
              color="#006D65"
            />
            <Text style={styles.accounttext}>Account</Text>
            <View />
          </View>
          <View style={{alignSelf: 'center'}}>
            <FastImage
              style={{height: 120, width: 120, borderRadius: 10}}
              resizeMode={'contain'}
              source={
                imageToUpload
                  ? {uri: imageToUpload}
                  : user?.profilePicture
                  ? {uri: IMAGE_URL + user?.profilePicture}
                  : require('../../assets/images/pngegg1.png')
              }
            />
            <FontAwesome5
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                bottom: 5,
                padding: 2,
                right: 5,
              }}
              name="edit"
              onPress={() => setPickerModalVisibile(true)}
              size={20}
              color={'#02C4B7'}
            />
          </View>
          <View style={styles.mainv}>
            <TouchableOpacity onPress={() => navigation.navigate('profile')}>
              <View style={styles.smview}>
                <Text style={styles.textt}>My profile</Text>
                <MaterialCommunityIcons
                  name={'account-circle'}
                  size={getFontSize(3.5)}
                  color={'#02C4B7'}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.sapert}></View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Appointment')}>
              <View style={styles.smview}>
                <Text style={styles.textt}>My Appointments</Text>
                <FontAwesome5
                  name={'calendar'}
                  size={getFontSize(3.5)}
                  color={'#02C4B7'}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.sapert}></View>
            <TouchableOpacity onPress={() => navigation.navigate('Message')}>
              <View style={styles.smview}>
                <Text style={styles.textt}>Messages</Text>
                <FontAwesome5
                  name={'sms'}
                  size={getFontSize(3.5)}
                  color={'#02C4B7'}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.sapert}></View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notification')}>
              <View style={styles.smview}>
                <Text style={styles.textt}>Notifications</Text>
                <MaterialIcons
                  name={'notifications'}
                  size={getFontSize(3.7)}
                  color={'#02C4B7'}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.sapert}></View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}>
              <View style={styles.smview}>
                <Text style={styles.textt}>Change Password</Text>
                <Ionicons
                  name={'key'}
                  size={getFontSize(3.5)}
                  color={'#02C4B7'}
                  style={styles.icon}
                />
              </View>
            </TouchableOpacity>
            <View style={styles.sapert}></View>
          </View>
        </View>
        <View style={{...styles.mainv, alignSelf: 'center'}}>
          <TouchableOpacity onPress={() => navigation.navigate('FAQs')}>
            <View style={styles.smview}>
              <Text style={styles.textt}>Help & FAQ</Text>
              <Entypo
                name={'info-with-circle'}
                size={getFontSize(3.5)}
                color={'#02C4B7'}
                style={styles.icon}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.sapert}></View>
          <TouchableOpacity
            onPress={() => {
              dispatch(logout());
            }}
            style={styles.smview}>
            <Text style={{...styles.textt, color: '#EB5757'}}>Logout</Text>
            <MaterialCommunityIcons
              name={'logout'}
              size={getFontSize(3.5)}
              color={'#EB5757'}
              style={styles.icon}
            />
          </TouchableOpacity>
          <View style={styles.sapert}></View>
        </View>
      </View>
    </LinearGradient>
  );
};
export default Account;
