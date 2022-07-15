import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import * as server from 'config/Config';
import { CSVLink } from 'react-csv';
import {
  Box,Button,Checkbox,Flex,Select,useToast,useDisclosure } from '@chakra-ui/react';
import {SearchIcon,DeleteIcon } from '@chakra-ui/icons';
import Layout from 'Common/Layout.jsx';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import dayjs from 'dayjs';
import {ExcelDownBtn, ResetBtn } from 'styles/ComponentStyle';
import IsDeleteModal from 'Common/IsDeleteModal';
import MemberTable from './MemberTable';
import Pagination from './Pagination';

const Members = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin'));

  const headers = [
    { label: '회원명', key: 'user.name' },
    { label: '이메일 주소', key: 'user.email' },
    { label: '가입일자', key: 'user.create_at' },
    { label: '최근 로그인', key: 'user.login_at' },
    { label: '구독상품', key: 'membership.current' },
    { label: '최초 구독일시', key: 'membership.start_date' },
    { label: '결제일자', key: 'membership.start_date' },
  ];

  const [currentPage, setCurrent] = useState(1); //현재 페이지;
  const [postPerPage, setPostPerPage] = useState(30); //페이지당 포스트 개수
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

  //필터용 체크
  const [filterChecked, setCheckedFilter] = useState([
    false,
    false,
    false,
    false,
  ]);
  //필터용 체크 value
  const [filterCheckValue, setCheckedFilterValue] = useState([]);

  const [selected, setSelected] = useState('create_at');
  const [keyword, setKeyword] = useState('');
  const [searchList, setSearchList] = useState('');

  const allChecked = filterChecked.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const DeleteUsers = () => {
    const checkedArray = idList.filter(item => checkedItems.includes(item));
    const adminState = admin.adminState;
    console.log(checkedArray);

    if (checkedArray.length === 0) {
      onClose();
      toast({
        title: '선택한 유저가 없어요!',
        description: '삭제할 유저를 선택해주세요.',
        position: 'top-right',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    }

    if (checkedArray.length === 1) {
      axios
        .delete(`${server.SERVER_URL}/user?user_uid=${checkedArray[0]}`, {
          headers: { Authorization: `Bearer ${adminState.token}` },
        })
        .then(response => {
          console.log(response);
          navigate(0);
        })
        .catch(error => {
          console.log(error.response);
          toast({
            title: 'error!',
            description: `${error.message}`,
            position: 'top-right',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }

    if (checkedArray.length > 1) {
      Promise.all(
        checkedArray.map(async param => {
          return await axios.delete(
            `${server.SERVER_URL}/user?user_uid=${param}`,
            {
              headers: { Authorization: `Bearer ${adminState.token}` },
            }
          );
        })
      )
        .then(response => {
          console.log(response);
          navigate(0);
        })
        .catch(error => {
          console.log(error.response);
          toast({
            title: 'error!',
            description: `${error.message}`,
            position: 'top-right',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
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
        count: postPerPage,
        membershipList: membershipList,
        serviceList: ['iamport',
        'innopay',
        'inicis',
        'kakao',
        'nopassbook',
        'none',],
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

        const orderList = data.sort(
          (a, b) => new Date(b.user.create_at) - new Date(a.user.create_at)
        );

        console.log(orderList);
        setMaxPage(config.maxPage);
        setSearchList(orderList);

        let idList = [];
        const ids = orderList.map((item, i) => (idList[i] = item.user.user_uid));
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
  
  }, [membershipList, selected, startDate, keyword, currentPage, maxPage]);


  useEffect(() => {
    fetchData();
  }, [currentPage]);

  return (
    <Layout>
      <Box className="MemberContainer">
        <Box
         maxW='1300px'
         m='0 auto'
          bg="#fff"
          padding="36px"
          boxShadow="rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
        >
          <Flex
            direction={{ base: 'column', sm: 'row' }}
            className="MemberCheck"
          >
            <Checkbox
              name="all"
              value="0,1,3,6"
              colorScheme="blue"
              isChecked={allChecked}
              // isIndeterminate={isIndeterminate}
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
              <option value="default" disabled>
                날짜 기준을 먼저 선택해주세요
              </option>
              <option value="create_at">가입 일자</option>
              <option value="login_at">로그인 일자</option>
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
            <form>
              <Flex
                className="SearchFlex"
                alignItems="center"
                justify="space-between"
                direction={{ base: 'column', sm: 'row' }}
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
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    setCurrent(1);
                    fetchData();
                  }}
                >
                  <SearchIcon />
                </Button>
              </Flex>
            </form>
          </Box>
          <Flex mt={25} justifyContent="flex-end">
            <ResetBtn onClick={Reset}>필터 초기화</ResetBtn>
            <CSVLink
              headers={headers}
              data={searchList}
              filename={'회원_현황'}
              download='회원_현황.csv'
              
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
        <Flex justify="flex-end" mb={25} spacing="15px">
          <DeleteIcon
            onClick={onOpen}
            w={5}
            h={5}
            style={{ cursor: 'pointer' }}
          />
        </Flex>
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
                <th className="MemberCustom-th1 textLeft">회원명</th>
                <th className="MemberCustom-th2 textLeft">이메일 주소</th>
                <th className="MemberCustom-th3 textCenter">가입일자</th>
                <th className="MemberCustom-th4 textCenter">최근 로그인</th>
                <th className="MemberCustom-th5 textCenter">구독상품</th>
                <th className="MemberCustom-th6 textCenter">최초 구독일시</th>
                <th className="MemberCustom-th7 textCenter">결제일자</th>
                <th className="MemberCustom-th8 textCenter">수정</th>
              </tr>
            </thead>
          <MemberTable searchList={searchList} checkedItems={checkedItems} CheckEach={CheckEach}/>
          </table>
        </Box>
          <Pagination setCurrent={setCurrent} currentPage={currentPage} toast={toast} maxPage={maxPage}/>
      </Box>
      <IsDeleteModal isOpen={isOpen} onClose={onClose} Delete={DeleteUsers}/>
    </Layout>
  );
};

export default Members;
