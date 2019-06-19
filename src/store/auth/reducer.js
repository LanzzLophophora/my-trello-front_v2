import {
  SIGNIN_REQUEST, SIGNIN_SUCCESS, SIGNIN_ERROR,
  SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_ERROR,
  GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR
} from './constants';

const initialState = {
  isLoading: false,
  error: '',
  user: {
    login: '',
    _id: '',
    token: ''
  },
  token: ''
};

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload,
      };

    case SIGNIN_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
      };

    case SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
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
        user: action.payload
      };

    case GET_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    // case SET_NAME:
    //   return {
    //     ...state,
    //     user: {
    //       ...state.user,
    //       name: action.payload
    //     }
    //   };
    //
    // case LOG_OUT:
    //   return {
    //     ...state,
    //     isLoading: false,
    //     user: undefined,
    //   };

    default:
      return state;
  }
};
