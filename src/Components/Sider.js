import React from 'react';
import { Box, VStack, Heading, Flex, HStack } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import '../styles/style.scss';

const Sider = () => {
  return (
    <Box
      transition="300ms ease"
      w={{ base: 'full', md: 60 }}
      flexDirection='column'
      justifyContent='space-between'
      alignItems='center'
      pos="fixed"
      top={0}
      h="full"
      bg="#fff"
      display={{ base: 'none', md: 'flex' }}
      boxShadow="rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;"
      padding='30px 0'
    >
      <VStack spacing="35px" align='stretch'>
      <Heading as='h3' size='lg'>Admin</Heading>
        <Flex direction='column' align='baseline' className="nav">
          <Heading as="h4" size="md" marginBottom="5px">
            <CheckIcon boxSize={4}/> 회원관리
          </Heading>
          <p>회원 현황 조회</p>
          <p>로그인 기록 조회</p>
        </Flex>
        <Flex direction='column' align='baseline'  className="nav">
          <Heading as="h4" size="md" marginBottom="5px">
            <CheckIcon  boxSize={4}/> 문의사항 관리
          </Heading>
          <p>문의사항 조회</p>
        </Flex>
      </VStack>
      <HStack spacing="25px">
          <button>Home</button>
          <button>Logout</button>
      </HStack>
    </Box>
  );
};

export default Sider;
