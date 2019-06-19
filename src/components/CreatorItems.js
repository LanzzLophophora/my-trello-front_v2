import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import { createNewList, addNewCardToList, createProjectRequest } from '../store/project/actions';

class CreatorItems extends Component {

  state = {
    isNew: false,
    titleValue: '',
    // listTitleValue: '',
    // cardValue: '',
  };

  handleChangeTextarea = event => {
    // const { isList } = this.props;
    this.setState({
      titleValue: event.target.value
    })

    // isList ?
    //   this.setState({
    //    listTitleValue: event.target.value
    //   }) :
    //   this.setState({
    //     cardValue: event.target.value
    //   })
  };

  handleAddNewItem = () => {
    this.setState({
      isNew: true
    })
  };

  handleCloseAdder = () => {
    this.setState({
      isNew: false
    })
  };

  handleCreateNewItem = event => {
    event.preventDefault();
    if (!this.state.titleValue.trim().length) {
      return
    }
    const { itemsType, addNewCardToList, createNewList, createProjectRequest, listId } = this.props;

    switch (itemsType) {
      case "list":
          createNewList({title: this.state.titleValue});
          this.setState({
            titleValue: '',
            isNew: false
          });
          break;

      case "card":
          addNewCardToList(this.state.titleValue, listId);
          this.setState({
            titleValue: '',
            isNew: false
          });
          break;

      case "project":
          createProjectRequest(this.props.token, this.state.titleValue);
          this.setState({
            titleValue: '',
            isNew: false
          });
          break;

      default: return itemsType
    }



  };

  // handleCreateNewItem = event => {
  //   event.preventDefault();
  //   const { isList, addNewCardToList, createNewList, listId } = this.props;
  //   if (isList) {
  //     if (!this.state.listTitleValue.trim().length) {
  //       return
  //     }
  //     createNewList({title: this.state.listTitleValue});
  //     this.setState({
  //       listTitleValue: '',
  //       isNew: false
  //     });
  //   } else {
  //     if (!this.state.cardValue.trim().length) {
  //       return;
  //     }
  //     addNewCardToList(this.state.cardValue, listId);
  //     this.setState({
  //       cardValue: '',
  //       isNew: false
  //     });
  //   }
  // };

  render() {
    const { itemsType } = this.props;
    const { isNew, titleValue } = this.state;

    return (
      <div className="adder-new-item">
        {isNew &&
        <form className="d-flex flex-column">
          <TextField
            label={itemsType === 'list' ? "заголовок для колонки" : itemsType === 'card' ? "заголовок для карточки" : "заголовок для проекта"}
            type="text"
            placeholder={`Ввести заголовок для ${itemsType === 'list' ? " этой колонки" : itemsType === 'card' ? "этой карточки" : "этого проекта"}`}
            margin="normal"
            variant="outlined"
            value={titleValue}
            onChange={this.handleChangeTextarea}
            autoFocus={true}
          />
          <div className="btn">
            <button
              variant="contained"
              onClick={this.handleCreateNewItem}
              type={"submit"}
            >
              Добавить { itemsType === 'list' ? 'колонку' : itemsType === 'card' ? 'карточку' : 'проект'}
            </button>
            <Button onClick={this.handleCloseAdder}>
              <i className="material-icons">
                clear
              </i>
            </Button>
          </div>
        </form>
        }
        {!isNew &&
        <Button
          variant="contained"
          onClick={this.handleAddNewItem}
        >
          + Добавить еще  {itemsType === 'list' ? ' одну колонку' : itemsType === 'card' ? 'одну карточку' : 'один проект'}
        </Button>
        }
      </div>
    );
  }
}

const mapStateToProps = store => ({
  token: store.auth.token
});

const mapDispatchToProps = dispatch => ({
  createNewList: list => dispatch(createNewList(list)),
  addNewCardToList: (value, listId) => dispatch(addNewCardToList(value, listId)),
  createProjectRequest: (token, projectTitle) => dispatch(createProjectRequest(token, projectTitle))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreatorItems);
