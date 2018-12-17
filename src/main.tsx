import * as React from 'react';
import { ApolloProvider } from 'react-apollo';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { apolloClient } from './app/store';

const rootReducer = combineReducers({
  form: formReducer,
});

import { App } from 'app';

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Provider store={createStore(rootReducer)}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('app'),
);
