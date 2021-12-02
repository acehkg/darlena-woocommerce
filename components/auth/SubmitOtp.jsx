import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Spinner } from '@chakra-ui/react';
import useLogin from '../../hooks/useLogin';
import axios from 'axios';

const SubmitOtp = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(true);
  const { loginStatus } = useLogin();

  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  const config = {
    withCredentials: true,
  };

  useEffect(() => {
    const { otpUrl } = loginStatus;

    const login = () => {
      if (otpUrl) {
        try {
          const res = axios.get(otpUrl, config);
          console.log(res);
          setIsSubmitting(false);
          router.reload;
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
