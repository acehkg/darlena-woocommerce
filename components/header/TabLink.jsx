import * as React from 'react';
import { chakra } from '@chakra-ui/react';

export const TabLink = (props) => (
  <chakra.a
    fontWeight='semibold'
    px='4'
    py='3'
    color='gray.600'
    borderBottom='2px solid transparent'
    transition='all 0.2s'
    _hover={{
      borderColor: mode('gray.400', 'gray.600'),
    }}
    _activeLink={{
      color: mode('blue.600', 'blue.400'),
      borderColor: 'currentColor',
    }}
    {...props}
  />
);
