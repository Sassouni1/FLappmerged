import { ACTIONS } from "../action-types";

const initialState = {
  userToken: null,
  FirstTime: true,
  userData: null,
  assprogram: null,
  //timer: { hours: 0, minutes: 0, seconds: 0 },
  exerciseTimers: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOGIN_DATA:
      return {
        ...state,
        userToken: action.data?.response.token,
        userData: action.data?.response.user,
      };

    case ACTIONS.LOGOUT:
      return {
        ...state,
        userToken: null,
        userData: null,
      };
    case ACTIONS.SET_SINGLE_USER:
      return {
        ...state,
        userData: action.data,
      };
    case ACTIONS.UPDATE_PROFILE:
      return {
        ...state,

        userData: action.data,
      };
    case ACTIONS.BORDING_SETUP:
      return {
        ...state,
        FirstTime: false,
      };
    case ACTIONS.ASSIGNED_PROGRAM:
      return {
        ...state,
        assprogram: action.data,
      };
    // case ACTIONS.UPDATE_TIMER:
    //   return {
    //     ...state,
    //     timer: action.payload,
    //   };

    case ACTIONS.UPDATE_TIMER:
      const { exerciseId, timer } = action.payload;
      return {
        ...state,
        exerciseTimers: {
          ...state.exerciseTimers,
          [exerciseId]: timer,
        },
      };
    default:
      return state;
  }
};

export default authReducer;
