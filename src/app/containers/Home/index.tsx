import * as H from 'history';
import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import { GET_ISSUES_ORDER_BY, IOrderBy, Issue } from 'app/store';

import IssueList from '../../components/IssueList';
import IssueChart from '../IssueChart';
import * as style from './style.css';

class IssuesQuery extends Query<{ issues: Issue[] }, { orderBy: IOrderBy }> {}

interface IHomeProps {
  history: H.History;
}

export class Home extends React.PureComponent<IHomeProps, { orderBy: IOrderBy }> {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: { field: 'name', dir: 1 },
    };
    this.renderHome = this.renderHome.bind(this);
    this.onNew = this.onNew.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.onSort = this.onSort.bind(this);
  }

  renderHome(result: QueryResult<{ issues: Issue[] }>) {
    const { orderBy } = this.state;
    return (
      <div>
        <IssueChart />
        <div className={style.toolBar}>
          <button onClick={this.onNew}>Add New</button>
        </div>
        <IssueList
          items={result.data.issues || []}
          orderBy={orderBy}
          onSort={this.onSort}
          onItemClick={this.onItemClick}
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

export default withRouter(Home);
