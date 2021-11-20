import React, { createContext, useContext } from 'react';
import { useQuery, gql } from '@apollo/client';

const CartContext = createContext();

export const CART_ITEMS = gql`
  query getCart {
    cart {
      subtotal
      shippingTotal
      subtotalTax
      total
      totalTax
      contents {
        itemCount
        nodes {
          variation {
            attributes {
              label
              name
              value
            }
          }
          key
          product {
            node {
              ... on VariableProduct {
                id
                name
                variations {
                  nodes {
                    id
                    databaseId
                    name
                    attributes {
                      nodes {
                        label
                        name
                        value
                      }
                    }
                  }
                }
                featuredImage {
                  node {
                    mediaDetails {
                      width
                      height
                    }
                    sourceUrl
                  }
                }
                price(format: FORMATTED)
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
                price(format: FORMATTED)
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
