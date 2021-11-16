import { useState, useEffect } from 'react';

export const useStaticProduct = (product) => {
  const [attributes, setAttributes] = useState();
  const [sizes, setSizes] = useState(false);
  const [colors, setColors] = useState(false);
  const [variations, setVariations] = useState([]);
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
            if (a.name === 'size' || 'Size') {
              setSizes(a);
            }
            if (a.name === 'color' || 'Color') {
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

    if (!product.attributes) {
      setAttributes(false);
    }
  }, [product]);

  useEffect(() => {
    if (product.variations) {
      const variations = product.variations.nodes.map((node) => {
        return {
          id: node.id,
          databaseId: node.databaseId,
          attributes: node.attributes.nodes,
          regularPrice: node.regularPrice,
          salePrice: node.salePrice,
          stockStatus: node.stockStatus,
          stockQuantity: node.stockQuantity,
        };
      });
      setVariations(variations);
      const [regPri] = product.regularPrice.split(',');

      if (product.salePrice !== null) {
        const [salePri] = product.salePrice.split(',');
        setPrice({
          regularPrice: regPri,
          onSale: product.onSale,
          salePrice: salePri,
        });
      } else {
        setPrice({
          regularPrice: regPri,
          onSale: product.onSale,
          salePrice: product.salePrice,
        });
      }
    }
    if (!product.variations) {
      setVariations(false);
      setPrice({
        regularPrice: product.regularPrice,
        onSale: product.onSale,
        salePrice: product.salePrice,
      });
    }
  }, [product]);

  return { attributes, sizes, colors, variations, price };
};
