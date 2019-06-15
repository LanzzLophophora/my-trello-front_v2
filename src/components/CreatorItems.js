import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { connect } from 'react-redux';

import { createNewList, addNewCardToList } from '../store/globalField/actions';

class CreatorItems extends Component {

  state = {
    isNew: false,
    listTitleValue: '',
    cardValue: '',
  };

  handleChangeTextarea = event => {
    const { isList } = this.props;

    isList ?
      this.setState({
       listTitleValue: event.target.value
      }) :
      this.setState({
        cardValue: event.target.value
      })
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
    const { isList, addNewCardToList, createNewList, listId } = this.props;
    if (isList) {
      if (!this.state.listTitleValue.trim().length) {
        return
      }
      createNewList({title: this.state.listTitleValue});
      this.setState({
        listTitleValue: '',
        isNew: false
      });
    } else {
      if (!this.state.cardValue.trim().length) {
        return;
      }
      addNewCardToList(this.state.cardValue, listId);
      this.setState({
        cardValue: '',
        isNew: false
      });
    }
  };

  render() {
    const { isList } = this.props;
    const { isNew, cardValue, listTitleValue } = this.state;

    return (
      <div className="adder-new-item">
        {isNew &&
        <form className="d-flex flex-column">
          <TextField
            label={isList ? "заголовок для колонки" : "заголовок для карточки"}
            type="text"
            placeholder={`Ввести заголовок для этой ${isList ? "колонки" : "карточки"}`}
            margin="normal"
            variant="outlined"
            value={isList ? listTitleValue : cardValue}
            onChange={this.handleChangeTextarea}
            autoFocus={true}
          />
          <div className="btn">
            <button
              variant="contained"
              onClick={this.handleCreateNewItem}
              type={"submit"}
            >
              Добавить { isList ? 'колонку' : 'карточку'}
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
          + Добавить еще одну { isList ? 'колонку' : 'карточку'}
        </Button>
        }
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createNewList: list => dispatch(createNewList(list)),
  addNewCardToList: (value, listId) => dispatch(addNewCardToList(value, listId))
});

export default connect(
  null,
  mapDispatchToProps
)(CreatorItems);
