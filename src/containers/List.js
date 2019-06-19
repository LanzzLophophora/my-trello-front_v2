import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import ItemTypes from '../components/ItemTypes';
import { DragSource, DropTarget } from 'react-dnd';

import Card from '../components/Card';
import CreatorItems from '../components/CreatorItems';

import {
  deleteList,
  changeListTitle,
  updateCardList,
  changeListForCard,
  setDraggableCard,
  changeListPosition,
  setDraggableListId
} from '../store/project/actions';

class List extends Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  handleDeleteList = () => {
    const { deleteList, listId } = this.props;
    deleteList(listId);
  };

  handleChangeTitle = event => {
    this.props.changeListTitle( this.props.listId, event.target.value)
  };

  handleHoverMoveCard = (dragCardIndex, hoverCardIndex) => {
    const { lists, index, listId, draggableCard, updateCardList, setDraggableCard } = this.props;
    const { cardList } = lists[index];
    const dragCard = draggableCard;
    delete dragCard.index;
    cardList.splice(dragCardIndex,1);
    cardList.splice(hoverCardIndex,0,dragCard);
    updateCardList(listId, cardList);
    setDraggableCard({
      ...draggableCard,
      index: hoverCardIndex
    })
  };

  render() {
    const { index, draggableListId, listId, lists, connectDragSource, connectDropTarget, } = this.props;
    const { cardList, title} = lists[index];
    const opacity = listId === draggableListId ? 0.5 : 1;

    return connectDropTarget(connectDragSource(
      <div
        className="list-item-wrapper"
        style={Object.assign({}, { opacity })}
        ref={this.myRef}
      >
        <div
          className={"list-item"}
        >
          <div className="list-title">
            <Input
              placeholder="Placeholder"
              inputProps={{
                'aria-label': 'Description',
              }}
              onChange={this.handleChangeTitle}
              value={title || ""}
            />
            <Button href="" onClick={this.handleDeleteList}>
              <i className="material-icons">
                delete
              </i>
            </Button>
          </div>
          <div className="card-list">
            {cardList && cardList.map((card, i) => {
              return (
                <Card
                  key={card.id}
                  index={i}
                  moveCard={this.handleHoverMoveCard}
                  {...card}
                />)
            })}
          </div>
          <CreatorItems
            listId={this.props.listId}
            isList={false}
            listIndex={this.props.index}
          />
        </div>
      </div>
    ));
  }
}

const ListWithDnD = DropTarget(
  [ItemTypes.LIST, ItemTypes.CARD],
  {
    hover(props, monitor, component) {
      const targetType = monitor.getItemType();

      const dragListId = monitor.getItem().listId;
      const hoverListId = component.props.listId;
      const dragListIndex = monitor.getItem().index;
      const hoverListIndex = props.index;

      if (targetType === ItemTypes.CARD) {
        if(props.lists.find(list => list.listId === hoverListId).cardList
          .filter(card => card.id === props.draggableCard.id).length) {
          return
        } else {
          const hoverBoundingRect = component.myRef.current.getBoundingClientRect();
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
          const clientOffset = monitor.getClientOffset();
          const hoverClientY = clientOffset.y - hoverBoundingRect.top;

          if (hoverMiddleY > hoverClientY) {
            props.changeListForCard(dragListId, hoverListId, 0);
            props.setDraggableCard({
              ...props.draggableCard,
              index: 0,
              listId: hoverListId
            });
            monitor.getItem().index = 0;
            monitor.getItem().listId = hoverListId;
          } else {
            const newIndex = props.lists.find(list => list.listId === hoverListId).cardList.length;
            props.changeListForCard(dragListId, hoverListId, newIndex);
            props.setDraggableCard({
              ...props.draggableCard,
              index: newIndex,
              listId: hoverListId
            });
            monitor.getItem().index = newIndex;
            monitor.getItem().listId = hoverListId;
          }
        }
      }
      if (targetType === ItemTypes.LIST) {
        if (dragListId !== hoverListId) {
          props.changeListPosition(dragListIndex, hoverListIndex);
          monitor.getItem().index = hoverListIndex;
        }
      }
    },
  },
  connect => ({
    connectDropTarget: connect.dropTarget(),
  }),
)(DragSource(
  ItemTypes.LIST,
  {
    beginDrag: props => {
      props.setDraggableListId(props.listId);
      return {
        ...props
      }
    },
    endDrag: props => {
      props.setDraggableListId('');
    }
  },
  (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  }),
  )(List)
);

const mapStateToProps = store => ({
  lists: store.globalField.lists,
  draggableCard: store.globalField.draggableCard,
  draggableListId: store.globalField.draggableListId,
});

const mapDispatchToProps = dispatch => ({
  deleteList: listId => dispatch(deleteList(listId)),
  changeListTitle: (listId, title) => dispatch(changeListTitle(listId, title)),
  updateCardList: (listId, cardList) => dispatch(updateCardList(listId, cardList)),
  changeListForCard: (dragListId, hoverListId, hoverCardIndex) => dispatch(changeListForCard(dragListId, hoverListId, hoverCardIndex)),
  setDraggableCard: card => dispatch(setDraggableCard(card)),
  changeListPosition: (dragListIndex,hoverListIndex) => dispatch(changeListPosition(dragListIndex,hoverListIndex)),
  setDraggableListId: listId => dispatch(setDraggableListId(listId)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListWithDnD);
