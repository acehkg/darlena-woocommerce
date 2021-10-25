import {
  Box,
  HStack,
  Skeleton,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  AspectRatio,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FavouriteButton } from './FavoriteButton';
import { useProduct } from '../../../hooks/useProduct';
import { PriceTag } from './PriceTag';
import NextImageAspectRatio from '../../common/Image/NextImageAspectRatio';

export const ProductCard = ({ product }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { data, loading, error } = useProduct(product);
  useEffect(() => {
    if (data && !error && !loading) {
      setIsLoading(false);
    }
  }, [data, loading, error]);

  return (
    <Stack
      spacing={{
        base: '3',
        md: '5',
      }}
    >
      <Box position='relative'>
        <>
          {isLoading ? (
            <AspectRatio ratio={3 / 4}>
              <Skeleton />
            </AspectRatio>
          ) : (
            <NextImageAspectRatio image={product.image} ratio={3 / 4} />
          )}
        </>
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
        {isLoading ? (
          <Skeleton height='1rem' width='100%' />
        ) : (
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
