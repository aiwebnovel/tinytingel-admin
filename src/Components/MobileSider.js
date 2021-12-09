import React , {useState}from 'react';
import {
  Box,
  VStack,
  CloseButton,
Drawer,
DrawerContent,
DrawerOverlay
} from '@chakra-ui/react';


const MobileSider = ({isOpen, onClose}) => {

  return (
    <Drawer
    autoFocus={false}
    isOpen={isOpen}
    placement="left"
    onClose={onClose}
    returnFocusOnClose={false}
    onOverlayClick={onClose}
    size="full"
  >
      <DrawerOverlay/>
    <DrawerContent>
    <Box
      transition="300ms ease"
      bg="white"
      borderRight="1px"
      borderRightColor="gray.300"
      w='full'
      pos="fixed"
      //left={0}
      //top={0}
      h="full"
      paddingTop={{base:'0'}}
      backgroundColor="#f9f9f9"
     
    >
    <Box>
     <CloseButton onClick={onClose}/>
    </Box>
      <VStack 
      spacing="15px"
      >
        <Box>
          <h4>회원관리</h4>
          <ul>
            <li>회원 현황 조회</li>
            <li>로그인 기록 조회</li>
          </ul>
        </Box>
        <Box>
          <h4>회원관리</h4>
          <ul>
            <li>회원 현황 조회</li>
            <li>로그인 기록 조회</li>
          </ul>
        </Box>
        <Box>
          <h4>회원관리</h4>
          <ul>
            <li>회원 현황 조회</li>
            <li>로그인 기록 조회</li>
          </ul>
        </Box>
      </VStack>
    </Box>
    </DrawerContent>
    </Drawer>
  );
};

export default MobileSider;
