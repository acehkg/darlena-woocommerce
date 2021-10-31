import React, { FC } from 'react';
import { ImQuotesLeft, ImQuotesRight } from 'react-icons/im';
import {
  QuoteIcon,
  SlideContainer,
  SlideContainerWrapper,
  SlideImage,
  SlideText,
  SlideTextContainer,
  SlideTitle,
  TitleLineContainer,
} from './CarouselComponents';

type ItemProps = {
  imageUrl: string;
  text: string;
  title: string;
  index: number;
  currentDegree: number;
  degree: number;
};
const ItemComponent: FC<ItemProps> = ({
  text,
  imageUrl,
  title,
  index,
  degree,
  currentDegree,
}) => (
  <SlideContainerWrapper index={index} wrapperdegree={degree}>
    <SlideContainer index={index} degree={currentDegree}>
      <SlideImage src={imageUrl} h={90} w={90} alt='sliderAvatar' />
      <SlideTitle>{title}</SlideTitle>
      <TitleLineContainer />
      <SlideTextContainer>
        <QuoteIcon as={ImQuotesLeft} h={6} w={4} alignSelf='flex-end' />
        <SlideText>{text}</SlideText>
        <QuoteIcon as={ImQuotesRight} h={6} w={4} />
      </SlideTextContainer>
    </SlideContainer>
  </SlideContainerWrapper>
);
export default ItemComponent;
