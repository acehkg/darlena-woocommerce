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

const MobileNavItem = ({ label, href, active, onClose }) => {
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
        onClick={onClose}
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
              onClose={onClose}
            />
          ))}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileDrawer;
