import React, { createContext, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';

const CartContext = createContext();

export const CART_ITEMS = gql`
  {
    cart {
      subtotal
      shippingTotal
      subtotalTax
      total
      totalTax
      contents {
        itemCount
        nodes {
          key
          product {
            node {
              ... on VariableProduct {
                id
                name
                featuredImage {
                  node {
                    mediaDetails {
                      width
                      height
                    }
                    sourceUrl
                  }
                }
                price(format: RAW)
              }
              ... on SimpleProduct {
                id
                name
                featuredImage {
                  node {
                    mediaDetails {
                      height
                      width
                    }
                    sourceUrl
                  }
                }
                price(format: RAW)
              }
            }
          }
          quantity
          subtotal
        }
      }
    }
  }
`;

export function CartProvider({ children }) {
  const { data, loading, error } = useQuery(CART_ITEMS);
  const itemCount = data?.cart?.contents?.itemCount ?? 0;
  const lineItems = data?.cart?.contents?.nodes ?? [];

  const cartTotals = {
    subtotal: data?.cart?.subtotal,
    shippingTotal: data?.cart?.shippingTotal,
    subtotalTax: data?.cart?.subtotalTax,
    total: data?.cart?.total,
    totalTax: data?.cart?.totalTax,
  };
  const cartLoading = loading;
  const value = {
    cartTotals,
    itemCount,
    lineItems,
    cartLoading,
    error,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

const useCart = () => useContext(CartContext);

export default useCart;
