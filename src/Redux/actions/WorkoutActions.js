import {ACTIONS} from '../action-types';

export const getUpcomingWorkout = data => ({
    type: ACTIONS.GET_UPCOMING_WORKOUT,
    data,
  });

  export const setUpcomingWorkout = data => ({
    type: ACTIONS.SET_UPCOMING_WORKOUT,
    data,
  });

  export const getPastWorkout = data => ({
    type: ACTIONS.GET_PAST_WORKOUT,
    data,
  });

  export const setPastWorkout = data => ({
    type: ACTIONS.SET_PAST_WORKOUT,
    data,
  });

  export const getExercises = data => ({
    type: ACTIONS.GET_EXERCISE,
    data,
  });

  export const setExercises = data => ({
    type: ACTIONS.SET_EXERCISE,
    data,
  });

  export const getWorkoutComments = data => ({
    type: ACTIONS.GET_WORKOUT_COMMENTS,
    data,
  });

  export const setWorkoutComments = data => ({
    type: ACTIONS.SET_WORKOUT_COMMENTS,
    data,
  });


  export const getExercisesTasks = data => ({
    type: ACTIONS.GET_EXERCISE_TASKS,
    data,
  });

  export const setExercisesTasks = data => ({
    type: ACTIONS.SET_EXERCISE_TASKS,
    data,
  });