import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import * as config from '../../../config/Config';
import { CSVLink } from 'react-csv';
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
  Select,
  Input,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  InfoIcon
} from '@chakra-ui/icons';
import Layout from '../../Layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import styled from 'styled-components';

const Members = () => {
  const toast = useToast();

  const headers = [
    { label: '회원명', key: 'user_name' },
    { label: '이메일', key: 'user_identifier' },
    { label: '로그인 일자', key: 'user_logInDate' },
    { label: '가입일자', key: 'user_signInDate' },
    { label: '멤버십', key: 'user_membership_count' },
  ];

  const [currentPage, setCurrent] = useState(1); //현재 페이지;
  const [postPerPage, setPostPerPage] = useState(20); //페이지당 포스트 개수
  const [List, setList] = useState([]);
  const [maxPage, setMaxPage] = useState('');

  const [startDate, setStartDate] = useState(new Date());
  const [checkedItems, setCheckedItems] = useState([false, false, false]);
  const [activeFilter, setActiveFilter] = useState([]);
  const [selected, setSelected] = useState('');
  const [keyword, setKeyword] = useState('');
  const [searchList, setSearchList] = useState('');

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const CheckAll = e => {
    // console.log(e.target.checked);
    setCheckedItems([e.target.checked, e.target.checked, e.target.checked]);
    //console.log(List);
    setSearchList(List);
  };

  const CheckedClick = e => {
  
    if (e.target.checked === true) {
      activeFilter.push(e.target.value);
      //console.log(activeFilter);
      let before = List.map(item => String(item.user_membership_count));
      let filterList = List.filter(item =>
        activeFilter.includes(String(item.user_membership_count))
      );


      setSearchList(filterList);
    } else {
      activeFilter.splice(activeFilter.indexOf(e.target.value), 1);
      //console.log(activeFilter);
      let filterList = List.filter(item =>
        activeFilter.includes(item.user_membership_count)
      );
      //console.log(filterList);
      setSearchList(filterList);
    }
  };

  const HandleSelect = e => {
    setSelected(e.target.value);
    //console.log(e.target.value, startDate);
    let year = startDate.getFullYear();
    let month = startDate.getMonth() + 1;
    let day = startDate.getDate();
    let date = `${year}-${month}-${day}`;
    //console.log(date);

    if (e.target.value === 'regist') {
      const filterList = searchList.filter(
        item => item.user_signInDate.slice(0, 11) > date
      );
      //console.log(filterList);
      setSearchList(filterList);
    }
    if (e.target.value === 'login') {
      const filterList = searchList.filter(item => item.user_logInDate > date);
      //console.log(filterList)
      setSearchList(filterList);
    }
  };

  const HandleSearch = e => {
    e.preventDefault();
    //console.log(keyword);

    if (keyword !== '') {
      let patternKor = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      let patternEng = /[a-zA-Z]/;

      if (patternKor.test(keyword) === true) {
        // let result = List.filter(item => item.name === keyword);
        let result = searchList.filter(item =>
          item.user_name.toLocaleLowerCase().includes(keyword)
        );
        //console.log(result);
        setSearchList(result);
      }

      if (patternEng.test(keyword)) {
        let result2 = searchList.filter(item =>
          item.user_identifier.toLocaleLowerCase().includes(keyword)
        );
        //console.log(result2);
        setSearchList(result2);
      }
    } else {
      toast({
        title: '검색어를 입력해주세요.',
        description: '정확한 이름 혹은 이메일(@ 뒤까지 포함)을 입력해주세요.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const Reset = () => {
    setStartDate(new Date());
    setCheckedItems([false, false, false]);
    setActiveFilter([]);
    setSelected('');
    setKeyword('');
    setSearchList(List);
  };

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
        //console.log(list);
        setMaxPage(configData.maxPage);
        setList(list);
        setSearchList(list);
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
      <Box className="MemberContainer">
        <Box bg="#fff" padding="36px">
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            className="MemberCheck"
          >
            <Checkbox
              name="all"
              value="all"
              colorScheme="green"
              isChecked={allChecked}
              isIndeterminate={isIndeterminate}
              onChange={CheckAll}
            >
              전체
            </Checkbox>
            <Checkbox
              name="month1"
              value="1"
              colorScheme="green"
              isChecked={checkedItems[0]}
              onChange={e => {
                setCheckedItems([
                  e.target.checked,
                  checkedItems[1],
                  checkedItems[2],
                ]);
                CheckedClick(e);
              }}
            >
              1개월
            </Checkbox>
            <Checkbox
              name="month3"
              value="3"
              colorScheme="green"
              isChecked={checkedItems[1]}
              onChange={e => {
                setCheckedItems([
                  checkedItems[0],
                  e.target.checked,
                  checkedItems[2],
                ]);
                CheckedClick(e);
              }}
            >
              3개월
            </Checkbox>
            <Checkbox
              name="month6"
              value="6"
              colorScheme="green"
              isChecked={checkedItems[2]}
              onChange={e => {
                setCheckedItems([
                  checkedItems[0],
                  checkedItems[1],
                  e.target.checked,
                ]);
                CheckedClick(e);
              }}
            >
              6개월
            </Checkbox>
          </Flex>

          <Flex w="100%" alignItems="center" gridGap={15} direction={{ base: 'column', sm: 'row' }} mt={{base:'15px', sm:'0'}}>
            <Select
              className="selectOption"
              placeholder="날짜를 먼저 선택해주세요"
              onChange={HandleSelect}
            >
              <option value="regist">가입 일자</option>
              <option value="login">로그인 일자</option>
            </Select>
            <DatePicker
              className="DatePickerStyle"
              dateFormat="yyyy년 MM월 dd일"
              selected={startDate}
              maxDate={new Date()}
              onChange={date => setStartDate(date)}
              locale={ko}
            />
          </Flex>
          <Box margin="15px 0">
            <Flex className="SearchFlex" alignItems="center" >
              <form>
                <Input
                  placeholder="이름 혹은 이메일을 정확하게 입력해주세요"
                  value={keyword || ''}
                  onChange={e => {
                    setKeyword(e.target.value);
                  }}
                />
                <button type="submit" onClick={HandleSearch}>
                  검색
                </button>
              </form>
            </Flex>
          </Box>
          <Flex mt={25} justifyContent='flex-end'>
            <ResetBtn onClick={Reset}>필터 초기화</ResetBtn>
            <CSVLink
              headers={headers}
              data={searchList}
              filename={'회원_현황'}
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
          </Flex>
        </Box>

      </Box>
      <Box className="TableContainer">
        <Box overflowX="auto"  css={{
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
  }}>
          <Table variant="simple" bg="#fff" className="TableStyle">
            <Thead>
              <Tr>
                <Th>회원명</Th>
                <Th>이메일</Th>
                <Th>가입일자</Th>
                <Th style={{padding: '12px'}}>로그인일자</Th>
                <Th style={{padding: '12px'}}>멤버십</Th>
                <Th style={{padding: '12px'}}>보기</Th>
              </Tr>
            </Thead>
            <Tbody>
              {searchList.length !== 0 ? (
                searchList.map(item => (
                  <Tr key={item.user_uid}>
                    <Td>{item.user_name}</Td>
                    <Td>{item.user_identifier}</Td>
                    <Td>
                      {item.user_logInDate !== null
                        ? item.user_logInDate
                        : 'none'}
                    </Td>
                    <Td>{item.user_signInDate.slice(0, 11)}</Td>
                    <Td>{item.user_membership_count}</Td>
                    <Td>
                      <Link to={`/members/${item.user_uid}`}>
                        <InfoIcon w={5} h={5}/>
                        </Link>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td></Td>
                  <Td></Td>
                  <Td></Td>
                  <Td>결과가 없습니다</Td>
                  <Td></Td>
                  <Td></Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
        <Flex  m={4} alignItems="center" justifyContent="center">
          <Flex justifyContent="space-between">
            <Tooltip label="First Page">
              <IconButton
              size='sm'
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
    
              <IconButton
                size='sm'
                onClick={() => {
                  setCurrent(currentPage - 1);
                  fetchData();
                }}
                isDisabled={currentPage === 1 && true}
                icon={<ChevronLeftIcon h={6} w={6} />}
              />
      
          </Flex>

          <Flex alignItems="center" flexShrink="0" ml={5} mr={5}>
          <Text >
              <Text fontWeight="bold" as="span">
                {currentPage}
              </Text>{' '}
              of{' '}
              <Text fontWeight="bold" as="span">
                {maxPage}
              </Text>
            </Text>
          </Flex>

          <Flex>
              <IconButton
                size='sm'
                onClick={() => {
                  setCurrent(currentPage + 1);
                  fetchData();
                }}
                isDisabled={currentPage === maxPage && true}
                icon={<ChevronRightIcon h={6} w={6} />}
              />

            <Tooltip label="Last Page">
              <IconButton
              size='sm'
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

export default Members;

const ExcelDownBtn = styled.button`
  background-color: #444;
  color: #fff;
  padding: 2px 10px;
  font-size: 15px;
  transition: all 300ms ease;
  word-break: keep-all;

  &:hover {
    background-color: #0098fa;
  }
`;

const ResetBtn = styled.button`
  background-color: #e6f4f1;
  border: 1px solid #e6f4f1;
  color: #444;
  padding: 2px 10px;
  font-size: 15px;
  transition: all 300ms ease;
  margin-right: 8px;
  word-break: keep-all;

  &:hover {
    background-color: #b8c6db;
  }
`;

