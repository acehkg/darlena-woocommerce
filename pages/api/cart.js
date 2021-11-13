import CoCartAPI from '@cocart/cocart-rest-api';

export default async function handler(req, res) {
  const CoCart = new CoCartAPI({
    url: 'https://store.darlena.shop',
  });

  var data = {
    id: ' 73',
    quantity: '1',
    variation: {
      attribute_size: '46',
    },
  };

  const response = await CoCart.post(
    'cart/add-item?cart_key=32a0e75834a4f9d3e881c60b66e32004',
    data
  );
  console.log(response.data);
  console.log(response.headers);

  res.status(200).json({ message: 'success' });
}
