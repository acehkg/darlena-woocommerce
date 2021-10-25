import { Box } from '@chakra-ui/react';
import { HiOutlineMenu } from 'react-icons/hi';

export const MobileHamburgerMenu = ({ onOpen }) => {
  return (
    <Box
      ms='-4'
      minW={{
        base: '12',
        lg: '76px',
      }}
      display={{
        lg: 'none',
      }}
    >
      <Box as='button' onClick={onOpen} p='2' fontSize='xl'>
        <Box aria-hidden as={HiOutlineMenu} />
        <Box srOnly>{'Open menu'}</Box>
      </Box>
    </Box>
  );
};
