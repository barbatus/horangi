import * as H from 'history';
import * as React from 'react';
import { Mutation, Query } from 'react-apollo';
import { connect } from 'react-redux';
import { match, withRouter } from 'react-router-dom';
import { submit } from 'redux-form';

import { ADD_ISSUE, GET_ISSUE, Issue, UPDATE_ISSUE } from 'app/store';

import IssueForm from './IssueForm';
import * as style from './style.scss';

interface IEditorProps {
  issue: Partial<Issue>;
  label: string;
  onSubmit: (item: Partial<Issue>) => void;
  onOk: () => void;
  onCancel: () => void;
}

const Editor = React.memo<IEditorProps>(({ label, issue, onOk, onSubmit, onCancel }) => {
  return (
    <div className={style.sidePanel}>
      <IssueForm initialValues={issue} onSubmitSuccess={onSubmit} />
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

class IssueQuery extends Query<{ issue: Issue }, { id: string }> {}

const renderEditor = (
  issue: Issue,
  onOk: () => void,
  onCancel: () => void,
  onSubmit: (fields: Partial<Issue>) => void,
) => {
  return (
    <Editor
      label={issue ? 'Update' : 'Create'}
      issue={issue || {}}
      onOk={onOk}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

const withMutation = (
  issue: Issue,
  onOk: () => void,
  onCancel: () => void,
) => {
  const onSubmit = (mutation) => (fields) => {
    mutation({ variables: fields }).then(() => onCancel());
  };
  return issue ? (
    <Mutation mutation={UPDATE_ISSUE}>
      {(updateIssue) => renderEditor(issue, onOk, onCancel, onSubmit(updateIssue))}
    </Mutation>
  ) : (
    <Mutation mutation={ADD_ISSUE}>
      {(addIssue) => renderEditor(issue, onOk, onCancel, onSubmit(addIssue))}
    </Mutation>
  );
};

const IssueHO = React.memo<IssueHOProps>(({ isNew, dispatch, match: router, history }) => {
  const onOk = () => {
    dispatch(submit('issueForm'));
  };
  const onCancel = () => {
    history.push('/');
  };
  return isNew ?
    withMutation(null, onOk, onCancel) : (
    <IssueQuery query={GET_ISSUE} variables={{ id: router.params.issueId }}>
      {({ data: { issue } }) => withMutation(issue, onOk, onCancel)}
    </IssueQuery>
  );
});

export default connect()(withRouter(IssueHO as any));
