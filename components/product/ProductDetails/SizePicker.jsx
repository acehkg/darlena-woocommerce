import {
  FormControl,
  FormLabel,
  HStack,
  useRadioGroup,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { SizePickerButton } from './SizePickerButton';

export const SizePicker = (props) => {
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
            ? 'Size: Please Select'
            : `Size: ${selectedOption?.label}`}
        </FormLabel>
      )}
      <HStack {...getRootProps()}>
        {options.map((option) => (
          <SizePickerButton
            key={option.value}
            label={option.label}
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
