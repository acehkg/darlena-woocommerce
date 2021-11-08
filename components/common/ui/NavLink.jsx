import Link from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

export const NavLink = ({ href, children, ...rest }) => {
  return (
    <ChakraLink as={Link} href={href} {...rest}>
      {children}
    </ChakraLink>
  );
};
