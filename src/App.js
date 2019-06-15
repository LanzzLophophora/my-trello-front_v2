// import React from 'react';
//
// import './App.css';
// import GlobalFieldForLists from './containers/GlobalFieldForLists';
//
// function App() {
//   return (
//     <div className="App">
//       <GlobalFieldForLists/>
//     </div>
//   );
// }
//
// export default App;

import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// import { Spin } from 'antd';
import { api, config } from './db/api';

// import { subscribeAuthentication } from '../store/auth/thunks';

// import SigninForm from './components/SigninForm';
// import SignupForm from './components/SignupForm';
// import Header from './Header';

// import PrivateRoute from "./PrivateRoute";
// import NotesList from '../containers/NotesList';
// import Trash from '../containers/Trash';
// import OneNoteItem from '../containers/NoteView';

import './App.css';
// import GlobalFieldForLists from './containers/GlobalFieldForLists';

class App extends React.PureComponent {

  state = {
    response: ''
  };

  sendRequest() {
    const getRequest = api.get(config);
    return getRequest('/posts');
  };

  componentDidMount() {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "http://localhost:5000/api"; // site that doesn’t send Access-Control-*
    fetch(url) // https://cors-anywhere.herokuapp.com/https://example.com
      .then(response => response.text())
      .then(contents => console.log(contents))
      .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))

    //
    // this.sendRequest()
    //   .then(response => {
    //     this.setState({
    //       response
    //       }
    //     );
    //     console.log('response', JSON.stringify(response));
    //   })
    //   .catch(error => this.setState({
    //     error
    //   }));
  }

  render() {
    const { isLoading, user } = this.props.auth;

    if (isLoading) {
      return (
        <div className="spin-wrapper">
          {/*<Spin className="absolute-center"/>*/}
        </div>
      )
    }

    return (
      <div className="app">
        {/*{user && <Header/>}*/}
        <Switch>
          {/*<Route exact path="/signup" component={SignupForm}/>*/}
          {/*<Route exact path="/signin" component={SigninForm}/>*/}
          <Route exact path="/" component="#"/>

          {/*<PrivateRoute exact path="/" component={HomePage}/>*/}
          {/*<PrivateRoute exact path="/Projects" component={ProjectsList}/>*/}
          {/*<PrivateRoute exact path="/project/:id" component={Project}/>*/}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  auth: store.auth,
});

const mapDispatchToProps = {
  // subscribeAuthentication,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
