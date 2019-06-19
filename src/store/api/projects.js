import axios from 'axios';
import { defaultUrl } from './config';

export const getAllUsersProjects = (token) => {
  return axios({
    method: 'get',
    url: `${defaultUrl}/projects`,
    headers: {
      'authorization': token,
      'Content-Type': 'application/json'
    }
  })
};

export const createProject = (token, projectTitle) => {
  console.log("projectTitle in creator", projectTitle);
  return axios({
    method: 'post',
    url: `${defaultUrl}/projects`,
    headers: {
      'authorization': token,
      'Content-Type': 'application/json'
    },
    data: {
      projectTitle: projectTitle
    }
  })
};

export const getProjectById = (token, id) => {
  return axios({
    method: 'post',
    url: `${defaultUrl}/projects/:${id}`,
    headers: {
      'authorization': token,
      'Content-Type': 'application/json'
    },
  })
};
