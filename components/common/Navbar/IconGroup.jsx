import { AiOutlineShopping, AiOutlineHeart } from 'react-icons/ai';
import { HStack, Icon } from '@chakra-ui/react';

import { ProfileDropdown } from './ProfileDropdown';
import { Notification } from './Notification';

const IconGroup = ({ paymentBadgeValue, id, firstName, email, ...rest }) => {
  return (
    <HStack zIndex='1' fontSize='1.5rem' {...rest}>
      <Notification paymentBadgeValue={paymentBadgeValue} />
      <ProfileDropdown
        paymentBadgeValue={paymentBadgeValue}
        firstName={firstName}
        id={id}
        email={email}
      />
      <Icon as={AiOutlineHeart} />
      <Icon as={AiOutlineShopping} />
    </HStack>
  );
};

export default IconGroup;
