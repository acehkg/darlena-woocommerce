import { Flex, Text, Image } from '@chakra-ui/react';
import { NavLink } from '../common/ui/NavLink';

const ProductCard = ({ product }) => {
  return (
    <Flex direction='column' maxWidth='320px' mx='auto'>
      <Image src={product?.image?.sourceUrl} alt={product.name} />
      <Text>{product.name}</Text>
      <Text>{product.description}</Text>
      <NavLink color='brandGold.100' href={`/${product.id}`}>
        DETAILS
      </NavLink>
    </Flex>
  );
};

export default ProductCard;
