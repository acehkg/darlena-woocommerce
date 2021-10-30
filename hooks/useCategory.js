import { useState, useEffect } from 'react';

export const useCategory = (categories, category) => {
  const [filteredCategory, setFilteredCategory] = useState([]);

  const filtered = categories.find((c) => c.name === category);

  useEffect(() => {
    setFilteredCategory(filtered);
  }, []);

  return filteredCategory;
};
