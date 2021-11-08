import Link from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';

export const NavLink = ({ href, children, ...rest }) => {
  return (
    <Link href={href} passHref>
      <ChakraLink {...rest}>{children}</ChakraLink>
    </Link>
  );
};
