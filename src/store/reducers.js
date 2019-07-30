import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { auth } from './auth';
import { projects } from './projects';
import { currentProject } from './currentProject';

export default history =>
  combineReducers({
    router: connectRouter(history),
    auth,
    projects,
    currentProject
  });
