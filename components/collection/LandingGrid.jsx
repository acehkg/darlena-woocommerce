import { Box, Stack } from '@chakra-ui/react';
import CollectionImageCard from './CollectionImageCard';

const LandingGrid = ({ categories }) => {
  return (
    <Box
      as='section'
      maxW='7xl'
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
      <Stack
        height={{
          md: '640px',
        }}
        direction={{
          base: 'column',
          md: 'row',
        }}
        spacing={{
          base: '6',
          md: '10',
        }}
        align='stretch'
      >
        <CollectionImageCard
          flex='1'
          image={categories[0]?.image}
          category={categories[0] ?? null}
        />

        <Stack
          spacing={{
            base: '6',
            md: '10',
          }}
          maxW={{
            md: '400px',
          }}
        >
          <Box h='100%' w='100%'>
            <CollectionImageCard
              image={categories[1]?.image}
              category={categories[1] ?? null}
            />
          </Box>
          <Box h='100%' w='100%'>
            <CollectionImageCard
              image={categories[2]?.image}
              category={categories[2] ?? null}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};

export default LandingGrid;
