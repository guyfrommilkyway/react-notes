// packages
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const CustomModal: React.FC<ModalProps> = props => {
  const { header, body, footer, isOpen, onClose } = props;

  return (
    <Modal size='xl' isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg='brand.200' rounded='lg'>
        {header && <ModalHeader>{header}</ModalHeader>}
        <ModalCloseButton />
        {body && <ModalBody p='md'>{body}</ModalBody>}
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </Modal>
  );
};

export default CustomModal;

CustomModal.propTypes = {
  header: PropTypes.element,
  body: PropTypes.element,
  footer: PropTypes.element,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
