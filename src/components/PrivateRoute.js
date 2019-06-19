import React from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';

const PrivateRoute = ({ user, ...props }) => {
 if (_.isEmpty(user.token)) {
   return <Redirect to="/signin"/>
 } else {
   return <Route {...props} />;
 }
};

const mapStateToProps = store => ({
  user: store.auth.user
});

export default connect(
  mapStateToProps,
  null
)(PrivateRoute);
