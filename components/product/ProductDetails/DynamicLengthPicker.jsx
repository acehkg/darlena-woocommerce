import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

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
  const [lengthLabel, setLengthLabel] = useState('Please Select A Length');

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

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedOption(options.find((option) => option.value == e.target.value));
  };
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
      <Select
        size='md'
        maxW='10rem'
        dir='ltr'
        focusBorderColor='grey.100'
        borderColor='grey.100'
        onChange={(e) => handleChange(e)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.value}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
