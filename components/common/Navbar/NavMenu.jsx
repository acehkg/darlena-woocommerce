import { HStack } from '@chakra-ui/react';
import * as React from 'react';
import { useCategories } from '../../../hooks/useCategories';
import { NavItem } from './NavItem';

const DesktopNavMenu = ({ categories }) => {
  const { organinzedCategories } = useCategories(categories);

  return (
    <HStack
      spacing='3'
      //flex="1"
      display={{
        base: 'none',
        lg: 'flex',
      }}
    >
      {organinzedCategories.map((c) => {
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

export const NavMenu = {
  Desktop: DesktopNavMenu,
};
