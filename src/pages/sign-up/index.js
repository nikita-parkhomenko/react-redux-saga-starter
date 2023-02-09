// outsource dependencies
import cn from 'classnames';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { Formik, Form } from 'formik';
import { Container, Button, Card, CardBody, CardHeader } from 'reactstrap';

// local dependencies
import { VALID } from '../../constants';
import { Input } from '../../components';

const validate = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('Required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  password: VALID.PASSWORD.required('Password required')
});
const initial = {
  firstName: '',
  lastName: '',
  password: '',
  email: '',
};

export const SignUp = memo(function SignUp ({ className }) {
  const handleSubmit = values => alert(JSON.stringify(values, null, 2));

  return <Container id="SignUp" className={cn('sign-up d-flex justify-content-center pt-5', className)}>
    <Card className="w-50">
      <CardHeader className="text-center h1 py-3"> Sign Up </CardHeader>
      <Formik
        initialValues={initial}
        onSubmit={handleSubmit}
        validationSchema={validate}
      >
        <CardBody>
          <Form>
            <Input
              type="text"
              name="firstName"
              label="First Name"
              placeholder="First Name"
            />
            <Input
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
            />
            <Input
              skipTouch
              type="email"
              name="email"
              label="Email"
              placeholder="Email"
            />
            <Input
              skipTouch
              type="password"
              name="password"
              label="Password"
              placeholder="Password"
            />
            <Button size="lg" block color="primary" type="submit">Submit</Button>
          </Form>
        </CardBody>
      </Formik>
    </Card>
  </Container>;
});

SignUp.propTypes = {
  className: PropTypes.string,
};
SignUp.defaultProps = {
  className: '',
};
