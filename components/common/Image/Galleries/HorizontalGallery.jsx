import {
  Box,
  HStack,
  Skeleton,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react';
import * as React from 'react';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5';
import {
  Carousel,
  CarouselIconButton,
  CarouselSlide,
  useCarousel,
} from './HorizontalCarousel';
import NextImageAspectRatio from '../NextImageAspectRatio';

export const Gallery = (props) => {
  const { images, aspectRatio = 4 / 3, rootProps, loading, ...rest } = props;
  const [index, setIndex] = React.useState(0);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const slidesPerView =
    useBreakpointValue({
      base: 3,
      md: 4,
    }) ?? 0;
  const [ref, slider] = useCarousel({
    slidesPerView,
    spacing: 16,

    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  return (
    <Box {...rest}>
      <Stack spacing='4' w='100%' {...rootProps}>
        {loading ? (
          <Skeleton />
        ) : (
          <NextImageAspectRatio
            maxH={{ base: 'unset', lg: '70vh' }}
            ratio={5 / 8}
            image={images[index]}
            objectFit='contain'
          />
        )}
        <HStack sx={{ direction: 'ltr' }} spacing='4'>
          <CarouselIconButton
            onClick={slider?.prev}
            icon={<IoChevronBackOutline />}
            disabled={currentSlide === 0}
            aria-label='Previous slide'
          />
          <Carousel ref={ref} direction='row' width='full'>
            {images.map((image, i) => (
              <CarouselSlide
                key={i}
                onClick={() => setIndex(i)}
                cursor='pointer'
              >
                <NextImageAspectRatio
                  image={image}
                  ratio={1 / 1}
                  objectFit='cover'
                  transition='all 200ms'
                  opacity={index === i ? 1 : 0.4}
                  _hover={{
                    opacity: 1,
                  }}
                />
              </CarouselSlide>
            ))}
          </Carousel>
          <CarouselIconButton
            onClick={slider?.next}
            icon={<IoChevronForwardOutline />}
            disabled={currentSlide + slidesPerView === images.length}
            aria-label='Next slide'
          />
        </HStack>
      </Stack>
    </Box>
  );
};
