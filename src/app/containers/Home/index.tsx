import * as React from 'react';
import { withRouter } from 'react-router-dom';

import { Issue } from 'app/store';

import IssueList from '../../components/IssueList';

const issues = [
  { issueId: 'issueId1', name: 'issue name1', type: 'bug', description: 'desc1' },
  { issueId: 'issueId2', name: 'issue name2', type: 'feat', description: 'desc2' },
  { issueId: 'issueId3', name: 'issue name3', type: 'story', description: 'desc3' },
];

export default withRouter(
  React.memo<any>(({ history }) => {
    const onItemClick = (item: Issue) => history.push(`/issue/${item.issueId}`);
    return (
      <div>
        <IssueList items={issues} onItemClick={onItemClick} />
      </div>
    );
  }),
);
