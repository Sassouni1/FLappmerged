import React, {useState, useRef} from 'react';
import {Text, View,  TouchableOpacity} from 'react-native';
import Image from 'react-native-image-modal';

import {styles} from './styles';
import {getHeight, getFontSize, getWidth} from '../../../utils/ResponsiveFun';
import {Divider} from 'react-native-paper';
import {useSelector} from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown';
import GeneralStatusBar from '../../Components/GeneralStatusBar';
import Feather from 'react-native-vector-icons/Feather';
import Button from '../../Components/Button';
import {GernalStyle} from '../../constants/GernalStyle';
import {TextInput} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-crop-picker';
import {validateFields} from '../../../utils/validation/validate-fields';
import {useDispatch} from 'react-redux';
import {setLoader} from '../../Redux/actions/GernalActions';
import validator from '../../../utils/validation/validator';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../Components/Header';
import ImagePickerModal from '../../Components/ImagePickerModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import SimpleToast from 'react-native-simple-toast';
import {ApiCall} from '../../Services/Apis';
import {getSingleUser} from '../../Redux/actions/AuthActions';
import { BASE_URL } from '../../Services/Constants';
const UpdateProfiles = ({navigation}) => {
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
      console.log('image',image)
      setImageToUpload(image?.path);
      const MyObject = {
        uri: image?.path,
        type: image?.mime,
        name: 'profileImage' + user?._id,
      };
      setImageObject(MyObject);
      setPickerModalVisibile(false);
      uploadImage(uri,image);
      // userImageUpdate(MyObject);
    });
  };

  const uploadImage = async (uri,response) => {
    const formData = new FormData();
    formData.append('profileImage', {
      uri:uri,
      name: 'image.jpg',
      type: response?.mime,
      size:response?.size
    });

    fetch(BASE_URL + '/auth/update-profile', {
      method: 'PATCH',
      body: formData,
  
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((res) => { SimpleToast.show(res?.response?.message);
      dispatch(getSingleUser(token));
      navigation.goBack();
      dispatch(setLoader(false));})
      .then((result) => console.log("result",result))
      .catch((error) => console.error("catch",error));
  };

  const userUpdate = async () => {
    const { firstName,lastName,height,weight} = state;
    const userNameError = await validator('firstName', firstName);
    const lastNameError = await validator('lastName', lastName);
    const heightError = await validator('height', height);
    const weightError = await validator('weight', weight);
  
    if (
      !userNameError &&
      !lastNameError&&
      !heightError&&
      !weightError
    ) {
      dispatch(setLoader(true));
      const params = {
        firstName: firstName,
        lastName: lastName,
        height,
        weight,
      };
      try {
        const res = await ApiCall({                                                                         
          route: 'auth/update-profile',
          params: params,
          verb: 'patch',
          token: token,
        });

        if (res?.status == '200') {
          SimpleToast.show(res?.response?.message);
          dispatch(getSingleUser(token));
          dispatch(setLoader(false));
          navigation.goBack();
        } else {
          dispatch(setLoader(false));
        alert(res?.response?.message, [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ]);
        }
      } catch (e) {
        console.log('saga get language error -- ', e.toString());
      }
    } else {
      dispatch(setLoader(false));
      setState({
        ...state,
        heightError,
lastNameError,
      weightError,
      
      userNameError,
      });
      // alert(
      //   res?.response?.message
      //     ? res?.response?.message
      //     : res?.response?.error,
      // );
    }
  };
  const dispatch = useDispatch();
  const inputRefs = {
    email: useRef(null),
    userName: useRef(null),
    lastName:useRef(null),
    weight:useRef(null),
    height:useRef(null),
 
  };
  const [state, setState] = useState({
    email: user?.email,
    emailError: '',
    firstName: user?.firstName,
    userNameError: '',
    lastName: user?.lastName,
    lastNameError: '',
    height:user?.height,
    heightError: '',
    weight:user?.weight,
    weightError: '',
  });
  const [hidePass, setHidePass] = useState(true);
  const [hideNewPass, setHideNewPass] = useState(true);
  const changeHandler = (type, value) => setState({...state, [type]: value});
  return (
    <View style={styles.contaner}>
      <GeneralStatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="white"
        translucent={true}
      />
      <Header
        title={' Profile settings'}
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
      <ImagePickerModal
        visible={pickerModalVisibile}
        hideVisible={() => setPickerModalVisibile(false)}
        galleryImage={() => chooseImageGallery()}
        cameraImage={() => captureImage('image')}
      />
      <KeyboardAwareScrollView
      
        showsVerticalScrollIndicator={false}>
      <View style={styles.userProfile}>
        <Image
          style={{...styles.userProfile, marginTop: 0}}
          resizeMode={'cover'}
          source={
            imageToUpload
              ? {uri: imageToUpload}
              :(user?.profileImage)?{uri:user?.profileImage}: require('../../assets/images/Profile.png')
          }
        />
        <TouchableOpacity
          onPress={() => setPickerModalVisibile(true)}
          style={{
            position: 'absolute',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            bottom: 0,
            height: 30,
            width: 30,
            right: 0,
            backgroundColor: 'white',
            borderTopLeftRadius: 60,
          }}>
          <MaterialIcons name={'edit'} size={24} color={'#182d4a'} />
        </TouchableOpacity>
      </View>
      <View style={styles.userView}>
        <Text style={styles.userName}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>
      
        <View>
          <TextInput
            mode="outlined"
            // label="First Name"
            label={<Text style={GernalStyle.inputLabelStyle}>First Name</Text>} 

            theme={{roundness: 15}}
            outlineColor="#BDC3C4"
              activeUnderlineColor="#182d4a"
              activeOutlineColor="#182d4a"
            style={GernalStyle.input}
            ref={inputRefs.userName}
            value={state.firstName}
            returnKeyType={'send'}
            onFocus={() => setState({...state, userNameError: ''})}
            onBlur={() =>
              validateFields(state.firstName, 'firstName', error =>
                setState({...state, userNameError: error}),
              )
            }
            onSubmitEditing={() => inputRefs['lastName'].current.focus()}
            onChangeText={firstName => changeHandler('firstName', firstName)}
            blurOnSubmit={false}
          />
          <Text style={{...GernalStyle.InputError,marginLeft:getWidth(6)}}>{state.userNameError}</Text>
        </View>
        <View>
          <TextInput
            mode="outlined"
            // label="Last Name"
            label={<Text style={GernalStyle.inputLabelStyle}>Last Name</Text>} 

            theme={{roundness: 15}}
            outlineColor="#BDC3C4"
            activeUnderlineColor="#182d4a"
            activeOutlineColor="#182d4a"
            style={GernalStyle.input}
            ref={inputRefs.lastName}
            value={state.lastName}
            returnKeyType={'send'}
            onFocus={() => setState({...state, lastNameError: ''})}
            onBlur={() =>
              validateFields(state.lastName, 'lastName', error =>
                setState({...state, lastNameError: error}),
              )
            }
            onSubmitEditing={() =>  inputRefs['lastName'].current.focus()}
            onChangeText={lastName => changeHandler('lastName', lastName)}
            blurOnSubmit={false}
          />
          <Text style={{...GernalStyle.InputError,marginLeft:getWidth(6)}}>{state.lastNameError}</Text>
        </View>
        <View>
          <TextInput
            mode="outlined"
            theme={{roundness: 15}}
            outlineColor="#BDC3C4"
              activeUnderlineColor="#182d4a"
              activeOutlineColor="#182d4a"
            style={{...GernalStyle.input, color: '#182d4a'}}
            ref={inputRefs.email}
            value={state.email}
            returnKeyType={'send'}
            editable={false}
            disabled={true}
            blurOnSubmit={false}
            right={
              <TextInput.Icon
                name={() => (
                  <Feather
                    name={'lock'}
                    color={'#BDC3C4'}
                    style={{alignSelf:'center',marginTop:getHeight(1)}}
                  />
                )}
              />
            }
          />
          <Text style={{...GernalStyle.InputError,marginLeft:getWidth(6)}}>{state.userNameError}</Text>
        </View>
        <View>
          <TextInput
            mode="outlined"
            // label="Weight"
            label={<Text style={GernalStyle.inputLabelStyle}>Weight (kg)</Text>} 
            keyboardType='number-pad'

            theme={{roundness: 15}}
            outlineColor="#BDC3C4"
              activeUnderlineColor="#182d4a"
              activeOutlineColor="#182d4a"
            style={GernalStyle.input}
            ref={inputRefs.weight}
            value={state.weight}
            returnKeyType={'next'}
            onFocus={() => setState({...state, weightError: ''})}
            onBlur={() =>
              validateFields(state.weight, 'weight', error =>
                setState({...state, weightError: error}),
              )
            }
            onSubmitEditing={() => inputRefs['height'].current.focus()}
            onChangeText={weight =>
              changeHandler('weight', weight)
            }
            blurOnSubmit={false}
          />
          <Text style={{...GernalStyle.InputError,marginLeft:getWidth(6)}}>{state.weightError}</Text>
        </View>
        <View>
          <TextInput
            mode="outlined"
            // label="Height"
            label={<Text style={GernalStyle.inputLabelStyle}>Height (fit)</Text>} 
            keyboardType='number-pad'
            theme={{roundness: 15}}
            outlineColor="#BDC3C4"
              activeUnderlineColor="#182d4a"
              activeOutlineColor="#182d4a"
            style={GernalStyle.input}
            ref={inputRefs.height}
            value={state.height}
            returnKeyType={'send'}
            onFocus={() => setState({...state, heightError: ''})}
            onBlur={() =>
              validateFields(state.height, 'height', error =>
                setState({...state, heightError: error}),
              )
            }
            onSubmitEditing={() => userUpdate()}
            onChangeText={height =>
              changeHandler('height', height)
            }
            blurOnSubmit={false}
          />

          <Text style={{...GernalStyle.InputError,marginLeft:getWidth(6)}}>{state.heightError}</Text>
        </View>
        <Button
          onPress={() => userUpdate()}
          text="Update profile"
          btnStyle={{...GernalStyle.btn, marginTop: getHeight(8)}}
          btnTextStyle={GernalStyle.btnText}
        />
        <View style={{height:getHeight(3)}}></View>
      </KeyboardAwareScrollView>
    </View>
  );
};
export default UpdateProfiles;
