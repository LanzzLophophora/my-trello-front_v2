import { takeLatest, takeEvery, call, put } from "redux-saga/effects";
import { GET_ALL_PROJECTS_REQUEST, CREATE_PROJECT_REQUEST } from './constants';
import { getAllUsersProjects, createProject, getProjectById } from '../api/projects';
import {
  getAllProjectsRequest, getAllProjectsSuccess, getAllProjectsError,
  createProjectSuccess, createProjectError
} from './actions';

export function* watcherGetAllProjects () {
  yield takeLatest(GET_ALL_PROJECTS_REQUEST, getAllProjectsWorker);
}

function* getAllProjectsWorker (action) {
  try {
    const { token, callback } = action;
    console.log(1);
    console.log(callback);
    console.log(typeof callback);
    const response = yield call(getAllUsersProjects, token);
    console.log("response in saga", response.data);
    yield put(getAllProjectsSuccess(response.data.userProjects));
    callback && callback(response.data.userProjects);
    console.log(2);
  } catch (error) {
    console.log('catched error =>', error );
    // console.log('catched error =>', error.response.data.message );
    yield put(getAllProjectsError(error.response.data.message));
    yield put(getAllProjectsError(error));
  }
}


export function* watcherCreateProject () {
  yield takeEvery(CREATE_PROJECT_REQUEST, createProjectsWorker);
}

function* createProjectsWorker (action) {
  try {
    const { token, projectTitle } = action;
    yield call(createProject, token, projectTitle );
    yield put(createProjectSuccess());
    yield put(getAllProjectsRequest(token))
  } catch (error) {
    console.log('catched error =>', error.response.data.message );
    yield put(createProjectError(error.response.data.message));
  }
}
//
// getProjectById
// export

