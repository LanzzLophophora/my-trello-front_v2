import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { auth } from './auth';
import { globalField } from './globalField';

export default history => combineReducers({
  router: connectRouter(history),
  auth,
  globalField
});