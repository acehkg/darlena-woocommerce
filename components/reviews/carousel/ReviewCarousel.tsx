import React, { useState } from 'react';
import { carouselData } from '../../../mockData';
import ItemComponent from './ItemComponent';
import { Box } from '@chakra-ui/react';
import {
  ControlButtons,
  BottomButtonsContainer,
  Carousel,
  CarouselBottomButtons,
  CarouselContainer,
  MainContainer,
  Screen5Container,
} from './CarouselComponents';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { useDataState } from '../../../hooks/DataStateHooks';
const ReviewCarousel = () => {
  const [currdegree, setCurrDegree] = useState(0);
  const data = useDataState(carouselData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselLength = data.value ? data.value.length : 0;
  const handleButtonClick = (direction: string) => {
    if (data.value) {
      if (direction === 'next') {
        setCurrDegree(currdegree - 360 / carouselLength);
        currentIndex === carouselLength - 1
          ? setCurrentIndex(0)
          : setCurrentIndex(currentIndex + 1);
        return;
      }
      setCurrDegree(currdegree + 360 / carouselLength);
      currentIndex === 0
        ? setCurrentIndex(carouselLength - 1)
        : setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <Box as='section' display={{ base: 'none', xl: 'block' }}>
      <Screen5Container>
        <ControlButtons onClick={() => handleButtonClick('prev')} as={GrNext} />
        <MainContainer>
          <CarouselContainer>
            <Carousel degree={currdegree}>
              {data.value &&
                data.value.map((item, index) => (
                  <ItemComponent
                    index={index}
                    key={item.id}
                    imageUrl={item.imageUrl}
                    text={item.text}
                    title={item.title}
                    currentDegree={currdegree}
                    degree={360 / carouselLength}
                  />
                ))}
            </Carousel>
          </CarouselContainer>
          <BottomButtonsContainer>
            {data.value &&
              data.value.map((item, index) => (
                <CarouselBottomButtons
                  key={index}
                  onClick={() => {
                    setCurrDegree((-360 / carouselLength) * index);
                    setCurrentIndex(index);
                  }}
                  isselected={
                    currentIndex === index ? 'selected' : 'notSelected'
                  }
                />
              ))}
          </BottomButtonsContainer>
        </MainContainer>
        <ControlButtons
          onClick={() => handleButtonClick('next')}
          as={GrPrevious}
        />
      </Screen5Container>
    </Box>
  );
};
export default ReviewCarousel;
