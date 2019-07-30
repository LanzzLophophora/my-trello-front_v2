import isEmpty from 'lodash/isEmpty';
import {
  GET_CURRENT_PROJECT_REQUEST,
  GET_CURRENT_PROJECT_SUCCESS,
  GET_CURRENT_PROJECT_ERROR,
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
  SET_DRAGGABLE_CARD,
  SET_START_DRAG_LIST_ID,
  SET_DRAGGABLE_LIST_ID,
  CHANGE_LIST_TITLE,
  UPDATE_CARDLIST,
  CHANGE_LIST_FOR_CARD,
  CHANGE_LIST_POSITION
} from './constants';

const initialState = {
  projectTitle: '',
  lists: [],
  draggableCard: {},
  draggableListId: '',
  startDragListId: '',
  error: '',
  isLoading: false,
  isUpdating: ''
};

export const currentProject = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENT_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case GET_CURRENT_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        lists: action.payload.lists,
        projectTitle: action.payload.projectTitle,
        error: ''
      };

    case GET_CURRENT_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case DELETE_PROJECT_REQUEST:
      return {
        ...state,
        isLoading: true
      };

    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        projectTitle: '',
        lists: []
      };

    case DELETE_PROJECT_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };

    case UPDATE_PROJECT_REQUEST:
      return {
        ...state,
        isUpdating: true
      };

    case UPDATE_PROJECT_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        error: ''
      };

    case UPDATE_PROJECT_ERROR:
      return {
        ...state,
        isUpdating: false,
        error: action.payload
      };

    case CREATE_NEW_LIST_REQUEST:
      return {
        ...state,
        isUpdating: true
      };

    case CREATE_NEW_LIST_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        lists: [...state.lists, { ...action.payload }],
        error: ''
      };

    case CREATE_NEW_LIST_ERROR:
      return {
        ...state,
        isUpdating: false,
        error: action.payload
      };

    case DELETE_LIST_REQUEST:
      return {
        ...state,
        isUpdating: true
      };

    case DELETE_LIST_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        lists: state.lists.filter(list => list._id !== action.payload)
      };

    case DELETE_LIST_ERROR:
      return {
        ...state,
        isUpdating: false,
        error: action.payload
      };

    case UPDATE_LIST_REQUEST:
      return {
        ...state,
        isUpdating: true
      };

    case UPDATE_LIST_SUCCESS:
      return {
        ...state,
        isUpdating: false,
        lists: state.lists.map(list =>
          list._id === action.payload.listId ? { ...action.payload.newList } : list
        ),
        error: ''
      };

    case UPDATE_LIST_ERROR:
      return {
        ...state,
        isUpdating: false,
        error: action.payload
      };

    case CHANGE_LIST_TITLE:
      return {
        ...state,
        lists: state.lists.map(list =>
          list.listId === action.payload.listId ? { ...list, title: action.payload.title } : list
        )
      };

    case UPDATE_CARDLIST:
      return {
        ...state,
        lists: state.lists.map(list =>
          list.listId === action.payload.listId
            ? { ...list, cardList: action.payload.cardList }
            : list
        )
      };

    case CHANGE_LIST_FOR_CARD:
      const { lists } = state;
      const { dragListId, hoverListId, hoverCardIndex } = action.payload;
      const newDraggableCard = state.draggableCard;
      delete newDraggableCard.index;

      const hoverList = lists.find(list => list._id === hoverListId) || {};
      const dragList = lists.find(list => list._id === dragListId) || {};

      const newDragCard = {
        ...newDraggableCard,
        listId: hoverListId
      };

      let newHoverCardList = hoverList.cardList;
      let newHoverList = hoverList;
      if (!newHoverCardList.filter(card => card._id === state.draggableCard._id).length) {
        newHoverCardList.splice(hoverCardIndex, 0, newDragCard);
        newHoverList = {
          ...hoverList,
          cardList: newHoverCardList
        };
      }

      const newCardList = dragList.cardList.filter(
        card => !isEmpty(card) && card._id && card._id !== state.draggableCard._id
      );
      const newDragList = {
        ...dragList,
        cardList: newCardList
      };
      const newLists = lists.map(list => {
        if (list._id === dragListId) {
          return newDragList;
        }
        if (list._id === hoverListId) {
          return newHoverList;
        }
        return list;
      });
      return {
        ...state,
        lists: newLists
      };

    case CHANGE_LIST_POSITION:
      const oldLists = [...state.lists];
      const { dragListIndex, hoverListIndex } = action.payload;
      const oldList = oldLists.splice(dragListIndex, 1);
      oldLists.splice(hoverListIndex, 0, oldList[0]);
      return {
        ...state,
        lists: oldLists
      };

    case SET_DRAGGABLE_CARD:
      return {
        ...state,
        draggableCard: action.payload
      };

    case SET_START_DRAG_LIST_ID:
      return {
        ...state,
        startDragListId: action.payload
      };

    case SET_DRAGGABLE_LIST_ID:
      return {
        ...state,
        draggableListId: action.payload
      };

    default:
      return state;
  }
};
