import { useState } from 'react';
import { Button, Stack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import FormTextInput from '../forms/FormTextInput';
import FormCheckBox from '../forms/FormCheckBox';
import useLogin from '../../hooks/useLogin';

const EnterOtp = () => {
  const { setOtpUrl } = useLogin();
  return (
    <Formik
      initialValues={{
        otp: '',
      }}
      onSubmit={(values) => {
        setOtpUrl(values.otp);
      }}
    >
      {(props) => (
        <Form>
          <Stack spacing='6'>
            <FormTextInput
              aria-label='One Time Password'
              label='OTP'
              name='otp'
              type='string'
              placeholder='...'
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

export default EnterOtp;
