import * as H from 'history';
import * as React from 'react';
import { Query, QueryResult, withMutation } from 'react-apollo';
import { RouteChildrenProps } from 'react-router';
import { withRouter } from 'react-router-dom';

import { DELETE_ISSUE, GET_ISSUES_ORDER_BY, IOrderBy, Issue } from 'app/store';

import IssueList from '../../components/IssueList';
import IssueChart from '../IssueChart';
import * as style from './style.css';

class IssuesQuery extends Query<{ issues: Issue[] }, { orderBy: IOrderBy }> {}

interface IDeleteMutator {
  delete: (id: string) => Promise<any>;
}

interface IHomeProps extends RouteChildrenProps<any>, IDeleteMutator {
  history: H.History;
  location: any;
  match: any;
}

export class Home extends React.PureComponent<IHomeProps, { selected: Issue, orderBy: IOrderBy }> {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: { field: 'name', dir: 1 },
      selected: null,
    };
    this.renderHome = this.renderHome.bind(this);
    this.onNew = this.onNew.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onItemDelete = this.onItemDelete.bind(this);
  }

  renderHome(result: QueryResult<{ issues: Issue[] }>) {
    const { orderBy, selected } = this.state;
    return (
      <div>
        <IssueChart />
        <div className={style.toolBar}>
          <button onClick={this.onNew}>Add New</button>
        </div>
          <IssueList
            items={result.data.issues || []}
            selected={selected}
            orderBy={orderBy}
            onSort={this.onSort}
            onItemClick={this.onItemClick}
            onItemDelete={this.onItemDelete}
          />
      </div>
    );
  }

  onNew() {
    const { history } = this.props;
    history.push('/new');
  }

  onItemClick(item: Issue) {
    const { history } = this.props;
    history.push(`/issue/${item.id}`);
    this.setState({ selected: item });
  }

  async onItemDelete(item: Issue) {
    await this.props.delete(item.id);
    const { history } = this.props;
    history.push('/');
  }

  onSort(orderBy: IOrderBy) {
    this.setState({ orderBy });
  }

  render() {
    const { orderBy } = this.state;
    return (
      <IssuesQuery
        query={GET_ISSUES_ORDER_BY}
        fetchPolicy="network-only"
        variables={{ orderBy }}
      >
        {this.renderHome}
      </IssuesQuery>
    );
  }
}

export const withDelete = withMutation<RouteChildrenProps<any>, any, any, IDeleteMutator>(
  DELETE_ISSUE, {
  props: ({ mutate }) => ({
    delete: (id) => mutate({
      variables: { id },
    }),
  }),
});

export default withRouter(withDelete(Home));
