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
            shipping {
              address1
              address2
              city
              country
              phone
              postcode
              lastName
              firstName
              email
            }
          }
        }
      }
      billing {
        address1
        address2
        city
        country
        phone
        postcode
      }
      email
      firstName
      lastName
    }
  }
`;
