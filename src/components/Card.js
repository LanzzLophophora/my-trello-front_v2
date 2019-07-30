import React, { useImperativeHandle, useRef } from 'react';
import { connect } from 'react-redux';
import ItemTypes from './ItemTypes';
import { Button } from '@material-ui/core';
import { DragSource, DropTarget } from 'react-dnd';

import {
  changeListForCard,
  deleteCardRequest,
  setDraggableCard,
  updateListRequest,
  setStartDragListId
} from '../store/currentProject/actions';

const Card = React.forwardRef(
  (
    {
      cardTitle,
      _id,
      listId,
      projectId,
      draggableCard,
      user,
      connectDragSource,
      connectDropTarget,
      deleteCardRequest
    },
    ref
  ) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    const opacity = _id === draggableCard.id ? 0.1 : 1;

    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current
    }));

    const handleDeleteCard = () => {
      deleteCardRequest(user.token, projectId, listId, _id);
    };

    return (
      <div ref={elementRef} style={Object.assign({}, { opacity })} className="card-item">
        <span>{cardTitle}</span>
        <Button onClick={handleDeleteCard}>
          <i className="material-icons">delete</i>
        </Button>
      </div>
    );
  }
);

const mapStateToProps = store => ({
  lists: store.currentProject.lists,
  draggableCard: store.currentProject.draggableCard,
  startDragListId: store.currentProject.startDragListId,
  user: store.auth.user
});

const mapDispatchToProps = dispatch => ({
  deleteCardRequest: (token, projectId, listId, cardId) =>
    dispatch(deleteCardRequest(token, projectId, listId, cardId)),
  changeListForCard: (dragListId, hoverListId, hoverCardIndex) =>
    dispatch(changeListForCard(dragListId, hoverListId, hoverCardIndex)),
  setDraggableCard: card => dispatch(setDraggableCard(card)),
  updateListRequest: (token, projectId, listId, data) =>
    dispatch(updateListRequest(token, projectId, listId, data)),
  setStartDragListId: listId => dispatch(setStartDragListId(listId))
});

const CardWithDnD = DropTarget(
  ItemTypes.CARD,
  {
    hover(props, monitor, component) {
      if (!component) {
        return null;
      }
      const node = component.getNode();
      if (!node) {
        return null;
      }

      const hoverCardIndex = props.index;
      let hoverListId = props.listId;
      const dragCardIndex = props.draggableCard.index;
      let dragListId = monitor.getItem().listId;

      const hoverBoundingRect = node.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragListId === hoverListId) {
        if (
          props.lists
            .find(list => list._id === dragListId)
            .cardList.filter(card => card._id === props.draggableCard._id).length
        ) {
          if (dragCardIndex === hoverCardIndex) {
            return;
          }
          if (dragCardIndex < hoverCardIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          if (dragCardIndex > hoverCardIndex && hoverClientY > hoverMiddleY) {
            return;
          }
          props.moveCard(dragCardIndex, hoverCardIndex);
        } else {
          props.changeListForCard(props.draggableCard.listId, hoverListId, hoverCardIndex);
          props.setDraggableCard({
            ...props.draggableCard,
            index: hoverCardIndex,
            listId: hoverListId
          });
        }
      } else if (dragListId !== hoverListId) {
        if (
          !props.lists
            .find(list => list._id === hoverListId)
            .cardList.filter(card => card._id === props.draggableCard.id).length
        ) {
          props.changeListForCard(dragListId, hoverListId, hoverCardIndex);
          props.setDraggableCard({
            ...props.draggableCard,
            index: hoverCardIndex | 0,
            listId: hoverListId
          });
          monitor.getItem().listId = hoverListId;
          return;
        } else {
          if (dragCardIndex === hoverCardIndex) {
            return;
          }
          if (dragCardIndex < hoverCardIndex && hoverClientY < hoverMiddleY) {
            return;
          }
          if (dragCardIndex > hoverCardIndex && hoverClientY > hoverMiddleY) {
            return;
          }
          props.moveCard(dragCardIndex, hoverCardIndex);
        }
      }
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag: props => {
        props.setStartDragListId(props.listId);
        props.setDraggableCard({
          _id: props._id,
          cardTitle: props.cardTitle,
          listId: props.listId,
          index: props.index
        });
        return {
          ...props
        };
      },
      endDrag: (props, monitor) => {
        const {
          lists,
          user,
          projectId,
          startDragListId,
          draggableCard,
          updateListRequest,
          setStartDragListId,
          setDraggableCard
        } = props;

        const hoverList = lists.find(list => list._id === monitor.getItem().listId);
        if (startDragListId !== hoverList._id) {
          const cardList = lists
            .filter(list => list._id === startDragListId)[0]
            .cardList.filter(card => card._id !== draggableCard._id);
          updateListRequest(user.token, projectId, startDragListId, { cardList });
          updateListRequest(user.token, projectId, hoverList._id, { cardList: hoverList.cardList });
        } else {
          updateListRequest(user.token, projectId, hoverList._id, { cardList: hoverList.cardList });
        }

        setStartDragListId('');
        setDraggableCard({});
      }
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(Card)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardWithDnD);
