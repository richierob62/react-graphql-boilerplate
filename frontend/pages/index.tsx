import React, { useState } from 'react';
import {
  useConfirmEmailMutation,
  useCurrentUserLazyQuery,
  useForgotPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useResetPasswordMutation,
} from '../generated/apolloComponents';

import Layout from '../components/Layout';
import Link from 'next/link';

const IndexPage: React.FunctionComponent = () => {
  const [val, setVal] = useState('');

  // mutations
  const [login, { loading }] = useLoginMutation();
  const [logout] = useLogoutMutation();
  const [forgotPassword] = useForgotPasswordMutation();
  const [resetPassword] = useResetPasswordMutation();
  const [register] = useRegisterMutation();
  const [confirmEmail] = useConfirmEmailMutation();

  // queries
  const [currentUser, { data }] = useCurrentUserLazyQuery({
    fetchPolicy: 'network-only',
  });

  const stringData = JSON.stringify(data, null, 2);

  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <p>{loading ? 'Loading...' : 'All Done'}</p>

      <pre style={{ border: '1px solid grey' }}>{val}</pre>

      <pre style={{ border: '1px solid grey' }}>{stringData}</pre>

      <p>
        <Link href="/about">
          <a>About</a>
        </Link>
      </p>
      <button
        onClick={async () => {
          try {
            const response = await login({
              variables: {
                data: {
                  email: 'myemail2@email.com',
                  password: 'myPassWordHere',
                },
              },
            });
            if (response?.data?.login) {
              setVal(JSON.stringify(response, null, 2));
            }
          } catch (e) {
            setVal(JSON.stringify(e, null, 2));
          }
        }}
      >
        call login mutation
      </button>

      <button
        onClick={async () => {
          try {
            const response = await logout({});
            if (response?.data?.logout) {
              setVal(JSON.stringify(response, null, 2));
            }
          } catch (e) {
            setVal(JSON.stringify(e, null, 2));
          }
        }}
      >
        logout
      </button>

      <button
        onClick={() => {
          currentUser({});
        }}
      >
        current user
      </button>

      <button
        onClick={async () => {
          try {
            const response = await forgotPassword({
              variables: {
                data: { email: 'foo11@example.com' },
              },
            });
            if (response?.data?.forgotPassword) {
              setVal(JSON.stringify(response, null, 2));
            }
          } catch (e) {
            setVal(JSON.stringify(e, null, 2));
          }
        }}
      >
        forgot password
      </button>

      <button
        onClick={async () => {
          try {
            const response = await resetPassword({
              variables: {
                data: {
                  password: '1234567',
                  key: 'd87d7e7e-4ae6-433d-bfae-27cd8a3ff71c',
                },
              },
            });
            if (response?.data?.resetPassword) {
              setVal(JSON.stringify(response, null, 2));
            }
          } catch (e) {
            setVal(JSON.stringify(e, null, 2));
          }
        }}
      >
        reset password
      </button>

      <button
        onClick={async () => {
          try {
            const response = await register({
              variables: {
                data: {
                  email: 'myemail2@email.com',
                  password: 'myPassWordHere',
                  firstName: 'Harry',
                  lastName: 'Potter',
                },
              },
            });
            if (response?.data?.register) {
              setVal(JSON.stringify(response, null, 2));
            }
          } catch (e) {
            setVal(JSON.stringify(e, null, 2));
          }
        }}
      >
        register
      </button>

      <button
        onClick={async () => {
          try {
            const response = await confirmEmail({
              variables: {
                token: '468077d3-d3cf-40af-a5d2-09f7b30a9af9',
              },
            });
            if (response?.data?.confirmEmail) {
              setVal(JSON.stringify(response, null, 2));
            }
          } catch (e) {
            setVal(JSON.stringify(e, null, 2));
          }
        }}
      >
        confirmEmail
      </button>
    </Layout>
  );
};

export default IndexPage;
