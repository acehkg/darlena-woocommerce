import { Box, Stack } from '@chakra-ui/react';
import CollectionImageCard from './CollectionImageCard';

const LandingGrid = ({ categories }) => {
  return (
    <Box as='section' w='80%' mx='auto'>
      <Stack
        direction={{ base: 'column', lg: 'row' }}
        h={{ base: '100vh', lg: '60vh' }}
      >
        <CollectionImageCard
          w={{ base: '100%' }}
          h={{ base: '100%' }}
          color='brandPink.100'
          image={categories[0]?.image}
          category={categories[0] ?? null}
        />

        <Stack w='100%' h='100%'>
          <CollectionImageCard
            w={{ base: '100%' }}
            h={{ base: '100%' }}
            color='brandPink.200'
            image={categories[1]?.image}
            category={categories[1] ?? null}
          />

          <CollectionImageCard
            w={{ base: '100%' }}
            h={{ base: '100%' }}
            color='brandPink.300'
            image={categories[2]?.image}
            category={categories[2] ?? null}
          />
        </Stack>
      </Stack>
    </Box>
  );
};

export default LandingGrid;
