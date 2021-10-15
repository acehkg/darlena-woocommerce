import { Box, Flex, HStack } from '@chakra-ui/react';
import * as React from 'react';
import { MdCategory, MdOutlineCategory, MdStorefront } from 'react-icons/md';
import { HiOutlineShoppingBag } from 'react-icons/hi';
import { NavItem } from './NavItem';

const MobileNavMenu = (props) => {
  const { isOpen, categories } = props;
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
        {categories.map((c) => {
          return <NavItem.Mobile key={c.id} label={c.name} />;
        })}
      </Box>
    </Flex>
  );
};

const DesktopNavMenu = ({ categories }) => {
  return (
    <HStack
      spacing='3'
      //flex="1"
      display={{
        base: 'none',
        lg: 'flex',
      }}
    >
      {categories.map((c) => {
        return <NavItem.Desktop key={c.id} label={c.name} />;
      })}
    </HStack>
  );
};

export const NavMenu = {
  Mobile: MobileNavMenu,
  Desktop: DesktopNavMenu,
};
