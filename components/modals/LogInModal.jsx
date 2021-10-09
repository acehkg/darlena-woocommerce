import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
} from '@chakra-ui/react';

import { FaRegUserCircle } from 'react-icons/fa';

import LogInCard from '../forms/LogInCard';

const LogInModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Box display='flex' justifyContent='center'>
            <FaRegUserCircle size={64} />
          </Box>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <LogInCard />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LogInModal;
