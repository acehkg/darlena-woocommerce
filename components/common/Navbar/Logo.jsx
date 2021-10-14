import { Image } from '@chakra-ui/react';

export const Logo = ({ ...rest }) => (
  <Image boxSize='150px' src='/logo-svg.svg' alt='Company Logo' {...rest} />
);
