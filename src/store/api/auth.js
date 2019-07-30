import axios from 'axios';
import { defaultUrl } from './config';

export const signUp = (login, password) => {
  return axios({
    method: 'post',
    url: `${defaultUrl}/signup`,
    data: {
      login: login,
      password: password
    }
  });
};

export const signIn = (login, password) => {
  return axios({
    method: 'get',
    url: `${defaultUrl}/signin`,
    headers: {
      login: login,
      password: password,
      'Content-Type': 'application/json'
    }
  });
};

export const getUser = token => {
  return axios({
    method: 'get',
    url: `${defaultUrl}/user`,
    headers: {
      authorization: token,
      'Content-Type': 'application/json'
    }
  });
};
