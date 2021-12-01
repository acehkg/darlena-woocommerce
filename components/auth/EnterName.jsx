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
              label='الاسم الأول'
              name='firstName'
              type='text'
              placeholder='John'
            />
            <FormTextInput
              aria-label='Last Name'
              label='الكنية'
              name='lastName'
              type='text'
              placeholder='Doe'
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

export default EnterName;
