import { useState, useEffect } from 'react';
export const useFeaturedProducts = (products, category) => {
  const [categoryProducts, setCategoryProducts] = useState([]);

  const fitleredProducts = products.filter((p) => p.categoryName === category);
  useEffect(() => {
    setCategoryProducts(fitleredProducts);
  }, []);

  return categoryProducts;
};
