import Head from 'next/head';
import dynamic from 'next/dynamic';
//layout functionality
import { useMobileMenuState } from '../hooks/useMobileMenuState';

//app layout components
import { Flex } from '@chakra-ui/react';
//import Header from './header/Header';

const Header = dynamic(() => import('./header/Header'));

const Layout = ({ children }) => {
  const { isMenuOpen, toggle } = useMobileMenuState();
  return (
    <>
      <Head>
        <title>Darlena Woocomerce</title>
      </Head>
      <Flex direction='column'>
        <Header isMenuOpen={isMenuOpen} toggle={toggle} />

        {children}
      </Flex>
    </>
  );
};

export default Layout;
