import Link from 'next/link';
import { Box, HStack } from '@chakra-ui/react';

const DesktopNavItem = (props) => {
  const { icon, label, href, active } = props;
  return (
    <Link href={href} passHref>
      <Box fontWeight='semibold'>{label}</Box>
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
