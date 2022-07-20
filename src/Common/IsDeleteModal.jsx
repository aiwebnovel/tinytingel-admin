import { Modal, ModalOverlay,ModalContent, ModalHeader,ModalFooter, ModalBody, ModalCloseButton, HStack} from '@chakra-ui/react';
import { DeleteBtn, CancelBtn } from 'styles/ComponentStyle';

const IsDeleteModal = ({isOpen, onClose, Delete}) => {
 return(
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>
        <ModalCloseButton />
      </ModalHeader>

      <ModalBody
        textAlign={'center'}
        fontSize="1.2rem"
        fontWeight={600}
        padding="20px 24px 10px"
      >
        삭제하시겠습니까?
      </ModalBody>
      <ModalFooter justifyContent={'center'}>
        <HStack>
          <DeleteBtn onClick={Delete}>삭제</DeleteBtn>
          <CancelBtn onClick={onClose}>취소</CancelBtn>
        </HStack>
      </ModalFooter>
    </ModalContent>
  </Modal>
 )
}

export default IsDeleteModal;