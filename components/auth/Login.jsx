import { useEffect } from 'react';
import LogInCard from './LogInCard';

import { LoginProvider } from '../../hooks/useLogin';

const Login = () => {
  //first display choose method Phone or Email
  //Email or Phone and first time checkbox
  //if first time first_name last_name plus handling for if they didn't enter first time and it is
  //log customer in

  return (
    <LoginProvider>
      <LogInCard />
    </LoginProvider>
  );
};

export default Login;
