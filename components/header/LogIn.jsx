import { HStack, Box, useDisclosure } from '@chakra-ui/react';
import { RiLoginCircleLine } from 'react-icons/ri';
import LogInModal from '../modals/LogInModal';

const LogIn = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <HStack
        as='button'
        onClick={onOpen}
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
      <LogInModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default LogIn;
