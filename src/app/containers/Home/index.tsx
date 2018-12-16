import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { Issue, ISSUES } from 'app/store';

import IssueList from '../../components/IssueList';
import IssueChart from '../IssueChart';
import * as style from './style.css';

export default withRouter(
  React.memo<any>(({ history }) => {
    const onItemClick = (item: Issue) => history.push(`/issue/${item.issueId}`);
    return (
      <div>
        <IssueChart />
        <div className={style.toolBar}>
          <button onClick={() => history.push('/new')}>Add New</button>
        </div>
        <IssueList items={ISSUES} onItemClick={onItemClick} />
      </div>
    );
  }),
);
