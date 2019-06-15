import uuid from 'uuid/v4';
import isEmpty from 'lodash/isEmpty';
import {
  CREATE_NEW_LIST, CHANGE_LIST_TITLE, DELETE_LIST,
  ADD_NEW_CARD_TO_LIST, UPDATE_CARDLIST, DELETE_CARD,
  CHANGE_LIST_FOR_CARD, CHANGE_LIST_POSITION,
  SET_DRAGGABLE_CARD, SET_DRAGGABLE_LIST_ID
} from './constants';

const initialState = {
  lists: [
    {
      listId: '11111111111111111',
      title: 'Планы на отпуск',
      cardList: [
        {
          id: '1.1',
          value: 'Уехать из города',
          listId: '11111111111111111',
        },
        {
          id: '1.2',
          value: 'Любоваться природой',
          listId: '11111111111111111',
        }
      ],
    },
  ],
  draggableCard: {},
  draggableListId: '',
};

export const globalField = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NEW_LIST:
      const listId = uuid();
      return {
        ...state,
        lists: [
          ...state.lists,
          {
            listId,
            cardList: [],
            ...action.payload
          }
        ]
      };

    case CHANGE_LIST_TITLE:
      return {
        ...state,
        lists: state.lists.map(list => list.listId === action.payload.listId ? {...list, title: action.payload.title} : list)
      };

    case DELETE_LIST:
      return {
        ...state,
        lists: state.lists.filter(list => list.listId !== action.payload)
      };

    case ADD_NEW_CARD_TO_LIST:
      const id = uuid();
      return {
        ...state,
        lists: state.lists.map(list => list.listId === action.payload.listId ?
          { ...list,
            cardList: [
              ...list.cardList,
              {
                id,
                value: action.payload.value,
                listId: action.payload.listId
              }
            ]
          } : list )
      };

    case UPDATE_CARDLIST:
      return {
        ...state,
        lists: state.lists.map(list => list.listId === action.payload.listId ? { ...list, cardList: action.payload.cardList} : list )
      };

    case DELETE_CARD:
      const currentList = state.lists.filter(list => list.listId === action.payload.listId);
      const newCardList = currentList[0].cardList.filter(card => card.id !== action.payload.id);
      return {
        ...state,
        lists: state.lists.map(list => list.listId === action.payload.listId
          ? { ...list, cardList: newCardList }
          : list)
      };

    case CHANGE_LIST_FOR_CARD:
      const { lists } = state;
      const { dragListId, hoverListId, hoverCardIndex } = action.payload;
      const newDraggableCard = state.draggableCard;
      delete newDraggableCard.index;
      const hoverList = lists.find(list => list.listId === hoverListId);
      const dragList = lists.find(list => list.listId === dragListId);

      const newDragCard = {
        ...newDraggableCard,
        listId: hoverListId
      };
      let newHoverCardList = hoverList.cardList;
      let newHoverList = hoverList;
      if(!newHoverCardList.filter(card => card.id === state.draggableCard.id).length){
        newHoverCardList.splice(hoverCardIndex,0,newDragCard);
        newHoverList = {
          ...hoverList,
          cardList: newHoverCardList,
        };
      }
      const newDragList = {
        ...dragList,
        cardList: dragList.cardList.filter(card => !isEmpty(card) && card.id && card.id !== state.draggableCard.id)
      };
      const newLists = lists.map(list => {
        if(list.listId === dragListId) {
          return newDragList
        }
        if(list.listId === hoverListId) {
          return newHoverList
        }
        return list
      });
      return {
        ...state,
        lists: newLists
      };

    case CHANGE_LIST_POSITION:
      const oldLists = [...state.lists];
      const { dragListIndex, hoverListIndex } = action.payload;
      const oldList = oldLists.splice(dragListIndex,1);
      oldLists.splice(hoverListIndex,0,oldList[0]);
      return {
        ...state,
        lists: oldLists
      };

    case SET_DRAGGABLE_CARD:
      return {
        ...state,
        draggableCard: action.payload
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
