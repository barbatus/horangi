import * as React from 'react';

import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ISort, Issue } from 'app/store';

import IssueItem from './IssueItem';
import * as style from './style.scss';

interface IssueListProps {
  className?: string;
  items: Issue[];
  onItemClick: (item: Issue) => void;
}

function renderSort(sort: ISort, field: string, onClick?: () => void) {
  if (sort.field !== field) { return null; }

  const icon = sort.order > 0 ? faCaretDown : faCaretUp;
  return (<FontAwesomeIcon className={style.sortCaret} icon={icon} />);
}

export default React.memo<IssueListProps>(({ className, items, onItemClick }) => {
  const children = items.map((item) => {
    return (
      <IssueItem key={item.issueId} item={item} onClick={onItemClick} />
    );
  });
  const sort = { field: 'name', order: 1 };
  return (
    <div className={className}>
      <header className={style.header}>
        <h4 className={style.itemName}>
          Name
          {renderSort(sort, 'name')}
        </h4>
        <h4 className={style.itemType}>
          Type
          {renderSort(sort, 'type')}
        </h4>
        <h4 className={style.itemDesc}>
          Description
        </h4>
      </header>
      {children}
    </div>
  );
});
