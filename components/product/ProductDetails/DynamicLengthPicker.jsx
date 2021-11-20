import {
  FormControl,
  FormLabel,
  HStack,
  useRadioGroup,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

import { SizePickerButton } from './SizePickerButton';

export const DynamicLengthPicker = (props) => {
  const {
    options,
    rootProps,
    hideLabel,
    label,
    inStock,
    setSelectedLength,
    ...rest
  } = props;
  const [selectedOption, setSelectedOption] = useState();
  const { getRadioProps, getRootProps, value } = useRadioGroup(rest);
  const [lengthLabel, setLengthLabel] = useState('Please Select A Length');

  useEffect(() => {
    setSelectedOption(options.find((option) => option.value == value));
  }, [value, options]);
  useEffect(() => {
    setSelectedLength(selectedOption);
  }, [selectedOption, setSelectedLength]);

  useEffect(() => {
    if (!inStock) {
      setSizeLabel('Out Of Stock');
    } else {
      selectedOption && setLengthLabel(`Length: ${selectedOption.value}`);
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
          {lengthLabel}
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
