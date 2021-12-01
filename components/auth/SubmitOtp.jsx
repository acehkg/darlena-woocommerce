import { useState, useEffect } from 'react';
import { Spinner } from '@chakra-ui/react';
import useLogin from '../../hooks/useLogin';
import axios from 'axios';

const SubmitOtp = () => {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const { loginStatus } = useLogin();

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  const config = {
    withCredentials: true,
  };

  const logInToWordpress = (url) => {
    console.log(url);
  };

  useEffect(() => {
    const { otpUrl } = loginStatus;

    const login = async () => {
      if (otpUrl) {
        try {
          const response = await axios.post(otpUrl, config);
          const data = await response.data;
          if (data.success === true && data.url) {
            logInToWordpress(data.url);
            setIsSubmitting(false);
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

export default SubmitOtp;
