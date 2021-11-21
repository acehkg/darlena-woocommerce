import { Button, Stack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import FormTextInput from '../forms/FormTextInput';
import useLogin from '../../hooks/useLogin';

const EnterName = () => {
  const { setName } = useLogin();
  return (
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
      }}
      onSubmit={(values) => {
        setName(values.firstName, values.lastName);
      }}
    >
      {(props) => (
        <Form>
          <Stack spacing='6'>
            <FormTextInput
              aria-label='First Name'
              label='First Name'
              name='firstName'
              type='text'
              placeholder='John'
            />
            <FormTextInput
              aria-label='Last Name'
              label='Last Name'
              name='lastName'
              type='text'
              placeholder='Doe'
            />
            <Button type='submit' size='lg' fontSize='md'>
              Sign in
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default EnterName;
