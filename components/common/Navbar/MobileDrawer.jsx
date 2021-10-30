import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import SearchInput from './SearchInput';

import Link from 'next/link';

const MobileNavItem = ({ label, href, active }) => {
  return (
    <Link href={href} passHref>
      <Box
        as='a'
        display='block'
        href={href}
        px='3'
        py='3'
        rounded='md'
        fontWeight='semibold'
        aria-current={active ? 'page' : undefined}
        _hover={{
          bg: 'whiteAlpha.200',
        }}
        _activeLink={{
          bg: 'blackAlpha.300',
          color: 'white',
        }}
      >
        {label}
      </Box>
    </Link>
  );
};

const MobileDrawer = ({ isOpen, onClose, categories }) => {
  return (
    <Drawer isOpen={isOpen} placement='right' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody as='nav'>
          <SearchInput color='brandGrey.500' my='1rem' />
          {categories.map((c) => (
            <MobileNavItem
              key={c.id}
              href={`/collection/${c.slug}`}
              label={c.name}
            />
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
