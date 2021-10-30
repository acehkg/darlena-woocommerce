import ProductGrid from '../product/ProductGrid';
import { Heading, Box } from '@chakra-ui/react';

const FeaturedCollection = ({ products, category }) => {
  return (
    <Box as='section' py='2rem'>
      <Heading as='h3' textAlign='center'>
        {category.name}
      </Heading>
      <ProductGrid products={products} />
    </Box>
  );
};

export default FeaturedCollection;
