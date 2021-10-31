import { Flex, Box, Stack, Heading, Text } from '@chakra-ui/react';

import NextImageHero from '../common/Image/NextImageFill';

const CategoryBanner = ({ banner }) => {
  return (
    <Flex
      direction='row'
      as='section'
      position='relative'
      alignItems='flex-start'
      w='100%'
      h='80vh'
      my='5rem'
      maxH={banner?.image?.mediaDetails?.height ?? '80vh'}
    >
      <NextImageHero
        sx={{ filter: 'brightness(80%)' }}
        position='absolute'
        top='0'
        w='100%'
        h='100%'
        image={banner?.image}
        zIndex='-1'
      />

      <Stack
        w={{ base: '80%', md: '40%', lg: '40%' }}
        h='100%'
        mx='auto'
        color='brandGrey.500'
        direction='column'
        justifyContent='space-evenly'
      >
        <Heading
          as='h2'
          my='4'
          fontSize={{
            base: '4xl',
            md: '6xl',
          }}
          fontWeight='extrabold'
          letterSpacing='tight'
          lineHeight='1.2'
        >
          {banner?.name}
        </Heading>
        <Text as='h3' fontSize='1.5rem' maxW='xl' mx='auto'>
          {banner?.description}
        </Text>
      </Stack>
    </Flex>
  );
};

export default CategoryBanner;
