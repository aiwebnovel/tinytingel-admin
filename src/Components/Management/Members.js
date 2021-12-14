import React, { useState } from 'react';
import {
  Box,
  CheckboxGroup,
  Checkbox,
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
} from '@chakra-ui/react';
import {Link} from 'react-router-dom';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';
import Layout from '../Layout';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';

const Members = () => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <Layout>
      <Box className='MemberContainer'>
        <Box bg="#fff" padding='48px'>
          <CheckboxGroup colorScheme="#444" >
            <Flex direction={{base:'column', sm:'row'}} className='MemberCheck'>
              <Checkbox value="all">전체</Checkbox>
              <Checkbox value="1">1개월</Checkbox>
              <Checkbox value="3">3개월</Checkbox>
              <Checkbox value="6">6개월</Checkbox>
            </Flex>
          </CheckboxGroup>
          <Flex w='100%' alignItems='center' gridGap={15}>
            <Select placeholder="기준">
              <option value="regist">가입 일자</option>
              <option value="login">로그인 일자</option>
            </Select>
            <DatePicker
              className='DatePickerStyle'
              selected={startDate}
              onChange={date => setStartDate(date)}
            />
          </Flex>
          <Box mt={15} textAlign='right'>
          <ExcelDownBtn>CSV 내려받기</ExcelDownBtn>
          </Box>
        </Box>
      </Box>
      <Box className='TableContainer'>
        <Box overflowX='auto'>
        <Table variant="simple" bg="#fff" >
          <Thead>
            <Tr>
              <Th>회원명</Th>
              <Th>이메일 주소</Th>
              <Th>가입일자</Th>
              <Th>로그인일자</Th>
              <Th>구독상품</Th>
              <Th>수정</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>이태용</Td>
              <Td>Taeoxo@gmail.com</Td>
              <Td>yyyy-mm-dd</Td>
              <Td>yyyy-mm-dd</Td>
              <Td>6개월</Td>
              <Td><Link to='/info'>수정</Link></Td>
            </Tr>
            <Tr>
              <Td>김동영</Td>
              <Td>do0_@gmail.com</Td>
              <Td>yyyy-mm-dd</Td>
              <Td>yyyy-mm-dd</Td>
              <Td>1개월</Td>
              <Td>수정</Td>
            </Tr>
            <Tr>
              <Td>서영호</Td>
              <Td>johnnyjsuh@naver.com</Td>
              <Td>yyyy-mm-dd</Td>
              <Td>yyyy-mm-dd</Td>
              <Td>3개월</Td>
              <Td>수정</Td>
            </Tr>
            <Tr>
              <Td>나재민</Td>
              <Td>na.jaemin0813_@naver.com</Td>
              <Td>yyyy-mm-dd</Td>
              <Td>yyyy-mm-dd</Td>
              <Td>3개월</Td>
              <Td>수정</Td>
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

export default Members;

const ExcelDownBtn = styled.button`
  background-color : #444;
  color : #fff;
  padding: 2px 10px;
`