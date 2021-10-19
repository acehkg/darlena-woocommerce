import Link from 'next/link';
import { Box, HStack } from '@chakra-ui/react';

const DesktopNavItem = (props) => {
  const { icon, label, href, active } = props;
  return (
    <Link href={href} passHref>
      <HStack
        as='a'
        aria-current={active ? 'page' : undefined}
        spacing='2'
        px='3'
        py='2'
        rounded='md'
        transition='all 0.2s'
        color='gray.200'
        _hover={{
          bg: 'whiteAlpha.200',
        }}
        _activeLink={{
          bg: 'blackAlpha.300',
          color: 'white',
        }}
      >
        {icon && (
          <Box aria-hidden fontSize='md'>
            {icon}
          </Box>
        )}
        <Box fontWeight='semibold'>{label}</Box>
      </HStack>
    </Link>
  );
};

const MobileNavItem = (props) => {
  const { label, href, active } = props;
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

export const NavItem = {
  Desktop: DesktopNavItem,
  Mobile: MobileNavItem,
};
