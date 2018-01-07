import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'
import { routerMiddleware, ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createHashHistory'
//import createHistory from 'history/createBrowserHistory'
import Main from './containers/main';
import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'font-awesome-webpack'
import reducers from './reducers';

export const history = createHistory();

const middleware = [
  thunkMiddleware,
  routerMiddleware(history),
  logger
]

const store = createStore(reducers, {}, applyMiddleware(...middleware));

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <div>
        <Main />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('react')
);
