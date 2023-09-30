/* eslint-disable no-console */
import React from 'react';

import { ApolloClient, ApolloProvider, from, HttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, path }) => console.error({ message, path }));
    return;
  }

  if (networkError) {
    const { message, name, stack, cause } = networkError;
    console.error({
      message,
      name,
      stack,
      cause,
    });
    return;
  }
});

const link = from([
  errorLink,
  new HttpLink({
    uri: 'http://localhost:8000/graphql',
    // uri: 'https://avenue-api.nitrkl.in/graphql',
  }),
]);

export const getApolloLink = (token?: unknown) => {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }));
  return authLink.concat(link);
};

export const GraphQLClient = new ApolloClient({
  cache,
  link: getApolloLink(),
  name: 'avenue-dashboard-client',
  queryDeduplication: false,
});

const ApolloWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ApolloProvider client={GraphQLClient}>{children}</ApolloProvider>
);

export default ApolloWrapper;
