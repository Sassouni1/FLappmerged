import {ACTIONS} from '../action-types';

const initialState = {
  loader: false,
  chats: [],
  allSms: [],
  counts: {consultations: 0, paid: 0},
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

    default:
      return state;
  }
};

export default GernelReducers;
