import { Box, Button, Heading, LightMode, Stack, Text } from '@chakra-ui/react';

import NextImageAspectRatio from '../common/Image/NextImageAspectRatio';

const CollectionImageCard = ({ image, category, ...rest }) => {
  console.log(category, image);
  return (
    <Box
      borderRadius='xl'
      overflow='hidden'
      position='relative'
      width='full'
      {...rest}
    >
      {image && (
        <NextImageAspectRatio image={image} ratio={1 / 1} objectFit='cover' />
      )}
      <Box
        position='absolute'
        inset='0'
        bgGradient='linear(to-t, blackAlpha.300 20%, blackAlpha.700)'
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
              {`SHOP ${category?.name}`}
            </Button>
          </LightMode>
        </Stack>
      </Box>
    </Box>
  );
};

export default CollectionImageCard;
