import { Box, Flex, HStack } from '@chakra-ui/react';
import * as React from 'react';
import { MdOutlineCategory, MdStorefront } from 'react-icons/md';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { NavItem } from './NavItem';

const MobileNavMenu = (props) => {
  const { isOpen } = props;
  return (
    <Flex
      hidden={!isOpen}
      as='nav'
      direction='column'
      bg='#414042'
      position='fixed'
      height='calc(100vh - 4rem)'
      top='32'
      insetX='0'
      zIndex={10}
      w='full'
    >
      <Box px='4'>
        <NavItem.Mobile label='Categories' />
        <NavItem.Mobile label='All Products' />
        <NavItem.Mobile label='Cart' />
      </Box>
    </Flex>
  );
};

const DesktopNavMenu = () => (
  <HStack
    spacing='3'
    //flex="1"
    display={{
      base: 'none',
      lg: 'flex',
    }}
  >
    <NavItem.Desktop icon={<MdOutlineCategory />} label='Categories' />
    <NavItem.Desktop icon={<MdStorefront />} label='All Products' />
    <NavItem.Desktop icon={<HiOutlineShoppingBag />} label='Cart' />
  </HStack>
);

export const NavMenu = {
  Mobile: MobileNavMenu,
  Desktop: DesktopNavMenu,
};
