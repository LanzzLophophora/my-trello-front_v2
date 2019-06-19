import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteList, getAllProjectsRequest } from '../store/project/actions';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import CreatorItems from './CreatorItems';

class ProjectsList extends Component {
  state = {
    projects: [],
    token: ''
  };

  callback = projects => {
    this.setState({
      projects
    });
  };

  componentDidMount() {
    this.props.getAllProjectsRequest(this.props.token, this.callback);
  }

  render() {
    const { projects, isLoading } = this.props;

    if (isLoading) {
      return (<p>Loading...</p>)
    }
    return (
      <div>
        You are in da house!
        {!_.isEmpty(projects) &&  <p>Your projects:</p>}
        {projects.map(project => {
            return (
              <div className="projectCard" key={project._id}>
                <Link to={`/projects/:${project._id}`}>
                  <h2>{project.projectTitle}</h2>
                </Link>
              </div>
            )
          }
        )}

        <CreatorItems
          itemsType={"project"}
        />
        {this.props.error && <h3>{this.props.error}</h3>}

      </div>
    );
  }
}

const mapStateToProps = store => ({
  projects: store.globalField.projects,
  error: store.globalField.error,
  isLoading: store.globalField.isLoading,
  token: store.auth.token,
});

const mapDispatchToProps = dispatch => ({
  getAllProjectsRequest: (token, callback) => dispatch(getAllProjectsRequest(token, callback)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProjectsList);
