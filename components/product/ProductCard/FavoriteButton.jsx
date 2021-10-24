import { useState } from 'react';
import { Icon, IconButton, LightMode } from '@chakra-ui/react';
import { RiHeartLine, RiHeartFill } from 'react-icons/ri';

export const FavouriteButton = (props) => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <LightMode>
      <IconButton
        isRound
        bg='white'
        color='gray.900'
        size='sm'
        _hover={{
          transform: 'scale(1.1)',
        }}
        sx={{
          ':hover > svg': {
            transform: 'scale(1.1)',
            color: 'red',
          },
        }}
        transition='all 0.15s ease'
        icon={
          <Icon
            as={active ? RiHeartFill : RiHeartLine}
            transition='all 0.15s ease'
          />
        }
        boxShadow='base'
        onClick={handleClick}
        isActive={active}
        _active={{ color: 'red' }}
        {...props}
      />
    </LightMode>
  );
};
