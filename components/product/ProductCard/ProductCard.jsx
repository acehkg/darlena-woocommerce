import Link from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Box, Skeleton, Stack, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FavouriteButton } from './FavoriteButton';
import { useProduct } from '../../../hooks/useProduct';
import { PriceTag } from './PriceTag';
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
    <>
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
          <Link href={`/${product.id}`} passHref>
            <ChakraLink
              transition='.5s'
              _hover={{
                filter: 'brightness(80%)',
              }}
            >
              <ProductCardImage
                image={product.image}
                ratio={3 / 4}
                objectFit='cover'
              />
            </ChakraLink>
          </Link>
          <FavouriteButton
            position='absolute'
            top='3'
            right='3'
            aria-label={`Add ${product.name} to your favourites`}
          />
        </Box>
        <Stack direction='row' px='1rem' justifyContent='space-between'>
          <Link href={`/${product.id}`} passHref>
            <ChakraLink
              transition='.5s'
              _hover={{
                textDecoration: 'none',
                fontWeight: 'bold',
                transform: 'scale(1.05)',
              }}
            >
              <Text fontWeight='medium'>{product.name}</Text>
            </ChakraLink>
          </Link>

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
    </>
  );
};
