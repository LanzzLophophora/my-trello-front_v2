import {
  CREATE_NEW_LIST, CHANGE_LIST_TITLE, DELETE_LIST,
  ADD_NEW_CARD_TO_LIST, UPDATE_CARDLIST, DELETE_CARD,
  CHANGE_LIST_FOR_CARD, CHANGE_LIST_POSITION,
  SET_DRAGGABLE_CARD, SET_DRAGGABLE_LIST_ID
} from './constants';

export const createNewList = list => ({
  type: CREATE_NEW_LIST,
  payload: list
});

export const changeListTitle = (listId, title) => ({
  type: CHANGE_LIST_TITLE,
  payload: {
    listId,
    title
  }
});

export const deleteList = listId => ({
  type: DELETE_LIST,
  payload: listId
});

export const addNewCardToList = (value, listId) => ({
  type: ADD_NEW_CARD_TO_LIST,
  payload: {
    value,
    listId
  }
});

export const updateCardList = (listId, cardList) => ({
  type: UPDATE_CARDLIST,
  payload: {
    listId,
    cardList
  }
});

export const deleteCard = (id, listId) => ({
  type: DELETE_CARD,
  payload: {
    id,
    listId
  }
});

export const changeListForCard = (dragListId, hoverListId, hoverCardIndex) => ({
  type: CHANGE_LIST_FOR_CARD,
  payload: {
    dragListId,
    hoverListId,
    hoverCardIndex
  }
});

export const changeListPosition = (dragListIndex,hoverListIndex) => ({
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
