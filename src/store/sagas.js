import { all } from 'redux-saga/effects';
import { watcherSignInSaga, watcherSignUpSaga, watcherGetUserSaga } from './auth/sagas';
import { watcherGetAllProjects, watcherCreateProject } from './project/sagas';


export default function* rootSaga() {
  yield all([
    watcherSignInSaga(),
    watcherSignUpSaga(),
    watcherGetUserSaga(),

    watcherGetAllProjects(),
    watcherCreateProject(),

  ]);
}
