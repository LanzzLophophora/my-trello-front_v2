import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { deleteList, getAllProjectsRequest } from '../store/project/actions';
// import _ from 'lodash';
import { Switch } from 'react-router-dom';
// import { Switch, Route, Link } from 'react-router-dom';
// import CreatorItems from './CreatorItems';
import PrivateRoute from "./PrivateRoute";
import User from './User';
import ProjectsList from './ProjectsList';
import GlobalFieldForLists from '../containers/GlobalFieldForLists';


class Home extends Component {
  // state = {
  //   projects: [],
  //   token: ''
  // };

  // callback = projects => {
  //   console.log(111);
  //   this.setState({
  //     projects
  //   });
  //   console.log(222);
  // };

  // componentDidMount() {
  //
  //   console.log("token in Home", this.props.token);
  //   // const callback = (projects) => {
  //   //   console.log(111);
  //   //   this.setState({
  //   //     projects
  //   //   })
  //   // };
  //   this.props.getAllProjectsRequest(this.props.token, this.callback);
  //
  // }

  render() {
    // const { projects, isLoading } = this.props;
    // console.log("projects in Home", projects);
    //
    // if (isLoading) {
    //   return (<p>Loading...</p>)
    // }
    return (
      <div className="home-page">
        You are in da house!
        <Switch>
          <PrivateRoute exact path="/:user_id" component={User}/>
          <PrivateRoute exact path="/:user_id/projects" component={ProjectsList}/>
          <PrivateRoute exact path="/:user_id/projects/:id" component={GlobalFieldForLists}/>
        </Switch>
      </div>
    );
  }
}
//
// const mapStateToProps = store => ({
//   // projects: store.globalField.projects,
//   // error: store.globalField.error,
//   // token: store.auth.token,
//   // isLoading: store.globalField.isLoading
// });
//
// const mapDispatchToProps = dispatch => ({
//   // getAllProjectsRequest: (token, callback) => dispatch(getAllProjectsRequest(token, callback)),
// });

export default Home;
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(Home);
