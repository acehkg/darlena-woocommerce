import {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
} from 'react';
import useAxios from './useAxios';

const LoginContext = createContext();

const ACTIONS = {
  SELECT_METHOD: 'select-method',
  SET_FIRST_TIME: 'set-first-time',
  SET_PHONE: 'set-phone',
  SET_EMAIL: 'set-email',
  SET_NAME: 'set-name',
  SET_URL: 'set-url',
  SET_NAME_URL: 'set-name-url',
  SET_OTP_URL: 'set-otp-url',
  SET_SUCCESS: 'set-success',
  SET_TOKEN: 'set-token',
};

const BASE_URL = 'https://store.darlena.shop/wp-json/wp/v2/users';

const reducer = (loginStatus, action) => {
  switch (action.type) {
    case ACTIONS.SELECT_METHOD:
      loginStatus.method = action.payload.method;
      loginStatus.loginFlow = 'method';
      return { ...loginStatus };
    case ACTIONS.SET_FIRST_TIME:
      if (action.payload.firstTime === false) {
        loginStatus.firstTime = action.payload.firstTime;
      }
      if (action.payload.firstTime === true) {
        loginStatus.loginFlow = 'enter-name';
        loginStatus.firstTime = action.payload.firstTime;
      }
      return { ...loginStatus };
    case ACTIONS.SET_PHONE:
      loginStatus.phone = action.payload.phone;
      loginStatus.loginFlow = 'prepared';
      return { ...loginStatus };
    case ACTIONS.SET_EMAIL:
      loginStatus.email = action.payload.email;
      loginStatus.loginFlow = 'prepared';
      return { ...loginStatus };
    case ACTIONS.SET_NAME:
      loginStatus.firstName = action.payload.firstName;
      loginStatus.lastName = action.payload.lastName;
      loginStatus.loginFlow = 'prepared';
      return { ...loginStatus };
    case ACTIONS.SET_URL:
      loginStatus.logInUrl = action.payload.logInUrl;
      loginStatus.loginFlow = 'submit';
      return { ...loginStatus };
    case ACTIONS.SET_NAME_URL:
      loginStatus.nameUrl = action.payload.nameUrl;
      loginStatus.loginFlow = 'submit';
      return { ...loginStatus };
    case ACTIONS.SET_OTP_URL:
      loginStatus.otpUrl = action.payload.otpUrl;
      loginStatus.loginFlow = 'submit-otp';
      return { ...loginStatus };
    case ACTIONS.SET_SUCCESS:
      loginStatus.success = action.payload.success;
      loginStatus.loginFlow = 'enter-otp';
      return { ...loginStatus };
    case ACTIONS.SET_TOKEN:
      loginStatus.token = action.payload.token;
      return { ...loginStatus };
    default:
      return loginStatus;
  }
};

export const LoginProvider = ({ children }) => {
  const [loginStatus, dispatch] = useReducer(reducer, {
    loginFlow: 'start',
    method: null,
    error: null,
    firstTime: false,
    phone: null,
    email: null,
    firstName: null,
    lastName: null,
    logInUrl: null,
    nameUrl: null,
    otpUrl: null,
    success: null,
    token: null,
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

  const setLogInUrl = (phone, email) => {
    if (phone) {
      dispatch({
        type: ACTIONS.SET_URL,
        payload: { logInUrl: `${BASE_URL}/verification?post_val=${phone}` },
      });
    }
    if (email) {
      dispatch({
        type: ACTIONS.SET_URL,
        payload: { logInUrl: `${BASE_URL}/verification?post_val=${email}` },
      });
    }
  };

  const setNameUrl = (firstName, lastName) => {
    if (firstName && lastName) {
      dispatch({
        type: ACTIONS.SET_NAME_URL,
        payload: {
          nameUrl: `${BASE_URL}/info?first_name=${firstName}&last_name=${lastName}`,
        },
      });
    }
  };

  const setOtpUrl = (otp, token) => {
    dispatch({
      type: ACTIONS.SET_OTP_URL,
      payload: { otpUrl: `${BASE_URL}/otp?otp=${otp}&token=${token}` },
    });
  };

  const setSuccess = (success) => {
    dispatch({ type: ACTIONS.SET_SUCCESS, payload: { success: success } });
  };

  const setToken = (token) => {
    dispatch({ type: ACTIONS.SET_TOKEN, payload: { token: token } });
  };

  const value = {
    loginStatus,
    selectEmailLogin,
    selectPhoneLogin,
    setFirstTime,
    setPhone,
    setEmail,
    setName,
    setLogInUrl,
    setNameUrl,
    setOtpUrl,
    setSuccess,
    setToken,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

const useLogin = () => useContext(LoginContext);

export default useLogin;
