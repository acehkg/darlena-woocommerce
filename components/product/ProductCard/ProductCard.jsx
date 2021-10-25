import {
  Box,
  HStack,
  Skeleton,
  Stack,
  Tag,
  Text,
  AspectRatio,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FavouriteButton } from './FavoriteButton';
import { useProduct } from '../../../hooks/useProduct';
import { PriceTag } from './PriceTag';
import { ProductButtonGroup } from './ProductButtonGroup';
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
      <Box position='relative' className='group'>
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
        <Box
          opacity='0'
          transition='opacity 0.1s'
          _groupHover={{
            opacity: 1,
          }}
          position='absolute'
          bottom='3'
          left='3'
          right='3'
          bg='brandGrey.400'
          borderRadius='md'
          padding='1.5'
        >
          <ProductButtonGroup id={product?.id} />
        </Box>
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
