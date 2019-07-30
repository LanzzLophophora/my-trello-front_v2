import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import {
  createNewListRequest,
  updateListRequest,
  addNewCardToListRequest
} from '../store/currentProject/actions';
import { createProjectRequest } from '../store/projects/actions';

class CreatorItems extends Component {
  state = {
    isNew: false,
    titleValue: ''
  };

  cleanState = () => {
    this.setState({
      titleValue: '',
      isNew: false
    });
  };

  handleChangeTextarea = event => {
    this.setState({
      titleValue: event.target.value
    });
  };

  handleAddNewItem = () => {
    this.setState({
      isNew: true
    });
  };

  handleCloseAdder = () => {
    this.setState({
      isNew: false
    });
  };

  handleCreateNewItem = event => {
    event.preventDefault();
    if (!this.state.titleValue.trim().length) {
      return;
    }
    const {
      itemsType,
      addNewCardToListRequest,
      createNewListRequest,
      createProjectRequest,
      listId,
      user,
      projectId
    } = this.props;
    switch (itemsType) {
      case 'list':
        createNewListRequest(user.token, projectId, this.state.titleValue);
        this.cleanState();
        break;

      case 'card':
        addNewCardToListRequest(user.token, projectId, listId, this.state.titleValue);
        this.cleanState();
        break;

      case 'projects':
        createProjectRequest(this.props.user.token, this.state.titleValue);
        this.cleanState();
        break;

      default:
        return itemsType;
    }
  };

  render() {
    const { itemsType, ...rest } = this.props;
    const { isNew, titleValue } = this.state;

    return (
      <div className={`${rest.className ? rest.className : ''} adder-new-item`}>
        {isNew && (
          <form className="d-flex flex-column">
            <TextField
              label={
                itemsType === 'list'
                  ? 'заголовок для колонки'
                  : itemsType === 'card'
                  ? 'заголовок для карточки'
                  : 'заголовок для проекта'
              }
              type="text"
              placeholder={`Ввести заголовок для ${
                itemsType === 'list'
                  ? ' этой колонки'
                  : itemsType === 'card'
                  ? 'этой карточки'
                  : 'этого проекта'
              }`}
              margin="normal"
              variant="outlined"
              value={titleValue}
              onChange={this.handleChangeTextarea}
              autoFocus={true}
            />
            <div className="btn">
              <button variant="contained" onClick={this.handleCreateNewItem} type={'submit'}>
                Добавить{' '}
                {itemsType === 'list' ? 'колонку' : itemsType === 'card' ? 'карточку' : 'проект'}
              </button>
              <Button onClick={this.handleCloseAdder}>
                <i className="material-icons">clear</i>
              </Button>
            </div>
          </form>
        )}
        {!isNew && (
          <Button variant="contained" onClick={this.handleAddNewItem}>
            + Добавить еще{' '}
            {itemsType === 'list'
              ? ' одну колонку'
              : itemsType === 'card'
              ? 'одну карточку'
              : 'один проект'}
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user
});

const mapDispatchToProps = dispatch => ({
  createNewListRequest: (token, projectId, listTitle) =>
    dispatch(createNewListRequest(token, projectId, listTitle)),
  updateListRequest: (token, projectId, listId, data) =>
    dispatch(updateListRequest(token, projectId, listId, data)),
  addNewCardToListRequest: (token, projectId, listId, newCardTitle) =>
    dispatch(addNewCardToListRequest(token, projectId, listId, newCardTitle)),
  createProjectRequest: (token, projectTitle) => dispatch(createProjectRequest(token, projectTitle))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatorItems);
