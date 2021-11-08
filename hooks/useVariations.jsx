import { useState, useEffect } from 'react';
import { RiContactsBookLine } from 'react-icons/ri';

export const useVariations = (variations, sizes, colors) => {
  const [optionsWithStock, setOptionsWithStock] = useState([]);
  const [sizesWithStock, setSizesWithStock] = useState(false);
  const [colorswithStock, setColorsWithStock] = useState(false);

  /* 
  useEffect(() => {
    switch (attributes?.length) {
      case 1:
        if (attributes[0].name === 'size') {
          setSizes(attributes[0]);
        }
        if (attributes[0].name === 'color') {
          setColors(attributes[0]);
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
  }, [attributes]); */

  useEffect(() => {
    console.log(variations);
    if (sizes && colors) {
      const outOfStock = variations.filter(
        (v) => v.stockStatus === 'OUT_OF_STOCK'
      );

      console.log(outOfStock);
      /* const test = sizes?.map((s) => {
        const target = variations.find((v) => {
          s?.attributes?.nodes;
        });
      }); */
    }
  }, [sizes, colors, variations]);

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
