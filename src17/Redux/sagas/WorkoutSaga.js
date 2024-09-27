import {ApiCall} from '../../Services/Apis';
import {ACTIONS} from '../action-types';
import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {setLoginData, setSingleUser} from '../actions/AuthActions';
import {setChats, setCounts, setLoader} from '../actions/GernalActions';
import Toast from 'react-native-simple-toast';
import { setExercises, setExercisesTasks, setPastWorkout, setUpcomingWorkout, setWorkoutComments } from '../actions/WorkoutActions';

function* UpcomingWorkoutRequest(params) { try {
   
    const res = yield ApiCall({
      
      route: `user/upcomingPlan/${params?.data?.planId}`,
      token: params?.data?.token,
      verb: 'get',
    });

    if (res?.status == '200') {

        console.log('res of upcoming workout',res?.response)
     
      yield put(setUpcomingWorkout(res?.response[0]?.workout));

      yield put(setLoader(false));
    } else {

      yield put(setLoader(false));
      alert(res?.response?.message, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  } catch (e) {
    console.log('saga get Upcoming Workout error -- ', e.toString());
  }
}
export function* UpcomingWorkoutSaga() {
  yield takeLatest(ACTIONS.GET_UPCOMING_WORKOUT, UpcomingWorkoutRequest);
}

function* PastWorkoutRequest(params) { try {
   
  const res = yield ApiCall({
    
    route: `user/pastPlan/${params?.data?.planId}`,
    token: params?.data?.token,
    verb: 'post',
    params:params?.data?.data
  });

  if (res?.status == '200') {
  
    yield put(setPastWorkout(res?.response?.workout));
    yield put(setLoader(false));
  } else {
    yield put(setLoader(false));
    alert(res?.response?.message, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }
} catch (e) {
  console.log('saga get Past Workout error -- ', e.toString());
}
}
export function* PastWorkoutSaga() {
yield takeLatest(ACTIONS.GET_PAST_WORKOUT, PastWorkoutRequest);
}

function* ExerciseRequest(params) { try {
   
  const res = yield ApiCall({
    
    route: `assignplan/exericeInWorkout/${params?.data?.planId}`,
    token: params?.data?.token,
    verb: 'post',
    params:params?.data?.data
  });

  if (res?.status == '200') {
    console.log('res',res?.response)

    if (res?.response?.edited_workout) {
    yield put(setExercises(res?.response?.edited_Workout));
    }else{
      console.log('res',res?.response)
    yield put(setExercises(res?.response));

    }
    yield put(setLoader(false));
  } else {
    yield put(setLoader(false));
    alert(res?.response?.message, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }
} catch (e) {
  console.log('saga get exercise Workout error -- ', e.toString());
}
}
export function* ExerciseSaga() {
yield takeLatest(ACTIONS.GET_EXERCISE, ExerciseRequest);
}

function* WorkoutCommentsRequest(params) { try {
   
  const res = yield ApiCall({
    
    route: `assignplan/commentsInWorkout/${params?.data?.planId}`,
    token: params?.data?.token,
    verb: 'post',
    params:params?.data?.data
  });

  if (res?.status == '200') {
   
    yield put(setWorkoutComments(res?.response));

    
    yield put(setLoader(false));
  } else {
    yield put(setLoader(false));
    alert(res?.response?.message, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }
} catch (e) {
  console.log('saga get exercise Workout error -- ', e.toString());
}
}
export function* WorkoutCommentsSaga() {
yield takeLatest(ACTIONS.GET_WORKOUT_COMMENTS, WorkoutCommentsRequest);
}

function* exerciseTaskRequest(params) { try {
   
  const res = yield ApiCall({
    
    route: `assignplan/taskInExercise/${params?.data?.planId}`,
    token: params?.data?.token,
    verb: 'post',
    params:params?.data?.data
  });

  if (res?.status == '200') {
   
    yield put(setExercisesTasks(res?.response[0]?.tasks));
    yield put(setLoader(false));
  } else {
    yield put(setLoader(false));
    alert(res?.response?.message, [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  }
} catch (e) {
  console.log('saga get exercise task error -- ', e.toString());
}
}
export function* exerciseTaskSaga() {
yield takeLatest(ACTIONS.GET_EXERCISE_TASKS, exerciseTaskRequest);
}