import * as faker from 'faker';

import { GET_ISSUES, GET_ISSUES_ORDER_BY } from './gql';

const ISSUES = [...Array(20).keys()].map(() => {
  return {
    id: `${faker.random.number()}`,
    name: faker.lorem.words(2),
    type: faker.random.arrayElement(['BUG', 'FEAT', 'STORY', 'EPIC']),
    description: faker.lorem.sentence(),
    __typename: 'Issue',
  };
});

export const defaults = {
  issues: ISSUES,
};

let lastOrderBy = null;
export const resolvers = {
  updateCache(cache, data) {
    cache.writeData({ data });
    cache.writeQuery({
      query: GET_ISSUES_ORDER_BY,
      data,
      variables: { orderBy: lastOrderBy } ,
    });
  },
  Mutation: {
    add: (_, { name, type, description = null }, { cache }) => {
      const { issues } = cache.readQuery({ query: GET_ISSUES });
      const newIssue = {
        id: `${faker.random.number()}`,
        name,
        type,
        description,
        __typename: 'Issue',
      };
      const data = {
        issues: [newIssue].concat(issues),
      };
      resolvers.updateCache(cache, data);
      return newIssue;
    },
    update: (_, { id, name, type, description }, { cache }) => {
      const data = { name, type, description };
      cache.writeData({ id, data });
      return null;
    },
    delete: (_, { id }, { cache }) => {
      const query = cache.readQuery({ query: GET_ISSUES });
      const issues = query.issues.filter((issue) => issue.id !== id);
      const data = {
        issues,
      };
      resolvers.updateCache(cache, data);
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
