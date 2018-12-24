import { InMemoryCache } from 'apollo-cache-inmemory';
import { CachePersistor } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';
import { withClientState } from 'apollo-link-state';

import { typeDefs } from './gql';
import { defaults, resolvers } from './resolvers';

const cache = new InMemoryCache({
  dataIdFromObject: (item) => item.id,
});

const CACHE_KEY = 'horangi555';

const persistor = new CachePersistor({
  cache,
  storage: localStorage,
  key: CACHE_KEY,
  debug: true,
});

export async function setupApollo() {
  const init = localStorage.getItem(`${CACHE_KEY}_init`);
  if (!init) {
    const client = new ApolloClient({
      cache,
      link: withClientState({ resolvers, defaults, cache, typeDefs }),
    });
    localStorage.setItem(`${CACHE_KEY}_init`, 'true');
    await persistor.persist();
    return client;
  }
  await persistor.restore();
  return new ApolloClient({
    cache,
    link: withClientState({ resolvers, cache, typeDefs }),
  });
}
