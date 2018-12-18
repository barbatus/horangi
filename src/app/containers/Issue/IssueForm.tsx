import * as React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';

import { Issue, ISSUE_TYPE_OPTIONS } from 'app/store';

import * as style from './form.scss';

const IssueForm = React.memo(() => {
  const options = ISSUE_TYPE_OPTIONS.map((option) => (
    <option key={option.value} value={option.value}>{option.name}</option>
  ));
  return (
    <form className={style.form}>
      <div>
        <label htmlFor="name">Issue Name</label>
        <Field name="name" component="input" type="text" />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <Field name="type" component="select" type="text">
          <option>Select Type</option>
          {options}
        </Field>
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <Field name="description" rows={10} component="textarea" />
      </div>
    </form>
  );
});

function validate(issue: Partial<Issue>) {
  if (!issue.name) {
    throw new SubmissionError({
      name: 'Required',
    });
  }

  if (!issue.type) {
    throw new SubmissionError({
      type: 'Required',
    });
  }

  return issue;
}

export default reduxForm({
  form: 'issueForm',
  onSubmit: validate,
  forceUnregisterOnUnmount: true,
  enableReinitialize: true,
})(IssueForm);
