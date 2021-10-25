import Image from 'next/image';
import { Box, Skeleton } from '@chakra-ui/react';

const NextImage = ({ image, ...rest }) => {
  return (
    <Box draggable='false' {...rest}>
      <Image
        alt={image.alt}
        src={image.sourceUrl}
        height={image.mediaDetails.height}
        width={image.mediaDetails.width}
        layout='responsive'
      />
    </Box>
  );
};

export default NextImage;