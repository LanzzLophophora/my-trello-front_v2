import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import { DragSource, DropTarget } from 'react-dnd';
import Card from '../components/Card';
import ItemTypes from '../components/ItemTypes';
import CreatorItems from '../components/CreatorItems';
import {
  updateProjectRequest,
  deleteListRequest,
  updateListRequest,
  changeListTitle,
  updateCardList,
  changeListForCard,
  setDraggableCard,
  changeListPosition,
  setDraggableListId
} from '../store/currentProject/actions';

class List extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }

  handleDeleteList = () => {
    const { deleteListRequest, token, projectId, listId } = this.props;
    deleteListRequest(token, projectId, listId);
  };

  handleChangeTitle = event => {
    this.props.changeListTitle(this.props.listId, event.target.value);
  };

  handleHoverMoveCard = (dragCardIndex, hoverCardIndex) => {
    const { lists, index, listId, draggableCard, updateCardList, setDraggableCard } = this.props;
    const { cardList } = lists[index];
    const dragCard = draggableCard;
    delete dragCard.index;
    cardList.splice(dragCardIndex, 1);
    cardList.splice(hoverCardIndex, 0, dragCard);
    updateCardList(listId, cardList);
    setDraggableCard({
      ...draggableCard,
      index: hoverCardIndex
    });
  };

  render() {
    const {
      index,
      draggableListId,
      listId,
      lists,
      connectDragSource,
      connectDropTarget
    } = this.props;
    const { cardList, listTitle } = lists[index];
    const opacity = listId === draggableListId ? 0.5 : 1;

    return connectDropTarget(
      connectDragSource(
        <div className="list-item-wrapper" style={Object.assign({}, { opacity })} ref={this.myRef}>
          <div className={'list-item'}>
            <div className="list-title">
              <Input
                placeholder="Placeholder"
                inputProps={{
                  'aria-label': 'Description'
                }}
                onChange={this.handleChangeTitle}
                value={listTitle || ''}
              />
              <Button href="" onClick={this.handleDeleteList}>
                <i className="material-icons">delete</i>
              </Button>
            </div>
            <div className="card-list">
              {cardList &&
                cardList.map((card, i) => {
                  return (
                    <Card
                      key={card._id}
                      index={i}
                      moveCard={this.handleHoverMoveCard}
                      projectId={this.props.projectId}
                      {...card}
                    />
                  );
                })}
            </div>
            <CreatorItems
              listId={this.props.listId}
              projectId={this.props.projectId}
              itemsType={'card'}
            />
          </div>
        </div>
      )
    );
  }
}

const ListWithDnD = DropTarget(
  [ItemTypes.LIST, ItemTypes.CARD],
  {
    hover(props, monitor, component) {
      const targetType = monitor.getItemType();
      const dragListId = monitor.getItem().listId;
      const hoverListId = props.listId;
      const dragListIndex = monitor.getItem().index;
      const hoverListIndex = props.index;

      if (targetType === ItemTypes.CARD) {
        if (
          props.lists
            .find(list => list._id === hoverListId)
            .cardList.filter(card => card._id === props.draggableCard._id).length
        ) {
          return;
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
            const newIndex = props.lists.find(list => list._id === hoverListId).cardList.length;
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
    }
  },
  connect => ({
    connectDropTarget: connect.dropTarget()
  })
)(
  DragSource(
    ItemTypes.LIST,
    {
      beginDrag: props => {
        props.setDraggableListId(props.listId);
        return {
          ...props
        };
      },
      endDrag: props => {
        props.setDraggableListId('');
        const lists = props.lists.map(list => list._id);
        props.updateProjectRequest(props.token, props.projectId, lists);
      }
    },
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  )(List)
);

const mapStateToProps = store => ({
  token: store.auth.user.token,
  lists: store.currentProject.lists,
  draggableCard: store.currentProject.draggableCard,
  draggableListId: store.currentProject.draggableListId
});

const mapDispatchToProps = dispatch => ({
  updateProjectRequest: (token, projectId, newData) =>
    dispatch(updateProjectRequest(token, projectId, newData)),
  updateListRequest: (token, projectId, listId, data) =>
    dispatch(updateListRequest(token, projectId, listId, data)),
  deleteListRequest: (token, projectId, listId) =>
    dispatch(deleteListRequest(token, projectId, listId)),
  changeListTitle: (listId, title) => dispatch(changeListTitle(listId, title)),
  updateCardList: (listId, cardList) => dispatch(updateCardList(listId, cardList)),
  changeListForCard: (dragListId, hoverListId, hoverCardIndex) =>
    dispatch(changeListForCard(dragListId, hoverListId, hoverCardIndex)),
  setDraggableCard: card => dispatch(setDraggableCard(card)),
  changeListPosition: (dragListIndex, hoverListIndex) =>
    dispatch(changeListPosition(dragListIndex, hoverListIndex)),
  setDraggableListId: listId => dispatch(setDraggableListId(listId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListWithDnD);
