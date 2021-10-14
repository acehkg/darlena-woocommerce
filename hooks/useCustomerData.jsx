import { useState, useEffect } from 'react';

export const useCustomerData = (data) => {
  const [paymentBadgeValue, setPaymentBadgeValue] = useState(0);

  //create an array of boolean value of all orders and filter for true
  useEffect(() => {
    const customerOrders = data?.orders?.edges?.map(({ node }) => {
      return node.needsPayment;
    });

    const needsPayment = customerOrders?.filter(Boolean);
    setPaymentBadgeValue(needsPayment?.length);
  }, [data]);

  return { paymentBadgeValue };
};
