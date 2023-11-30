import {ACTIONS} from '../action-types';

export const loginRequest = data => ({
  type: ACTIONS.LOGIN,
  data,
});
export const patientSignupRequest = data => ({
  type: ACTIONS.PATIENT_SIGNUP,
  data,
});
export const doctorSignupRequest = data => ({
  type: ACTIONS.DOCTOR_SIGNUP,
  data,
});
export const setLoginData = data => ({
  type: ACTIONS.SET_LOGIN_DATA,
  data,
});
export const Forgot_Password = data => ({
  type: ACTIONS.FORGOT_PASSWORD,
  data,
});
export const logout = data => ({
  type: ACTIONS.LOGOUT,
  data,
});
export const Bording = data => ({
  type: ACTIONS.BORDING_SETUP,
  data,
});
export const updateProfile = data => ({
  type: ACTIONS.UPDATE_PROFILE,
  data,
});
export const getSingleUser = data => ({
  type: ACTIONS.GET_SINGLE_USER,
  data,
});
export const setSingleUser = data => (
  console.log('control in action set', data),
  {
    type: ACTIONS.SET_SINGLE_USER,
    data,
  }
);
export const Assprogram = data => ({
  type: ACTIONS.ASSIGNED_PROGRAM,
  data,
});
// export const updateTimer = (exerciseId, timer) => ({
//   type: ACTIONS.UPDATE_TIMER,
//   payload: { exerciseId, timer },
// });
export const updateTimer = (workoutId, exerciseId, timer) => ({
  type: ACTIONS.UPDATE_TIMER,
  payload: { workoutId, exerciseId, timer },
});