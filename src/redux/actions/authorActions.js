import * as types from './actionTypes';
import AuthorApi from '../../api/mockAuthorApi';
import {isError} from "./apiStatusActions";

export function areAuthorsLoading() {
  return {type: types.LOAD_AUTHORS_IN_PROGRESS, areAuthorsLoading: true};
}

export function loadAuthorsSuccess(authors) {
  return {type: types.LOAD_AUTHORS_SUCCESS, authors};
}

export function loadAuthors() {
  return (dispatch) => {
    dispatch(areAuthorsLoading(true));
    return AuthorApi.getAllAuthors()
      .then(authors => {
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        dispatch(isError(error));
      });
  };
}



