import {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from 'react';
import axios from 'axios';

const LoginContext = createContext();

const ACTIONS = {
  SELECT_METHOD: 'select-method',
  SET_FIRST_TIME: 'set-first-time',
  SET_PHONE: 'set-phone',
  SET_EMAIL: 'set-email',
  SET_NAME: 'set-name',
};

const reducer = (loginStatus, action) => {
  switch (action.type) {
    case ACTIONS.SELECT_METHOD:
      loginStatus.method = action.payload.method;
      loginStatus.loginFlow = 'method';
      return { ...loginStatus };
    case ACTIONS.SET_FIRST_TIME:
      if (action.payload.firstTime === false) {
        loginStatus.loginFlow = 'otp';
        loginStatus.firstTime = action.payload.firstTime;
      }
      if (action.payload.firstTime === true) {
        loginStatus.loginFlow = 'enter-name';
        loginStatus.firstTime = action.payload.firstTime;
      }
      return { ...loginStatus };
    case ACTIONS.SET_PHONE:
      loginStatus.phone = action.payload.phone;
      return { ...loginStatus };
    case ACTIONS.SET_EMAIL:
      loginStatus.email = action.payload.email;
      return { ...loginStatus };
    case ACTIONS.SET_NAME:
      loginStatus.firstName = action.payload.firstName;
      loginStatus.lastName = action.payload.lastName;
      return { ...loginStatus };
    default:
      return loginStatus;
  }
};

export const LoginProvider = ({ children }) => {
  const [otp, setOtp] = useState(null);
  const [loginStatus, dispatch] = useReducer(reducer, {
    loginFlow: 'start',
    method: null,
    error: null,
    firstTime: false,
    phone: null,
    email: null,
    firstName: null,
    lastName: null,
  });

  const selectPhoneLogin = () => {
    dispatch({ type: ACTIONS.SELECT_METHOD, payload: { method: 'phone' } });
  };

  const selectEmailLogin = () => {
    dispatch({ type: ACTIONS.SELECT_METHOD, payload: { method: 'email' } });
  };

  const setFirstTime = (firstTime) => {
    dispatch({
      type: ACTIONS.SET_FIRST_TIME,
      payload: { firstTime: firstTime },
    });
  };
  const setPhone = (phone) => {
    dispatch({
      type: ACTIONS.SET_PHONE,
      payload: { phone: phone },
    });
  };

  const setEmail = (email) => {
    dispatch({
      type: ACTIONS.SET_EMAIL,
      payload: { email: email },
    });
  };

  const setName = (firstName, lastName) => {
    dispatch({
      type: ACTIONS.SET_NAME,
      payload: { firstName: firstName, lastName: lastName },
    });
  };
  console.log(loginStatus);
  const value = {
    loginStatus,
    selectEmailLogin,
    selectPhoneLogin,
    setFirstTime,
    setPhone,
    setEmail,
    setName,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

const useLogin = () => useContext(LoginContext);

export default useLogin;
