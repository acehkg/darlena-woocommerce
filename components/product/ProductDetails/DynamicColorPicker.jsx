import {
  FormControl,
  FormLabel,
  HStack,
  useRadioGroup,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ColorPickerOption } from './ColorPickerOption';

export const DynamicColorPicker = (props) => {
  const {
    options,
    rootProps,
    hideLabel,
    setSelectedColor,
    inStock,
    label,
    ...rest
  } = props;
  const [selectedOption, setSelectedOption] = useState();
  const [colorLabel, setColorLabel] = useState('Please Select A Color');
  const { getRadioProps, getRootProps, value } = useRadioGroup(rest);

  useEffect(() => {
    setSelectedOption(options.find((option) => option.value == value));
  }, [value, options]);

  useEffect(() => {
    setSelectedColor(selectedOption);
  }, [setSelectedColor, selectedOption]);

  useEffect(() => {
    if (!inStock) {
      setColorLabel('Out Of Stock');
    } else {
      selectedOption && setColorLabel(`Color: ${selectedOption.value}`);
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
          {colorLabel}
        </FormLabel>
      )}
      <HStack {...getRootProps()}>
        {options.map((option) => (
          <ColorPickerOption
            key={option.label}
            color={!option.inStock ? 'brandGrey.400' : option.hex}
            {...getRadioProps({
              value: option.value,
            })}
          />
        ))}
      </HStack>
    </FormControl>
  );
};
