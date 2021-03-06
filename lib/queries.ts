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
                type
                image {
                  sourceUrl
                  mediaDetails {
                    height
                    width
                  }
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

export const PRODUCT_INFO_SIMPLE = gql`
  query getProduct($id: ID!) {
    product(id: $id, idType: ID) {
      ... on SimpleProduct {
        id
        regularPrice(format: RAW)
        salePrice(format: RAW)
        onSale
        stockStatus
        stockQuantity
        galleryImages {
          nodes {
            sourceUrl
            mediaDetails {
              width
              height
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
            mediaDetails {
              height
              width
            }
          }
        }
        productTags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export const PRODUCT_INFO_VARIABLE = gql`
  query getProduct($id: ID!) {
    product(id: $id, idType: ID) {
      ... on VariableProduct {
        id
        regularPrice(format: RAW)
        salePrice(format: RAW)
        onSale
        stockStatus
        variations(first: 100) {
          edges {
            node {
              attributes {
                nodes {
                  name
                  value
                }
              }
              regularPrice(format: RAW)
              salePrice(format: RAW)
              stockStatus
              id
              databaseId
              name
              status
              stockQuantity
            }
          }
        }
        galleryImages {
          nodes {
            sourceUrl
            mediaDetails {
              width
              height
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
            mediaDetails {
              height
              width
            }
          }
        }
        productTags {
          nodes {
            name
          }
        }
      }
    }
  }
`;

export const FEATURED_QUERY = gql`
  {
    products(where: { featured: true }) {
      edges {
        node {
          id
          name
          type
          description(format: RAW)
          productCategories {
            nodes {
              name
              id
            }
          }
          image {
            mediaDetails {
              height
              width
            }
            sourceUrl
          }
        }
      }
    }
  }
`;

export const CUSTOMER_ORDERS = gql`
  {
    customer {
      orders {
        nodes {
          needsPayment
          status
          orderNumber
          date
        }
      }
    }
  }
`;

export const CUSTOMER_ORDERS_DETAILED = gql`
  query getOrders {
    customer {
      orders {
        nodes {
          date
          datePaid
          dateCompleted
          needsPayment
          orderNumber
          paymentMethod
          status
          total
          lineItems {
            nodes {
              product {
                ... on VariableProduct {
                  name
                  databaseId
                  featuredImage {
                    node {
                      mediaDetails {
                        width
                        height
                      }
                      sourceUrl
                    }
                  }
                }
                ... on SimpleProduct {
                  name
                  databaseId
                  featuredImage {
                    node {
                      mediaDetails {
                        height
                        width
                      }
                      sourceUrl
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

export const PRODUCT_COMPLETE = gql`
  query getProduct($id: ID!) {
    product(id: $id, idType: ID) {
      ... on VariableProduct {
        id
        name
        databaseId
        status
        attributes {
          nodes {
            label
            name
            options
          }
        }
        databaseId
        description(format: RAW)
        featuredImage {
          node {
            mediaDetails {
              height
              width
            }
            sourceUrl
          }
        }
        galleryImages {
          nodes {
            mediaDetails {
              width
              height
            }
            sourceUrl
          }
        }
        regularPrice(format: FORMATTED)
        salePrice(format: FORMATTED)
        onSale
        status
        stockQuantity
        stockStatus
        variations {
          nodes {
            attributes {
              nodes {
                name
                value
              }
            }
            databaseId
            id
            name
            onSale
            regularPrice(format: FORMATTED)
            salePrice(format: FORMATTED)
            status
            stockQuantity
            stockStatus
          }
        }
        productTags {
          nodes {
            name
          }
        }
      }
      ... on SimpleProduct {
        id
        name
        databaseId
        status
        featuredImage {
          node {
            mediaDetails {
              height
              width
            }
            sourceUrl
          }
        }
        galleryImages {
          nodes {
            mediaDetails {
              height
              width
            }
            sourceUrl
            description(format: RAW)
          }
        }
        onSale
        regularPrice(format: FORMATTED)
        salePrice(format: FORMATTED)
        status
        stockQuantity
        stockStatus
      }
    }
  }
`;

export const STOCK_STATUS = gql`
  query getStock($id: ID!) {
    product(id: $id, idType: ID) {
      ... on VariableProduct {
        id
        databaseId
        type
        stockQuantity
        stockStatus
        variations {
          nodes {
            id
            databaseId
            name
            stockQuantity
            stockStatus
            attributes {
              nodes {
                label
                name
                value
              }
            }
          }
        }
      }
      ... on SimpleProduct {
        id
        type
        name
        databaseId
        stockQuantity
        stockStatus
      }
    }
  }
`;

export const FEATURED_PRODUCTS = gql`
  query getFeatured {
    products(where: { featured: true }) {
      nodes {
        ... on VariableProduct {
          id
          name
          databaseId
          description(format: RAW)
          featuredImage {
            node {
              mediaDetails {
                height
                width
              }
              sourceUrl
            }
          }
          salePrice(format: FORMATTED)
          regularPrice(format: FORMATTED)
          onSale
          productCategories {
            nodes {
              id
              databaseId
              name
            }
          }
        }
        ... on SimpleProduct {
          id
          name
          databaseId
          description(format: RAW)
          featuredImage {
            node {
              mediaDetails {
                height
                width
              }
              sourceUrl
            }
          }
          regularPrice(format: FORMATTED)
          onSale
          salePrice(format: FORMATTED)
          productCategories {
            nodes {
              id
              databaseId
              name
            }
          }
        }
      }
    }
  }
`;

export const PRODUCTS_BY_CATEGORY = gql`
  query getProductsByCategory($slug: [String]) {
    productCategories(where: { slug: $slug }) {
      nodes {
        name
        id
        databaseId
        products {
          nodes {
            ... on VariableProduct {
              id
              name
              databaseId
              description(format: RAW)
              featuredImage {
                node {
                  mediaDetails {
                    width
                    height
                  }
                  sourceUrl
                }
              }
              onSale
              regularPrice(format: FORMATTED)
              salePrice(format: FORMATTED)
            }
            ... on SimpleProduct {
              id
              name
              databaseId
              description
              featuredImage {
                node {
                  mediaDetails {
                    height
                    width
                  }
                  sourceUrl
                }
              }
              onSale
              regularPrice(format: FORMATTED)
              salePrice(format: FORMATTED)
            }
          }
        }
      }
    }
  }
`;
