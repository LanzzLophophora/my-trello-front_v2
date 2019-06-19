import React, { useImperativeHandle, useRef } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { Button } from '@material-ui/core';
import { connect } from 'react-redux';

import { changeListForCard, deleteCard, setDraggableCard } from '../store/project/actions';

const Card = React.forwardRef(
  ({ value, id, active, listId, lists, draggableCard,
     connectDragSource, connectDropTarget, setDraggableCard,
     deleteCard, changeListForCard,
     index, isOver }, ref) => {
    const elementRef = useRef(null);
    connectDragSource(elementRef);
    connectDropTarget(elementRef);
    const opacity = id === draggableCard.id ? 0.1 : 1;

    useImperativeHandle(ref, () => ({
      getNode: () => elementRef.current,
    }));

    const handleDeleteCard = () => {
      deleteCard(id, listId)
    };

    return (
      <div
        ref={elementRef}
        style={Object.assign({}, { opacity })}
        className="card-item"
      >
        <span>{value}</span>
        <Button onClick={handleDeleteCard}>
          <i className="material-icons">
            delete
          </i>
        </Button>
      </div>
    )
  },
);

const mapStateToProps = store => ({
  lists: store.globalField.lists,
  draggableCard: store.globalField.draggableCard
});

const mapDispatchToProps = dispatch => ({
  deleteCard: (id, listId) => dispatch(deleteCard(id, listId)),
  changeListForCard: (dragListId, hoverListId, hoverCardIndex) =>
    dispatch(changeListForCard(dragListId, hoverListId, hoverCardIndex)),
  setDraggableCard: card => dispatch(setDraggableCard(card))
});


const CardWithDnD =
  DropTarget(
  ItemTypes.CARD,
  {
    hover(props, monitor, component) {
      if (!component) {
        return null
      }
      const node = component.getNode();
      if (!node) {
        return null
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
            props.lists.find(list => list.listId === dragListId).cardList
            .filter(card => card.id === props.draggableCard.id).length
          ) {
          if (dragCardIndex === hoverCardIndex) {
            return
          }
          if (dragCardIndex < hoverCardIndex && hoverClientY < hoverMiddleY) {
            return
          }
          if (dragCardIndex > hoverCardIndex && hoverClientY > hoverMiddleY) {
            return
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
          !props.lists.find(list => list.listId === hoverListId).cardList
            .filter(card => card.id === props.draggableCard.id).length
        ) {
          props.changeListForCard(dragListId, hoverListId, hoverCardIndex);
          props.setDraggableCard({
            ...props.draggableCard,
            index: hoverCardIndex|0,
            listId: hoverListId
          });
          monitor.getItem().listId = hoverListId;
          return
        } else {
          if (dragCardIndex === hoverCardIndex) {
            return
          }
          if (dragCardIndex < hoverCardIndex && hoverClientY < hoverMiddleY) {
            return
          }
          if (dragCardIndex > hoverCardIndex && hoverClientY > hoverMiddleY) {
            return
          }
          props.moveCard(dragCardIndex, hoverCardIndex);
        }
      }
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(
  DragSource(
    ItemTypes.CARD,
    {
      beginDrag:  (props) => {
          props.setDraggableCard({
            id: props.id,
            value: props.value,
            listId: props.listId,
            index: props.index
          });
          return ({
            ...props
          })
      },
      endDrag: (props) => {
        props.setDraggableCard({})
      },
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    }),
  )(Card)
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardWithDnD)
