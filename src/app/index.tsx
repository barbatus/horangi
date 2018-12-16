import * as React from 'react';

import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './containers/Home';
import Issue from './containers/Issue';

import * as style from './style.css';

export const App = hot(() => (
  <Router>
    <Route
      render={({ location }) => (
        <main className={style.content}>
          <Home />
          <Switch location={location}>
            <Route path="/issue/:issueId" component={Issue} />
            <Route path="/new" render={(props) => <Issue {...props} isNew={true} />} />
          </Switch>
        </main>
      )}
    />
  </Router>
));
