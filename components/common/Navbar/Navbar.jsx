import dynamic from 'next/dynamic';
import {
  Flex,
  Stack,
  HStack,
  useDisclosure,
  Spinner,
  Image,
} from '@chakra-ui/react';

import { Logo } from './Logo';
import { MobileHamburgerMenu } from './MobileHamburgerMenu';
import { NavMenu } from './NavMenu';
import CircleGraphics from './CircleGraphics';

const MobileDrawer = dynamic(() => import('./MobileDrawer'));
const IconGroup = dynamic(() => import('./IconGroup'));
const SearchInput = dynamic(() => import('./SearchInput'));

import useAuth from '../../../hooks/useAuth';
import useCustomer from '../../../hooks/useCustomer';
import { useCustomerData } from '../../../hooks/useCustomerData';

const Navbar = ({ categories }) => {
  const { loggedIn, user } = useAuth();
  const { loading, customer, error } = useCustomer();
  const { paymentBadgeValue } = useCustomerData(customer);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex
      direction='column'
      justifyContent='center'
      alignItems={{ base: 'center', lg: 'unset' }}
      as='header'
      position='relative'
      bg='brandGrey.200'
      color='white'
      height={{ base: '10rem', lg: '12.5rem' }}
      w='100%'
    >
      <CircleGraphics />
      <Logo boxSize='5rem' display={{ base: 'block', md: 'none' }} />
      <Stack
        direction={{ base: 'row', md: 'row' }}
        justifyContent={{ base: 'space-around', lg: 'space-evenly' }}
        w='80%'
        mx='auto'
        alignItems='center'
      >
        <MobileHamburgerMenu onOpen={onOpen} isOpen={isOpen} />
        <MobileDrawer
          isOpen={isOpen}
          onClose={onClose}
          categories={categories}
        />
        <Logo boxSize='6rem' display={{ base: 'none', md: 'block' }} />

        <Flex
          direction='column'
          w='100%'
          alignItems='center'
          justifyContent='center'
          display={{
            base: 'none',
            lg: 'flex',
          }}
        >
          <SearchInput w='80%' mx='auto' />
        </Flex>

        <IconGroup
          paymentBadgeValue={paymentBadgeValue}
          id={user?.id}
          email={user?.email}
          firstName={user?.firstName}
        />
      </Stack>
      <NavMenu.Desktop categories={categories} />
    </Flex>
  );
};
export default Navbar;
