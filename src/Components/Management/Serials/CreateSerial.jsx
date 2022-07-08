import Layout from 'Common/Layout';
import {
  Box,
  Flex,
  Button,
  Input,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import styled from 'styled-components';
import { CSVLink } from 'react-csv';

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

const TrStyle = styled.tr`
   text-align: center;

  .Custom-1 {
    width: 80px;
  }

  .Custom-2 {
    width: 250px;
  }

  .Custom-3, .Custom-4 {
    width: 300px;
  }

  .Custom-6 {
    width: 100px;
  }
`

const TbodyStyle = styled.tbody`
  > td {
    padding: 10px;
  }
`


const CreateSerial = () => {
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

          <Flex
          justify={'space-between'}
          gridGap='20px'
          >
            <SerialInputBox
            w="50%"
            >
              <label htmlFor="service">혜택구분</label>
              <Select className="selectOption" id="service">
                <option value="default" disabled>
                  혜택을 선택해주세요
                </option>
                <option>1개월</option>
                <option>3개월</option>
                <option>6개월</option>
              </Select>
            </SerialInputBox>
            <SerialInputBox
              w="50%">
              <label htmlFor="amount">발급수량</label>
              <NumberInput id="amount" w='100%'>
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </SerialInputBox>
          </Flex>

          <Box textAlign={'right'}>
            <Button>생성하기</Button>
          </Box>
        </Box>

        {/* 시리얼 결과 테이블 */}
        <Box className="TableContainer">
        <Flex justify="flex-end" mb={25} spacing="15px">
        <CSVLink
              headers={[]}
              data={[]}
              filename={'시리얼넘버'}
              download='시리얼넘버.csv'
              
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
                <th className="Custom-1">No</th>
                <th className="Custom-2">시리얼 넘버</th>
                <th className="Custom-3">캠페인명</th>
                <th className="Custom-4">생성일자</th>
                <th className="Custom-5">혜택구분</th>
                <th className="Custom-6">복사</th>

              </TrStyle>
            </thead>
            <TbodyStyle>
                <td className="textCenter">1</td>
                <td className="textCenter">tt-yymmdd-abc-03-001</td>
                <td className="textCenter">
                OO초등학교 글쓰기 교실
                </td>
                <td className="textCenter">
                yyyy.mm.dd hh:mm:ss
                </td>
                <td className="textCenter">
                    3개월
                </td>
                <td className="textCenter">
                    <button>복사</button>
                </td>                  
            </TbodyStyle>
          </table>
        </Box>
        </Box>
      </Box>
    </Layout>
  );
};

export default CreateSerial;
