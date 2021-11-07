import { useState, useEffect } from 'react';

export const useStaticProduct = (product) => {
  const [attributes, setAttributes] = useState();
  const [sizes, setSizes] = useState(false);
  const [colors, setColors] = useState(false);

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

      switch (attributes.length) {
        case 1:
          if (attributes.name === 'size') {
            setSizes(attributes[0]);
          }
          if (attributes.name === 'color') {
            setColors(attributes[0]);
          }
          break;
        case 2:
          attributes.map((a) => {
            if (a.name === 'size') {
              setSizes(a);
            }
            if (a.name === 'color') {
              setColors(a);
            }
          });
      }
    }
  }, [product]);

  return { attributes, sizes, colors };
};
