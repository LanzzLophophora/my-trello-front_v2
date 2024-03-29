import {
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_ERROR,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  LOG_OUT_REQUEST,
  LOG_OUT_SUCCESS,
  LOG_OUT_ERROR
} from './constants';

const initialState = {
  isLoading: false,
  error: '',
  user: {}
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: ''
      };

    case SIGNIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: ''
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case GET_USER_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: ''
      };

    case GET_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case LOG_OUT_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case LOG_OUT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: null,
        error: ''
      };

    case LOG_OUT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
