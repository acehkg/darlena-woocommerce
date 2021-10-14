import { Flex, Text } from '@chakra-ui/react';

const ProductCard = ({ product }) => {
  return (
    <Flex direction='column'>
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
    </Flex>
  );
};

export default ProductCard;
