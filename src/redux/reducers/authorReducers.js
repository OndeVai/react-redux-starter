import * as types from '../actions/actionTypes';
import initialState from './initialState';


export function authors(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    default:
      return state;
  }
}

export function authorsLoading(state = initialState.authorsLoading, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_IN_PROGRESS:
      return action.areAuthorsLoading;
    case types.LOAD_AUTHORS_SUCCESS:
      return false;
    case types.API_ERROR:
      return false;
    default:
      return state;
  }
}
