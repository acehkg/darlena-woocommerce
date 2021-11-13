import { Center, Flex, FormControl, IconButton, Text } from '@chakra-ui/react';
import { FiMinus, FiPlus } from 'react-icons/fi';

export const QuantityPicker = (props) => {
  const { min = 1, max, rootProps, setQuantity, quantity, ...rest } = props;

  const handleDecrement = () =>
    setQuantity(quantity === min ? quantity : quantity - 1);

  const handleIncrement = () =>
    setQuantity(quantity === max ? quantity : quantity + 1);

  return (
    <FormControl {...rootProps}>
      <Flex
        borderRadius='base'
        px='2'
        py='0.4375rem'
        borderWidth='1px'
        justifyContent='space-between'
        maxW='10rem'
      >
        <QuantityPickerButton
          onClick={handleDecrement}
          icon={<FiMinus />}
          isDisabled={quantity === min}
          aria-label='Decrement'
        />
        <Center minW='8'>
          <Text as='span' fontWeight='semibold' userSelect='none'>
            {quantity}
          </Text>
        </Center>
        <QuantityPickerButton
          onClick={handleIncrement}
          icon={<FiPlus />}
          isDisabled={quantity === max}
          aria-label='Increment'
        />
      </Flex>
    </FormControl>
  );
};

const QuantityPickerButton = (props) => (
  <IconButton
    size='sm'
    fontSize='md'
    _focus={{
      boxShadow: 'none',
    }}
    _focusVisible={{
      boxShadow: 'outline',
    }}
    {...props}
  />
);
