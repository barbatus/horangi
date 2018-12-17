import gql from 'graphql-tag';

import { GET_ISSUES } from './gql';

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

let nextIssueId = 0;

const all = gql` {
    issues @client {
      id
      name
      type
      description
    }
  }
`;

export const resolvers = {
  Mutation: {
    addIssue: (_, { name, type, description }, { cache }) => {
      const { issues } = cache.readQuery({ query: GET_ISSUES });
      const newIssue = {
        id: `${nextIssueId++}`,
        name,
        type,
        description,
        __typename: 'Issue',
      };
      const data = {
        issues: issues.concat([newIssue]),
      };
      cache.writeData({ data });
      return newIssue;
    },
  },
  Query: {
    issue: (_, { id }, { cache }) => {
      const { issues } = cache.readQuery({ query: GET_ISSUES });
      return issues.find((issue) => issue.id === id);
    },
    issues: (_, { orderBy }, { cache }) => {
      const { issues } = cache.readQuery({ query: all });
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
