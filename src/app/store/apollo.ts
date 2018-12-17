import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';

import { typeDefs } from './gql';
import { defaults, resolvers } from './resolvers';

const cache = new InMemoryCache({
  dataIdFromObject: (item) => item.id,
});

export const apolloClient = new ApolloClient({
  cache,
  link: withClientState({ resolvers, defaults, cache, typeDefs }),
});
