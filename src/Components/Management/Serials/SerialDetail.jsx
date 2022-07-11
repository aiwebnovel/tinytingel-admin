import {
    Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, HStack, Button } from '@chakra-ui/react';
import { Modify, SmallDelete } from 'styles/ComponentStyle';

const SerialDetail = ({isOpen, onClose}) => {
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>

          <ModalBody>
            <Box>
              <div className="SerialDetailModal">
                <h4>시리얼넘버</h4>
                <input type='text'/>
              </div>
              <div className="SerialDetailModal">
                <h4>캠페인명</h4>
                <input type='text'/>
              </div>
              <div className="SerialDetailModal">
                <h4>상세설명</h4>
                <input type='text'/>
              </div>
                <div className="SerialDetailModal">
                <h4>생성일자</h4>
                <p></p>
              </div>
              <div className="SerialDetailModal">
                <h4>혜택구분</h4>
                <p></p>
              </div>
              <div className="SerialDetailModal">
                <h4>사용여부</h4>
                <p></p>
              </div>
              <div className="SerialDetailModal">
                <h4>사용기간</h4>
                <p></p>
              </div>
              <div className="SerialDetailModal">
                <h4>사용자</h4>
                <p></p>
              </div>
            </Box>
          </ModalBody>
          <ModalFooter justifyContent={'center'}>
            <HStack>
              <Modify>수정</Modify>
              <SmallDelete>삭제</SmallDelete>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
}

export default SerialDetail;