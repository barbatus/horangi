import gql from 'graphql-tag';

import { GET_ISSUES, GET_ISSUES_ORDER_BY } from './gql';

export const ISSUES = [
  { id: 'issueId1', name: 'issue name1', type: 'BUG', description: 'desc1', __typename: 'Issue' },
  { id: 'issueId2', name: 'issue name2', type: 'FEAT', description: 'desc2', __typename: 'Issue' },
  { id: 'issueId3', name: 'issue name3', type: 'STORY', description: 'desc3', __typename: 'Issue' },
  { id: 'issueId4', name: 'issue name4', type: 'EPIC', description: 'desc4', __typename: 'Issue' },
  { id: 'issueId5', name: 'issue name5', type: 'EPIC', description: 'desc5', __typename: 'Issue' },
  { id: 'issueId6', name: 'issue name6', type: 'FEAT', description: 'desc6', __typename: 'Issue' },
];

export const defaults = {
  issues: ISSUES,
};

let lastOrderBy = null;
export const resolvers = {
  Mutation: {
    addIssue: (_, { name, type, description = null }, { cache }) => {
      const { issues } = cache.readQuery({ query: GET_ISSUES });
      const newIssue = {
        id: `${Math.random()}`,
        name,
        type,
        description,
        __typename: 'Issue',
      };
      const data = {
        issues: [newIssue].concat(issues),
      };
      cache.writeData({ data });
      cache.writeQuery({
        query: GET_ISSUES_ORDER_BY,
        data,
        variables: { orderBy: lastOrderBy } ,
      });
      return newIssue;
    },
    updateIssue: (_, { id, name, type, description }, { cache }) => {
      const data = { name, type, description };
      cache.writeData({ id, data });
      return null;
    },
  },
  Query: {
    issue: (_, { id }, { cache }) => {
      const { issues } = cache.readQuery({ query: GET_ISSUES });
      return issues.find((issue) => issue.id === id);
    },
    issues: (_, { orderBy }, { cache }) => {
      const { issues } = cache.readQuery({ query: GET_ISSUES });
      lastOrderBy = orderBy;
      const onSort = (issue1, issue2) => {
        if (issue1[orderBy.field]) {
          return orderBy.dir * issue1[orderBy.field].localeCompare(issue2[orderBy.field]);
        }
        return -1;
      };
      return issues.sort(onSort);
    },
  },
};
