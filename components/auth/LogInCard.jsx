import { useEffect } from 'react';
import { Card } from '../forms/Card';
import InitialLogin from './InitialLogin';
import PhoneLogin from './PhoneLogin';
import EmailLogin from './EmailLogin';
import EnterName from './EnterName';
import useLogin from '../../hooks/useLogin';
import SubmitLogin from './SubmitLogin';
import EnterOtp from './EnterOtp';
import SubmitOtp from './SubmitOtp';

const LogInCard = () => {
  //add form validation

  const { loginStatus, setLogInUrl, setNameUrl } = useLogin();
  const { loginFlow, method, logInUrl, otpUrl } = loginStatus;
  useEffect(() => {
    loginStatus.loginFlow === 'prepared' &&
      setLogInUrl(loginStatus.phone, loginStatus.email);
  }, [loginStatus, setLogInUrl]);

  console.log(loginStatus);
  return (
    <Card>
      {(loginFlow === 'start' || !method) && <InitialLogin />}
      {loginFlow === 'method' && method === 'phone' && <PhoneLogin />}
      {loginFlow === 'method' && method === 'email' && <EmailLogin />}
      {loginFlow === 'enter-name' && <EnterName />}
      {logInUrl && <SubmitLogin />}
      {loginFlow === 'enter-otp' && <EnterOtp />}
      {otpUrl && <SubmitOtp />}
    </Card>
  );
};

export default LogInCard;
