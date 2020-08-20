import { ApolloProvider } from '@apollo/client';
import App from 'next/app';
import React from 'react';
import styled from 'styled-components';
import withApollo from '../lib/withApollo';

const PageWrapper = styled.div`
  background-color: #e5e5c4;
  height: 100vh;
  margin: -8px;
  padding: 0;
  font-size: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

class PageWithApolloProvider extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <PageWrapper>
          <Component {...pageProps} />
        </PageWrapper>
      </ApolloProvider>
    );
  }
}

export default withApollo(PageWithApolloProvider);
