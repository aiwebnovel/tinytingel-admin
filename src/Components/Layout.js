import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
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
import Sider from './Sider';

const Layout = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Flex justify="space-between" padding="5px 10px" bg="#f9f9f9">
              <CloseButton onClick={onClose} />
              <HStack>
                <Link to='/'>home</Link>
                <button>Logout</button>
              </HStack>
            </Flex>
            <VStack spacing="35px" align="stretch" padding='30px'>
              <Flex direction="column" align="baseline" className="MobileNav">
                <Heading as="h4" size="md" marginBottom="5px">
                  회원관리
                </Heading>
                <Link to='/members'>회원 현황 조회</Link>
                <Link to='/log'>로그인 기록 조회</Link>
              </Flex>
              <Flex direction="column" align="baseline" className="MobileNav">
                <Heading as="h4" size="md" marginBottom="5px">
                  문의사항 관리
                </Heading>
                <Link to='/questions'>문의사항 조회</Link>
              </Flex>
            </VStack>
          </Box>
        </DrawerContent>
      </Drawer>
      <Header onOpen={onOpen} />

      <Box backgroundColor="#f5f7fa" marginLeft={{ base: '0', md: '240px' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
