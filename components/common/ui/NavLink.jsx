import { Link as NextLink } from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

export const NavLink = ({ href, children, ...rest }) => {
  return (
    <ChakraLink as={NextLink} href={href} {...rest}>
      {children}
    </ChakraLink>
  );
};
