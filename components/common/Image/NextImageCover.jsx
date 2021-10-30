import Image from 'next/image';
import { Box } from '@chakra-ui/react';

const NextImageCover = ({ image, ...rest }) => {
  return (
    <Box {...rest}>
      <Box position='relative' h='100%' w='100%'>
        <Image
          alt={image.alt}
          src={image.sourceUrl}
          layout='fill'
          objectFit='cover'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
          placeholder='blur'
        />
      </Box>
    </Box>
  );
};

export default NextImageCover;
