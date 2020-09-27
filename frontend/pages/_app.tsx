import '../global_styles.scss';

import { ApolloProvider } from '@apollo/client';
import App from 'next/app';
import { CSSProperties } from 'react';
import React from 'react';
import withApollo from '../lib/withApollo';

const pageWrapperStyle: CSSProperties = {
  backgroundColor: '#e5e5c4',
  margin: '8px',
  padding: '40px',
  fontSize: '1.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

class PageWithApolloProvider extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <div style={pageWrapperStyle}>
          <Component {...pageProps} />
        </div>
      </ApolloProvider>
    );
  }
}

export default withApollo(PageWithApolloProvider);
