import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { PRODUCT_INFO_SIMPLE, PRODUCT_INFO_VARIABLE } from '../lib/queries';

export const useProduct = (product, attributes) => {
  const [ready, setReady] = useState(false);
  const [optionsWithStock, setOptionsWithStock] = useState([]);
  const [variations, setVariations] = useState([]);
  const [productDetails, setProductDetails] = useState();
  const [price, setPrice] = useState();

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
    if (!loading && !error && product.type === 'VARIABLE') {
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
      const [regPri] = data.product.regularPrice.split(',');

      if (data.product.salePrice !== null) {
        const [salePri] = data.product.salePrice.split(',');
        setPrice({
          regularPrice: regPri,
          onSale: data.product.onSale,
          salePrice: salePri,
        });
      } else {
        setPrice({
          regularPrice: regPri,
          onSale: data.product.onSale,
          salePrice: data.product.salePrice,
        });
      }
    }
    if (!loading && !error && product.type === 'SIMPLE') {
      setVariations(false);
      setProductDetails(data.product);
      setPrice({
        regularPrice: data.product.regularPrice,
        onSale: data.product.onSale,
        salePrice: data.product.salePrice,
      });
    }
  }, [loading, data, error, product]);

  useEffect(() => {
    if (attributes && variations.length > 0) {
      const options = attributes[0].options.map((o) => {
        const target = variations.find(
          (f) => f.attributes.nodes[0].value === o.value
        );
        let status;
        if (
          target.stockStatus === 'OUT_OF_STOCK' ||
          target.stockQuantity === 0
        ) {
          status = false;
        } else {
          status = true;
        }

        return { label: o.label, value: o.value, inStock: status };
      });
      setOptionsWithStock(options);
    }
  }, [variations, attributes]);

  useEffect(() => {
    if (!loading && !error && productDetails) {
      setReady(true);
    }
  }, [loading, error, productDetails]);

  return { ready, productDetails, variations, optionsWithStock, price };
};
