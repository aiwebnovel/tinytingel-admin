import React from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/react';
import Layout from './Layout';
import styled from 'styled-components';

const Home = () => {
  return (
    <Layout>
      <Box h={{md:'100%', lg:'100vh'}}>
      <Text fontSize='2xl' fontWeight='200' padding='30px' alignItems='center'>🗂 Dash Board</Text>
      <TableGrid columns={{sm:2, md:4}} spacing="20px">
        <Box bg="#b8c6db" height="100px"></Box>
        <Box bg="#b8c6db" height="100px"></Box>
        <Box bg="#b8c6db" height="100px"></Box>
        <Box bg="#b8c6db" height="100px"></Box>
        <Box bg="#b8c6db" height="100px"></Box>
        <Box bg="#b8c6db" height="100px"></Box>
        <Box bg="#b8c6db" height="100px"></Box>
        <Box bg="#b8c6db" height="100px"></Box>
        <Box bg="#b8c6db" height="100px"></Box>
        <Box bg="#b8c6db" height="100px"></Box>
        <Box bg="#b8c6db" height="100px"></Box>
        <Box bg="#b8c6db" height="100px"></Box>
      </TableGrid>
      </Box>
    </Layout>
  );
};

export default Home;

const TableGrid = styled(SimpleGrid)`
  padding: 64px;

  > div {
    border: 1px solid #444;
  }

`


