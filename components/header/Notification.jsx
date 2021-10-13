import { Box, Center } from '@chakra-ui/react';
import * as React from 'react';
import { FaBell } from 'react-icons/fa';

const NotificationBadge = ({ children }) => (
  <Center
    bg='red.500'
    fontSize='xs'
    fontWeight='bold'
    position='absolute'
    rounded='full'
    textAlign='center'
    top='-2px'
    insetEnd='0'
    w='18px'
    h='18px'
  >
    {children}
  </Center>
);

export const Notification = ({ paymentBadgeValue }) => {
  return (
    <Center
      as='button'
      outline='0'
      w='8'
      h='8'
      position='relative'
      rounded='md'
      _hover={{
        bg: 'whiteAlpha.200',
      }}
      _focus={{
        shadow: 'outline',
      }}
    >
      <Box srOnly>{paymentBadgeValue} orders need payment</Box>
      <NotificationBadge>{paymentBadgeValue}</NotificationBadge>
      <Box as={FaBell} fontSize='lg' />
    </Center>
  );
};
