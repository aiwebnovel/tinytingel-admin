import React from 'react';
import { Link } from 'react-router-dom';
import Header from 'Components/Header';
import {
  Box,
  Heading,
  useDisclosure,
  VStack,
  CloseButton,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  HStack,
  Flex,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import Sider from './Sider.jsx';


const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const AdminLogOut = () => {
    localStorage.clear();
    window.location.replace('/');
  }

  return (
    <Box minH="100vh">
      <Sider />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerOverlay />
        <DrawerContent>
          <Box
            transition="300ms ease"
            bg="white"
            borderRight="1px"
            borderRightColor="gray.300"
            w="full"
            pos="fixed"
            h="full"
            paddingTop={{ base: '0' }}
            backgroundColor="#fff"
          >
            <Flex justify="space-between" padding="10px" bg="#f9f9f9">
              <CloseButton onClick={onClose} />
              <HStack className='MobileNavTop'>
                <Link to='/'>Home</Link>
                <button onClick={AdminLogOut}>Logout</button>
              </HStack>
            </Flex>
            <VStack spacing="35px" align="stretch" padding="30px 0">
              <Flex direction="column" align="baseline" className="MobileNav">
                <Heading as="h4" size="md" marginBottom="10px">
                <CheckIcon boxSize={4} /> 회원관리
                </Heading>
                <Link to='/members'>회원 현황 조회</Link>
                <Link to='/log'>로그인 기록 조회</Link>
              </Flex>
              <Flex direction="column" align="baseline" className="MobileNav">
                <Heading as="h4" size="md" marginBottom="10px">
                <CheckIcon boxSize={4} />  문의사항 관리
                </Heading>
                <Link to='/questions'>문의사항 조회</Link>
              </Flex>
            </VStack>
          </Box>
        </DrawerContent>
      </Drawer>
      <Header onOpen={onOpen} />

      <Box backgroundColor="#f5f7fa" minH='100vh' marginLeft={{ base: '0', lg: '220px' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

