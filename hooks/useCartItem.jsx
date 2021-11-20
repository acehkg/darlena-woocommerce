import { useState, useEffect } from 'react';

const useCartItem = (item) => {
  const [itemVariation, setItemVariation] = useState(null);

  useEffect(() => {
    const atts = item?.variation?.attributes.map((a) => {
      if (a.name === ('color' || 'color')) {
        const [color] = a.value.split('-');
        return { name: a.name, value: color };
      }
      if (a.name !== ('color' || 'color')) {
        return { name: a.name, value: a.value };
      }
    });
    setItemVariation(atts);
  }, [item]);

  return { itemVariation };
};

export default useCartItem;
