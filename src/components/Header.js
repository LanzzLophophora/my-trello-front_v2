import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
// import { logOutUser } from '../store/auth/thunks';
import { Button } from 'antd';


class Header extends Component {
  handleLogout = () => {
    // this.props.logOutUser();
  };

  render() {
    const { user } = this.props;
    return (
      <div className="header">
        this is header
        {!_.isEmpty(user) &&
          <div className="header-content">
            <h3>Hello, {user.login}!</h3>
            <Button onClick={this.handleLogout}>Logout</Button>
          </div>
        }
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  // logOutUser: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  user: store.auth.user
});

const mapDispatchToProps = {
  // logOutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
