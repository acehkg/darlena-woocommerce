import { useState, useEffect } from 'react';

export const useVariations = (variations) => {
  const [type, setType] = useState('none');

  return { type };
};

/*   useEffect(() => {
    if (attributes && variations.length > 0) {
      const options = attributes[0].options.map((o) => {
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
  }, [variations, attributes]); */
