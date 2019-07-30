import {
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR
} from './constants';

export const getUserRequest = (token, remember) => ({
  type: GET_USER_REQUEST,
  token,
  remember
});

export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  payload: user
});

export const getUserError = error => ({
  type: GET_USER_ERROR,
  payload: error
});

export const signinRequest = (login, password, remember) => ({
  type: SIGNIN_REQUEST,
  login,
  password,
  remember
});

export const signinSuccess = token => ({
  type: SIGNIN_SUCCESS,
  payload: token
});

export const signinError = error => ({
  type: SIGNIN_ERROR,
  payload: error
});

export const signupRequest = (login, password) => ({
  type: SIGNUP_REQUEST,
  login,
  password
});

export const signupSuccess = () => ({
  type: SIGNUP_SUCCESS
});

export const signupError = error => ({
  type: SIGNUP_ERROR,
  payload: error
});

export const logOutRequest = () => ({
  type: LOG_OUT_REQUEST
});

export const logOutSuccess = () => ({
  type: LOG_OUT_SUCCESS
});

export const logOutError = error => ({
  type: LOG_OUT_ERROR,
  payload: error
});
