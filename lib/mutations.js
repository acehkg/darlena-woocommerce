import { gql } from '@apollo/client';

export const LOG_IN = gql`
  mutation logIn($login: String!, $password: String!) {
    loginWithCookies(input: { login: $login, password: $password }) {
      status
    }
  }
`;

export const LOG_OUT = gql`
  mutation logOut {
    logout(input: {}) {
      status
    }
  }
`;

export const ADD_SIMPLE = gql`
  mutation addSimple($productId: Int!, $quantity: Int!) {
    addCartItems(
      input: { items: { productId: $productId, quantity: $quantity } }
    ) {
      clientMutationId
    }
  }
`;

export const ADD_VARIABLE = gql`
  mutation addVariable($productId: Int!, $variationId: Int!, $quantity: Int!) {
    addCartItems(
      input: {
        items: {
          productId: $productId
          variationId: $variationId
          quantity: $quantity
        }
      }
    ) {
      clientMutationId
    }
  }
`;

export const UPDATE_QUANTITY = gql`
  mutation updateQuantity($key: ID!, $quantity: Int!) {
    updateItemQuantities(input: { items: { key: $key, quantity: $quantity } }) {
      clientMutationId
    }
  }
`;

export const REMOVE_ITEM = gql`
  mutation removeItem($keys: [ID]) {
    removeItemsFromCart(input: { keys: $keys }) {
      clientMutationId
    }
  }
`;

export const CLEAR_CART = gql`
  mutation clearCart {
    removeItemsFromCart(input: { all: true }) {
      clientMutationId
    }
  }
`;
