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
      />
    </AspectRatio>
  );
};

export default NextImageAspectRatio;
