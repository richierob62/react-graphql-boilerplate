import Layout from '../components/Layout';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

const FancyAnchor = styled.a`
  color: blue;
  font-size: 50px;
  cursor: pointer;
  &:hover {
    color: red;
  }
`;

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout title="Next/TypeScript">
      <p>
        <Link href="/about">
          <FancyAnchor>About</FancyAnchor>
        </Link>
      </p>
    </Layout>
  );
};

export default IndexPage;
