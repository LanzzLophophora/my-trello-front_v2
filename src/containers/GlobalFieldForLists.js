import React, { Component } from 'react';

import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import List from './List';
import CreatorItems from '../components/CreatorItems';
import update from 'immutability-helper';
import axios from 'axios';

class GlobalFieldForLists extends Component {
  state = {
    lists: []
  };

  handleHoverMoveList = (dragListIndex, hoverListIndex) => {
    const { lists } = this.props;
    const dragList = lists[dragListIndex];
      const newArr = update(lists, {
        $splice: [[dragListIndex, 1], [hoverListIndex, 0, dragList]],
      });
      this.setState({
        lists: newArr
      })
  };
  componentDidMount() {
    this.setState({
      lists: this.props.lists
    });
    axios.get('localhost:5000/api/')
      .then(res => {
        console.log("res", res);
        // console.log("data.data", data.data);
        // console.log("data.send", data.send);

      })
  }

  // componentDidUpdate(prevProps){
  //   //   if(prevProps.listsData !== this.props.listsData){
  //   //     this.addListButtonRef.current.scrollIntoView();
  //   //   }
  //   // }
  render() {
    const newListForRender = this.props.lists && this.props.lists;
    return (
      <div className="board-wrapper">
        <div id="board" className="board">
          {newListForRender.map((list, i) => {
            return (
              <List
                key={list.listId}
                listId={list.listId}
                index={i}
                moveList={this.handleHoverMoveList}
              />
            )
          })}
          <CreatorItems
            isList={true}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  lists: store.globalField.lists,
});

export default DragDropContext(HTML5Backend)(connect(
  mapStateToProps,
  null
)(GlobalFieldForLists));
