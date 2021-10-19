import { useState, useEffect } from 'react';

export const useCategoryFilter = (category, categories) => {
  const [currentCategory, setCurrentCategory] = useState({});
  const [hasChildren, setHasChildren] = useState(false);
  const [childCategories, setChildCategories] = useState([]);

  useEffect(() => {
    const [f] = categories.filter((c) => c.slug === category);
    setCurrentCategory(f);
  }, [category, categories]);

  useEffect(() => {
    if (currentCategory?.children && currentCategory.children.length > 0) {
      setHasChildren(true);
      setChildCategories(currentCategory.children);
    } else {
      setHasChildren(false);
    }
  }, [currentCategory]);

  return { hasChildren, childCategories, currentCategory };
};
