import { Box, useColorModeValue } from '@chakra-ui/react';

export const Card = (props) => (
  <Box
    bg='white'
    py='8'
    px={{
      base: '4',
      md: '10',
    }}
    rounded={{
      sm: 'lg',
    }}
    {...props}
  />
);