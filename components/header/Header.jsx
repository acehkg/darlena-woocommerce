import { Logo } from './Logo';
import { MobileHamburgerMenu } from './MobileHamburgerMenu';
import { NavMenu } from './NavMenu';
import { Notification } from './Notification';
import { ProfileDropdown } from './ProfileDropdown';
import { Flex, HStack } from '@chakra-ui/react';
import LogIn from './LogIn';

//auth
import useAuth from '../../hooks/useAuth';

const Header = ({ isMenuOpen, toggle }) => {
  const { loggedIn, loading } = useAuth();

  return (
    <Flex align='center' bg='#414042' color='white' p='6' minH='16'>
      <Flex justify='space-between' align='center' w='full'>
        {loggedIn ? (
          <HStack spacing='3'>
            <Notification
              display={{
                base: 'none',
                lg: 'inline-flex',
              }}
            />
            <ProfileDropdown />
          </HStack>
        ) : (
          <LogIn href='#' />
        )}

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
  );
};
export default Header;
