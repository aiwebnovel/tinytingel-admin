import {Box, Checkbox} from '@chakra-ui/react';
import { TrStyle, TbodyStyle, ExtraBtn} from 'styles/ComponentStyle';
import styled from 'styled-components';
import dayjs from 'dayjs';

const TrThStyle = styled.tr`
  text-align: center;

  .Custom-1 {
    width: 80px;
  }

  .Custom-2 {
    width: 500px;
  }

  .Custom-3,
  .Custom-4,
  .Custom-7 {
    width: 200px;
  }

  .Custom-5,
  .Custom-6,
  .Custom-8 {
    width: 100px;
  }
`;

const SerialTable = ({data, uidList,checkedItems, CheckAll, CheckEach, HandleDetailModal, offset }) => {
    const isIndeterminate = checkedItems.some(Boolean);
    //현재 페이지 번호를 기준으로 표시해줘야할 게시물들의 범위, 즉, 해당 페이지의 첫 게시물의 위치(index)
    //console.log(data.slice(offset, offset+ 50));

    return(
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
              <th className="Custom-1">
                <Checkbox
                  name="all"
                  value="all"
                  colorScheme="blue"
                  isChecked={checkedItems.length === uidList.length}
                  isIndeterminate={isIndeterminate}
                  onChange={CheckAll}
                />
              </th>
              <th className="Custom-2">시리얼 넘버</th>
              <th className="Custom-3">캠페인명</th>
              <th className="Custom-4">생성일자</th>
              <th className="Custom-5">혜택구분</th>
              <th className="Custom-6">사용</th>
              <th className="Custom-7">사용자</th>
              <th className="Custom-8">상세</th>
            </TrThStyle>
          </thead>
          <TbodyStyle>
            {data.slice(offset, offset+ 50).map(item => (
              <TrStyle
                className="MemberCustom-tr"
                key={item.coupon_uid}
              >
                <td>
                  <Checkbox
                    name="uid"
                    value={item.coupon_uid}
                    colorScheme="blue"
                    isChecked={checkedItems.includes(item.coupon_uid)}
                    onChange={e => CheckEach(e, item.coupon_uid)}
                  />
                </td>
                <td>{item.coupon_uid}</td>
                <td>{item.campaign_name}</td>
                <td>{dayjs(item.create_at).format('YYYY-MM-DD')}</td>
                <td>{item.plan}개월</td>
                <td>{item.is_used === 0 ? 'N' : 'Y'}</td>
                <td>{item.email}</td>
                <td>
                  <ExtraBtn
                    onClick={() => HandleDetailModal(item.coupon_uid)}
                  >
                    상세
                  </ExtraBtn>
                </td>
              </TrStyle>
            ))}
          </TbodyStyle>
        </table>
      </Box>
    )
}

export default SerialTable;