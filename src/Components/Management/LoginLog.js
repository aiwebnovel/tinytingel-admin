import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Flex,
  Tooltip,
  IconButton,
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';
import Layout from '../Layout';
import styled from 'styled-components';
import { CSVLink } from 'react-csv';
import TableObject from './Member/Object';

const LoginLog = () => {
  const headers = [
    { label: '회원명', key: 'name' },
    { label: '이메일', key: 'email' },
    { label: '가입일자', key: 'createdAt' },
    { label: '로그인 일자', key: 'recentLogin' },
    { label: '구독 상품', key: 'membership' },
  ];


  return (
    <Layout>
      <Box padding="48px">
        <Box mb={25} textAlign="right">
          <CSVLink 
          headers={headers} 
          data={TableObject}
          filename={'로그인_기록'}
            onClick={()=>{
              if(window.confirm('다운로드 하시겠습니까?')=== true) {
                console.log('저장');
              } else {
                return false
              }
            }}
          >
          <ExcelDownBtn>CSV 내려받기</ExcelDownBtn>
          </CSVLink>
        </Box>
        <Box overflowX="auto">
          <Table variant="simple" bg="#fff" className="TableStyle">
            <Thead>
              <Tr>
                <Th>회원명</Th>
                <Th>이메일</Th>
                <Th>가입일자</Th>
                <Th>로그인일자</Th>
                <Th>구독상품</Th>
              </Tr>
            </Thead>
            <Tbody>
              {TableObject.map(item => (
                <Tr key={item.email}>
                  <Td>{item.name}</Td>
                  <Td>{item.email}</Td>
                  <Td>{item.createdAt}</Td>
                  <Td>{item.recentLogin}</Td>
                  <Td>{item.membership}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
        <Flex justifyContent="space-between" m={4} alignItems="center">
          <Flex>
            <Tooltip label="First Page">
              <IconButton
                //onClick={() => gotoPage(0)}
                //isDisabled={!canPreviousPage}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                //onClick={previousPage}
                //isDisabled={!canPreviousPage}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
          </Flex>

          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              Page{' '}
              <Text fontWeight="bold" as="span">
                {/* {pageIndex + 1} */}1
              </Text>{' '}
              of{' '}
              <Text fontWeight="bold" as="span">
                {/* {pageOptions.length} */}5
              </Text>
            </Text>
          </Flex>

          <Flex>
            <Tooltip label="Next Page">
              <IconButton
                // onClick={nextPage}
                //isDisabled={!canNextPage}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                //onClick={() => gotoPage(pageCount - 1)}
                //isDisabled={!canNextPage}
                icon={<ArrowRightIcon h={3} w={3} />}
                ml={4}
              />
            </Tooltip>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

export default LoginLog;

const ExcelDownBtn = styled.button`
  background-color: #444;
  color: #fff;
  padding: 2px 10px;

  &:hover {
    background-color : #0098FA;
  }
`;
