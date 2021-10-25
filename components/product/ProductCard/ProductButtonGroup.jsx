import { ButtonGroup, Icon, IconButton } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiEye, FiShoppingCart } from 'react-icons/fi';

export const ProductButtonGroup = ({ id }) => {
  const options = [
    {
      icon: FiShoppingCart,
      label: 'Add to cart',
      href: '#',
    },
    {
      icon: FiEye,
      label: 'View details',
      href: `/${id}`,
    },
  ];

  const router = useRouter();
  console.log(options);

  const iconColor = 'brandGrey.300';
  return (
    <ButtonGroup variant='ghost' width='full' size='sm' spacing='1'>
      {options.map((option) => (
        <IconButton
          key={option.label}
          rounded='sm'
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
            bg: 'brandGrey.500',
          }}
          width='full'
          aria-label={option.label}
          icon={<Icon as={option.icon} boxSize='5' />}
          onClick={() => router.push(option.href)}
        />
      ))}
    </ButtonGroup>
  );
};
