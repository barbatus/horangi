import * as React from 'react';

import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import * as classNames from 'classnames';

import { Issue } from 'app/store';

import * as style from './style.scss';

interface IssueItemProps {
  className?: string;
  item: Issue;
  isSelected: boolean;
  onClick: (issue: Issue) => void;
  onDelete: (issue: Issue) => void;
}

export default React.memo<IssueItemProps>(({ item, isSelected, onClick, onDelete }) => {
  const classes = isSelected ?
    classNames(style.itemWrapper, style.itemSelected) : style.itemWrapper;
  return (
    <div
      onClick={() => onClick(item)}
      className={classes}
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
      <div className={style.actionCol}>
        <FontAwesomeIcon icon={faPencilAlt} />
        <span onClick={(event) => { event.stopPropagation(); onDelete(item); }}>
          <FontAwesomeIcon icon={faTrashAlt}/>
        </span>
      </div>
    </div>
  );
});
