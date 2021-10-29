import { Box } from '@chakra-ui/react';
import { HiOutlineMenu } from 'react-icons/hi';

export const MobileHamburgerMenu = ({ onOpen }) => {
  return (
    <Box
      display={{
        lg: 'none',
      }}
      zIndex='1'
    >
      <Box as='button' onClick={onOpen} p='2' fontSize='2rem'>
        <Box aria-hidden as={HiOutlineMenu} />
        <Box srOnly>{'Open menu'}</Box>
      </Box>
    </Box>
  );
};
