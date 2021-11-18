import { useState, useEffect } from 'react';

export const useStaticProduct = (product) => {
  const [attributes, setAttributes] = useState();
  const [sizes, setSizes] = useState(null);
  const [colors, setColors] = useState(null);
  const [price, setPrice] = useState();

  useEffect(() => {
    if (product.attributes) {
      const attributes = product.attributes.nodes.map((node) => {
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
        //enforce rules for content creators so only expected variations are used. More robust.
        case 1:
          if (attributes[0].name === ('size' || 'Size')) {
            setSizes(attributes[0]);
          }
          if (attributes[0].name === ('Color' || 'color')) {
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
            if (a.name === ('size' || 'Size')) {
              setSizes(a);
            }
            if (a.name === ('color' || 'Color')) {
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
          break;
      }
    }

    if (!product.attributes) {
      setAttributes(false);
    }

    setPrice({
      regularPrice: product.regularPrice,
      onSale: product.onSale,
      salePrice: product.salePrice,
    });
  }, [product]);

  return { attributes, sizes, colors, price };
};
