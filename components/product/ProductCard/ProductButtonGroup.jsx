import { ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiEye, FiShoppingCart } from 'react-icons/fi';

export const ProductButtonGroup = ({ id, onOpen }) => {
  const router = useRouter();

  const iconColor = 'hsl(29, 91%, 91%)';
  return (
    <ButtonGroup variant='ghost' width='full' size='sm' spacing='1'>
      <IconButton
        rounded='lg'
        sx={{
          ':not(:hover)': {
            color: iconColor,
          },
        }}
        _focus={{
          boxShadow: 'none',
        }}
        _focusVisible={{
          boxShadow: 'outline',
        }}
        _hover={{
          bg: 'brandPink.400',
        }}
        width='full'
        aria-label='Product Details'
        icon={<Icon as={FiEye} boxSize='5' />}
        onClick={() => router.push(`/${id}`)}
      />
      <IconButton
        rounded='lg'
        sx={{
          ':not(:hover)': {
            color: iconColor,
          },
        }}
        _focus={{
          boxShadow: 'none',
        }}
        _focusVisible={{
          boxShadow: 'outline',
        }}
        _hover={{
          bg: 'brandPink.400',
        }}
        width='full'
        aria-label='Add To Cart'
        icon={<Icon as={FiShoppingCart} boxSize='5' />}
        onClick={onOpen}
      />
    </ButtonGroup>
  );
};
