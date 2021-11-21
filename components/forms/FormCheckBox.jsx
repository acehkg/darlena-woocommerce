import { useField } from 'formik';
import {
  FormControl,
  FormLabel,
  Checkbox,
  FormErrorMessage,
} from '@chakra-ui/react';

const FormCheckBox = ({ label, text, ...props }) => {
  // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]

  // which we can spread on <input>. We can use field meta to show an error

  // message if the field is invalid and it has been touched (i.e. visited)

  const [field, meta] = useField(props);

  return (
    <FormControl isInvalid={meta.error}>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>

      <Checkbox {...field}>{text}</Checkbox>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
};

export default FormCheckBox;
