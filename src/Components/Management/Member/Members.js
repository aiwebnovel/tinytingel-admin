import React, { useState, useEffect } from 'react';
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
} from '@chakra-ui/icons';
import Layout from '../../Layout';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import styled from 'styled-components';

import TableObject from './Object';

const Members = () => {
  const toast = useToast();
  const headers = [
    { label: '회원명', key: 'name' },
    { label: '이메일', key: 'email' },
    { label: '가입일자', key: 'createdAt' },
    { label: '로그인 일자', key: 'recentLogin' },
    { label: '구독 상품', key: 'membership' },
  ];

  const [startDate, setStartDate] = useState(new Date());
  const [checkedItems, setCheckedItems] = useState([false, false, false]);
  const [activeFilter, setActiveFilter] = useState([]);
  const [selected, setSelected] = useState('');
  const [keyword, setKeyword] = useState('');
  const [searchList, setSearchList] = useState(TableObject);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  const CheckAll = e => {
    console.log(e.target.checked)
    setCheckedItems([e.target.checked, e.target.checked, e.target.checked]);
    console.log(TableObject);
    setSearchList(TableObject);
    
  };

  const CheckedClick = e => {

    console.log(e.target.value, e.target.checked)
    console.log([...activeFilter, e.target.value]);
    // setActiveFilter([...activeFilter, e.target.value]);

    if(e.target.checked === true) {
      activeFilter.push(e.target.value);
      console.log(activeFilter);
      let filterList = TableObject.filter(item =>
        activeFilter.includes(item.membership)
      );
  
      console.log(filterList);
  
      setSearchList(filterList);
    } else {
      activeFilter.splice(activeFilter.indexOf(e.target.value),1);
      console.log(activeFilter);
      let filterList = TableObject.filter(item =>
        activeFilter.includes(item.membership)
      );
      setSearchList(filterList);
    }
};

  const HandleSelect = e => {
    setSelected(e.target.value);
    console.log(e.target.value, startDate);
    let year = startDate.getFullYear();
    let month = startDate.getMonth() + 1;
    let day = startDate.getDate();
    let date = `${year}-${month}-${day}`;
    console.log(date);

    if (e.target.value === 'regist') {
      const filterList = TableObject.filter(item => item.createdAt > date);
      console.log(filterList);
      setSearchList(filterList);
    }
    if (e.target.value === 'login') {
      const filterList = TableObject.filter(item => item.recentLogin > date);
      setSearchList(filterList);
    }
  };

  const HandleSearch = e => {
    e.preventDefault();
    console.log(keyword);

    if (keyword !== '') {
      //let result =  TableObject.indexOf(keyword);
      console.log(keyword.indexOf('@'));
      if (keyword.indexOf('@') === -1) {
        let result = TableObject.find(item => item.name === keyword);
        console.log(result);
        //setSearchList(result);
        //결과가 없으면 undefined 뜸 result === undefined면 결과 없다고 뜨게.
      } else {
        let result2 = TableObject.find(item => item.email === keyword);
        console.log(result2);
        //setSearchList(result2);
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
    setSearchList(TableObject);
  }

  return (
    <Layout>
      <Box className="MemberContainer">
        <Box bg="#fff" padding="48px">
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

          <Flex w="100%" alignItems="center" gridGap={15}>
            <Select className='selectOption' placeholder="날짜를 먼저 선택해주세요" onChange={HandleSelect}>
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
            <Flex className="SearchFlex" alignItems="center">
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
          <Box mt={15} textAlign="right">
            <ResetBtn onClick={Reset}>필터링 리셋</ResetBtn>
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
            {searchList.map(item => (
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
              {/* {TableObject.map(item => (
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
              ))} */}
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
    background-color: #0098fa;
  }
`;

const ResetBtn = styled.button`
background-color: #E6F4F1;
border: 1px solid #E6F4F1;
color: #444;
padding: 2px 20px;
transition: all 300ms ease;
margin-right: 8px;

&:hover {
  background-color: #b8c6db;
}
`