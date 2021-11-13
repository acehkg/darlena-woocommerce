import {
  Box,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiPackage } from 'react-icons/fi';
import { CartItem } from './CartItem';
import useCart from '../../hooks/useCart';

export const CartDrawer = ({ isOpen, onClose }) => {
  const { lineItems, itemCount, cartLoading, error, cartTotals } = useCart();

  return (
    <Drawer isOpen={isOpen} onClose={onClose} size='md' placement='left'>
      <DrawerOverlay />
      <DrawerContent overflowY='auto'>
        <DrawerCloseButton
          size='lg'
          right={{ base: '4', md: '8' }}
          top='4'
          bg='inherit'
          zIndex='1'
        />
        <Stack
          padding={{ base: '6', md: '10' }}
          height='full'
          spacing='8'
          overflowY='auto'
        >
          <Heading pt='3rem' pb='1rem' size='md'>
            عربة التسوق ({itemCount} العناصر)
          </Heading>
          {itemCount > 0 ? (
            <Stack spacing={{ base: '8', md: '10' }}>
              {lineItems.map((item) => (
                <CartItem
                  key={item.key}
                  product={item.product.node}
                  item={item}
                />
              ))}
            </Stack>
          ) : (
            <Heading>عربة التسوق فارغة</Heading>
          )}
        </Stack>
        <Stack
          borderTopWidth='1px'
          px={{ base: '6', md: '10' }}
          py='4'
          spacing='5'
        >
          <Stack>
            <HStack fontSize='xl' fontWeight='semibold'>
              <Text flex='1'>المجموع الفرعي</Text>
              <Text>{cartTotals.subtotal}</Text>
            </HStack>
            <HStack
              spacing='2'
              color={useColorModeValue('gray.600', 'gray.400')}
            >
              <Icon as={FiPackage} />
              <Text>الشحن + الضرائب المحسوبة عند الخروج</Text>
            </HStack>
          </Stack>
          <Button bg='brandPink.100' color='brandGrey.500' size='lg'>
            الدفع
          </Button>
        </Stack>
      </DrawerContent>
    </Drawer>
  );
};
