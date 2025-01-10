import { ACTIONS } from "../action-types";

const initialState = {
  loader: false,
  refreshCalanderView:false,
  chats: [],
  allSms: [],
  counts: { consultations: 0, paid: 0 },
  showPopup:true,
  calanderSetsCheckmark:[],
  restDayVideos:[]
  // timer: { hours: 0, minutes: 0, seconds: 0 },
};

const GernelReducers = (state = initialState, action) => {
  switch (action.type) {
    case ACTIONS.SET_LOADER:
      return {
        ...state,
        loader: action.data,
      };
    case ACTIONS.SET_REFRESH_CALANDER_VIEW:
      return {
        ...state,
        refreshCalanderView: action.data,
      };
    case ACTIONS.CALANDER_SETS_CHECKMARK:
      return {
        ...state,
        calanderSetsCheckmark: action.data,
      };
    case ACTIONS.SET_REST_DAY_VIDEOS:
        return {
          ...state,
          restDayVideos: action.data,
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
    case ACTIONS.SHOW_POPUP:
        return {
          ...state,
          showPopup: action.data,
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
