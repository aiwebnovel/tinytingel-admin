import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {Box,Flex,Select,Input,useToast} from '@chakra-ui/react';
import {SearchIcon} from '@chakra-ui/icons';
import Layout from 'Common/Layout.jsx';
import styled from 'styled-components';

import * as server from 'config/Config';
import Pagination from './Pagination';
import QuestionTable from './QuestionTable';

const SearchBtn = styled.button`
  background-color: #b8c6db;
  border: 1px solid #b8c6db;
  border-radius: 5px;
  padding: 8px 15px;
  margin-left: 10px;

  @media screen and (max-width: 480px) {
    width: 100%;
    margin-left: 0;
    margin-top: 10px;
  }
`;

const Reset = styled.button`
  background-color: #e6f4f1;
  border: 1px solid #e6f4f1;
  border-radius: 5px;
  color: #444;
  padding: 2px 20px;
  font-size: 15px;
  transition: all 300ms ease;
  word-break: keep-all;
  margin-left: 10px;

  &:hover {
    background-color: #b8c6db;
    font-weight : 600;
  }
`

const Questions = () => {
  const toast = useToast();
  const admin = JSON.parse(localStorage.getItem('admin'));

  const [currentPage, setCurrent] = useState(1); //현재 페이지;
  const [postPerPage, setPostPerPage] = useState(30); //페이지당 포스트 개수
  const [maxPage, setMaxPage] = useState('');

  const [category, setCategory] = useState('');
  const [searchContent, setSearchContent] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [listAll, setListAll] = useState('');

  const SearchQuestion = useCallback(
    async e => {
      if (category) {
        console.log('카테고리 있음');
        const config = {
          method: 'post',
          url: `${server.SERVER_URL}/inquiry/list/search`,
          headers: { Authorization: `Bearer ${admin.adminState.token}` },
          data: {
            page: currentPage,
            count: postPerPage,
            category: category,
            content: searchContent,
            search: searchKeyword,
          },
        };
        AxiosSearch(config);
      }

      if (!category) {
        console.log('카테고리 없음');
        const config = {
          method: 'post',
          url: `${server.SERVER_URL}/inquiry/list/search`,
          headers: { Authorization: `Bearer ${admin.adminState.token}` },
          data: {
            page: currentPage,
            count: postPerPage,
            content: searchContent,
            search: searchKeyword,
          },
        };
        await AxiosSearch(config);
      }
    },
    [category, searchContent, searchKeyword, currentPage, maxPage]
  );

  const AxiosSearch = useCallback(async config => {
    await axios(config)
      .then(response => {
       // console.log(response);
        const data = response.data.data;
        const maxpage = response.data.config.maxPage;

        const orderData = data.sort((a, b) => b.inquiry_uid - a.inquiry_uid);
        setMaxPage(maxpage);
        setListAll(orderData);
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
  }, []);

  const HandleCategory = e => {
    setCategory(e.target.value);
  };

  const HandleSerachContent = e => {
    setSearchContent(e.target.value);
  };

  const HandleSearchKeyword = e => {
    setSearchKeyword(e.target.value);
  };

  const ResetData = ()=> {
    setCategory('');
    setSearchContent('');
    setSearchKeyword('');
    fetchData();
  }

  const fetchData = () => {
    const config = {
      method: 'post',
      url: `${server.SERVER_URL}/inquiry/list/search`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
      data: {
        page: currentPage,
        count: postPerPage,
      },
    };

    axios(config)
      .then(response => {
        //console.log(response);
        const data = response.data.data;
        const maxpage = response.data.config.maxPage;

        const orderData = data.sort((a, b) => b.inquiry_uid - a.inquiry_uid);
        console.log(orderData);
        setMaxPage(maxpage);
        setListAll(orderData);
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
  };

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
          textAlign="center"
          boxShadow="rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
        >
          <Flex maxW="600px">
            <Select defaultValue={'default'} onChange={HandleCategory}>
              <option value="default" disabled>
                유형을 선택해주세요
              </option>
              <option value="이용 문의">이용 문의</option>
              <option value="오류 신고">오류 신고</option>
              <option value="서비스 제안">서비스 제안</option>
              <option value="환불">환불</option>
              <option value="탈퇴">탈퇴</option>
              <option value="기타">기타</option>
            </Select>
            <Reset onClick={ResetData}>전체보기</Reset>
          </Flex>
          <form>
            <Flex direction={{ base: 'column', sm: 'row' }} gridGap={'10px'} mt='10px'>
              <Input
                w='100%'
                maxW='500px'
                placeholder="문의 내용을 적어주세요."
                value={searchContent}
                onChange={HandleSerachContent}
              />
              <Flex
                direction={{ base: 'column', sm: 'row' }}
                justify="space-between"
                align="center"
                w='100%'
                maxW='500px'
              >
                <Input
                  placeholder="회원명 및 이메일 주소를 정확하게 적어주세요."
                  value={searchKeyword}
                  onChange={HandleSearchKeyword}
                />
                <SearchBtn
                  type="submit"
                  onClick={e => {
                    e.preventDefault();
                    SearchQuestion();
                  }}
                >
                  <SearchIcon />
                </SearchBtn>
              </Flex>
            </Flex>
          </form>
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
          <table
            variant="simple"
            bg="#fff"
            fontSize="14px"
            className="QuestionCustomTableStyle"
          >
            <thead>
              <tr className="QuestionCustom-tr QuestionCustom-thead-tr">
                <th className="QuestionCustom-th1 ">문의자명</th>
                <th className="QuestionCustom-th2 ">이메일 주소</th>
                <th className="QuestionCustom-th3">문의 유형</th>
                <th className="QuestionCustom-th4">상태</th>
                <th className="QuestionCustom-th5 textLeft">문의 내용</th>
              </tr>
            </thead>
            <QuestionTable listAll={listAll}/>
          </table>
        </Box>
        <Pagination setCurrent={setCurrent} toast={toast} currentPage={currentPage} maxPage={maxPage}/>
      </Box>
    </Layout>
  );
};

export default Questions;
