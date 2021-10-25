import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react';

import Link from 'next/link';

import { useCategories } from '../../../hooks/useCategories';

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
  const { organinzedCategories } = useCategories(categories);
  return (
    <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader></DrawerHeader>
        <DrawerBody>
          {organinzedCategories.map((c) => (
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
