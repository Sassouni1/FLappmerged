import React from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
export const requestCameraPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );
      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else return true;
};

export const requestExternalWritePermission = async () => {
  if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'External Storage Write Permission',
          message: 'App needs write permission',
        },
      );
      // If WRITE_EXTERNAL_STORAGE Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      alert('Write permission err', err);
    }
    return false;
  } else return true;
};


export const captureImage = async () => {
  let options = {
    mediaType: 'photo',
    quality: 1,
    noData: true,
  };
  let isCameraPermitted = await requestCameraPermission();
  let isStoragePermitted = await requestExternalWritePermission();

  if (isCameraPermitted) {
    return new Promise((resolve, reject) => {
      launchCamera(options, response => {
        console.log('Response = ', response);
        if (response.didCancel) {
          resolve({
            status: false,
            error: 'User cancelled camera picker'
          });
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          resolve({
            status: false,
            error: 'Camera not available on device'
          });
          console.log('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          resolve({
            status: false,
            error: 'Permission not satisfied'
          });
          console.log('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          resolve({
            status: false,
            error: response.errorMessage.toString()
          });
          console.log(response.errorMessage);
          return;
        }

        const uri = response?.assets[0]?.uri;
        const type = response?.assets[0]?.type;
        const name = response?.assets[0]?.fileName;
        resolve({
          status: true,
          data: {
            uri, type, name,
            response
          }
        })

      });
    })
  } else {
    console.log('no ', isCameraPermitted);
    return {
      status: false,
      error: isCameraPermitted
    }

  }
};

export const chooseImageGallery = (mediaType = 'mixed', selectionLimit = 1,multiple=false) => {
  let options = {
    mediaType: mediaType,
    quality: 1,
    noData: true,
    selectionLimit: multiple?selectionLimit:1,
  };
  return new Promise((resolve, reject) => {
    launchImageLibrary(options, response => {
      // dispatch(setLoader(false));
      if (response.didCancel) {
        resolve({
          status: false,
          error: 'User cancelled camera picker'
        })
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        resolve({
          status: false,
          error: 'Camera not available on device'
        })

        return;
      } else if (response.errorCode == 'permission') {
        resolve({
          status: false,
          error: 'Permission not satisfied'
        })
        return;
      } else if (response.errorCode == 'others') {
        resolve({
          status: false,
          error: 'Error while opening gallary'
        })
        return;
      }

      // const uri = response?.assets[0]?.uri;
      // const type = response?.assets[0]?.type;
      // const name = response?.assets[0]?.fileName;
      const assets = response?.assets || [];
      const selectedImages = assets.map(asset => ({
        uri: asset.uri,
        type: asset.type,
        name: asset.fileName,
        // response: response,
      }));
      console.log('resssssssponse',selectedImages)


      resolve({
        status: true,
  
          // uri, type, name,
          data: multiple ? selectedImages : selectedImages[0],
          response
     
      })
    });
  })
};