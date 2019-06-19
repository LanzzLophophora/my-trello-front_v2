import axios from 'axios';

import { defaultUrl } from './config';

export const signUp = (login, password) => {
  return axios.post(
    `${defaultUrl}/signup`,
    { login, password }
  )
};

export const signIn = (login, password) => {
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

export const getUser = (token) => {
  return axios({
    method: 'get',
    url: `${defaultUrl}/user`,
    headers: {
      'authorization': token,
      'Content-Type': 'application/json'
    }
  })
};

// export const signOut = () => {
//   const requestHandler = (resolve, reject) => {
//     axios.post(
//       "http://localhost:5000/api/signup",
//       { name, password }
//     )
//       .then(data => resolve(data))
//       .catch(error => reject(error.message))
//   };
//   return new Promise(requestHandler)
// };

// export const setName = name => {
//   const requestHandler = (resolve, reject) => {
//     const uid = firebase.auth().currentUser.uid;
//     db.collection("users").doc(`${uid}`).set({ name })
//       .then(data => resolve(data))
//       .catch(error => reject(error.message))
//   };
//   return new Promise(requestHandler)
// };
