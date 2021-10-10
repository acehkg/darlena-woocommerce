import { useQuery, ApolloError } from '@apollo/client';
import React, { createContext, useContext, ReactNode } from 'react';
import { GET_CUSTOMER_INFO } from '../lib/queries';

export type Customer = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  billing?: BasicAddress;
  shipping?: ShippingAddress;
};

interface BasicAddress {
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  phone?: string;
  postcode?: string;
}

interface ShippingAddress extends BasicAddress {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface CustomerStatus {
  loggedIn: boolean;
  loading: boolean;
  error?: ApolloError;
}

const DEFAULT_STATE: CustomerStatus = {
  loggedIn: false,
  loading: false,
  error: undefined,
};

const CustomerContext = createContext(DEFAULT_STATE);

export function CustomerProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useQuery(GET_CUSTOMER_INFO);
  const customer = data?.customer;
  const loggedIn = Boolean(customer);

  const value = {
    loggedIn,
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
