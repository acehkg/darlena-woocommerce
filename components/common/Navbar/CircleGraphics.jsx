import { Image } from '@chakra-ui/react';

const CircleGraphics = () => {
  return (
    <>
      <Image
        opacity='.25'
        position='absolute'
        left='0'
        boxSize={{ base: '10rem', lg: '12.5rem' }}
        src='/small-left.svg'
        alt='circle-graphic'
      />
      <Image
        display={{ base: 'none', md: 'block' }}
        opacity='.25'
        position='absolute'
        right='60%'
        boxSize={{ base: '10rem', lg: '12.5rem' }}
        src='/small-centre.svg'
        alt='circle-graphic'
      />
      <Image
        display={{ base: 'none', md: 'block', lg: 'none' }}
        opacity='.25'
        position='absolute'
        right='20%'
        boxSize={{ base: '10rem', lg: '12.5rem' }}
        src='/small-centre2.svg'
        alt='circle-graphic'
      />
      <Image
        opacity='.25'
        position='absolute'
        right='25%'
        display={{ base: 'none', lg: 'block' }}
        boxSize={{ base: '20rem', lg: '25rem' }}
        src='/large-half.svg'
        alt='circle-graphic'
      />
      <Image
        opacity='.25'
        position='absolute'
        right='0'
        boxSize={{ base: '10rem', lg: '12.5rem' }}
        src='/small-right.svg'
        alt='circle-graphic'
      />
    </>
  );
};

export default CircleGraphics;
