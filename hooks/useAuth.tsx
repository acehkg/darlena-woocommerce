import { useQuery, gql, ApolloError } from '@apollo/client';
import React, { createContext, useContext, ReactNode } from 'react';

export interface User {
  id: string;
  databaseId: number;
  firstName: string;
  lastName: string;
  email: string;
  capabilities: string[];
}

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  orders: ArrayOfOrders;
};

interface ArrayOfOrders {
  [index: number]: orderNode;
}

interface orderNode {
  needsPayment: boolean;
}

interface AuthData {
  loggedIn: boolean;
  user?: User;
  loading: boolean;
  error?: ApolloError;
  customer?: Customer;
  customerLoading: boolean;
  customerError?: ApolloError;
}

const DEFAULT_STATE: AuthData = {
  loggedIn: false,
  user: undefined,
  loading: false,
  error: undefined,
  customer: undefined,
  customerLoading: false,
  customerError: undefined,
};

const AuthContext = createContext(DEFAULT_STATE);

export const GET_USER = gql`
  query getUser {
    viewer {
      id
      databaseId
      firstName
      lastName
      email
      capabilities
    }
  }
`;

export const GET_CUSTOMER_INFO = gql`
  query getCustomer {
    customer {
      orders {
        edges {
          node {
            needsPayment
          }
        }
      }
      email
      firstName
      lastName
    }
  }
`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useQuery(GET_USER);
  const {
    data: customerData,
    loading: customerLoading,
    error: customerError,
  } = useQuery(GET_CUSTOMER_INFO);
  const user = data?.viewer;
  const customer = data?.customer;
  const loggedIn = Boolean(user);

  const value = {
    loggedIn,
    user,
    customer,
    loading,
    customerData,
    customerLoading,
    customerError,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export default useAuth;
