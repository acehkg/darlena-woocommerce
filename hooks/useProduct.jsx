import { useQuery } from '@apollo/client';
import { PRODUCT_INFO_SIMPLE, PRODUCT_INFO_VARIABLE } from '../lib/queries';

export const useProduct = (product) => {
  let query;
  if (product.type === 'SIMPLE') {
    query = PRODUCT_INFO_SIMPLE;
  }
  if (product.type === 'VARIABLE') {
    query = PRODUCT_INFO_VARIABLE;
  }
  const id = product.id;

  const { loading, error, data } = useQuery(query, {
    variables: { id: id },
  });

  return { loading, error, data };
};
