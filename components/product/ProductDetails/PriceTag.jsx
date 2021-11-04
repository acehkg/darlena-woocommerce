import { HStack, Text, useColorModeValue as mode } from '@chakra-ui/react';
import * as React from 'react';
export function formatPrice(value, opts = {}) {
  const { locale = 'en-US', currency = 'USD' } = opts;
  const formatter = new Intl.NumberFormat(locale, {
    currency,
    style: 'currency',
    maximumFractionDigits: 2,
  });
  return formatter.format(value);
}

export const PriceTag = (props) => {
  const { price, currency, rootProps, priceProps, salePriceProps } = props;
  const { regularPrice, onSale, salePrice } = price;
  return (
    <HStack spacing='1' {...rootProps}>
      <Price isOnSale={onSale} textProps={priceProps}>
        {formatPrice(regularPrice, {
          currency,
        })}
      </Price>
      {salePrice && (
        <SalePrice {...salePriceProps}>
          {formatPrice(salePrice, {
            currency,
          })}
        </SalePrice>
      )}
    </HStack>
  );
};

const Price = (props) => {
  const { isOnSale, children, textProps } = props;
  const defaultColor = mode('gray.700', 'gray.400');
  const onSaleColor = mode('gray.400', 'gray.700');
  const color = isOnSale ? onSaleColor : defaultColor;
  return (
    <Text
      as='span'
      fontWeight='medium'
      color={color}
      textDecoration={isOnSale ? 'line-through' : 'none'}
      {...textProps}
    >
      {children}
    </Text>
  );
};

const SalePrice = (props) => (
  <Text
    as='span'
    fontWeight='semibold'
    color={mode('gray.800', 'gray.100')}
    {...props}
  />
);
