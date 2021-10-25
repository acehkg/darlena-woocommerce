import Image from 'next/image';
import { AspectRatio } from '@chakra-ui/react';

const NextImageAspectRatio = ({ image, ratio, ...rest }) => {
  return (
    <AspectRatio ratio={ratio} {...rest}>
      <Image
        alt={image.alt}
        src={image.sourceUrl}
        layout='fill'
        objectFit='cover'
      />
    </AspectRatio>
  );
};

export default NextImageAspectRatio;
