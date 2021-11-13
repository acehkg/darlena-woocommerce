import NextImageAspectRatio from '../common/Image/NextImageAspectRatio';
import { Box } from '@chakra-ui/react';

export const CartImage = ({ image, ...rest }) => {
  return (
    <Box {...rest}>
      <NextImageAspectRatio image={image} objectFit='cover' ratio={1 / 1} />
    </Box>
  );
};
