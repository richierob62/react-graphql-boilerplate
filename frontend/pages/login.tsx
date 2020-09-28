import * as yup from 'yup';

import { Button, Col, Row } from 'react-bootstrap';
import { Formik, FormikHelpers } from 'formik';

import { LabeledTextInput } from '../lib/labeled_text_input';
import Layout from '../components/Layout';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { useLoginMutation } from '../generated/apolloComponents';

// Schema for yup
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('*Enter your email address')
    .required('*Enter your email address'),
  password: yup.string().required('*Enter your password'),
});

const CONTAINER = styled.div`
  background: #f7f9fa;
  height: auto;
  width: 90%;
  margin: 5em auto;
  color: #33b9b6;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.4);

  @media (min-width: 786px) {
    width: 60%;
  }

  label {
    color: #24b9b6;
    font-size: 1rem;
    font-weight: 400;
  }

  h1 {
    color: #24b9b6;
    padding-top: 0.5rem;
  }

  small {
    font-size: 0.9rem;
    color: #33b9b6;
  }

  small a {
    font-size: 0.9rem;
    color: #159491;
  }
`;

type LoginData = {
  email: string;
  password: string;
};

const Login = () => {
  const [login, { loading }] = useLoginMutation({
    onCompleted: () => {},
  });

  const initialValues: LoginData = {
    email: '',
    password: '',
  };

  const submitLogin = async (
    values: LoginData,
    { setSubmitting, resetForm, setErrors }: FormikHelpers<LoginData>
  ) => {
    try {
      setSubmitting(true);

      await login({
        variables: {
          data: values,
        },
      });
      resetForm();
    } catch (err) {
      const errors = err.graphQLErrors[0].extensions.exception.validationErrors;
      if (errors) {
        const formikErrors: { [key: string]: string } = {};
        errors.forEach((e: any) => {
          formikErrors[e.property] = Object.values(e.constraints)[0] as string;
        });
        setErrors(formikErrors);
      }
    }
    setSubmitting(false);
  };

  return (
    <Layout title="Login">
      <CONTAINER>
        <Formik
          onSubmit={submitLogin}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Row className="bg-white py-5 justify-content-center">
              <Col sm={8} md={6} lg={6}>
                <h1 className="text-center">Login</h1>

                <form onSubmit={formikProps.handleSubmit}>
                  <LabeledTextInput
                    fieldName={'email'}
                    placeholder={'email'}
                    label={'Email'}
                    formikProps={formikProps}
                  />
                  <LabeledTextInput
                    type="password"
                    fieldName={'password'}
                    placeholder={'password'}
                    label={'Password'}
                    formikProps={formikProps}
                  />

                  <Button
                    variant="success"
                    type="submit"
                    disabled={
                      loading ||
                      Object.keys(formikProps.errors).length > 0 ||
                      formikProps.isSubmitting
                    }
                  >
                    {loading ? 'one sec...' : 'Login'}
                  </Button>
                </form>

                <br />
                <small>
                  Don't have an account?&nbsp;
                  <Link href="/register">
                    <a>Register here</a>
                  </Link>
                </small>
              </Col>
            </Row>
          )}
        </Formik>
      </CONTAINER>
    </Layout>
  );
};

export default Login;
