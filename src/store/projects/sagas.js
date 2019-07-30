import { takeEvery, call, put } from 'redux-saga/effects';
import { GET_ALL_PROJECTS_REQUEST, CREATE_PROJECT_REQUEST } from './constants';
import { getAllUsersProjects, createProject } from '../api/projects';
import {
  getAllProjectsRequest,
  getAllProjectsSuccess,
  getAllProjectsError,
  createProjectSuccess,
  createProjectError
} from './actions';
import { errorHandler } from '../../components/errorHandler';

export function* watcherGetAllProjects() {
  yield takeEvery(GET_ALL_PROJECTS_REQUEST, getAllProjectsWorker);
}

function* getAllProjectsWorker(action) {
  try {
    const { token } = action;
    const response = yield call(getAllUsersProjects, token);
    yield put(getAllProjectsSuccess(response.data.userProjects));
  } catch (error) {
    console.log('catched error =>', { error });
    yield put(errorHandler(error, getAllProjectsError));
  }
}

export function* watcherCreateProject() {
  yield takeEvery(CREATE_PROJECT_REQUEST, createProjectsWorker);
}

function* createProjectsWorker(action) {
  try {
    const { token, projectTitle } = action;
    yield call(createProject, token, projectTitle);
    yield put(createProjectSuccess());
    yield put(getAllProjectsRequest(token));
  } catch (error) {
    console.log('catched error =>', { error });
    yield put(errorHandler(error, createProjectError));
  }
}
