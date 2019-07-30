import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { Button } from '@material-ui/core';
import List from './List';
import {
  getCurrentProjectRequest,
  deleteProjectRequest,
  getCurrentProjectSuccess
} from '../store/currentProject/actions';
import CreatorItems from '../components/CreatorItems';
import Loading from '../components/Loading';

class ProjectPage extends Component {
  componentDidMount() {
    this.props.getCurrentProjectRequest(this.props.user.token, this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.getCurrentProjectSuccess();
  }

  handleHoverMoveList = (dragListIndex, hoverListIndex) => {
    const { lists } = this.props;
    const dragList = lists[dragListIndex];
    const newArr = update(lists, {
      $splice: [[dragListIndex, 1], [hoverListIndex, 0, dragList]]
    });

    this.setState({
      lists: newArr
    });
  };

  handleDeleteProject = () => {
    this.props.deleteProjectRequest(this.props.user.token, this.props.match.params.id);
  };

  render() {
    const { currentProject } = this.props;
    const lists = currentProject.lists || [];
    return (
      <div className="board-wrapper">
        <h2 className="">{currentProject.projectTitle}</h2>
        <Loading place="currentProject" />
        <div id="board" className="board">
          {currentProject.error && <h3 className="form-error">{currentProject.error}</h3>}
          {lists.map((list, i) => {
            if (list) {
              return (
                <List
                  projectId={this.props.match.params.id}
                  key={list._id}
                  listId={list._id}
                  index={i}
                  moveList={this.handleHoverMoveList}
                />
              );
            } else {
              return null;
            }
          })}
          <CreatorItems
            className={`${lists.length ? '' : 'd-inline-flex mr-2'}`}
            projectId={this.props.match.params.id}
            itemsType={'list'}
          />
          <Button className="btn bg-danger ml-1" onClick={this.handleDeleteProject} href="">
            <i className="material-icons">delete</i>
            Delete this project
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  currentProject: store.currentProject,
  user: store.auth.user
});

const mapDispatchToProps = dispatch => ({
  getCurrentProjectRequest: (token, _id) => dispatch(getCurrentProjectRequest(token, _id)),
  deleteProjectRequest: (token, projectId) => dispatch(deleteProjectRequest(token, projectId)),
  getCurrentProjectSuccess: () => dispatch(getCurrentProjectSuccess({}))
});

export default DragDropContext(HTML5Backend)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ProjectPage)
);
