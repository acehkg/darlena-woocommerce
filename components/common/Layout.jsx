import { Flex } from '@chakra-ui/react';

import Navbar from '../common/Navbar/Navbar';
import { useCategories } from '../../hooks/useCategories';

const Layout = ({ children, pageProps }) => {
  //const { categories } = pageProps;

  return (
    <Flex direction='column'>
      {/* <Navbar categories={categories} /> */}
      {children}
    </Flex>
  );
};

export default Layout;