import * as yup from 'yup';

import { Button, Col, Row } from 'react-bootstrap';
import { Formik, FormikHelpers } from 'formik';

import { LabeledTextInput } from '../lib/labeled_text_input';
import Layout from '../components/Layout';
import React from 'react';
import styled from 'styled-components';
import { useForgotPasswordMutation } from '../generated/apolloComponents';

// Schema for yup
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('*Enter your email address')
    .required('*Enter your email address'),
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

type ForgotPasswordData = {
  email: string;
};

const ForgotPassword = () => {

  const [forgotPassword, { loading }] = useForgotPasswordMutation({
    onCompleted: () => {},
    });

  const initialValues: ForgotPasswordData = {
    email: '',
  };

  const submitForgotPassword = async (
    values: ForgotPasswordData,
    { setSubmitting, resetForm, setErrors }: FormikHelpers<ForgotPasswordData>
  ) => {
    try {
      setSubmitting(true);

      await forgotPassword({
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
    <Layout title="Forgot Password">
      <CONTAINER>
        <Formik
          onSubmit={submitForgotPassword}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Row className="bg-white py-5 justify-content-center">
              <Col sm={8} md={6} lg={6}>
                <h1 className="text-center">ForgotPassword</h1>

                <form onSubmit={formikProps.handleSubmit}>
                  <LabeledTextInput
                    fieldName={'email'}
                    placeholder={'email'}
                    label={'Email'}
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
                    {loading ? 'one sec...' : 'Reset Password'}
                  </Button>
                </form>
              </Col>
            </Row>
          )}
        </Formik>
      </CONTAINER>
    </Layout>
  );
};

export default ForgotPassword;
