import {
  Box,
  Button,
  Heading,
  LightMode,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react';
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

const CollectionImageCard = ({ image, category, color, ratio, ...rest }) => {
  return (
    <CardBackground color={color} {...rest}>
      {/* {image && (
        <Box boxSize='150px'>
          <NextImageAspectRatio image={image} ratio={ratio} objectFit='cover' />
        </Box>
      )} */}
      <Box
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
            <Heading size='lg' color='white'>
              {category?.name}
            </Heading>
            {category?.description && (
              <Text fontSize='lg' color='white' maxW='2xs'>
                {category.description}
              </Text>
            )}
          </Stack>
          <LightMode>
            <Button bg='white' color='gray.800' alignSelf='start' as='a'>
              {`SHOP ${category?.name.toUpperCase()}`}
            </Button>
          </LightMode>
        </Stack>
      </Box>
    </CardBackground>
  );
};

export default CollectionImageCard;
