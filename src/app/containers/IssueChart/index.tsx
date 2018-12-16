import * as React from 'react';

import { ISSUE_TYPE_OPTIONS, ISSUES } from 'app/store';

import PieChart from '../../components/PieChart';

export default React.memo(() => {
  const groups = ISSUES.reduce((accum, issue) => {
    const count = accum[issue.type] || 0;
    accum[issue.type] = count + 1;
    return accum;
  }, {});

  const len = ISSUES.length;
  const slices = Object.keys(groups).map((type) => {
      const count = groups[type];
      const typeOption = ISSUE_TYPE_OPTIONS.find((option) => option.value === type);
      return { percent: count / len, color: typeOption.color, text: typeOption.name };
    }).sort((slice1, slice2) => slice1.color.localeCompare(slice2.color));
  return (
    <div>
      <PieChart slices={slices} />
    </div>
  );
});
