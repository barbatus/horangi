import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  form: formReducer,
});

import { App } from 'app';

ReactDOM.render(
  <Provider store={createStore(rootReducer)}>
    <App />
  </Provider>,
  document.getElementById('app'),
);
