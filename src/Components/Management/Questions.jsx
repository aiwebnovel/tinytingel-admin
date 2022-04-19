import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Text,
  Flex,
  Tooltip,
  IconButton,
  Select,
  Input,
} from '@chakra-ui/react';
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowRightIcon,
} from '@chakra-ui/icons';
import Layout from 'Common/Layout.jsx';
import styled from 'styled-components';

const Questions = () => {
  return (
    <Layout>
      <Box className="MemberContainer">
        <Box 
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
          <Flex justifyContent='space-between' alignItems='center'>
          <Input placeholder="회원명 및 이메일 주소" margin="15px 0" width='90%'/>
          <SearchBtn>검색</SearchBtn>
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
          <table
            variant="simple"
            bg="#fff"
            fontSize="14px"
            className="QuestionCustomTableStyle"
          >
            <thead>
              <tr className='QuestionCustom-tr QuestionCustom-thead-tr' >
                <th className='QuestionCustom-th1 '>문의자명</th>
                <th className='QuestionCustom-th2'>이메일 주소</th>
                <th className='QuestionCustom-th3'>문의 유형</th>
                <th className='QuestionCustom-th4'>상태</th>
                <th className='QuestionCustom-th5'>문의 내용</th>
              </tr>
            </thead>
            <tbody>
              <tr className='QuestionCustom-tr textCenter'>
                <td>이태용</td>
                <td>taeoxo@gmail.com</td>
                <td>오류신고</td>
                <td>환불</td>
                <td>
                  <Link to="detail">문의 내용 첫문장 일부를 20문자까지..</Link>
                </td>
              </tr>
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

const SearchBtn = styled.button`
  background-color: #b8c6db;
  border: 1px solid #b8c6db;
  border-radius: 5px;
  padding: 8px 15px;
`;
