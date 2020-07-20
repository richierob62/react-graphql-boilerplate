import * as React from 'react';

import Layout from '../components/Layout';
import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { gql } from 'apollo-boost';
import { useLoginMutation } from '../generated/apolloComponents';

const IndexPage: React.FunctionComponent = () => {
  const [login, { loading }] = useLoginMutation();

  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>hello Next.js 👋</h1>
      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <button
        onClick={async () => {
          const response = await login({
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
