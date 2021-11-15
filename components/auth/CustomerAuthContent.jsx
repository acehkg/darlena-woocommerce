import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spinner, Flex } from '@chakra-ui/react';

import useAuth from '../../hooks/useAuth';

const CustomerAuthContent = ({ id, children }) => {
  const { loggedIn, loading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && loggedIn && id !== user?.databaseId) {
      router.push('/404');
    }
  }, [loggedIn, loading, router, id, user]);

  if (loggedIn && id === user.databaseId) {
    return <div>{children}</div>;
  }

  return (
    <Flex alignItems='center' justifyContent='center' py='5rem'>
      <Spinner size='xl' />
    </Flex>
  );
};

export default CustomerAuthContent;
