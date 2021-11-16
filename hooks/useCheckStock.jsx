import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { STOCK_STATUS } from '../lib/queries';

const useCheckStock = (product) => {
  const id = product.id;

  const { loading, error, data } = useQuery(STOCK_STATUS, {
    variables: { id: id },
  });

  return null;
};

export default useCheckStock;
