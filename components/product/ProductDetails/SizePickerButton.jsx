import { Button, chakra, useRadio, VisuallyHidden } from '@chakra-ui/react';

export const SizePickerButton = (props) => {
  const { value, label } = props;

  const { getInputProps, htmlProps, getCheckboxProps, getLabelProps } =
    useRadio(props);

  return (
    <chakra.label {...htmlProps}>
      <chakra.input {...getInputProps()} />
      <Button
        as='span'
        px='0'
        cursor='pointer'
        variant='outline'
        color='brandGrey.300'
        borderRadius='base'
        borderColor='brandGrey.100'
        _checked={{
          color: 'brandGrey.300',
          bg: 'brandGrey.500',
          borderColor: 'brandGrey.100',
          borderWidth: '2px',
        }}
        _focus={{
          boxShadow: 'none',
        }}
        _focusVisible={{
          boxShadow: 'outline',
        }}
        {...getCheckboxProps()}
      >
        {value}
      </Button>
      <VisuallyHidden {...getLabelProps()}>{label} selected</VisuallyHidden>
    </chakra.label>
  );
};
