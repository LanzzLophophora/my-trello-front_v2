import {
  GET_ALL_PROJECTS_REQUEST,
  GET_ALL_PROJECTS_SUCCESS,
  GET_ALL_PROJECTS_ERROR,
  CREATE_PROJECT_REQUEST,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_ERROR
} from './constants';

export const getAllProjectsRequest = token => {
  return {
    type: GET_ALL_PROJECTS_REQUEST,
    token
  };
};

export const getAllProjectsSuccess = projects => ({
  type: GET_ALL_PROJECTS_SUCCESS,
  payload: projects
});

export const getAllProjectsError = error => ({
  type: GET_ALL_PROJECTS_ERROR,
  payload: error
});

export const createProjectRequest = (token, projectTitle) => ({
  type: CREATE_PROJECT_REQUEST,
  token,
  projectTitle
});

export const createProjectSuccess = () => ({
  type: CREATE_PROJECT_SUCCESS
});

export const createProjectError = error => ({
  type: CREATE_PROJECT_ERROR,
  payload: error
});
