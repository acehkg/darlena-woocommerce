import dynamic from 'next/dynamic';
import Navbar from '../common/Navbar/Navbar';

//login
const ModalUI = dynamic(() => import('../common/Modal/ModalUI'));
const Login = dynamic(() => import('../auth/Login'));
import useAuth from '../../hooks/useAuth';

const Layout = ({ children, pageProps }) => {
  const { categories } = pageProps;
  const { isOpen, onOpen, onClose } = useAuth();

  return (
    <>
      <ModalUI isOpen={isOpen} onClose={onClose}>
        <Login />
      </ModalUI>
      <Navbar categories={categories} onOpenLogin={onOpen} />
      {children}
    </>
  );
};

export default Layout;
