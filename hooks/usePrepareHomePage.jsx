import { useState, useEffect } from 'react';

export const usePrepareHomePage = (categories, products, cat1, cat2, cat3) => {
  const [loading, setLoading] = useState(true);
  const [categoryOne, setCategoryOne] = useState();
  const [categoryTwo, setCategoryTwo] = useState();
  const [categoryThree, setCategoryThree] = useState();

  useEffect(() => {
    const p1 = products.filter((p) => p.categoryName === cat1);
    const p2 = products.filter((p) => p.categoryName === cat2);
    const p3 = products.filter((p) => p.categoryName === cat3);
    const c1 = categories.find((c) => c.name === cat1);
    const c2 = categories.find((c) => c.name === cat2);
    const c3 = categories.find((c) => c.name === cat3);
    setCategoryOne({ products: p1, category: c1 });
    setCategoryTwo({ products: p2, category: c2 });
    setCategoryThree({ products: p3, category: c3 });
  }, []);

  useEffect(() => {
    if ((categoryOne, categoryTwo, categoryThree)) {
      setLoading(false);
    }
  }, [categoryOne, categoryTwo, categoryThree]);

  return { categoryOne, categoryTwo, categoryThree, loading };
};
