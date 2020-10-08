import * as yup from 'yup';

import { Button, Col, Row } from 'react-bootstrap';
import { Formik, FormikHelpers } from 'formik';

import { LabeledTextInput } from '../lib/labeled_text_input';
import Layout from '../components/Layout';
import React from 'react';
import styled from 'styled-components';
import { useConfirmEmailMutation } from '../generated/apolloComponents';
import { useRouter } from 'next/router';

// Schema for yup
const validationSchema = yup.object().shape({
  token: yup.string().required('*Token from email'),
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

type ConfirmEmailData = {
  token: string;
};

const ConfirmEmail = () => {
  const router = useRouter();

  const [confirm, { loading }] = useConfirmEmailMutation({
    onCompleted: () => router.push('/login'),
  });

  const initialValues: ConfirmEmailData = {
    token: '',
  };

  const submitConfirmEmail = async (
    values: ConfirmEmailData,
    { setSubmitting, resetForm, setErrors }: FormikHelpers<ConfirmEmailData>
  ) => {
    try {
      setSubmitting(true);

      await confirm({
        variables: values,
      });
      resetForm();
    } catch (err) {
      setErrors({ token: 'Invalid or expired token' });
    }
    setSubmitting(false);
  };

  return (
    <Layout title="Confirm Email">
      <CONTAINER>
        <Formik
          onSubmit={submitConfirmEmail}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(formikProps) => (
            <Row className="bg-white py-5 justify-content-center">
              <Col sm={8} md={6} lg={6}>
                <h1 className="text-center">Confirm Email</h1>

                <form onSubmit={formikProps.handleSubmit}>
                  <LabeledTextInput
                    fieldName={'token'}
                    placeholder={'token'}
                    label={'Token'}
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
                    {loading ? 'one sec...' : 'Confirm Email'}
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

export default ConfirmEmail;
