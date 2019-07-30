import { takeLatest, takeEvery, call, put } from 'redux-saga/effects';
import uuid from 'uuid/v4';
import { push } from 'connected-react-router';
import {
  GET_CURRENT_PROJECT_REQUEST,
  DELETE_PROJECT_REQUEST,
  UPDATE_PROJECT_REQUEST,
  CREATE_NEW_LIST_REQUEST,
  DELETE_LIST_REQUEST,
  UPDATE_LIST_REQUEST,
  CREATE_CARD,
  DELETE_CARD
} from './constants';
import {
  getCurrentProjectSuccess,
  getCurrentProjectError,
  deleteProjectSuccess,
  deleteProjectError,
  updateProjectSuccess,
  updateProjectError,
  createNewListSuccess,
  createNewListError,
  deleteListSuccess,
  deleteListError,
  updateListRequest,
  updateListSuccess,
  updateListError
} from './actions';
import { getProjectById, deleteProject, updateProject } from '../api/projects';
import { getList, getAllLists, createList, deleteList, updateList } from '../api/list';
import { errorHandler } from '../../components/errorHandler';

export function* watcherGetCurrentProject() {
  yield takeEvery(GET_CURRENT_PROJECT_REQUEST, getCurrentProjectWorker);
}

function* getCurrentProjectWorker(action) {
  try {
    const { token, projectId } = action;
    const response = yield call(getProjectById, token, projectId);
    let currentProject = { ...response.data };

    if (currentProject.lists && currentProject.lists.length > 0) {
      try {
        const lists = [];
        const newResponse = yield call(getAllLists, token, projectId);
        for (let i = 0; i < currentProject.lists.length; i++) {
          lists.push(
            newResponse.data.lists.filter(list => list._id === currentProject.lists[i])[0]
          );
        }
        yield put(getCurrentProjectSuccess({ ...currentProject, lists }));
      } catch (e) {
        yield put(getCurrentProjectError(e.message));
      }
    } else {
      yield put(getCurrentProjectSuccess({ ...currentProject }));
    }
  } catch (error) {
    console.log('catched error =>', { error });
    yield put(errorHandler(error, getCurrentProjectError));
  }
}

export function* watcherDeleteProject() {
  yield takeLatest(DELETE_PROJECT_REQUEST, deleteProjectWorker);
}

function* deleteProjectWorker(action) {
  try {
    const { token, projectId } = action;
    yield call(deleteProject, token, projectId);
    yield put(deleteProjectSuccess(projectId));
    yield put(push('/user/projects'));
  } catch (error) {
    console.log('catched error =>', { error });
    yield put(errorHandler(error, deleteProjectError));
  }
}

export function* watcherUpdateProject() {
  yield takeEvery(UPDATE_PROJECT_REQUEST, updateProjectWorker);
}

function* updateProjectWorker(action) {
  try {
    const { token, projectId, newData } = action;
    const response = yield call(getProjectById, token, projectId);
    const currentProjectWithoutLists = response.data;
    const newProject = {
      ...currentProjectWithoutLists,
      lists: newData
    };
    const newResponse = yield call(updateProject, token, projectId, newProject);
    yield put(updateProjectSuccess(newResponse.data));
  } catch (error) {
    console.log('catched error =>', { error });
    yield put(errorHandler(error, updateProjectError));
  }
}

export function* watcherCreateList() {
  yield takeEvery(CREATE_NEW_LIST_REQUEST, createListWorker);
}

function* createListWorker(action) {
  try {
    const { token, projectId, listTitle } = action;
    const response = yield call(createList, token, projectId, listTitle);
    yield put(createNewListSuccess(response.data));
  } catch (error) {
    console.log('catched error =>', { error });
    yield put(errorHandler(error, createNewListError));
  }
}

export function* watcherDeleteList() {
  yield takeLatest(DELETE_LIST_REQUEST, deleteListWorker);
}

function* deleteListWorker(action) {
  try {
    const { token, projectId, listId } = action;
    yield call(deleteList, token, projectId, listId);
    yield put(deleteListSuccess(listId));
  } catch (error) {
    console.log('catched error =>', { error });
    yield put(errorHandler(error, deleteListError));
  }
}

export function* watcherAddNewCardToList() {
  yield takeEvery(CREATE_CARD, addNewCardToListWorker);
}

function* addNewCardToListWorker(action) {
  try {
    const { token, projectId, listId, newCardTitle } = action;

    const newCard = {
      cardTitle: newCardTitle,
      listId,
      _id: uuid()
    };
    const response = yield call(getList, token, projectId, listId);
    const oldCardList = response.data.cardList;
    const cardList = [...oldCardList, newCard];

    yield put(updateListRequest(token, projectId, listId, { ...response.data, cardList }));
  } catch (error) {
    console.log('catched error =>', { error });
    yield put(errorHandler(error, deleteListError));
  }
}

export function* watcherDeleteCard() {
  yield takeEvery(DELETE_CARD, deleteCardWorker);
}

function* deleteCardWorker(action) {
  try {
    const { token, projectId, listId, cardId } = action;
    const response = yield call(getList, token, projectId, listId);
    const oldCardList = response.data.cardList;
    const cardList = oldCardList.filter(card => card._id !== cardId);
    yield put(updateListRequest(token, projectId, listId, { ...response.data, cardList }));
  } catch (error) {
    console.log('catched error =>', { error });
    yield put(errorHandler(error, deleteListError));
  }
}

export function* watcherUpdateList() {
  yield takeEvery(UPDATE_LIST_REQUEST, updateListWorker);
}

function* updateListWorker(action) {
  try {
    const { token, projectId, listId, data } = action;
    const response = yield call(updateList, token, projectId, listId, data);
    yield put(updateListSuccess(listId, response.data.list));
  } catch (error) {
    console.log('catched error =>', { error });
    yield put(errorHandler(error, updateListError));
  }
}
