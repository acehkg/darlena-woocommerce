import { Flex } from '@chakra-ui/react';

import Navbar from '../common/Navbar/Navbar';

const Layout = ({ children, pageProps }) => {
  const { categories } = pageProps;

  return (
    <>
      <Navbar categories={categories} />
      {children}
    </>
  );
};

export default Layout;
