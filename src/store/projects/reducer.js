import {
  GET_ALL_PROJECTS_REQUEST,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_ERROR,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR
} from './constants';

import { DELETE_PROJECT_REQUEST, DELETE_PROJECT_SUCCESS } from '../currentProject/constants';

const initialState = {
  projects: [],
  error: '',
  isLoading: false
};

export const projects = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: state.projects.filter(project => project._id !== action.payload)
      };

    case GET_ALL_PROJECTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case GET_ALL_PROJECTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projects: action.payload
      };

    case GET_ALL_PROJECTS_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case CREATE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        error: '',
        isLoading: false
      };

    case CREATE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    default:
      return state;
  }
};
