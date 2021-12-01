import { Button, Stack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import FormTextInput from '../forms/FormTextInput';
import FormCheckBox from '../forms/FormCheckBox';
import useLogin from '../../hooks/useLogin';

const PhoneLogin = () => {
  const { setFirstTime, setPhone } = useLogin();
  return (
    <Formik
      initialValues={{
        phone: '',
        firstTime: false,
      }}
      onSubmit={(values) => {
        setFirstTime(values.firstTime);
        setPhone(values.phone);
      }}
    >
      {(props) => (
        <Form>
          <Stack spacing='6'>
            <FormTextInput
              aria-label='Phone Number'
              label='رقم الهاتف'
              name='phone'
              type='phone'
              placeholder='+9661231234567'
            />
            <FormCheckBox
              aria-label='Select If First Time User'
              name='firstTime'
              type='checkbox'
              text='مستخدم جديد'
            />
            <Button
              type='submit'
              bg='brandPink.100'
              color='brandGrey.500'
              size='lg'
              _hover={{ filter: 'brightness(110%)' }}
            >
              يقدم
            </Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
};

export default PhoneLogin;
