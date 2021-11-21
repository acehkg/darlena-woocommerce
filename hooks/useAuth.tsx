import { useQuery, gql, ApolloError } from '@apollo/client';
import React, { createContext, useContext, ReactNode } from 'react';
import { useDisclosure } from '@chakra-ui/react';

export interface User {
  id: string;
  databaseId: number;
  firstName: string;
  lastName: string;
  email: string;
  capabilities: string[];
}
export interface Address {
  address1: string;
  address2: string;
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  postcode: string;
  state: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
}
export type Products = Product[];

export interface Order {
  lineItems: Products;
  needsPayment: Boolean;
}
export type Orders = Order[];

export interface Customer {
  id: string;
  billing: Address;
  email: string;
  firstName: string;
  lastName: string;
  orders: Orders;
  shipping: Address;
}

interface AuthData {
  loggedIn: boolean;
  user?: User;
  loading: boolean;
  error?: ApolloError;
  customerData?: Customer;
  customerLoading: boolean;
  customerError?: ApolloError;
}

const DEFAULT_STATE: AuthData = {
  loggedIn: false,
  user: undefined,
  loading: false,
  error: undefined,
  customerData: undefined,
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

export const GET_CUSTOMER = gql`
  query getCustomer {
    customer {
      id
      billing {
        address1
        address2
        city
        country
        email
        firstName
        lastName
        phone
        postcode
        state
      }
      orders {
        edges {
          node {
            lineItems {
              edges {
                node {
                  orderId
                  product {
                    name
                    type
                  }
                }
              }
            }
            needsPayment
            id
          }
        }
      }
      shipping {
        address1
        address2
        city
        country
        email
        firstName
        lastName
        phone
        postcode
        state
      }
    }
  }
`;

export function AuthProvider({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, loading, error } = useQuery(GET_USER);
  const {
    data: customerInfo,
    loading: customerLoading,
    error: customerError,
  } = useQuery(GET_CUSTOMER);
  const user = data?.viewer;
  const customerData = customerInfo?.customer;
  const loggedIn = Boolean(user);

  const value = {
    loggedIn,
    user,
    customerData,
    loading,
    customerLoading,
    customerError,
    error,
    isOpen,
    onOpen,
    onClose,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export default useAuth;
