import {Box,Flex,Button,Input,Radio,Select,RadioGroup,Stack} from '@chakra-ui/react';
import { CustomInput } from 'Common/CustomInput';
import DatePicker from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import { SerialInputBox, ResetBtn } from 'styles/ComponentStyle';
import styled from 'styled-components';
import dayjs from 'dayjs';

const DateInputStyle = styled(Flex)`
  > div:nth-child(2) {
    width: 30px;
  }
`;

const SearchSerialBox = ({
  campaign_name,
  HandleSearchBody,
  coupon_uid,
  plan,
  setPlan,
  user,
  SearchSerial,
  is_used,
  Reset,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  return (
    <Box
      maxW="1300px"
      m="0 auto"
      bg="#fff"
      padding="36px"
      boxShadow="rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
    >
      <SerialInputBox>
        <label htmlFor="campaign_name">캠페인명</label>
        <Input
          type="text"
          id="campaign_name"
          value={campaign_name}
          onChange={HandleSearchBody}
        ></Input>
      </SerialInputBox>

      <SerialInputBox>
        <label htmlFor="coupon_uid">시리얼넘버</label>
        <Input
          type="text"
          id="coupon_uid"
          value={coupon_uid}
          onChange={HandleSearchBody}
        ></Input>
      </SerialInputBox>

      <SerialInputBox>
        <label>생성일자</label>
        <DateInputStyle align="center" gridGap={'5px'}>
          <Input value={dayjs(startDate).format('YYYY/MM/DD')} readOnly />
          <DatePicker
            locale={ko}
            selected={startDate}
            onChange={date => setStartDate(date)}
            customInput={<CustomInput />}
          />
        </DateInputStyle>
        ~
        <DateInputStyle ml={'8px'} align="center" gridGap={'5px'}>
          <Input value={dayjs(endDate).format('YYYY/MM/DD')} readOnly />

          <DatePicker
            locale={ko}
            selected={endDate}
            onChange={date => setEndDate(date)}
            customInput={<CustomInput />}
          />
        </DateInputStyle>
      </SerialInputBox>

      <Flex justify={'space-between'} gridGap="20px" direction={{base:'column', lg:'row'}}>
        <SerialInputBox w={{base:'100%', md:"50%"}}>
          <label htmlFor="plan">혜택구분</label>
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

        <SerialInputBox w={{base:'100%', md:"50%"}}>
          <label htmlFor="is_used">사용여부</label>
          <RadioGroup defaultValue={''}>
              <Stack spacing={4} direction='row'>
              <Radio id="is_used" name='all' value={''} onChange={HandleSearchBody} >
                  전체
                </Radio>
                <Radio id="is_used" name='used' value={'1'} onChange={HandleSearchBody} >
                  사용
                </Radio>
                <Radio id="is_used" name='notUsed' value={'0'} onChange={HandleSearchBody} >
                  미사용
                </Radio>
              </Stack>
            </RadioGroup>
        </SerialInputBox>
      </Flex>

      <SerialInputBox>
        <label htmlFor="user">사용자</label>
        <Input
          type="text"
          id="user"
          value={user}
          onChange={HandleSearchBody}
        ></Input>
      </SerialInputBox>
      <Flex align={'center'} justify={'space-between'} textAlign={'right'}>
        <ResetBtn onClick={Reset}>필터 초기화</ResetBtn>
        <Button onClick={SearchSerial}>검색하기</Button>
      </Flex>
    </Box>
  );
};
export default SearchSerialBox;
