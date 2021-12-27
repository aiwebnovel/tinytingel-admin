import React from 'react';
import { Link } from 'react-router-dom';
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
  Select,
  Input,
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';
import Layout from '../Layout';
import styled from 'styled-components';

const Questions = () => {
  return (
    <Layout>
      <Box className="MemberContainer">
        <Box bg="#fff" padding="48px" textAlign="center">
          <Flex w="100%" alignItems="center" gridGap={15}>
            <Select placeholder="문의 유형">
              <option value="이용문의">이용 문의</option>
              <option value="오류신고">오류 신고</option>
              <option value="서비스제안">서비스 제안</option>
              <option value="환불">환불</option>
              <option value="탈퇴">탈퇴</option>
              <option value="기타">기타</option>
            </Select>
            <Input placeholder="문의 내용" />
          </Flex>
          <Flex justifyContent='space-between' alignItems='center'>
          <Input placeholder="회원명 및 이메일 주소" margin="15px 0" width='90%'/>
          <SearchBtn>검색</SearchBtn>
          </Flex>
        </Box>
      </Box>
      <Box className="TableContainer">
        <Box overflowX="auto">
          <Table
            variant="simple"
            bg="#fff"
            fontSize="14px"
            className="TableStyle"
          >
            <Thead>
              <Tr>
                <Th>회원명</Th>
                <Th>이메일 주소</Th>
                <Th>문의 유형</Th>
                <Th>상태</Th>
                <Th>문의 내용</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>이태용</Td>
                <Td>Taeoxo@gmail.com</Td>
                <Td>오류신고</Td>
                <Td>환불</Td>
                <Td>
                  <Link to="detail">문의 내용 첫문장 일부를 20문자까지..</Link>
                </Td>
              </Tr>
              <Tr>
                <Td>김동영</Td>
                <Td>do0_@gmail.com</Td>
                <Td>서비스 제안</Td>
                <Td>미확인</Td>
                <Td>문의 내용 첫문장 일부를 20문자까지..</Td>
              </Tr>
              <Tr>
                <Td>서영호</Td>
                <Td>johnnyjsuh@naver.com</Td>
                <Td>기타</Td>
                <Td>확인</Td>
                <Td>문의 내용 첫문장 일부를 20문자까지..</Td>
              </Tr>
              <Tr>
                <Td>나재민</Td>
                <Td>na.jaemin0813_@naver.com</Td>
                <Td>이용문의</Td>
                <Td>확인</Td>
                <Td>문의 내용 첫문장 일부를 20문자까지..</Td>
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

export default Questions;

const SearchBtn = styled.button`
  background-color: #b8c6db;
  border: 1px solid #b8c6db;
  border-radius: 5px;
  padding: 8px 15px;
`;
