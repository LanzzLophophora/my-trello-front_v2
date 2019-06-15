import {
  FETCH_AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  SET_NAME,
  LOG_OUT
} from './constants';

export const authenticateRequest = () => ({
  type: FETCH_AUTH_REQUEST
});

export const authenticateSuccess = user => ({
  type: AUTH_SUCCESS,
  payload: user
});

export const authenticateError = message => ({
  type: AUTH_ERROR,
  payload: message
});

export const logOut = () => ({
  type: LOG_OUT
});

export const setLocalNickname = nickname => ({
  type: SET_NAME,
  payload: nickname
});
