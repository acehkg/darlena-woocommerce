import { useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/react';
import useLogin from '../../hooks/useLogin';
import axios from 'axios';

const SubmitLogin = () => {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const { loginStatus, setSuccess } = useLogin();

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const config = {
    withCredentials: true,
  };

  useEffect(() => {
    const { logInUrl } = loginStatus;

    const login = async () => {
      if (logInUrl) {
        try {
          const response = await axios.post(logInUrl, config);
          const data = await response.data;

          if (data.success === true) {
            setSuccess(data.success);
            setIsSubmitting(false);
          } else {
            setSuccess(false);
          }
        } catch (e) {
          console.log('error', e);
        }
      }
    };
    login();
    return () => {
      source.cancel;
    };
    //eslint-disable-next-line
  }, []);

  return <>{isSubmitting && <Spinner />}</>;
};

export default SubmitLogin;
