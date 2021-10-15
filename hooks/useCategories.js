export const useCategories = (categories) => {
  const filteredCategories = categories.filter(
    (c) => c.name !== 'Uncategorized'
  );
  console;

  return { filteredCategories };
};
