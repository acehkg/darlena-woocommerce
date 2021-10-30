import Image from 'next/image';
import { AspectRatio } from '@chakra-ui/react';

const NextImageAspectRatio = ({ image, ratio, objectFit, ...rest }) => {
  return (
    <AspectRatio ratio={ratio} {...rest}>
      <Image
        alt={image.alt}
        src={image.sourceUrl}
        layout='fill'
        objectFit={objectFit}
        blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
        placeholder='blur'
      />
    </AspectRatio>
  );
};

export default NextImageAspectRatio;
