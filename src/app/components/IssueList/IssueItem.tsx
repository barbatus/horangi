import * as React from 'react';

import * as classNames from 'classnames';

import { Issue } from 'app/store';

import * as style from './style.scss';

interface IssueItemProps {
  className?: string;
  item: Issue;
  onClick: (issue: Issue) => void;
}

export default React.memo<IssueItemProps>(({ className, item, onClick }) => {
  return (
    <div
      onClick={() => onClick(item)}
      className={classNames(style.itemWrapper, className)}
    >
      <div className={style.itemName}>
        {item.name}
      </div>
      <div className={style.itemType}>
        {item.type}
      </div>
      <div className={style.itemDesc}>
        {item.description}
      </div>
    </div>
  );
});
