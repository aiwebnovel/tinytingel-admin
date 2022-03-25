import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Checkbox,
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
import moment from 'moment';

import * as config from '../../config/Config';

const DetailBtn = styled.button`
  background-color : #0098FA;
  color : #fff;
  padding : 2px 10px;
  border-radius: 5px;
`


const Prompts = () => {
  const toast = useToast();

  const [checkedItems, setCheckedItems] = useState([false, false, false]);
  const [currentPage, setCurrent] = useState(1); //현재 페이지;
  const [postPerPage, setPostPerPage] = useState(20); //페이지당 포스트 개수
  const [List, setList] = useState([]);
  const [maxPage, setMaxPage] = useState('');

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const CheckAll = e => {
    console.log(e.target.checked);
    setCheckedItems([e.target.checked, e.target.checked, e.target.checked]);
    //console.log(List);
    // setSearchList(List);
  };

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
          <table className="CustomTableStyle">
            <thead>
              <tr className='Custom-tr Custom-thead-tr'>
                <th className='CheckBox textCenter'>
                  <Checkbox
                    name="all"
                    value="all"
                    colorScheme="green"
                      isChecked={allChecked}
                      isIndeterminate={isIndeterminate}
                      onChange={CheckAll}
                  />
                </th>
                <th className='Custom-th1 textLeft'>서비스 항목</th>
                <th className='Custom-th2'>작성자</th>
                <th className='Custom-th3'>작성일자</th>
                <th className='Custom-th3'>최종수정일자</th>
                <th className='Custom-th4'>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {List &&
                List.map(item => (
                  <tr key={item.name} className='Custom-tr'>
                    <td className='CheckBox textCenter'>
                      <Checkbox
                        name="list"
                        value={item.user_uid}
                        colorScheme="green"
                          isChecked={checkedItems[0]}
                          onChange={e => {
                            setCheckedItems([
                              e.target.checked,
                              checkedItems[1],
                              checkedItems[2],
                            ]);
                           // CheckedClick(e);
                          }}
                      />
                    </td>
                    <td className='textLeft'>{item.name}</td>
                    <td className='textCenter'>관리자</td>
                    <td className='textCenter'>{moment(item.create_at).format('YYYY-MM-DD')}</td>
                    <td className='textCenter'>{moment(item.update_at).format('YYYY-MM-DD')}</td>
                    <td className='textCenter'><DetailBtn>보기</DetailBtn></td>
                  </tr>
                ))}
            </tbody>
          </table>
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
