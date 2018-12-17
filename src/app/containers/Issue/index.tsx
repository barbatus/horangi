import * as H from 'history';
import * as React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import { match, withRouter } from 'react-router-dom';
import { submit } from 'redux-form';

import { GET_ISSUE, Issue } from 'app/store';

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

class IssueQuery extends Query<{ issue: Issue }, { id: string }> {}

const renderEditor = (
  label: string,
  issue: Partial<Issue>,
  onOk: () => void,
  onCancel: () => void,
  onSubmit: (fields: Partial<Issue>) => void,
) => {
  return (
    <Editor
      label={label}
      issue={issue}
      onOk={onOk}
      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
};

const IssueHO = React.memo<IssueHOProps>(({ isNew, dispatch, match: router, history }) => {
  const onSubmit = (fields) => {
    console.log(fields);
  };
  const onOk = () => {
    dispatch(submit('issueForm'));
  };
  const onCancel = () => {
    history.push('/');
  };
  return isNew ?
    renderEditor('Create', {}, onOk, onCancel, onSubmit) : (
    <IssueQuery query={GET_ISSUE} variables={{ id: router.params.issueId }}>
      {({ data: { issue } }) => renderEditor('Update', issue, onOk, onCancel, onSubmit)}
    </IssueQuery>
  );
});

export default connect()(withRouter(IssueHO as any));
