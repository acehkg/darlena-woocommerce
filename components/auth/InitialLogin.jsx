import { VStack, HStack, Text, Image, Box } from '@chakra-ui/react';
import useLogin from '../../hooks/useLogin';

const InitialLogin = () => {
  const { selectPhoneLogin, selectEmailLogin } = useLogin();

  return (
    <VStack spacing='3rem'>
      <Image boxSize='10rem' alt='User Login Imgage' src='/login-user.svg' />
      <Text>تسجيل الدخول</Text>
      <Text>اختر الطريقة المناسبة</Text>
      <HStack spacing='2rem'>
        <Box
          boxSize='10rem'
          borderRadius='xl'
          boxShadow='xl'
          border='1px'
          borderColor='brandGrey.500'
          onClick={selectEmailLogin}
        >
          <VStack p='1rem' h='100%' justify='center' spacing='1rem'>
            <Image
              boxSize='5rem'
              alt='Login Using Email'
              src='/login-email.svg'
            />
            <Text>البريد الالكتروني</Text>
          </VStack>
        </Box>

        <Box
          boxSize='10rem'
          boxShadow='xl'
          borderRadius='xl'
          border='1px'
          borderColor='brandGrey.500'
          onClick={selectPhoneLogin}
        >
          <VStack p='1rem' h='100%' justify='center' spacing='1rem'>
            <Image
              boxSize='5rem'
              alt='Login Using Phone'
              src='/login-phone.svg'
            />
            <Text>الجوال</Text>
          </VStack>
        </Box>
      </HStack>
    </VStack>
  );
};

export default InitialLogin;
