import Link from 'next/link';
import { Box, Button, Heading, Stack, Text, Image } from '@chakra-ui/react';
import NextImageAspectRatio from '../common/Image/NextImageAspectRatio';

const CircleGraphics = () => (
  <>
    <Image
      opacity='.25'
      position='absolute'
      boxSize='10rem'
      left='0'
      top='0'
      src='/small-left-white.svg'
      alt='circle-graphic'
    />
    <Image
      opacity='.25'
      boxSize='10rem'
      position='absolute'
      right='0'
      bottom='0'
      src='/small-right-white.svg'
      alt='circle-graphic'
    />
    {/*  <Image
      opacity='.25'
      boxSize='10rem'
      position='absolute'
      right='50%'
      bottom='0'
      src='/small-centre-white.svg'
      alt='circle-graphic'
    /> */}
  </>
);

const CardBackground = ({ children, color, ...rest }) => {
  return (
    <Box
      position='relative'
      bg={color}
      borderRadius='xl'
      overflow='hidden'
      {...rest}
    >
      <CircleGraphics />
      {children}
    </Box>
  );
};

export const CollectionImageCardLarge = ({
  image,
  category,
  color,
  ratio,
  href,
  ...rest
}) => {
  return (
    <CardBackground color={color} {...rest}>
      {image && (
        <Box>
          <NextImageAspectRatio image={image} ratio={ratio} objectFit='cover' />
        </Box>
      )}
      <Box
        bgGradient='linear(to-t, blackAlpha.300 20%, blackAlpha.700)'
        position='absolute'
        inset='0'
        px={{
          base: '6',
          md: '10',
        }}
        py={{
          base: '6',
          md: '10',
        }}
        boxSize='full'
      >
        <Stack spacing={8}>
          <Stack spacing='4'>
            <Heading size='lg' color='brandPink.400'>
              {category?.name}
            </Heading>
            {category?.description && (
              <Text fontSize='lg' color='brandPink.400' maxW='2xs'>
                {category.description}
              </Text>
            )}
          </Stack>
          <Link href={href} passHref>
            <Button
              variant='outline'
              color='brandPink.400'
              borderColor='brandPink.400'
              borderRadius='25px'
              fontWeight='bold'
              w={{ base: '50%', md: '50%', lg: '50%' }}
              _hover={{ bg: 'brandPink.200', color: 'brandGrey.100' }}
              as='a'
            >
              {`SHOP ${category?.name.toUpperCase()}`}
            </Button>
          </Link>
        </Stack>
      </Box>
    </CardBackground>
  );
};

export const CollectionImageCardSmall = ({
  image,
  category,
  color,
  ratio,
  href,
  ...rest
}) => {
  return (
    <CardBackground color={color} {...rest}>
      {image && (
        <Box>
          <NextImageAspectRatio image={image} ratio={ratio} objectFit='cover' />
        </Box>
      )}
      <Box
        position='absolute'
        bgGradient='linear(to-t, blackAlpha.300 20%, blackAlpha.700)'
        inset='0'
        px={{
          base: '6',
          md: '10',
        }}
        py={{
          base: '6',
          md: '10',
        }}
        boxSize='full'
      >
        <Stack spacing={8}>
          <Stack spacing='4'>
            <Heading size='lg' color='brandPink.400'>
              {category?.name}
            </Heading>
            {category?.description && (
              <Text fontSize='lg' color='brandPink.400' maxW='2xs'>
                {category.description}
              </Text>
            )}
          </Stack>
          <Link href={href} passHref>
            <Button
              variant='outline'
              color='brandPink.400'
              borderColor='brandPink.400'
              borderRadius='25px'
              fontWeight='bold'
              w={{ base: '70%', md: '50%', lg: '50%' }}
              _hover={{ bg: 'brandPink.200', color: 'brandGrey.100' }}
              as='a'
            >
              {`SHOP ${category?.name.toUpperCase()}`}
            </Button>
          </Link>
        </Stack>
      </Box>
    </CardBackground>
  );
};
