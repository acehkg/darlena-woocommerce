import { AiOutlineShopping, AiOutlineHeart } from 'react-icons/ai';
import { HStack, Icon } from '@chakra-ui/react';

import { ProfileDropdown } from './ProfileDropdown';
import { Notification } from './Notification';

const IconGroup = ({ id, firstName, email, ...rest }) => {
  return (
    <HStack zIndex='1' fontSize='1.5rem' {...rest}>
      <Notification />
      <ProfileDropdown firstName={firstName} id={id} email={email} />
      <Icon as={AiOutlineHeart} />
    </HStack>
  );
};

export default IconGroup;
