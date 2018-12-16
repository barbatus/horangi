import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

import { IssueType } from 'app/store';

import * as style from './form.scss';

const TYPE_OPTIONS = [
  { value: IssueType.Bug, name: 'Bug' },
  { value: IssueType.Feat, name: 'Feature' },
  { value: IssueType.Story, name: 'Story' },
];

const IssueForm = React.memo(() => {
  const options = TYPE_OPTIONS.map((option) => (
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

export default reduxForm({
  form: 'issueForm',
  forceUnregisterOnUnmount: true,
})(IssueForm);
