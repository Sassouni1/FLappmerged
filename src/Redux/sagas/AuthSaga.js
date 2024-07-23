import {ApiCall} from '../../Services/Apis';
import {ACTIONS} from '../action-types';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {logout, setLoginData, setSingleUser} from '../actions/AuthActions';
import {setChats, setCounts, setLoader} from '../actions/GernalActions';
import Toast from 'react-native-simple-toast';
import { panGestureHandlerCustomNativeProps } from 'react-native-gesture-handler/lib/typescript/handlers/PanGestureHandler';
import { Alert, Linking } from 'react-native';

function* loginRequest(params) { try {
    const res = yield ApiCall({
      params: params.data,
      route: 'auth/login',
      verb: 'post',
    });
    console.log('res of login1', res);
    if (res?.status == '200') {
      console.log('res of login', res);
      yield put(setLoginData(res));

      yield put(setLoader(false));
    } else {
      console.log('errorrrererer', res?.response);
      yield put(setLoader(false));
      res?.response?.link? Alert.alert('Error', 'Please subscribe to the 3-month recurring plan to access your account.', [
       
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Subscribe', onPress: () => {if (Linking.canOpenURL("https://buy.stripe.com/test_fZe2c73Wv74lfVm5km")) {
          // Open the link in the default browser
          Linking.openURL("https://buy.stripe.com/test_fZe2c73Wv74lfVm5km");
        } else {
          console.error('Cannot open URL');
        }}},]):
      alert(res?.response?.message);
    }
  } catch (e) {
    console.log('saga login error -- ', e.toString());
  }
}
export function* loginSaga() {
  yield takeLatest(ACTIONS.LOGIN, loginRequest);
}
function* ContactUsRequest(params) { try {
  const res = yield ApiCall({
    params: params.data,
    route: 'contact/ask-a-question',
    verb: 'post',
  });

  if (res?.status == '200') {
    console.log('res', res);
    yield put(setLoginData(res));

    yield put(setLoader(false));
  } else {
    console.log('error', res.response);
    yield put(setLoader(false));

    // alert(res?.response?.message, [
    //   {text: 'OK', onPress: () => console.log('OK Pressed')},
    // ]);
  }
} catch (e) {
  console.log('saga login error -- ', e.toString());
}
}
export function* ContactUsSaga() {
  yield takeLatest(ACTIONS.LOGIN, ContactUsRequest);
}
function* patientSignupRequest(params) {
  try {
    const res = yield ApiCall({
      params: params.data.params,
      route: 'auth/patient/signup',
      verb: 'post',
    });

    if (res?.status == '200') {
      params.data.go();
      Toast.show(res?.response?.message);
      yield put(setLoader(false));
    } else {
      console.log('error', res.response);
      yield put(setLoader(false));

      alert(res?.response?.message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  } catch (e) {
    console.log('saga patient signup error -- ', e.toString());
  }
}
export function* patientSignupSaga() {
  yield takeLatest(ACTIONS.PATIENT_SIGNUP, patientSignupRequest);
}
function* doctorSignupRequest(params) {
  try {
    const res = yield ApiCall({
      params: params.data.params,
      route: 'docprofile/new-docform',
      verb: 'post',
    });

    if (res?.status == '200') {
      params.data.go();
      Toast.show(res?.response?.message);
      yield put(setLoader(false));
    } else {
      console.log('error', res.response);
      yield put(setLoader(false));

      alert(res?.response?.message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  } catch (e) {
    console.log('saga login error -- ', e.toString());
  }
}
export function* doctorSignupSaga() {
  yield takeLatest(ACTIONS.DOCTOR_SIGNUP, doctorSignupRequest);
}
function* forgotRequest(params) {
  try {
    const res = yield ApiCall({
      params: params.data.params,
      route: 'auth/forgot-password',
      verb: 'patch',
    });

    if (res?.status == '200') {
      params.data.setShow(true);
      Toast.show(res?.response?.message);
      yield put(setLoader(false));
    } else {
      console.log('error', res.response);
      yield put(setLoader(false));

      alert(res?.response?.message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  } catch (e) {
    console.log('saga Forgot password error -- ', e.toString());
  }
}
export function* forgotSaga() {
  yield takeLatest(ACTIONS.FORGOT_PASSWORD, forgotRequest);
}

function* GetChatRequest(params) {
  try {
    const res = yield ApiCall({
      token: params.data.token,
      route: 'chat/get-chat-rooms',
      verb: 'get',
    });

    if (res?.status == '200') {
      console.log('res', res);
      yield put(setChats(res?.response?.chat));
    } else {
      console.log('error', res?.response);
      alert(res?.response?.message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  } catch (e) {
    console.log('saga get all user err --- ', e);
  }
}
export function* GetChatSaga() {
  yield takeLatest(ACTIONS.GET_CHATS, GetChatRequest);
}

function* GetCounts(params) {
  try {
    const res = yield ApiCall({
      route: 'patients/dashboard-counts',
      verb: 'get',
      token: params.data,
    });

    if (res?.status == '200') {
      yield put(setCounts(res?.response));
      yield put(setLoader(false));
    } else {
      alert(res?.response?.message);
      yield put(setLoader(false));
    }
  } catch (e) {
    yield put(setLoader(false));
    console.log('saga get all counts err --- ', e);
  }
}
export function* GetCountsSaga() {
  yield takeLatest(ACTIONS.GET_COUNTS, GetCounts);
}

function* GetUserRequest(params) {
  try {
    const res = yield ApiCall({
      token: params.data,
      route: 'auth/me',
      verb: 'get',
    });

    if (res?.status == '200') {
   
      yield put(setSingleUser(res?.response?.detail));
    } else {
      console.log('errorrrrrr', res?.response);
      alert(res?.response?.message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
      yield put(logout(null))
    }
  } catch (e) {
    console.log('saga get single user profile err --- ', e);
  }
}
export function* GetUserSaga() {
  yield takeLatest(ACTIONS.GET_SINGLE_USER, GetUserRequest);
}
