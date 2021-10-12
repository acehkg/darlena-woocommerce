import { useEffect, useState } from 'react';
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Menu,
  MenuItem,
  MenuList,
  Text,
  useMenuButton,
  Badge,
  Spinner,
} from '@chakra-ui/react';
import { RiLogoutCircleLine } from 'react-icons/ri';

//auth and customer info
import { useMutation } from '@apollo/client';
import { GET_USER } from '../../hooks/useAuth';
import { LOG_OUT } from '../../lib/mutations';
import useAuth from '../../hooks/useAuth';

const UserAvatar = ({ name }) => <Avatar size='sm' name={name} />;

const ProfileMenuButton = (props) => {
  const buttonProps = useMenuButton(props);
  return (
    <Flex
      {...buttonProps}
      as='button'
      flexShrink={0}
      rounded='full'
      outline='0'
      _focus={{
        shadow: 'outline',
      }}
    >
      <Box srOnly>Open user menu</Box>
      <UserAvatar />
    </Flex>
  );
};

const OrdersForPayment = ({ orders }) => {
  const [badgeValue, setBadgeValue] = useState(0);
  //create an array of boolean value of all orders and filter for true
  useEffect(() => {
    const customerOrders = orders?.edges?.map(({ node }) => {
      return node.needsPayment;
    });
    const needsPayment = customerOrders?.filter(Boolean);
    setBadgeValue(needsPayment?.length);
  }, [orders]);

  return (
    <MenuItem fontWeight='medium'>
      Orders For Payment
      <Badge colorScheme='red' ml='2'>
        {badgeValue}
      </Badge>
    </MenuItem>
  );
};

const LogOutButton = () => {
  //handle logging the user out
  const [logOut, { client, called, loading, error, data }] = useMutation(
    LOG_OUT,
    {
      refetchQueries: [{ query: GET_USER }],
    }
  );
  const handleLogout = () => {
    logOut().then(() => client.resetStore());
  };

  return (
    <MenuItem onClick={handleLogout}>
      <RiLogoutCircleLine />
    </MenuItem>
  );
};

export const ProfileDropdown = () => {
  const { customerData, customerLoading } = useAuth();

  return (
    <Menu>
      <ProfileMenuButton />
      {customerLoading ? (
        <h1>Loading...</h1>
      ) : (
        <MenuList
          rounded='md'
          shadow='lg'
          py='1'
          color='gray.600'
          fontSize='sm'
        >
          <HStack px='3' py='4'>
            <UserAvatar />
            <Box lineHeight='1'>
              <Text fontWeight='semibold'>
                {customerData?.customer.firstName ?? ''}
              </Text>
              <Text mt='1' fontSize='xs' color='gray.500'>
                {customerData?.customer.email ?? ''}
              </Text>
            </Box>
          </HStack>
          <MenuItem fontWeight='medium'>All Orders</MenuItem>
          <OrdersForPayment orders={customerData?.customer.orders} />
          <MenuItem fontWeight='medium'>Favorites</MenuItem>
          <MenuItem fontWeight='medium'>Account Settings</MenuItem>
          <LogOutButton />
        </MenuList>
      )}
    </Menu>
  );
};
