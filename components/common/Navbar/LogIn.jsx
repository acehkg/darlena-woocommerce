import { Icon } from '@chakra-ui/react';
import { AiOutlineUser } from 'react-icons/ai';

const LogIn = ({ onOpen }) => {
  return (
    <Icon
      as={AiOutlineUser}
      fontSize='2rem'
      onClick={onOpen}
      zIndex='1000'
      cursor='pointer'
    />
  );
};

export default LogIn;
