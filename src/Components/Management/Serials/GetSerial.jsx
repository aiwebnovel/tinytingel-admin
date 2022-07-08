import Layout from 'Common/Layout';
import { Box, Flex, Button, Input, Checkbox } from '@chakra-ui/react';
import {  DeleteIcon } from '@chakra-ui/icons';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ko from 'date-fns/locale/ko';
import styled from 'styled-components';
import { CustomInput } from 'Common/CustomInput';

const SerialInputBox = styled(Flex)`
  align-items: center;
  margin-bottom: 20px;

  > label {
    min-width: 120px;
    font-weight: 600;
    word-break: keep-all;
    margin-bottom: 5px;
  }
`;

const TrStyle = styled.tr`
  text-align: center;
`;
const TbodyStyle = styled.tbody`
  > tr > td {
    padding: 10px;
  }
`;

const DateInputStyle = styled(Flex)`
  > div:nth-child(2) {
    width: 30px;
  }
`

const GetSerial = () => {
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
          <SerialInputBox>
            <label htmlFor="campaign">캠페인명</label>
            <Input type="text" id="campaign"></Input>
          </SerialInputBox>
          <SerialInputBox>
            <label htmlFor="description">상세 설명</label>
            <Input type="text" id="description"></Input>
          </SerialInputBox>
          <SerialInputBox>
            <label>생성일자</label>
            <DateInputStyle align="center" gridGap={'5px'} >
              <Input
                // value={moment(startDate).format('yyyy/MM/DD')}
                readOnly
              />
                 <DatePicker
                locale={ko}
                
                //   onChange={date => setEndDate(date)}
                  customInput={<CustomInput />}
              />
            </DateInputStyle>
            ~
            <DateInputStyle ml={'8px'} align="center" gridGap={'5px'}>
              <Input
                //   value={moment(endDate).format('yyyy/MM/DD')}
                readOnly
              />

              <DatePicker
                locale={ko}
                //   onChange={date => setEndDate(date)}
                  customInput={<CustomInput />}
              />
            </DateInputStyle>
          </SerialInputBox>
          <SerialInputBox>
            <label>사용여부</label>
            <Flex gridGap={'8px'}>
                <Checkbox>사용</Checkbox>
                <Checkbox>미사용</Checkbox>
            </Flex>
          </SerialInputBox>

      <SerialInputBox>
            <label htmlFor="serialUser">사용자</label>
            <Input type="text" id="serialUser"></Input>
          </SerialInputBox>
          <Box textAlign={'right'}>
            <Button>검색하기</Button>
          </Box>
        </Box>

        {/* 시리얼 결과 테이블 */}
        <Box className="TableContainer">
          <Flex justify="flex-end" mb={25} spacing="15px">
          <DeleteIcon
           // onClick={onOpen}
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
                <TrStyle className="MemberCustom-tr MemberCustom-thead-tr">
                  <th className="Custom-1">
                    <Checkbox name="all" value="all" colorScheme="blue" />
                  </th>
                  <th className="Custom-2">시리얼 넘버</th>
                  <th className="Custom-3">캠페인명</th>
                  <th className="Custom-4">생성일자</th>
                  <th className="Custom-5">혜택구분</th>
                  <th className="Custom-6">사용</th>
                  <th className="Custom-7">사용자</th>
                  <th className="Custom-8">상세</th>
                </TrStyle>
              </thead>
              <TbodyStyle>
                <TrStyle>
                <td>
                  <Checkbox name="all" value="all" colorScheme="blue" />
                </td>
                <td>tt-yymmdd-abc-03-001</td>
                <td>OO초등학교 글쓰기 교실</td>
                <td>yyyy.mm.dd hh:mm:ss</td>
                <td>3개월</td>
                <td>Y</td>
                <td>appplatform@appplatform.co.kr</td>
                <td>
                  <Button>상세</Button>
                </td>
                </TrStyle>
              </TbodyStyle>
            </table>
          </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default GetSerial;
