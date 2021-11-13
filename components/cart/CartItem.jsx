import { useState } from 'react';
import {
  Stack,
  Text,
  Flex,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import { FiTrash2 } from 'react-icons/fi';
import { PriceTag } from './PriceTag';
import { CartImage } from './CartImage';
import { QuantityPicker } from './QuantityPicker';

export const CartItem = ({ product, item }) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const [priceData] = product?.price.split(',');
  const price = parseInt(priceData);

  return (
    <Stack direction='row' spacing='5'>
      <CartImage image={product?.featuredImage?.node} boxSize='150px' />
      <Stack width='full' spacing='3'>
        <Stack
          direction={{
            base: 'column',
            md: 'row',
          }}
          spacing='3'
          alignItems='flex-start'
        >
          <Stack spacing='0.5' width='full'>
            <Text fontWeight='medium'>{product?.name}</Text>
            <Text color={useColorModeValue('gray.500', 'gray.300')}>
              SELECTED VARIATION
            </Text>
          </Stack>
          <Stack direction={{ base: 'row', md: 'column' }} spacing={2}>
            <Text>سعر العنصر</Text>
            <PriceTag price={price} currency='USD' />
          </Stack>
          <Stack direction={{ base: 'row', md: 'column' }} spacing={2}>
            <Text>مجموع الاشياء</Text>
            <Text>{item.subtotal}</Text>
          </Stack>
        </Stack>
        <Flex width='full' justifyContent='space-between' alignItems='center'>
          <QuantityPicker
            quantity={quantity}
            setQuantity={setQuantity}
            max={15}
          />

          <IconButton icon={<FiTrash2 />} />
        </Flex>
      </Stack>
    </Stack>
  );
};
