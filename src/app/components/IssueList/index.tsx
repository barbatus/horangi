import * as React from 'react';

import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IOrderBy, Issue } from 'app/store';

import IssueItem from './IssueItem';
import * as style from './style.scss';

interface IssueListProps {
  className?: string;
  items: Issue[];
  orderBy: IOrderBy;
  onSort: (order: IOrderBy) => void;
  onItemClick: (item: Issue) => void;
}

function renderSort(orderBy: IOrderBy, field: string, onClick?: () => void) {
  if (!orderBy) { return null; }

  if (orderBy.field !== field) { return null; }

  const icon = orderBy.dir > 0 ? faCaretDown : faCaretUp;
  return (<FontAwesomeIcon className={style.sortCaret} icon={icon} />);
}

export default React.memo<IssueListProps>(
  ({ className, items, orderBy, onSort, onItemClick }) => {
    const children = items.map((item) => {
      return (
        <IssueItem key={item.id} item={item} onClick={onItemClick} />
      );
    });
    const onSortClick = (field) => {
      if (!orderBy || orderBy.field !== field) {
        onSort({ field, dir: -1 });
        return;
      }
      onSort({ field, dir: -orderBy.dir });
    };
    return (
      <div className={className}>
        <header className={style.header}>
          <h4 className={style.itemName} onClick={() => onSortClick('name')}>
            Name
            {renderSort(orderBy, 'name')}
          </h4>
          <h4 className={style.itemType} onClick={() => onSortClick('type')}>
            Type
            {renderSort(orderBy, 'type')}
          </h4>
          <h4 className={style.itemDesc}>
            Description
          </h4>
        </header>
        {children}
      </div>
    );
  },
);
