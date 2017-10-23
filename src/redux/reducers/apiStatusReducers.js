import * as types from '../actions/actionTypes';
import initialState from './initialState';
import {resolveType} from '../../api/apiErrorTypes';


export function loading(state = initialState.loading, action) {
  if (action.type === types.LOAD_IN_PROGRESS) {
    return true;
  }
  else if (action.type.endsWith('_SUCCESS[LOADING]')) {
    return false;
  }
  else if (action.type === types.API_ERROR) {
    return false;
  }

  return state;
}

export function apiError(state = initialState.apiError, action) {
  switch (action.type) {
    case types.API_ERROR: {
      const {error} = action;
      const type = resolveType(error.status);
      return Object.assign({}, error, {type});
    }
    case types.LOAD_IN_PROGRESS:
      return null;
    case types.API_ERROR_CLEAR:
      return null;
    default:
      return state;
  }
}



