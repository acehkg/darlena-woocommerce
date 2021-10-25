import Image from 'next/image';
import { AspectRatio } from '@chakra-ui/react';

const NextImageAspectRatio = ({ image, ratio }) => {
  return (
    <AspectRatio ratio={ratio}>
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
