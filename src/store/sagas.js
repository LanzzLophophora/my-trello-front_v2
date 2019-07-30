import { all } from 'redux-saga/effects';
import {
  watcherSignInSaga,
  watcherSignUpSaga,
  watcherGetUserSaga,
  watcherLogOut
} from './auth/sagas';
import { watcherGetAllProjects, watcherCreateProject } from './projects/sagas';
import {
  watcherGetCurrentProject,
  watcherDeleteProject,
  watcherUpdateProject,
  watcherCreateList,
  watcherDeleteList,
  watcherUpdateList,
  watcherAddNewCardToList,
  watcherDeleteCard
} from './currentProject/sagas';

export default function* rootSaga() {
  yield all([
    watcherSignInSaga(),
    watcherSignUpSaga(),
    watcherGetUserSaga(),
    watcherLogOut(),

    watcherGetAllProjects(),
    watcherCreateProject(),
    watcherUpdateProject(),

    watcherGetCurrentProject(),
    watcherDeleteProject(),
    watcherCreateList(),
    watcherDeleteList(),
    watcherUpdateList(),
    watcherAddNewCardToList(),
    watcherDeleteCard()
  ]);
}
