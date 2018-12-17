import * as React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { GET_ISSUES, Issue } from 'app/store';

import IssueList from '../../components/IssueList';
import IssueChart from '../IssueChart';
import * as style from './style.css';

class IssuesQuery extends Query<{ issues: Issue[] }, {}> {}

interface IHomeProps {
  history: any;
  issues: Issue[];
}

const Home = React.memo<IHomeProps>(({ issues, history }) => {
  const onItemClick = (item: Issue) => history.push(`/issue/${item.id}`);
  return (
    <div>
      <IssueChart />
      <div className={style.toolBar}>
        <button onClick={() => history.push('/new')}>Add New</button>
      </div>
      <IssueList items={issues} onItemClick={onItemClick} />
    </div>
  );
});

export default withRouter(({ history }) => {
    return (
      <IssuesQuery query={GET_ISSUES}>
        {({ data: { issues } }) => <Home history={history} issues={issues} />}
      </IssuesQuery>
    );
  },
);
