import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCT_INFO_SIMPLE, PRODUCT_INFO_VARIABLE } from '../lib/queries';

export const useProduct = (product, attributes) => {
  const [ready, setReady] = useState(false);
  const [optionsWithStock, setOptionsWithStock] = useState([]);
  const [variations, setVariations] = useState([]);
  const [productDetails, setProductDetails] = useState({});
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

  useEffect(() => {
    if (!loading && !error) {
      const variations = data.product.variations.edges.map(({ node }) => {
        return {
          id: node.id,
          attributes: node.attributes,
          status: node.status,
          regularPrice: node.regularPrice,
          salePrice: node.salePrice,
          stockStatus: node.stockStatus,
          stockQuantity: node.stockQuantity,
        };
      });

      setVariations(variations);
      setProductDetails(data.product);
    }
  }, [loading, data, error]);

  useEffect(() => {
    if (attributes && variations.length > 0) {
      const options = attributes[0].options.map((o) => {
        const target = variations.find(
          (f) => f.attributes.nodes[0].value === o.value
        );
        let status;
        if (target.stockStatus === 'IN_STOCK') {
          status = true;
        } else {
          status = false;
        }

        return { label: o.label, value: o.value, inStock: status };
      });
      setOptionsWithStock(options);
      setReady(true);
    }
  }, [variations, attributes]);

  return { ready, productDetails, variations, optionsWithStock };
};
