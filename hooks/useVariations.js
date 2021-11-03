import { useState, useEffect } from 'react';

export function useVariations(data, loading) {
  const [variations, setVariations] = useState(false);
  useEffect(() => {
    if (!loading) {
      setVariations(
        data.product.variations.edges.map(({ node }) => {
          return {
            id: node.id,
            attributes: node.attributes,
            status: node.status,
            regularPrice: node.regularPrice,
            salePrice: node.salePrice,
            stockStatus: node.stockStatus,
            stockQuantity: node.stockQuantity,
          };
        })
      );
    }
  }, [loading, data]);

  return { variations };
}
