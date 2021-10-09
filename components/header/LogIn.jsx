import { HStack, Box } from '@chakra-ui/react';
import { RiLoginCircleLine } from 'react-icons/ri';

const LogIn = ({ href }) => {
  return (
    <HStack
      as='a'
      href={href}
      spacing='2'
      px='3'
      py='2'
      rounded='md'
      transition='all 0.2s'
      color='gray.200'
      _hover={{
        bg: 'whiteAlpha.200',
      }}
      _activeLink={{
        bg: 'blackAlpha.300',
        color: 'white',
      }}
    >
      <Box aria-hidden fontSize='md'>
        <RiLoginCircleLine />
      </Box>

      <Box fontWeight='semibold'>LOG IN</Box>
    </HStack>
  );
};

export default LogIn;
