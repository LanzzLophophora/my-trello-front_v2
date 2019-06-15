import {
  SET_NAME,
  FETCH_AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  LOG_OUT
} from './constants';

const initialState = {
  isLoading: true,
  error: '',
  user: {
    name: '',
    token: undefined
  }
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_AUTH_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case AUTH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
      };

    case AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case SET_NAME:
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload
        }
      };

    case LOG_OUT:
      return {
        ...state,
        isLoading: false,
        user: undefined,
      };

    default:
      return state;
  }
};
