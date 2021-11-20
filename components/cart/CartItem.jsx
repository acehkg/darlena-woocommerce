import { useState, useEffect } from 'react';
import {
  Stack,
  Text,
  Flex,
  useColorModeValue,
  IconButton,
  Box,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { FiTrash2 } from 'react-icons/fi';
import { GrUpdate } from 'react-icons/gr';
import { PriceTag } from './PriceTag';
import { CartImage } from './CartImage';
import { QuantityPicker } from './QuantityPicker';
import { REMOVE_ITEM, UPDATE_QUANTITY } from '../../lib/mutations';
import { CART_ITEMS } from '../../hooks/useCart';
import useCartItem from '../../hooks/useCartItem';

const errorToast = {
  position: 'bottom',
  duration: 2000,
  isClosable: true,
  render: () => (
    <Box
      color='brandGrey.500'
      p={3}
      bg='red'
      borderRadius='md'
      textAlign='center'
    >
      خطأ في تحديث عربة التسوق. حاول مجددا.
    </Box>
  ),
};

export const CartItem = ({ product, item }) => {
  const [quantity, setQuantity] = useState(item?.quantity);

  const { itemVariation } = useCartItem(item);

  const toast = useToast();

  const [updateQuantity, { error: updateError }] = useMutation(
    UPDATE_QUANTITY,
    {
      refetchQueries: [{ query: CART_ITEMS }],
    }
  );

  const [clearItem, { error: clearItemError }] = useMutation(REMOVE_ITEM, {
    refetchQueries: [{ query: CART_ITEMS }],
  });
  const handleUpdate = () => {
    const variables = {
      key: item.key,
      quantity: quantity,
    };
    updateQuantity({ variables: variables });
  };

  const handleClear = () => {
    const variables = {
      keys: [item.key],
    };
    clearItem({ variables: variables });
  };

  useEffect(() => {
    if (clearItemError || updateError) {
      toast(errorToast);
    }
    // eslint-disable-next-line
  }, [clearItemError, updateError]);

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
            {product?.variations &&
              itemVariation?.map((i, index) => (
                <Text key={index}>{i.value}</Text>
              ))}
          </Stack>
          <Stack direction={{ base: 'row', md: 'column' }} spacing={2}>
            <Text>سعر العنصر</Text>
            <PriceTag price={product?.price} currency='USD' />
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
          <IconButton
            icon={<GrUpdate />}
            onClick={handleUpdate}
            mr={{ base: '1rem', md: '0' }}
          />
          <IconButton
            icon={<FiTrash2 />}
            mr={{ base: '1rem', md: '0' }}
            onClick={handleClear}
          />
        </Flex>
      </Stack>
    </Stack>
  );
};
