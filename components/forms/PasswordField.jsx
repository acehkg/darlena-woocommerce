import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useDisclosure,
  useMergeRefs,
} from '@chakra-ui/react';
import * as React from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { useField } from 'formik';

export const PasswordField = React.forwardRef((props, ref) => {
  //see FormTextInput component for details
  const [field, meta] = useField(props);
  const { isOpen, onToggle } = useDisclosure();
  const inputRef = React.useRef(null);
  const mergeRef = useMergeRefs(inputRef, ref);

  const onClickReveal = () => {
    onToggle();
    const input = inputRef.current;

    if (input) {
      input.focus({
        preventScroll: true,
      });
      const length = input.value.length * 2;
      requestAnimationFrame(() => {
        input.setSelectionRange(length, length);
      });
    }
  };

  return (
    <FormControl id='password' isInvalid={meta.error}>
      <Flex justify='space-between'>
        <FormLabel>Password</FormLabel>
        <Box as='a' color='blue.600' fontWeight='semibold' fontSize='sm'>
          Forgot Password?
        </Box>
      </Flex>
      <InputGroup>
        <InputRightElement>
          <IconButton
            bg='transparent !important'
            variant='ghost'
            aria-label={isOpen ? 'Mask password' : 'Reveal password'}
            icon={isOpen ? <HiEyeOff /> : <HiEye />}
            onClick={onClickReveal}
          />
        </InputRightElement>
        <Input
          ref={mergeRef}
          type={isOpen ? 'text' : 'password'}
          autoComplete='current-password'
          {...field}
        />
      </InputGroup>
      {meta.touched && meta.error ? (
        <FormErrorMessage>{meta.error}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
});
PasswordField.displayName = 'PasswordField';