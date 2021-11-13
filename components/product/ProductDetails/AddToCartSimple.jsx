import { useEffect } from 'react';
import { Button, Box, useToast } from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { ADD_SIMPLE } from '../../../lib/mutations';
import { CART_ITEMS } from '../../../hooks/useCart';

const successToast = {
  position: 'bottom',
  duration: 2000,
  isClosable: true,
  render: () => (
    <Box
      color='brandGrey.300'
      p={3}
      bg='brandPink.400'
      borderRadius='md'
      textAlign='center'
    >
      تمت إضافة العنصر إلى عربة التسوق
    </Box>
  ),
};

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
      خطأ ، يرجى المحاولة مرة أخرى
    </Box>
  ),
};

export const AddToCartSimple = ({ product, quantity }) => {
  const toast = useToast();
  const [addSimple, { loading, error, data }] = useMutation(ADD_SIMPLE, {
    refetchQueries: [{ query: CART_ITEMS }],
  });
  const handleAddToCart = () => {
    const variables = {
      productId: product.databaseId,
      quantity,
    };
    addSimple({ variables: variables });
  };
  useEffect(() => {
    if (!loading && !error && data) {
      toast(successToast);
    }
    if (error) {
      toast(errorToast);
    }
  }, [loading, error, data]);

  return (
    <Button
      onClick={handleAddToCart}
      bg='brandPink.100'
      color='brandGrey.500'
      size='lg'
    >
      ADD TO CART
    </Button>
  );
};
