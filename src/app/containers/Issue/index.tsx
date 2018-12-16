import * as React from 'react';
import { connect } from 'react-redux';
import { History, withRouter } from 'react-router-dom';
import { submit } from 'redux-form';

import * as style from './style.scss';

import IssueForm from './IssueForm';

interface IssueProps {
  label: string;
  dispatch: (action: string) => void;
  onSubmit: (item: any) => void;
  onCancel: () => void;
}

const ISSUE = {name: 'some name', type: 'bug', description: 'issue desciption' };

const Issue = ({ label, dispatch, onSubmit, onCancel }) => {
  const onOk = () => {
    dispatch(submit('issueForm'));
  };
  return (
    <div className={style.sidePanel}>
      <IssueForm initialValues={ISSUE} onSubmit={onSubmit} />
      <div className={style.buttons}>
        <button className="primary" onClick={onOk}>
          {label}
        </button>
        <button onClick={onCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
};

interface IssueHOProps {
  isNew?: boolean;
  dispatch: (action: string) => void;
  history: History<any>;
}

const IssueHO = React.memo<IssueHOProps>(({ isNew, dispatch, history }) => {
  const onSubmit = (fields) => {
    console.log(fields);
  };
  return (
    <Issue
      label={isNew ? 'Create' : 'Update'}
      dispatch={dispatch}
      onSubmit={onSubmit}
      onCancel={() => history.push('/')}
    />
  );
});

export default connect()(withRouter(IssueHO));
