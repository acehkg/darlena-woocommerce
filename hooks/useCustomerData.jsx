import { useState, useEffect } from 'react';

export const useCustomerData = (data) => {
  const [paymentBadgeValue, setPaymentBadgeValue] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  //create an array of boolean value of all orders and filter for true
  useEffect(() => {
    const customerOrders = data?.orders?.edges?.map(({ node }) => {
      return node.needsPayment;
    });
    const needsPayment = customerOrders?.filter(Boolean);
    setPaymentBadgeValue(needsPayment?.length);
    setFirstName(data?.firstName);
    setEmail(data?.email);
    !data ? setIsLoading(true) : setIsLoading(false);
  }, [data]);

  return { paymentBadgeValue, firstName, email, isLoading };
};
