import { Button, Stack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import useLogin from '../../hooks/useLogin';
import FormCheckBox from '../forms/FormCheckBox';
import FormTextInput from '../forms/FormTextInput';

const EmailLogin = () => {
  const { setFirstTime, setEmail } = useLogin();

  return (
    <Formik
      initialValues={{
        email: '',
        firstTime: false,
      }}
      onSubmit={(values) => {
        setFirstTime(values.firstTime);
        setEmail(values.email);
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
            <FormCheckBox
              aria-label='Select If First Time User'
              name='firstTime'
              type='checkbox'
              text='First Time User'
            />
            <Button type='submit' colorScheme='blue' size='lg' fontSize='md'>
              Sign in
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default EmailLogin;
