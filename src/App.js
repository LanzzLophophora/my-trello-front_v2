import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import _ from 'lodash';
import { Spin } from 'antd';
import TokenStorage from './store/api/token';
import { getUserSuccess, getUserRequest, signinRequest } from './store/auth/actions';
// import { subscribeAuthentication } from './store/auth/sagas';

import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
// import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
// import Home from './components/Home';
import User from './components/User';

import './App.css';
import ProjectsList from './components/ProjectsList';
import GlobalFieldForLists from './containers/GlobalFieldForLists';

class App extends React.PureComponent {

  componentWillMount() {
    // if (!TokenStorage.getItemFromSessionStorage() && !TokenStorage.getItemFromLocalStorage()) {
    //   const { user } = this.props.auth;
    //   console.log("user in cdm App =>", user);
    //   if (_.isEmpty(user.token)) {
    this.props.signinRequest()
  }

  componentWillUnmount() {
    TokenStorage.removeItemInSessionStorage()
  }

  render() {
    const { isLoading } = this.props.auth;

    if (isLoading) {
      return (
        <div className="spin-wrapper">
          <Spin className="absolute-center"/>
        </div>
      )
    }

    return (
      <div className="app">
        <Switch>
          <Route exact path="/signup" component={SignupForm}/>
          <Route exact path="/signin" component={SigninForm}/>

          <PrivateRoute path="/:user_id" component={User}/>
          <PrivateRoute path="/:user_id/projects" component={ProjectsList}/>
          <PrivateRoute path="/:user_id/projects/:id" component={GlobalFieldForLists}/>

        </Switch>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  auth: store.auth,
});

const mapDispatchToProps = {
  // getUserRequest: () => dispatch(getUserRequest),
  // getUserSuccess: user => dispatch(getUserSuccess(user)),
  // subscribeAuthentication
  signinRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
