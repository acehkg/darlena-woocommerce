import { Box, Stack } from '@chakra-ui/react';
import {
  CollectionImageCardLarge,
  CollectionImageCardSmall,
} from './CollectionImageCard';

const LandingGrid = ({ categoryOne, categoryTwo, categoryThree }) => {
  return (
    <>
      <Box
        as='section'
        w='80%'
        mx='auto'
        display={{ base: 'block', lg: 'none' }}
      >
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          maxH={{ base: '54rem' }}
          spacing={4}
        >
          <CollectionImageCardSmall
            maxH={{ base: '13rem', md: 'unset' }}
            w={{ base: '100%' }}
            h={{ base: '100%' }}
            color='brandPink.100'
            image={categoryOne?.image}
            category={categoryOne ?? null}
          />

          <CollectionImageCardSmall
            maxH={{ base: '13rem', md: 'unset' }}
            w={{ base: '100%' }}
            h={{ base: '100%' }}
            color='brandPink.200'
            image={categoryTwo?.image}
            category={categoryTwo ?? null}
          />

          <CollectionImageCardSmall
            maxH={{ base: '13rem', md: 'unset' }}
            w={{ base: '100%' }}
            h={{ base: '100%' }}
            color='brandPink.300'
            image={categoryThree?.image}
            category={categoryThree ?? null}
          />
        </Stack>
      </Box>
      <Box
        as='section'
        w='80%'
        mx='auto'
        display={{ base: 'none', lg: 'block' }}
      >
        <Stack
          direction={{ base: 'column', lg: 'row' }}
          h={{ base: '35rem' }}
          spacing={4}
        >
          <CollectionImageCardLarge
            w={{ base: '100%' }}
            h={{ base: '100%' }}
            color='brandPink.100'
            ratio={5 / 8}
            image={categoryOne?.image}
            category={categoryOne ?? null}
          />

          <Stack w='100%' h='100%' spacing={4}>
            <CollectionImageCardSmall
              w={{ base: '100%' }}
              h={{ base: '100%' }}
              color='brandPink.200'
              image={categoryTwo?.image}
              category={categoryTwo ?? null}
            />

            <CollectionImageCardSmall
              w={{ base: '100%' }}
              h={{ base: '100%' }}
              color='brandPink.300'
              image={categoryThree?.image}
              category={categoryThree ?? null}
            />
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default LandingGrid;
