import Image from 'next/image';
import { AspectRatio } from '@chakra-ui/react';
import styled from '@emotion/styled';

const ImageRadius = styled(Image)`
  border-top-left-radius: 0.75rem;
  border-top-right-radius: 0.75rem;
`;

const ProductCardImage = ({ image, ratio, objectFit, ...rest }) => {
  return (
    <AspectRatio ratio={ratio} borderTopRadius='xl' {...rest}>
      <ImageRadius
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

export default ProductCardImage;
