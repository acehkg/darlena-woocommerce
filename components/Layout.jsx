import Head from 'next/head';

//layout functionality
import { useMobileMenuState } from '../hooks/useMobileMenuState';

//app layout components
import { Flex } from '@chakra-ui/react';
import Header from './header/Header';

const Layout = ({ children }) => {
  const { isMenuOpen, toggle } = useMobileMenuState();
  return (
    <>
      <Head>
        <title>Darlena Woocomerce</title>
      </Head>
      <Flex direction='column' height='100vh'>
        <Header isMenuOpen={isMenuOpen} toggle={toggle} />

        {children}
      </Flex>
    </>
  );
};

export default Layout;
