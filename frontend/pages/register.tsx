import { Field, Formik } from 'formik';
import React, { useState } from 'react';

import { InputField } from '../components/fields/InputField';
import Layout from '../components/Layout';
import { useRegisterMutation } from '../generated/apolloComponents';

export default () => {
  const [register] = useRegisterMutation();

  const [result, setResult] = useState('');

  return (
    <Layout title="Register page">
      <Formik
        onSubmit={async (data) => {
          try {
            const response = await register({
              variables: {
                data,
              },
            });
            if (response?.data?.register) {
              setResult(JSON.stringify(response, null, 2));
            }
          } catch (e) {
            setResult(JSON.stringify(e, null, 2));
          }
        }}
        initialValues={{
          email: '',
          firstName: '',
          lastName: '',
          password: '',
        }}
      >
        {({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="firstName"
              placeholder="firstName"
              component={InputField}
            />
            <Field
              name="lastName"
              placeholder="lastName"
              component={InputField}
            />
            <Field name="email" placeholder="email" component={InputField} />
            <Field
              name="password"
              placeholder="password"
              type="password"
              component={InputField}
            />
            <button type="submit">submit</button>
          </form>
        )}
      </Formik>
      <pre style={{ border: '1px solid grey' }}>{result}</pre>
    </Layout>
  );
};
