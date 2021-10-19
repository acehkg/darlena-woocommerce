import { gql } from '@apollo/client';

export interface Address {
  address1: string;
  address2: string;
  city: string;
  country: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  postcode: string;
  state: string;
}

export interface Product {
  id: string;
  name: string;
  price: string;
}
export type Products = Product[];

export interface Order {
  lineItems: Products;
  needsPayment: Boolean;
}
export type Orders = Order[];

export interface DetailedCustomer {
  billing: Address;
  email: string;
  firstName: string;
  lastName: string;
  orders: Orders;
  shipping: Address;
}

export const GET_CUSTOMER_ACCOUNT_INFO = gql`
  query getCustomerAccount($id: ID!) {
    customer(id: $id) {
      id
      billing {
        address1
        address2
        city
        country
        email
        firstName
        lastName
        phone
        postcode
        state
      }
      email
      firstName
      lastName
      orders {
        nodes {
          lineItems {
            nodes {
              product {
                id
                name
              }
            }
          }
          needsPayment
          id
        }
      }
      shipping {
        address1
        address2
        city
        country
        email
        firstName
        lastName
        phone
        postcode
        state
      }
    }
  }
`;

export const CATEGORIES_QUERY = gql`
  {
    productCategories(first: 500) {
      edges {
        node {
          id
          name
          slug
          parentId
          children {
            edges {
              node {
                name
                id
                slug
                parentId
                children {
                  edges {
                    node {
                      id
                      name
                      parentId
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const PRODUCTS_BY_CATEGORY_SLUG = gql`
  query getProducts($slug: [String]) {
    productCategories(first: 500, where: { slug: $slug }) {
      edges {
        node {
          id
          products {
            edges {
              node {
                id
                name
                image {
                  sourceUrl(size: WOOCOMMERCE_THUMBNAIL)
                }
                description(format: RAW)
              }
            }
          }
        }
      }
    }
  }
`;
