import { gql } from '@apollo/client';

export const GET_CUSTOMER_INFO = gql`
  query getCustomer {
    customer {
      orders {
        edges {
          node {
            needsPayment
            orderNumber
            lineItems {
              edges {
                node {
                  orderId
                  productId
                  quantity
                  total
                  product {
                    name
                  }
                }
              }
            }
          }
        }
      }
      firstName
      email
    }
  }
`;
