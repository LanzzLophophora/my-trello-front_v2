import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Button, Spin } from 'antd';
import { Link } from 'react-router-dom';

class User extends Component {

  render() {
    const { user, error, isLoading } = this.props;
    if (isLoading) {
      return (
        <div className="spin-wrapper">
          <Spin className="absolute-center"/>
        </div>
      )
    }

    return (
      <div className="user-page">
        this is User-page
        {!_.isEmpty(user) &&
        <div className="header-content">
          <h3>Hello, {user.login}!</h3>
          <Button onClick={this.handleLogout}>Logout</Button>
        </div>
        }


        <Link to='#/projects'/>
        <Button>Go to Projects!</Button>

        {error && <h3>{error.message}</h3>}
      </div>
    );
  }
}

const mapStateToProps = store => ({
  user: store.auth.user,
  error: store.auth.error,
  isLoading: store.auth.isLoading,
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(User);
