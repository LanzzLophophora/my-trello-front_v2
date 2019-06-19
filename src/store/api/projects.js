import axios from 'axios';

export const getAllProjectsByUserId = () => {
  return axios({
    method: 'get',
    url: `${defaultUrl}/signin`,
    headers: {
      'login': login,
      'password': password,
      'Content-Type': 'application/json'
    }
  })
};
