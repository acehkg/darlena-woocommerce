import { useRouter } from 'next/router';

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
} from '@chakra-ui/react';
import { RiLogoutCircleLine } from 'react-icons/ri';

import NavLink from '../routing/NavLink';

//auth and customer info
import { useMutation } from '@apollo/client';
import { GET_USER, GET_CUSTOMER } from '../../hooks/useAuth';
import { LOG_OUT } from '../../lib/mutations';

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

const OrdersForPayment = ({ paymentBadgeValue }) => {
  return (
    <MenuItem fontWeight='medium'>
      Orders For Payment
      <Badge colorScheme='red' ml='2'>
        {paymentBadgeValue}
      </Badge>
    </MenuItem>
  );
};

const LogOutButton = () => {
  const router = useRouter();

  //handle logging the user out
  const [logOut, { client, called, loading, error, data }] = useMutation(
    LOG_OUT,
    {
      refetchQueries: [{ query: GET_USER }, { query: GET_CUSTOMER }],
    }
  );
  const handleLogout = () => {
    logOut().then(() => client.resetStore());
    router.push('/');
  };

  return (
    <MenuItem onClick={handleLogout}>
      <RiLogoutCircleLine />
    </MenuItem>
  );
};

export const ProfileDropdown = ({
  paymentBadgeValue,
  firstName,
  email,
  id,
}) => {
  return (
    <Menu>
      <ProfileMenuButton />
      <MenuList rounded='md' shadow='lg' py='1' color='gray.600' fontSize='sm'>
        <HStack px='3' py='4'>
          <UserAvatar />
          <Box lineHeight='1'>
            <Text fontWeight='semibold'>{firstName ?? ''}</Text>
            <Text mt='1' fontSize='xs' color='gray.500'>
              {email ?? ''}
            </Text>
          </Box>
        </HStack>
        <MenuItem fontWeight='medium'>All Orders</MenuItem>
        <OrdersForPayment paymentBadgeValue={paymentBadgeValue} />
        <MenuItem fontWeight='medium'>Favorites</MenuItem>
        <MenuItem fontWeight='medium'>
          <NavLink href={`/customer/${id}`}>Account Settings</NavLink>
        </MenuItem>
        <LogOutButton />
      </MenuList>
    </Menu>
  );
};
