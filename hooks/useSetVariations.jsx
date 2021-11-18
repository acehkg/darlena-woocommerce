import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { STOCK_STATUS } from '../lib/queries';

const useCheckStock = (product) => {
  const [variations, setVariations] = useState(null);
  const [productReady, setProductReady] = useState(false);
  const id = product.id;
  const { loading, error, data } = useQuery(STOCK_STATUS, {
    variables: { id: id },
  });

  useEffect(() => {
    if (data?.product?.variations) {
      const variations = data.product.variations.nodes.map((node) => {
        return {
          id: node.id,
          name: node.name,
          attributes: node.attributes.nodes,
          databaseId: node.databaseId,
          stockStatus: node.stockStatus,
          stockQuantity: node.stockQuantity,
        };
      });
      setVariations(variations);
    }
  }, [data]);

  useEffect(() => {
    if (!loading && !error) {
      setProductReady(true);
    }
  }, [loading, error]);

  return { variations, productReady };
};

export default useCheckStock;
