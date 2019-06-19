import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import TokenStorage from '../api/token';
import {
  SIGNIN_REQUEST,
  SIGNUP_REQUEST,
  GET_USER_REQUEST,
} from './constants';

import {
  signinSuccess, signinError,
  signupSuccess, signupError,
  getUserRequest, getUserSuccess, getUserError
} from './actions';

import { signIn, signUp, getUser } from '../api/auth';
import { history }  from 'history';
import { push } from 'connected-react-router';

// watcher saga: watches for actions dispatched to the store, starts worker saga

export function* watcherSignInSaga() {
  yield takeLatest(SIGNIN_REQUEST, signinWorker);
}

function* signinWorker(action) {
  try {
    const localUser = TokenStorage.getItemFromLocalStorage();
    if (!localUser) {
      const sessionUser = TokenStorage.getItemFromSessionStorage();
      if (!sessionUser) {
        const { login, password, remember } = action;
        const response = yield call(signIn, login, password);
        yield put(signinSuccess(response.data.token));
        const token = response.data.token;
        yield put(getUserRequest(token, remember));
      } else {
        yield put(getUserSuccess(sessionUser));
        // yield put(push(`/:${sessionUser._id}`));
      }
    } else {
      yield put(getUserSuccess(localUser));
      // yield put(push(`/:${localUser._id}`));
    }
  } catch (error) {
    console.log('catched error =>', error);
    // console.log('catched error =>', error.response.data.message);
    yield put(signinError(error.response.data.message));
  }
}

export function* watcherSignUpSaga() {
  yield takeLatest(SIGNUP_REQUEST, signupWorker);
}

function* signupWorker(action) {
  try {
    const { login, password } = action;
    const response = yield call(signUp, login, password);
    yield put(signupSuccess(response.data));

  } catch (error) {
    console.log('catched error =>', error.response.data.message);
    yield put(signupError(error.response.data.message));
  }
}

export function* watcherGetUserSaga() {
  yield takeEvery(GET_USER_REQUEST, getUserWorker);
}
function* getUserWorker(action) {
  try {
    const { token, remember } = action;
    const response = yield call(getUser, token);
    const user = {
      ...response.data,
      token: token
    };
    if (remember) {
      TokenStorage.setItemInLocalStorage(user)
    } else {
      TokenStorage.steItemInSessionStorage(user)
    }
    yield put(getUserSuccess(response.data));

    // dispatch(push('/login'));
    yield put(push(`/:${user._id}`));
  } catch (error) {
    console.log('catched error =>', error.response.data.message);
    yield put(getUserError(error.response.data.message));
  }
}




// export const subscribeAuthentication = () => dispatch => {
//   const localUser = TokenStorage.getItemFromLocalStorage();
//   if (!localUser) {
//     const sessionUser = TokenStorage.getItemFromSessionStorage();
//     if (!sessionUser) {
//       push('/signin');
//     } else {
//       dispatch(getUserSuccess(sessionUser));
//       push(`/:${sessionUser._id}`);
//     }
//   } else {
//     dispatch(getUserSuccess(localUser));
//     push(`/:${localUser._id}`);
//   }
// };


// const workerSaga = (callFunc, onSuccess, onError) => {
//    return function* () {
//     console.log("workerSaga");
//     console.log("callFunc", callFunc);
//     console.log("onSuccess", onSuccess);
//     console.log("onError", onError);
//     try {
//       const response = yield call(callFunc);
//       const data = response.data;
//       console.log("data", data);
//       yield put(onSuccess(data));
//
//     } catch (error) {
//       yield put(onError(error));
//       console.log("error", error);
//
//     }
//   }
// };
//
// function* workerSaga(callFunc, onSuccess, onError) {
//   console.log("ws");
//   try {
//     const response = yield call(callFunc);
//     const data = response.data;
//     yield put(onSuccess(data));
//
//   } catch (error) {
//     yield put(onError(error));
//   }
// }
