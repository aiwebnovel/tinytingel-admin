import React, {useEffect, useState} from 'react';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Text,
  Flex,
  Tooltip,
  IconButton,
  Select,
  Input,
  useToast
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
  SearchIcon
} from '@chakra-ui/icons';
import Layout from 'Common/Layout.jsx';
import styled from 'styled-components';

import * as server from 'config/Config';

const SearchBtn = styled.button`
  background-color: #b8c6db;
  border: 1px solid #b8c6db;
  border-radius: 5px;
  padding: 8px 15px;
  margin-left: 10px;

  @media screen and (max-width : 480px) {
    width: 100%;
    margin-left: 0;
  }
`;

const Questions = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const admin = JSON.parse(localStorage.getItem('admin'));

  const [currentPage, setCurrent] = useState(1); //현재 페이지;
  const [postPerPage, setPostPerPage] = useState(30); //페이지당 포스트 개수
  const [maxPage, setMaxPage] = useState('');

  const [listAll, setListAll ] = useState('');

  const SearchQuestion = (e) => {
    e.preventDefault();
    console.log('search');
  }

  const fetchData = () => {

    
    const config = {
      method: 'post',
      url: `${server.SERVER_URL}/inquiry/list/search`,
      headers: { Authorization: `Bearer ${admin.adminState.token}` },
      data: {
        page: currentPage,
        count: postPerPage
      },
    };

    axios(config)
    .then((response)=>{
      console.log(response);
      const data = response.data.data;

      const orderData = data.sort((a,b)=> b.inquiry_uid - a.inquiry_uid);
      console.log(orderData);
      setListAll(orderData);

      
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <Layout>
      <Box className="MemberContainer">
        <Box 
        maxW='1300px'
        m='0 auto'
        bg="#fff"
         padding="36px" 
         textAlign="center"
         boxShadow="rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
         >
          <Flex w="100%" alignItems="center" gridGap={15}>
            <Select placeholder="문의 유형">
              <option value="이용문의">이용 문의</option>
              <option value="오류신고">오류 신고</option>
              <option value="서비스제안">서비스 제안</option>
              <option value="환불">환불</option>
              <option value="탈퇴">탈퇴</option>
              <option value="기타">기타</option>
            </Select>
            <Input placeholder="문의 내용" />
          </Flex>
          <form>
          <Flex direction={{base:'column', sm : 'row'}} justify='space-between' align='center'>
            <Input placeholder="회원명 및 이메일 주소" margin="15px 0" w='100%'/>
            <SearchBtn type='submit'><SearchIcon onClick={SearchQuestion} /></SearchBtn>
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
              <tr className='QuestionCustom-tr QuestionCustom-thead-tr' >
                <th className='QuestionCustom-th1 '>문의자명</th>
                <th className='QuestionCustom-th2 textLeft'>이메일 주소</th>
                <th className='QuestionCustom-th3'>문의 유형</th>
                <th className='QuestionCustom-th4'>상태</th>
                <th className='QuestionCustom-th5 textLeft'>문의 내용</th>
              </tr>
            </thead>
            <tbody>
              {listAll.length !== 0 ? (
                listAll.map((item)=>(
                  <tr className={`QuestionCustom-tr textCenter ${item.status}Question`} key={item.inquiry_uid}>
                  <td>{item.name}</td>
                  <td className='textLeft'>{item.email}</td>
                  <td>{item.category}</td>
                  <td >
                    {item.status === 'unchecked' && '미확인'}
                    {item.status === 'checked' && '확인'}
                    {item.status === 'answered' && '답변 완료'}
                    </td>
                  <td className='textLeft'>
                    <Link to={`/questions/${item.inquiry_uid}`}>
                    {item.content.length > 20 && item.content.substring(0,21)}
                    {item.content.length < 20 && item.content}
                    </Link>
                  </td>
                </tr>
                ))
              ) :( 
                <tr className='QuestionCustom-tr textCenter'>
                <td></td>
                <td></td>
                <td>결과가 없습니다.</td>
                <td></td>
                <td>
                </td>
                </tr> 
                )}
             
            </tbody>
          </table>
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

export default Questions;

