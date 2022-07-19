import { useState } from 'react';
import axios from 'axios';
import Layout from 'Common/Layout';
import {
  Box,
  Flex,
  Button,
  Input,
  Select,
  Skeleton,
  Stack,
  useToast,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react';
import * as server from 'config/Config';
import styled from 'styled-components';
import { CSVLink } from 'react-csv';
import {
  ExcelDownBtn,
  TrStyle,
  TbodyStyle,
  SerialInputBox,
  ExtraBtn,
} from 'styles/ComponentStyle';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import dayjs from 'dayjs';

const TrThStyle = styled.tr`
  text-align: center;

  .Custom-1 {
    width: 80px;
  }

  .Custom-2 {
    width: 600px;
  }

  .Custom-3,
  .Custom-4 {
    width: 300px;
  }

  .Custom-5 {
    width: 150px;
  }

  .Custom-6 {
    width: 150px;
  }
`;

const CreateSerial = () => {
  const toast = useToast();
  const admin = JSON.parse(localStorage.getItem('admin'));

  const headers = [
    { label: '시리얼 넘버', key: 'coupon_uid' },
    { label: '캠페인명', key: 'campaign_name' },
    { label: '생성일자', key: 'create_at' },
    { label: '혜택구분', key: 'plan' },
  ];


  const [copied, setCopied] = useState(false);
  const [StringStates, setStringStates] = useState({
    campaign: '',
    description: '',
  });

  let num = 0;
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [plan, setPlan] = useState(0);
  const [data, setData] = useState('');
  const { campaign, description } = StringStates;

  const HandleStringStates = e => {
    setStringStates({ ...StringStates, [e.target.id]: e.target.value });
  };

  const OnCopied = () => {
    setCopied(true);
    toast({
      title: '성공!',
      description: `시리얼 넘버를 복사했습니다!`,
      position: 'top-right',
      status: 'success',
      duration: 5000,
      isClosable: true,
    })
  }


  const MakeSerial = () => {
    const objectValue = Object.values(StringStates);
    const isBlank = objectValue.includes('');
    console.log(campaign, description, amount, plan, objectValue);

    if (isBlank || amount === 0 || plan === 0) {
      toast({
        title: '실패',
        description: `빈 칸이 남있거나 숫자가 설정되지 않았습니다.`,
        position: 'top-right',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    if (!isBlank && amount > 0 && plan > 0) {
      setLoading(true);
      const config = {
        method: 'post',
        url: `${server.SERVER_URL}/coupon`,
        headers: { Authorization: `Bearer ${admin.adminState.token}` },
        data: {
          campaign_name: campaign,
          desc: description,
          plan: plan,
          many: amount,
        },
      };

      axios(config)
        .then(response => {
          const resData = response.data.data;
          console.log(resData);
          setData(resData);
        })
        .catch(error => {
          console.log(error.reponse);
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

          toast({
            title: 'error!',
            description: `${error.message}`,
            position: 'top-right',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

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
            <Input
              type="text"
              id="campaign"
              value={campaign}
              onChange={HandleStringStates}
            ></Input>
          </SerialInputBox>
          <SerialInputBox>
            <label htmlFor="description">상세 설명</label>
            <Input
              type="text"
              id="description"
              value={description}
              onChange={HandleStringStates}
            ></Input>
          </SerialInputBox>

          <Flex justify={'space-between'} gridGap="20px">
            <SerialInputBox w="50%">
              <label htmlFor="service">혜택구분</label>
              <Select
                className="selectOption"
                id="plan"
                value={plan}
                onChange={e => setPlan(Number(e.target.value))}
              >
                <option value={0} disabled>
                  혜택을 선택해주세요
                </option>
                <option value={1}>1개월</option>
                <option value={3}>3개월</option>
                <option value={6}>6개월</option>
              </Select>
            </SerialInputBox>
            <SerialInputBox w="50%">
              <label htmlFor="amount">발급수량</label>
              <NumberInput
                id="amount"
                w="100%"
                min={0}
                value={amount}
                onChange={value => setAmount(Number(value))}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </SerialInputBox>
          </Flex>

          <Box textAlign={'right'}>
            <Button colorScheme="blue" onClick={MakeSerial}>
              생성하기
            </Button>
          </Box>
        </Box>

        {/* 시리얼 결과 테이블 */}
        {loading && (
          <Box p="36px">
            <Stack>
              <Skeleton height="30px" />
              <Skeleton height="30px" />
              <Skeleton height="30px" />
              <Skeleton height="30px" />
              <Skeleton height="30px" />
            </Stack>
          </Box>
        )}
        {!loading && data && (
          <Box className="TableContainer">
            <Flex justify="flex-end" mb={25} spacing="15px">
              <CSVLink
                headers={headers}
                data={data}
                filename={'시리얼넘버'}
                download="시리얼넘버.csv"
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
                  <TrThStyle className="MemberCustom-tr MemberCustom-thead-tr">
                    <th className="Custom-1">No</th>
                    <th className="Custom-2">시리얼 넘버</th>
                    <th className="Custom-3">캠페인명</th>
                    <th className="Custom-4">생성일자</th>
                    <th className="Custom-5">혜택구분</th>
                    <th className="Custom-6">복사</th>
                  </TrThStyle>
                </thead>
                <TbodyStyle>
                 
                   {data.map(item => (
                      <TrStyle key={item.coupon_uid} className="MemberCustom-tr">
                        <td>{num = num +1 }</td>
                        <td>{item.coupon_uid}</td>
                        <td>{item.campaign_name}</td>
                        <td>{dayjs(item.create_at).format('YYYY-MM-DD')}</td>
                        <td>{item.plan}개월</td>
                        <td>
                        <CopyToClipboard text={item.coupon_uid}
                            onCopy={OnCopied}>
                          <ExtraBtn colorScheme="blue">Copy</ExtraBtn>
                          </CopyToClipboard>
                        </td>
                      </TrStyle>
                   
                    ))}
                </TbodyStyle>
              </table>
            </Box>
          </Box>
        )}
      </Box>
    </Layout>
  );
};

export default CreateSerial;
