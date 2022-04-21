import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
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
import Layout from 'Common/Layout.jsx';
import styled from 'styled-components';
import moment from 'moment';
import { CSVLink } from 'react-csv';

import * as server from 'config/Config';

const LoginLog = () => {
  const toast = useToast();
  const admin = JSON.parse(localStorage.getItem('admin'));

  const headers = [
    { label: '로그인 일자', key: 'user.login_at' },
    { label: '회원명', key: 'user.name' },
    { label: '이메일 주소', key: 'user.email' },
    { label: '가입일자', key: 'user.create_at' },
    { label: '구독상품', key: 'membership.current' },
    { label: '구독일시', key: 'membership.start_date' },
    { label: '결제일자', key: 'membership.start_date' },
  ];

  const [currentPage, setCurrent] = useState(1); //현재 페이지;
  const [postPerPage, setPostPerPage] = useState(1000); //페이지당 포스트 개수
  const [List, setList] = useState([]);
  const [maxPage, setMaxPage] = useState('');

  const fetchData = useCallback(async () => {
    const today = new Date();
    const formatToday = moment(today).format('YYYY-MM-DD');

    const config = {
      method: 'post',
      url: `${server.SERVER_URL}/user/list/search`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
      data: {
        page: currentPage,
        count: postPerPage,
        membershipList: [0, 1, 3, 6],
        serviceList: ['iamport', 'innopay', 'nopassbook', 'none'],
        keyword: '',
        periodOption: {
          option: 'login_at',
          startDate: '2020-09-30',
          endDate: formatToday,
        },
      },
    };

    await axios(config)
      .then(response => {
        const data = response.data.data;
        const config = response.data.config;
      
        const orderList = data.sort(
          (a, b) => new Date(b.user.login_at) - new Date(a.user.login_at)
        );
        setMaxPage(config.maxPage);
        setList(orderList);
      })
      .catch(error => {
        console.log(error);
        if (error.response.status === 412) {
          localStorage.clear();
            toast({
              title: '토큰이 만료됐습니다.',
              description: '새로 로그인 해주세요!',
              position: 'top-right',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
        }
      });
    
  }, [currentPage]);

  useEffect(()=> {
    if(admin === null) {
      window.location.replace('/')
    }
  })


  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <Layout>
      <Box 
      maxW='1600px'
      m='0 auto'
      padding={{base:"48px 24px", md:"48px"}}
      >
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
          <table className="MemberCustomTableStyle">
            <thead>
              <tr className="MemberCustom-tr MemberCustom-thead-tr">
                <th className="MemberCustom-th4 textCenter">로그인 일자</th>
                <th className="MemberCustom-th1 textLeft">회원명</th>
                <th className="MemberCustom-th2 textLeft">이메일 주소</th>
                <th className="MemberCustom-th3 textCenter">가입일자</th>
                <th className="MemberCustom-th5 textCenter">구독상품</th>
                <th className="MemberCustom-th6 textCenter">구독일시</th>
                <th className="MemberCustom-th7 textCenter">결제일자</th>
              </tr>
            </thead>
            <tbody>
              {List.length !== 0 ? (
                List.map(item => (
                  <tr key={item.user.user_uid} className="MemberCustom-tr">
                    <td className="textCenter">
                      {item.user.login_at !== null ? (
                        <p style={{padding: '3px'}}>
                          <span style={{fontWeight: 600}}>{moment(item.user.login_at).format(
                            'YYYY-MM-DD'
                          )} </span>
                          <br />
                          {moment(item.user.login_at).format('hh:mm:ss')}
                        </p>
                      ) : (
                        '기록 없음'
                      )}
                    </td>
                    <td>{item.user.name}</td>
                    <td>{item.user.email}</td>
                    <td className="textCenter">
                      {moment(item.user.create_at).format('YYYY-MM-DD')}
                    </td>

                    <td className="textCenter">
                      {item.membership.bill_service !== 'none'
                        ? `${item.membership.current}개월`
                        : "없음"}
                    </td>
                    <td className="textCenter">
                      {item.membership.start_date !== null
                        ? moment(item.membership.start_date).format(
                            'YYYY-MM-DD'
                          )
                        : "없음"}
                    </td>
                    <td className="textCenter">
                      {item.membership.start_date !== null
                        ? moment(item.membership.start_date).format(
                            'YYYY-MM-DD'
                          )
                        : "없음"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>결과가 없습니다</td>
                  <td></td>
                  <td></td>
                </tr>
              )}
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
                      position: 'top-right',
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
              </Text>{" "}
              of{" "}
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
                      position: 'top-right',
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
  font-size: 15px;
  transition: all 300ms ease;

  &:hover {
    background-color: #0098fa;
  }
`;
