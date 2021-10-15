import dynamic from 'next/dynamic';

import { Logo } from './Logo';
import { MobileHamburgerMenu } from './MobileHamburgerMenu';
import { NavMenu } from './NavMenu';
import { Notification } from './Notification';
import { ProfileDropdown } from './ProfileDropdown';
import { Flex, HStack } from '@chakra-ui/react';
import LogIn from './LogIn';
import { Spinner } from '@chakra-ui/react';
import { useMobileMenuState } from '../../../hooks/useMobileMenuState';

import useAuth from '../../../hooks/useAuth';
import useCustomer from '../../../hooks/useCustomer';
import { useCustomerData } from '../../../hooks/useCustomerData';

const Navbar = () => {
  const { loggedIn, user } = useAuth();
  const { loading, customer, error } = useCustomer();
  const { paymentBadgeValue } = useCustomerData(customer);
  const { isMenuOpen, toggle } = useMobileMenuState();

  return (
    <>
      <Flex align='center' bg='brandGrey.200' color='white' p='6' minH='16'>
        <Flex justify='space-between' align='center' w='full'>
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
          {/* Mobile Logo placement */}
          <Logo
            flex={{
              base: '1',
              lg: '0',
            }}
            display={{
              lg: 'none',
            }}
            flexShrink={0}
            h='20'
          />
          {/* Desktop Navigation Menu */}
          <NavMenu.Desktop />

          {/* Desktop Logo placement */}
          <Logo
            display={{
              base: 'none',
              lg: 'block',
            }}
            flexShrink={0}
            h='20'
            marginEnd='10'
          />
          <MobileHamburgerMenu onClick={toggle} isOpen={isMenuOpen} />
          <NavMenu.Mobile isOpen={isMenuOpen} />
        </Flex>
      </Flex>
    </>
  );
};
export default Navbar;
