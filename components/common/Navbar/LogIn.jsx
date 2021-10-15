import { HStack, Box, Link } from '@chakra-ui/react';
import { RiLoginCircleLine } from 'react-icons/ri';

const LogIn = ({ href }) => {
  return (
    <>
      <HStack
        as='button'
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
        <Link href={href} aria-hidden fontSize='md'>
          <RiLoginCircleLine />
        </Link>

        <Box fontWeight='semibold'>LOG IN</Box>
      </HStack>
    </>
  );
};

export default LogIn;
