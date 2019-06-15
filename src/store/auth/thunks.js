import { authenticateRequest, authenticateSuccess, authenticateError, setLocalNickname, logOut } from './actions';
import { push } from 'connected-react-router';
import { registration, signIn, signOut, getUserName, setName } from '../api/auth';
import firebase from '../api/config/firebase';

const makeUser = (user) => ({
  uid: user.uid,
  email: user.email,
  nickname: user.nickname
});

export const logOutUser = () => dispatch => {
  dispatch(authenticateRequest());

  signOut()
    .then(() => {
      dispatch(logOut());
      dispatch(push('/login'));
    })
    .catch(({ message }) => {
      dispatch(authenticateError(message));
    });
};

export const authenticateUser = (name, password) => dispatch => {
  dispatch(authenticateRequest());

  signIn(name, password)
    .then(({ user }) => {
      getUserName()
        .then(data => {
          dispatch(authenticateSuccess(makeUser(user)));
          dispatch(setLocalNickname(data.data().name));
        })
        .then(() => {
          dispatch(push('/notes'));
        })
    })
    .catch(({ message }) => {
      console.log(message, 'error');
      dispatch(authenticateError(message));
    });
};

export const registrationUser = (email, password, name) => dispatch => {
  dispatch(authenticateRequest());

  registration(email, password)
    .then(() => {
      setName(name);
      dispatch(push('/notes'));
    })
    .catch(({ message }) => {
      dispatch(authenticateError(message));
    })
};

export const subscribeAuthentication = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      dispatch(authenticateSuccess(makeUser(user)));
      getUserName()
        .then(data => {
          dispatch(authenticateSuccess(makeUser(user)));
          dispatch(setLocalNickname(data.data().name));
        })
        .catch(({ message }) => {
          dispatch(authenticateError(message));
        });
    } else {
      dispatch(authenticateSuccess());
      dispatch(logOut());
    }
  })
};
