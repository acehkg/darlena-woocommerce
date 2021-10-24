import {
  AspectRatio,
  Box,
  Image,
  HStack,
  Skeleton,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { FavouriteButton } from './FavoriteButton';
import { useProduct } from '../../../hooks/useProduct';
import { PriceTag } from './PriceTag';

export const ProductCard = ({ product }) => {
  const { data, loading, error } = useProduct(product);

  return (
    <Stack
      spacing={{
        base: '3',
        md: '5',
      }}
    >
      <Box position='relative'>
        <AspectRatio ratio={3 / 4}>
          <Image
            src={product.image.sourceUrl}
            alt={product.name}
            draggable='false'
            fallback={<Skeleton />}
          />
        </AspectRatio>
        <FavouriteButton
          position='absolute'
          top='3'
          right='3'
          aria-label={`Add ${product.name} to your favourites`}
        />
        <HStack spacing='3' position='absolute' bottom='3' left='3'>
          {data?.product?.productTags?.nodes?.map((tag) => (
            <Tag
              key={tag.name}
              bg='brandPink.100'
              color='white'
              fontWeight='semibold'
            >
              {tag.name}
            </Tag>
          ))}
        </HStack>
      </Box>
      <Stack>
        <Stack spacing='0.25'>
          <Text fontSize='sm' color={useColorModeValue('gray.600', 'gray.300')}>
            {product.blue}
          </Text>
          <Text fontWeight='medium'>{product.name}</Text>
        </Stack>
        {loading || error ? null : (
          <PriceTag
            currency='SAR'
            price={data?.product?.regularPrice}
            priceProps={{
              color: 'gray.800',
            }}
            salePrice={data?.product?.salePrice}
            salePriceProps={{
              color: 'red.500',
              fontWeight: 'bold',
            }}
          />
        )}
      </Stack>
    </Stack>
  );
};
