import Layout from '../components/Layout';
import React from 'react';

const OAuthDemo: React.FunctionComponent = () => {
  return (
    <Layout title="OAuth">
      <p>
        <a href={`${process.env.backend}/auth/twitter`}>twitter</a>
      </p>
      <p>
        <a href={`${process.env.backend}/auth/facebook`}>facebook</a>
      </p>
      <p>
        <a href={`${process.env.backend}/auth/google`}>google</a>
      </p>
      <p>
        <a href={`${process.env.backend}/auth/instagram`}>instagram</a>
      </p>
    </Layout>
  );
};

export default OAuthDemo;
