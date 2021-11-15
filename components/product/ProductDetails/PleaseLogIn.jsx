import { Button } from '@chakra-ui/react';

const PleaseLogIn = () => {
  const handleLogIn = () => {
    console.log('Please Log In');
  };

  return (
    <Button
      onClick={handleLogIn}
      bg='brandPink.100'
      color='brandGrey.500'
      size='lg'
      _hover={{ filter: 'brightness(110%)' }}
    >
      الرجاء تسجيل الدخول
    </Button>
  );
};

export default PleaseLogIn;
