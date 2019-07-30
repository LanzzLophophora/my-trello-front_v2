import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import TokenStorage from '../api/token';
import { signIn, signUp, getUser } from '../api/auth';
import { SIGNIN_REQUEST, SIGNUP_REQUEST, GET_USER_REQUEST, LOG_OUT_REQUEST } from './constants';
import {
  signinSuccess,
  signinError,
  signupSuccess,
  signupError,
  getUserRequest,
  getUserSuccess,
  getUserError,
  logOutSuccess,
  logOutError
} from './actions';

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
        if (login && password) {
          const response = yield call(signIn, login, password);
          yield put(signinSuccess(response.data.token));
          const token = response.data.token;
          yield put(getUserRequest(token, remember));
        } else {
          yield put(signinSuccess(''));
        }
      } else {
        yield put(push('/user'));
        yield put(getUserSuccess(sessionUser));
      }
    } else {
      yield put(push('/user'));
      yield put(getUserSuccess(localUser));
    }
  } catch (error) {
    console.log('catched error =>', { error });
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
    console.log('catched error =>', { error });
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
      TokenStorage.setItemInLocalStorage(user);
    } else {
      TokenStorage.steItemInSessionStorage(user);
    }
    yield put(getUserSuccess(response.data));
    yield put(push('/user'));
  } catch (error) {
    console.log('catched error =>', { error });
    yield put(getUserError(error.response.data.message));
  }
}

export function* watcherLogOut() {
  yield takeLatest(LOG_OUT_REQUEST, logOutWorker);
}

function* logOutWorker() {
  try {
    TokenStorage.removeItemInLocalStorage();
    TokenStorage.removeItemInSessionStorage();
    yield put(logOutSuccess());
  } catch (error) {
    console.log('catched error =>', { error });
    yield put(logOutError(error.response.data.message));
  }
}
