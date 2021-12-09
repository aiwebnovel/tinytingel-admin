import React from 'react';
import Header from './Header';
import { Box, useDisclosure, useMediaQuery } from '@chakra-ui/react';
import Sider from './Sider';
import MobileSider from './MobileSider';

const Layout = ({ children }) => {

  const [isMobile] = useMediaQuery('(max-width: 768px)')
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Header onOpen={onOpen}/>
      {isMobile? <MobileSider isOpen={isOpen} onClose={onClose}/> : <Sider/>}
      <Box backgroundColor="#fff" h="100vh" marginLeft={{base: '0', md: '240px'}} >
      {children}
      </Box>
    </Box>
  );
};

export default Layout;
