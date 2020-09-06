import Layout from '../components/Layout';
import React from 'react';

const env_vars = () => {
  return (
    <Layout>
      <h3>{`${process.env.customKey} is in next.config.js`}</h3>
    </Layout>
  );
};

export default env_vars;
