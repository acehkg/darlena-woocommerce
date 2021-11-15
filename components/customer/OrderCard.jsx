import { Box, Text } from '@chakra-ui/react';

const OrderCard = ({ order }) => {
  return (
    <Box>
      <Text>{order.id}</Text>
    </Box>
  );
};

export default OrderCard;
