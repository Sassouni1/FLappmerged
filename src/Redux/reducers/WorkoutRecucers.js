import {ACTIONS} from '../action-types';

const initialState = {
  loader: false,
  UpcomingWorkouts: [],
  PastWorkouts:[],
  exercises:{exercise:[],cooldown_Exercise:[],warmup_Exercise:[]},
  workoutComments:[],
  exerciseTasks:[],
  selectedCalendarDate:''
};

const WorkoutReducers = (state = initialState, action) => {
  switch (action.type) {
   
    case ACTIONS.SET_UPCOMING_WORKOUT:
      return {
        ...state,
        UpcomingWorkouts: action.data,
      };
      case ACTIONS.SET_PAST_WORKOUT:
      return {
        ...state,
        PastWorkouts: action.data,
      };
      case ACTIONS.SET_EXERCISE:
      return {
          ...state,
          exercises: action.data,
        };
      case ACTIONS.SET_WORKOUT_COMMENTS:
      return {
            ...state,
            workoutComments: action.data,
          };
      case ACTIONS.SET_EXERCISE_TASKS:
      return {
            ...state,
            exerciseTasks: action.data,
          };
      case ACTIONS.SET_SELECTED_CALENDAR_DATE:
      return {
            ...state,
            selectedCalendarDate: action.data,
          };
    default:
      return state;
  }
};

export default WorkoutReducers;