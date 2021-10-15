import { Flex, Text } from '@chakra-ui/react';
import { NavLink } from '../common/ui/NavLink';

const ProductCard = ({ product }) => {
  return (
    <Flex direction='column'>
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <NavLink href={`/${product.id}`}>DETAILS</NavLink>
    </Flex>
  );
};

export default ProductCard;
