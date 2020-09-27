import { Form } from 'react-bootstrap';
import { FormikProps } from 'formik';

type LabeledTextInputType = {
  label: string;
  fieldName: string;
  placeholder?: string;
  type?: string;
  formikProps: FormikProps<any>;
};

export const LabeledTextInput = (props: LabeledTextInputType) => {
  const { fieldName, placeholder, label, formikProps, type } = props;
  const { values, errors, handleChange, handleBlur, touched } = formikProps;
  return (
    <Form.Group>
      <Form.Label
        className={
          touched[fieldName] && errors[fieldName] ? 'text-danger' : undefined
        }
      >
        {touched[fieldName] && errors[fieldName] ? errors[fieldName] : label}
      </Form.Label>
      <Form.Control
        type={type || 'text'}
        name={fieldName}
        placeholder={placeholder}
        onChange={handleChange}
        value={values[fieldName]}
        className={
          touched[fieldName] && errors[fieldName] ? 'is-invalid' : undefined
        }
        onBlur={handleBlur}
      />
    </Form.Group>
  );
};
