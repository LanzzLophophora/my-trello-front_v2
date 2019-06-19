import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logOutUser } from '../store/auth/thunks';
import { Button } from 'antd';


class Header extends Component {
  handleLogout = () => {
    this.props.logOutUser();
  };

  render() {
    return (
      <div className="header">
        {
          this.props.user &&
          <div className="header-content">
            <h3>Hello, {this.props.user.nickname}!</h3>
            <Button onClick={this.handleLogout}>Logout</Button>
          </div>
        }
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  logOutUser: PropTypes.func.isRequired
};

const mapStateToProps = store => ({
  user: store.auth.user
});

const mapDispatchToProps = {
  logOutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
