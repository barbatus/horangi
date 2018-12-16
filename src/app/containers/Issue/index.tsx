import * as H from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { match, withRouter } from 'react-router-dom';
import { submit } from 'redux-form';

import { Issue, ISSUES } from 'app/store';

import IssueForm from './IssueForm';
import * as style from './style.scss';

interface IEditorProps {
  issue: Partial<Issue>;
  label: string;
  dispatch: (action: string) => void;
  onSubmit: (item: Partial<Issue>) => void;
  onOk: () => void;
  onCancel: () => void;
}

const Editor = React.memo<IEditorProps>(({ label, issue, onOk, onSubmit, onCancel }) => {
  return (
    <div className={style.sidePanel}>
      <IssueForm initialValues={issue} onSubmit={onSubmit} />
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
});

interface IssueHOProps {
  isNew?: boolean;
  dispatch: (action: string) => void;
  history: H.History;
  match: match<{ issueId: string }>;
}

const IssueHO = React.memo<IssueHOProps>(({ isNew, dispatch, match: router, history }) => {
  const onSubmit = (fields) => {
    console.log(fields);
  };
  const onOk = () => {
    dispatch(submit('issueForm'));
  };
  const issue = isNew ? {} : ISSUES.find((item) =>
    item.issueId === router.params.issueId);
  return (
    <Editor
      label={isNew ? 'Create' : 'Update'}
      issue={issue}
      dispatch={dispatch}
      onOk={onOk}
      onSubmit={onSubmit}
      onCancel={() => history.push('/')}
    />
  );
});

export default connect()(withRouter(IssueHO as any));
