import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
  Skeleton,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { RiRulerLine } from 'react-icons/ri';
import { QuantityPicker } from './QuantityPicker';
import { SizePicker } from './SizePicker';
import { ColorPicker } from './ColorPicker';
import { Gallery } from '../../common/Image/Galleries/HorizontalGallery';
import { PriceTag } from './PriceTag';

import { useProduct } from '../../../hooks/useProduct';
import { useStaticProduct } from '../../../hooks/useStaticProduct';
import { useVariations } from '../../../hooks/useVariations';
import useAuth from '../../../hooks/useAuth';

const StaticPickers = ({ sizes, colors }) => {
  return (
    <Stack
      direction={{
        base: 'column',
        md: 'row',
      }}
      spacing={{
        base: '6',
        md: '8',
      }}
    >
      <Stack flex='1'>
        {colors && <ColorPicker options={colors.options} />}
        {sizes && <SizePicker options={sizes.options} />}
        <HStack spacing='1' color='gray.600'>
          <Icon as={RiRulerLine} />
          <Link
            href='#'
            fontSize='xs'
            fontWeight='medium'
            textDecoration='underline'
          >
            View our sizing guide
          </Link>
        </HStack>
      </Stack>
    </Stack>
  );
};

const DynamicPickers = () => {
  return (
    <Stack
      direction={{
        base: 'column',
        md: 'row',
      }}
      spacing={{
        base: '6',
        md: '8',
      }}
    >
      <Stack flex='1'>
        {colors && <ColorPicker options={colors.options} />}
        {sizes && <SizePicker options={sizes.options} />}
        <HStack spacing='1' color='gray.600'>
          <Icon as={RiRulerLine} />
          <Link
            href='#'
            fontSize='xs'
            fontWeight='medium'
            textDecoration='underline'
          >
            View our sizing guide
          </Link>
        </HStack>
      </Stack>
    </Stack>
  );
};

export const ProductDetails = ({ images, loading, product }) => {
  const { loggedIn } = useAuth();
  const { attributes, sizes, colors } = useStaticProduct(product);
  const { variations, price } = useProduct(product, attributes);
  const { optionsWithStock } = useVariations(variations, attributes);

  const ready = false;

  return (
    <Box w='80%' mx='auto' py='3rem'>
      <Stack
        direction={{
          base: 'column',
          lg: 'row',
        }}
        spacing={{
          base: '6',
          lg: '16',
          xl: '20',
        }}
      >
        <Box w={{ base: '100%', lg: '60%' }}>
          <Gallery images={images} loading={loading} />
        </Box>
        <Stack
          spacing={{
            base: '6',
            lg: '8',
          }}
          maxW={{
            lg: 'sm',
          }}
          justify='center'
        >
          <Stack
            spacing={{
              base: '3',
              md: '4',
            }}
          >
            <Stack spacing='3'>
              <Heading size='lg' fontWeight='medium'>
                {product?.name}
              </Heading>
            </Stack>
            {!ready ? (
              <Skeleton h='1rem' w='5rem' />
            ) : (
              <PriceTag
                price={price}
                currency='USD'
                rootProps={{
                  fontSize: 'xl',
                }}
              />
            )}
            <Text color={useColorModeValue('gray.600', 'gray.400')}>
              {product?.description}
            </Text>
          </Stack>
          {attributes && (!loggedIn || !ready) && (
            <StaticPickers sizes={sizes} colors={colors} />
          )}
          {/* 
          {attributes && (
            <Stack
              direction={{
                base: 'column',
                md: 'row',
              }}
              spacing={{
                base: '6',
                md: '8',
              }}
            >
              <Stack flex='1'>
                {(!loggedIn || !ready) && (
                  <SizePicker
                    defaultValue={attributes[0]?.options[0]?.label}
                    options={attributes[0]?.options}
                  />
                )}

                {ready && loggedIn && (
                  <SizePicker
                    defaultValue={attributes[0]?.options[0]?.label}
                    options={optionsWithStock}
                  />
                )}

                <HStack spacing='1' color='gray.600'>
                  <Icon as={RiRulerLine} />
                  <Link
                    href='#'
                    fontSize='xs'
                    fontWeight='medium'
                    textDecoration='underline'
                  >
                    View our sizing guide
                  </Link>
                </HStack>
              </Stack>
            </Stack>
          )} */}

          <HStack
            spacing={{
              base: '4',
              md: '8',
            }}
            align='flex-end'
            justify='space-evenly'
          >
            <Box flex='1'>
              <QuantityPicker defaultValue={1} max={5} />
            </Box>
            <Box flex='1'>
              <Button
                variant='outline'
                size='lg'
                fontSize='md'
                isFullWidth
                leftIcon={<Icon as={FiHeart} boxSize='4' />}
              >
                Favorite
              </Button>
            </Box>
          </HStack>
          <Button bg='brandPink.100' color='brandGrey.500' size='lg'>
            ADD TO CART
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
