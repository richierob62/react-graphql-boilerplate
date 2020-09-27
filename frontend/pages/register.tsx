import * as yup from 'yup';

import { Button, Col, Row } from 'react-bootstrap';
import { Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react';

import { LabeledTextInput } from '../lib/labeled_text_input';
import Layout from '../components/Layout';
import Link from 'next/link';
import styled from 'styled-components';
import { useRegisterMutation } from '../generated/apolloComponents';

// Schema for yup
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, '*First Name must have at least 2 characters')
    .max(100, "*First Name can't be longer than 100 characters")
    .required('*First Name is required'),
  lastName: yup
    .string()
    .min(2, '*Last Name must have at least 2 characters')
    .max(100, "*Last Name can't be longer than 100 characters")
    .required('*Last Name is required'),
  email: yup
    .string()
    .email('*Must be a valid email address')
    .max(100, '*Email must be less than 100 characters')
    .required('*Email is required'),
  password: yup
    .string()
    .required('*Password required')
    .min(6, '*Password must be at least 6 characters'),
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

  .email-sent {
    padding: 30px;
  }
`;

type RegistrationData = {
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
};

const Register = () => {
  const [registered, setRegistered] = useState(false);

  const [register, { loading }] = useRegisterMutation({
    onCompleted: () => setRegistered(true),
  });

  const initialValues: RegistrationData = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  const submitRegistration = async (
    values: RegistrationData,
    { setSubmitting, resetForm, setErrors }: FormikHelpers<RegistrationData>
  ) => {
    try {
      setSubmitting(true);

      await register({
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

  if (registered)
    return (
      <Layout title="Register page">
        <CONTAINER>
          <p className="email-sent">
            An email has been sent to you. Please click on the link in the email
            to confirm your email address.
          </p>
        </CONTAINER>
      </Layout>
    );

  return (
    <Layout title="Register page">
      <CONTAINER>
        <Formik
          onSubmit={submitRegistration}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Row className="bg-white py-5 justify-content-center">
              <Col sm={8} md={6} lg={6}>
                <h1 className="text-center">Register</h1>

                <form onSubmit={formikProps.handleSubmit}>
                  <LabeledTextInput
                    fieldName={'firstName'}
                    placeholder={'first name'}
                    label={'First Name'}
                    formikProps={formikProps}
                  />
                  <LabeledTextInput
                    fieldName={'lastName'}
                    placeholder={'last name'}
                    label={'Last Name'}
                    formikProps={formikProps}
                  />
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
                    {loading ? 'one sec...' : 'Register'}
                  </Button>
                </form>

                <br />
                <small>
                  Already have an account?&nbsp;
                  <Link href="/login">
                    <a>Login here</a>
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

export default Register;
