import React from 'react';
import styled from 'styled-components';
import { Flex, Spinner, Text } from '@chakra-ui/react';

const SpinLoading = styled(Flex)`
  width: 100%;
  height: 100%;

  z-index: 3;
  background-color: #f3f2f7;
  display: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
`;

const Loading = () => {
  <SpinLoading justify="center" align="center">
    <Flex align={'center'} direction="column" gap="15px">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="#0098FA"
        size="xl"
      />
      <Text fontWeight="600">Loading...</Text>
    </Flex>
  </SpinLoading>;
};

export default Loading;
