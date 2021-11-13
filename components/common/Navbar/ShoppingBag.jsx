import { Box, Center, useDisclosure } from '@chakra-ui/react';
import { AiOutlineShopping } from 'react-icons/ai';
import useCart from '../../../hooks/useCart';
import { CartDrawer } from '../../cart/CartDrawer';

const NotificationBadge = ({ children }) => (
  <Center
    bg='brandPink.100'
    fontSize='xs'
    fontWeight='bold'
    position='absolute'
    rounded='full'
    textAlign='center'
    top='-2px'
    insetEnd='0'
    w='18px'
    h='18px'
  >
    {children}
  </Center>
);

export const ShoppingBag = () => {
  const { itemCount, cartLoading, error } = useCart();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Center
        as='button'
        outline='0'
        w='8'
        h='8'
        position='relative'
        rounded='md'
        onClick={onOpen}
        _hover={{
          bg: 'whiteAlpha.200',
        }}
        _focus={{
          shadow: 'outline',
        }}
      >
        {!cartLoading && !error && <Box srOnly>{itemCount} items in cart</Box>}
        {!cartLoading && !error && (
          <NotificationBadge>{itemCount}</NotificationBadge>
        )}
        <Box as={AiOutlineShopping} fontSize='1.5rem' />
      </Center>
      <CartDrawer isOpen={isOpen} onClose={onClose} />
    </>
  );
};
