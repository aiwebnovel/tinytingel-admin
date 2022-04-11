import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as server from 'config/Config';
import { CSVLink } from 'react-csv';
import {
  Box,
  Button,
  Checkbox,
  Text,
  Flex,
  Tooltip,
  IconButton,
  Select,
  useToast,
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import Layout from 'Common/Layout.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import styled from 'styled-components';
import moment from 'moment';

const PaymentLog = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin'));

  const headers = [
    { label: '최초 결제일자', key: 'membership.start_date' },
    { label: '회원명', key: 'user.name' },
    { label: '이메일', key: 'user.email' },
    { label: '구독상품', key: 'membership.current'|| 'membership.before' },
    { label: '결제수단', key: 'membership.bill_service' },
  ];

  const [membershipPrice, setPrice] = useState('')

  const [currentPage, setCurrent] = useState(1); //현재 페이지;
  const [postPerPage, setPostPerPage] = useState(50); //페이지당 포스트 개수
  const [maxPage, setMaxPage] = useState('');

  const [startDate, setStartDate] = useState(new Date('January 1, 2021'));

  const renderDayContents = date => {
    return <span title={date}>{date}</span>;
  };

  //체크된 아이템
  const [checkedItems, setCheckedItems] = useState([]);
  //체크용 id 리스트
  const [idList, setIdList] = useState([]);
  //membershipList 기본
  const [membershipList, setMembershipList] = useState(['0', '1', '3', '6']);

  //pay method 기본
  const [payMethod, setPayMethod] = useState(["iamport","innopay","nopassbook","none"])

  //필터용 체크1
  const [filterChecked, setCheckedFilter] = useState([
    false,
    false,
    false,
    false,
  ]);
  //필터용 체크 value1
  const [filterCheckValue, setCheckedFilterValue] = useState([]);

  //필터용 체크2
  const [payFilter, setPayFilter] = useState([false, false, false, false]);
  //필터용 체크 value2
  const [payFilterValue, setPayFilterValue] = useState([]);

  const [selected, setSelected] = useState('create_at');
  const [keyword, setKeyword] = useState('');
  const [searchList, setSearchList] = useState('');

  const allChecked = filterChecked.every(Boolean);
  const payAllChecked = payFilter.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean);

  const CheckPayFilteredAll = e => {
    setPayFilter([
        e.target.checked,
        e.target.checked,
        e.target.checked,
        e.target.checked,
      ]);
      if (e.target.checked === true) {
        payFilterValue.push("iamport","innopay","nopassbook","none");
  
        const set = [...new Set(payFilterValue)];
        setPayFilterValue(set);
        setPayMethod(set)
       // console.log(set)
      }
  
      if (e.target.checked === false) {
        setPayMethod(["iamport","innopay","nopassbook","none"])
        // payFilterValue.splice(0);
        // setPayMethod(payFilterValue);
      }

  };

  const CheckPayFilterValue = e => {
    if (e.target.checked === true) {
        payFilterValue.push(e.target.value);
        setPayMethod(payFilterValue);
        //console.log(payFilterValue)
      } else {
        payFilterValue.splice(payFilterValue.indexOf(e.target.value), 1);
        const set = [...new Set(payFilterValue)];
        const setEvery = set.every(item => item === '')

        if(setEvery) {
          setPayMethod(["iamport","innopay","nopassbook","none"])
        }else {
          setPayFilterValue(set);
          setPayMethod(set);
          //console.log(set)
        }

      }

  };

  const CheckFilteredAll = e => {
    setCheckedFilter([
      e.target.checked,
      e.target.checked,
      e.target.checked,
      e.target.checked,
    ]);
    if (e.target.checked === true) {
      filterCheckValue.push('0', '1', '3', '6');

      const set = [...new Set(filterCheckValue)];
      setCheckedFilterValue(set);
      setMembershipList(set);
      // console.log(set)
    }

    if (e.target.checked === false) {
      setMembershipList(['0', '1', '3', '6'])
      // filterCheckValue.splice(0);
      // setMembershipList(filterCheckValue);
    }
  };

  const CheckFilterValue = e => {
    if (e.target.checked === true) {
      filterCheckValue.push(e.target.value);
      setMembershipList(filterCheckValue);
      // console.log(filterCheckValue)
    } else {
      filterCheckValue.splice(filterCheckValue.indexOf(e.target.value), 1);
      const set = [...new Set(filterCheckValue)];
      const setEvery = set.every(item => item === '')
      
      if(setEvery) {
        setMembershipList(['0', '1', '3', '6'])
      }else {

        setCheckedFilterValue(set);
        setMembershipList(set);
      }
    }
  };

  const CheckAll = e => {
    // console.log(e.target.checked);
    setCheckedItems(e.target.checked ? idList : []);
  };

  const CheckEach = (e, id) => {
    //console.log(e.target);
    if (e.target.checked) {
      setCheckedItems([...checkedItems, id]);
    } else {
      setCheckedItems(checkedItems.filter(item => item !== id));
    }
  };

  const HandleSelect = e => {
    setSelected(e.target.value);
  };

  const Reset = () => {
    setStartDate(new Date('January 1, 2021'));
    setCheckedFilter([false, false, false, false]);
    setMembershipList(['0', '1', '3', '6']);
    setPayMethod(["iamport","innopay","nopassbook","none"])
    setCheckedFilterValue([]);
    setSelected('create_at');
    setKeyword('');
  };

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
        membershipList: membershipList,
        serviceList: payMethod,
        keyword: keyword,
        periodOption: {
          option: selected,
          startDate: startDate,
          endDate: formatToday,
        },
      },
    };

    await axios(config)
      .then(response => {
        const data = response.data.data;
        const config = response.data.config;
        console.log(data);
        setMaxPage(config.maxPage);
        setSearchList(data);

        let idList = [];
        const ids = data.map((item, i) => (idList[i] = item.user.user_uid));
        setIdList(ids);

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
  }, [membershipList, payMethod, selected, startDate, keyword, currentPage, maxPage]);


  useEffect(()=> {
    if(admin === null) {
      window.location.replace('/')
    }
  })


  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <Layout>
      <Box className="MemberContainer">
        <Box bg="#fff" padding="36px" boxShadow='rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px'>
          <Flex
            direction={{ base: 'column', xl: 'row' }}
            justify="space-between"
            align="flex-start"
            mb="10px"
          >
            <Flex
              direction={{ base: 'column', md: 'row' }}
              className="MemberCheck"
            >
              <Checkbox
                name="all"
                value="0,1,3,6"
                colorScheme="blue"
                isChecked={allChecked}
                onChange={CheckFilteredAll}
              >
                전체
              </Checkbox>
              <Checkbox
                name="noMembership"
                value="0"
                colorScheme="blue"
                isChecked={filterChecked[0]}
                onChange={e => {
                  setCheckedFilter([
                    e.target.checked,
                    filterChecked[1],
                    filterChecked[2],
                    filterChecked[3],
                  ]);
                  CheckFilterValue(e);
                }}
              >
                구독 안함
              </Checkbox>
              <Checkbox
                name="month1"
                value="1"
                colorScheme="blue"
                isChecked={filterChecked[1]}
                onChange={e => {
                  setCheckedFilter([
                    filterChecked[0],
                    e.target.checked,
                    filterChecked[2],
                    filterChecked[3],
                  ]);
                  CheckFilterValue(e);
                }}
              >
                1개월
              </Checkbox>
              <Checkbox
                name="month3"
                value="3"
                colorScheme="blue"
                isChecked={filterChecked[2]}
                onChange={e => {
                  setCheckedFilter([
                    filterChecked[0],
                    filterChecked[1],
                    e.target.checked,
                    filterChecked[3],
                  ]);
                  CheckFilterValue(e);
                }}
              >
                3개월
              </Checkbox>
              <Checkbox
                name="month6"
                value="6"
                colorScheme="blue"
                isChecked={filterChecked[3]}
                onChange={e => {
                  setCheckedFilter([
                    filterChecked[0],
                    filterChecked[1],
                    filterChecked[2],
                    e.target.checked,
                  ]);
                  CheckFilterValue(e);
                }}
              >
                6개월
              </Checkbox>
            </Flex>

            <Flex
              direction={{ base: 'column', md: 'row' }}
              className="MemberCheck"
            >
              <Checkbox
                name="all"
                value="iamport,innopay,nopassbook,none"
                colorScheme="blue"
                isChecked={payAllChecked}
                onChange={CheckPayFilteredAll}
              >
                전체
              </Checkbox>
              <Checkbox
                name="none"
                value="none"
                colorScheme="blue"
                isChecked={payFilter[0]}
                onChange={e => {
                  setPayFilter([
                    e.target.checked,
                    payFilter[1],
                    payFilter[2],
                    payFilter[3],
                  ]);
                  CheckPayFilterValue(e);
                }}
              >
                결제 안함
              </Checkbox>
              <Checkbox
                name="iamport"
                value="iamport"
                colorScheme="blue"
                isChecked={payFilter[1]}
                onChange={e => {
                  setPayFilter([
                    payFilter[0],
                    e.target.checked,
                    payFilter[2],
                    payFilter[3],
                  ]);
                  CheckPayFilterValue(e);
                }}
              >
                카카오페이
              </Checkbox>
              <Checkbox
                name="innopay"
                value="innopay"
                colorScheme="blue"
                isChecked={payFilter[2]}
                onChange={e => {
                  setPayFilter([
                    payFilter[0],
                    payFilter[1],
                    e.target.checked,
                    payFilter[3],
                  ]);
                  CheckPayFilterValue(e);
                }}
              >
                신용/체크
              </Checkbox>
              <Checkbox
                name="nopassbook"
                value="nopassbook"
                colorScheme="blue"
                isChecked={payFilter[3]}
                onChange={e => {
                  setPayFilter([
                    payFilter[0],
                    payFilter[1],
                    payFilter[2],
                    e.target.checked,
                  ]);
                  CheckPayFilterValue(e);
                }}
              >
                무통장
              </Checkbox>
            </Flex>
          </Flex>
          <Flex
            w="100%"
            alignItems="center"
            gridGap={15}
            direction={{ base: 'column', sm: 'row' }}
            mt={{ base: '15px', sm: '0' }}
          >
            <Select
              className="selectOption"
              defaultValue={selected}
              onChange={HandleSelect}
              maxW="300px"
            >
              <option value="create_at" disabled>
                날짜 기준을 먼저 선택해주세요
              </option>
              <option value="membership_start_date">결제시작일자</option>
              <option value="membership_recent_date">최근결제일자</option>
            </Select>
            <DatePicker
              className="DatePickerStyle"
              dateFormat="yyyy/MM/dd"
              selected={startDate}
              maxDate={new Date()}
              onChange={date => setStartDate(date)}
              locale={ko}
              renderDayContents={renderDayContents}
            />
          </Flex>
          <Box margin="15px 0">
            <Flex
              className="SearchFlex"
              alignItems="center"
              justify="space-between"
            >
              <input
                type={'text'}
                placeholder="검색할 키워드를 입력해주세요"
                value={keyword || ''}
                onChange={e => {
                  setKeyword(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  setCurrent(1);
                  fetchData();
                }}
              >
                <SearchIcon />
              </Button>
            </Flex>
          </Box>
          <Flex mt={25} justifyContent="flex-end">
            <ResetBtn onClick={Reset}>필터 초기화</ResetBtn>
            <CSVLink
              headers={headers}
              data={searchList}
              filename={'결제_현황'}
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
                <th className="MemberCheckBox textCenter">
                  <Checkbox
                    name="all"
                    value="all"
                    colorScheme="blue"
                    isChecked={checkedItems.length === idList.length}
                    isIndeterminate={isIndeterminate}
                    onChange={CheckAll}
                  />
                </th>
                <th className="paymentCustom-th1 textCenter">최초 결제일자</th>
                <th className="paymentCustom-th2 textLeft">회원명</th>
                <th className="paymentCustom-th3 textLeft">이메일</th>
                <th className="paymentCustom-th4 textCenter">구독상품</th>
                <th className="paymentCustom-th5 textCenter">결제금액</th>
                <th className="paymentCustom-th6 textCenter">결제수단</th>
              </tr>
            </thead>
            <tbody>
              {searchList.length !== 0 ? (
                searchList.map(item => (
                  <tr key={item.user.user_uid} className="MemberCustom-tr">
                    <td className="CheckBox textCenter">
                      <Checkbox
                        name="list"
                        value={item.user.user_uid}
                        colorScheme="blue"
                        isChecked={checkedItems.includes(item.user.user_uid)}
                        onChange={e => CheckEach(e, item.user.user_uid)}
                      />
                    </td>
                    <td className="textCenter">
                      {item.user.membership_recent_date !== null && moment(item.user.membership_recent_date).format('YYYY-MM-DD')}
                      {item.user.membership_recent_date === null && item.membership.start_date === null && '없음'}
                      {item.user.membership_recent_date === null && item.membership.start_date !== null && moment(item.membership.start_date).format('YYYY-MM-DD')}

                    </td>
                    <td>{item.user.name}</td>
                    <td>{item.user.email}</td>
                    <td className="textCenter">
                      {item.membership.bill_service === 'none' && '없음'}
                      {item.membership.bill_service !== 'none' && item.membership.current > 0 && `${item.membership.current}개월`}
                      {item.membership.bill_service !== 'none' && item.membership.current === 0 && item.membership.before > 0 && `${item.membership.before}개월`}
                    </td>
                    <td className="textCenter">
                      {item.membership.bill_service === 'none' && '없음'}
                      {item.membership.bill_service !== 'none' &&
                        item.membership.current === 1 &&
                        '25,000'}
                      {item.membership.bill_service !== 'none' &&
                        item.membership.current === 3 &&
                        '60,000'}
                      {item.membership.bill_service !== 'none' &&
                        item.membership.current === 6 &&
                        '90,000'}
                      
                      {item.membership.bill_service !== 'none' &&
                        item.membership.current === 0 && item.membership.before === 1 &&
                        '25,000'}
                      {item.membership.bill_service !== 'none' &&
                        item.membership.current === 0 &&item.membership.before === 3 &&
                        '60,000'}
                      {item.membership.bill_service !== 'none' &&
                        item.membership.current === 0 && item.membership.before === 6 &&
                        '90,000'}
                    </td>
                    <td className="textCenter">
                      {item.membership.bill_service === 'none' && '없음'}
                      {item.membership.bill_service !== 'none' &&
                        item.membership.bill_service === 'iamport' &&
                        '카카오페이'}
                      {item.membership.bill_service !== 'none' &&
                        item.membership.bill_service === 'innopay' &&
                        '신용/체크'}
                      {item.membership.bill_service !== 'none' &&
                        item.membership.bill_service === 'nopassbook' &&
                        '무통장'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td>결과가 없습니다</td>
                  <td></td>
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

            <IconButton
              size="sm"
              onClick={() => {
                setCurrent(currentPage => currentPage - 1);
              }}
              isDisabled={currentPage === 1 && true}
              icon={<ChevronLeftIcon h={6} w={6} />}
            />
          </Flex>

          <Flex alignItems="center" flexShrink="0" ml={5} mr={5}>
            <Text>
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
              size="sm"
              onClick={() => {
                setCurrent(currentPage => currentPage + 1);
              }}
              isDisabled={currentPage === maxPage && true}
              icon={<ChevronRightIcon h={6} w={6} />}
            />

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

export default PaymentLog;

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
