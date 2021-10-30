import Image from 'next/image';
import { Box } from '@chakra-ui/react';

const NextImage = ({ image, ...rest }) => {
  return (
    <Box {...rest}>
      <Image
        alt={image.alt}
        src={image.sourceUrl}
        height={image.mediaDetails.height}
        width={image.mediaDetails.width}
        layout='responsive'
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
        placeholder='blur'
      />
    </Box>
  );
};

export default NextImage;
