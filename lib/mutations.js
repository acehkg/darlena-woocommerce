import { gql } from '@apollo/client';

export const LOG_IN = gql`
  mutation logIn($login: String!, $password: String!) {
    loginWithCookies(input: { login: $login, password: $password }) {
      status
    }
  }
`;

export const LOG_OUT = gql`
  mutation logOut {
    logout(input: {}) {
      status
    }
  }
`;
