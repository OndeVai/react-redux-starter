import * as types from './actionTypes';
import {isLoading, isError} from './apiStatusActions';
import courseApi from '../../api/mockCourseApi';

export function loadCoursesSuccess(courses) {
  return {type: types.LOAD_COURSES_SUCCESS, courses};
}

export function loadCourseSuccess(course) {
  return {type: types.LOAD_COURSE_SUCCESS, course};
}

export function isCourseSaving() {
  return {type: types.SAVE_COURSE_IN_PROGRESS, isCourseSaving: true};
}

export function saveCourseSuccess(course) {
  return {type: types.SAVE_COURSE_SUCCESS, course};
}

export function loadCourses() {
  return (dispatch) => {
    dispatch(isLoading());
    return courseApi.getAllCourses()
      .then(courses => {
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        dispatch(isError(error));
      });
  };
}


export function loadCourse(courseId) {
  return (dispatch) => {
    dispatch(isLoading());
    return courseApi.getCourse(courseId)
      .then(course => {
        dispatch(loadCourseSuccess(course));
      })
      .catch(error => {
        dispatch(isError(error));
      });
  };
}

export function saveCourse(course) {
  return (dispatch) => {
    dispatch(isCourseSaving());
    return courseApi.saveCourse(course)
      .then(savedCourse => {
        dispatch(saveCourseSuccess(savedCourse));
      })
      .catch(error => {
        dispatch(isError(error));
        throw(error);
      });
  };
}



