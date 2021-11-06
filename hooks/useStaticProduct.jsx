import { useState, useEffect } from 'react';

export const useStaticProduct = (product) => {
  const [attributes, setAttributes] = useState();

  useEffect(() => {
    if (product.type === 'SIMPLE') {
      setAttributes(false);
    }
    if (product.type === 'VARIABLE') {
      const attributes = product.attributes.edges.map(({ node }) => {
        const formattedOptions = node.options.map((o) => {
          return { label: o, value: o, inStock: true };
        });
        return {
          name: node.name,
          label: node.label,
          options: formattedOptions,
        };
      });

      setAttributes(attributes);
    }
  }, [product]);

  return { attributes };
};
