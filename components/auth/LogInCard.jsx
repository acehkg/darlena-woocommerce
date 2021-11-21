import { useEffect } from 'react';
import { Card } from '../forms/Card';
import InitialLogin from './InitialLogin';
import PhoneLogin from './PhoneLogin';
import EmailLogin from './EmailLogin';
import EnterName from './EnterName';
import useLogin from '../../hooks/useLogin';

const LogInCard = () => {
  //add form validation

  const { loginStatus } = useLogin();
  const { loginFlow, method } = loginStatus;

  return (
    <Card>
      {(loginFlow === 'start' || !method) && <InitialLogin />}
      {loginFlow === 'method' && method === 'phone' && <PhoneLogin />}
      {loginFlow === 'method' && method === 'email' && <EmailLogin />}
      {loginFlow === 'enter-name' && <EnterName />}
    </Card>
  );
};

export default LogInCard;
