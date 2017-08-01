import React from 'react';
import { Router, browserHistory } from 'react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import { apiMiddleware } from 'redux-api-middleware';

import routes from './routes';
import { default as mainReducer } from './mainReducer';

/* middleware should be install to have possibility to use action creators
that correspond with the history methods of the same name */
const middleware = [
  routerMiddleware(browserHistory),
  thunk,
  apiMiddleware,
];

const store = createStore(mainReducer, compose(
  applyMiddleware(...middleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));
const history = syncHistoryWithStore(browserHistory, store);

// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182

const App = () => (
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>
);

export default App;
