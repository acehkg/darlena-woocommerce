import { useState, useEffect } from 'react';

export const useVariations = (variations, attributes) => {
  const [optionsWithStock, setOptionsWithStock] = useState([]);
  const [sizes, setSizes] = useState(false);
  const [colors, setColors] = useState(false);

  useEffect(() => {
    switch (attributes?.length) {
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
  }, [attributes]);

  /*   useEffect(() => {
    if (sizes) {
      const options = sizes.options.map((o) => {
        console.log(o);
 const target = variations.find(
          (f) => f.attributes.nodes[0].value === o.value
        );
        console.log(target); 
        let status;
        if (
          target.stockStatus === 'OUT_OF_STOCK' ||
          target.stockQuantity === 0
        ) {
          status = false;
        } else {
          status = true;
        }

        return { label: o.label, value: o.value, inStock: status }; 
      });
      setOptionsWithStock(options);
    }
  }, [variations, attributes]);*/

  return {};
};
