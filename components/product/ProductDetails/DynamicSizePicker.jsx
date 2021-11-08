import {
  FormControl,
  FormLabel,
  HStack,
  useRadioGroup,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { SizePickerButton } from './SizePickerButton';

export const DynamicSizePicker = (props) => {
  const {
    options,
    rootProps,
    hideLabel,
    label,
    inStock,
    setSelectedSize,
    ...rest
  } = props;
  const [selectedOption, setSelectedOption] = useState();
  const { getRadioProps, getRootProps, value } = useRadioGroup(rest);
  const [sizeLabel, setSizeLabel] = useState('Please Select A Size');

  useEffect(() => {
    setSelectedOption(options.find((option) => option.value == value));
  }, [value, options]);
  useEffect(() => {
    setSelectedSize(selectedOption);
  }, [selectedOption, setSelectedSize]);

  useEffect(() => {
    if (!inStock) {
      setSizeLabel('Out Of Stock');
    } else {
      selectedOption && setSizeLabel(`Size: ${selectedOption.value}`);
    }
  }, [selectedOption, inStock]);

  return (
    <FormControl {...rootProps}>
      {!hideLabel && (
        <FormLabel
          fontSize='sm'
          fontWeight='medium'
          color={!inStock ? 'red' : 'brandGrey.100'}
        >
          {sizeLabel}
        </FormLabel>
      )}
      <HStack {...getRootProps()}>
        {options.map((option) => (
          <SizePickerButton
            key={option.value}
            label={option.label}
            {...getRadioProps({
              value: option.value,
            })}
          />
        ))}
      </HStack>
    </FormControl>
  );
};
