import { ACTIONS } from "../action-types";

const initialState = {
  loader: false,
  chats: [],
  allSms: [],
  counts: { consultations: 0, paid: 0 },
  // timer: { hours: 0, minutes: 0, seconds: 0 },
};

const GernelReducers = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADER:
      return {
        ...state,
        loader: action.data,
      };
    case ACTIONS.SET_CHATS:
      return {
        ...state,
        chats: action.data,
      };
    case ACTIONS.SET_ALLSMS:
      return {
        ...state,
        allSms: action.data,
      };

    case ACTIONS.SET_COUNTS:
      return {
        ...state,
        counts: action.data,
      };
    // case ACTIONS.UPDATE_TIMER:
    //   return {
    //     ...state,
    //     timer: action.payload,
    //   };

    default:
      return state;
  }
};

export default GernelReducers;
