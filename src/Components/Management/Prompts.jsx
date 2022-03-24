import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
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
  useToast,
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';
import Layout from '../Layout.jsx';
import styled from 'styled-components';
import { CSVLink } from 'react-csv';

import * as config from '../../config/Config';

const Prompts = () => {
  const toast = useToast();

  const [currentPage, setCurrent] = useState(1); //현재 페이지;
  const [postPerPage, setPostPerPage] = useState(20); //페이지당 포스트 개수
  const [List, setList] = useState([]);
  const [maxPage, setMaxPage] = useState('');

  //   const fetchData = useCallback(async () => {
  //     const admin = JSON.parse(localStorage.getItem('admin'));

  //     await axios
  //       .get(
  //         `${config.SERVER_URL}/user/list/login?page=${currentPage}&count=${postPerPage}`,
  //         {
  //           headers: { admincode: admin.IdState },
  //         }
  //       )
  //       .then(res => {
  //         let result = res.data;
  //         let configData = result.config;
  //         let list = result.data.list;
  //         //console.log(list);
  //         setMaxPage(configData.maxPage);
  //         setList(list);
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       });
  //   }, [currentPage]);

  const fetchData = async () => {
    const admin = JSON.parse(localStorage.getItem('admin'));
    const adminState = admin.adminState;

    await axios
      .get(
        `${config.SERVER_URL}/prompt/list?page=${currentPage}&count=${postPerPage}`,
        {
          headers: { Authorization: `Bearer ${adminState.token}` },
        }
      )
      .then(response => {
        console.log(response);
        const list = response.data.data;
        setList(list);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <Box padding="48px">
        <Box mb={25} textAlign="right">
          <p>아이콘 들어갈 자리</p>
        </Box>
        <Box
          overflowX="auto"
          css={{
            '&::-webkit-scrollbar': {
              //스크롤바 전체영역
              width: '5px',
            },
            '&::-webkit-scrollbar-track': {
              //스크롤바 움직이는 영역
              backgroundColor: '#fff',
            },
            '&::-webkit-scrollbar-thumb': {
              //스크롤
              backgroundColor: '#E6F4F1',
              borderRadius: '5px',
            },
          }}
        >
          <Table variant="simple" bg="#fff" className="TableStyle">
            <Thead>
              <Tr>
                <Th>
                  <Checkbox
                    name="all"
                    value="all"
                    colorScheme="green"
                    //   isChecked={allChecked}
                    //   isIndeterminate={isIndeterminate}
                    //   onChange={CheckAll}
                  />
                </Th>
                <Th>서비스 항목</Th>
                <Th style={{ padding: '12px' }}>작성자</Th>
                <Th style={{ padding: '12px' }}>작성일자</Th>
                <Th style={{ padding: '12px' }}>최종수정일자</Th>
                <Th style={{ padding: '12px' }}>상세보기</Th>
              </Tr>
            </Thead>
            <Tbody>
              {List &&
                List.map(item => (
                  <Tr key={item.uid}>
                    <Td>
                      <Checkbox
                        name="list"
                        value={item.user_uid}
                        colorScheme="green"
                        //   isChecked={checkedItems[0]}
                        //   onChange={e => {
                        //     setCheckedItems([
                        //       e.target.checked,
                        //       checkedItems[1],
                        //       checkedItems[2],
                        //     ]);
                        //     CheckedClick(e);
                        //   }}
                      />
                    </Td>
                    <Td>{item.name}</Td>
                    <Td>{item.admin_uid}</Td>
                    <Td>{item.create_at}</Td>
                    <Td>{item.update_at}</Td>
                    <Td><button>상세보기</button></Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
        <Flex m={4} alignItems="center" justifyContent="center">
          <Flex justifyContent="space-between">
            <Tooltip label="First Page">
              <IconButton
                size="sm"
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
                size="sm"
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
            <Text flexShrink="0" ml={5} mr={5}>
              <Text fontWeight="bold" as="span">
                {/* {pageIndex + 1} */}
                {currentPage}
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
                size="sm"
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
                size="sm"
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

export default Prompts;
