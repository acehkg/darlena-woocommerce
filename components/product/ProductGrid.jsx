import { SimpleGrid } from '@chakra-ui/layout';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <SimpleGrid minChildWidth='300px' spacing='2rem' w='90%' mx='auto'>
      {products.map((product) => {
        return <ProductCard key={product.id} product={product} />;
      })}
    </SimpleGrid>
  );
};

export default ProductGrid;
