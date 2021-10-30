import { HStack } from '@chakra-ui/react';
import * as React from 'react';
import { useCategories } from '../../../hooks/useCategories';
import { NavItem } from './NavItem';

const DesktopNavMenu = ({ categories }) => {
  return (
    <HStack
      justifyContent='center'
      spacing='8'
      as='nav'
      display={{
        base: 'none',
        lg: 'flex',
      }}
      zIndex='1'
    >
      {categories.map((c) => {
        return (
          <NavItem.Desktop
            key={c.id}
            label={c.name}
            href={`/collection/${c.slug}`}
          />
        );
      })}
    </HStack>
  );
};

export default DesktopNavMenu;
