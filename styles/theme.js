import { extendTheme } from '@chakra-ui/react';

//global styles
import { styles, colors, textStyles } from './styles';

//components
//import { components } from './components';

const overrides = {
  colors,
  textStyles,
  styles,
};

export default extendTheme(overrides);
