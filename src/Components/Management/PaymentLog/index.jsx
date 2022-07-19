import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import * as server from 'config/Config';
import { CSVLink } from 'react-csv';
import {Box,Button,Checkbox,Flex,Select,useToast} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import Layout from 'Common/Layout.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import dayjs from 'dayjs';
import { ExcelDownBtn, ResetBtn } from 'styles/ComponentStyle';
import Pagination from './Pagination';
import PayLogs from './PayLogs';

const PaymentLog = () => {
  const toast = useToast();
  const admin = JSON.parse(localStorage.getItem('admin'));

  const headers = [
    { label: '최초 결제일자', key: 'membership.start_date' },
    { label: '회원명', key: 'user.name' },
    { label: '이메일', key: 'user.email' },
    { label: '구독상품', key: 'membership.current' || 'membership.before' },
    { label: '결제수단', key: 'membership.bill_service' },
  ];

  const [currentPage, setCurrent] = useState(1); //현재 페이지;
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
  const [payMethod, setPayMethod] = useState([
    'iamport',
    'innopay',
    'inicis',
    'kakao',
    'nopassbook',
    'none',
  ]);

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
      payFilterValue.push('iamport', 'innopay','inicis','kakao' ,'nopassbook', 'none');

      const set = [...new Set(payFilterValue)];
      setPayFilterValue(set);
      setPayMethod(set);
    }

    if (e.target.checked === false) {
      setPayMethod(['iamport', 'innopay', 'inicis','kakao' ,'nopassbook', 'none']);
    }
  };

  const CheckPayFilterValue = e => {
    if (e.target.checked === true) {
      payFilterValue.push(e.target.value);
      setPayMethod(payFilterValue);
    } else {
      payFilterValue.splice(payFilterValue.indexOf(e.target.value), 1);
      const set = [...new Set(payFilterValue)];
      const setEvery = set.every(item => item === '');

      if (setEvery) {
        setPayMethod(['iamport', 'innopay', 'inicis','kakao' ,'nopassbook', 'none']);
      } else {
        setPayFilterValue(set);
        setPayMethod(set);
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
    }

    if (e.target.checked === false) {
      setMembershipList(['0', '1', '3', '6']);
    }
  };

  const CheckFilterValue = e => {
    if (e.target.checked === true) {
      filterCheckValue.push(e.target.value);
      setMembershipList(filterCheckValue);
    } else {
      filterCheckValue.splice(filterCheckValue.indexOf(e.target.value), 1);
      const set = [...new Set(filterCheckValue)];
      const setEvery = set.every(item => item === '');

      if (setEvery) {
        setMembershipList(['0', '1', '3', '6']);
      } else {
        setCheckedFilterValue(set);
        setMembershipList(set);
      }
    }
  };

  const CheckAll = e => {
    setCheckedItems(e.target.checked ? idList : []);
  };

  const CheckEach = (e, id) => {
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
    setPayMethod(['iamport', 'innopay', 'inicis','kakao' ,'nopassbook', 'none']);
    setCheckedFilterValue([]);
    setSelected('create_at');
    setKeyword('');
  };

  const fetchData = useCallback(async () => {
    const today = new Date();
    const formatToday = dayjs(today).format('YYYY-MM-DD');

    const config = {
      method: 'post',
      url: `${server.SERVER_URL}/user/list/search`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
      data: {
        page: currentPage,
        count: 50,
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
        const orderList = data.sort(
          (a, b) => new Date(b.user.create_at) - new Date(a.user.create_at)
        );

        setMaxPage(config.maxPage);
        setSearchList(orderList);

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
  }, [membershipList,payMethod,selected,startDate,keyword,currentPage,maxPage]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <Layout>
      <Box className="MemberContainer">
        <Box
          maxW="1300px"
          m="0 auto"
          bg="#fff"
          padding="36px"
          boxShadow="rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
        >
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
              download='결제_현황.csv'

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
        <PayLogs searchList={searchList} checkedItems={checkedItems} CheckEach={CheckEach} CheckAll={CheckAll} idList={idList} isIndeterminate={isIndeterminate} />
        <Pagination setCurrent={setCurrent} currentPage={currentPage} toast={toast} maxPage={maxPage}/>
      </Box>
    </Layout>
  );
};
export default PaymentLog;