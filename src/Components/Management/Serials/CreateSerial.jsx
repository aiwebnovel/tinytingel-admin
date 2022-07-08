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
      </Box>
    </Layout>
  );
};

export default CreateSerial;
