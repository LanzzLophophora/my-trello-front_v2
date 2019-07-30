import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Spin } from 'antd';

class Loading extends Component {
  render() {
    const { auth } = this.props;
    if (auth.isLoading) {
      return (
        <div className="spin-wrapper">
          <Spin className="absolute-center" />
        </div>
      );
    }
    return (
      <div className={`loadingBar-wrapper`}>
        <div id="loader" className={`loadingBar`} />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  auth: store.auth,
  currentProject: store.currentProject,
  projects: store.projects
});

export default connect(mapStateToProps)(Loading);
