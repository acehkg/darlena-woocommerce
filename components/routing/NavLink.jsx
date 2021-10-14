import { Link as NextLink } from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

const NavLink = ({ href, children, ...rest }) => {
  return (
    <ChakraLink as={NextLink} href={href} {...rest}>
      {children}
    </ChakraLink>
  );
};

export default NavLink;
