import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core/index';
import _ from 'lodash';
import { getAllProjectsRequest } from '../store/projects/actions';
import { deleteProjectRequest } from '../store/currentProject/actions';
import CreatorItems from '../components/CreatorItems';

class ProjectsList extends Component {
  componentDidMount() {
    this.props.getAllProjectsRequest(this.props.user.token);
  }

  handleDeleteProject = projectId => () => {
    this.props.deleteProjectRequest(this.props.user.token, projectId);
  };

  render() {
    const { projects, error } = this.props;

    return (
      <div className="project-wrapper">
        <div className="header-content pt-5 pb-5">
          <h3>You are in da house!</h3>
        </div>
        {!_.isEmpty(projects) && <p>Your projects:</p>}
        {_.isEmpty(projects) && <p>You haven't create any projects yet!</p>}
        <div className="project-list w-75 m-auto pb-4">
          <CreatorItems className="d-inline-flex mb-2" itemsType={'projects'} />
          {projects.map(project => {
            return (
              <div
                className="project-card d-flex justify-content-between pl-2 pt-2 pb-2 mb-2"
                key={project._id}
              >
                <Link className="w-100 text-left" to={`projects/${project._id}`}>
                  <h2 className="m-0">{project.projectTitle}</h2>
                </Link>
                <Button
                  className="col-1 mr-1"
                  href=""
                  onClick={this.handleDeleteProject(project._id)}
                >
                  <i className="material-icons">delete</i>
                </Button>
              </div>
            );
          })}
        </div>
        {error && <h3 className="form-error">{error}</h3>}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  projects: store.projects.projects,
  error: store.projects.error,
  isLoading: store.projects.isLoading,
  user: store.auth.user
});

const mapDispatchToProps = dispatch => ({
  getAllProjectsRequest: token => dispatch(getAllProjectsRequest(token)),
  deleteProjectRequest: (token, projectId) => dispatch(deleteProjectRequest(token, projectId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsList);
