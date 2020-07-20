import { ApolloProvider } from 'react-apollo';
import App from 'next/app';
import React from 'react';
import withApollo from '../lib/withApollo';

class PageWithApolloProvider extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}

export default withApollo(PageWithApolloProvider);
