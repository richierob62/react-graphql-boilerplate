import * as React from 'react';

import Layout from '../components/Layout';
import Link from 'next/link';
import { LoginComponent } from '../generated/apolloComponents';
import { Mutation } from 'react-apollo';
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
      <LoginComponent>
        {(mutate) => (
          <button
            onClick={async () => {
              const response = await mutate({
                variables: {
                  data: { email: 'foo11@example.com', password: '1234567' },
                },
              });
              if (response?.data?.login) {
                console.log(response.data.login);
              }
            }}
          >
            call login mutation
          </button>
        )}
      </LoginComponent>
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
