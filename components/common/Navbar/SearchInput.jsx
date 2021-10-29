import { Input, InputGroup, InputLeftElement, Icon } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';

const SearchInput = ({ ...rest }) => {
  return (
    <InputGroup {...rest}>
      <InputLeftElement pointerEvents='none'>
        {<Icon as={FiSearch} fontSize='1.5rem' />}
      </InputLeftElement>
      <Input
        type='text'
        placeholder='...search'
        bg='brandGrey.300'
        borderRadius='25px'
        focusBorderColor='brandGold.100'
      />
    </InputGroup>
  );
};

export default SearchInput;
