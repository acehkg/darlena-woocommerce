import { getAuthToken } from '../../lib/cookies';
import { useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GET_USER } from '../../hooks/useAuth';
import { useRouter } from 'next/dist/client/router';
import { LOG_OUT } from '../../lib/mutations';

const Customer = (props) => {
  const router = useRouter();

  const [logOut, { called, loading, error, data }] = useMutation(LOG_OUT, {
    refetchQueries: [{ query: GET_USER }],
  });
  const loggedOut = Boolean(data?.logout?.status);

  const handleSubmit = () => {
    logOut();
    router.push('/');
  };

  return (
    <div>
      <button onClick={handleSubmit}>LOG OUT</button>
    </div>
  );
};

export async function getServerSideProps(context) {
  //extract auth token from headers
  const authToken = getAuthToken(context.req);

  const { params } = context;

  const defaultProps = {
    props: {
      authToken,
      params,
    },
  };

  return defaultProps;
}

export default Customer;
