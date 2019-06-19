import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

const PrivateRoute = ({ user, ...props }) => {
  if (!user) {
    return <Redirect to="/login"/>
  }
  return <Route {...props} />;
};

const mapStateToProps = store => ({
  user: store.auth.user
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
