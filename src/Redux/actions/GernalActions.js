import {ACTIONS} from '../action-types';

export const setLoader = data => ({
  type: ACTIONS.SET_LOADER,
  data,
});
export const setCalanderRefreshKey = data => ({
  type: ACTIONS.SET_REFRESH_CALANDER_VIEW,
  data,
});
export const setCalanderSetsCheckmark = data => ({
  type: ACTIONS.CALANDER_SETS_CHECKMARK,
  data,
});
export const getChats = data => ({
  type: ACTIONS.GET_CHATS,
  data,
});
export const setChats = data => ({
  type: ACTIONS.SET_CHATS,
  data,
});
export const getCounts = data => ({
  type: ACTIONS.GET_COUNTS,
  data,
});
export const setCounts = data => ({
  type: ACTIONS.SET_COUNTS,
  data,
});
export const setAllSms = data => ({
  type: ACTIONS.SET_ALLSMS,
  data,
});
export const setPopup = data => ({
  type: ACTIONS.SHOW_POPUP,
  data,
});
// export const updateTimer = (hours, minutes, seconds) => ({
//   type: ACTIONS.UPDATE_TIMER,
//   payload: { hours, minutes, seconds },
// });
