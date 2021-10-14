import { useDisclosure, Flex } from '@chakra-ui/react';
import dynamic from 'next/dynamic';

//layout components
//import LogInView from '../auth/LogInView';
//import LogInMethod from '../auth/LogInMethod';
//import ModalUI from '../common/Modal/ModalUI';
import Navbar from '../common/Navbar/Navbar';

const ModalUI = dynamic(() => import('./Modal/ModalUI'));
const LogInView = dynamic(() => import('../auth/LogInView'));
//const LogInMethod = dynamic(() => import('../auth/LogInMethod'));

const Layout = ({ children, pageProps }) => {
  const {
    isOpen: modalIsOpen,
    onOpen: modalOnOpen,
    onClose: modalOnClose,
  } = useDisclosure();

  return (
    <Flex direction='column'>
      <ModalUI isOpen={modalIsOpen} onClose={modalOnClose}>
        <LogInView onClose={modalOnClose} />
      </ModalUI>
      <Navbar modalOnOpen={modalOnOpen} />
      {children}
    </Flex>
  );
};

export default Layout;
