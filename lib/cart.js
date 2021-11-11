import axios from 'axios';

const CART_ENDPOINT = 'https://store.darlena.shop/wp-json/rae/v1/cart/items';

const config = {
  headers: {
    'x-headless-CMS': true,
  },
  withCredentials: true,
};
export const deleteCart = async () => {
  try {
    const response = await axios.delete(CART_ENDPOINT, config);
    console.log(response.headers);
    return response.status;
  } catch (e) {
    console.log(e);
  }
};

export const addToCart = async (productId, quantity) => {
  try {
    const response = await axios.post(
      CART_ENDPOINT,
      { product_id: productId, quantity: quantity },
      config
    );

    return response;
  } catch (e) {
    console.log(e);
  }
};
