import dynamic from 'next/dynamic';
import { Flex, HStack, useDisclosure, Spinner } from '@chakra-ui/react';

import { Logo } from './Logo';
import { MobileHamburgerMenu } from './MobileHamburgerMenu';
import { NavMenu } from './NavMenu';
import LogIn from './LogIn';
//import { Notification } from './Notification';
//import { ProfileDropdown } from './ProfileDropdown';
//import MobileDrawer from './MobileDrawer';
const ProfileDropdown = dynamic(() =>
  import('./ProfileDropdown').then((mod) => mod.ProfileDropdown)
);
const Notification = dynamic(() =>
  import('./Notification').then((mod) => mod.Notification)
);
const MobileDrawer = dynamic(() => import('./MobileDrawer'));

import useAuth from '../../../hooks/useAuth';
import useCustomer from '../../../hooks/useCustomer';
import { useCustomerData } from '../../../hooks/useCustomerData';

const Navbar = ({ categories }) => {
  const { loggedIn, user } = useAuth();
  const { loading, customer, error } = useCustomer();
  const { paymentBadgeValue } = useCustomerData(customer);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex
        align='center'
        bg='brandGrey.200'
        color='white'
        p='6'
        minH='16'
        justifyContent='space-between'
      >
        <Logo h='20' />
        {/* Desktop Navigation Menu */}
        <NavMenu.Desktop categories={categories} />
        <>
          {loggedIn ? (
            <>
              {loading ? (
                <Spinner />
              ) : (
                <HStack spacing='3'>
                  <Notification
                    display={{
                      base: 'none',
                      lg: 'inline-flex',
                    }}
                    paymentBadgeValue={paymentBadgeValue}
                  />
                  <ProfileDropdown
                    paymentBadgeValue={paymentBadgeValue}
                    firstName={user?.firstName}
                    email={user?.email}
                    id={customer?.id}
                  />
                </HStack>
              )}
            </>
          ) : (
            <LogIn href='#' />
          )}
        </>

        <MobileHamburgerMenu onOpen={onOpen} isOpen={isOpen} />
        <MobileDrawer
          isOpen={isOpen}
          onClose={onClose}
          categories={categories}
        />
      </Flex>
    </>
  );
};
export default Navbar;
