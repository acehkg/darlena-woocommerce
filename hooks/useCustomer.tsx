import { useQuery, gql, ApolloError } from '@apollo/client';
import React, { createContext, useContext, ReactNode } from 'react';

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
  orders: Orders;
  shipping: Address;
}

interface CustomerData {
  customer?: Customer;
  loading: Boolean;
  error?: ApolloError;
}

const DEFAULT_STATE: CustomerData = {
  customer: undefined,
  loading: false,
  error: undefined,
};

const CustomerContext = createContext(DEFAULT_STATE);

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
        nodes {
          lineItems {
            nodes {
              product {
                id
                name
              }
            }
          }
          needsPayment
          id
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

export function CustomerProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useQuery(GET_CUSTOMER);
  const customer = data?.customer;

  const value = {
    customer,
    loading,
    error,
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
}

const useCustomer = () => useContext(CustomerContext);

export default useCustomer;
