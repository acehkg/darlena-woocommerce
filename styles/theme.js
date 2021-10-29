import { extendTheme } from '@chakra-ui/react';

//global styles
import { styles, colors, textStyles, fonts } from './styles';

//components
//import { components } from './components';

const overrides = {
  colors,
  textStyles,
  styles,
  fonts,
};

export default extendTheme(overrides);
