export const useCategories = (categories) => {
  const filteredCategories = categories.filter(
    (c) => c.name !== 'Uncategorized'
  );

  const mainCategoryNoChildren = filteredCategories.filter(
    (c) => !c.children && !c.parentId
  );

  const mainCategoryWithChildren = filteredCategories.filter(
    (c) => c.children && !c.parentId
  );

  const organinzedCategories = [
    ...mainCategoryNoChildren,
    ...mainCategoryWithChildren,
  ];

  return { organinzedCategories };
};
