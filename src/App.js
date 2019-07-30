import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { loadProgressBar } from 'axios-progress-bar';

import TokenStorage from './store/api/token';
import { signinRequest } from './store/auth/actions';
import { apiService } from './store/api';

import SigninForm from './components/SigninForm';
import SignupForm from './components/SignupForm';
import Loading from 'components/Loading';
import PrivateRoute from './components/PrivateRoute';
import User from './components/User';
import ProjectsList from './containers/ProjectsList';
import ProjectPage from './containers/ProjectPage';

import 'antd/dist/antd.css';
import 'assets/css/main.css';

class App extends React.PureComponent {
  createLoadProgressBar = () => {
    const configNprogress = {
      showSpinner: false,
      parent: '#loader',
      easing: 'ease',
      speed: 500,
      minimum: 0.1
    };

    loadProgressBar(configNprogress, apiService);
  };

  componentWillMount() {
    this.createLoadProgressBar();
    this.props.signinRequest();
  }

  componentWillUnmount() {
    TokenStorage.removeItemInSessionStorage();
  }

  render() {
    return (
      <div className="content-wrapper">
        <Loading place="auth" />
        <Switch>
          <Route exact path="/signup" component={SignupForm} />
          <Route exact path="/signin" component={SigninForm} />

          <PrivateRoute exact path="/user" component={User} />
          <PrivateRoute exact path="/user/projects" component={ProjectsList} />
          <PrivateRoute exact path="/user/projects/:id" component={ProjectPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  auth: store.auth
});

const mapDispatchToProps = {
  signinRequest
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
