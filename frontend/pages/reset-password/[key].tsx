import * as yup from 'yup';

import { Button, Col, Row } from 'react-bootstrap';
import { Formik, FormikHelpers } from 'formik';

import { LabeledTextInput } from '../../lib/labeled_text_input';
import Layout from '../../components/Layout';
import React from 'react';
import styled from 'styled-components';
import { useResetPasswordMutation } from '../../generated/apolloComponents';
import { useRouter } from 'next/router'

// Schema for yup
const validationSchema = yup.object().shape({
  key: yup.string().required('*Token from email'),
  password: yup.string().required('*Enter your new password'),
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

type ResetPasswordData = {
  key: string;
  password: string;
};

const ResetPassword = () => {

  const router = useRouter();

  const key: string = router.query?.key as string

  const [reset, { loading }] = useResetPasswordMutation({
    onCompleted: () => router.push('/login'),
    });

  const initialValues: ResetPasswordData = {
    key,
    password: '',
  };

  const submitResetPassword = async (
    values: ResetPasswordData,
    { setSubmitting, resetForm, setErrors }: FormikHelpers<ResetPasswordData>
  ) => {
    try {
      setSubmitting(true);

      await reset({
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
    <Layout title="ResetPassword">
      <CONTAINER>
        <Formik
          onSubmit={submitResetPassword}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Row className="bg-white py-5 justify-content-center">
              <Col sm={8} md={6} lg={6}>
                <h1 className="text-center">ResetPassword</h1>

                <form onSubmit={formikProps.handleSubmit}>
                  <LabeledTextInput
                    fieldName={'key'}
                    placeholder={'key'}
                    label={'Key'}
                    formikProps={formikProps}
                  />
                  <LabeledTextInput
                    type="password"
                    fieldName={'password'}
                    placeholder={'password'}
                    label={'New Password'}
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

export default ResetPassword;
