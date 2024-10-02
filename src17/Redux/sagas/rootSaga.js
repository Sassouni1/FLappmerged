import {fork, all} from 'redux-saga/effects';
import {
  doctorSignupSaga,
  forgotSaga,
  GetChatSaga,
  GetCountsSaga,
  GetUserSaga,
  loginSaga,
  patientSignupSaga,
} from './AuthSaga';
import { ExerciseSaga, exerciseTaskSaga, PastWorkoutSaga, UpcomingWorkoutSaga, WorkoutCommentsSaga } from './WorkoutSaga';

export function* rootSaga() {
  yield all([
    loginSaga(),
    patientSignupSaga(),
    doctorSignupSaga(),
    forgotSaga(),
    GetChatSaga(),
    GetUserSaga(),
    GetCountsSaga(),
    UpcomingWorkoutSaga(),
    PastWorkoutSaga(),
    ExerciseSaga(),
    WorkoutCommentsSaga(),
    exerciseTaskSaga(),
  ]);
}
