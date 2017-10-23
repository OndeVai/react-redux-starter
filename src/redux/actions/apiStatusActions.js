import * as types from './actionTypes';

export function isLoading() {
  return {type: types.LOAD_IN_PROGRESS};
}

export function isError(error) {
  return {type: types.API_ERROR, error};
}

export function clearError() {
  return {type: types.API_ERROR_CLEAR};
}
