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

const LoginLog = () => {
  return (
    <Layout>
      <Box padding="48px">
        <Box mb={25} textAlign="right">
          <ExcelDownBtn>CSV 내려받기</ExcelDownBtn>
        </Box>
        <Box overflowX="auto">
          <Table variant="simple" bg="#fff" className='TableStyle'>
            <Thead>
              <Tr>
                <Th>회원명</Th>
                <Th>이메일 주소</Th>
                <Th>가입일자</Th>
                <Th>로그인일자</Th>
                <Th>구독상품</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>이태용</Td>
                <Td>Taeoxo@gmail.com</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>6개월</Td>
              </Tr>

              <Tr>
                <Td>김동영</Td>
                <Td>do0_@gmail.com</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>1개월</Td>
              </Tr>

              <Tr>
                <Td>서영호</Td>
                <Td>johnnyjsuh@naver.com</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>3개월</Td>
              </Tr>

              <Tr>
                <Td>나재민</Td>
                <Td>na.jaemin0813_@naver.com</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>3개월</Td>
              </Tr>

              <Tr>
                <Td>문태일</Td>
                <Td>taeil_@naver.com</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>3개월</Td>
              </Tr>

              <Tr>
                <Td>이동혁</Td>
                <Td>sun_@naver.com</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>3개월</Td>
              </Tr>

              <Tr>
                <Td>샤오쥔</Td>
                <Td>xiaojun_@naver.com</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>3개월</Td>
              </Tr>

              <Tr>
                <Td>이제노</Td>
                <Td>my_jeno@naver.com</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>3개월</Td>
              </Tr>

              <Tr>
                <Td>이민혁</Td>
                <Td>aeoLee_@naver.com</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>3개월</Td>
              </Tr>

              <Tr>
                <Td>나유타</Td>
                <Td>na.yuta_@naver.com</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>yyyy-mm-dd</Td>
                <Td>3개월</Td>
              </Tr>
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
`;
