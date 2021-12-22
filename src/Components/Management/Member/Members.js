import React, { useState } from 'react';
import { CSVLink } from 'react-csv';
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
  Input,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';
import Layout from '../../Layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

import TableObject from './Object';

const Members = () => {
  const headers = [
    { label: '회원명', key: 'name' },
    { label: '이메일', key: 'email' },
    { label: '가입일자', key: 'createdAt' },
    { label: '로그인 일자', key: 'recentLogin' },
    { label: '구독 상품', key: 'membership' },
  ];

  const [startDate, setStartDate] = useState(new Date());

  return (
    <Layout>
      <Box className="MemberContainer">
        <Box bg="#fff" padding="48px">
          <CheckboxGroup colorScheme="#444">
            <Flex
              direction={{ base: 'column', sm: 'row' }}
              className="MemberCheck"
            >
              <Checkbox value="all" colorScheme="green">
                전체
              </Checkbox>
              <Checkbox value="1" colorScheme="green">
                1개월
              </Checkbox>
              <Checkbox value="3" colorScheme="green">
                3개월
              </Checkbox>
              <Checkbox value="6" colorScheme="green">
                6개월
              </Checkbox>
            </Flex>
          </CheckboxGroup>
          <Flex w="100%" alignItems="center" gridGap={15}>
            <Select placeholder="기준">
              <option value="regist">가입 일자</option>
              <option value="login">로그인 일자</option>
            </Select>
            <DatePicker
              className="DatePickerStyle"
              selected={startDate}
              onChange={date => setStartDate(date)}
            />
          </Flex>
          <Box margin="15px 0">
            <Flex className="SearchFlex" alignItems="center">
              <Input placeholder="검색어를 입력해주세요" />
              <button>검색</button>
            </Flex>
          </Box>
          <Box mt={15} textAlign="right">
            <CSVLink 
            headers={headers}
            data={TableObject}
            filename={'회원_현황'}
            onClick={()=>{
              if(window.confirm('다운로드 하시겠습니까?')=== true) {
                console.log('저장');
              } else {
                return false
              }
              
            }}
            >
              <ExcelDownBtn >
                CSV 내려받기
              </ExcelDownBtn>
            </CSVLink>
          </Box>
        </Box>
      </Box>
      <Box className="TableContainer">
        <Box overflowX="auto">
          <Table variant="simple" bg="#fff" className="TableStyle">
            <Thead>
              <Tr>
                <Th>회원명</Th>
                <Th>이메일</Th>
                <Th>가입일자</Th>
                <Th>로그인일자</Th>
                <Th>구독상품</Th>
                <Th>보기</Th>
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
                  <Td>
                    <Link to="/info">보기</Link>
                  </Td>
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

export default Members;

const ExcelDownBtn = styled.button`
  background-color: #444;
  color: #fff;
  padding: 2px 10px;
  transition: all 300ms ease;

  &:hover {
    background-color : #0098FA;
  }
`;
