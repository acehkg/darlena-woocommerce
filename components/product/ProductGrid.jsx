import { SimpleGrid, Box } from '@chakra-ui/layout';
import { ProductCard } from '../product/ProductCard/ProductCard';

const ProductGrid = ({ products }) => {
  return (
    <Box
      w='80%'
      mx='auto'
      px={{
        base: '4',
        md: '8',
        lg: '12',
      }}
      py={{
        base: '6',
        md: '8',
        lg: '12',
      }}
    >
      <SimpleGrid
        columns={{
          base: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
        }}
        gap={{
          base: '8',
          lg: '10',
        }}
      >
        {products.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </SimpleGrid>
    </Box>
  );
};

export default ProductGrid;
