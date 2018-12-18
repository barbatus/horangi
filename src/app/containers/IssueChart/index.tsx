import * as React from 'react';
import { Query } from 'react-apollo';

import { GET_ISSUES, Issue, ISSUE_TYPE_OPTIONS } from 'app/store';

import PieChart from '../../components/PieChart';
import * as style from './style.scss';

class IssuesQuery extends Query<{ issues: Issue[] }, {}> {}

const IssueChart = React.memo<{ issues: Issue[] }>(({ issues }) => {
  const groups = issues.reduce((accum, issue) => {
    const count = accum[issue.type] || 0;
    accum[issue.type] = count + 1;
    return accum;
  }, {});

  const len = issues.length;
  const slices = Object.keys(groups).map((type) => {
      const count = groups[type];
      const typeOption = ISSUE_TYPE_OPTIONS.find((option) => option.value === type);
      return { percent: count / len, color: typeOption.color, text: typeOption.name };
    }).sort((slice1, slice2) => slice1.color.localeCompare(slice2.color));

  if (slices.length) {
    return <PieChart slices={slices} />;
  }

  return <div className={style.noIssues}>No Issues</div>;
});

export default () => (
  <IssuesQuery query={GET_ISSUES}>
    {({ data: { issues } }) => <IssueChart issues={issues.filter((issue) => issue.status === 'OPEN')} />}
  </IssuesQuery>
);
