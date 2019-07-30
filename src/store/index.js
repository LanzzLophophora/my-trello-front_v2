import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './reducers';
import rootSaga from './sagas';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

function configureStore() {
  const store = createStore(
    createRootReducer(history),
    compose(
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
      reduxDevTools
    )
  );
  sagaMiddleware.run(rootSaga);
  return store;
}

export default configureStore;
