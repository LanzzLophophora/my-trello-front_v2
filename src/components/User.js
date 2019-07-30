import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { Button } from 'antd';
import { logOutRequest } from '../store/auth/actions';

class User extends Component {
  handleLogout = () => {
    this.props.logOutRequest();
  };

  render() {
    const { user, error } = this.props;
    return (
      <div className="user-page d-flex flex-column justify-content-around">
        {!_.isEmpty(user) && (
          <div className="header-content d-flex justify-content-around pt-5 pb-5">
            <h3>Hello, {user.login}!</h3>
            <Button onClick={this.handleLogout}>Logout</Button>
          </div>
        )}
        <div className="align-self-center mt-10">
          <Link to={`user/projects`}>
            <button className="btn">Go to Projects!</button>
          </Link>
        </div>
        {error && <h3>{error.message}</h3>}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user,
  error: store.auth.error,
  isLoading: store.auth.isLoading
});

const mapDispatchToProps = dispatch => ({
  logOutRequest: () => dispatch(logOutRequest())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
