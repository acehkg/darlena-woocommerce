import { Image, Text, Icon, Button } from '@chakra-ui/react';
import styled from '@emotion/styled';

const lightBrownColor = 'var(--chakra-colors-brandPink-100)';
const screen5CardTextColor = 'var(--chakra-colors-brandGrey-100)';
const screen5NavigationButtonColor = 'var(--chakra-colors-brandGrey-300)';

export const Screen5Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding-top: 5rem;
  padding-bottom: 5rem;
`;
export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 6.25rem 0 8.25rem;
`;
export const CarouselContainer = styled.div`
  margin: 0 auto;
  width: 30rem;
  height: 15.6rem;
  position: relative;
  perspective: 62.5rem;
`;
type CarouselProps = {
  degree: number;
};
export const Carousel = styled.div`
  & div {
    transform-style: preserve-3d;
  }
  height: 100%;
  width: 100%;
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 1s;
  -webkit-transform: rotateY(${(props: CarouselProps) => props.degree}deg);
  -moz-transform: rotateY(${(props: CarouselProps) => props.degree}deg);
  -o-transform: rotateY(${(props: CarouselProps) => props.degree}deg);
  transform: rotateY(${(props: CarouselProps) => props.degree}deg);
`;
export const BottomButtonsContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-top: 5.6rem;
`;
type CarouselBottomButtonsProp = {
  isselected: string;
};
export const CarouselBottomButtons = styled(Button)<CarouselBottomButtonsProp>`
  min-width: 0;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50px;
  padding: 0px;
  background: ${(props) =>
    props.isselected === 'selected'
      ? lightBrownColor
      : screen5NavigationButtonColor};
  &:hover {
    background: ${(props) =>
      props.isselected === 'selected'
        ? lightBrownColor
        : screen5NavigationButtonColor};
  }
`;
type SlideContainerWrapperProp = {
  index: number;
  wrapperdegree: number;
};
export const SlideContainerWrapper = styled.div<SlideContainerWrapperProp>`
  ${(props) =>
    props.index === 0 &&
    `
transform: rotateY(0deg) translateZ(250px);
`}
  ${(props) =>
    props.index !== 0 &&
    `transform: rotateY(${
      props.index * props.wrapperdegree
    }deg) translateZ(250px) rotateY(-${props.index * props.wrapperdegree}deg)`};
`;
type SlideContainerProp = {
  index: number;
  degree: number;
};
export const SlideContainer = styled.div<SlideContainerProp>`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  height: 15.6rem;
  background: var(--chakra-colors-brandGrey-500);
  box-shadow: var(--chakra-shadows-lg);
  width: 28.1rem;
  border-radius: var(--chakra-radii-lg);
  line-height: 12.5rem;
  transition: transform 1s;
  -webkit-transform: rotateY(
    ${(props: SlideContainerProp) => -props.degree}deg
  );
  -moz-transform: rotateY(${(props: SlideContainerProp) => -props.degree}deg);
  -o-transform: rotateY(${(props: SlideContainerProp) => -props.degree}deg);
  transform: rotateY(${(props: SlideContainerProp) => -props.degree}deg);
`;

export const ControlButtons = styled(Icon)`
  margin-top: 100px;
  //border-radius: 5px;
  //transition: box-shadow 0.1s, top 0.1s;
  cursor: pointer;
  height: 40px;
  width: 40px;
  z-index: 1000;
`;
export const SlideImage = styled(Image)`
  position: absolute;
  top: -50px;
  border-radius: 50%;
`;
export const SlideTitle = styled(Text)`
  font: normal normal normal 22px/16px Almarai;
  letter-spacing: 0px;
  color: var(--chakra-colors-brandGrey-100);
  opacity: 1;
  margin: 56px 0px 10.5px 0px;
`;
export const TitleLineContainer = styled.div`
  height: 2px;
  width: 44px;
  background: ${lightBrownColor};
  margin-bottom: 12.5px;
`;
export const SlideTextContainer = styled.div`
  display: flex;
`;
export const QuoteIcon = styled(Icon)`
  color: ${lightBrownColor};
  margin: 0px 10px;
`;
export const SlideText = styled(Text)`
  width: 341px;
  color: ${screen5CardTextColor};
  font: normal normal normal 20px/22px Almarai;
  letter-spacing: 0px;
  opacity: 1;
`;
