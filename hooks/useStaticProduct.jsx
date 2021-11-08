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
          if (attributes[0].name === 'size') {
            setSizes(attributes[0]);
          }
          if (attributes[0].name === 'color') {
            const withHex = attributes[0].options.map((hex) => {
              const split = hex.label.split('-');
              return {
                label: split[0],
                value: split[0],
                hex: split[1],
                inStock: hex.inStock,
              };
            });
            setColors({
              name: attributes[0].name,
              label: attributes[0].label,
              options: withHex,
            });
          }
          break;
        case 2:
          attributes.map((a) => {
            if (a.name === 'size') {
              setSizes(a);
            }
            if (a.name === 'color') {
              const withHex = a.options.map((hex) => {
                const split = hex.label.split('-');
                return {
                  label: split[0],
                  value: split[0],
                  hex: split[1],
                  inStock: hex.inStock,
                };
              });
              setColors({ name: a.name, label: a.label, options: withHex });
            }
          });
      }
    }
  }, [product]);

  return { attributes, sizes, colors };
};
