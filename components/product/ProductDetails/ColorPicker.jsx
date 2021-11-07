import {
  FormControl,
  FormLabel,
  HStack,
  useRadioGroup,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { ColorPickerOption } from './ColorPickerOption';

export const ColorPicker = (props) => {
  const { options, rootProps, hideLabel, label, ...rest } = props;
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const { getRadioProps, getRootProps, value } = useRadioGroup(rest);

  useEffect(() => {
    setSelectedOption(options.find((option) => option.value == value));
  }, [value, options]);

  return (
    <FormControl {...rootProps}>
      {!hideLabel && (
        <FormLabel fontSize='sm' fontWeight='medium'>
          {!selectedOption
            ? 'Color: Please Select'
            : `Color: ${selectedOption?.label}`}
        </FormLabel>
      )}
      <HStack {...getRootProps()}>
        {options.map((option) => (
          <ColorPickerOption
            key={option.label}
            color={!option.inStock ? 'brandGrey.400' : option.hex}
            isDisabled={!option.inStock}
            {...getRadioProps({
              value: option.value,
            })}
          />
        ))}
      </HStack>
    </FormControl>
  );
};
