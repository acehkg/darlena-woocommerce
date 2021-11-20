import { FormControl, FormLabel, Select } from '@chakra-ui/react';
import { useState, useEffect } from 'react';

export const LengthPicker = (props) => {
  const {
    options,
    rootProps,
    hideLabel,
    label,
    inStock,

    ...rest
  } = props;
  const [selectedOption, setSelectedOption] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setSelectedOption(options.find((option) => option.value == e.target.value));
  };
  return (
    <FormControl {...rootProps}>
      {!hideLabel && (
        <FormLabel fontSize='sm' fontWeight='medium'>
          {!selectedOption
            ? 'Please Select A Length'
            : `Length: ${selectedOption?.label}`}
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
