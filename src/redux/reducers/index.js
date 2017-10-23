import {combineReducers} from 'redux';
import {loading, apiError} from './apiStatusReducers';
import {courses, course, courseSaving} from './courseReducers';
import {authors, authorsLoading} from './authorReducers';

const rootReducer = combineReducers({
  loading, apiError,
  courses,
  course,
  courseSaving,
  authors,
  authorsLoading
});

export default rootReducer;
