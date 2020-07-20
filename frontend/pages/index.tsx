import * as React from 'react';

import { Mutation, Query } from 'react-apollo';

import Layout from '../components/Layout';
import Link from 'next/link';
import { gql } from 'apollo-boost';

const IndexPage: React.FunctionComponent = () => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <Mutation
        mutation={gql`
          mutation {
            login(data: { email: "foo11@example.com", password: "1234567" }) {
              id
              firstName
              lastName
              email
              confirmed
            }
          }
        `}
      >
        {(mutate: any) => (
          <button
            onClick={async () => {
              const response = await mutate();
              console.log(response);
            }}
          >
            call login mutation
          </button>
        )}
      </Mutation>
      <Mutation
        mutation={gql`
          mutation {
            logout
          }
        `}
      >
        {(mutate: any) => (
          <button
            onClick={async () => {
              const response = await mutate();
              console.log(response);
            }}
          >
            logout
          </button>
        )}
      </Mutation>
    </Layout>
  );
};

export default IndexPage;
