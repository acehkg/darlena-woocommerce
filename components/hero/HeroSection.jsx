import { Flex, Button, Heading, Stack, Text, Box } from '@chakra-ui/react';
import NextImageHero from '../common/Image/NextImageFill';

const HeroSection = ({ hero }) => {
  const { image, mainHeading, subHeading, buttonText } = hero;
  return (
    <Flex
      direction='row'
      as='section'
      position='relative'
      alignItems='flex-end'
      w='100%'
      h='80vh'
      maxH={image?.mediaDetails?.height ?? '80vh'}
    >
      <NextImageHero
        sx={{ filter: 'brightness(40%)' }}
        position='absolute'
        top='0'
        w='100%'
        h='100%'
        image={image ?? null}
        zIndex='-1'
      />
      <Box
        w={{ base: '60%', lg: '60%' }}
        h='100%'
        display={{ base: 'none', md: 'block' }}
      ></Box>
      <Stack
        w={{ base: '80%', md: '40%', lg: '40%' }}
        h='100%'
        mx='auto'
        color='brandGrey.500'
        direction='column'
        justifyContent='space-evenly'
      >
        <Heading
          as='h1'
          my='4'
          fontSize={{
            base: '4xl',
            md: '6xl',
          }}
          fontWeight='extrabold'
          letterSpacing='tight'
          lineHeight='1.2'
        >
          {mainHeading ?? null}
        </Heading>
        <Text as='h2' fontSize='lg' maxW='xl' mx='auto'>
          {subHeading ?? null}
        </Text>

        <Button
          as='a'
          href='#'
          size='lg'
          h='16'
          px='10'
          variant='outline'
          color='brandPink.200'
          borderColor='brandPink.200'
          borderRadius='25px'
          fontWeight='bold'
          w={{ base: '80%', md: '70%', lg: '50%' }}
          _hover={{ bg: 'brandPink.200', color: 'brandGrey.100' }}
        >
          {buttonText.toUpperCase() ?? null}
        </Button>
      </Stack>
    </Flex>
  );
};

export default HeroSection;
