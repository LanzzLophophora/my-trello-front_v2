import {
  CHANGE_LIST_TITLE,
  UPDATE_CARDLIST,
  CHANGE_LIST_FOR_CARD,
  CHANGE_LIST_POSITION,
  GET_CURRENT_PROJECT_ERROR,
  GET_CURRENT_PROJECT_REQUEST,
  GET_CURRENT_PROJECT_SUCCESS,
  DELETE_PROJECT_REQUEST,
  DELETE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  UPDATE_PROJECT_REQUEST,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_ERROR,
  CREATE_NEW_LIST_REQUEST,
  CREATE_NEW_LIST_SUCCESS,
  CREATE_NEW_LIST_ERROR,
  DELETE_LIST_REQUEST,
  DELETE_LIST_SUCCESS,
  DELETE_LIST_ERROR,
  UPDATE_LIST_REQUEST,
  UPDATE_LIST_SUCCESS,
  UPDATE_LIST_ERROR,
  CREATE_CARD,
  DELETE_CARD,
  SET_DRAGGABLE_CARD,
  SET_START_DRAG_LIST_ID,
  SET_DRAGGABLE_LIST_ID
} from './constants';

export const getCurrentProjectRequest = (token, projectId) => ({
  type: GET_CURRENT_PROJECT_REQUEST,
  token,
  projectId
});

export const getCurrentProjectSuccess = project => ({
  type: GET_CURRENT_PROJECT_SUCCESS,
  payload: project
});

export const getCurrentProjectError = error => ({
  type: GET_CURRENT_PROJECT_ERROR,
  payload: error
});

export const deleteProjectRequest = (token, projectId) => ({
  type: DELETE_PROJECT_REQUEST,
  token,
  projectId
});

export const deleteProjectSuccess = projectId => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: projectId
});

export const deleteProjectError = error => ({
  type: DELETE_PROJECT_ERROR,
  payload: error
});

export const updateProjectRequest = (token, projectId, newData) => ({
  type: UPDATE_PROJECT_REQUEST,
  token,
  projectId,
  newData
});

export const updateProjectSuccess = project => ({
  type: UPDATE_PROJECT_SUCCESS,
  payload: project
});

export const updateProjectError = error => ({
  type: UPDATE_PROJECT_ERROR,
  payload: error
});

export const createNewListRequest = (token, projectId, listTitle) => ({
  type: CREATE_NEW_LIST_REQUEST,
  token,
  projectId,
  listTitle
});

export const createNewListSuccess = list => ({
  type: CREATE_NEW_LIST_SUCCESS,
  payload: list
});

export const createNewListError = error => ({
  type: CREATE_NEW_LIST_ERROR,
  payload: error
});

export const deleteListRequest = (token, projectId, listId) => ({
  type: DELETE_LIST_REQUEST,
  token,
  projectId,
  listId
});

export const deleteListSuccess = listId => ({
  type: DELETE_LIST_SUCCESS,
  payload: listId
});

export const deleteListError = error => ({
  type: DELETE_LIST_ERROR,
  payload: error
});

export const updateListRequest = (token, projectId, listId, data) => ({
  type: UPDATE_LIST_REQUEST,
  token,
  projectId,
  listId,
  data
});

export const updateListSuccess = (listId, newList) => ({
  type: UPDATE_LIST_SUCCESS,
  payload: {
    listId,
    newList
  }
});

export const updateListError = error => ({
  type: UPDATE_LIST_ERROR,
  payload: error
});

export const addNewCardToListRequest = (token, projectId, listId, newCardTitle) => ({
  type: CREATE_CARD,
  token,
  projectId,
  listId,
  newCardTitle
});

export const updateCardList = (listId, cardList) => ({
  type: UPDATE_CARDLIST,
  payload: {
    listId,
    cardList
  }
});

export const changeListTitle = (listId, title) => ({
  type: CHANGE_LIST_TITLE,
  payload: {
    listId,
    title
  }
});

export const deleteCardRequest = (token, projectId, listId, cardId) => {
  return {
    type: DELETE_CARD,
    token,
    projectId,
    listId,
    cardId
  };
};

export const changeListForCard = (dragListId, hoverListId, hoverCardIndex) => ({
  type: CHANGE_LIST_FOR_CARD,
  payload: {
    dragListId,
    hoverListId,
    hoverCardIndex
  }
});

export const changeListPosition = (dragListIndex, hoverListIndex) => ({
  type: CHANGE_LIST_POSITION,
  payload: {
    dragListIndex,
    hoverListIndex
  }
});

export const setDraggableCard = card => ({
  type: SET_DRAGGABLE_CARD,
  payload: card
});

export const setDraggableListId = listId => ({
  type: SET_DRAGGABLE_LIST_ID,
  payload: listId
});

export const setStartDragListId = listId => ({
  type: SET_START_DRAG_LIST_ID,
  payload: listId
});
