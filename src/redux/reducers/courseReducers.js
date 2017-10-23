import * as types from '../actions/actionTypes';
import initialState from './initialState';


export function courses(state = initialState.courses, action) {
  switch (action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.LOAD_IN_PROGRESS:
      return [];
    default:
      return state;
  }
}

export function courseSaving(state = initialState.courseSaving, action) {
  switch (action.type) {
    case types.SAVE_COURSE_IN_PROGRESS:
      return action.isCourseSaving;
    case types.SAVE_COURSE_SUCCESS:
      return false;
    case types.API_ERROR:
      return false;
    default:
      return state;
  }
}

export function course(state = initialState.course, action) {
  switch (action.type) {
    case types.LOAD_COURSE_SUCCESS:
      return action.course;
    case types.SAVE_COURSE_SUCCESS:
      return action.course;
    case types.LOAD_IN_PROGRESS:
      return null;
    default:
      return state;
  }
}


