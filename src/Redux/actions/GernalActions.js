import {ACTIONS} from '../action-types';

export const setLoader = data => ({
  type: ACTIONS.SET_LOADER,
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
