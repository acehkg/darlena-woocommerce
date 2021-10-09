import { useMutation } from '@apollo/client';
import { GET_USER } from '../../hooks/useAuth';
import { LOG_IN } from '../../lib/mutations';

import { Button, Stack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { PasswordField } from './PasswordField';
import FormTextInput from './FormTextInput';

const LoginForm = (props) => {
  //log user in
  const [logIn, { loading, error }] = useMutation(LOG_IN, {
    refetchQueries: [{ query: GET_USER }],
  });

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={(values) => {
        const { email, password } = values;
        logIn({
          variables: {
            login: email,
            password,
          },
        }).catch((error) => {
          console.error(error);
        });
      }}
    >
      {(props) => (
        <Form>
          <Stack spacing='6'>
            <FormTextInput
              aria-label='email'
              label=' Email'
              name='email'
              type='email'
              placeholder='example@example.com'
            />
            <PasswordField name='password' />
            <Button type='submit' colorScheme='blue' size='lg' fontSize='md'>
              Sign in
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
