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
} from '@chakra-ui/react';
import { RiLogoutCircleLine } from 'react-icons/ri';
import QueryResult from '../QueryResults';
//auth and customer info
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER } from '../../hooks/useAuth';
import { LOG_OUT } from '../../lib/mutations';
import { GET_CUSTOMER_INFO } from '../../lib/queries';

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
  const [customer, setCustomer] = useState({});
  //fetch customer data and set state when not loading
  const { data, loading, error } = useQuery(GET_CUSTOMER_INFO);

  return (
    <Menu>
      <ProfileMenuButton />
      <QueryResult error={error} loading={loading} data={data}>
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
              <Text fontWeight='semibold'>{data?.customer.firstName}</Text>
              <Text mt='1' fontSize='xs' color='gray.500'>
                {data?.customer.email}
              </Text>
            </Box>
          </HStack>
          <MenuItem fontWeight='medium'>All Orders</MenuItem>
          <MenuItem fontWeight='medium'>Orders For Payment</MenuItem>
          <MenuItem fontWeight='medium'>Favorites</MenuItem>
          <MenuItem fontWeight='medium'>Account Settings</MenuItem>
          <LogOutButton />
        </MenuList>
      </QueryResult>
    </Menu>
  );
};
