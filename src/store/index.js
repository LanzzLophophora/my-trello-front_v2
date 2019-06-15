// import { createStore } from 'redux';
// import { rootReducer } from './reducers';
//
// const configureStore = () => createStore(
//     rootReducer,
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );
//
// export default configureStore;



import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import saga from 'redux-saga';

export const history = createBrowserHistory();

const configureStore = () => createStore(
  createRootReducer(history),
  compose(
    applyMiddleware(
      saga,
      routerMiddleware(history),
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default configureStore;
