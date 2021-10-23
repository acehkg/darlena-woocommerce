import { Flex } from '@chakra-ui/react';

import Navbar from '../common/Navbar/Navbar';
import Breadcrumbs from './Navigation/Breadcrumbs';

const Layout = ({ children, pageProps }) => {
  const { categories } = pageProps;

  return (
    <Flex direction='column'>
      <Navbar categories={categories} />
      <Breadcrumbs pt='2rem' color='brandGold.100' />
      {children}
    </Flex>
  );
};

export default Layout;
