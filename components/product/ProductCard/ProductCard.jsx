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
import ProductCardImage from '../../common/Image/ProductCardImage';

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
      boxShadow='lg'
      pb='2rem'
      borderRadius='xl'
    >
      <Box position='relative' className='group' h='100%' w='100%'>
        <ProductCardImage
          image={product.image}
          ratio={3 / 4}
          objectFit='cover'
        />

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
          bg='brandPink.100'
          borderRadius='xl'
          padding='1.5'
        >
          <ProductButtonGroup id={product?.id} />
        </Box>
      </Box>
      <Stack direction='row' px='1rem' justifyContent='space-between'>
        <Text fontWeight='medium'>{product.name}</Text>

        {isLoading ? (
          <Skeleton height='1rem' width='100%' />
        ) : (
          <PriceTag
            currency='SAR'
            price={data?.product?.regularPrice}
            priceProps={{
              color: 'brandGold.100',
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
