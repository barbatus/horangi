import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Router, Route, Switch } from 'react-router';

import Home from './containers/Home';
import Issue from './containers/Issue';

import * as style from './style.css';

export const App = hot(({ history }) => (
  <div>
    <Router history={history}>
      <Route
        render={({ location }) => (
          <div className={style.content}>
            <Home />
            <Switch location={location}>
              <Route path='/issue' component={Issue} />
              <Route path='/new' render={(props) => <Issue {...props} new />} />
            </Switch>
          </div>
        )}
      />
    </Router>
  </div>
));
