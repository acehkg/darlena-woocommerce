import { NavLink } from '../ui/NavLink';
import { Image } from '@chakra-ui/react';

export const Logo = ({ ...rest }) => (
  <NavLink href={'/'}>
    <Image src='/logo-svg.svg' alt='Company Logo' {...rest} />
  </NavLink>
);
