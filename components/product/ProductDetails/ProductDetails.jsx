import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { FiHeart } from 'react-icons/fi';
import { RiRulerLine } from 'react-icons/ri';
import { QuantityPicker } from './QuantityPicker';
import { SizePicker } from './SizePicker';
import { ColorPicker } from './ColorPicker';
import { DynamicColorPicker } from './DynamicColorPicker';
import { DynamicSizePicker } from './DynamicSizePicker';
import { Gallery } from '../../common/Image/Galleries/HorizontalGallery';
import { PriceTag } from './PriceTag';
import { AddToCartVariable } from './AddToCartVariable';
import { AddToCartSimple } from './AddToCartSimple';
import PlaceHolderImage from '../../common/Image/PlaceHolderImage';
import { useStaticProduct } from '../../../hooks/useStaticProduct';
import useAuth from '../../../hooks/useAuth';
import PleaseLogIn from './PleaseLogIn';
import useSetVariations from '../../../hooks/useSetVariations';

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
        {sizes && (
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
        )}
      </Stack>
    </Stack>
  );
};

const DynamicPickers = ({
  sizes,
  colors,
  setSelectedSize,
  setSelectedColor,
  inStock,
}) => {
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
        {colors && (
          <DynamicColorPicker
            options={colors.options}
            setSelectedColor={setSelectedColor}
            inStock={inStock}
          />
        )}
        {sizes && (
          <DynamicSizePicker
            options={sizes.options}
            setSelectedSize={setSelectedSize}
            inStock={inStock}
          />
        )}
        {sizes && (
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
        )}
      </Stack>
    </Stack>
  );
};

const AddToCart = ({ product, selected, quantity, loggedIn, inStock }) => {
  if (!loggedIn) {
    return <PleaseLogIn />;
  }

  if (!product.variations) {
    return (
      <AddToCartSimple
        product={product}
        quantity={quantity}
        inStock={inStock}
      />
    );
  }
  if (product.variations) {
    return (
      <AddToCartVariable
        product={product}
        selected={selected}
        quantity={quantity}
        inStock={inStock}
      />
    );
  }
};

export const ProductDetails = ({ images, loading, product }) => {
  //make sure user is logged in
  const { loggedIn } = useAuth();
  //prepare prodcut data for display
  const { attributes, sizes, colors, price } = useStaticProduct(product);
  //set state for possible options
  const [selectedSize, setSelectedSize] = useState(false);
  const [selectedColor, setSelectedColor] = useState(false);
  //set state of selected variation for variable products and qauantity
  const [selected, setSelected] = useState(false);
  const [quantity, setQuantity] = useState(1);
  //dynamically check stock
  const [inStock, setInStock] = useState(true);
  const { variations, ready } = useSetVariations(product);

  useEffect(() => {
    if (variations) {
      if (sizes && colors) {
        const selected = variations.find(
          (v) =>
            v.attributes.find((a) => a.value === selectedSize?.value) &&
            v.attributes.find(
              (a) => a.value.split('-')[0] === selectedColor?.value
            )
        );
        setSelected(selected);
      }
      if (sizes && !colors) {
        const selected = variations.find((v) =>
          v.attributes.find((a) => a.value === selectedSize?.value)
        );
        setSelected(selected);
      }
      if (colors && !sizes) {
        const selected = variations.find((v) =>
          v.attributes.find(
            (a) => a.value.split('-')[0] === selectedColor?.value
          )
        );
        setSelected(selected);
      }
    }
  }, [selectedColor, selectedSize, variations, sizes, colors]);

  useEffect(() => {
    if (selected) {
      selected.stockStatus === 'OUT_OF_STOCK'
        ? setInStock(false)
        : setInStock(true);
    }
  }, [selected]);

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
          {images ? (
            <Gallery images={images} loading={loading} />
          ) : (
            <PlaceHolderImage ratio={4 / 4} objectFit='cover' />
          )}
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

            {price && (
              <PriceTag
                price={price}
                currency='USD'
                rootProps={{
                  fontSize: 'xl',
                }}
              />
            )}

            <Text color='brandGrey.100'>{product?.description}</Text>
          </Stack>
          {attributes && !loggedIn && (
            <StaticPickers sizes={sizes} colors={colors} />
          )}
          {attributes && loggedIn && (
            <DynamicPickers
              sizes={sizes}
              colors={colors}
              setSelectedColor={setSelectedColor}
              setSelectedSize={setSelectedSize}
              inStock={inStock}
            />
          )}

          <HStack
            spacing={{
              base: '4',
              md: '8',
            }}
            align='flex-end'
            justify='space-evenly'
          >
            <Box flex='1'>
              <QuantityPicker
                defaultValue={1}
                max={5}
                setQuantity={setQuantity}
              />
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
          <AddToCart
            product={product}
            selected={selected}
            quantity={quantity}
            loggedIn={loggedIn}
            inStock={inStock}
          />
        </Stack>
      </Stack>
    </Box>
  );
};
