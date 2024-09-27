import {combineReducers} from 'redux';
import authReducer from './AuthReducers';
import GernelReducers from './GernelReducers';
import WorkoutReducers from './WorkoutRecucers';

export const rootReducer = combineReducers({
  auth: authReducer,
  gernal: GernelReducers,
  workout:WorkoutReducers,
});
