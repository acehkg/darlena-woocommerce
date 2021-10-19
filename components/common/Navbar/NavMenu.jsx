import { Box, Flex, HStack } from '@chakra-ui/react';
import * as React from 'react';
import { useCategories } from '../../../hooks/useCategories';
import { NavItem } from './NavItem';

const MobileNavMenu = (props) => {
  const { isOpen, categories } = props;
  const { organinzedCategories } = useCategories(categories);
  return (
    <Flex
      hidden={!isOpen}
      as='nav'
      direction='column'
      bg='brandGrey.200'
      position='fixed'
      height='calc(100vh - 4rem)'
      top='32'
      insetX='0'
      zIndex={10}
      w='75%'
      mr='25%'
    >
      <Box px='4'>
        {organinzedCategories.map((c) => {
          return (
            <NavItem.Mobile
              key={c.id}
              label={c.name}
              href={`/category/${c.slug}`}
            />
          );
        })}
      </Box>
    </Flex>
  );
};

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
            href={`/category/${c.slug}`}
          />
        );
      })}
    </HStack>
  );
};

export const NavMenu = {
  Mobile: MobileNavMenu,
  Desktop: DesktopNavMenu,
};
