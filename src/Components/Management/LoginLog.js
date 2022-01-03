import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
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
  useToast,
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
import * as config from '../../config/Config';

const LoginLog = () => {
  const toast = useToast();

  const headers = [
    { label: '회원명', key: 'user_name' },
    { label: '이메일', key: 'user_identifier' },
    { label: '로그인 일자', key: 'user_logInDate' },
    { label: '가입일자', key: 'user_signInDate' },
    { label: '구독 상품', key: 'user_membership_count' },
  ];

  const [currentPage, setCurrent] = useState(1); //현재 페이지;
  const [postPerPage, setPostPerPage] = useState(20); //페이지당 포스트 개수
  const [List, setList] = useState([]);
  const [maxPage, setMaxPage] = useState('');

  const fetchData = useCallback(async () => {
    const admin = JSON.parse(localStorage.getItem('admin'));

    await axios
      .get(
        `${config.SERVER_URL}/user/list/login?page=${currentPage}&count=${postPerPage}`,
        {
          headers: { admincode: admin.IdState },
        }
      )
      .then(res => {
        let result = res.data;
        let configData = result.config;
        let list = result.data.list;
        setMaxPage(configData.maxPage);
        setList(list);
      })
      .catch(err => {
        console.log(err);
      });
  }, [currentPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Layout>
      <Box padding="48px">
        <Box mb={25} textAlign="right">
          <CSVLink
            headers={headers}
            data={List}
            filename={'로그인_기록'}
            onClick={() => {
              if (window.confirm('다운로드 하시겠습니까?') === true) {
                console.log('저장');
              } else {
                return false;
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
                <Th>로그인일자</Th>
                <Th>가입일자</Th>
                <Th>구독상품</Th>
              </Tr>
            </Thead>
            <Tbody>
              {List &&
                List.map(item => (
                  <Tr key={item.user_uid}>
                    <Td>{item.user_name}</Td>
                    <Td>{item.user_identifier}</Td>
                    <Td>{item.user_logInDate !== null ? item.user_logInDate : '기록 없음'}</Td>
                    <Td>{item.user_signInDate.slice(0, 11)}</Td>
                    <Td>{item.user_membership_count}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
        <Flex justifyContent="space-between" m={4} alignItems="center">
          <Flex>
            <Tooltip label="First Page">
              <IconButton
                onClick={() => {
                  setCurrent(1);
                  if (currentPage === 1) {
                    toast({
                      title: '맨 처음 페이지',
                      description: '맨 처음 페이지에요!',
                      status: 'info',
                      duration: 5000,
                      isClosable: true,
                    });
                  }
                }}
                icon={<ArrowLeftIcon h={3} w={3} />}
                mr={4}
              />
            </Tooltip>
            <Tooltip label="Previous Page">
              <IconButton
                onClick={() => {
                  setCurrent(currentPage - 1);
                  fetchData();
                }}
                isDisabled={currentPage === 1 && true}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
            </Tooltip>
          </Flex>

          <Flex alignItems="center">
            <Text flexShrink="0" mr={8}>
              Page{' '}
              <Text fontWeight="bold" as="span">
                {/* {pageIndex + 1} */}{currentPage}
              </Text>{' '}
              of{' '}
              <Text fontWeight="bold" as="span">
                {maxPage}
              </Text>
            </Text>
          </Flex>

          <Flex>
            <Tooltip label="Next Page">
              <IconButton
                onClick={() => {
                  setCurrent(currentPage + 1);
                  fetchData();
                }}
                isDisabled={currentPage === maxPage && true}
                icon={<ChevronRightIcon h={6} w={6} />}
              />
            </Tooltip>
            <Tooltip label="Last Page">
              <IconButton
                onClick={() => {
                  setCurrent(maxPage);
                  
                  if (currentPage === maxPage) {
                    toast({
                      title: '마지막 페이지',
                      description: '마지막 페이지에요!',
                      status: 'info',
                      duration: 5000,
                      isClosable: true,
                    });
                  }
                }}
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
    background-color: #0098fa;
  }
`;
