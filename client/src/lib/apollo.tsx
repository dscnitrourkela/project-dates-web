/* eslint-disable no-console */
import React from 'react';

import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';

import { useAuthContext } from '../store/contexts';

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
    uri: 'http://localhost:9000/graphql',
  }),
]);

const getApolloLink = (token) => {
  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }));
  return authLink.concat(link);
};

const client = (token) =>
  new ApolloClient({
    cache,
    link: getApolloLink(token),
    name: 'avenue-dashboard-client',
    queryDeduplication: false,
  });

const ApolloWrapper = ({ children }) => {
  const { user } = useAuthContext();
  console.log(user);
  return <ApolloProvider client={client(user?.accessToken)}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
