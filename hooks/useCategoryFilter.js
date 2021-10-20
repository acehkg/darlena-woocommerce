import { useState, useEffect } from 'react';

export const useCategoryFilter = (mainCategory) => {
  const [categoryFilters, setCategoryFilters] = useState({});
  const [mainChildren, setMainChildren] = useState([]);

  useEffect(() => {
    if (mainCategory?.children) {
      setMainChildren(
        mainCategory.children.map(({ node }) => {
          const parentPath = `/category/${mainCategory.slug}`;
          const grandParentPath = `/category/${mainCategory.slug}/${node.slug}`;
          const children =
            node.children.edges.length > 0
              ? node.children.edges.map(({ node }) => {
                  return {
                    id: node.id,
                    name: node.name,
                    href: `${grandParentPath}/${node.slug}`,
                  };
                })
              : false;

          return {
            id: node.id,
            name: node.name,
            href: grandParentPath,
            children: children,
          };
        })
      );
    }
  }, [mainCategory]);

  useEffect(() => {
    setCategoryFilters({
      mainName: mainCategory?.name,
      mainPath: `/category/${mainCategory?.slug}`,
      mainChildren,
    });
  }, [mainCategory, mainChildren]);

  return {
    categoryFilters,
  };
};
